import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@typechain/hardhat'


import fs from "fs"

const mnemonic = fs.readFileSync(".secret").toString().trim();



export default <HardhatUserConfig>{
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://bsc-dataseed1.binance.org`,
      accounts: [mnemonic]
    },
    testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [mnemonic]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '',
  },
  solidity: {
    version: '0.5.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        // bytecodeHash: 'none',
      },
    },
  },
  typechain: {
    // outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
}