const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { infuraProjectId, mnemonic, etherscanApiKey } = require('./secrets.json');

module.exports = {
  networks: {
    /* development: {
		host: "127.0.0.1",     // localhost (default: none)
		port: 7545,            // standard ethereum port (default: none)
		network_id: "*",       // any network (default: none)
		gas: 4600000,
		gasPrice: 20000000000
    }, */
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/${infuraProjectId}')
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    },
	rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/d46c00227bbc4cc4b570df6e837e7aee')
      },
      network_id: 4,
	  gas: 4000000
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11"
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscanApiKey
  }
};
