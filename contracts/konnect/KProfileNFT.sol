// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.14;

import "../token/ERC721Upgradeable.sol";
import "../token/extensions/ERC721URIStorageUpgradeable.sol";
import "../access/OwnableUpgradeable.sol";
import "../security/PausableUpgradeable.sol";
import "../utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {Constants} from "../libs/Constants.sol";
import {DataTypes} from "../libs/DataTypes.sol";
import {KProfileNFTStorage} from "../storages/KProfileNFTStorage.sol";

import "../interfaces/IKProfileNFT.sol";

/**
 * @title Profile NFT
 * @author KConnect
 * @notice This contract is used to create a kprofile NFT.
 */
contract KProfileNFT is
Initializable,
UUPSUpgradeable,
OwnableUpgradeable,
PausableUpgradeable,
ERC721Upgradeable,
ERC721URIStorageUpgradeable,
IKProfileNFT,
KProfileNFTStorage
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    /// @inheritdoc IKProfileNFT
    function initialize(
        address _owner,
        string calldata _name,
        string calldata _symbol) initializer external {
        require(_owner != address(0), "ZERO_ADDRESS");
        require(
            bytes(_name).length <= Constants._MAX_KPROFILE_NAME_LENGTH,
            "NAME_INVALID_LENGTH"
        );
        require(
            bytes(_symbol).length <= Constants._MAX_KPROFILE_SYMBOL_LENGTH,
            "SYMBOL_INVALID_LENGTH"
        );
        __ERC721_init(_name, _symbol);
        __Pausable_init();
        __Ownable_init();
        transferOwnership(_owner);
        __UUPSUpgradeable_init();
    }

    function pause() public onlyOwner {_pause();}

    function unpause() public onlyOwner {_unpause();}

    function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    /// @inheritdoc IKProfileNFT
    function mintKProfile(
        address to,
        string calldata identity,
        string calldata avatar,
        string calldata metadata,
        address operator) external payable returns (uint256 nftID)
    {
        DataTypes.CreateKProfileParams memory params = DataTypes.CreateKProfileParams(
            to, identity, avatar, metadata, operator
        );

        return _mintKProfile(params);
    }

    function _mintKProfile(
        DataTypes.CreateKProfileParams memory params
    ) internal
    returns (uint256 nftID){
        _checkKProfileIdentity(params.identity);

        bytes32 identityHash = keccak256(bytes(params.identity));
        require(!_exists(_profileIdHash[identityHash]), "IDENTITY_USED");
        //mint
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(params.to, newTokenId);
        _setTokenURI(newTokenId, params.metadata);

        //save
        _profileById[newTokenId].identity = params.identity;
        _profileById[newTokenId].avatar = params.avatar;
        _profileIdHash[identityHash] = newTokenId;
        _metadataById[newTokenId] = params.metadata;
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        require(false, "IDENTITY_USED");
        super._burn(tokenId);
    }

    function _checkKProfileIdentity(string memory identity) internal pure {
        bytes memory byteIdentity = bytes(identity);
        require(
            byteIdentity.length <= Constants._MAX_KPROFILE_IDENTITY_LENGTH &&
            byteIdentity.length > 0,
            "IDENTITY_INVALID_LENGTH"
        );
        for (uint256 i = 0; i < byteIdentity.length;) {
            bytes1 b = byteIdentity[i];
            require(
                (b >= "0" && b <= "9") || (b >= "a" && b <= "z") || b == "_",
                "IDENTITY_INVALID_CHARACTER"
            );
        unchecked {
            ++i;
        }
        }
    }
}