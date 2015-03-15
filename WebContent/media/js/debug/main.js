/**
 * 
 */
var scene;
var camera;
var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var cube;
var plane;
var cubeXPos;
var cubeYPos;
var mouseVector;
var controls;
var rayCastor;
var objects = [];
var objectOnIntersct;
function init() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	renderer.setSize(width, height);
	renderer.setClearColor(0x000000, 1.0);
	// use to init the shadow for the configured object.
	renderer.shadowMapEnabled = true;
	camera = new THREE.PerspectiveCamera(45, window.innerWidth
			/ window.innerHeight, 0.1, 1000);
	decorate();
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);
	document.body.appendChild(renderer.domElement);
	document.addEventListener("keydown", onDocumentKeyDown, false);
	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('click', onMouseClick, false);
	render();
}

function decorate() {
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshLambertMaterial({
		color : "red",
		side : THREE.BackSide
	});
	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	cubeXPos = -3;
	cubeYPos = 3;
	cube.position.x = cubeXPos;
	cube.position.y = cubeYPos;
	objects.push(cube);
	scene.add(cube);
	var planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color : 0xcccccc
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.position.x = -2;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -2.10;
	objects.push(plane);
	scene.add(plane);
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(25, 15, 20);
	spotLight.castShadow = true;

	scene.add(spotLight);
	var pLight = new THREE.PointLight(5, 10, 15)
	pLight.position.set(25, 15, 20);
	// spotLight.castShadow = true;
	scene.add(pLight);
	var ambientLight = new THREE.AmbientLight(0x101010, 1.0);
	scene.add(ambientLight);
	directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
	directionalLight.position.set(0.0, 0.0, 1.0);
	scene.add(directionalLight);
	mouseVector = new THREE.Vector3();
	rayCastor = new THREE.Raycaster();
	controls = new THREE.TrackballControls(camera);
	controls.zoomSpeed = 0.1;
	console.log(JSON.stringify(scene));
}

function onDocumentKeyDown(event) {
	console.log(event.which);
	var keyCode = event.which;
	if (keyCode == 37) {
		cubeXPos += 0.1;
	} else if (keyCode == 39) {
		cubeYPos += 0.1;
	}
}

function onMouseMove(e) {
	// mouseVector.x = 2 * (e.clientX / width) - 1;
	// mouseVector.y = 1 - 2 * (e.clientY / height);
	if (objectOnIntersct == null) {
		return;
	} else if ("PlaneBufferGeometry" == objectOnIntersct.geometry.type) {

	} else if ("BoxGeometry" == objectOnIntersct.geometry.type) {
		var geaometry = objectOnIntersct.geometry;
		console.log("---objectOnIntersct---");
		console.log(objectOnIntersct);
		console.log("---cube---");
		console.log(cube);
		var x_diff = e.clientX - mouseVector.x, y_diff = e.clientY
				- mouseVector.y;
		
		objectOnIntersct.__dirtyPosition = true;
		objectOnIntersct.position.x = objectOnIntersct.position.x + x_diff;
		objectOnIntersct.position.y = objectOnIntersct.position.y - y_diff;

		mouseVector.x = e.clientX;
		mouseVector.y = e.clientY;
	} else {
		objectOnIntersct = null;
	}
	render();
}

function onMouseClick(e) {

	mouseVector.x = 2 * (e.clientX / width) - 1;
	mouseVector.y = 1 - 2 * (e.clientY / height);
	rayCastor.setFromCamera(mouseVector, camera);
	var intersects = rayCastor.intersectObjects(objects);
	if (intersects.length > 0) {
		var intersect = intersects[0];
		if (null != intersect && null != intersect.object) {
			var geometry = intersect.object.geometry;
			console.log(geometry.type);
			if ("PlaneBufferGeometry" == geometry.type) {
				console.log("Plan");
				objectOnIntersct = intersect.object;
			} else if ("BoxGeometry" == geometry.type) {

				objectOnIntersct = intersect.object;

				console.log("Box");
				console.log(e.clientX);
				console.log(e.clientY);
			} else {
				objectOnIntersct = null;
			}
		}
	}

}

function reset() {
	var ele = renderer.domElement;
	document.body.init();
}

function render() {
	cube.position.x = cubeXPos;
	cube.position.y = cubeYPos;
	scene.add(cube);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);

}
