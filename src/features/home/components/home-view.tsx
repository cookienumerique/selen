import { Container } from '@/src/components/layout/container';
import { Colors } from '@/src/constants/theme';
import HelloGreeting from '@/src/features/auth/components/user-greeting';
import { InnerWeatherCard } from '@/src/features/home/components/inner-weather-card';
import { MonthlyCapsuleBadge } from '@/src/features/home/components/monthly-capsule-badge';
import { SubThemeOfTheMomentFlatList } from '@/src/features/home/components/sub-theme-of-the-moment-flat-list';
import { SurpriseCapsuleCard } from '@/src/features/home/components/surprise-capsule-card';
import { TopSubThemeCapsulesFlatList } from '@/src/features/home/components/top-sub-theme-capsules-flat-list';
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

      <ScrollView contentContainerStyle={{ gap: 32 }}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <InnerWeatherCard />
          <SurpriseCapsuleCard />
        </View>
        <View style={{ gap: 8 }}>
          <TopSubThemeCapsulesFlatList />
          <SubThemeOfTheMomentFlatList />
        </View>
      </ScrollView>
    </Container>
  );
};
