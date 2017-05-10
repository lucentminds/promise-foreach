/**
 * 01-05-2017
 * NodeJs module that loops over a list of items that require asynchronous 
 * processing that must be processed in sequential order.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var Q = require( 'q' );
var forEach = module.exports = function( aList, fnEach, scope ) { // jshint ignore:line
    var aKeys = Object.keys( aList );
    var deferred = Q.defer();
    var i = -1;
    var l = aKeys.length;

    // Check the callback.
    if( !fnEach ) {
        deferred.reject( 'Invalid callback for promise-foreach.' );
        return deferred.promise;
    }

    // Determines the function to call after each item.
    var doNext = function( nIdx ){
        var ctx, key;

        if( typeof nIdx === 'number' ) {
            i = nIdx;
        }
        else {
            ++i;
        }

        if( i >= l ){
           return deferred.resolve( aList );
        }

        // Determines the current key we are on.
        key = aKeys[ i ];
        // Determines the scope/context of the callback.
        ctx = scope || aList[ key ];
        
        try{
            fnEach.call( ctx, {
                index: key, 
                value: aList[ key ],
                list: aList
            }, doNext );
        }
        catch( e ) {
           return deferred.reject( e );
        }
    };// /doNext()    

    doNext();
    return deferred.promise;
};// /forEach()