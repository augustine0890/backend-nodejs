const Web3 = require("web3");
const config = require('./config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereum))
const address = '0x9ad022b69B98D236B309B1707Bc58EE4e7Fc6731';

const getBalanceEth = async (address) => {
  try {
    const eth = await web3.eth.getBalance(address);
    console.log(web3.utils.fromWei(eth, "ether") + " ETH")
  } catch (err) {
    console.error(err)
  }
}

getBalanceEth(address);