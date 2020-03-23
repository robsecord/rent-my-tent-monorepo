// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: 'gray',
    },
    highlight: {
        fontWeight: '700',
    },
});

// Main Route
const ViewTents = ({ location }) => {
    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;


    // const _getContent = () => {
    //     if (!allReady) {
    //         return (
    //             <Alert
    //                 variant="outlined"
    //                 severity="warning"
    //                 icon={<UseAnimations animationKey="alertTriangle" size={24} />}
    //             >
    //                 You must connect your account in order to Mint Particles!
    //             </Alert>
    //         );
    //     }
    //
    //     return (
    //         <Typography variant={'body1'} component={'p'}>
    //             Address: {connectedAddress}
    //         </Typography>
    //     );
    // };

    return (
        <>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Code sharing using Monorepo</Text>
                <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>packages/components/App.tsx</Text> to change this
                    screen and then come back to see your edits (in the phone or the browser).
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Web support via react-native-web</Text>
                <Text style={styles.sectionDescription}>
                    Run <Text style={styles.highlight}>yarn workspace web start</Text> to
                    open this app in the browser.
                </Text>
                <Text style={styles.sectionDescription}>
                    It will share the same code from mobile, unless you create platform-specific files
                    using the <Text style={styles.highlight}>.web.tsx</Text> extension
                    (also supports <Text style={styles.highlight}>.android</Text>,{' '}
                    <Text style={styles.highlight}>.ios</Text>,{' '}
                    <Text style={styles.highlight}>.native</Text>, etc).
                </Text>
            </View>
        </>
    )
};

export default ViewTents;
