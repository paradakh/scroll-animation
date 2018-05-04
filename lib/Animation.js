"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animation {
    constructor(element, from, to, options = {}) {
        this.element = element;
        this.from = from;
        this.to = to;
        this.options = options;
        this.progress = -1;
        this.style = element.style;
        this.easing = this.validateOption('easing', (n) => n);
    }
    validateOption(option, placeholder) {
        const field = this.options[option];
        return field !== undefined ? field : placeholder;
    }
    update() {
        window.requestAnimationFrame(this.render.bind(this));
    }
    render() { }
    calcProgress(position, from, to) {
        let progress = 0;
        if (position > from) {
            progress = position < to ? (position - from) / (to - from) : 1;
        }
        return this.easing(progress);
    }
    animate(position) {
        const newProgress = this.calcProgress(position, this.from, this.to);
        if (newProgress !== this.progress) {
            this.progress = newProgress;
            this.render();
        }
    }
}
exports.Animation = Animation;
