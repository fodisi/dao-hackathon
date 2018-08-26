import Web3 from 'web3';
import secretEventOrg from './build/SecretEventOrg.json';

const web3 = new Web3(window.web3.currentProvider);

export const SecretEventOrg = new web3.eth.Contract(JSON.parse(secretEventOrg.interface), "0xe4821dead19b73e1308b9b5c339c2e3760da590d");
