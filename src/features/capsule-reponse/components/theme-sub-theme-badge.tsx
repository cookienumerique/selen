import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsule } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule.types';
import { View } from 'react-native';

type ThemeSubThemeBadgeProps = {
    subThemeCapsule: SubThemeCapsule;
}
export const ThemeSubThemeBadge = ({ subThemeCapsule }: ThemeSubThemeBadgeProps) => {
    return (
        <View style={{ borderWidth: 1, borderColor: Colors.gray, backgroundColor: Colors.grayLight, borderRadius: 16, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' }}>
            <Text style={{ color: Colors.gray, fontSize: 10 }}>{`${subThemeCapsule?.themeCapsule?.name} • ${subThemeCapsule?.name}`}</Text>
        </View>
    )
}