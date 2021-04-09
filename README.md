# promise-foreach
NodeJs module that loops over a list of items that require asynchronous processing that must be processed in sequential order.

## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-foreach.git
```

### Useage:

```js
var forEach = require( 'promise-foreach' );

await forEach( [ 'a', 'b', 'c' ], async function( o_current, next ){

    console.log( 'The current index is', o_current.index );

    await doSomethingAsync( o_current.value, function( err, result ){
        if( err ) {
            return console.log( 'Error:', err );
        }

        console.log( 'Success!' );

        // Continue to the next item.
        next();
    });

});

console.log( 'Done with all!' );
```
