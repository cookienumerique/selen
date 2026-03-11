import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { ComparisonFeatures } from '@/src/features/subscription/components/comparison-feature.tsx/comparison-features';
import { ConfirmModal } from '@/src/features/subscription/components/confirm-modal';
import { OfferButton } from '@/src/features/subscription/components/offers/offer-button';
import { useSubscriptionIap } from '@/src/features/subscription/hooks/use-subscription-iap';
import {
  SubscriptionAndroidBasePlanIdEnum,
  SubscriptionIosBasePlanIdEnum,
} from '@/src/features/subscription/types/subscription.types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Linking, Platform, View } from 'react-native';

export const OffersTabs = () => {
  const { buy, isLoading } = useSubscriptionIap();

  const monthlyBasePlanId =
    Platform.OS === 'ios'
      ? SubscriptionIosBasePlanIdEnum.SELEN_PREMIUM_MONTHLY_FOUNDER
      : SubscriptionAndroidBasePlanIdEnum.SELEN_PREMIUM_MONTHLY_FOUNDER;

  const yearlyBasePlanId =
    Platform.OS === 'ios'
      ? SubscriptionIosBasePlanIdEnum.SELEN_PREMIUM_YEARLY_FOUNDER
      : SubscriptionAndroidBasePlanIdEnum.SELEN_PREMIUM_YEARLY_FOUNDER;

  const [basePlan, setBasePlan] = useState<
    SubscriptionAndroidBasePlanIdEnum | SubscriptionIosBasePlanIdEnum
  >(monthlyBasePlanId);

  const isMonthlyBasePlan = basePlan === monthlyBasePlanId;
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const priceMonthly = 9.99;
  const priceMonthlyDiscount = 6.99;
  const priceMonthlyPercentageDiscount = Math.ceil(
    100 - (priceMonthlyDiscount / priceMonthly) * 100,
  ).toFixed(0);

  const priceYearly = 89.99;
  const priceYearlyDiscount = 59.99;
  const priceYearlyMonthlyDiscount = priceYearlyDiscount / 12;
  const priceYearlyDailyDiscount = priceYearlyDiscount / 365;

  const handleSubscribe = async () => {
    if (isMonthlyBasePlan) {
      setOpenConfirmationModal(true);
    } else {
      await buy(yearlyBasePlanId);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
        padding: 16,
        borderRadius: 16,
        gap: 16,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <OfferButton
          isActive={isMonthlyBasePlan}
          onPress={() => setBasePlan(monthlyBasePlanId)}
          label="Mensuel"
        />
        <OfferButton
          isActive={!isMonthlyBasePlan}
          onPress={() => setBasePlan(yearlyBasePlanId)}
          label="Annuel"
        />
      </View>

      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'white' }}>
            OFFRE MEMBRE PRIVILÈGE
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 48,
              color: Colors.warmSand,
              textAlign: 'center',
            }}
          >
            {`${isMonthlyBasePlan ? `-${priceMonthlyPercentageDiscount}%` : '6 mois offerts'}`}{' '}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Ionicons name="sparkles" size={24} color="white" />
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>
              Selen infini {`${isMonthlyBasePlan ? 'mensuel' : 'annuel'}`}{' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              textDecorationLine: 'line-through',
              fontSize: 14,
              opacity: 0.9,
            }}
          >
            {isMonthlyBasePlan
              ? `${priceMonthly.toFixed(2)}€ / mois`
              : `${priceYearly.toFixed(2)}€ / an`}
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
            {isMonthlyBasePlan
              ? `${priceMonthlyDiscount.toFixed(2)}€ / mois`
              : `${priceYearlyDiscount.toFixed(2)}€ / an`}
          </Text>
        </View>
        {!isMonthlyBasePlan && (
          <View style={{ gap: 4 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              Soit {priceYearlyMonthlyDiscount.toFixed(2)} € /mois,
              l&apos;équivalent de {priceYearlyDailyDiscount.toFixed(2)} € /
              jour seulement.
            </Text>
          </View>
        )}

        <ComparisonFeatures />

        <View style={{ gap: 16 }}>

          <View style={{ gap: 4 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>
              En souscrivant, vous acceptez nos{' '}
              <Text
                style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL('https://instantselen.fr/politique-de-confidentialite')}
              >
                CGU
              </Text>
              {' '}et notre{' '}
              <Text
                style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL('https://instantselen.fr/politique-de-confidentialite')}
              >
                Politique de confidentialité
              </Text>
            </Text>
            <Text style={{ color: 'white', fontSize: 12 }}>L&apos;abonnement se renouvelle automatiquement
              sauf résiliation 24h avant la fin de la période.
            </Text>
            <Text style={{ color: 'white', fontSize: 12 }}>
              Gérez ou annulez via les Réglages App Store.
            </Text>
          </View>
          <Button
            onPress={handleSubscribe}
            disabled={isLoading}
            style={{ backgroundColor: Colors.warmSand }}
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
              {isMonthlyBasePlan
                ? 'Activer mon accès infini'
                : 'Je profite des 6 mois offerts'}
            </Text>
          </Button>
        </View>
      </View>
      <ConfirmModal
        visible={openConfirmationModal}
        onRequestClose={() => setOpenConfirmationModal(false)}
      />
    </View>
  );
};
