function upvotePeep(proposalId) {
    // Votes in favor of a proposal using the Absolute Voting Machine
    votingMachine
      .vote({ proposalId: proposalId, vote: BinaryVoteResult.Yes })
      .then(getPeepProposalsList);
  }