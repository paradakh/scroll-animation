"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(element, fromFn, toFn) {
        this.element = element;
        this.fromFn = fromFn;
        this.toFn = toFn;
        this.from = 0;
        this.to = 0;
    }
    Position.prototype.update = function () {
        var env = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        var boundingClientRect = this.element.getBoundingClientRect();
        var pageYOffset = window.pageYOffset;
        var offset = {
            height: boundingClientRect.height,
            bottom: boundingClientRect.bottom + pageYOffset,
            top: boundingClientRect.top + pageYOffset
        };
        this.from = this.fromFn(offset, env);
        this.to = this.toFn(offset, env);
    };
    Position.prototype.getPosition = function (scroll) {
        if (scroll <= this.from) {
            return 0;
        }
        if (scroll >= this.to) {
            return 1;
        }
        return (scroll - this.from) / (this.to - this.from);
    };
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=Position.js.map