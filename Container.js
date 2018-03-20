export class Container {
  constructor(position, parts = []) {
    this.parts = parts;
    this.lastPosition = 0;
    this.position = position;
    this.progress = ::position.getPosition;
  }

  animate(scroll = window.pageYOffset) {
    const position = this.progress(scroll);

    if (position !== this.lastPosition) {
      this.lastPosition = position;
      this.parts.forEach(part => part.render(position));
    }
  }

  forceUpdate() {
    this.position.update();
    this.parts.forEach(part => part.update());
    this.animate();
  }
}
