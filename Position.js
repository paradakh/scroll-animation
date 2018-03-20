export class Position {
  constructor(element, from, to) {
    this.element = element;
    this.fromFn = from;
    this.toFn = to;

    this.from = 0;
    this.to = 0;

    this.debounceId = -1;

    this.update();

    window.addEventListener('resize', ::this.update);
  }

  update() {
    // update with debounce
    clearTimeout(this.debounceId);
    this.debounceId = setTimeout(() => {
      const env = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const offsets = {};
      const { pageYOffset } = window;
      const boundingClientRect = this.element.getBoundingClientRect();

      offsets.height = boundingClientRect.height;
      offsets.bottom = boundingClientRect.bottom + pageYOffset;
      offsets.top = boundingClientRect.top + pageYOffset;
      offsets.y = offsets.top;

      this.from = this.fromFn(offsets, env);
      this.to = this.toFn(offsets, env);
    }, 300);
  }

  getPosition(scroll) {
    if (scroll <= this.from) return 0;
    else if (scroll >= this.to) return 1;
    return (scroll - this.from) / (this.to - this.from);
  }
}
