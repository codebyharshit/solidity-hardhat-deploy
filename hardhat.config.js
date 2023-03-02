require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");

require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const alchemyProjectId = process.env.ALCHEMY_PROJECT_ID;
const explorerApiKey = process.env.EXPLORER_APIKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    Mumbai: { 
      url: alchemyProjectId,
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai:explorerApiKey}
  }
};
