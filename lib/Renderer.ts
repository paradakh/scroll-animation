import { AnimatableOnScroll, Renderable } from './typings';

export class Renderer implements Renderable {
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
