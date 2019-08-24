interface Options {
  trigger?: string;
  duration?: number;
}

export default class LiteScroll {
  private options: Options;
  private requestFrame: number;
  private startTime: number;
  private startScrollY: number;
  private endScrollY: number;

  constructor(options?: Options) {
    this.options = {
      trigger: options.trigger ? options.trigger : '.litescroll-trigger',
      duration: options.duration ? options.duration : 1000
    };
    this.mountClickEvent();
  }

  private mountClickEvent() {
    const triggerElements = document.getElementsByClassName(this.options.trigger);
    Array.from(triggerElements).forEach((el) => {
      el.addEventListener('click', (event) => {
        event.preventDefault();

        const scrollToEl = document.getElementById(el.getAttribute('href'));

        this.startTime = new Date().getTime();
        this.startScrollY = window.scrollY;
        this.endScrollY = this.getOffset(scrollToEl).top - this.startScrollY;
      });
    });
  }

  private getOffset(el: HTMLElement) {
    const box = el.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }
}