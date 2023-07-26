"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* generator(start = 0, end = Infinity, step = 1) {
    const res = [];
    if (end === Infinity) {
        // returns the res array that was built up during the iteration
        return res;
    }
    // here, state is maintained in the generator function itself since it is resumable
    for (let i = start; i <= end; i += step) {
        res.push(i);
        yield res;
    }
    return res;
}
exports.default = generator;
