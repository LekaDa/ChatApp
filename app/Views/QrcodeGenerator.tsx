import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/constants/types';
import QRCode from 'react-native-qrcode-svg';


export default function QrcodeGenerator() {
  const navigation = useNavigation<any>()
  const route = useRoute<RouteProp<RootStackParamList, 'Messages'>>() // same id used in messages

  
  return (
    <ThemedView style={styles.qrCodeWrapper}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Views/ChatList')}><ThemedText>Back</ThemedText></TouchableOpacity>
        </View>
        <ThemedText style={{fontSize: 30, textAlign: 'center'}}>{route?.params?.chatRoom?.name}</ThemedText>
      </View>
      <ThemedView style={styles.qrCodeContainer}>
        <QRCode value={`${JSON.stringify(route.params.chatRoom)}`} size={250} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  qrCodeWrapper: {
    height: "100%"
  },
  header:{
    height: 100,
    padding: 10
  },
  qrCodeContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    backgroundColor: 'white'
  }
})