export class AnimationRenderer {
  constructor(...containers) {
    this.containers = containers;
  }

  animate() {
    const scroll = window.pageYOffset;
    this.containers.forEach(container => container.animate(scroll));
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.animate();
      this.loop();
    })
  }
}

