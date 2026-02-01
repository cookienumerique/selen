import { Colors } from '@/src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        backgroundColor: Colors.warmSand,
        flex: 1,
        padding: 16,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
