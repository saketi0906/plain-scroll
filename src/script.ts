interface Options {
  trigger?: string;
  duration?: number;
  easing?: string | Function;
}

interface EaseFunction {
  linear: Function;
  easeInQuad: Function;
  easeOutQuad: Function;
  easeInOutQuad: Function;
}

const easeFunction = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

class LiteScroll {
  private options: Options;
  private requestFrame: number;
  private startTime: number;
  private startScrollY: number;
  private endScrollY: number;
  private easeFunction: EaseFunction;

  constructor({
    trigger = '.litescroll-trigger',
    duration = 1000,
    easing = 'linear'
  }: Options = {}) {
    this.easeFunction = easeFunction;
    this.options = { trigger, duration, easing };
    this.mountClickEvent();
  }

  private mountClickEvent() {
    const triggerElements = document.querySelectorAll(this.options.trigger);
    Array.from(triggerElements).forEach((el) => {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        const scrollToEl = document.getElementById(el.getAttribute('href').replace('#', ''));
        this.startTime = new Date().getTime();
        this.startScrollY = window.scrollY;
        this.endScrollY = this.getOffset(scrollToEl).top - this.startScrollY;
        this.animate();
      });
    });
  }

  private animate() {
    const timeElapsed = new Date().getTime() - this.startTime;
    const isTimeOver = timeElapsed >= this.options.duration;
    const move = this.calcMoveAmount(timeElapsed);
    window.scrollTo(0, move);

    if (isTimeOver) {
      window.cancelAnimationFrame(this.requestFrame);
    } else {
      this.requestFrame = window.requestAnimationFrame(() => this.animate());
    }
  }

  private calcMoveAmount(timeElapsed) {
    let processingAmount = timeElapsed / this.options.duration > 1.0 ? 1.0 : timeElapsed / this.options.duration;
    const easeEffect = (this.easeFunction[this.options.easing as string] as Function)(processingAmount);
    return easeEffect * this.endScrollY + this.startScrollY;
  }

  private getOffset(el: HTMLElement) {
    const box = el.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }
}

new LiteScroll({ easing: 'easeInOutQuad' });