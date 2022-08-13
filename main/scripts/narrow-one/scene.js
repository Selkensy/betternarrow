let scene;
	
WeakMap.prototype.set = new Proxy( WeakMap.prototype.set, {
	apply(target, thisArgs, args) {
		if (args[0].type == "Scene") {
			if (scene == undefined)
				scene = args[0];
			//console.log('scene detected');
		}

		return Reflect.apply(...arguments);
	}
});