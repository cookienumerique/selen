import { finishTransaction, getAvailablePurchases } from 'react-native-iap';

export const clearPendingPurchases = async () => {
  try {
    const purchases = await getAvailablePurchases();
    console.log('purchases', purchases);
    for (const purchase of purchases) {
      try {
        await finishTransaction({
          purchase,
          isConsumable: false,
        });
      } catch (err) {
        console.warn('Failed to finish purchase', err);
      }
    }

    console.log('Pending purchases cleared');
  } catch (error) {
    console.warn('Error clearing purchases', error);
  }
};
