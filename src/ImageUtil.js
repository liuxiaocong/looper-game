/**
 * Created by xiaoconglau on 20/06/2017.
 */


const ImageUtil = {
	drawImage: function ( context, uri, x, y, width, height, radius ) {
		let _image = new Image();
		_image.onload = function() {
			//console.log("onload:" + uri);
			context.drawImage(_image, x, y);
		}
		_image.src = uri;
	}
}

module.exports = ImageUtil;