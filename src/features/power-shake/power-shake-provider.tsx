import { useUser } from "@/src/contexts/use-user";
import DiscoverPowerShakeModal from "@/src/features/power-shake/discover-power-shake-modal";
import { useDiscoverPowerShake } from "@/src/features/power-shake/hooks/use-discover-power-shake";
import { usePowerShakeSensor } from "@/src/features/power-shake/hooks/use-power-shake-sensor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import PowerShakeModal from "./power-shake-modal";
export const DISCOVER_KEY = 'discover_power_shake';

type PowerShakeProviderProps = {
  children: React.ReactNode;
};

export const PowerShakeProvider = ({ children }: PowerShakeProviderProps) => {
  const { user } = useUser();
  const [isVisiblePowerShakeModal, setIsVisiblePowerShakeModal] = useState(false);

  const { visible: discoverVisible, close: closeDiscover } = useDiscoverPowerShake(user);

  usePowerShakeSensor({
    enabled: !isVisiblePowerShakeModal,
    onShake: () => setIsVisiblePowerShakeModal(true),
  });

  const handleDiscoverClose = async () => {
    await AsyncStorage.setItem(DISCOVER_KEY, "true");
    closeDiscover();
  };

  return (
    <>
      {children}
      <PowerShakeModal
        visible={isVisiblePowerShakeModal}
        onClose={() => setIsVisiblePowerShakeModal(false)}
      />
      <DiscoverPowerShakeModal visible={discoverVisible} onClose={handleDiscoverClose} />
    </>
  );
};