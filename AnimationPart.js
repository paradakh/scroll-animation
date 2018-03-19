export class AnimationPart {
  constructor(element, from, to, options = {}) {
    this.from = from;
    this.to = to;
    this.element = element;
    this.style = element.style;
    this.progress = 0;
    this.options = Object.assign({}, options);
    this.debounceId = -1;

    this.easing = this.validateOption('easing', n => n);

    setTimeout(() => {
      this.update();

      window.addEventListener('resize', () => {
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(::this.update, 400);
      });
    }, 20);
  }

  validateOption(option, placeholder) {
    const field = this.options[option];
    return ((field !== undefined) ? field : placeholder);
  }

  update() {
    window.requestAnimationFrame(::this.render);
  }

  // eslint-disable-next-line
  render() {}

  calcProgress(position) {
    const { from, to } = this;
    let progress = 0;

    if (position > from) progress = (position < to) ? (position - from) / (to - from) : 1;

    return this.easing(progress);
  }

  animate(position) {
    const newProgress = this.calcProgress(position);

    if (newProgress !== this.progress) {
      this.progress = newProgress;
      this.render();
    }
  }
}
