"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = (fn, timeout) => {
    let id = -1;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
            id = -1;
        }, timeout);
    };
};
