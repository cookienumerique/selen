import { Button } from "@/src/components/button";
import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { MoonBackground } from "@/src/components/layout/moon-background";
import HaloButton from "@/src/components/shared/halo-button";
import { Colors } from "@/src/constants/theme";
import { useCapsules } from "@/src/contexts/use-capsules";
import { FontAwesome6 } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UnlockCapsuleFormValues = {
  answer: string;
  date: Date;
};
export default function UnLockCapsule() {
  const {
    capsules,
    saveCapsule,
    capsulesAnswered,
    hasUnlockedCapsuleToday,
    isLoadingCapsules,
  } = useCapsules();

  const capsuleIndex = capsulesAnswered.length;
  const capsuleToUnlock = capsules[capsuleIndex] ?? undefined;
  const form = useForm<UnlockCapsuleFormValues>({
    defaultValues: {
      answer: "",
      date: dayjs().toDate(),
    },
  });

  useEffect(() => {
    if (hasUnlockedCapsuleToday) {
      router.replace("/capsule/capsule-already-unlock-today");
      return;
    }

    if (!capsuleToUnlock) {
      router.replace("/capsule/all-capsules-unlocked");
      return;
    }
  }, [hasUnlockedCapsuleToday, capsuleToUnlock]);

  const handleAnswer = ({ answer, date }: UnlockCapsuleFormValues) => {
    const capsule = {
      ...capsuleToUnlock,
      answer,
      date,
    };
    saveCapsule(capsule);
    router.replace("/capsule/capsule-completion");
  };

  const handleSkipCapsule = () => {
    const capsule = {
      ...capsuleToUnlock,
      answer: "",
      date: null,
    };
    saveCapsule(capsule);
  };

  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16 }}>
        <Header />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 32,
            paddingBottom: 16,
          }}
        >
          {isLoadingCapsules && (
            <View style={{ flex: 1, justifyContent: "center", gap: 16 }}>
              <ActivityIndicator />
              <Text style={{ textAlign: "center" }}>
                Chargement des données...
              </Text>
            </View>
          )}
          {!isLoadingCapsules && (
            <>
              <View style={{ alignItems: "center", marginVertical: 32 }}>
                <Image
                  source={require("@/assets/images/capsule.png")}
                  style={{
                    width: 200,
                    height: 120,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: Colors.slateRoot,
                }}
              >
                {capsuleToUnlock?.content}
              </Text>
              <Controller
                control={form.control}
                name="answer"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Image
                      source={require("@/assets/images/scotch.png")}
                      style={{
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        transform: [{ translateX: -90 }],
                        height: 40,
                        width: 180,
                        resizeMode: "contain",
                        zIndex: 1,
                      }}
                    />
                    <TextInput
                      multiline
                      placeholder="Ne réfléchis pas trop. Écris ce qui vient, même si ce n'est pas clair."
                      value={value}
                      onChangeText={onChange}
                      numberOfLines={10}
                      style={{
                        borderRadius: 16,
                        borderColor: Colors.oakHoneyDark,
                        backgroundColor: "white",
                        paddingVertical: 32,
                        padding: 16,
                        textAlignVertical: "top",
                        height: 150,
                      }}
                    />
                  </View>
                )}
              />

              <View
                style={{ position: "relative", marginTop: "auto", gap: 16 }}
              >
                <HaloButton />
                <Button
                  style={{ marginTop: "auto" }}
                  onPress={form.handleSubmit(handleAnswer)}
                  disabled={!form.formState.isValid}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <Entypo
                      name="pencil"
                      size={16}
                      color={Colors.oakHoneyDark}
                    />
                    <Text style={{ fontSize: 16, color: Colors.oakHoneyDark }}>
                      Je pose mes mots
                    </Text>
                  </View>
                </Button>
                <TouchableOpacity
                  onPress={handleSkipCapsule}
                  style={{ alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <FontAwesome6
                      name="arrow-rotate-right"
                      size={16}
                      color="gray"
                    />
                    <Text style={{ fontSize: 16, color: "gray" }}>
                      Passer cette capsule
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
