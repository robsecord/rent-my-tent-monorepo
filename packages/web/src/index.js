import { AppRegistry } from 'react-native';

import { App } from 'components/src/App';

AppRegistry.registerComponent('rentmytent', () => App);

AppRegistry.runApplication('rentmytent', {
  rootTag: document.getElementById('root'),
});
