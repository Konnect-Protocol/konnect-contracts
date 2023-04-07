const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const {address} = require("hardhat/internal/core/config/config-validation");

let kprofileNft;
let currentSigner;

describe('kprofileNft', function () {
    it('current signer', async function () {
        const accounts = await ethers.getSigners();
        currentSigner = accounts[0].address;
        console.log("singer is", currentSigner);
    })

    it('deploys', async function () {
        const KprofileNft = await ethers.getContractFactory('KProfileNFT');
        //Load from specified contract address
        kprofileNft = await KprofileNft.attach(
            "0x879798845F001c3093f4Ff62a6035b3e7ee2b8ec" // The deployed contract address
        );
        // kprofileNft = (await upgrades.deployProxy(
        //     KprofileNft,
        //     [currentSigner, "Konnect profile NFT", "KP"],
        //     {kind: 'uups'}));

        console.log("kprofile address", kprofileNft.address);
        console.log("kprofile name ", await kprofileNft.name());
        console.log("kprofile nft symbol ", await kprofileNft.symbol());
    })
    it('mint kprofile', async function () {
        const params = {
            to: currentSigner,
            identity: "edddd",
            avatar: "",
            metadata: "",
            operator: ""
        };
        const x = await kprofileNft.mintKProfile(currentSigner, "eddd", "", "", currentSigner);
        console.log("tokenId is:", x);
    })


})
