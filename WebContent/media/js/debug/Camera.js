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

	this.negateXPos = function() {
		var currentValue = this.cameraInstance.position.x;
		this.setXPosition(parseInt(currentValue) - parseInt(1));
	}

	this.positedXPos = function() {
		var currentValue = this.cameraInstance.position.x;
		this.setXPosition(parseInt(currentValue) + parseInt(1));
	}

	this.negateYPos = function() {
		var currentValue = this.cameraInstance.position.y;
		this.setYPosition(parseInt(currentValue) - parseInt(1));
	}

	this.positedYPos = function() {
		var currentValue = this.cameraInstance.position.y;
		this.setYPosition(parseInt(currentValue) + parseInt(1));
	}

	this.negateZPos = function() {
		var currentValue = this.cameraInstance.position.z;
		this.setZPosition(parseInt(currentValue) - parseInt(1));
	}

	this.positedZPos = function() {
		var currentValue = this.cameraInstance.position.z;
		this.setZPosition(parseInt(currentValue) + parseInt(1));
	}
}
