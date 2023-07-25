function binarySearchNumbers(arr: Array<number>, searched: number): number {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    while(leftIdx <= rightIdx) {
        let midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        if (arr[midIdx] === searched) {
            return midIdx
        } 
        else if(arr[midIdx] < searched) {
            leftIdx = midIdx + 1;
        } 
        else if(arr[midIdx] > searched) {
            // ! introduce a bug here and see what happens
            rightIdx = midIdx - 1;
        }
    }
    return -1;
}

console.log(binarySearchNumbers([1,2,3,4,5,6], 3)); // 2
console.log(binarySearchNumbers([1,2,3,4,5,6], 2)); // 1
console.log(binarySearchNumbers([1,2,3,4,5,6], 6)); // 5
console.log(binarySearchNumbers([1,2,3,4,5,6,7,8,9], 7)); // 6
console.log(binarySearchNumbers([1,2,3,4,5,6,7,8,9], 9)); // 8
console.log(binarySearchNumbers([1,2,3,4,5,6], 7)); // -1