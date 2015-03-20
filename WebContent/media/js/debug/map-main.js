/**
 * Main JS to display the map.
 */

var scene = new THREE.Scene();
var renderer = new Renderer();
var camera = new Camera();
var storeMap = new StoreMap();
var height = window.innerHeight;
var width = window.innerWidth;

var init = function() {
	this.renderer.setUp();
	this.camera.setUp(width, height);
	document.body.appendChild(renderer.renderer.domElement);
	this.camera.setXPosition(5);
	this.camera.setYPosition(16);
	this.camera.setZPosition(13);
	this.camera.cameraInstance.lookAt(this.scene.position);
	render();
}

var render = function() {
	renderer.renderer.render(scene, camera.cameraInstance);
	requestAnimationFrame(render);
}

var addFloor = function() {
	var floor = new Floor();
	floor = floor.createFloor(20, 20);
	var marshel = new MeshLambertMaterial()
			.createMeshLambertMaterial(' 0xcccccc');
	var wrapper = new MeshWrapper().wrapWithMesh(floor.floorGeometry, marshel);
	scene.add(wrapper);
	var light = new Light();
	light.createSpotLight();
	light.lightObject.position.set(25, 15, 20);
	scene.add(light.lightObject);
}