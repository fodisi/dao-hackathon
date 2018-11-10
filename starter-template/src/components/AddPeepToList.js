function addPeepToList(proposalId, peepContent, votes) {
    // The votes on a Peep should be:
    // 0 - Abstain
    // 1 - Yes
    // 2 - No
    var peepUpvotes = web3.fromWei(votes[1]);
    var peepDownvotes = web3.fromWei(votes[2]);
  
    // Displays the Peep data in an HTML list item
    var listItem =
      '<li id="' +
      proposalId +
      '">' +
      '<span class="peepProposalText" style="margin-right:25px;">' +
      peepContent +
      "</span>" +
      "<input " +
      (userRep > 0 ? "" : "disabled ") +
      'type="button" value="+" class="upvotePeep" style="font-size : 30px; text-align: center;" />' +
      '<span class="upvotesCount" style="margin-right:5px;">' +
      (peepUpvotes / totalRep) * 100 +
      "%</span>" +
      "<input " +
      (userRep > 0 ? "" : "disabled ") +
      'type="button" value="-" class="downvotePeep" style="font-size : 30px; text-align: center;" />' +
      '<span class="downvotesCount" style="margin-right:5px;">' +
      (peepDownvotes / totalRep) * 100 +
      "%</span>" +
      "</li>";
    $("#peepProposalList").append(listItem);
  
    $("#" + proposalId + " .upvotePeep").click(function() {
      upvotePeep(proposalId);
    });
    $("#" + proposalId + " .downvotePeep").click(function() {
      downvotePeep(proposalId);
    });
  }
  