import { View, ViewProps } from 'react-native';

type ComparisonFeatureTableProps = {
  children: React.ReactNode;
} & ViewProps;

export const ComparisonFeatureTable = ({
  children,
  style,
  ...rest
}: ComparisonFeatureTableProps) => {
  return (
    <View style={[style, { flexDirection: 'column' }]} {...rest}>
      {children}
    </View>
  );
};
