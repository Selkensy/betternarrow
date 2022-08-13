console.log('Injected!');

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function init() {
	__require(['https://unpkg.com/three@latest/build/three.min.js'], function(threejs)
	{
		let firstTime = true;
		
		window.addEventListener('keydown', function(event) {
			if (String.fromCharCode(event.keyCode) === "N") {
				globalPanic = !globalPanic;
				let mode = "Disabled";
				if (globalPanic) mode = "Enabled";
				globalInstance.gameManager.currentGame.scoreOffsetNotificationsUi.showOffsetNotification("Panic mode is now " + mode, null, "hey");
			}
		});
		
		function animate() {
			requestAnimationFrame(animate);
			
			if (globalInstance && firstTime) {
				firstTime = false;
				
				globalInstance.dialogManager.showAlert({
					title: "BetterNarrow",
					text: "BetterNarrow by yeemi#9764 created to allow more graphics control"
				})
				
				waitForElm('head > style:nth-child(24)').then((elm) => {
					elm.remove(); 
					
					async function addCustomStyle() {
						let styleInstance = document.createElement('style');
						styleInstance.id = "GameStyle";
						styleInstance.innerHTML = await fetch('https://raw.githubusercontent.com/Laamy/betternarrow/main/main/scripts/narrow-one/resources/dark-mode.css').then((resp) => resp.text()).then();
						document.head.prepend(styleInstance);
						document.head.insertBefore(styleInstance, document.head.firstChild);
					}
					addCustomStyle();
				});
			}
			
			waitForElm('#mainMenu > div.main-menu-promo-banner-container > div').then((elm) => {
				elm.style.backgroundImage =
				'url(\"https://raw.githubusercontent.com/Laamy/narrow-one-tmp/main/discord-dark.png\")';
			});
		}
		animate();
	})
}
init();