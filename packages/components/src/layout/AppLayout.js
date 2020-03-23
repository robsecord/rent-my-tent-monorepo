// Frameworks
import React, { useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AppHeader } from '../components/AppHeader';

// Custom Styles
import rootStyles from './styles/root.styles';

// App Components
import Wallet from '../wallets';
import { Helpers } from '../utils/helpers';
import { GLOBALS } from '../utils/globals';

// Contract Data
import { RentMyTent } from '../blockchain/contracts';
import RentMyTentData from '../blockchain/contracts/RentMyTent';

// Transactions Monitor
import Transactions from '../blockchain/transactions';
import TxStreamView from '../components/TxStreamView';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';
import { TransactionContext } from '../stores/transaction.store';


function AppLayout({ children }) {
    const wallet = Wallet.instance();
    const [, rootDispatch] = useContext(RootContext);
    const [, txDispatch] = useContext(TransactionContext);
    const [walletState, walletDispatch] = useContext(WalletContext);
    const { allReady: isWalletReady, networkId } = walletState;

    const siteTitle = 'Rent My Tent';
    const siteLogoUrl = '';

    const correctNetwork = _.parseInt(GLOBALS.CHAIN_ID, 10);
    const correctNetworkName = _.upperFirst(Helpers.getNetworkName(correctNetwork));

    // Prepare Wallet Interface
    useEffect(() => {
        wallet.init({walletDispatch, siteTitle, siteLogoUrl});
    }, [wallet, walletDispatch]);

    // Reconnect to Contracts on network change
    useEffect(() => {
        if (isWalletReady) {
            const web3 = wallet.getWeb3();

            const rentMyTentAddress = _.get(RentMyTentData.networks[networkId], 'address', '');

            RentMyTent.prepare({web3, address: rentMyTentAddress});
            RentMyTent.instance();

            const transactions = Transactions.instance();
            transactions.init({rootDispatch, txDispatch});
            transactions.connectToNetwork({networkId});
            transactions.resumeIncompleteStreams();
        }
    }, [isWalletReady, networkId, wallet]);

    useEffect(() => {
        const isModernWeb3 = !!window.ethereum;
        const isLegacyWeb3 = (typeof window.web3 !== 'undefined');

        if (!isLegacyWeb3 && !isModernWeb3) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'NON_WEB3', message: 'Not a Web3 capable browser'}});
        } else if (_.isUndefined(networkId) || networkId === 0) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'WEB3_DISCONNECTED', message: 'Please connect your Web3 Wallet'}});
        } else if (networkId !== correctNetwork) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'WEB3_WRONG_NETWORK', message: `Wrong Ethereum network, please connect to ${correctNetworkName}.`}});
        } else {
            rootDispatch({type: 'CONNECTION_STATE', payload: {}}); // Web3, Connected, Correct Network
        }
    }, [networkId, rootDispatch]);


    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={rootStyles.scrollView}
            >
              <AppHeader />

              <View style={rootStyles.body}>
                  {children}
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
    );
}

export default AppLayout;
