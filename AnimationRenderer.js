const animationRenderer = new AnimationRenderer();

class AnimationRenderer {
  constructor() {
    this.animations = [];
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animations.forEach((animation) => {
        animation(window.pageYOffset);
      });

      this.animate();
    });
  }

  add(...animations) {
    this.animations.push(...animations);
  }
}

export default animationRenderer;
