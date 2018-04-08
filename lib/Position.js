"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(element, fromFn, toFn) {
        this.element = element;
        this.fromFn = fromFn;
        this.toFn = toFn;
        this.from = 0;
        this.to = 0;
        this.debounceId = -1;
        this.update();
        window.addEventListener('resize', this.update.bind(this));
    }
    Position.prototype.update = function () {
        var _this = this;
        // update with debounce
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(function () {
            var env = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            var boundingClientRect = _this.element.getBoundingClientRect();
            var pageYOffset = window.pageYOffset;
            var offset = {
                height: boundingClientRect.height,
                bottom: boundingClientRect.bottom + pageYOffset,
                top: boundingClientRect.top + pageYOffset
            };
            _this.from = _this.fromFn(offset, env);
            _this.to = _this.toFn(offset, env);
        }, 50);
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