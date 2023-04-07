// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.14;

contract KProfileNFTModifiers{

    modifier nonReentrant() {

        _;
    }
}