// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {SoulboundNft, ERC721} from "./SoulboundNft.sol";

contract TwitterProfile is SoulboundNft {
    uint256 public totalSupply;
    mapping (uint256 id => bytes32 username) public idToUsername;
    mapping (bytes32 username => uint256 id) public usernameToId;
    mapping (address user => uint256 id) public addresToId;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory _baseURI
    ) ERC721(name_, symbol_) {
        //baseURI = _baseURI;
    }

    function validAndCleanUsername(bytes32 str) public pure returns (bytes32 ret){
        uint256 l;
        
        for(uint i = 0; i< 31; i++){
            bytes1 char = str[31-i];
            ++l;
            if(
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2E) //.
            ) {
                break;
            }
            ret = ret ^ (bytes32(char) >> 8*(31-i));
        }
        
        require(l > 4, "username too short");
        return ret;
    }

    function mint(bytes32 username) external {
        // TODO valida y limpia el username
        // username = validAndCleanUsername(username);
        
        require(addresToId[msg.sender] == 0, "cant have more than once");
        require(usernameToId[username] == 0, "username already taken");
        
        uint256 newId = ++totalSupply;
        _mint(msg.sender, newId);
        idToUsername[totalSupply] = username;
        usernameToId[username] = totalSupply;
        addresToId[msg.sender] = totalSupply;
    }

    function tokenURI(uint256 id) public override view returns (string memory) {
        if (ownerOf(id) == address(0)) revert ("DoesNotExist");

        //return string(abi.encodePacked(baseURI, id));

        return string(abi.encodePacked("", id));
    }

    function addressToUsername(address user) public view returns (bytes32) {
        return idToUsername[addresToId[user]];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override
        returns (bool)
    {
        return
            interfaceId == 0x7f5828d0 || // ERC165 Interface ID for ERC173
            interfaceId == 0x80ac58cd || // ERC165 Interface ID for ERC721
            interfaceId == 0x5b5e139f || // ERC165 Interface ID for ERC165
            interfaceId == 0x01ffc9a7; // ERC165 Interface ID for ERC721Metadata
    }
}
