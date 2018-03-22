export class Renderer {
    constructor(containers) {
        this.containers = containers;
    }
    render() {
        const scroll = window.pageYOffset;
        this.containers.forEach(container => container.animate(scroll));
    }
    loop() {
        window.requestAnimationFrame(() => {
            this.render();
            this.loop();
        });
    }
}
//# sourceMappingURL=Renderer.js.map