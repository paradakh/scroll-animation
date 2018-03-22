export class Container {
    constructor(position, parts = []) {
        this.position = position;
        this.parts = parts;
        this.lastPosition = 0;
        this.progress = position.getPosition.bind(position);
    }
    animate(scroll = window.pageYOffset) {
        const position = this.progress(scroll);
        if (position !== this.lastPosition) {
            this.lastPosition = position;
            this.parts.forEach(part => part.animate(position));
        }
    }
    update() {
        this.position.update();
        this.parts.forEach(part => part.update());
        this.animate();
    }
}
//# sourceMappingURL=Container.js.map