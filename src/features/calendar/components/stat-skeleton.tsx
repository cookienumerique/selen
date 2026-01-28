import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const StatSkeleton = () => {
  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: 8,
      }}
    >
      <SkeletonPlaceholder speed={1000}>
        <SkeletonPlaceholder.Item height={50} width="100%" />
      </SkeletonPlaceholder>
    </View>
  );
};
