// suicide keybind

let pluginName;

let client;

BetterNarrowAPI.onInitialization(function(THREE, gameClient) {
	pluginName = "Template";
	client = gameClient;
	
	BetterNarrowAPI.Log(pluginName, 'Initalized');
});

BetterNarrowAPI.onFrameRender(function(THREE) {
	if (pluginName === undefined) return; // theres a single frame before initialization
	
	//BetterNarrowAPI.Log(pluginName, 'Frame');
});