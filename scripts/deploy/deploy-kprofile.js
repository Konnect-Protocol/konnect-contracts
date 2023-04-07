// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers, upgrades} = require("hardhat");

async function main() {
    const Profile = await ethers.getContractFactory('KProfileNFT');
    const accounts = await ethers.getSigners();
    console.log("singer is", accounts[0].address);
    const profile = (await upgrades.deployProxy(
        Profile,
        [accounts[0].address, "Konnect profile NFT", "KP"],
        {kind: 'uups'}));

    await profile.deployed();

    console.log("profile nft address", profile.address);
    console.log("profile nft name ", await profile.name());
    console.log("profile nft symbol ", await profile.symbol());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
