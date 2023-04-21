const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const {address} = require("hardhat/internal/core/config/config-validation");


describe('kprofileNft', function () {

    let kprofileNft;
    let currentSigner;

    beforeEach(async function () {
        const accounts = await ethers.getSigners();
        currentSigner = accounts[0].address;
        console.log("singer is", currentSigner);

        const KprofileNft = await ethers.getContractFactory('KProfileNFT');
        const profile = (await upgrades.deployProxy(
            KprofileNft,
            [accounts[0].address, "Konnect profile NFT", "KP"],
            {kind: 'uups'}));
        //Load from specified contract address
        kprofileNft = await profile.deployed();
        console.log(kprofileNft.address)
    });
    //
    it('mint kprofile', async function () {
        // const x = await kprofileNft.mintKProfile(
        //     currentSigner,
        //     "ZZZz",
        //     "xx",
        //     "https://ipfs.io/ipfs/QmW41URssnUDQ18Yv9ze7SkETzvs4jVgwtCFPQSprYGkyt?filename=2",
        //     currentSigner
        // );
        console.log("tokenId is:");
    })


})
