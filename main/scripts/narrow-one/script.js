console.log('Injected!');

let ThreeAPI;

let oVersionKey = '1660844401'; // last updated timestamp patch
let versionKey = oVersionKey;

function SpoofVersion(bool) {
	if (bool)
		versionKey = document.getElementById('versionKey').innerHTML;
	else versionKey = oVersionKey;
}

SpoofVersion(true);

let debug = false;

let globalInstance = null;

let globalNotificationPtr = null;

let styles = [];

let camHeight = 1.6;

let betterNarrowCharacter = '‎';

let labArray = [];

let pingTimer = 0;
let gameFramerate = 0;

let qty = 0;
let avrgDmg = 0;

let gamesTargetFramerate = 60;
let vsyncActive = true;

let tmpFunc = null;
let tmpFunc2 = null; // lazy

const delay = ms => new Promise(res => setTimeout(res, ms)); //fuck

function createLab(id, x, y, text, color, explorer) {
    var labelTest = document.createElement('div');
    labelTest.style.position = 'absolute';
    labelTest.style.width = 100;
    labelTest.id = id;
    labelTest.className = "main-menu-button-text whiteBigText blueNight";
    labelTest.style.height = 100;
    labelTest.style.color = 100;
    labelTest.style.backgroundColor = 'transparent';
    labelTest.innerHTML = text;
    if (explorer == undefined) {
        labelTest.style.bottom = y + 'px';
        labelTest.style.left = x + 'px';
        labArray.push(labelTest);
    } else {
        labelTest.style.bottom = y + 'px';
        labelTest.style.right = x + 'px';
        globalInstance.explorer.PushItem(labelTest);
    }
    document.body.appendChild(labelTest);
};
function ClearLabels() {
    for (let i = 0; i < labArray.length; i++)
        labArray[i].remove();
    labArray = [];
}
function ReloadLabels() {
    ClearLabels()

    let keepInTouch = [
        //"FPS", NEEDED FIX
        "FPS",
        "Ping",
        "DMG",
        "",
        "VERSION",
        "NARROWVERSION"]
    keepInTouch.reverse(); // reverse them so their in proper order (Newest added is the first in the array)

    for (let i = 0; i < keepInTouch.length; i++)
        if (keepInTouch[i] != "")
            createLab(keepInTouch[i], 10, 10 + (25 * i), keepInTouch[i].toUpperCase() + ": 0", "white")

            GetLabelById("VERSION").innerHTML = "v1.2.0"; //BNversion
    GetLabelById("NARROWVERSION").innerHTML = versionKey;
}

const GetLabelById = id => document.getElementById(id);

class EnvironmentExplorer { // CLASSIFIED AS A CHEAT, DONT ACTIVATE UNLESS DEBUGGING
    constructor(t) {
        this.scene = t;
        this.explorerLab = [];
    }
    PushItem(item) {
        this.explorerLab.push(item);
    }
    init() {
        this.RefreshWindow();
    }
    ClearWindow() {
        for (let i = 0; i < this.explorerLab.length; i++)
            this.explorerLab[i].remove();
        this.explorerLab = [];
    }
    RefreshWindow() { // called everytime something has been modified in the scene
        this.ClearWindow()

        let explorerItems = []

        scene.traverse(function (obj) {
            if (explorerItems.length >= 24)
                explorerItems.shift(); // delete last item

            if (obj != undefined && obj != null)
                explorerItems.push(obj.name === "" ? "UNDEFINED" : obj.name);
        });

        for (let i = 0; i < explorerItems.length; i++)
            createLab(explorerItems[i], 10, 10 + (25 * i), explorerItems[i], "white", true)
    }
}

class TreroClientHandle {
	constructor(websocket) {
		this.ws = new WebSocket(websocket);
		
        this.ws.addEventListener("message", (i => {
			const packet = JSON.parse(i.data);
			
			switch(packet.status) {
				case "ping":
					this.SendStatus("pong");
					break;
				case "log":
					console.log(packet.data);
					break;
			}
        }));
		
		this.ws.addEventListener("open", (i => {
			this.Send(JSON.stringify({
				status: "broadcast",
				data: "hey guys im from another client"
			}));
        }));
	}
	
	Send(data) {
		this.ws.send(data); // dont call this websocket because its not finished yet (its gonna be for the chat system)
	}
	
	SendStatus(data) {
		this.ws.send(JSON.stringify({
			status: data
		}));
	}
}

//let trero_client = new TreroClientHandle("wss://narrow-chat.yeemirouth1301.workers.dev/api/v1/narrow-chat"); // ws://localhost:13102/narrowchat

class BetterNarrow {
	onFrameRender_Event = new Event('onFrameRender')
	onInitialization_Event = new Event('onInitialization')
	
	GetClient() {
		return globalInstance
	}
	Log(plugin, output) {
		console.log('[' + plugin + '] ' + output);
	}
	onFrameRender(func) {
		window.addEventListener("onFrameRender", function() {
			func(ThreeAPI);
		});
	}
	onInitialization(func) {
		window.addEventListener("onInitialization", function() {
			func(ThreeAPI, BetterNarrowAPI.GetClient());
		});
	}
}
let BetterNarrowAPI = new BetterNarrow();

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


//Update checker
function checkBNupdate(url) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onload = function() {
		status = request.status;
		if (request.status == 200)
		{
			console.log("update exists");
			alert('A new version of BetterNarrow has been spotted! Go download it!');
		} else {
			console.log("update doesn't exist");
		}
	}
}
checkBNupdate("https://raw.githubusercontent.com/Selkensy/betternarrowimages/master/betternarrowbackup/BetterNarrow-1.2.1.zip"); //BNversion
//Update checker

/** OLD FUNCTIONS
function init() {
	__require(['https://unpkg.com/three@latest/build/three.min.js'], function(threejs)
	{
		ThreeAPI = threejs
		
		let firstTime = true;
		
		window.addEventListener('keydown', function(event) { // this is classified as a cheat so Im going to redo it later today
			if (String.fromCharCode(event.keyCode) === "R") {
				let settings = BetterNarrowAPI.GetClient().settingsManager;
				settings.setValue("thirdpersoncam", !settings.getValue("thirdpersoncam"))
			}
			
			if (String.fromCharCode(event.keyCode) === "N") {
				//BetterNarrowAPI.GetClient().gameManager.currentGame.scoreOffsetNotificationsUi.showOffsetNotification("Panic mode has been removed" , null, "hey");
			}
		});

		function animate() {
			requestAnimationFrame(animate); // insane calcilatopoms pl;z terust me
			
			window.dispatchEvent(BetterNarrowAPI.onFrameRender_Event); // call onRender event for plugins
			
			let client = BetterNarrowAPI.GetClient();
			
			if (client) {
				if (client.gameManager && client.gameManager.currentGame) {
					let curGame = client.gameManager.currentGame;
					
					if (curGame.getMyPlayer()) {
						let player = curGame.getMyPlayer();
						
						//client.settingsManager.setValue("thirdpersoncam", false)
						if (client.settingsManager.getValue("thirdpersoncam"))
							player.thirdPerson = true;
						else player.thirdPerson = false;
						
						player.updateModelVisibility()
					}
				}
				
			}
			//DISABLED START
			if (client && firstTime) {
				firstTime = false;
				
				
				//client.dialogManager.showAlert({
				//	title: "BetterNarrow",
				//	text: "BetterNarrow by yeemi#9764 created to allow more graphics control"
				//})

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

					let lazystyelrl = document.createElement('style');
					lazystyelrl.id = "GameStyle";
					lazystyelrl.innerHTML = '';
					document.head.prepend(lazystyelrl);
					document.head.insertBefore(lazystyelrl, document.head.firstChild);
				});
				
				window.dispatchEvent(BetterNarrowAPI.onInitialization_Event);
			} //DISABLED STOP
			//DISABLED START
			waitForElm('#mainMenu > div.main-menu-promo-banner-container > div').then((elm) => {
				elm.style.backgroundImage =
				'url(\"https://raw.githubusercontent.com/Laamy/narrow-one-tmp/main/discord-dark.png")';
			});
			//DISABLED STOP
		}
		animate();
	})
}
**/
init();
