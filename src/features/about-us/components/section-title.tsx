import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';

const SectionTitle = ({ children }: { children: string }) => (
  <Text
    style={{ fontSize: 20, fontWeight: 'bold', color: Colors.oakHoneyDark }}
  >
    {children}
  </Text>
);

export default SectionTitle;
