/**
 * Create an instance of MeshLambertMaterial
 * http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial
 */
function MeshLambertMaterial(object) {
	this.color;
}

MeshLambertMaterial.prototype.createMeshLambertMaterial = function(color) {
	return new THREE.MeshLambertMaterial({
		color : color,
		map : THREE.ImageUtils.loadTexture('../media/images/floor-texture.png')
	})
}
