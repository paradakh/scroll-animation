import { AnimatableOnScroll, Updatable, Renderable } from './typings';
import { debounce } from './utils';

export class Renderer implements Renderable {
  private lastTime: any;

  constructor(public containers: (AnimatableOnScroll & Updatable)[]) {}

  public render(time: any) {
    const scroll = window.pageYOffset;
    let difference = time - this.lastTime;
    difference = difference > 0 ? difference : 0;

    this.containers.forEach(container => container.animate(scroll, difference));

    this.lastTime = time;
  }

  public update() {
    this.containers.forEach(container => container.update());
  }

  public loop() {
    this.update();
    window.addEventListener('resize', debounce(this.update.bind(this), 100));

    const tick = () => {
      window.requestAnimationFrame((time: any) => {
        this.render(time);
        tick();
      });
    };

    tick();
  }
}
