const version = '1.10.0';

// android
const versionCode = 26;
const packageNameAndroid = 'com.cookienumerique.selen';
// Ios
const packageNameIos = 'com.selen.app';
const buildNumberIos = '2';

// API
const selenAPI = 'https://api-selen.cookie-numerique.fr';
// const selenAPI = 'http://192.168.1.25:8083';

export default {
  expo: {
    name: 'Selen',
    slug: 'selen-app-officiel',
    scheme: 'selen',
    version,
    icon: './assets/images/icon_selen_512.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    android: {
      package: packageNameAndroid,
      versionCode,
    },
    ios: {
      bundleIdentifier: packageNameIos,
      supportsTablet: false,
      buildNumber: buildNumberIos,
      googleServicesFile: './GoogleService-Info.plist',
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              'selen',
              'com.googleusercontent.apps.405749262108-n3fmgndc8d6sve5j9nj9tea4vket9omb',
            ],
          },
        ],
        UIBackgroundModes: ['remote-notification'],
      },
    },
    extra: {
      SUPPORT_MAIL: 'conceptiondigitale.team@gmail.com',
      BUILD_ANDROID: versionCode,
      BUILD_IOS: buildNumberIos,
      VERSION: version,
      SELEN_API: selenAPI,
      eas: {
        projectId: 'c7c1e457-7b72-4285-89b9-5602bcef6cb8',
      },
    },
    plugins: [
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme:
            'com.googleusercontent.apps.405749262108-n3fmgndc8d6sve5j9nj9tea4vket9omb',
        },
      ],
    ],
  },
};
