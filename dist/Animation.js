export class Animation {
    constructor(element, from, to, options = {}) {
        this.element = element;
        this.from = from;
        this.to = to;
        this.options = options;
        this.progress = 0;
        this.debounceId = -1;
        this.style = element.style;
        this.easing = this.validateOption('easing', (n) => n);
        setTimeout(() => {
            this.update();
            window.addEventListener('resize', () => {
                clearTimeout(this.debounceId);
                this.debounceId = setTimeout(this.update.bind(this), 400);
            });
        }, 20);
    }
    validateOption(option, placeholder) {
        const field = this.options[option];
        return ((field !== undefined) ? field : placeholder);
    }
    update() {
        window.requestAnimationFrame(this.render.bind(this));
    }
    render() { }
    calcProgress(position) {
        const { from, to } = this;
        let progress = 0;
        if (position > from)
            progress = (position < to) ? (position - from) / (to - from) : 1;
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
//# sourceMappingURL=Animation.js.map