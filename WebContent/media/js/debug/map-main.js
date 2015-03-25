/**
 * Main JS to display the map.
 */

var scene = new THREE.Scene();
var renderer = new Renderer();
var camera = new Camera();
var storeMap = new StoreMap();
var height = window.innerHeight;
var width = window.innerWidth;
var controls;
var rayCastor;
var mouseVector;
var objectOnIntersct = null;
var isMouseClicked = false;

var init = function() {
	this.renderer.setUp();
	this.camera.setUp(width, height);
	document.body.appendChild(renderer.renderer.domElement);
	this.camera.setXPosition(15);
	this.camera.setYPosition(16);
	this.camera.setZPosition(13);
	this.camera.cameraInstance.lookAt(this.scene.position);
	// controls = new THREE.TrackballControls(this.camera.cameraInstance);
	// controls.zoomSpeed = 0.1;
	mouseVector = new THREE.Vector3();
	rayCastor = new THREE.Raycaster();
	document.addEventListener("keydown", onDocumentKeyDown, false);
	window.addEventListener('mousedown', onMouseDown, false);
	window.addEventListener('mouseup', onMouseUp, false);
	render();
}

var render = function() {
	renderer.renderer.render(scene, camera.cameraInstance);
	// controls.update();
	requestAnimationFrame(render);
}

var addFloor = function(thisObject) {
	var jqueryObj = $(thisObject);
	var width = parseInt($(thisObject).parent().find('.create-floor-width')
			.val())
	var height = parseInt($(thisObject).parent().find('.create-floor-height')
			.val())
	if (!(storeMap.getObjectByName("floor") === undefined)) {
		log("The floor is already added, hence updating the dimension.");
	}
	// TODO : Get default width/height if not provided.
	var floor = new Floor();
	floor = floor.createFloor(width, height);
	// this.storeMap.removeObject("floor");
	var marshel = new MeshLambertMaterial()
			.createMeshLambertMaterial(' 0xcccccc');
	var wrapper = new MeshWrapper().wrapWithMesh(floor.floorGeometry, marshel,
			"floor-mesh");
	wrapper.position.x = -2;
	wrapper.position.y = -2.10;
	wrapper.rotation.x = -0.5 * Math.PI;
	this.storeMap.addObjectToMapObjects("floor", floor, wrapper);
	var existingFloor = scene.getObjectByName('floor-mesh');
	scene.remove(existingFloor);
	scene.add(wrapper);
	var light = new Light();
	light.createPointLight();
	light.lightObject.position.set(25, 15, 20);
	light.lightObject.name = "floor-light";
	var existingLight = scene.getObjectByName('floor-light');
	scene.remove(existingLight);
	scene.add(light.lightObject);
	$('.floor').popover('hide');
	$('.floor-create-button').html('Update Floor Dimension');
}

var addDoor = function(thisObject) {
	THREE.ImageUtils.crossOrigin = 'anonymous';
	var planeGeometry = new THREE.PlaneBufferGeometry(2.5, 2);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color : 0xcccccc,
		map : THREE.ImageUtils.loadTexture('../media/images/door.png')
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	this.storeMap.addObjectToMapObjects("Door", plane, plane);
	plane.receiveShadow = true;
	plane.rotation.x = 12;
	plane.rotation.z = -0.05 * Math.PI;
	this.scene.add(plane);
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(15, 10, 20);
	spotLight.castShadow = true;
	this.scene.add(spotLight);
}

function onDocumentKeyDown(e) {
	var keyCode = event.which;
	if (keyCode == 17) {
		log("clicked contril : " + isMouseClicked + " " + objectOnIntersct);
		if ((isMouseClicked) && (objectOnIntersct)) {
			log("You have pressed CTRL. Good Job");
			log(objectOnIntersct);
		}
	} else if (keyCode == 16) {
		log("clicked shift : " + isMouseClicked + " " + objectOnIntersct);
		if ((isMouseClicked) && (objectOnIntersct)) {
			log("You have pressed SHIFT. Very Good Job");
			log(objectOnIntersct);
		}
	}
}

function onMouseDown(e) {
	mouseVector.x = 2 * (e.clientX / width) - 1;
	mouseVector.y = 1 - 2 * (e.clientY / height);
	rayCastor.setFromCamera(mouseVector, camera.cameraInstance);
	console.log(storeMap.getMapObject());
	var intersects = rayCastor.intersectObjects(storeMap.getMapObject());
	console.log(intersects);
	if (intersects.length > 0) {
		objectOnIntersct = intersects[0];
		console.log(objectOnIntersct);
		isMouseClicked = true;
	}
}

function onMouseUp(e) {
	objectOnIntersct = null;
	isMouseClicked = false;
}