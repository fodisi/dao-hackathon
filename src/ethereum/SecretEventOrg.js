import Web3 from 'web3';
import secretEventOrg from './build/SecretEventOrg.json';

const web3 = new Web3(window.web3.currentProvider);
const SecretEventOrg = new web3.eth.Contract(JSON.parse(secretEventOrg.interface), "0x7b248398ef1497e3832e4a66a8eaa4eba6a8f8d6");
export default SecretEventOrg;
