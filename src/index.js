var polyeth = function(eth) {

  var checkClient = function(eth) {
    var UA = window.navigator.userAgent;
    if (UA.match( 'Aleth' )) return 'aleth';
    if (UA.match( 'Ethereal')) return 'ethereal';
    // if (UA.match( 'Ethos')) return 'ethos';
    
    return false;
  }


  if (typeof window.env.note !== 'undefined') {
    console.log = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      env.note( args.map( function(arg){
        return arg.toString();
      }).join(' ') );
    }

    window.onerror = function(err) {
      console.log( "Error: ", err )
    }
  }

  var clients = {

    // ethos: checkClient( eth ) == 'ethos' && mocketh,

    aleth: checkClient( eth ) == 'aleth' && {
      eth: eth,
      client: 'aleth',
      
      // Proxy to cpp-ethereum eth/rpc object

      getProcedures: eth.getProcedures,
      getCoinbase: eth.getCoinbase,
      getIsListening: eth.getIsListening,
      getIsMining: eth.getIsMining,
      getGasPrice: eth.getGasPrice,
      getKey: eth.getKey,
      getKeys: eth.getKeys,
      getPeerCount: eth.getPeerCount,
      getBalanceAt: eth.getBalanceAt,
      balanceAt: eth.balanceAt,
      getStorageAt: eth.getStorageAt,
      storageAt: eth.storageAt,
      getTxCountAt: eth.getTxCountAt,
      txCountAt: eth.txCountAt, 
      getIsContractAt: eth.getIsContractAt,
      isContractAt: eth.isContractAt,
      create: eth.create,
      transact: eth.transact,
      getSecretToAddress: eth.getSecretToAddress,
      secretToAddress: eth.secretToAddress,
      getLll: eth.getLll,
      lll: eth.lll,
      check: eth.check,
      watch: eth.watch,
      unwatch: eth.unwatch,
      newBlock: eth.newBlock,
      
      // New APIs
      
      ready: function(cb) {
        if (typeof jQuery !== 'undefined') {
          jQuery( document ).ready( cb )
        } else {
          window.onload = cb;
        }
      }

    },

    ethereal: checkClient( eth ) == 'ethereal' && {
      eth: eth,
      client: 'ethereal',
      
      // TODO: Proxy Ethereal APIs
      
      getKeys: function(cb){ 
        // ethereal client has ony a single key and corresponding getter
        return eth.getKey(function(key){
          // wrapping in array for consistency
          return [key];
        }); 
      }
    }
  }

  // TODO: This will no longer throw errors when mocketh etc are available.
  if (!eth) throw new Error( 'No Ethereum client.' );
  else return clients[checkClient(eth)]
};


if ( typeof module !== 'undefined' ) {
  module.exports = polyeth;
}
