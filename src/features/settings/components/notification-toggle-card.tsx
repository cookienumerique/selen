import { Card } from "@/src/components/card";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { NotificationFormValues } from "@/src/features/settings/hooks/use-notification-form";
import { Control, Controller } from "react-hook-form";
import { Switch, View } from "react-native";

type NotificationToggleCardProps = {
    control: Control<NotificationFormValues>;
}
export const NotificationToggleCard = ({ control }: NotificationToggleCardProps) => {

    return (
        <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.oakHoneyDark }}>
                        Rappel quotidien
                    </Text>
                    <Text style={{ fontSize: 12, color: Colors.slateRoot, marginTop: 4 }}>
                        Un rappel doux pour t&apos;inviter à ouvrir ta capsule du jour.
                    </Text>
                </View>
                <Controller
                    control={control}
                    name="isSubscribed"
                    render={({ field }) => (
                        <Switch
                            value={field.value}
                            onValueChange={field.onChange}
                            trackColor={{ false: Colors.slateRoot, true: Colors.oakHoneyDark }}
                            thumbColor="white"
                        />)}
                />
            </View>
        </Card>
    );
};