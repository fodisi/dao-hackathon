import Web3 from 'web3';
import secretEventOrg from './build/SecretEventOrg.json';

const web3 = new Web3(window.web3.currentProvider);
const SecretEventOrg = new web3.eth.Contract(JSON.parse(secretEventOrg.interface), "0x77fc6f72296e8da95c484bf15ec98490a2b2c3fe");
export default SecretEventOrg;
