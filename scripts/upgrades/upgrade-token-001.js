require("@openzeppelin/hardhat-upgrades")

const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploying token1
    const Token = await ethers.getContractFactory("MyLogicV1");
    const token1 = await upgrades.deployProxy(Token);
    await token1.deployed();
    console.log("MyLogicV1 address:",token1.address);

    // Deploying token2

    const Token2 = await ethers.getContractFactory("MyLogicV2");
    const token2 = await upgrades.deployProxy(Token2);
    await token2.deployed();
    console.log("Token2 address:",token2.address);
    //
    // // Upgrading
    const upgraded = await upgrades.upgradeProxy(token1, Token2);
    console.log("Address after upgrade：",upgraded.address);
    //
    // console.log(await upgraded.name());
    console.log("upgrade!")
}

main();