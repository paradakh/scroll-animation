"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(element, from, to, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.element = element;
        this.from = from;
        this.to = to;
        this.options = options;
        this.progress = 0;
        this.debounceId = -1;
        this.style = element.style;
        this.easing = this.validateOption('easing', function (n) { return n; });
        setTimeout(function () {
            _this.update();
            window.addEventListener('resize', function () {
                clearTimeout(_this.debounceId);
                _this.debounceId = setTimeout(_this.update.bind(_this), 400);
            });
        }, 20);
    }
    Animation.prototype.validateOption = function (option, placeholder) {
        var field = this.options[option];
        return field !== undefined ? field : placeholder;
    };
    Animation.prototype.update = function () {
        window.requestAnimationFrame(this.render.bind(this));
    };
    Animation.prototype.render = function () { };
    Animation.prototype.calcProgress = function (position) {
        var progress = 0;
        if (position > this.from) {
            progress =
                position < this.to ? (position - this.from) / (this.to - this.from) : 1;
        }
        return this.easing(progress);
    };
    Animation.prototype.animate = function (position) {
        var newProgress = this.calcProgress(position);
        if (newProgress !== this.progress) {
            this.progress = newProgress;
            this.render();
        }
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map