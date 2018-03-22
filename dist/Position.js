export class Position {
    constructor(element, fromFn, toFn) {
        this.element = element;
        this.fromFn = fromFn;
        this.toFn = toFn;
        this.from = 0;
        this.to = 0;
        this.debounceId = -1;
        this.update();
        window.addEventListener('resize', this.update.bind(this));
    }
    update() {
        // update with debounce
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(() => {
            const env = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            const boundingClientRect = this.element.getBoundingClientRect();
            const { pageYOffset } = window;
            const offset = {
                height: boundingClientRect.height,
                bottom: boundingClientRect.bottom + pageYOffset,
                top: boundingClientRect.top + pageYOffset,
            };
            this.from = this.fromFn(offset, env);
            this.to = this.toFn(offset, env);
        }, 300);
    }
    getPosition(scroll) {
        if (scroll <= this.from)
            return 0;
        else if (scroll >= this.to)
            return 1;
        return (scroll - this.from) / (this.to - this.from);
    }
}
//# sourceMappingURL=Position.js.map