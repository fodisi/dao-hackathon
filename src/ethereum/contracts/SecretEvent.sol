pragma solidity ^0.4.24;

import './Linnia.sol';

contract SecretEvent{
    
    LinniaHub _linniahub;
    
    constructor() public{
        _linniahub = LinniaHub(0xc39F2E4645DE2550eE3b64E6dc47f927E8a98934);
    }

}