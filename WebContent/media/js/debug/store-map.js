/**
 * Main object to keep track of the store structure.
 */
function StoreMap(object) {
	this.mapObjects = {};
	this.mapObjectSize = 0;

};

StoreMap.prototype.getMapObject = function() {
	return this.mapObjects;
};

StoreMap.prototype.getMapObjectAsJson = function() {
	return JSON.stringify(this.mapObjects);
};

StoreMap.prototype.addObjectToMapObjects = function(object) {

	mapObjects.push(object);
	mapObjectSize += 1;
	this.log("Hello Object");
	// TODO : Perform ajax to update temp table.
}