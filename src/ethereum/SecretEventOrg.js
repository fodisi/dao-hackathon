import Web3 from 'web3';
import secretEventOrg from './build/SecretEventOrg.json';

const web3 = new Web3(window.web3.currentProvider);

const SecretEventOrg = new web3.eth.Contract(JSON.parse(secretEventOrg.interface), "0x889Ad86BE3EBE80D54936539E0D75917F09d1390");
export default SecretEventOrg;
