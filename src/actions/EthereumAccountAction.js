import web3 from '../utils/web3';

export async function getDefaultEthereumAccount() {
    const addresses = await web3.eth.getAccounts();
    console.log(addresses[0]);
    return addresses[0];
};