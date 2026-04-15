import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useCreateFeedback } from '@/src/features/feedback/hooks/use-create-feedback';
import { markFeedbackShown, shouldShowFeedback } from '@/src/features/feedback/utils/should-show-feedback';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';

type MoonResponseFeedbackSheetProps = {
    context: 'capsule' | 'journal';
    contextId: number;
};

export const MoonResponseFeedbackSheet = ({ context, contextId }: MoonResponseFeedbackSheetProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [step, setStep] = useState<'rating' | 'comment' | 'done'>('rating');
    const [rating, setRating] = useState<'positive' | 'negative' | null>(null);
    const [comment, setComment] = useState('');
    const { mutateAsync: createFeedback, isPending: isCreatingFeedback } = useCreateFeedback();

    useEffect(() => {
        const checkAndShow = async () => {
            const should = await shouldShowFeedback();
            if (!should) return;

            const timer = setTimeout(async () => {
                bottomSheetRef.current?.expand();
                await markFeedbackShown();
            }, 2500);

            return () => clearTimeout(timer);
        };

        checkAndShow();
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} />,
        []
    );

    const handleRating = async (value: 'positive' | 'negative') => {
        setRating(value);
        if (value === 'positive') {
            await createFeedback({ rating: value, context, contextId });
            setStep('done');
        } else {
            setStep('comment');
        }
    };

    const handleSubmitComment = async () => {
        if (!rating) return;
        await createFeedback({ rating, comment: comment || undefined, context, contextId });
        setStep('done');
    };

    const handleSkip = () => {
        bottomSheetRef.current?.close();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={step === 'comment' ? ['45%'] : ['28%']}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: Colors.warmSand }}
            handleIndicatorStyle={{ backgroundColor: Colors.warmSand }}
        >
            <BottomSheetView style={{ paddingHorizontal: 24, paddingTop: 8, gap: 32 }}>

                {step === 'rating' && (
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text variant="bold" style={{ fontSize: 16, color: Colors.slateRoot }}>
                                🌙  Ce que j&apos;ai dit a résonné en toi ?
                            </Text>
                        </View>
                        <Text variant="bold" style={{ fontSize: 12, color: Colors.oakHoneyDark }}>
                            Dis-moi, ça m&apos;aide à mieux te répondre.
                        </Text>

                        <View style={{ flexDirection: 'row', gap: 12 }}>

                            <TouchableOpacity
                                onPress={() => handleRating('negative')}
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    borderRadius: 14,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: Colors.warmSand,
                                }}
                            >
                                <Text style={{ color: Colors.slateRoot, fontSize: 14 }}>Pas vraiment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleRating('positive')}
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.slateRoot,
                                    borderRadius: 14,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                }}
                            >
                                {rating === 'positive'
                                    ? <ActivityIndicator color="white" size="small" />
                                    : <Text style={{ color: 'white', fontSize: 14 }}>Oui</Text>
                                }
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleSkip} style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: Colors.slateRoot, opacity: 0.4 }}>
                                Passer
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 'comment' && (
                    <>
                        <Text variant="bold" style={{ fontSize: 16, color: Colors.slateRoot }}>
                            🌙  Qu&apos;est-ce qui n&apos;a pas résonné ?
                        </Text>
                        <Text style={{ fontSize: 12, color: Colors.slateRoot, opacity: 0.5 }}>
                            Aide moi à mieux comprendre comment je peux résonner en toi.
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 12,
                                padding: 14,
                                fontSize: 14,
                                color: Colors.slateRoot,
                                minHeight: 80,
                                textAlignVertical: 'top',
                            }}
                            multiline
                            placeholder="Je n'ai pas trouvé que la réponse était adaptée à ce que je vivais…"
                            value={comment}
                            onChangeText={setComment}
                            autoFocus
                        />

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={handleSkip}
                                style={{
                                    flex: 1,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                    borderRadius: 14,
                                    borderWidth: 1,
                                    borderColor: Colors.linenCloud,
                                }}
                            >
                                <Text style={{ fontSize: 14, color: Colors.slateRoot, opacity: 0.5 }}>
                                    Passer
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmitComment}
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.slateRoot,
                                    borderRadius: 14,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                }}
                            >
                                {isCreatingFeedback
                                    ? <ActivityIndicator color="white" size="small" />
                                    : <Text style={{ color: 'white', fontSize: 14 }}>Envoyer</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {step === 'done' && (
                    <View style={{ gap: 32, paddingVertical: 8 }}>
                        <View style={{ flexDirection: 'row', gap: 16 }}>
                            <View style={{ borderWidth: 3, borderColor: Colors.sageMistDark, borderRadius: 100, padding: 4, alignSelf: 'center' }}>
                                <Feather name="check" size={20} color={Colors.sageMistDark} />
                            </View>
                            <Text style={{ flexShrink: 1, fontSize: 14, color: Colors.sageMistDark }}>
                                Merci grâce à ton retour, je pourrais améliorer la qualité de mes réponses.
                            </Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Button
                                onPress={() => bottomSheetRef.current?.close()}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}>
                                    Fermer
                                </Text>
                            </Button>
                        </View>
                    </View>
                )}

            </BottomSheetView>
        </BottomSheet>
    );
};