import { fetchVersions } from '@/src/api/version/fetch-versions';
import { Version } from '@/src/features/force-update/types/version.types';
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import semver from 'semver';

export const useAppUpdate = () => {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [storeUrl, setStoreUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetchVersions();

        const platform = Platform.OS as 'ios' | 'android';
        const VersionByPlatform: Version = res[platform];

        const currentVersion = DeviceInfo.getVersion();

        if (
          semver.lt(currentVersion, VersionByPlatform.minRequired) &&
          VersionByPlatform.forceUpdate
        ) {
          setNeedsUpdate(true);
          setStoreUrl(VersionByPlatform.storeUrl);
        }
      } catch (err) {
        console.error('Version check failed:', err);
      }
    };

    checkVersion();
  }, []);

  const openStore = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return { needsUpdate, openStore };
};
