/**
 * Jquery functionality for the map
 */

$( document ).ready(function() {
	
	$('.floor').popover({
		html : true,
		title : function() {
			return $('.map-hover-html .floor-popover').find('.title').html();
		},
		content : function() {
			controls.enabled = false;
			return $('.map-hover-html .floor-popover').find('.html').html();
		},
		container : 'body',
		placement : 'top'
	});

	$('.camera-pos').popover({
		html : true,
		title : function() {
			return $('.map-hover-html .camera-popover').find('.title').html();
		},
		content : function() {
			return $('.map-hover-html .camera-popover').find('.html').html();
		},
		container : 'body',
		placement : 'top'
	});

	
})


function cameraPosXNeg(){
	this.camera.negateXPos();
}

function cameraPosXPos(){
	this.camera.positedXPos();
}


function cameraPosYNeg(){
	this.camera.negateYPos();
}

function cameraPosYPos(){
	this.camera.positedYPos();
}


function cameraPosZNeg(){
	this.camera.negateZPos();
}

function cameraPosZPos(){
	this.camera.positedZPos();
}