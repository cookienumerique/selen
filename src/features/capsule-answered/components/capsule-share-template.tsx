import { Text } from '@/src/components/texts';
import { Colors, Fonts } from '@/src/constants/theme';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import { Image, View } from 'react-native';

type CapsuleShareTemplateProps = {
    capsule: Capsule;
};

export const CapsuleShareTemplate = ({ capsule }: CapsuleShareTemplateProps) => {
    return (
        <View
            style={{
                width: 1080,
                height: 1920,
                backgroundColor: Colors.linenCloud,
                paddingHorizontal: 140,
                paddingVertical: 180,
                justifyContent: 'space-between',
                borderWidth: 1,
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    gap: 40,
                }}
            >
                <Image
                    source={require('@/assets/images/selen-without-background.png')}
                    style={{
                        width: 250,
                        height: 250,
                        borderRadius: 150,
                    }}
                />
                <Text
                    style={{
                        fontSize: 48,
                        color: Colors.oakHoney,
                        letterSpacing: 2,
                    }}
                >
                    CAPSULE DU JOUR
                </Text>
            </View>


            {/* CONTENU PRINCIPAL */}
            <View style={{ gap: 80 }}>
                <Text
                    style={{
                        fontSize: 84,
                        fontFamily: Fonts.seasons,
                        color: Colors.slateRoot,
                        textAlign: 'center',
                        lineHeight: 110,
                    }}
                >
                    {capsule.title}
                </Text>

                <Text
                    style={{
                        fontSize: 56,
                        color: Colors.slateRoot,
                        textAlign: 'center',
                        lineHeight: 84,
                    }}
                >
                    {capsule.content}
                </Text>
            </View>


            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 40,
                        color: Colors.oakHoneyDark,
                        textAlign: 'center',
                    }}
                >
                    Prêt(e) à dompter ton chaos ? Découvre ta capsule du jour sur l&apos;app Selen
                </Text>
                <Text style={{ fontSize: 32, textAlign: 'center', }}>
                    Lien dans la bio @selen_app_officiel
                </Text>
            </View>

        </View>
    );
};