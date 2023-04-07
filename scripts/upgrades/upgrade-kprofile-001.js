const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const {address} = require("hardhat/internal/core/config/config-validation");

let kprofileNft;
let currentSigner;
const contractAddress = "0x879798845F001c3093f4Ff62a6035b3e7ee2b8ec";

describe('upgrade kprofile nft', function () {
    it('current signer', async function () {
        const accounts = await ethers.getSigners();
        currentSigner = accounts[0].address;
        console.log("singer is", currentSigner);
    })

    it('loading kprofile contract', async function () {
        const KprofileNft = await ethers.getContractFactory('KProfileNFT');
        //Load from specified contract address
        kprofileNft = await KprofileNft.attach(
            contractAddress // The deployed contract address
        );
        console.log("kprofile address", kprofileNft.address);
        console.log("kprofile name ", await kprofileNft.name());
        console.log("kprofile nft symbol ", await kprofileNft.symbol());
    })

    it('upgrading', async function () {
        // const MyLogicV2 = await ethers.getContractFactory('MyLogicV2');
        // myLogicV2 = (await upgrades.upgradeProxy(myLogicV1, MyLogicV2));
        // await myLogicV2.SetName("new name!");
        // console.log("upgraded!", myLogicV2.address);
    })
})

describe('Transfer ownership', function () {
    // it('transfer ownership', async function () {
    //     const gnosisSafe = '0xa8da4bC9E01F38B6129852F59c3829842cCe20C5';
    //     console.log("Transferring ownership...");
    //     const tx = await kprofileNft.transferOwnership(gnosisSafe);
    //     await tx.wait();
    //     console.log("Transferred ownership to:", gnosisSafe);
    //     console.log("New owner:", await kprofileNft.owner());
    // })
})