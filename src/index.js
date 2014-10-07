
var _ = require( 'underscore' )

var polyeth = function(eth) {

  var checkClient = function(eth) {
    var UA = window.navigator.userAgent;
    if (UA.match( 'Aleth' )) return 'aleth';
    if (UA.match( 'Ethereal')) return 'ethereal';
    if (UA.match( 'Ethos')) return 'ethos'; 
    return false;
  }

  // new poly-eth default APIs. will be overwitten if the method or 
  // attribute exists in the native eth object.
  var polyEth = {
    ready: function(cb) {
      if (typeof jQuery !== 'undefined') {
        jQuery( document ).ready( cb )
      } else {
        window.onload = cb;
      }
    }
  }

  var clients = {

    aleth: checkClient( eth ) == 'aleth' && {
      eth: eth,
      client: 'aleth'
    },

    ethereal: checkClient( eth ) == 'ethereal' && {
      eth: eth,
      client: 'ethereal',
      getKey: function(cb){
        cosnole.log( 'Polyeth ethereal getKey...' )
        eth.key.then( function(key){ cb.apply( this, [null, key] ) }, function(err){ cb.apply( this, [err, null] ) } ) 
      }
    },

    ethos: checkClient( eth ) == 'ethos' && {
      eth: eth,
      client: 'ethos',
      getKey: function(cb){
        console.log( 'Polyeth ethos getKey...' )
        eth.key.then( function(key){ cb.apply( this, [null, key] ) }, function(err){ cb.apply( this, [err, null] ) } ) 
      },
      stateAt: function(addr, storageAddr, cb){
        console.log( 'Polyeth ethos stateAt...' )
        eth.stateAt(addr, storageAddr).then( function(value){ cb.apply( this, [null, value] ) }, function(err){ cb.apply( this, [err, null] ) } )
      },
      transact: function(options, cb){
        console.log( 'Polyeth ethos transact...' )
        eth.transact( options )
      }
    }

  }

  // TODO: This will no longer throw errors when mocketh etc are available.
  if (!eth) throw new Error( 'No Ethereum client.' );
  else return _.extend( clients[ checkClient( eth ) ], _.extend( polyEth, clients[ checkClient( eth ) ].eth ) );
};


if ( typeof module !== 'undefined' ) {
  module.exports = polyeth;
}
