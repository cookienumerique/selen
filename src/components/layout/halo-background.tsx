import { Image, ImageProps, View } from 'react-native';

type HaloBackgroundProps = ImageProps;
export const HaloBackground = (props: HaloBackgroundProps) => {
  const { style, ...rest } = props;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
      }}
    >
      <Image
        source={require('@/assets/images/halo.png')}
        style={[
          {
            width: 350,
            height: 350,
            opacity: 0.6,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
};
