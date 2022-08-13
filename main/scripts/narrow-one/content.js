if (!window.injected) {
	window.injected = true;
	console.log('Injecting...');
	
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
	}
	
	let counter = 0;
	
	let observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (let node of mutation.addedNodes) {
				if (node.src == 'https://narrow.one/js.js?v=1659120483') {
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
}