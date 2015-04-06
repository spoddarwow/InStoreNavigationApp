/**
 * Focusses on renderer functionality
 */
function Renderer() {
	this.renderer;

	this.setUp = function() {
		this.renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight - 50);
	}

	this.setColor = function(color) {
		this.renderer.setClearColor(color);
	}
}
