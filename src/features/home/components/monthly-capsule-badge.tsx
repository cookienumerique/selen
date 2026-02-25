import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

export const MonthlyCapsuleBadge = () => {
  const { data, isLoading } = useFetchCapsulesResponse();
  const nbCapsulesMonth = data?.filter((capsule) => {
    const monthCapsule = dayjs(capsule.createdAt).month();
    const monthCurrent = new Date().getMonth();
    return monthCapsule === monthCurrent;
  }).length;

  const handleClickCapsuleMonth = () => {
    router.push('/calendar');
  };
  return (
    <TouchableOpacity
      onPress={handleClickCapsuleMonth}
      style={{
        backgroundColor: Colors.warmSand,
        minWidth: 50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.oakHoney,
      }}
    >
      {isLoading && <ActivityIndicator size="small" color={Colors.oakHoney} />}
      {!isLoading && (
        <>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome name="trophy" size={24} color={Colors.oakHoney} />
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              backgroundColor: Colors.oakHoney,
              borderRadius: 999,
              minWidth: 22,
              paddingHorizontal: 6,
              paddingVertical: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: Colors.warmSand,
              }}
            >
              {nbCapsulesMonth}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
