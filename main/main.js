(function () {
	chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
		switch (message.text) {
			case 'getSettings':
				if (!('gpusttngs' in localStorage) || localStorage.gpusttngs === 'undefined') {
					localStorage.gpusttngs = JSON.stringify({});
				}
				sendResponse({ text: localStorage.gpusttngs });
				break;
			case 'setSettings':
				localStorage.gpusttngs = message.data;
				break;
			case 'licensedBy':
				sendResponse({ text: JSON.stringify(localStorage.licensedBy === message.lby && localStorage.licensed) });
				if (localStorage.licensedBy !== message.lby) {
					delete localStorage.licensed;
					localStorage.licensedBy = message.lby;
				}
				break;
		}
	});

	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		try {
			const url = new URL(tab.url);
			if (changeInfo.status === 'loading' && url.hostname === 'narrow.one') {
				chrome.tabs.executeScript(tabId, {
					file: 'main/scripts/narrow-one/content.js',
					runAt: 'document_start',
				});
			}
		} catch {}
	});
})();