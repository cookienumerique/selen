import { selenAPIClient } from '@/src/api/client';
import { Version } from '@/src/features/force-update/types/version.types';

export type FetchVersionsResponse = {
  ios: Version;
  android: Version;
};

export type LoginAppleProps = {
  identityToken: string;
  familyName: string | null | undefined;
  givenName: string | null | undefined;
};

export const fetchVersions = async (): Promise<FetchVersionsResponse> => {
  const response = await selenAPIClient.get('versions');

  return response.data;
};
