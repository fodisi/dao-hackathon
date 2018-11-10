function proposeNewPeep() {
    // Get the proposal content and clears the text from the UI
    var peepContent = $("#newPeepContent").val();
    $("#newPeepContent").val("");
  
    // Upload the proposal as a Peep to IPFS using Peepeth peep format
    ipfs.addJSON(
      {
        type: "peep",
        content: peepContent,
        pic: "",
        untrustedAddress: avatarAddress,
        untrustedTimestamp: Math.trunc(new Date().getTime() / 1000),
        shareID: "",
        parentID: ""
      },
      (err, peepHash) => {
        if (err) {
          alert(err);
        } else {
          // Sends the new proposal to the Peep Scheme
          var newProposalTx = peepScheme
            .proposePeep(peepDAO.avatar.address, peepHash, 0, {
              gas: 300000 // Gas used by the transaction (including some safe margin)
            })
            .then(function(result) {
              // Reload the proposals list
              // Please note that on non-local networks this would be updated faster than the transaction will be included in a block
              // To see changes there you'll need to add logic to wait for confirmation or manually refresh the page when the transaction is included
              getPeepProposalsList();
            })
            .catch(console.log);
        }
      }
    );
  }