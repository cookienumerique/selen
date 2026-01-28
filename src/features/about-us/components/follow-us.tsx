import { Colors } from '@/src/constants/theme';
import SectionTitle from '@/src/features/about-us/components/section-title';
import SocialIcon from '@/src/features/about-us/components/social-icon';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { View } from 'react-native';

function FollowUs() {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <SectionTitle>Suivez-nous</SectionTitle>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <SocialIcon
          appURL="fb://profile/61583036055705"
          url="https://www.facebook.com/profile.php?id=61583036055705"
          icon={<Entypo name="facebook" size={24} color={Colors.slateRoot} />}
        />
        <SocialIcon
          appURL="instagram://user?username=selen_app_officiel"
          url="https://www.instagram.com/selen_app_officiel"
          icon={<Entypo name="instagram" size={24} color={Colors.slateRoot} />}
        />
        <SocialIcon
          url="https://www.tiktok.com/@selen.app.officiel"
          icon={<AntDesign name="tik-tok" size={24} color={Colors.slateRoot} />}
        />
      </View>
    </View>
  );
}

export default FollowUs;
