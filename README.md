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

forEach( [ 'a', 'b', 'c' ], function( oCurrent, next ){

    console.log( 'The current index is', oCurrent.index );

    doSomethingAsync( oCurrent.value, function( err, result ){
        if( err ) {
            return console.log( 'Error:', err );
        }

        console.log( 'Success!' );

        // Continue to the next item.
        next();
    });

})
.then(function( aItems ){
    
    console.log( 'Done with all!' );

});
```
