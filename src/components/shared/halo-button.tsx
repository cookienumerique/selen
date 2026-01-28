import { View, ViewProps } from 'react-native';

export default function HaloButton({ style, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: '105%',
          top: -20,
          left: -10,
          height: 100,
          borderRadius: 120,
          backgroundColor: 'rgba(255, 255, 0, 0.18)',
          opacity: 0.3,
          shadowColor: 'yellow',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 40,
          elevation: 20,
        },
        style,
      ]}
      {...rest}
    />
  );
}
