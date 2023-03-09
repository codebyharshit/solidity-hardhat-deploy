const { ethers, upgrades } = require("hardhat");

async function main() {
  const NFT = await ethers.getContractFactory("NFTUpgradable");
  console.log("Deploying NFTUpgradable...");
  const nft = await upgrades.deployProxy(NFT);
  await nft.deployed();
  console.log("NFT Proxy Contract deployed to:", nft.address);

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