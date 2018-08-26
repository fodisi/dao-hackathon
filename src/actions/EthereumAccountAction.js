import Web3 from 'web3';

let web3 = new Web3(window.web3.currentProvider);

export async function getDefaultEthereumAccount() {
    const addresses = await web3.eth.getAccounts();
    console.log(addresses[0]);
    return addresses[0];
};