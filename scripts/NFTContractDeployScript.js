const hre = require("hardhat");

async function main() {
  // Set deployment parameters
  const maxLimitMint = 100;
  const maxSupply = 1000;
  const mintRate = hre.ethers.utils.parseEther("0.1");
  const baseURI =
    "ipfs://bafybeieyetlp2c2vubffzjjap7utuz5jwo2k5b5kupvezfchc5tnfg4fh4/";

  // Deploy NFT contract
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();

  console.log(`NFT contract deployed to ${nft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
