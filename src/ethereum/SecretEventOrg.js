import Web3 from 'web3';
import secretEventOrg from './build/SecretEventOrg.json';

const web3 = new Web3(window.web3.currentProvider);
const SecretEventOrg = new web3.eth.Contract(JSON.parse(secretEventOrg.interface), "0x6c62e236aa63749682886f49dea4fb72e97cda16");
export default SecretEventOrg;
