'use strict';
// index i
// children at indices 2i+1, 2i+2
// parent is floor((i-1)/2)

import { Readable, Duplex, Transform } from 'stream'
import { MaxHeap, MinHeap } from './heap.js'

class MedianStream extends Transform {
  constructor() {
    super()
    this.maxHeap = new MaxHeap()
    this.minHeap = new MinHeap()
    this.median = 0
    this.setEncoding('utf8')
  }
  _transform(chunk, encoding, callback) {
    if (chunk == null) {
      return
    }
    let chunked = new Buffer(chunk).toString().trim().split(' ')
    let { maxHeap, minHeap, median, push } = this
    chunked.forEach((_num) => {
      let num = Number(_num.trim())
      if (maxHeap.size() > minHeap.size()) {
        minHeap.insert(num)
      }
      else if (maxHeap.size() <= minHeap.size()) {
        maxHeap.insert(num)
      }

      if (maxHeap.peek() > minHeap.peek()) {
        let l = maxHeap.peek()
        let r = minHeap.peek()
        maxHeap.replace(r)
        minHeap.replace(l)
      }
    })

    let sameSize = (maxHeap.size() === minHeap.size())
    this.median = (sameSize ? ((Number(maxHeap.peek()) + Number(minHeap.peek())) / 2) : Number(maxHeap.peek()))
    this.push(this.median.toString(), 'utf8')
    callback()
  }
}
export default MedianStream
