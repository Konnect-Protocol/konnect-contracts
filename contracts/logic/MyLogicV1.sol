// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract MyLogicV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    string  public name;

    function initialize(address owner) initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();
        name = "MyLogicVV1";
    }


    function _authorizeUpgrade(address) internal override onlyOwner {}

    mapping(string => uint256) private logic;

    event logicSetted(string indexed _key, uint256 _value);

    function SetLogic(string memory _key, uint256 _value) external {
        logic[_key] = _value;
        emit logicSetted(_key, _value);
    }

    function GetLogic(string memory _key) public view returns (uint256){
        console.log("xxxxssssss",_key);
        return logic[_key];
    }
}
