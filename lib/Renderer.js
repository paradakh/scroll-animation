"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Renderer {
    constructor(containers) {
        this.containers = containers;
    }
    render(time) {
        const scroll = window.pageYOffset;
        let difference = time - this.lastTime;
        difference = difference > 0 ? difference : 0;
        this.containers.forEach(container => container.animate(scroll, difference));
        this.lastTime = time;
    }
    update() {
        this.containers.forEach(container => container.update());
    }
    loop() {
        this.update();
        window.addEventListener('resize', utils_1.debounce(this.update, 100));
        const tick = () => {
            window.requestAnimationFrame((time) => {
                this.render(time);
                tick();
            });
        };
        tick();
    }
}
exports.Renderer = Renderer;
