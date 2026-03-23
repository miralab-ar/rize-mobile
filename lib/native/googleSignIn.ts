import { NativeModules, Platform, TurboModuleRegistry } from 'react-native';
import Constants from 'expo-constants';

/**
 * True when running inside the Expo Go client (used for analytics / UI hints only).
 */
export function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

function hasNativeGoogleSignInModule(): boolean {
  if (Platform.OS === 'web') return false;
  // Expo Go and other hosts that did not link @react-native-google-signin have no native module.
  if (NativeModules.RNGoogleSignin != null) return true;
  try {
    return TurboModuleRegistry.get('RNGoogleSignin') != null;
  } catch {
    return false;
  }
}

/**
 * Returns GoogleSignin only when the native module exists. Never `require` the JS package
 * otherwise — it calls TurboModuleRegistry.getEnforcing and crashes/throws when the module
 * is missing (e.g. Expo Go).
 */
export function getGoogleSignin(): typeof import('@react-native-google-signin/google-signin').GoogleSignin | null {
  if (!hasNativeGoogleSignInModule()) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@react-native-google-signin/google-signin').GoogleSignin;
  } catch {
    return null;
  }
}
