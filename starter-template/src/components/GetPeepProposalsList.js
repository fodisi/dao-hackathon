function getPeepProposalsList() {
    // clear the existing list
    $("#peepProposalList li").remove();
  
    // Get all new proposal events filtered by our Avatar
    const eventFetcher = peepScheme.NewPeepProposal(
      { _avatar: avatarAddress },
      { fromBlock: 0, toBlock: "latest" }
    );
  
    eventFetcher.get(function(error, events) {
      events.reverse().forEach(event => {
        // Get the id of the created proposal
        var proposalId = event.args._proposalId;
  
        // If the proposal is still voteable (wasn't approved or declined yet)
        votingMachine
          .isVotable({ proposalId: proposalId })
          .then(function(isVotable) {
            if (isVotable) {
              // Gets the current votes for the proposals
              votingMachine
                .getCurrentVoteStatus(proposalId)
                .then(function(votes) {
                  // Get the hash of the Peep content saved on IPFS
                  var peepHash = event.args._peepHash;
                  // Get the content of the peep from IPFS
                  getPeepContentFromHash(peepHash).then(function(peepContent) {
                    // Add the peep to the proposals list
                    addPeepToList(proposalId, peepContent, votes);
                  });
                });
            }
          });
      });
    });
  }