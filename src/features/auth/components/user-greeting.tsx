import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';

export default function HelloGreeting() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <Text
      style={{
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.warmSand,
      }}
    >
      Bonjour, {user?.firstName ?? ''}
    </Text>
  );
}
