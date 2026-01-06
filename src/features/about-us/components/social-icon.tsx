import { Linking, TouchableOpacity } from "react-native";

type SocialIconProps = {
  url: string;
  appURL?: string;
  icon: React.ReactNode;
};
const SocialIcon = ({ url, appURL, icon }: SocialIconProps) => {
  const handleOpen = async () => {
    try {
      if (!appURL) {
        await Linking.openURL(url);
        return;
      }
      const canOpen = await Linking.canOpenURL(appURL);
      if (canOpen) {
        await Linking.openURL(appURL);
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOpen}
      style={{
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default SocialIcon;
