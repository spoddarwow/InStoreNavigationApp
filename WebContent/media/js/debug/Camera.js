/**
 * Focusses on camera functionality
 */
var Camera = function Camera() {
	this.cameraInstance;

	this.setUp = function(screenWidth, screenHeight) {
		this.cameraInstance = new THREE.PerspectiveCamera(45, screenWidth
				/ screenHeight, 0.1, 1000);
	}

	this.setXPosition = function(x) {
		this.cameraInstance.position.x = x;
	}

	this.setYPosition = function(y) {
		this.cameraInstance.position.y = y;
	}

	this.setZPosition = function(z) {
		this.cameraInstance.position.z = z;
	}
}
