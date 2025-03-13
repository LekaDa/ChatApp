import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function IntroPage() {

  const navigation = useNavigation()

  return (
    <ThemedView style={styles.introWrapper}>
      <ThemedView style={styles.introWrapper}>
        <Image style={styles.introImage} source={require('../assets/images/chatIcon.png')}/>
        <ThemedText style={{textAlign: 'center', fontSize: 40, lineHeight: 40}}>Welcome to the ChatApp</ThemedText>
        <Button title={'Go to the app'} onPress={()=>navigation.navigate('Views/ChatList')} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  introWrapper:{
    height: '100%',
    justifyContent: 'center',
    alignContent:"center",
    padding: 10,
    gap: 30
  },
  introImage:{
    width: 150,
    height: 150,
    marginInline: "auto"
  }
})