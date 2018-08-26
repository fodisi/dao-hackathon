import SecretEventOrg from '../ethereum/SecretEventOrg';
import { getDefaultEthereumAccount } from '../actions/EthereumAccountAction';

// export const checkIfReferred = (eth_address) => async (dispatch) => {
export async function checkIfReferred() {
    // Gets the member account.
    const userAddress = await getDefaultEthereumAccount();
    let result = await SecretEventOrg.methods.checkIfReferred(userAddress).call();
    console.log(result);
    return result;
};

export async function checkIfMember() {
    // Gets the member account.
    const userAddress = await getDefaultEthereumAccount();
    let result = await SecretEventOrg.methods.checkIfMember(userAddress).call();
    console.log(result);
    return result;
};

// export const referMember = (eth_address, linnia_user_pk) => async (dispatch) => {
export async function referMember(referralAddress) {
    // Gets the member account.
    const memberAccount = await getDefaultEthereumAccount();
    await SecretEventOrg.methods.referFriend(referralAddress).send({ from: memberAccount });
    return true;
};

export async function acceptReferral(linnia_user_pk) {
    const referralAccount = await getDefaultEthereumAccount();
    await SecretEventOrg.methods.applyMembership(linnia_user_pk).send({ from: referralAccount });
    return referralAccount;
};

export async function declineReferral(eth_address) {
    console.log(eth_address);
    return true;
};