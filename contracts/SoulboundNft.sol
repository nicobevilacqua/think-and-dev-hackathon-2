// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import {ERC721} from "solmate/src/tokens/ERC721.sol";

abstract contract SoulboundNft is ERC721 {
    function approve(address, uint256) public override {
        revert("soulbound");
    }

    function setApprovalForAll(address, bool)
        public
        override
    {
        revert("soulbound");
    }

    function transferFrom(address,address,uint256) public override {
        revert("soulbound");
    }


    function safeTransferFrom(
        address,
        address,
        uint256
    ) public override {
        revert("soulbound");
    }
}