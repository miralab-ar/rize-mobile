// Build iosUrlScheme from Web Client ID for Google Sign-In (iOS)
// EAS Build does not load .env when reading config — set EXPO_PUBLIC_GOOGLE_CLIENT_ID for production builds.
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
const clientIdPart = webClientId.replace(/\.apps\.googleusercontent\.com$/, '');
// Plugin requires a non-empty iosUrlScheme; use placeholder until .env has a real Web client ID.
const iosUrlScheme =
  webClientId && clientIdPart
    ? `com.googleusercontent.apps.${clientIdPart}`
    : 'com.googleusercontent.apps.placeholder';

module.exports = {
  expo: {
    name: 'Rize',
    slug: 'rize-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'com.miralab.rizemobile',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#2b2b33',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.miralab.rizemobile',
    },
    android: {
      package: 'com.miralab.rizemobile',
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: false,
          data: [
            { scheme: 'com.miralab.rizemobile', pathPrefix: '/' },
            { scheme: 'com.miralab.rizemobile', pathPrefix: '/oauthredirect' },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      adaptiveIcon: {
        backgroundColor: '#2b2b33',
        foregroundImage: './assets/images/android-icon-foreground.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      output: 'single',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      ['expo-dev-client', { launchMode: 'launcher' }],
      'expo-router',
      'expo-apple-authentication',
      ['@react-native-google-signin/google-signin', { iosUrlScheme }],
    ],
    experiments: { typedRoutes: true },
    extra: { router: {} },
  },
};
