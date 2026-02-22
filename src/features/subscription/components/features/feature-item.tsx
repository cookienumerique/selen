import { View } from 'react-native';
type FeatureItemProps = {
  children: React.ReactNode;
};

export const FeatureItem = ({ children }: FeatureItemProps) => {
  return <View style={{ gap: 4 }}>{children}</View>;
};
