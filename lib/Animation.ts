import { Animatable, Renderable, Updatable } from './typings';

export class Animation implements Updatable, Animatable, Renderable {
  private style: CSSStyleDeclaration;
  private debounceId = -1;
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

      window.addEventListener('resize', () => {
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(this.update.bind(this), 50);
      });
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

  calcProgress(position: number) {
    let progress = 0;

    if (position > this.from) {
      progress =
        position < this.to ? (position - this.from) / (this.to - this.from) : 1;
    }

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
