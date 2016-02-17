# median-stream
median-stream is a stream that takes an input of integers and pipes out the median of those integers.

If you pipe in `1 2 3 4 5`, then it will only output `3`.

However if you pipe `1` `2` `3` `4` `5`, then it will output `1`, `1.5`, `2`, `2.5`, `3`.

# example

example.js
```js
'use strict';

import MedianStream from 'median-stream'

let medianStream = new MedianStream()
medianStream.on('error', function(err) { console.log('Error:', err.stack) })
process.stdin.pipe(medianStream).pipe(process.stdout)
```

terminal
```cli
echo 1 2 3 4 5 | node example.js
```

# license
ISC

# author
Shuan Wang (shuanwang@gmail.com)
