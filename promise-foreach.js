/**
 * 01-05-2017
 * NodeJs module that loops over a list of items that require asynchronous 
 * processing that must be processed in sequential order.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var forEach = module.exports = async function( a_source_list, fn_callback_each, scope ) { // jshint ignore:line
    return new Promise(function(resolve, reject){
        var a_keys = Object.keys( a_source_list );
        var i = -1;
        var l = a_keys.length;

        // Check the callback.
        if( !fn_callback_each ) {
            return reject( 'Invalid callback for promise-foreach.' );
        }

        // Determines the function to call after each item.
        var do_next = async function( nIdx ){
            var ctx, key;

            if( typeof nIdx === 'number' ) {
                i = nIdx;
            }
            else {
                ++i;
            }

            if( i >= l ){
                return resolve( a_source_list );
            }

            // Determines the current key we are on.
            key = a_keys[ i ];

            // Determines the scope/context of the callback.
            ctx = scope || a_source_list[ key ];
            const o_iter = {
                index: key, 
                value: a_source_list[ key ],
                list: a_source_list,
            };
            
            try{
                new Promise(async function( resolve ){
                    fn_callback_each.call( ctx, o_iter, resolve );
                });
            }
            catch( e ) {
                return reject( e );
            }

            do_next();
        };// /do_next()

        do_next();
    });
};// /forEach()