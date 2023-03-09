## Table of Contents


- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)


## Task Description

Create a Upgradable Smart Contract on Solidity to mint NFT and deploy it on Polygon Testnet Using Hardhat environment.

## Tasks Included

- Create a smart contract on solidity which includes funtionalities like anyone can Mint NFTs.
- For each NFT to be mint there must be a mint fees which the users need to pay. 
- The Admin can also burn the tokens from the total supply.
- Although the Contract is Upgradable so we will use ERC271A upgradable contract and OpenZeppelin upgardable contracts for this project.

## Technologies Included


- Solidity for smart contracts
- Hardhat for deploying contract on testnet Polygon


## Install and Run


To run this project, you must have the following installed:


- nodejs
- npm


Run npm install to install required dependencies.


```
$ npm install
```

## Hardhat Setup And Deploy


Run npm install hardhat to install hardhat.


```
npm install hardhat
```


Run npm install '@nomiclabs/hardhat-etherscan' to install hardhat plugin for verifying contracts on etherscan.


```
npm install '@nomiclabs/hardhat-etherscan'
```


Run npm i @nomiclabs/hardhat-ethers to install plugin which brings Hardhat the Ethereum library ethers.js, which allows to interact with the Ethereum blockchain


```
Run npm i @nomiclabs/hardhat-ethers
```


Run npx hardhat to run the hardhat in application.


```
npx hardhat
```


This project demonstrates an hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.


**Try running the following commands to Deploy the Proxy Contract:
**

Run npx hardhat compile to compile all contracts.


```
npx hardhat compile
```

Now before deploying you can also test the smart contract using your smart contract test cases.

For running the Test cases before deploying, run command:

 ```
 npx hardhat test
 ```
 
 You can also check the Solidity coverage of these contracts test cases by using the command: 
 
 ```
 npx hardhat coverage
 ```


Run npx hardhat run scripts/NFTUpgradableDeployScripts.js --network Mumbai to deploy contracts on network Mumbai.

```
npx hardhat run scripts/NFTUpgradableDeployScripts.js --network Mumbai
```

Once you Deploy the contract the terminal will through an Proxy contract address which is deployed on the Polygon testnet.

You can now verify the contract on the polygon testnet by using the below command.

Run npx hardhat run scripts/verify.js --network Mumbai to verify the deployed contracts on netwrok Polygon.


```
npx hardhat run scripts/verify.js --network Mumbai
```







