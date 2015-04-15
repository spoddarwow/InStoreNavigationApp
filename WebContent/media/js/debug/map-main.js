/**
 * Main JS to display the map.
 */
var container;
var scene = new THREE.Scene();
var renderer = new Renderer();
var camera = new Camera();
var storeMap = new StoreMap();
var height = window.innerHeight;
var width = window.innerWidth;
var controls;
var rayCastor = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
var objectOnIntersct = null;
var isMouseClicked = false;
var shiftClicked = false;
var basicPlane;
var offset = new THREE.Vector3();
var floorObject;

var init = function() {
	// container = document.createElement('div');
	// document.body.appendChild( container );
	this.scene.add(new THREE.AmbientLight(0x505050));
	this.renderer.setUp();
	this.camera.setUp(width, height);
	document.body.appendChild(renderer.renderer.domElement);
	// this.camera.setXPosition(50);
	this.camera.setYPosition(500);
	this.camera.setZPosition(1000);
	this.camera.cameraInstance.lookAt(this.scene.position);
	controls = new THREE.TrackballControls(this.camera.cameraInstance);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	renderer.setColor(0xf0f0f0);
	renderer.renderer.domElement.addEventListener("keydown", onDocumentKeyDown,
			false);
	renderer.renderer.domElement.addEventListener("keyup", onDocumentKeyUp,
			false);
	renderer.renderer.domElement.addEventListener('mousedown', onMouseDown,
			false);
	renderer.renderer.domElement.addEventListener('mouseup', onMouseUp, false);
	renderer.renderer.domElement.addEventListener('mousemove', onMousemove,
			false);
	render();
}

var render = function() {
	renderer.renderer.render(scene, camera.cameraInstance);
	controls.update();
	requestAnimationFrame(render);
}

var addBasicInvisiblePlane = function(width, height, floorWrapper) {
	var cubeGeometry = new THREE.BoxGeometry(width, height, 4);
	var cubeMaterial = new THREE.MeshLambertMaterial({
		color : 0x000000,
		opacity : 0.25,
		transparent : true,
		side : THREE.BackSide
	});
	basicPlane = new THREE.Mesh(cubeGeometry, cubeMaterial);
	basicPlane.name = "invisble-plane";
	basicPlane.visible = false;
	basicPlane.position.x = floorWrapper.position.x;
	basicPlane.position.y = floorWrapper.position.y;// + 1.205 * Math.PI
	basicPlane.rotation.x = floorWrapper.rotation.x;
	scene.remove(scene.getObjectByName('invisble-plane'));
	this.scene.add(basicPlane);
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
	wrapper.position.x = -30;
	wrapper.position.y = -18.10;
	wrapper.rotation.x = -0.5 * Math.PI;
	floorObject = wrapper;
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
	controls.enabled = true;
	addBasicInvisiblePlane(width, height, wrapper);
	$("div[id^='controller']").removeClass('hidden');
}

var addCasier = function() {
	var planeGeometry = new THREE.BoxGeometry(
			floorObject.geometry.parameters.width / (2 * Math.PI),
			floorObject.geometry.parameters.height / (2 * Math.PI), 0.01);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color : 0xcccccc,
		map : THREE.ImageUtils.loadTexture('../media/images/cashier.jpg')
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	// plane.name = "Door";
	plane.receiveShadow = true;

	plane.position.y = 100;
	// plane.rotation.x = 6;
	// plane.rotation.z = -0.08 * Math.PI;
	this.storeMap.addObjectToMapObjects("Door", plane, plane);
	this.scene.add(plane);
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(15, 10, 20);
	spotLight.castShadow = true;
	this.scene.add(spotLight);
}

var addDoor = function(thisObject) {
	THREE.ImageUtils.crossOrigin = 'anonymous';
	var planeGeometry = new THREE.BoxGeometry(
			floorObject.geometry.parameters.width / (2 * Math.PI),
			floorObject.geometry.parameters.height / (2 * Math.PI), 100);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color : 0xcccccc,
		map : THREE.ImageUtils.loadTexture('../media/images/door.png')
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	// plane.name = "Door";
	plane.receiveShadow = true;

	plane.position.y = 100;
	// plane.rotation.x = 6;
	// plane.rotation.z = -0.08 * Math.PI;
	this.storeMap.addObjectToMapObjects("Door", plane, plane);
	this.scene.add(plane);
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(15, 10, 20);
	spotLight.castShadow = true;
	this.scene.add(spotLight);
}

function onDocumentKeyDown(e) {
	var keyCode = event.which;
	if (keyCode == 17) {
		if ((isMouseClicked) && (objectOnIntersct)) {
		}
	} else if (keyCode == 16) {
		if ((isMouseClicked) && (objectOnIntersct)) {
			shiftClicked = true;
		}
	}
}

function onMouseDown(e) {
	mouseVector.x = 2 * (e.clientX / width) - 1;
	mouseVector.y = 1 - 2 * (e.clientY / height);
	rayCastor.setFromCamera(mouseVector, camera.cameraInstance);
	var intersects = rayCastor.intersectObjects(storeMap.getMapObject());
	if ((intersects.length > 0) && (intersects[0].object.name != "floor-mesh")) {
		controls.enabled = false;
		objectOnIntersct = intersects[0];
		isMouseClicked = true;
		offset.copy(intersects[0].point).sub(basicPlane.position);
	}
}

function onMouseUp(e) {
	objectOnIntersct = null;
	isMouseClicked = false;
	controls.enabled = true;
}

function onMousemove(e) {
	if (isMouseClicked) {
		mouseVector.x = 2 * (e.clientX / width) - 1;
		mouseVector.y = 1 - 2 * (e.clientY / height);
		rayCastor.setFromCamera(mouseVector, camera.cameraInstance);
		var intersects = rayCastor.intersectObject(basicPlane);
		objectOnIntersct.object.position.copy(intersects[0].point.sub(offset));
	}
}

function onDocumentKeyUp(e) {

	var keyCode = event.which;
	if (keyCode == 17) {

	} else if (keyCode == 16) {
		shiftClicked = false;
	}

}