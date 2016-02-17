'use strict';

class Heap {
  constructor() {
    // this.size = 0
    this.heap = []
  }
  compareFn(a, b) {
    return a < b
  }
  siftUp(i) {
    let pIndex, tmp
    if (i !== 0) {
      pIndex = Math.floor((i - 1) / 2)
      // console.log(pIndex)
      if (this.compareFn(this.heap[pIndex], this.heap[i])) {
        // console.log(this.heap[pIndex],">",this.heap[i])
        let tmp = this.heap[pIndex]
        this.heap[pIndex] = this.heap[i]
        this.heap[i] = tmp
        this.siftUp(pIndex)
      }
    }
  }
  siftDown(i) {
    let left = 2*i+1, right = 2*i+2, minIndex
    if (right >= this.size()) {
      if (left >= this.size()) {
        return
      }
      minIndex = left
    }
    else {
      if (this.compareFn(this.heap[left], this.heap[right])) {
        minIndex = right
      }
      else {
        minIndex = left
      }
    }
    if (this.compareFn(this.heap[i], this.heap[minIndex])) {
      let tmp = this.heap[minIndex]
      this.heap[minIndex] = this.heap[i]
      this.heap[i] = tmp
      this.siftDown(minIndex)
    }
  }
  size() {
    return this.heap.length
  }
  insert(ele) {
    this.heap.push(ele)
    this.siftUp(this.size() - 1)
  }
  peek() {
    return this.heap[0]
  }
  extract() {
    if (this.heap.length > 0) {
      let val = this.peek()
      this._del(0)
      return val
    }
    throw new Error('No elements in the heap')
  }
  replace(ele) {
    this.extract()
    this.insert(ele)
  }
  // delete(ele) {
  //   let left = 2*i+1, right = 2*i+2, minIndex
  //   if (this.heap[i] === ele) {
  //     this._del(i)
  //   }
  //   if (ele < this.heap[i]) {
  //     this.delete
  //   }
  // }
  _del(idx) {
    if (idx >= this.size()) {
      throw new Error('No elements in heap')
    }
    this.heap[idx] = this.heap[0]
    this.heap.splice(idx, 1)
    this.siftDown(0)
    // console.log(this.heap)
  }
}
export default Heap
export class MaxHeap extends Heap {}
export class MinHeap extends Heap {
  compareFn(a, b) {
    return a > b
  }
}
