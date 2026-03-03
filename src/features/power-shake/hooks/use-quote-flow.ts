import { useEffect } from "react";
import { SharedValue, withTiming } from "react-native-reanimated";

/**
 * 🎯 Hook responsable du flow final :
 *
 * Respiration (30s)
 * → disparition respiration
 * → apparition phrase
 * → disparition phrase
 * → fermeture modal
 */

type UseQuoteFlowProps = {
    visible: boolean;                 // Permet de savoir quand lancer le flow
    breathOpacity: SharedValue<number>; // Opacité du bloc respiration
    quoteOpacity: SharedValue<number>;  // Opacité de la phrase
    onClose: () => void;              // Callback fermeture
};

export function useQuoteFlow({
    visible,
    breathOpacity,
    quoteOpacity,
    onClose,
}: UseQuoteFlowProps) {

    /**
     * useEffect :
     * Se déclenche quand "visible" change.
     */
    useEffect(() => {

        // Si la modal n’est pas visible, on ne lance rien
        if (!visible) return;

        /**
         * ⏳ Attente de 30 secondes
         * (durée des 3 cycles de respiration)
         */
        const quoteTimer = setTimeout(() => {

            /**
             * 👁 Fade OUT de la respiration
             * (opacité 1 → 0 en 600ms)
             */
            breathOpacity.value = withTiming(0, { duration: 600 });

            /**
             * 👁 Fade IN de la phrase
             * (opacité 0 → 1 en 800ms)
             */
            quoteOpacity.value = withTiming(1, { duration: 800 });

            /**
             * ⏳ Après 5 secondes d’affichage de la phrase
             */
            const closeTimer = setTimeout(() => {

                /**
                 * 👁 Fade OUT de la phrase
                 */
                quoteOpacity.value = withTiming(0, { duration: 800 });

                /**
                 * ⏳ Après que le fade soit terminé (800ms)
                 * on ferme la modal
                 */
                setTimeout(onClose, 800);

            }, 5000);

            /**
             * Cleanup du timer interne si le composant unmount
             */
            return () => clearTimeout(closeTimer);

        }, 30000);

        /**
         * Cleanup principal :
         * Si visible passe à false
         * ou si le composant se démonte
         */
        return () => clearTimeout(quoteTimer);

    }, [breathOpacity, onClose, quoteOpacity, visible]);
}