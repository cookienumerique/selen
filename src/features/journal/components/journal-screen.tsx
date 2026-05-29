import { Button } from "@/src/components/button";
import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { AiConsentModal } from "@/src/features/consent/components/ai-consent-modal";
import { useCreateJournalEntry } from "@/src/features/journal/components/hooks/use-create-journal-entry";
import { JournalEntry } from "@/src/features/journal/types/journal-entry.types";
import { ResponseMoon } from "@/src/features/moon/response-moon";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

type JournalFormValues = {
    content: string;
};

export const JournalScreen = () => {
    const [journalEntry, setJournalEntry] = useState<JournalEntry | null>();

    const form = useForm<JournalFormValues>({
        defaultValues: { content: '' },
        mode: 'onChange'
    });

    const { mutateAsync: createJournalEntry, isPending } = useCreateJournalEntry({
        onSuccess: (journalEntry) => {
            setJournalEntry(journalEntry);
            form.reset();
        },
        onError: (error) => {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Une erreur est survenue',
                position: 'bottom',
                autoHide: false,
            });
        },
    });

    const handleSubmit = async ({ content }: JournalFormValues) => {
        await createJournalEntry({ content });
    };

    return (
        <Container>
            <AiConsentModal trigger="first_journal" />
            <Header title="Journal" onPress={() => router.push('/(tabs)/home')} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, padding: 16, gap: 16 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{
                            backgroundColor: Colors.sageMistDark,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 20,
                        }}>
                            <Text style={{ fontSize: 10, color: 'white', letterSpacing: 1 }}>
                                Fonctionnalité bêta
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text variant="bold" style={{ fontSize: 20, color: Colors.slateRoot, lineHeight: 28 }}>
                                Écris ce qui vient.
                            </Text>
                            <Text variant="bold" style={{ fontSize: 20, color: Colors.slateRoot, lineHeight: 28 }}>
                                La lune te répond.
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontSize: 14, color: Colors.slateRoot, lineHeight: 22 }}>
                        À n&apos;importe quel moment de ta journée, cet espace est là pour toi.
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 6,
                    }}>
                        <Feather name="lock" size={11} color={Colors.slateRoot} />
                        <Text style={{ fontSize: 11, color: Colors.slateRoot }}>
                            Personne ne lit ce que tu écris. Seule la lune te répond.
                        </Text>
                    </View>

                    {!journalEntry && (
                        <Controller
                            control={form.control}
                            name="content"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 16,
                                        padding: 20,
                                        minHeight: 200,
                                        fontSize: 15,
                                        color: Colors.slateRoot,
                                        lineHeight: 24,
                                        textAlignVertical: 'top',
                                    }}
                                    multiline
                                    placeholder="Ce soir, je ressens…"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                    )}

                    {journalEntry?.aiResponse && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ResponseMoon response={journalEntry?.aiResponse} variant="dark" />
                        </View>
                    )}

                    {journalEntry && !journalEntry.aiResponse && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View
                                style={{
                                    backgroundColor: Colors.slateRoot,
                                    borderRadius: 16,
                                    paddingHorizontal: 32,
                                    paddingVertical: 32,
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                <Feather name="check-circle" size={28} color={Colors.linenCloud} />
                                <Text
                                    variant="bold"
                                    family="seasons"
                                    style={{ fontSize: 18, color: Colors.linenCloud, textAlign: 'center' }}
                                >
                                    C&apos;est posé.
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: Colors.linenCloud, textAlign: 'center', opacity: 0.85, lineHeight: 20 }}
                                >
                                    Ce que tu viens d&apos;écrire reste ici, rien que pour toi.
                                </Text>
                            </View>
                        </View>
                    )}

                </ScrollView>

                <View style={{ paddingHorizontal: 16 }}>
                    {journalEntry && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Button
                                onPress={() => {
                                    setJournalEntry(null);
                                    form.reset();
                                }}
                            >
                                <Feather name="edit-2" size={14} color="white" />
                                <Text style={{ fontSize: 14, color: 'white' }}>
                                    Écrire à nouveau
                                </Text>
                            </Button>

                            <Button
                                onPress={() => router.push('/(tabs)/home')}
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <Text style={{ fontSize: 13, color: Colors.slateRoot }}>
                                    Fermer
                                </Text>
                            </Button>
                        </View>
                    )}

                    {!journalEntry && (
                        <Button
                            onPress={form.handleSubmit(handleSubmit)}
                            disabled={isPending || !form.formState.isValid}
                        >
                            {isPending ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Feather name="send" size={14} color="white" />
                            )}
                            <Text style={{ fontSize: 14, color: 'white' }}>
                                Envoyer à la lune
                            </Text>
                        </Button>
                    )}

                </View>
                {/* {journalEntry && (
                    <MoonResponseFeedbackSheet
                        context="journal"
                        contextId={journalEntry?.id}
                    />
                )} */}
            </KeyboardAvoidingView>
        </Container>
    );
};