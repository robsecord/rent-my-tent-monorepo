// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';


// List-Tent Route
const ListTent = ({ location }) => {
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
    //             todo..
    //         </Typography>
    //     );
    // };

    return (
        <>
            <p>todo..</p>
        </>
    )
};

export default ListTent;
