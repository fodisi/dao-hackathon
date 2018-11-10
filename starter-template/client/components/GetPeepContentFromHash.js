// Returns a JS promise of the content of a peep by its IPFS hash
function getPeepContentFromHash(hash) {
    return new Promise(function(resolve, reject) {
      ipfs.catJSON(hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.content);
        }
      });
    });
  }
  
  // Call our initialize method when the window is loaded
  $(window).on("load", function() {
    initialize();
  });
  