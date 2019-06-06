
import settings from './slider-defaults';

export class ImageSlider extends HTMLElement {

  static get is() {
    return 'image-slider';
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  constructor() {
    super();
    // this.innerHTML = this.render();

    this.windowW = window.outerWidth;
    this.breakpoint = null;
    this.resposiveObj = null;
    this.length = 0;
    this.w = 0;
    this.on = false;
    this.elSize = 0;
    this.$slide = '';
    this.scene = 0;
    this.property = (settings.vertical === true) ? 'height' : 'width';
    this.gutter = (settings.vertical === true) ? 'margin-bottom' : 'margin-right';
    this.slideValue = 0;
    this.pagerWidth = 0;
    this.slideWidth = 0;
    this.thumbWidth = 0;
    this.interval = null;
    this.isTouch = ('ontouchstart' in document.documentElement);

    this.lSSlideOuter = this.querySelector('.lSSlideOuter');
    this.lSSlideWrapper = this.querySelector('.lSSlideWrapper');
    this.$el = this.querySelector('#content-slider2');
    this.lSPager = this.querySelector('.lSPager');
    // this.$children = this.$el.childNodes;

  }

  render() {
    return (`
      <div class="lSSlideOuter">
        <div class="lSSlideWrapper usingCss" style="transition-duration: 0ms;">
          <ul id="content-slider2" class="content-slider lightSlider lSSlide lsGrabbing"
            style="width: 1620px; height: 162px; padding-bottom: 0%; transform: translate3d(0px, 0px, 0px);">
            <li class="lslide active" style="width: 260px; margin-right: 10px;">
              <h3>1</h3>
            </li>
            <li class="lslide" style="width: 260px; margin-right: 10px;">
              <h3>2</h3>
            </li>
            <li class="lslide" style="width: 260px; margin-right: 10px;">
              <h3>3</h3>
            </li>
          </ul>
          <div class="lSAction"><a class="lSPrev"></a><a class="lSNext"></a></div>
        </div>
        <ul class="lSPager lSpg" style="margin-top: 5px;">
          <li class="active"><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
        </ul>
      </div>
    `);
  }

  connectedCallback() {
    $("#content-slider").lightSlider({
      loop: false,
      keyPress: true
    });
  }

  disconnectedCallback() {

  }

  attributeChangedCallback(attrName, oldValue, newValue) {

  }

  _inlineStyle() {

    if (settings.mode === 'fade') {
      settings.autoWidth = false;
      settings.slideEndAnimation = false;
    }
    if (settings.auto) {
      settings.slideEndAnimation = false;
    }
    if (settings.autoWidth) {
      settings.slideMove = 1;
      settings.item = 1;
    }
    if (settings.loop) {
      settings.slideMove = 1;
      settings.freeMove = false;
    }

    if (settings.vertical) {
      this.lSSlideWrapper.classList.add('vertical');
      this.elSize = settings.verticalHeight;
      this.lSSlideWrapper.style.height = `${this.elSize}px`;
    } else {
      this.elSize = this.$el.outerWidth;
    }

    this.$el.childNodes.forEach(el => el.classList.add('lslide'));
    if (settings.loop === true && settings.mode === 'slide') {
      // need to handle
    }
    if (settings.mode === 'slide') {
      // refresh.calSW();
      this._refreshcalSW();

      // refresh.sSW();
      this._refreshsSW();

      if (settings.loop === true) {
        this.slideValue = this._slideValue();
        this.move($el, slideValue);
      }
      if (settings.vertical === false) {
        this.setHeight($el, false);
      }

    } else {
      this.setHeight($el, true);
      $el.addClass('lSFade');
      if (!this.doCss()) {
        $children.fadeOut(0);
        $children.eq(scene).fadeIn(0);
      }
    }
    if (settings.loop === true && settings.mode === 'slide') {
      $children.eq(scene).addClass('active');
    } else {
      $children.first().addClass('active');
    }

  }

  _move(ob, v) {
    if (settings.rtl === true) {
      v = -v;
    }
    if (this._doCss()) {
      if (settings.vertical === true) {
        ob.style.transform = `translate3d(0px, -${v}px, 0px)`;
      } else {
        ob.style.transform = `translate3d(0px, -${v}px, 0px, 0px)`;
      }
    } else {
      if (settings.vertical === true) {
        ob.css('position', 'relative').animate({
          top: -v + 'px'
        }, settings.speed, settings.easing);
      } else {
        ob.css('position', 'relative').animate({
          left: -v + 'px'
        }, settings.speed, settings.easing);
      }
    }
    var $thumb = $slide.parent().find('.lSPager').find('li');
    this.active($thumb, true);
  }

  _slideValue() {
    let _sV = 0;
    if (settings.autoWidth === false) {
      _sV = this.scene * ((this.slideWidth + settings.slideMargin) * settings.slideMove);
    } else {
      _sV = 0;
      for (let i = 0; i < this.scene; i++) {
        _sV += parseInt(this.$el.childNodes[i].width + settings.slideMargin);
      }
    }
    return _sV;
  }

  _refreshsSW () {

    if (settings.autoWidth === false) {
      // $children.css(property, slideWidth + 'px');
      this.$el.childNodes.forEach(el => el.style[this.property] = `${this.slideWidth}px`);
    }
    // $children.css(gutter, settings.slideMargin + 'px');
    this.$el.childNodes.forEach(el => el.style[this.gutter] = `${settings.slideMargin}px`);

    w = this._calWidth(false);
    // $el.css(property, w + 'px');
    this.$el.style[property] = `${w}px`;
    if (settings.loop === true && settings.mode === 'slide') {
      if (this.on === false) {
        this.scene = this.$el.querySelector('.clone.left').length;
      }
    }

    if (this._doCss()) {
      this.lSSlideWrapper.classList.add('usingCss');
    }
  }

  _refreshcalSW () {
    if (settings.autoWidth === false) {
      this.slideWidth = (this.elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
    }
  }

  _doCss() {
    const support = () => {
      const transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
      const root = document.documentElement;
      for (let i = 0; i < transition.length; i++) {
        if (transition[i] in root.style) {
          return true;
        }
      }
    };

    if (settings.useCSS && support()) {
      return true;
    }
    return false;
  }


  _calWidth (cln) {
    var ln = cln === true ? $slide.find('.lslide').length : $children.length;
    if (settings.autoWidth === false) {
      w = ln * (slideWidth + settings.slideMargin);
    } else {
      w = 0;
      for (var i = 0; i < ln; i++) {
        w += (parseInt($children.eq(i).width()) + settings.slideMargin);
      }
    }
    return w;
  }
}

customElements.define(ImageSlider.is, ImageSlider);