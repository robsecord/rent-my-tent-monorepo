import React from 'react';
import { Router } from '@reach/router';

// Common
import { GLOBALS } from './utils/globals';

// Data Store
import RootStore from './stores/root.store';
import WalletStore from './stores/wallet.store';
import TransactionStore from './stores/transaction.store';

// Page Templates
import AppLayout from './layout/AppLayout';
import ViewTents from './pages/ViewTents';
import ListTent from './pages/ListTent';

export function App() {
  return (
      <RootStore>
        <WalletStore>
          <TransactionStore>
            <AppLayout>
              <Router>
                <ViewTents path={GLOBALS.APP_ROOT} />
                <ListTent path={`${GLOBALS.APP_ROOT}/secondary`} />
              </Router>
            </AppLayout>
          </TransactionStore>
        </WalletStore>
      </RootStore>
  );
}
