import { Animatable, Renderable, Updatable } from './typings';
import { debounce } from './utils';

export class Animation implements Updatable, Animatable, Renderable {
  public style: CSSStyleDeclaration;
  public progress = -1;
  public easing: (n: number) => number;

  constructor(
    public element: HTMLElement | SVGElement,
    public from: number,
    public to: number,
    public options: any = {}
  ) {
    this.style = element.style;
    this.easing = this.validateOption('easing', (n: number) => n);

    setTimeout(() => {
      this.update();
      window.addEventListener('resize', debounce(this.update.bind(this), 100));
    }, 20);
  }

  validateOption(option: string, placeholder: any) {
    const field = this.options[option];
    return field !== undefined ? field : placeholder;
  }

  update() {
    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {}

  calcProgress(position: number, from: number, to: number) {
    let progress = 0;
    if (position > from) {
      progress = position < to ? (position - from) / (to - from) : 1;
    }

    return this.easing(progress);
  }

  animate(position: number) {
    const newProgress = this.calcProgress(position, this.from, this.to);

    if (newProgress !== this.progress) {
      this.progress = newProgress;
      this.render();
    }
  }
}
