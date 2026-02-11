import { Text } from '@/src/components/texts';
import { useUser } from '@/src/contexts/use-user';
import { Image, View } from 'react-native';
export const UserAvatarName = () => {
  const { user } = useUser();

  if (!user) return null;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Image
        source={{
          uri:
            user.picture ??
            `https://api.dicebear.com/7.x/initials/png?seed=${user?.name ?? 'S'}&backgroundColor=2f3e46`,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {user?.name} {user?.firstName}
        </Text>
        <Text style={{ color: 'gray' }}>{user.email}</Text>
      </View>
    </View>
  );
};
