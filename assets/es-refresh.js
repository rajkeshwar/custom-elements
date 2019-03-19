
import defaults from './es-settings';

let settings = defaults;

export class SliderRefresh {

  constructor($children) {
    this.slideValue = 0;
    this.pagerWidth = 0;
    this.slideWidth = 0;
    this.thumbWidth = 0;
    this.w          = 0;
    this.$children = $children;
  }

  calSW() {
    if (settings.autoWidth === false) {
      this.slideWidth = (this.elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
    }
  }

  calWidth(cln) {
    var ln = cln === true ? this.$slide.find('.lslide').length : this.$children.length;
    if (settings.autoWidth === false) {
      this.w = ln * (this.slideWidth + settings.slideMargin);
    } else {
      this.w = 0;
      for (var i = 0; i < ln; i++) {
        this.w += (parseInt(this.$children.eq(i).width()) + settings.slideMargin);
      }
    }
    return this.w;
  }

  chbreakpoint() {
    let windowW = $(window).width();
    this.windowW = windowW;

    if (settings.responsive.length) {
      var item;
      if (settings.autoWidth === false) {
        item = settings.item;
      }
      if (windowW < settings.responsive[0].breakpoint) {
        for (var i = 0; i < settings.responsive.length; i++) {
          if (windowW < settings.responsive[i].breakpoint) {
            breakpoint = settings.responsive[i].breakpoint;
            resposiveObj = settings.responsive[i];
          }
        }
      }
      if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
        for (var j in resposiveObj.settings) {
          if (resposiveObj.settings.hasOwnProperty(j)) {
            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
              settingsTemp[j] = settings[j];
            }
            settings[j] = resposiveObj.settings[j];
          }
        }
      }
      if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
        for (var k in settingsTemp) {
          if (settingsTemp.hasOwnProperty(k)) {
            settings[k] = settingsTemp[k];
          }
        }
      }
      if (settings.autoWidth === false) {
        if (slideValue > 0 && this.slideWidth > 0) {
          if (item !== settings.item) {
            scene = Math.round(slideValue / ((this.slideWidth + settings.slideMargin) * settings.slideMove));
          }
        }
      }
    }
  }
}
