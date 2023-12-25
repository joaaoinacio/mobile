import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function resetRoot(state) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}

export default {
  navigate,
  resetRoot,
};
