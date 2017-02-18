import config from '../config';
import configReducer from '../../common/config/reducer';

export default function createInitialState() {
  return {
    config: configReducer(undefined, {})
      .set('appName', config.appName)
      .set('appVersion', config.appVersion)
      .set('sentryUrl', config.sentryUrl),
  };
}
