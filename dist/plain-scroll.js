(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PlainScroll = factory());
}(this, function () { 'use strict';

  var ease = {
      linear: function (t) { return t; },
      easeIn: function (t) { return t * t; },
      easeOut: function (t) { return t * (2 - t); },
      easeInOut: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  };

  var PlainScroll = (function () {
      function PlainScroll(_a) {
          var _b = _a === void 0 ? {} : _a, _c = _b.trigger, trigger = _c === void 0 ? '.plain-scroll' : _c, _d = _b.duration, duration = _d === void 0 ? 1000 : _d, _e = _b.easing, easing = _e === void 0 ? 'easeOut' : _e, _f = _b.onScrollStart, onScrollStart = _f === void 0 ? function () { } : _f, _g = _b.onScrollEnd, onScrollEnd = _g === void 0 ? function () { } : _g;
          var _this = this;
          this.options = { trigger: trigger, duration: duration, easing: easing, onScrollStart: onScrollStart, onScrollEnd: onScrollEnd };
          this.start = { position: 0, time: 0 };
          this.end = { position: 0 };
          this.ease = ease;
          var elements = document.querySelectorAll(this.options.trigger);
          Array.from(elements).forEach(function (el) {
              var scrollTo = document.getElementById(el.getAttribute('href').replace('#', ''));
              el.addEventListener('click', function (event) {
                  event.preventDefault();
                  _this.options.onScrollStart();
                  _this.start.time = new Date().getTime();
                  _this.start.position = window.scrollY;
                  _this.end.position = _this.getOffset(scrollTo).top - _this.start.position;
                  _this.animate();
              });
          });
      }
      PlainScroll.prototype.animate = function () {
          var _this = this;
          var elapsedTime = new Date().getTime() - this.start.time;
          var isTimeOver = elapsedTime >= this.options.duration;
          var animeProcessingRate = elapsedTime / this.options.duration;
          animeProcessingRate = animeProcessingRate > 1.0 ? 1.0 : animeProcessingRate;
          var easeEffect = this.ease[this.options.easing](animeProcessingRate);
          var move = easeEffect * this.end.position + this.start.position;
          window.scrollTo(0, move);
          if (isTimeOver) {
              window.cancelAnimationFrame(this.requestFrame);
              this.options.onScrollEnd();
          }
          else {
              this.requestFrame = window.requestAnimationFrame(function () { return _this.animate(); });
          }
      };
      PlainScroll.prototype.getOffset = function (el) {
          var box = el.getBoundingClientRect();
          return {
              top: box.top + window.pageYOffset - document.documentElement.clientTop,
              left: box.left + window.pageXOffset - document.documentElement.clientLeft
          };
      };
      return PlainScroll;
  }());

  return PlainScroll;

}));
