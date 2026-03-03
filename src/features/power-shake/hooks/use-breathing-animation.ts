import { Easing, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

/**
 * 🎯 Hook responsable UNIQUEMENT de l’animation du cercle de respiration.
 *
 * Il expose :
 * - size : valeur animée utilisée pour la largeur/hauteur du cercle
 * - start() : lance les 3 cycles de respiration
 * - reset() : remet la taille initiale
 */
export function useBreathingAnimation() {

    /**
     * 🟢 useSharedValue
     *
     * C’est une valeur animée gérée par Reanimated.
     *
     * IMPORTANT :
     * - Elle vit côté UI thread (pas JS thread)
     * - Elle est ultra fluide
     * - Elle peut être modifiée sans re-render React
     *
     * Ici elle représente la taille du cercle.
     *
     * Valeur initiale = 180
     */
    const size = useSharedValue(180);

    /**
     * 🫁 start()
     *
     * Lance la séquence complète des 3 cycles.
     */
    const start = () => {

        /**
         * 🧩 withSequence
         *
         * Permet d’enchaîner plusieurs animations
         * les unes après les autres automatiquement.
         *
         * Chaque withTiming sera exécuté
         * uniquement quand le précédent est terminé.
         */
        size.value = withSequence(

            /**
             * withTiming
             *
             * Anime size.value vers 280
             * en 4000 millisecondes (4 secondes).
             *
             * C’est l’inspiration.
             */
            withTiming(
                280,
                {
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease)
                }
            ),

            /**
             * Retour vers 180
             * en 6000 millisecondes (6 secondes).
             *
             * C’est l’expiration.
             */
            withTiming(
                180,
                {
                    duration: 6000,
                    easing: Easing.inOut(Easing.ease)
                }
            ),

            // -------- Cycle 2 --------

            withTiming(
                280,
                { duration: 4000, easing: Easing.inOut(Easing.ease) }
            ),
            withTiming(
                180,
                { duration: 6000, easing: Easing.inOut(Easing.ease) }
            ),

            // -------- Cycle 3 --------

            withTiming(
                280,
                { duration: 4000, easing: Easing.inOut(Easing.ease) }
            ),
            withTiming(
                180,
                { duration: 6000, easing: Easing.inOut(Easing.ease) }
            ),
        );
    };

    /**
     * 🔄 reset()
     *
     * Remet immédiatement la taille à 180.
     *
     * Aucune animation ici.
     * C’est instantané.
     */
    const reset = () => {
        size.value = 180;
    };

    /**
     * 📦 On retourne uniquement ce qui est nécessaire.
     *
     * Le composant parent décide comment utiliser size.
     */
    return { size, start, reset };
}