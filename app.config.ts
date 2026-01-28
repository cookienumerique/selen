const version = '1.4.0';
const versionCode = 9;
const supportMail = 'conceptiondigitale.team@gmail.com';
const packageName = 'com.cookienumerique.selen';
const selenAPI = "https://api-selen.cookie-numerique.fr";
// const selenAPI = 'http://192.168.1.25:8083';
// const selenAPI = 'http://192.168.1.63:8083';

export default {
  expo: {
    name: 'Selen',
    slug: 'selen-app-officiel',
    version,
    icon: './assets/images/icon_selen_512.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    android: {
      package: packageName,
      versionCode,
    },
    ios: {
      bundleIdentifier: packageName,
    },
    extra: {
      SUPPORT_MAIL: supportMail,
      VERSION: version,
      SELEN_API: selenAPI,
      eas: {
        projectId: 'c7c1e457-7b72-4285-89b9-5602bcef6cb8',
      },
    },
  },
};
