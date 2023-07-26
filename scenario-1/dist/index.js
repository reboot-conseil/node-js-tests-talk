"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearchNumbers(arr, searched) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    while (leftIdx <= rightIdx) {
        let midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        if (arr[midIdx] === searched) {
            return midIdx;
        }
        else if (arr[midIdx] < searched) {
            leftIdx = midIdx + 1;
        }
        else if (arr[midIdx] > searched) {
            // ! introduce a bug here and see what happens
            rightIdx = midIdx - 1;
        }
    }
    return -1;
}
exports.default = binarySearchNumbers;
