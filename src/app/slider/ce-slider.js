
import style from './slider.scss';

export class CeSlider extends HTMLElement {

  static get is() {
    return 'ce-slider';
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  constructor() {
    super();

    this.slideCurrent = 0;
    this.slidesTotal = 0;
    this.intervalActive = false;

    this.options = {
      start: 0,
      axis: "x",
      buttons: true,
      bullets: true,
      interval: true,
      intervalTime: 3000,
      animation: true,
      animationTime: 300,
      infinite: true
    };

    this.innerHTML = `
      <style>${style}</style>
      <div id="sliderNew">
        <a class="buttons prev" href="#">&#60;</a>
        <div class="viewport">
          <ul class="overview">
            <li><img src="assets/images/picture1.jpg" /></li>
            <li><img src="assets/images/picture2.jpg" /></li>
            <li><img src="assets/images/picture3.jpg" /></li>
            <li><img src="assets/images/picture4.jpg" /></li>
            <li><img src="assets/images/picture5.jpg" /></li>
            <li><img src="assets/images/picture6.jpg" /></li>
          </ul>
        </div>
        <a class="buttons next" href="#">&#62;</a>
        <ul class="bullets">
          <li><a href="#" class="bullet active" data-slide="0">1</a></li>
          <li><a href="#" class="bullet" data-slide="1">2</a></li>
          <li><a href="#" class="bullet" data-slide="2">3</a></li>
          <li><a href="#" class="bullet" data-slide="3">4</a></li>
          <li><a href="#" class="bullet" data-slide="4">5</a></li>
          <li><a href="#" class="bullet" data-slide="5">6</a></li>
        </ul>
      </div>
    `;
  }
  connectedCallback() {
    this.$container = $('#sliderNew');
    this.$viewport = this.$container.find(".viewport:first");
    this.$overview = this.$container.find(".overview:first");
    this.$next = this.$container.find(".next:first");
    this.$prev = this.$container.find(".prev:first");
    this.$bullets = this.$container.find(".bullet");

    this.$slides = null;
    this.viewportSize = 0;
    this.contentStyle = {};
    this.slidesVisible = 0;
    this.slideSize = 0;
    this.slideIndex = 0;
    this.isHorizontal = true;
    this.sizeLabel = this.isHorizontal ? "Width" : "Height";
    this.posiLabel = this.isHorizontal ? "left" : "top";
    this.intervalTimer = null;

    this._initialize();
  }

  _initialize() {
    this._update();
    this._move(this.slideCurrent);
    this._setEvents();
  }

  _update() {
    this.$overview.find(".mirrored").remove();

    this.$slides = this.$overview.children();
    const viewportSize = this.$viewport[0]["offset" + this.sizeLabel];
    this.slideSize = this.$slides.first()["outer" + this.sizeLabel](true);
    this.slidesTotal = this.$slides.length;
    this.slideCurrent = this.options.start || 0;
    const slidesVisible = Math.ceil(viewportSize / this.slideSize);

    this.$overview.append(this.$slides.slice(0, slidesVisible).clone().addClass("mirrored"));
    this.$overview.css(this.sizeLabel.toLowerCase(), this.slideSize * (this.slidesTotal + slidesVisible));

    this._setButtons();
  }

  _move(index) {
    let slideIndex = isNaN(index) ? this.slideCurrent : index;
    this.slideCurrent = slideIndex % this.slidesTotal;

    if (slideIndex < 0) {
      this.slideCurrent = slideIndex = this.slidesTotal - 1;
      this.$overview.css(this.posiLabel, -(this.slidesTotal) * this.slideSize);
    }

    if (slideIndex > this.slidesTotal) {
      this.slideCurrent = slideIndex = 1;
      this.$overview.css(this.posiLabel, 0);
    }
    this.contentStyle[this.posiLabel] = -slideIndex * this.slideSize;

    this.$overview.animate(this.contentStyle, {
      queue: false,
      duration: 1000,
      always: () => {
        this.$container.trigger("move", [this.$slides[this.slideCurrent], this.slideCurrent]);
      }
    });

    this._setButtons();
    this._start();
  }

  _setEvents() {
    if (this.options.buttons) {
      this.$prev.click(_ => {
        this._move(--this.slideIndex);
        return false;
      });

      this.$next.click(_ => {
        this._move(++this.slideIndex);
        return false;
      });
    }

    $(window).resize(this._update);

    if (this.options.bullets) {
      const __self = this;
      this.$container.on("click", ".bullet", function () {
        console.log('attribute: ', $(this).attr("data-slide"))
        __self._move(__self.slideIndex = +$(this).attr("data-slide"));
        return false;
      });
    }
  }

  _start() {
    if (this.options.interval) {
      clearTimeout(this.intervalTimer);

      this.intervalActive = true;

      this.intervalTimer = setTimeout(_ => {
        this._move(++this.slideIndex);
      }, this.options.intervalTime);
    }
  }

  _stop() {
    clearTimeout(this.intervalTimer);
    this.intervalActive = false;
  }

  _setButtons() {
    if (this.options.buttons && !this.options.infinite) {
      this.$prev.toggleClass("disable", this.slideCurrent <= 0);
      this.$next.toggleClass("disable", this.slideCurrent >= this.slidesTotal - this.slidesVisible);
    }

    if (this.options.bullets) {
      this.$bullets.removeClass("active");
      $(this.$bullets[this.slideCurrent]).addClass("active");
    }
  }

  disconnectedCallback() {

  }

  attributeChangedCallback(attrName, oldValue, newValue) {

  }

}

customElements.define(CeSlider.is, CeSlider);