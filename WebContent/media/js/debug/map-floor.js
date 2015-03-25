/**
 * Object : Floor (in 3.js term plane geometry. Can be grid or plane.
 */

function Floor(object) {
	this.objectName = 'Floor';
	this.floorGeometry;
	this.floorPositionX;
	this.floorPositionY;
	this.floorPositionZ;
	this.floorWidth;
	this.floorHeight;
	
	this.createFloor = function(width, height) {
		if ((!width) || (!height)) {
			return;
		}
		var floor = new Floor();
		floor.floorWidth = width;
		floor.floorHeight = height;
		floor.floorGeometry = new THREE.PlaneBufferGeometry(width, height);
		return floor;
	}
	
	this.updateDimension = function(width, height) {
		if ((!width) || (!height)) {
			return;
		}
		this.floorWidth = width;
		this.floorHeight = height;
		this.floorGeometry.parameters.height = height;
		this.floorGeometry.parameters.width = width;
		return this;
	}
}
