if (!window.injected) {
	window.injected = true;
	console.log('Injecting...');

	async function LoadPlugin(plugin) {
		let pluginInstance = document.createElement('script');
		pluginInstance.innerHTML = await fetch(chrome.runtime.getURL(plugin)).then((resp) => resp.text()).then();
		document.documentElement.prepend(pluginInstance);
		document.documentElement.insertBefore(pluginInstance, document.documentElement.firstChild);
	}
	
	async function injectProp() {
		let scr = document.createElement('script');
		scr.innerHTML = (await fetch(chrome.runtime.getURL('main/scripts/narrow-one/scene.js')).then((resp) => resp.text())) + "\r\n" +
						(await fetch(chrome.runtime.getURL('main/header.js')).then((resp) => resp.text())) + "\r\n" +
						(await fetch(chrome.runtime.getURL('main/scripts/narrow-one/script.js')).then((resp) => resp.text()));
		document.documentElement.prepend(scr);
		document.documentElement.insertBefore(scr, document.documentElement.firstChild);
		
		let gameInstance = document.createElement('script');
		gameInstance.innerHTML = await fetch(chrome.runtime.getURL('main/scripts/narrow-one/modded-src.js')).then((resp) => resp.text()).then();
		document.documentElement.prepend(gameInstance);
		document.documentElement.insertBefore(gameInstance, document.documentElement.firstChild);
		
		document.title = "BetterNarrow";
		
		// plugins
		setTimeout(function() {
			LoadPlugin('main/scripts/narrow-one/plugins/template.plugin.js');
		}, 50)
	}

	let counter = 0;

	let observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (let node of mutation.addedNodes) {
				if (node.src != undefined && node.src.includes('narrow.one/js.js?v=')) {
					
					let versionKeyVariable = document.createElement('div');
					versionKeyVariable.innerHTML = node.src.split('=')[1];
					versionKeyVariable.id = 'versionKey';
					versionKeyVariable.style.display = "none"
					document.documentElement.prepend(versionKeyVariable);
					document.documentElement.insertBefore(versionKeyVariable, document.documentElement.firstChild);
					
					node.src = chrome.runtime.getURL('main/empty.js');

					injectProp().then();
				}
			}
		}
	});
	observer.observe(document, {
		childList: true,
		subtree: true,
	});
	
	setTimeout(function() {
		if (document.getElementById('versionKey') === undefined || document.getElementById('versionKey') === null)
			window.location.href = window.location.href;
	}, 500);
}