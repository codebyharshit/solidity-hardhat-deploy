// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721A, Ownable {
    uint256 maxLimitMint = 100;
    uint256 maxSupply = 1000;
    uint256 public mintRate = 0.1 ether;

    string public baseURI = "ipfs://bafybeieyetlp2c2vubffzjjap7utuz5jwo2k5b5kupvezfchc5tnfg4fh4/";

    constructor() ERC721A("Verizons", "VRZS") {}

    function mint(uint256 quantity) external payable {
        require(quantity + _numberMinted(msg.sender) <= maxLimitMint, "Exceeded the limit");
        require(totalSupply() + quantity <= maxSupply, "Not enough tokens left");
        require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        _safeMint(msg.sender, quantity);
    }

    function burn(uint256 tokenId) external onlyOwner{
        require(_exists(tokenId), "TokenId Not Exist");
        _burn(tokenId);
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }
}