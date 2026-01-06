const version = "1.0.2";
const versionCode = 3;
const supportMail = "conceptiondigitale.team@gmail.com";
const packageName = "com.cookienumerique.selen";

export default {
  expo: {
    name: "Selen",
    slug: "selen-app-officiel",
    version,
    icon: "./assets/images/icon_selen_512.png",
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
      eas: {
        projectId: "c7c1e457-7b72-4285-89b9-5602bcef6cb8",
      },
    },
  },
};
