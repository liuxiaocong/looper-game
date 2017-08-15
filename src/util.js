/**
 * Created by xiaoconglau on 20/06/2017.
 */
import  * as consts from './consts';
export const Util = {
  setPixelated(context, enable) {
    context['imageSmoothingEnabled'] = enable;
    /* standard */
    context['mozImageSmoothingEnabled'] = enable;
    /* Firefox */
    context['oImageSmoothingEnabled'] = enable;
    /* Opera */
    context['webkitImageSmoothingEnabled'] = enable;
    /* Safari */
    context['msImageSmoothingEnabled'] = enable;
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

  //also use this to do translate
  stringFormat(str, ...arg){
    let ret = str;
    if (arg && arg.length > 0) {
      for (let i = 0; i < arg.length; i++) {
        let replaceStr = "%" + i + "%";
        let targetStr = arg[i];
        ret = ret.replace(new RegExp(replaceStr, 'g'), targetStr)
      }
    }
    return ret;
  }

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

export const LuckRouletteUtil = {
  getCanvasSize: function() {
    let canvasWidth = Util.getPxFromDp(consts.UI.LOOPER_SIZE);
    if (!consts.Globe.isFixSizeModel) {
      let screenWidth = window.document.body.clientWidth;
      canvasWidth = screenWidth - Util.getPxFromDp(60);
      let maxWidth = screenWidth - Util.getPxFromDp(25 + 15 + 15 + 30);
      if (canvasWidth > maxWidth) {
        canvasWidth = maxWidth;
      }
    }
    return canvasWidth;
  },

  getRouletteRadius: function() {
    let rouletteRadius = Util.getPxFromDp(consts.UI.LOOPER_SIZE / 2 - 2);
    if (!consts.Globe.isFixSizeModel) {
      let canvasWidth = this.getCanvasSize();
      rouletteRadius = canvasWidth / 2 - Util.getPxFromDp(2);
    }
    return rouletteRadius;
  },

  getLineHeight: function() {
    let lineHeight = Util.getPxFromDp(128);
    if (!consts.Globe.isFixSizeModel) {
      let canvasWidth = this.getCanvasSize();
      lineHeight = canvasWidth * 255 / 580 + 2;
    }
    return lineHeight;
  },


  isNetworkProblem: function(res) {
    if (res && res.code && res.code == consts.CLIENT_RESPONSE_CODE.NETWORK_ERROR) {
      return true;
    }
    return false;
  },

  isResponseValid: function(res) {
    if (res && res.data && res.data.status_code == consts.SERVER_RESPONSE_CODE.SUCCESS) {
      return true;
    }
    return false;
  }
};