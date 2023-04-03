// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    const initialSupply = hre.ethers.utils.parseEther("130000000");

    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy(initialSupply);

    await token.deployed();

    console.log(
        `Token supply ${ethers.utils.formatEther(
            initialSupply
        )}Token deployed to ${token.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
