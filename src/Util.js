/**
 * Created by xiaoconglau on 20/06/2017.
 */


const Util = {
	setPixelated:function( context ) {
		context[ 'imageSmoothingEnabled' ] = false;
		/* standard */
		context[ 'mozImageSmoothingEnabled' ] = false;
		/* Firefox */
		context[ 'oImageSmoothingEnabled' ] = false;
		/* Opera */
		context[ 'webkitImageSmoothingEnabled' ] = false;
		/* Safari */
		context[ 'msImageSmoothingEnabled' ] = false;
		/* IE */
	},

	getPxFromDp:function ( dp ) {
		return window.devicePixelRatio * dp;
	}
}

module.exports = Util;