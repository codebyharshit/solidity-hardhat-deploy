## Table of Contents

- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)

## Task Description
Create a NFT Minting Contract based in ERC721A Contract.

## Tasks Included

- Contract Functions 

- Users can Mint the multiple tokens in a single transaction
- Admin can Mint the Token or even multiple tokens in a single transaction
- Users can Mint upto 100 tokens which is maximum limit of minting in a single transaction.
- The maximum supply of tokens in the contract is 1000 tokens.
- The admin can set a Minting fee which the users need to pay whenever they mint the tokens(for ex- if the mint rate is 1 ETH  and a user wants to mint 10 tokens then the total mint fee they need to pay is 10 ETH).
- Owner can withdraw the mint fee from contract.
- Owner can also burn the tokens using the contract function. 
- Once the owner burns the tokens these tokens will be removed from the total supply.
- Apply NetSpec Commenting in the contract while writing.

- Other Task

- Deploy the contract using hardhat deployment script on Polygon Network.
- Write test cases using chai and mocha (testing libraries) to test the vulnerabilities in the contract. 
- Check the solidity coverage of the test cases passed and how much the contract is covered using these test cases.
- Once Compiled and deployed, verify the smart contract using the hardhat and polygon website API key. 
 
## Technologies Included

- Solidity for Smart contract
- Hardhat for deploying contract on testnet Polygon
- Chai Library for writing contract test cases.

## Install and Run

To run this project, you must have the following installed:
- nodejs
- npm

Run npm install to install required dependencies.

```
$ npm install
```

## Hardhat Setup

Run npm install hardhat to install hardhat.
```
npm install hardhat
```


Run npm install '@nomiclabs/hardhat-etherscan' to install hardhat plugin for verifying contracts on etherscan.

```
npm install '@nomiclabs/hardhat-etherscan'
```


Run npm i @nomiclabs/hardhat-ethers to install plugin which brings Hardhat the Ethereum library ethers.js, which allows to interact with the Ethereum blockchain

Run npm i @nomiclabs/hardhat-ethers


Run npx hardhat to run the hardhat in application.

```
npx hardhat
```


This project demonstrates an hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

Try running some of the following tasks:

Run npx hardhat compile to compile all contracts.

```
npx hardhat compile
```


Run npx hardhat run scripts/NFTContractDeployScript.js --network Mumbai which is Polygon Testnet to deploy contracts on network goerli.

```

npx hardhat run scripts/NFTContractDeployScript.js --network Mumbai
```


Run npx hardhat test which is use to test the contract on the basis of test cases developed.

```
npx hardhat test 
```


Run npx hardhat coverage to check the solidity coverage of the contract.

```
npx hardhat coverage
```


Run npx hardhat run scripts/verify.js --network Mumbai to verify the deployed contracts on network Mumbai.

```
npx hardhat run scripts/verify.js --network Mumbai
```


Smart contract deployed on Polygon testnet: 0xCF1f9137731C21192F808f3cc249aFF60Ac73bDa


