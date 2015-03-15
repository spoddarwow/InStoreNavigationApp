/**
 * This wraps the object and mesh material with THREE.Mesh
 */

function MeshWrapper(object) {
	this.geometry;
	this.meshMaterial;
	this.rotation = new Axis();
	this.position = new Axis();
}

MeshWrapper.prototype.wrapWithMesh = function(geometry, meshMaterial) {
	return new THREE.Mesh(geometry, meshMaterial);
}