/**
 * Main object to keep track of the store structure.
 */
function StoreMap(object) {
	var mapObjectsWdName = [];
	var mapObjectSize = 0;
	var mapObject = [];

	this.addObjectToMapObjects = function(name, object, meshObject) {
		mapObject.push(meshObject);
		mapObjectsWdName[name] = object;
		mapObjectSize += 1;
		buildMapObjectAsArray();
		// TODO : Perform ajax to update temp table.
		console.log(mapObject);
	}

	this.getMapObjectsWdName = function() {
		return mapObjectsWdName;
	}

	var buildMapObjectAsArray = function() {
		return mapObjectsWdName;
	}

	this.getObjectByName = function(name){
		return mapObjectsWdName[name] ;
	}
	
	this.getMapObject = function(){
		return mapObject;
	}
	
	this.removeObject = function(name) {
		var object = mapObjectsWdName[name];
		mapObject.remove(object);
	}
};

