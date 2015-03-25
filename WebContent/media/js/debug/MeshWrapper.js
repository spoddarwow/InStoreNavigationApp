/**
 * This wraps the object and mesh material with THREE.Mesh
 */

function MeshWrapper(object) {
	this.wrapWithMesh = function(geometry, meshMaterial, name) {
		var meshObject = new THREE.Mesh(geometry, meshMaterial);
		meshObject.name = name;
		return meshObject;
	}

}
