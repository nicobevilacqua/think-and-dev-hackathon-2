// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {TwitterProfile} from "../contracts/TwitterProfile.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public returns(address profileContract) {
        vm.broadcast();
        profileContract = address(new TwitterProfile("TwitterProfile", "TP", "https://Decentralized-twitter.com/"));

    }
}
