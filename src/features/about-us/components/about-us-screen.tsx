import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Divider } from '@/src/features/about-us/components/divider';
import FollowUs from '@/src/features/about-us/components/follow-us';
import SectionTitle from '@/src/features/about-us/components/section-title';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function AboutUsScreen() {
  const sectionViewStyles = {
    gap: 4,
  };

  const textStyles = {
    fontSize: 16,
    color: 'black',
  };

  return (
    <Container>
      <MoonBackground />
      <Header onGoBack={() => router.push('/(tabs)/settings')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ overflow: 'hidden' }}
        style={{ marginTop: 16 }}
      >
        <View
          style={{
            gap: 32,
          }}
        >
          <View style={{ gap: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              <FontAwesome
                name="quote-left"
                size={14}
                color={Colors.oakHoneyDark}
              />
              <Text style={{ color: Colors.oakHoneyDark, fontStyle: 'italic' }}>
                Un instant de clarté dans un monde qui va trop vite.
              </Text>
              <FontAwesome
                name="quote-right"
                size={14}
                color={Colors.oakHoneyDark}
              />
            </View>
            <View style={sectionViewStyles}>
              <SectionTitle>Pourquoi Selen est née</SectionTitle>
              <Text style={textStyles}>
                Selen est née d&apos;un besoin de calme, de sens, et d&apos;un
                peu de douceur.
                {'\n'}
                C&apos;est un espace pour écouter ton monde intérieur, sans
                pression, sans thérapie longue, juste une capsule pour respirer.
              </Text>
            </View>
            <Divider />
            <View style={sectionViewStyles}>
              <SectionTitle>Comment utiliser Selen</SectionTitle>

              <Text style={textStyles}>
                Chaque jour, tu peux ouvrir une capsule. Un moment avec toi,
                pour toi. {'\n'}
                Aucune pression, juste… être là.
              </Text>
            </View>
            <Divider />
            <View style={sectionViewStyles}>
              <SectionTitle>L&apos;esprit Selen</SectionTitle>
              <Text style={textStyles}>
                Tu n&apos;as rien à prouver. {'\n'}Tu n&apos;as rien à corriger.{' '}
                {'\n'}
                Tu peux avancer doucement, une pensée à la fois.
              </Text>
            </View>
            <Divider />
            <View style={sectionViewStyles}>
              <SectionTitle>Derrière Selen</SectionTitle>
              <Text style={textStyles}>
                Selen est un projet indépendant, créé avec l&apos;envie
                d&apos;offrir un espace calme dans un monde saturé de bruit.
              </Text>
            </View>
            <Divider />
            <Text style={{ color: Colors.oakHoneyDark, textAlign: 'center' }}>
              De nouvelles fonctionnalités seront ajoutées progressivement.
              {'\n'}
              Vos idées comptent: n&apos;hésitez pas a nous écrire pour les
              partager.
              {'\n'}Merci d&apos;être là dès le début. 🌙
            </Text>
            <FollowUs />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
