import { Text } from '@/src/components/texts';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

type SettingsItemProps = {
  label: string;
  icon: React.ReactNode;
  route: string;
};

export const SettingsItem = ({ label, icon, route }: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={() => router.push(route)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {icon}
          <Text style={{ color: 'gray' }}>{label}</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};
