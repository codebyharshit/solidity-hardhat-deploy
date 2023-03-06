// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// OpenZeppelin and ERC721A libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import 'erc721a-upgradeable/contracts/ERC721AUpgradeable.sol';

/**
@title NFT  Upgradable contract
@dev This contract mints and burns NFT tokens with a maximum limit of 100 tokens per address and maximum supply of 1000 tokens. 
*/
contract NFTUpgradable is Initializable, UUPSUpgradeable, OwnableUpgradeable, ERC721AUpgradeable{

    // Maximum number of tokens that can be minted per transaction
    uint256 maxLimitMint;
    // Maximum number of tokens that can be minted in total
    uint256 maxSupply;
    // Rate at which tokens can be minted (in ether)
    uint256 public mintRate;
    // Base URI for token metadata
    string public baseURI;

    /**
    @dev Initializer for the NFT contract.
    @notice Sets the name, symbol, maxLimit, maxSupply, mintRate, baseURI for the NFT token.
    */
    function initialize() initializerERC721A initializer public {
        
        // Set the maximum number of tokens that can be minted per transaction to 10
        maxLimitMint = 10;
        // Set the maximum number of tokens that can be minted in total to 100
        maxSupply = 100;
        // Set the rate at which tokens can be minted to 0.1 ether
        mintRate = 0.1 ether;
        // Set the base URI for token metadata to an IPFS hash
        baseURI = "ipfs://bafybeieyetlp2c2vubffzjjap7utuz5jwo2k5b5kupvezfchc5tnfg4fh4/";

        // Initialize the contract as an ERC721A token with the name "Verizons" and the symbol "VRZS"
        __ERC721A_init('Verizons', 'VRZS');
        // Make the contract Ownable
        __Ownable_init();

    }

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /**
    @dev Mints tokens to the caller of the function.
    @param quantity Number of tokens to mint.
    */
    function mint(uint256 quantity) external payable {
        // Ensure that the number of tokens to be minted does not exceed the maximum allowed per transaction
        require(
            quantity + _numberMinted(msg.sender) <= maxLimitMint,
            "Exceeded the limit"
        );
        // Ensure that the total number of tokens to be minted does not exceed the maximum allowed
        require(
            totalSupply() + quantity <= maxSupply,
            "Not enough tokens left"
        );
        // Ensure that the amount of ether sent is sufficient to mint the desired number of tokens
        require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        // Mint the desired number of tokens and transfer them to the sender
        _safeMint(msg.sender, quantity);
    }

    /**
    @dev Burns a specific token.
    @param tokenId Token ID to burn.
    */
    function burn(uint256 tokenId) external onlyOwner {
        // Ensure that the token to be burned exists
        require(_exists(tokenId), "TokenId Not Exist");
        // Burn the token
        _burn(tokenId);
    }

    /**
    @dev Withdraws the balance to the owner of the contract.
    */    
    function withdraw() external payable onlyOwner {
    // Transfer the ether balance to the contract owner
    payable(owner()).transfer(address(this).balance);
    }

    /**
    @dev Returns the base URI for the metadata of the tokens.
    */
    function _baseURI() internal view override returns (string memory){
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