pragma solidity ^0.4.24;

contract DaoUser {

    enum Rank { User, Verifier }

    struct User {
        string name;
        uint reputation;
        Rank rank;
    }

    User[] public users;
    uint public userCount = 0;

    mapping (address => uint) public findUserID;
    mapping (address => bool) public isRegistered;

    function createUser(string _name) public {
        uint id = users.push(User(_name, 0, Rank.User)) - 1;

        isRegistered[msg.sender] = true;
        findUserID[msg.sender] = id;
        userCount++;
    }

    function electVerifier() public {
        users[findUserID[msg.sender]].rank = Rank.Verifier;
    }

    function isRegistered(address _user) public view returns (bool) {
        return isRegistered[_user];
    }

    function getUserCount() public view returns(uint) {
        return users.length;
    }
}

contract InitiativeCreator is DaoUser {
    address[] public deployedInitiatives;

    function createInitiative(string _name) public {
        require(isRegistered[msg.sender] == true);
        address newInitiative = new Initiative(_name, msg.sender);
        deployedInitiatives.push(newInitiative);
    }

    function getDeployedInitiatives() public view returns (address[]) {
        return deployedInitiatives;
    }
}

contract Initiative is DaoUser {
    enum ProposalStatus { OPEN, CLOSE, SUCCESS, FAIL }

    address public manager;
    string public name;
    Proposal[] public proposals;
    address public deployedDAOAddress;
    InitiativeCreator daoContract;

    struct Proposal {
        address proposer;
        string title;
        address recipient;
        string descriptionHash;
        uint voteCount;
        ProposalStatus status;
    }

    mapping (uint => address) public propIDtoProposer;
    mapping (address => uint) public proposalCount;
    mapping (address => mapping(uint => bool)) hasVoted;

    constructor(string _name, address _manager) public {
        manager = _manager;
        name = _name;
        daoContract = InitiativeCreator(msg.sender);
    }

    function createProposal(
        string _title,
        address _recipient,
        string _descriptionHash
    ) public {
        uint id = proposals.push(Proposal(
            msg.sender,
            _title,
            _recipient,
            _descriptionHash,
            0,
            ProposalStatus.OPEN
        )) - 1;

        propIDtoProposer[id] = msg.sender;
        proposalCount[msg.sender]++;
    }

    function voteOnProposal(uint _id) public {
        Proposal storage proposal = proposals[_id];

        require(daoContract.isRegistered(msg.sender) == true);
        require(proposal.status == ProposalStatus.OPEN);
        require(hasVoted[msg.sender][_id] == false);

        proposal.voteCount++;
        hasVoted[msg.sender][_id] = true;
    }

    function finalize() public returns(uint) {
        uint winner = 0;

        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winner) {
                winner = i;
            }

            proposals[i].status = ProposalStatus.FAIL;
        }

        proposals[winner].status = ProposalStatus.SUCCESS;
        return winner;
    }

    function getUserCount() public view returns (uint) {
        return daoContract.getUserCount();
    }

    function getProposalCount() public view returns(uint) {
        return proposals.length;
    }

    function getProposalByCreator() public view returns(uint[]) {
        uint[] memory result = new uint[](proposalCount[msg.sender]);

        uint counter = 0;
        for (uint i = 0; i < proposals.length; i++) {
          if (propIDtoProposer[i] == msg.sender) {
            result[counter] = i;
            counter++;
          }
        }

        return result;
    }
}
