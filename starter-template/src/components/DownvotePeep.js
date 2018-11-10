function downvotePeep(proposalId) {
    // Votes against a proposal using the Absolute Voting Machine
    votingMachine
      .vote({ proposalId: proposalId, vote: BinaryVoteResult.No })
      .then(getPeepProposalsList());
  }