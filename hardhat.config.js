require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
/** @type import('hardhat/config').HardhatUserConfig */
const { alchemyAPIkeyGoerli } = require('./secrets.json');
const { deployerWalletPrivateKey } = require('./secrets.json');
const { etherscanAPIkey } = require('./secrets.json');
module.exports = {
  solidity: "0.8.6",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks:{
    hardhat:{
      chainId:1337,
    },
    goerli:{
      url:alchemyAPIkeyGoerli,
      accounts:[deployerWalletPrivateKey],
      gas: 10000000
    }
  },
  etherscan:{
    apiKey: etherscanAPIkey    
},
paths: {
  sources: "./contracts",
  tests: "./test",
  cache: "./cache",
  artifacts: "./artifacts"
}
};
