require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        xh: {
            url: `http://192.168.2.23:7545/`,
            accounts: [`0xeb52eaace349abc04d3613f7c855d133cb530000524fa01395983705d18e2a0f`]
        },
        ll:{
            url: `http://127.0.0.1:8545/`,
            accounts: [process.env.ACCOUNT_LL_LOCAL]
        },
        mumbai: {
            url: `https://rpc-mumbai.maticvigil.com`,
            accounts: [`0xf0ffae59bef8cf729858f3361c209b9cfd8295d028418adadd0bf2184c864e69`]
        }
    },
    solidity: "0.8.18"
};