// export const checkIfReferred = (eth_address) => async (dispatch) => {
export async function checkIfReferred(eth_address) {
    console.log(eth_address);
    return true;
};

// export const referMember = (eth_address, linnia_user_pk) => async (dispatch) => {
export async function referMember(eth_address, linnia_user_pk) {
    console.log(eth_address);
    console.log(linnia_user_pk);
    return true;
};

export async function acceptReferral(eth_address) {
    console.log(eth_address);
    return true;
};

export async function declineReferral(eth_address) {
    console.log(eth_address);
    return true;
};