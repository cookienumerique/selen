import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import {
  useSubscriptionIap,
} from '@/src/features/subscription/hooks/use-subscription-iap';
import { SubscriptionAndroidBasePlanIdEnum, SubscriptionIosBasePlanIdEnum } from '@/src/features/subscription/types/subscription.types';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Modal,
  ModalProps,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

type ConfirmModalProps = ModalProps;

export const ConfirmModal = ({
  onRequestClose,
  ...props
}: ConfirmModalProps) => {
  const { buy, isLoading } = useSubscriptionIap();

  const monthlyBasePlanId = Platform.OS === 'ios' ? SubscriptionIosBasePlanIdEnum.SELEN_PREMIUM_MONTHLY : SubscriptionAndroidBasePlanIdEnum.SELEN_PREMIUM_MONTHLY;
  const yearlyBasePlanId = Platform.OS === 'ios' ? SubscriptionIosBasePlanIdEnum.SELEN_PREMIUM_YEARLY : SubscriptionAndroidBasePlanIdEnum.SELEN_PREMIUM_YEARLY;

  const handleSubscribe = (baseSubscription: SubscriptionAndroidBasePlanIdEnum | SubscriptionIosBasePlanIdEnum) =>
    buy(baseSubscription);

  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      {...props}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '85%',
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: 24,
            alignItems: 'center',
            gap: 16,
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={onRequestClose}
          >
            <Ionicons name="close" size={36} color={Colors.slateRoot} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.slateRoot,
            }}
          >
            Faites le choix de la sérénité
          </Text>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 14 }}>
              L&apos;abonnement annuel à 59,90 € inclut{' '}
              <Text style={{ fontWeight: 'bold' }}>6 mois offerts</Text>. Votre
              mois revient à <Text style={{ fontWeight: 'bold' }}>4,99 €</Text>{' '}
              au lieu de 6,99 €.
            </Text>
            <Text style={{ fontSize: 14 }}>
              Rejoignez le Pass Privilège et libérez votre esprit des
              prélèvements mensuels pour toute l&apos;année.
            </Text>
          </View>

          <Button
            onPress={() => handleSubscribe(yearlyBasePlanId)}
            disabled={isLoading}
            style={{ backgroundColor: Colors.warmSand, width: '100%' }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.slateRoot} />
            ) : (
              <Ionicons name="sparkles" size={18} color={Colors.slateRoot} />
            )}
            <Text
              style={{
                color: Colors.slateRoot,
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Je choisis mes 6 mois offerts
            </Text>
          </Button>

          <TouchableOpacity
            onPress={() => handleSubscribe(monthlyBasePlanId)}
          >
            <Text
              style={{
                fontSize: 12,
                color: Colors.slateRoot,
                textAlign: 'center',
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.slateRoot} />
              ) : (
                <Ionicons name="sparkles" size={18} color={Colors.slateRoot} />
              )}
              Non merci, je préfère le mensuel à 6,99 €
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
