"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = /** @class */ (function () {
    function Renderer(containers) {
        this.containers = containers;
    }
    Renderer.prototype.render = function (time) {
        var scroll = window.pageYOffset;
        var difference = time - this.lastTime;
        difference = difference > 0 ? difference : 0;
        this.containers.forEach(function (container) { return container.animate(scroll, difference); });
        this.lastTime = time;
    };
    Renderer.prototype.loop = function () {
        var _this = this;
        window.requestAnimationFrame(function (time) {
            _this.render(time);
            _this.loop();
        });
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map