
var _ = require( 'underscore' )

var polyeth = function(eth) {

  var checkClient = function(eth) {
    var UA = window.navigator.userAgent;
    if (UA.match( 'Aleth' )) return 'aleth';
    if (UA.match( 'Ethereal')) return 'ethereal';
    if (UA.match( 'Ethos')) return 'ethereal'; 
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
      getKey: function(cb){ eth.key.then( cb ) }
    }
  }

  // TODO: This will no longer throw errors when mocketh etc are available.
  if (!eth) throw new Error( 'No Ethereum client.' );
  else return _.extend( clients[ checkClient( eth ) ], _.extend( polyEth, clients[ checkClient( eth ) ].eth ) );
};


if ( typeof module !== 'undefined' ) {
  module.exports = polyeth;
}
