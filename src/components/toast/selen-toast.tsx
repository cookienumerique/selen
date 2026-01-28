import { ToastError } from '@/src/components/toast/toast-error';
import React from 'react';
import { ToastConfigParams } from 'react-native-toast-message';

export const toastConfig = {
  error: (props: ToastConfigParams<any>) => {
    return <ToastError {...props} />;
  },
};
