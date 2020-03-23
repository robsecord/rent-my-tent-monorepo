// Frameworks
import * as _ from 'lodash';

// App Components
import Wallet from '../app/wallets';
import RentMyTentData from '../app/blockchain/contracts/RentMyTent';

export const Helpers = {};

Helpers.now = () => {
    return (new Date()).getTime();
};

Helpers.sleep = (delay = 0) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

Helpers.getBlockieOptions = (walletData, opts = {}) => {
    const defaultOptions = {
        size        : 15,
        scale       : 2,
        seed        : walletData.connectedAddress,
        color       : `#${walletData.connectedAddress.slice(2, 8)}`,
        bgcolor     : `#${walletData.connectedAddress.slice(12, 18)}`,
        spotcolor   : `#${walletData.connectedAddress.slice(22, 28)}`,
    };
    return {...defaultOptions, ...opts};
};

Helpers.getNetworkName = (networkId) => {
    switch (_.parseInt(networkId, 10)) {
        case 1:
            return 'mainnet';
        case 3:
            return 'ropsten';
        case 42:
            return 'kovan';
        default:
            return 'development';
    }
};

Helpers.toEther = (str) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return str; }
    return web3.utils.fromWei(str, 'ether');
};

Helpers.toAscii = (str) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return str; }
    return web3.utils.hexToAscii(str);
};

Helpers.toBytes16 = (str) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return str; }
    return web3.utils.utf8ToHex(str);
};

Helpers.keccak = ({type, value}) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return value; }
    return web3.utils.soliditySha3({type, value});
};

Helpers.keccakStr = (str) => {
    return Helpers.keccak({type: 'string', value: str});
};

Helpers.decodeLog = ({eventName, logEntry}) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return null; }
    const eventData = _.find(RentMyTentData.abi, {type: 'event', name: eventName});
    const eventAbi = _.get(eventData, 'inputs', []);
    if (_.isEmpty(eventAbi)) { return false; }
    return web3.eth.abi.decodeLog(eventAbi, logEntry.data, logEntry.topics.slice(1));
};
