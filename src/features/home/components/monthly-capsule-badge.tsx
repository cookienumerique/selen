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
    console.log('click');
    router.push('/calendar');
  };
  return (
    <TouchableOpacity
      onPress={handleClickCapsuleMonth}
      style={{
        backgroundColor: Colors.warmSand,
        width: 50,
        height: 50,
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
              bottom: -5,
              right: -5,
              backgroundColor: Colors.oakHoney,
              borderRadius: 50,
              height: 20,
              width: 20,
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
