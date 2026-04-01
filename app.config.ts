const version = '1.23.0';

// android
const versionCode = 42;
const packageNameAndroid = 'com.cookienumerique.selen';

// Ios
const packageNameIos = 'com.selen.app';
const buildNumberIos = '13';

// API
const selenAPI = 'https://api.instantselen.fr';
// const selenAPI = 'http://192.168.1.25:8083'; // ipconfig getifaddr en0

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
      intentFilters: [
        {
          action: "android.intent.action.VIEW",
          data: [{ scheme: "instagram-stories" }, { scheme: "facebook-stories" }]
        }
      ],
      queries: [
        {
          package: "com.instagram.android"
        },
        {
          package: "com.facebook.katana"
        }
      ]
    },
    ios: {
      bundleIdentifier: packageNameIos,
      supportsTablet: false,
      buildNumber: buildNumberIos,
      googleServicesFile: './GoogleService-Info.plist',
      infoPlist: {
        "NSPhotoLibraryUsageDescription": "Selen utilise votre photothèque pour partager votre réponse de la lune sur les réseaux sociaux.",
        "NSPhotoLibraryAddUsageDescription": "Selen sauvegarde votre réponse de la lune dans votre photothèque.",
        "FacebookAppID": "1445836246903878",
        "FacebookDisplayName": "Selen",
        "LSApplicationQueriesSchemes": [
          "instagram",
          "instagram-stories",
          "facebook",
          "facebook-stories",
          "fb"
        ],
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
