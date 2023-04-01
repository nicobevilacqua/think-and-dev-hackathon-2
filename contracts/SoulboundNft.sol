import {ERC721} from "solmate/tokens/ERC721.sol";

abstract contract SoulboundNft is ERC721 {
    function approve(address to, uint256 id) public override {
        revert("soulbound");
    }

    function setApprovalForAll(address operator, bool approved)
        public
        override
    {
        revert("soulbound");
    }

    function transferFrom(
        address from,
        address to,
        uint256 id
    ) public override {
        revert("soulbound");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id
    ) public override {
        revert("soulbound");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes memory data
    ) public override {
        revert("soulbound");
    }
}