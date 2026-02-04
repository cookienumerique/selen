import { Colors } from '@/src/constants/theme';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
export const Container = ({ children, style }: ContainerProps) => {
  return (
    <SafeAreaView
      style={[
        {
          flexDirection: 'column',
          backgroundColor: Colors.warmSand,
          flex: 1,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};
