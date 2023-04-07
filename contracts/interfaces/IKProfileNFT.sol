// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.18;

import { DataTypes } from "../libs/DataTypes.sol";

interface IKProfileNFT {
    /**
     * @notice Initializes the KProfile NFT.
     *
     * @param _owner Owner of the KProfile NFT.
     * @param name Name to set for the KProfile NFT.
     * @param symbol Symbol to set for the KProfile NFT.
     */
    function initialize(
        address _owner,
        string calldata name,
        string calldata symbol
    ) external;

    /*
     * @notice Mint a kprofile and mints it to the recipient address.
     *
     * @param params contains all params.
     * @param data contains extra data.
     *
     * @dev The current function validates the caller address and the identity before minting
     * and the following conditions must be met:
     * - The recipient address must be a valid Ethereum address.
     * - The identity must contain only a-z, A-Z, 0-9.
     * - The identity must not be empty.
     * - The identity must not be longer than 27 bytes.
     * - The identity must not be already used.
     */
    function mintKProfile(
        address to,
        string memory identity,
        string memory avatar,
        string memory metadata,
        address operator) external payable returns (uint256);
}