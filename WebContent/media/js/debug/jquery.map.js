/**
 * Jquery functionality for the map
 */

$('.arrow-side-up').click(function(){
	console.log(this.cameraInstance.position.y);
	var yPose = this.cameraInstance.position.y + 5;
	this.camera.setYPosition(yPose);
	console.log(this.cameraInstance.position.y);
})