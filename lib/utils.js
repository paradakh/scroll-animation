"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = function (fn, timeout) {
    var id = -1;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(id);
        id = setTimeout(function () {
            fn.apply(void 0, args);
            id = -1;
        }, timeout);
    };
};
//# sourceMappingURL=utils.js.map