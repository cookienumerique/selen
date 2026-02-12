import { Image } from 'expo-image';

export const CapsuleImage = () => {
  return (
    <Image
      contentFit="contain"
      source={require('@/assets/images/capsule.png')}
      style={{
        width: 250,
        height: 100,
      }}
    />
  );
};
