import { Animatable, Updatable } from "./interfaces";

export class Animation implements Updatable, Animatable {
  private style: CSSStyleDeclaration;
  private progress = 0;
  private debounceId = -1;
  public easing: (n: number) => number;

  constructor(public element: HTMLElement | SVGElement,
              public from: number,
              public to: number,
              public options: any = {}
              ) {
    this.style = element.style;
    this.easing = this.validateOption('easing', (n: number) => n);

    setTimeout(() => {
      this.update();

      window.addEventListener('resize', () => {
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(this.update.bind(this), 400);
      });
    }, 20);
  }

  validateOption(option: string, placeholder: any) {
    const field = this.options[option];
    return ((field !== undefined) ? field : placeholder);
  }

  update() {
    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {}

  calcProgress(position: number) {
    const { from, to } = this;
    let progress = 0;

    if (position > from) progress = (position < to) ? (position - from) / (to - from) : 1;

    return this.easing(progress);
  }

  animate(position: number) {
    const newProgress = this.calcProgress(position);

    if (newProgress !== this.progress) {
      this.progress = newProgress;
      this.render();
    }
  }
}
