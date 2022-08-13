console.log('Injected!');

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
				
				for (let i = 0; i < document.head.children.length; i++) {
					if (document.head.children[i].tagName == "STYLE")  {
						document.head.children[i].remove();
						return;
					}
				}
			}
			
			try {
				let menu = document.getElementById("mainMenu");
				menu.children[5].children[0].style.backgroundImage = 'https://raw.githubusercontent.com/Laamy/narrow-one-tmp/main/discord-dark.png';
			}
			catch{}
		}
		animate();
	})
}
init();