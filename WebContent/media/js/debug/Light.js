/**
 * Handles the light on the subject.
 */
function Light(object) {
	this.lightObject;

	this.createSpotLight = function(hex, intensity, distance, angle, exponent) {
		if (hex === undefined) {
			hex = 0xffffff;
		}
		this.lightObject = new THREE.SpotLight(hex, intensity, distance, angle,
				exponent);
	}

	this.createPointLight = function(hex, intensity, distance) {
		this.lightObject = new THREE.PointLight(hex, intensity, distance);
	}
}
