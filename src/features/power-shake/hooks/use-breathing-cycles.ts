import { useEffect, useState } from 'react';

/**
 * 🎯 Hook responsable UNIQUEMENT du compteur de cycles.
 *
 * Il retourne :
 * - cycle : nombre de respirations restantes
 *
 * Il dépend uniquement de :
 * - visible (pour savoir quand démarrer)
 */
export function useBreathingCycles(visible: boolean) {
  /**
   * Nombre total de cycles prévus.
   * Ici 3 cycles de 10 secondes chacun.
   */
  const totalCycles = 3;

  /**
   * useState React classique.
   *
   * cycle représente :
   * - 3 au début
   * - puis 2
   * - puis 1
   */
  const [cycle, setCycle] = useState(totalCycles);

  /**
   * useEffect :
   * Se déclenche quand "visible" change.
   *
   * Il sert à démarrer / arrêter le compteur.
   */
  useEffect(() => {
    /**
     * Si la modal n’est pas visible,
     * on ne lance rien.
     */
    if (!visible) return;

    /**
     * Reset du compteur à l’ouverture.
     */
    setCycle(totalCycles);

    /**
     * setInterval :
     * Exécute une fonction toutes les 10 secondes.
     *
     * Pourquoi 10 ?
     * Parce qu’un cycle complet = 4s inspiration + 6s expiration = 10s.
     */
    const interval = setInterval(() => {
      /**
       * setCycle avec fonction callback.
       *
       * prev = valeur précédente.
       */
      setCycle((prev) => {
        /**
         * Si on est déjà à 1,
         * on reste à 1.
         *
         * (On évite d’aller à 0 ou négatif)
         */
        if (prev <= 1) return 1;

        /**
         * Sinon on décrémente.
         */
        return prev - 1;
      });
    }, 10000);

    /**
     * Cleanup :
     * Quand la modal se ferme ou que visible change,
     * on arrête l’interval.
     *
     * IMPORTANT :
     * évite les memory leaks.
     */
    return () => clearInterval(interval);
  }, [totalCycles, visible]);

  /**
   * On retourne simplement la valeur.
   */
  return cycle;
}
