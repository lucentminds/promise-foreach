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
var forEach = module.exports = function( aList, fnEach, scope ) {
    var aItems = aList ?aList.slice( 0 ) :[];
    var deferred = Q.defer();
    var i = -1;
    var l = aItems.length;

    // Check the callback.
    if( !fnEach ) {
        deferred.reject( 'Invalid callback for promise-foreach.' );
        return deferred.promise;
    }

    // Determines the function to call after each item.
    var doNext = function( nIdx ){
        var ctx;

        if( typeof nIdx === 'number' ) {
            i = nIdx;
        }
        else {
            ++i;
        }

        if( i >= l ){
           return deferred.resolve( aItems );
        }

        // Determines the scope/context of the callback.
        ctx = scope || aItems[ i ];
        
        try{
            fnEach.call( ctx, {
                index: i, 
                value: aItems[i],
                array: aItems
            }, doNext );
        }
        catch( e ) {
           return deferred.reject( e );
        }
    };// /doNext()    

    doNext();
    return deferred.promise;
};// /forEach()