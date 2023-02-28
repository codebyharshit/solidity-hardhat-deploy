require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const alchemyProjectId = process.env.ALCHEMY_PROJECT_ID;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    Mumbai: {
      url: alchemyProjectId,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "CVEMTB1KVHDY3TIQ99YSNKG4V7YN69E1J4",
    },
  },
};
