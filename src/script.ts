interface Options {
  trigger?: string;
  duration?: number;
  easing?: string | Function;
}

interface Ease {
  linear: Function;
  easeIn: Function;
  easeOut: Function;
  easeInOut: Function;
}

const ease = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

class LiteScroll {
  private options: Options;
  private start: { position: number; time: number; };
  private end: { position: number; };
  private requestFrame: number;
  private ease: Ease;

  constructor({ trigger = '.litescroll', duration = 1000, easing = 'linear' }: Options = {}) {
    this.options = { trigger, duration, easing };
    this.start = { position: 0, time: 0};
    this.end = { position: 0 };
    this.ease = ease;

    const elements = document.querySelectorAll(this.options.trigger);
    Array.from(elements).forEach((el) => {

      const scrollTo = document.getElementById(el.getAttribute('href').replace('#', ''));
      el.addEventListener('click', (event) => {
        event.preventDefault();
        this.start.time = new Date().getTime();
        this.start.position = window.scrollY;
        this.end.position = this.getOffset(scrollTo).top - this.start.position;
        this.animate();
      });

    });
  }

  private animate() {
    const elapsedTime = new Date().getTime() - this.start.time;
    let animeProcessingRate = elapsedTime / this.options.duration;
    animeProcessingRate = animeProcessingRate > 1.0 ? 1.0 : animeProcessingRate;
    const isTimeOver = elapsedTime >= this.options.duration;

    const easeEffect = (this.ease[this.options.easing as string] as Function)(animeProcessingRate);
    const move = easeEffect * this.end.position + this.start.position;

    window.scrollTo(0, move);

    if (isTimeOver) {
      window.cancelAnimationFrame(this.requestFrame);
    } else {
      this.requestFrame = window.requestAnimationFrame(() => this.animate());
    }
  }

  private getOffset(el: HTMLElement) {
    const box = el.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }
}

new LiteScroll({ duration: 100, easing: 'easeInOut' });