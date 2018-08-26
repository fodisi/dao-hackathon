pragma solidity ^0.4.24;

// Deployed at 0x6c62e236aa63749682886f49dea4fb72e97cda16 on Ropsten!

contract SecretEventOrg{
    address private organizer;                                                  // Address of organizer
    string public encryption_key;                                               // Linnia encryption_key of event organizer 
    
    struct Member {                                                             // Member infromation type
        address addr;
        uint provenance;
        address initiator;
        uint referrals_remaining;
        string public_keys;
    }
    
    struct SecretEvent {                                                        // Event information
        string eventName;
        string describe;
        uint capacity;
        uint deposit;
        uint start_time;
        uint duration;
        string location;                                                        // = "SECRET : Will be disclosed to members";
        string details;                                                         // = "SECRET : Will be disclosed to members";
    }
    
    address[] public innerCircle;                                                      // Address of members
    uint numEvents = 0;                                                         // Total events successful so far
    uint MAX_REFERRALS = 5;
    
    mapping (address => Member) memberInfo;                                     // Mapping from member address to member information
    mapping (address => address) referralInfo;                                  // Refered friend to member mapping
    mapping (bytes32 => SecretEvent) public eventInfo;                          // Information on events created by this organizer
    
    bytes32 public currentEventHash;
    
    // Constructor
    constructor(string public_key) public {
        organizer = msg.sender;
        encryption_key = public_key;
        memberInfo[organizer] = Member(organizer, 0, 0, MAX_REFERRALS, public_key);
    }
    
    // Organizer only
    modifier _onlyOrganizer(address _caller) {
        require(_caller == organizer, "Unauthorized request, organizer only");
        _;
    }
    
    // Member only
    modifier _onlyMember(address _caller) {
        require(_caller == memberInfo[_caller].addr, "Members only");
        _;
    }
    
    // Check if current event expired
    modifier _eventNotExpired(bytes32 id) {
        require(eventInfo[id].start_time != 0 && now < eventInfo[id].start_time, "can't create a new event");
        _;
    }
    
    // Check if maximum event capacity reached
    modifier _maxEventCap(bytes32 id) {
        require(eventInfo[id].capacity > 0, "Maximum capacity reached");
        _;
    }
    
    // Check if member is allowed to refer more friends
    modifier _referralsAllowed(address caller) {
        require(memberInfo[caller].referrals_remaining > 0, "Cant refer more people");
        _;
    }
    
    // Check if friend is already referred by other member
    modifier _notAlreadyReferred(address addr) {
        require(referralInfo[addr] == 0, "Someone already referred your friend");
        _;
    }
    
    // Check if friend is already referred by other member
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
     
    // Member refers a friend
    function referFriend(address _addr) public _onlyMember(msg.sender) _referralsAllowed(msg.sender) _notAlreadyReferred(_addr) {
        referralInfo[_addr] = msg.sender;
        memberInfo[msg.sender].referrals_remaining--; 
    }
    
    // Referred friend applies for membership 
    function applyMembership(string public_key) public _alreadyReferred(msg.sender) {
        memberInfo[msg.sender] = Member(msg.sender, memberInfo[referralInfo[msg.sender]].provenance+1, referralInfo[msg.sender], MAX_REFERRALS, public_key);
        referralInfo[msg.sender] = 0;
        innerCircle.push(msg.sender);
    } 
    
    // Add Event 
    function addEvent(bytes32 id, string name, string describe, uint capacity, uint deposit, uint start_time, uint duration) public _onlyOrganizer(msg.sender) _eventDoesntExists(id){
        eventInfo[id] = SecretEvent(name, describe, capacity, deposit, now+start_time, duration, "SECRET: revealed to members", "SECRET: revealed to members");
        numEvents++;
        currentEventHash = id;
    }
    
    // Attend Event
    function attendEvent(bytes32 id) public payable _onlyMember(msg.sender) _eventNotExpired(id) _maxEventCap(id) _ifDepositEnough(id, msg.value){
        uint balance = msg.value - eventInfo[id].deposit;
        msg.sender.transfer(balance);
    }
    
    // Returns event info
    function getEventInfo(bytes32 _recordHash) public view returns(string eventName, string describe, uint capacity, uint deposit, uint start_time, uint duration){
        return (eventInfo[_recordHash].eventName, eventInfo[_recordHash].describe, eventInfo[_recordHash].capacity, eventInfo[_recordHash].deposit, eventInfo[_recordHash].start_time, eventInfo[_recordHash].duration);
    }

    // Returns event info
    function getSecretEventInfo(bytes32 _recordHash) public view returns(string location, string details){
        return (eventInfo[_recordHash].location, eventInfo[_recordHash].details);
    }
    // Checks if address was referred.
    function checkIfReferred(address addr) public view returns(bool) {
        return referralInfo[addr] != 0;
    }

    // Checks if address is a member.
    function checkIfMember(address addr) public view returns(bool) {
        return memberInfo[addr].addr != 0;
    }
}
