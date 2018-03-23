import {
  Animatable,
  AnimatableOnScroll,
  Updatable,
  WithPositionGetter
} from '../typings';

export class Container implements Updatable, AnimatableOnScroll {
  public progress: (scroll: number) => number;
  private lastPosition = 0;

  constructor(
    public position: WithPositionGetter & Updatable,
    public parts: (Animatable & Updatable)[] = []
  ) {
    this.progress = position.getPosition.bind(position);
  }

  animate(scroll = window.pageYOffset) {
    const position = this.progress(scroll);

    if (position !== this.lastPosition) {
      this.lastPosition = position;
      this.parts.forEach(part => part.animate(position));
    }
  }

  update() {
    this.position.update();
    this.parts.forEach(part => part.update());
    this.animate();
  }
}
