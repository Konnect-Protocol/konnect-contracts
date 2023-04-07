const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const {address} = require("hardhat/internal/core/config/config-validation");


let myLogicV1;
let myLogicV2;

describe('singer', function () {
    it('current signer', async function () {
        const accounts = await ethers.getSigners();
        console.log("singer is", accounts[0].address);
    })
})

describe('uups mode upgrade', function () {
    it('deploys', async function () {
        const MyLogicV1 = await ethers.getContractFactory('MyLogicV1');
        //Load from specified contract address
        // myLogicV1 = await MyLogicV1.attach(
        //     "0xF51285554c86F1Ed7824B61BfC7061e305BF20a3" // The deployed contract address
        // );
        myLogicV1 = (await upgrades.deployProxy(MyLogicV1, {kind: 'uups'}));
        console.log("myLogicV1 address", myLogicV1.address);
        console.log("myLogicV1 name ", await myLogicV1.name());
    })
    it('myLogicV1 set', async function () {
        await myLogicV1.SetLogic("aa", 1);
        let v = await myLogicV1.GetLogic("aa");
        expect(v).to.equal('1');
    })
    it('upgrades', async function () {
        const MyLogicV2 = await ethers.getContractFactory('MyLogicV2');
        myLogicV2 = (await upgrades.upgradeProxy(myLogicV1, MyLogicV2));
        await myLogicV2.SetName("new name!");
        console.log("myLogicV2 address", myLogicV2.address);
    })
    it('myLogicV2 get', async function () {
        let v = (await myLogicV2.GetLogic("aa")).toString()
        expect(v).to.equal('101');
        console.log("myLogicV1 name", await myLogicV1.name());
        console.log("myLogicV2 name", await myLogicV2.name());
    })
    it('contract ownership', async function () {
        let v = (await myLogicV2.GetLogic("aa")).toString()
        expect(v).to.equal('101');
        console.log("myLogicV1 name", await myLogicV1.name());
        console.log("myLogicV2 name", await myLogicV2.name());
    })

})
describe('the contract ownership', function () {
    it('ownership is', async function () {
        console.log(await myLogicV1.owner());
    })
})
describe('Transfer ownership', function () {
    it('transfer ownership', async function () {
        const gnosisSafe = '0xa8da4bC9E01F38B6129852F59c3829842cCe20C5';
        console.log("Transferring ownership...");
        const tx = await myLogicV1.transferOwnership(gnosisSafe);
        await tx.wait();
        console.log("Transferred ownership to:", gnosisSafe);
        console.log("New owner:", await myLogicV1.owner());
    })
})