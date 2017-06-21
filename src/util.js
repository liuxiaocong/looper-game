/**
 * Created by xiaoconglau on 20/06/2017.
 */

export const Util = {
  setPixelated: function(context) {
    context['imageSmoothingEnabled'] = false;
    /* standard */
    context['mozImageSmoothingEnabled'] = false;
    /* Firefox */
    context['oImageSmoothingEnabled'] = false;
    /* Opera */
    context['webkitImageSmoothingEnabled'] = false;
    /* Safari */
    context['msImageSmoothingEnabled'] = false;
    /* IE */
  },

  getPxFromDp: function(dp) {
    return window.devicePixelRatio * dp;
  },
};

export const ImageUtil = {
  drawImage: function(context, uri, x, y, width, height, radius) {
    let _image = new Image();
    _image.onload = function() {
      //console.log("onload:" + uri);
      context.drawImage(_image, x, y);
    }
    _image.src = uri;
  },
};