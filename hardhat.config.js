require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    Mumbai: { 
      url: "https://polygon-mumbai.g.alchemy.com/v2/vKN3SWGBGfPXo5afbsJN-wipI1An_cqm",
      accounts: ['0xd3c47bd98b705aeab265f36d958bdac39567c6582a1190dd5d504233143da149']
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai:"CVEMTB1KVHDY3TIQ99YSNKG4V7YN69E1J4"}
  }
};
