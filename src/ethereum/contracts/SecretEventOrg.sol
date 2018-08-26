pragma solidity ^0.4.24;


contract SecretEventOrg{
    //address of organizer
    address private organizer;
    // linnia encryption_key of event organizer 
    string public encryption_key;
    // Member infromation type
    struct Member {
        address addr;
        uint provenance;
        address initiator;
        uint referrals_remaining;
        string public_keys;
    }
    // event information
    struct SecretEvent {
        string eventName;
        string describe;
        uint capacity;
        uint deposit;
        uint start_time;
        uint duration;
        string location;// = "SECRET : disclosed to members";
        string details; // = "SECRET : disclosed to members";
    }
    // mapping from member address to member information
    mapping (address => Member) memberInfo;
    // refered friend to member mapping
    mapping (address => address) referralInfo;
    // address of members
    address[] innerCircle;
    // information on events of this organizer
    mapping (bytes32 => SecretEvent) public eventInfo;
    // total events successful so far
    uint numEvents=0;
    uint MAX_REFERRALS=5;
    bytes32 public currentEventHash;
    // constructor
    constructor(string public_key) public {
        organizer = msg.sender;
        encryption_key = public_key;
        memberInfo[organizer] = Member(organizer, 0, 0, MAX_REFERRALS, public_key);
    }
    
    // organizer only
    modifier _onlyOrganizer(address _caller) {
        require(_caller == organizer, "Unauthorized request, organizer only");
        _;
    }
    
    // member only
    modifier _onlyMember(address _caller) {
        require(_caller == memberInfo[_caller].addr, "Members only");
        _;
    }
    
    // check if current event expired
    modifier _eventNotExpired(bytes32 id) {
        require(eventInfo[id].start_time != 0 && now < eventInfo[id].start_time, "can't create a new event");
        _;
    }
    // check if maximum event capacity reached
    modifier _maxEventCap(bytes32 id) {
        require(eventInfo[id].capacity > 0, "Maximum capacity reached");
        _;
    }
    //check if member is allowed to refer more friends
    modifier _referralsAllowed(address caller) {
        require(memberInfo[caller].referrals_remaining > 0, "Cant refer more people");
        _;
    }
    //check if friend is already referred by other member
    modifier _notAlreadyReferred(address addr) {
        require(referralInfo[addr] == 0, "Someone already referred your friend");
        _;
    }
    //check if friend is already referred by other member
    modifier _alreadyReferred(address addr) {
        require(referralInfo[addr] != 0, "Referral by a Member is required");
        _;
    }
    
    modifier _eventDoesntExists(bytes32 id) {
        require(eventInfo[id].start_time == 0, "Event already exists, cant add");
        _;
    } 
    
    modifier _ifDepositEnough(bytes32 id, uint val) {
        require(val >= eventInfo[id].deposit, "Not enough Mulah" );
        _;
    }
     
    // member refers a friend
    function referFriend(address _addr) public _onlyMember(msg.sender) _referralsAllowed(msg.sender) _notAlreadyReferred(_addr) {
        referralInfo[_addr] = msg.sender;
        memberInfo[msg.sender].referrals_remaining--; 
    }
    // referred friend applies for membership 
    function applyMembership(string public_key) public _alreadyReferred(msg.sender) {
        memberInfo[msg.sender] = Member(msg.sender, memberInfo[referralInfo[msg.sender]].provenance+1, referralInfo[msg.sender], MAX_REFERRALS, public_key);
        referralInfo[msg.sender] = 0;
        innerCircle.push(msg.sender);
    } 
    
    // add Event 
    function addEvent(bytes32 id, string name, string describe, uint capacity, uint deposit, uint start_time, uint duration) public _onlyOrganizer(msg.sender) _eventDoesntExists(id){
        eventInfo[id] = SecretEvent(name, describe, capacity, deposit, now+start_time, duration, "SECRET: revealed to members", "SECRET: revealed to members");
        numEvents++;
        currentEventHash = id;
    }
    // attendEvent
    function attendEvent(bytes32 id) public payable _onlyMember(msg.sender) _eventNotExpired(id) _maxEventCap(id) _ifDepositEnough(id, msg.value){
        uint balance = msg.value - eventInfo[id].deposit;
        msg.sender.transfer(balance);
    }
    
}