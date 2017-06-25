/**
 * Created by xiaoconglau on 20/06/2017.
 */

export const Util = {
  setPixelated(context) {
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

  getPxFromDp(dp) {
    return window.devicePixelRatio * dp;
  },

  getDimensions(dp) {
    const screenWidth = window.document.body.clientWidth;
    return screenWidth - this.getPxFromDp(dp);
  },

  layout() {
    const scale = 1 / window.devicePixelRatio;
    document.documentElement.style.zoom = scale * 100 + '%';
    document.documentElement.style.fontSize = 14 / scale + 'px';
  },

};

export const ImageUtil = {
  drawImage: function(context, uri, x, y, width, height, radius) {
    let _image = new Image();
    _image.onload = function() {
      //console.log("onload:" + uri);
      context.drawImage(_image, x, y);
    };
    _image.src = uri;
  },
};