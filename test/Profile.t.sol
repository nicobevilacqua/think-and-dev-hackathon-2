pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import {TwitterProfile} from "../contracts/TwitterProfile.sol";

contract ContractBTest is Test {
    TwitterProfile profile;

    address bob = makeAddr("bob");
    address alice = makeAddr("alice");

    function setUp() public {
        profile = new TwitterProfile("TwitterProfile", "TP", "https://Decentralized-twitter.com/");
    }

    function test_mint() public {
        vm.prank(bob);
        profile.mint(bytes32("bob"));
        assertEq(profile.balanceOf(bob), 1);

        // Cant mint more than once
        vm.prank(bob);
        vm.expectRevert();
        profile.mint(bytes32("bob2"));

        vm.prank(alice);
        vm.expectRevert();
        profile.mint(bytes32("bob"));

        vm.prank(alice);
        profile.mint(bytes32("alice"));
    }

    function test_getProfile() public {
        vm.prank(bob);
        profile.mint(bytes32("bob"));
        assertEq(profile.idToUsername(1), bytes32("bob"));

        assertEq(profile.addressToUsername(bob), profile.idToUsername(1));
    }
}
