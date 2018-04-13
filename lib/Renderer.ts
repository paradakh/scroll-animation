import { AnimatableOnScroll, Renderable } from './typings';

export class Renderer implements Renderable {
  private lastTime: any;

  constructor(public containers: AnimatableOnScroll[]) {}

  public render(time: any) {
    const scroll = window.pageYOffset;
    let difference = time - this.lastTime;
    difference = difference > 0 ? difference : 0;

    this.containers.forEach(container => container.animate(scroll, difference));

    this.lastTime = time;
  }

  public loop() {
    window.requestAnimationFrame((time: any) => {
      this.render(time);
      this.loop();
    });
  }
}
