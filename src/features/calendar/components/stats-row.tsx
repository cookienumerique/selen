import { Card } from '@/src/components/card';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { StatSkeleton } from '@/src/features/calendar/components/stat-skeleton';
import { UseCalendarStatsReturn } from '@/src/features/calendar/hooks/use-calendar-stats';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';

type StatsRowProps = {
  stats: UseCalendarStatsReturn;
  isLoading: boolean;
};
export const StatsRow = ({ stats, isLoading }: StatsRowProps) => {
  const { totalCapsules, maxStreak, formattedRange } = stats;

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
      }}
    >
      <Card style={{ flex: 1 }}>
        {isLoading ? (
          <StatSkeleton />
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FontAwesome5 name="capsules" size={24} color={Colors.capsule} />
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.capsule,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {totalCapsules}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: Colors.gray,
                textAlign: 'center',
              }}
            >
              capsules ouvertes
            </Text>
          </View>
        )}
      </Card>
      <Card style={{ flex: 1 }}>
        {isLoading ? (
          <StatSkeleton />
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FontAwesome5 name="fire" size={20} color={Colors.orange} />
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.orange,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {maxStreak}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: Colors.gray,
                textAlign: 'center',
              }}
            >
              jours consécutifs
            </Text>
          </View>
        )}
      </Card>
      <Card style={{ flex: 1 }}>
        {isLoading ? (
          <StatSkeleton />
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <FontAwesome name="trophy" size={20} color={Colors.gold} />
            <Text
              style={{
                fontSize: 12,
                color: Colors.gray,
                textAlign: 'center',
              }}
            >
              Top semaine
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.gold,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {formattedRange}
            </Text>
          </View>
        )}
      </Card>
    </View>
  );
};
