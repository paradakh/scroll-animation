import { AnimatableOnScroll } from '../typings';

export class Renderer {
  constructor(public containers: AnimatableOnScroll[]) {}

  public render() {
    const scroll = window.pageYOffset;
    this.containers.forEach(container => container.animate(scroll));
  }

  public loop() {
    window.requestAnimationFrame(() => {
      this.render();
      this.loop();
    });
  }
}
