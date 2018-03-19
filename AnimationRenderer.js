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

const animationRenderer = new AnimationRenderer();

export default animationRenderer;
