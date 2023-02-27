const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  let nft, owner;

  const baseURI = "ipfs://bafybeieyetlp2c2vubffzjjap7utuz5jwo2k5b5kupvezfchc5tnfg4fh4/";
  const maxLimitMint = 100;
  const maxSupply = 1000;
  const mintRate = ethers.utils.parseEther("0.1");

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await nft.name()).to.equal("Verizons");
      expect(await nft.symbol()).to.equal("VRZS");
    });
  });

  describe("mint", function () {
    it("should allow owner to mint tokens", async function () {
      const [owner] = await ethers.getSigners();
      const quantity = 10;
      const totalSupplyBefore = await nft.totalSupply();
      await nft.mint(quantity, { value: mintRate.mul(quantity) });
      const totalSupplyAfter = await nft.totalSupply();
      expect(totalSupplyAfter).to.equal(totalSupplyBefore.add(quantity));
    });

    // it("should not allow non-owners to mint tokens", async function () {
    //   const quantity = 10;
    //   await expect(
    //     nft
    //       .connect(ethers.provider.getSigner(1))
    //       .mint(quantity, { value: mintRate.mul(quantity) })
    //   ).to.be.revertedWith("Ownable: caller is not the owner");
    // });

    it("should not allow minting more tokens than the max limit", async function () {
      const [owner] = await ethers.getSigners();
      const quantity = maxLimitMint + 1;
      await expect(
        nft.mint(quantity, { value: mintRate.mul(quantity) })
      ).to.be.revertedWith("Exceeded the limit");
    });

    it("should not allow minting when there are not enough tokens left", async function () {
      const [owner] = await ethers.getSigners();
      const quantity = maxSupply + 1;
      await expect(
        nft.mint(quantity, { value: mintRate.mul(quantity) })
      ).to.be.revertedWith("Exceeded the limit");
    });

    it("should not allow minting without sending enough ether", async function () {
      const [owner] = await ethers.getSigners();
      const quantity = 10;
      await expect(
        nft.mint(quantity, { value: mintRate.mul(quantity).sub(1) })
      ).to.be.revertedWith("Not enough ether sent");
    });
  });

  // describe("burn", function () {
  //   it("should allow owner to burn tokens", async function () {
  //     const [owner] = await ethers.getSigners();
  //     await nft.mint(1, { value: mintRate });
  //     const tokenId = await nft.totalSupply();
  //     await nft.burn(tokenId);
  //     expect(await nft.totalSupply()).to.equal(0);
  //   });

    describe("burn", function () {
    it("should not allow non-owners to burn tokens", async function () {
      const tokenId = 1;
      await nft.mint(1, { value: mintRate });
      await expect(
        nft.connect(ethers.provider.getSigner(1)).burn(tokenId)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not allow burning non-existent tokens", async function () {
      const [owner] = await ethers.getSigners();
      const tokenId = 1;
      await expect(nft.burn(tokenId)).to.be.revertedWith("TokenId Not Exist");
    });
  });

  describe("withdraw", function () {
    it("should allow owner to withdraw contract balance", async function () {
      const [owner] = await ethers.getSigners();
      const quantity = 10;
      await nft.mint(quantity, { value: mintRate.mul(quantity) });

      const contractBalanceBefore = await ethers.provider.getBalance(
        nft.address
      );
      const ownerBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );

      await nft.withdraw();

      const contractBalanceAfter = await ethers.provider.getBalance(
        nft.address
      );
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

      const buffer = ethers.utils.parseEther("1");

      expect(contractBalanceAfter).to.equal(0);
      expect(ownerBalanceAfter).to.be.above(
        ownerBalanceBefore.add(contractBalanceBefore).sub(buffer)
      );
    });

    it("should not allow non-owners to withdraw contract balance", async function () {
      await expect(
        nft.connect(ethers.provider.getSigner(1)).withdraw()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("baseURI", function () {
    it("should return the base URI", async function () {
      expect(await nft.baseURI()).to.equal(baseURI);
    });
  });

  describe("setMintRate", function () {
    it("should allow owner to set the mint rate", async function () {
      const [owner] = await ethers.getSigners();
      const newMintRate = ethers.utils.parseEther("0.2");
      await nft.setMintRate(newMintRate);

      expect(await nft.mintRate()).to.equal(newMintRate);
    });

    it("should not allow non-owners to set the mint rate", async function () {
      await expect(
        nft.connect(ethers.provider.getSigner(1)).setMintRate(mintRate)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});



