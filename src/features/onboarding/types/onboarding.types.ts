// Valeurs alignées sur l'enum SignupIntent côté API (stockées en anglais, affichées en français).
export type SignupIntent =
  | 'recommended'
  | 'seeking_serenity'
  | 'daily_care'
  | 'difficult_time'
  | 'other'
  | 'skipped';

export type IntentOption = {
  value: SignupIntent;
  label: string;
};

// Options affichées à l'écran "Qu'est-ce qui t'amène ici ?", dans l'ordre validé
// (curieux, quête de sérénité, soin quotidien, moment difficile, autre).
export const INTENT_OPTIONS: IntentOption[] = [
  { value: 'recommended', label: "On m'a parlé de Selen, je viens voir" },
  { value: 'seeking_serenity', label: "Je cherche un peu de sérénité que je ne trouve pas" },
  { value: 'daily_care', label: 'Je veux prendre soin de moi au quotidien' },
  { value: 'difficult_time', label: 'Je traverse un moment difficile' },
  { value: 'other', label: 'Autre' },
];
