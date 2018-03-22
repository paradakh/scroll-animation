"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container = /** @class */ (function () {
    function Container(position, parts) {
        if (parts === void 0) { parts = []; }
        this.position = position;
        this.parts = parts;
        this.lastPosition = 0;
        this.progress = position.getPosition.bind(position);
    }
    Container.prototype.animate = function (scroll) {
        if (scroll === void 0) { scroll = window.pageYOffset; }
        var position = this.progress(scroll);
        if (position !== this.lastPosition) {
            this.lastPosition = position;
            this.parts.forEach(function (part) { return part.animate(position); });
        }
    };
    Container.prototype.update = function () {
        this.position.update();
        this.parts.forEach(function (part) { return part.update(); });
        this.animate();
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map