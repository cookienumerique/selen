import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

type ToastErrorProps = {
  text1: string;
  text2: string;
};
export const ToastError = ({
  text1,
  text2 = "Contactez le support si l'erreur persiste",
}: ToastConfigParams<ToastErrorProps>) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 999999,
        elevation: 999999,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          width: '92%',
          borderWidth: 2,
          borderColor: Colors.orange,
          marginTop: 10,
          borderRadius: 16,
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,

          zIndex: 999999,
          elevation: 999999,
        }}
      >
        <View
          style={{
            height: 34,
            width: 34,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.orange,
          }}
        >
          <Entypo name="warning" size={18} color="white" />
        </View>

        {/* Texte */}
        <View style={{ flex: 1 }}>
          {!!text1 && (
            <Text
              style={{
                color: Colors.orange,
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              {text1}
            </Text>
          )}
          {!!text2 && (
            <Text
              style={{
                color: Colors.oakHoneyDark,
                fontSize: 12,
                marginTop: 2,
              }}
              numberOfLines={2}
            >
              {text2}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => Toast.hide()}
          activeOpacity={0.7}
          hitSlop={{
            top: 12,
            bottom: 12,
            left: 12,
            right: 12,
          }}
          style={{
            height: 34,
            width: 34,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.orange,
            padding: 6,
          }}
        >
          <Entypo name="cross" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
