/**
 * 
 */
var scene = new THREE.Scene();
var renderer = new Renderer();
var camera = new Camera();
var height = window.innerHeight;
var width = window.innerWidth;
var controls;
var group;
var init = function() {
	this.scene.add(new THREE.AmbientLight(0x505050));
	this.renderer.setUp();
	this.camera.setUp(width, height);
	controls = new THREE.TrackballControls(this.camera.cameraInstance);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	document.body.appendChild(renderer.renderer.domElement);
	this.camera.setZPosition(100);
	this.camera.cameraInstance.lookAt(this.scene.position);
	renderer.setColor(0xf0f0f0);
	// decorate();
	group = new THREE.Group();
	group.position.y = 10;
	makeCashier();
	createCustomGeometry();
	scene.add(group);
	render();
}

var render = function() {
	renderer.renderer.render(scene, camera.cameraInstance);
	controls.update();
	requestAnimationFrame(render);
}

var makeCashier = function() {

	var rectLength = 120, rectWidth = 40;
	var rectShape = new THREE.Shape();
	rectShape.moveTo(0, 0);
	rectShape.lineTo(0, rectWidth);
	rectShape.lineTo(rectLength, rectWidth);
	rectShape.lineTo(rectLength, 0);
	rectShape.lineTo(0, 0);
	
	
	
	
	var cubeGeometry = new THREE.BoxGeometry(5, 15, 5);
	var basicPlane = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({
		color : 'black'
	}));
	basicPlane.position.x = -8;
	basicPlane.position.y = -3.80;
	basicPlane.rotation.x = -0.5 * Math.PI;
	this.scene.add(basicPlane);

}

var decorate = function() {
	var cubeGeometry = new THREE.BoxGeometry(10, 15, 4, 1, 1, 1);
	var texture = THREE.ImageUtils
			.loadTexture('../media/images/cashier-texture.jpg')
	// texture.wrapS = THREE.RepeatWrapping;
	// texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 2);
	texture.flipY = false;
	var cubeMaterials = new THREE.MeshBasicMaterial({
		map : texture,
	// side : THREE.BackSide
	})
	basicPlane = new THREE.Mesh(cubeGeometry, cubeMaterials);
	basicPlane.position.x = -8;
	basicPlane.position.y = -3.80;
	basicPlane.rotation.x = -0.5 * Math.PI;
	this.scene.add(basicPlane);
	createCustomGeometry();

	scene.add(group);

}

var createCustomGeometry = function() {
	var arcShape = new THREE.Shape();
	arcShape.moveTo(50, 10);
	arcShape.absarc(10, 10, 40, 0, Math.PI * 2, false);

	var holePath = new THREE.Path();
	holePath.moveTo(20, 10);
	holePath.absarc(10, 10, 10, 0, Math.PI * 2, true);
	arcShape.holes.push(holePath);
	var extrudeSettings = {
		amount : 8,
		bevelEnabled : true,
		bevelSegments : 2,
		steps : 2,
		bevelSize : 1,
		bevelThickness : 1
	};
	addShape(arcShape, extrudeSettings, 0x804000, 150, 0, 0, 0, 0, 0, 1);

	var rectLength = 120, rectWidth = 40;

	var rectShape = new THREE.Shape();
	rectShape.moveTo(0, 0);
	rectShape.lineTo(0, rectWidth);
	rectShape.lineTo(rectLength, rectWidth);
	rectShape.lineTo(rectLength, 0);
	rectShape.lineTo(0, 0);
	var rectLength = 220, rectWidth = 90;

	var roundedRectShape = new THREE.Shape();

	(function roundedRect(ctx, x, y, width, height, radius) {

		ctx.moveTo(x + 50, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height
				- radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);

	})(roundedRectShape, 0, 0, 50, 50, 20);
	var holePath = new THREE.Path();
	holePath.moveTo(20, 10);
	holePath.absarc(10, 10, 10, 0, Math.PI * 2, true);
	// rectShape.holes.push(roundedRectShape);
	addShape(rectShape, extrudeSettings, 'black', -50, 5, 0, 0, 0, 0, 1);
}

function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {

	var points = shape.createPointsGeometry();
	var spacedPoints = shape.createSpacedPointsGeometry(50);

	/*
	 * // flat shape
	 * 
	 * var geometry = new THREE.ShapeGeometry(shape);
	 * 
	 * var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color :
	 * color, side : THREE.DoubleSide })); mesh.position.set(x, y, z - 125);
	 * mesh.rotation.set(rx, ry, rz); mesh.scale.set(s, s, s); group.add(mesh);
	 */

	// 3d shape
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

	var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
		color : color
	}));
	mesh.position.set(x, y, z - 75);
	mesh.rotation.set(rx, ry, rz);
	mesh.scale.set(s, s, s);
	group.add(mesh);

	/*
	 * // solid line
	 * 
	 * var line = new THREE.Line(points, new THREE.LineBasicMaterial({ color :
	 * color, linewidth : 3 })); line.position.set(x, y, z - 25);
	 * line.rotation.set(rx, ry, rz); line.scale.set(s, s, s); group.add(line); //
	 * vertices from real points
	 * 
	 * var pgeo = points.clone(); var particles = new THREE.PointCloud(pgeo, new
	 * THREE.PointCloudMaterial({ color : color, size : 4 }));
	 * particles.position.set(x, y, z + 25); particles.rotation.set(rx, ry, rz);
	 * particles.scale.set(s, s, s); group.add(particles); // line from
	 * equidistance sampled points
	 * 
	 * var line = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
	 * color : color, linewidth : 3 })); line.position.set(x, y, z + 75);
	 * line.rotation.set(rx, ry, rz); line.scale.set(s, s, s); group.add(line); //
	 * equidistance sampled points
	 * 
	 * var pgeo = spacedPoints.clone(); var particles2 = new
	 * THREE.PointCloud(pgeo, new THREE.PointCloudMaterial({ color : color, size :
	 * 4 })); particles2.position.set(x, y, z + 125);
	 * particles2.rotation.set(rx, ry, rz); particles2.scale.set(s, s, s);
	 * group.add(particles2);
	 */

}