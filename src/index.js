var polyeth = function(eth) {

  var checkClient = function(eth) {
    var UA = window.navigator.userAgent;
    if (UA.match( 'Aleth' )) return 'aleth';
    if (UA.match( 'Ethereal')) return 'ethereal';    
    return false;
  }

  // Custom jQuery.extend / _.defaults. Ideally to prevent requiring them as dependencies (for now).
  var extend = function (target, source) {
      var a = Object.create(target);
      Object.keys(source).map(function (prop) {
          prop in a && (a[prop] = source[prop]);
      });
      return a;
  };


  if (typeof window.env.note !== 'undefined' && typeof window.env.warn !== 'undefined') {

    var _concat = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      return args.map( function(arg){
        return arg.toString();
      }).join(' ') );
    }
    console.log = function(){
      env.note( _concat(arguments) );
    };
    window.onerror = function() {
      env.warn( _concat(arguments) );
    }
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
      client: 'ethereal'
    }
  }

  // TODO: This will no longer throw errors when mocketh etc are available.
  if (!eth) throw new Error( 'No Ethereum client.' );
  else return extend( polyEth, ethObjectclients[checkClient(eth)] );
};


if ( typeof module !== 'undefined' ) {
  module.exports = polyeth;
}
