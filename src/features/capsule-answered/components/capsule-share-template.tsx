import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Corner } from '@/src/features/capsule-answered/components/corner';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { Image, View } from 'react-native';

type CapsuleShareTemplateProps = {
    capsuleResponse: CapsuleResponse;
};

export const CapsuleShareTemplate = ({ capsuleResponse }: CapsuleShareTemplateProps) => {
    return (
        <View
            style={{
                width: 1080,
                height: 1920,
                backgroundColor: Colors.slateRoot,
                padding: 90,
                justifyContent: 'space-between',
                gap: 32
            }}
        >
            <View style={{ alignItems: 'center', gap: 40 }}>
                <Image
                    source={require('@/assets/images/icon_selen_512.png')}
                    style={{ width: 300, height: 300, borderRadius: 150 }}
                />
                <Text style={{ fontSize: 48, color: Colors.linenCloud, letterSpacing: 2 }}>
                    CAPSULE DU JOUR
                </Text>
            </View>

            <View
                style={{
                    position: 'relative',
                    backgroundColor: Colors.linenCloud,
                    borderRadius: 32,
                    paddingHorizontal: 80,
                    paddingVertical: 80,
                }}
            >
                <Corner style={{ top: 24, left: 24, transform: [{ rotate: '270deg' }] }} color={Colors.slateRoot} />
                <Corner style={{ top: 24, right: 24, transform: [{ rotate: '0deg' }] }} color={Colors.slateRoot} />
                <Corner style={{ bottom: 24, right: 24, transform: [{ rotate: '90deg' }] }} color={Colors.slateRoot} />
                <Corner style={{ bottom: 24, left: 24, transform: [{ rotate: '180deg' }] }} color={Colors.slateRoot} />

                <View style={{ gap: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                        <View style={{
                            backgroundColor: Colors.sateRootLight,
                            borderRadius: 100,
                            width: 64,
                            height: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 28 }}>🌙</Text>
                        </View>
                        <Text variant="bold" family="seasons" style={{ fontSize: 52, color: Colors.slateRoot }}>
                            La réponse de la lune
                        </Text>
                    </View>
                    <Text style={{ fontSize: 40, color: Colors.slateRoot, textAlign: 'center' }}>
                        &quot;{capsuleResponse?.aiResponse}&quot;
                    </Text>
                </View>
            </View>

            <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 40, color: Colors.linenCloud, textAlign: 'center' }}>
                    Prêt(e) à dompter ton chaos ? Découvre ta capsule du jour sur l&apos;app Selen
                </Text>
                <Text style={{ fontSize: 32, textAlign: 'center', color: Colors.linenCloud }}>
                    Lien dans la bio @selen_app_officiel
                </Text>
            </View>
        </View>
    );
};