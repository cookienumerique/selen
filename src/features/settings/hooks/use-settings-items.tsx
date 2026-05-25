import { useUser } from '@/src/contexts/use-user';
import { Ionicons } from '@expo/vector-icons';
import MaterialDesignIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

export type SettingsItem = {
  label: string;
  route: string;
  icon: React.ReactNode;
};

export const useSettingsItems = (): SettingsItem[] => {
  const { user } = useUser();

  const items: SettingsItem[] = [];

  if (user) {
    items.push({
      label: 'Mon compte',
      route: '/my-account-user',
      icon: <MaterialDesignIcons name="account" size={24} color="gray" />,
    });
  }

  items.push(
    {
      label: 'Notifications',
      route: '/notification',
      icon: <MaterialDesignIcons name="bell" size={24} color="gray" />,
    },
  );

  if (user) {
    items.push({
      label: 'Confidentialité',
      route: '/privacy',
      icon: <MaterialDesignIcons name="shield-lock" size={24} color="gray" />,
    });
  }

  items.push(
    {
      label: 'À propos de nous',
      route: '/about-us',
      icon: <Ionicons name="people" size={24} color="gray" />,
    },
    {
      label: 'Nous contacter',
      route: '/contact-us',
      icon: (
        <MaterialDesignIcons name="tooltip-question" size={24} color="gray" />
      ),
    },
  );

  return items;
};
