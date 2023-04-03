const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("Token", function () {

    async function deployToken() {
        const TOTAL_SUPPLY = "13_000_000_000";

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const initialSupply = hre.ethers.utils.parseEther(TOTAL_SUPPLY);

        const Token = await hre.ethers.getContractFactory("Token");
        const token = await Token.deploy(initialSupply);

        return { token, TOTAL_SUPPLY, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right Supply", async function () {
            const { token, totalSupply } = await loadFixture(deployToken);

            expect(await token.totalSupply()).to.equal(totalSupply);
        });

    });

});
