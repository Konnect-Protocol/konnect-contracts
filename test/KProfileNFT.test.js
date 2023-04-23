const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const {address} = require("hardhat/internal/core/config/config-validation");


describe('kprofileNft', function () {

    let kprofileNft;
    let currentSigner;
    const contractAddress = "0xb48129fe4e6dff1cd2f27c7dfb2d0a2fbfee4c5b";

    beforeEach(async function () {
        const accounts = await ethers.getSigners();
        currentSigner = accounts[0].address;
        console.log("singer is", currentSigner);

        const KprofileNft = await ethers.getContractFactory('KProfileNFT');
        // const profile = (await upgrades.deployProxy(
        //     KprofileNft,
        //     [accounts[0].address, "Konnect profile NFT", "KP"],
        //     {kind: 'uups'}));
        kprofileNft = await KprofileNft.attach(
            contractAddress // The deployed contract address
        );
        //Load from specified contract address
        // kprofileNft = await profile.deployed();
        console.log(kprofileNft.address)
    });
    //
    it('mint kprofile', async function () {
        const x = await kprofileNft.mintKProfile(
            currentSigner,
            "zzz07",
            "xx",
            "https://ipfs.io/ipfs/QmbiMPbptQQrBud7RK1HBqedLBHyaDxkDehbXeWgabmhYx?filename=1",
            currentSigner
        );
        console.log("mint hash:", x);
    })
    it('mint kprofile 2', async function () {
        const x = await kprofileNft.tokenURI(2)
        console.log("x:", x);
    })


})
