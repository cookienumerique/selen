import { Container } from '@/src/components/layout/container';
import { Colors } from '@/src/constants/theme';
import HelloGreeting from '@/src/features/auth/components/user-greeting';
import { InnerWeatherCard } from '@/src/features/home/components/inner-weather-card';
import { MonthlyCapsuleBadge } from '@/src/features/home/components/monthly-capsule-badge';
import { SubThemeOfTheMomentFlatList } from '@/src/features/home/components/sub-theme-of-the-moment-flat-list';
import { SurpriseCapsuleCard } from '@/src/features/home/components/surprise-capsule-card';
import { TopSubThemeCapsulesFlatList } from '@/src/features/home/components/top-sub-theme-capsules-flat-list';
import { TotalCapsulesOpened } from '@/src/features/home/components/total-capsules-opened';
import React from 'react';
import { ScrollView, View } from 'react-native';
export const HomeView = () => {
  return (
    <Container style={{ backgroundColor: Colors.slateRoot, gap: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <HelloGreeting />
        <MonthlyCapsuleBadge />
      </View>
      <TotalCapsulesOpened />
      <ScrollView
        contentContainerStyle={{ gap: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flex: 4 }}>
            <InnerWeatherCard />
          </View>
          <View style={{ flex: 6 }}>
            <SurpriseCapsuleCard />
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <TopSubThemeCapsulesFlatList />
          <SubThemeOfTheMomentFlatList />
        </View>
      </ScrollView>
    </Container>
  );
};
