import { Text } from '@/src/components/texts';
import { useUser } from '@/src/contexts/use-user';
import MaterialDesignIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const LogoutButton = () => {
  const { logout } = useUser();

  return (
    <View style={{ borderRadius: 16, padding: 16, gap: 16 }}>
      <TouchableOpacity
        onPress={() => {
          logout();
          router.push('/home');
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <MaterialDesignIcons name="logout" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Se déconnecter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
