// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.14;

import {DataTypes} from "../libs/DataTypes.sol";

abstract contract KProfileNFTStorage {

    mapping(bytes32 => uint256) internal _profileIdHash;
    mapping(address => bool) internal _minted;
    mapping(uint256 => DataTypes.KProfileStruct) internal _profileById;
    mapping(uint256 => string) internal _metadataById;
}