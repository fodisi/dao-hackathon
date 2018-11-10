async function getUserReputation(account) {
    // Gets a list of the DAO participants with their reputation
    // Here we filter the list to get only the user account
    var participants = await peepDAO.getParticipants({
      participantAddress: account,
      returnReputations: true
    });
  
    // If the user is part of the DAO return its reputation
    if (participants.length > 0) {
      return web3.fromWei(participants[0].reputation);
    }
  
    // If the user has no reputation in the DAO return 0
    return 0;
  }