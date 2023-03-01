// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

/**

@title NFT contract

@dev This contract mints and burns NFT tokens with a maximum limit of 100 tokens per address and maximum supply of 1000 tokens.

*/
contract NFT is ERC721A, Ownable {
    // Maximum number of tokens a user can mint in one transaction
    uint256 maxLimitMint = 100;

    // Maximum supply of tokens that can be minted in the contract
    uint256 maxSupply = 1000;

    // Rate at which tokens can be minted
    uint256 public mintRate = 0.1 ether;

    // Base URI for the metadata of the tokens
    string public baseURI =
        "ipfs://bafybeieyetlp2c2vubffzjjap7utuz5jwo2k5b5kupvezfchc5tnfg4fh4/";

    /**

@dev Constructor for the NFT contract.
@notice Sets the name and symbol for the NFT token.
*/
    constructor() ERC721A("Verizons", "VRZS") {}

    /**

@dev Mints tokens to the caller of the function.
@param quantity Number of tokens to mint.
*/
    function mint(uint256 quantity) external payable {
        require(
            quantity + _numberMinted(msg.sender) <= maxLimitMint,
            "Exceeded the limit"
        );
        require(
            totalSupply() + quantity <= maxSupply,
            "Not enough tokens left"
        );
        require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        _safeMint(msg.sender, quantity);
    }

    /**

@dev Burns a specific token.
@param tokenId Token ID to burn.
*/
    function burn(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "TokenId Not Exist");
        _burn(tokenId);
    }

    /**

@dev Withdraws the balance to the owner of the contract.
*/
    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**

@dev Returns the base URI for the metadata of the tokens.
*/
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**

@dev Sets the mint rate for the tokens.
@param _mintRate New mint rate.
*/
    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }
}
