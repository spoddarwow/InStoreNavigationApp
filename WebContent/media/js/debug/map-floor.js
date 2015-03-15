/**
 * Object : Floor (in 3.js term plane geometry. Can be grid or plane.
 */

function Floor(object) {
	this.floorGeometry;
	this.floorPositionX;
	this.floorPositionY;
	this.floorPositionZ;
	this.floorWidth;
	this.floorHeight;
}
/**
 * Uses PlaneBufferGeometry to create a plan with width and height passed.
 */
Floor.prototype.createFloor = function(width, height) {
	if ((!width) || (!height)) {
		return;
	}
	var floor = new Floor();
	floor.floorWidth = width;
	floor.floorHeight = height;
	floor.floorGeometry = new THREE.PlaneBufferGeometry(width, height);
	return floor;
}
