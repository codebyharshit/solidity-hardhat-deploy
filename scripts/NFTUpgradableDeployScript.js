const { ethers, upgrades } = require("hardhat");

async function main() {
  const NFT = await ethers.getContractFactory("NFTUpgradable");
  console.log("Deploying NFTUpgradable...");

  const nft = await upgrades.deployProxy(NFT);
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  // Update mint rate
  const newMintRate = ethers.utils.parseEther("0.2");
  await nft.setMintRate(newMintRate);
  console.log("Mint rate updated to:", newMintRate.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

    // Test that the contract is working correctly
    // const maxLimitMint = await nft.maxLimitMint();
    // console.log("Max limit mint:", maxLimitMint.toString());
    // const maxSupply = await nft.maxSupply();
    // console.log("Max supply:", maxSupply.toString());
    // const mintRate = await nft.mintRate();
    // console.log("Mint rate:", mintRate.toString());
    // const baseURI = await nft.baseURI();
    // console.log("Base URI:", baseURI);