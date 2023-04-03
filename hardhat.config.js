require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        xh: {
            url: `http://192.168.2.23:7545/`,
            accounts: [`0xeb52eaace349abc04d3613f7c855d133cb530000524fa01395983705d18e2a0f`],
        },
        mumbai: {
            url: `https://rpc-mumbai.maticvigil.com`,
            accounts: [`0xa0b7f9b1daca28298c3e607da81ca6f4a8edeb2eea6812a5b0b85710496863cb`],
        }
    },
    solidity: "0.8.18"
};