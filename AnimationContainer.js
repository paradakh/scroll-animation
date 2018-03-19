import AnimationsRenderer from './AnimationRenderer';

export class AnimationContainer {
  constructor(PositionCalculator, parts = []) {
    this.parts = parts;
    this.lastPosition = 0;
    this.position = PositionCalculator;
    this.progress = ::this.position.getPosition;

    AnimationsRenderer.add(::this.animate);
  }

  animate(scroll = window.pageYOffset) {
    const position = this.progress(scroll);

    if (position !== this.lastPosition) {
      this.lastPosition = position;
      this.parts.forEach(part => part.animate(position));
    }
  }

  forceUpdate() {
    this.position.update();
    this.parts.forEach(part => part.update());
    this.animate();
  }
}
