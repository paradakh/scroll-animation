"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = /** @class */ (function () {
    function Renderer(containers) {
        this.containers = containers;
    }
    Renderer.prototype.render = function () {
        var scroll = window.pageYOffset;
        this.containers.forEach(function (container) { return container.animate(scroll); });
    };
    Renderer.prototype.loop = function () {
        var _this = this;
        window.requestAnimationFrame(function () {
            _this.render();
            _this.loop();
        });
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map