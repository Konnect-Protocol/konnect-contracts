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
        kprofileNft = await profile.attach(
            "0xB48129fE4E6dFF1cd2f27c7dfB2d0a2FBfEE4C5B" // The deployed contract address
        );
        console.log(kprofileNft.address)
    });

    it('mint kprofile', async function () {
        const x = await kprofileNft.mintKProfile(
            currentSigner,
            "xxxx",
            "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
            "https://ipfs.io/ipfs/QmbiMPbptQQrBud7RK1HBqedLBHyaDxkDehbXeWgabmhYx?filename=1",
            currentSigner
        );
        console.log("tokenId is:", x);
    })


})
