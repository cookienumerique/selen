import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { env } from '@/src/config/env';
import { Colors } from '@/src/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';

type ContactUsFormValues = {
  message: string;
};

export const ContactUsScreen = () => {
  const form = useForm<ContactUsFormValues>({
    defaultValues: {
      message: '',
    },
  });

  const handleContactUs = async ({ message }: ContactUsFormValues) => {
    try {
      await MailComposer.composeAsync({
        recipients: [env?.SUPPORT_MAIL],
        subject: "Message depuis l'application SELEN",
        body: message,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <MoonBackground />
      <Header onGoBack={() => router.push('/(tabs)/settings')} />

      <View
        style={{
          gap: 16,
          paddingVertical: 16,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: Colors.oakHoneyDark,
          }}
        >
          Contactez-nous
        </Text>
        <View style={{ gap: 4 }}>
          <Text
            style={{
              color: Colors.oakHoneyDark,
            }}
          >
            Une question, un doute, une idée ?
          </Text>
          <Text
            style={{
              color: Colors.oakHoneyDark,
            }}
          >
            Nous sommes là pour vous lire.
          </Text>
          <Text
            style={{
              color: Colors.oakHoneyDark,
            }}
          >
            N&apos;hésitez pas a nous écrire pour les partager.
          </Text>
        </View>
        <Controller
          control={form.control}
          name="message"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline
              placeholder="Écris ici ton message..."
              value={value}
              onChangeText={onChange}
              numberOfLines={10}
              style={{
                borderRadius: 8,
                borderColor: Colors.oakHoneyDark,
                backgroundColor: 'white',
                padding: 16,
                height: 150,
                textAlignVertical: 'top',
              }}
            />
          )}
        />
        <Button
          style={{ marginTop: 'auto' }}
          onPress={form.handleSubmit(handleContactUs)}
          disabled={!form.formState.isValid}
        >
          <FontAwesome name="send" size={14} color={Colors.oakHoneyDark} />
          <Text
            style={{
              fontSize: 14,
              color: Colors.oakHoneyDark,
            }}
          >
            Envoyer
          </Text>
        </Button>
      </View>
    </Container>
  );
};
