// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract MyLogicV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    string  public name;
    function initialize() initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();
        name = "MyLogicVV2";
    }
    function _authorizeUpgrade(address) internal override onlyOwner {}

    mapping(string => uint256) private logic;

    event logicSetted(string indexed _key, uint256 _value);

    function SetLogic(string memory _key, uint256 _value) external {
        logic[_key] = _value;
        emit logicSetted(_key, _value);
    }

    function SetName(string memory _name) external {
        name = _name;
    }

    function GetLogic(string memory _key) public view returns (uint256){
        console.log("get logic",_key);
        console.logBytes(bytes(_key));
        console.logBytes32(keccak256(bytes(_key)));
//        console.log("get logic3:",_key);
        return logic[_key]+100;
    }
}