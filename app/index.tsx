import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function IntroPage() {
  const [name, setName] = useState<string>('')
  const navigation = useNavigation<{navigate: (link: string)=>void}>()

  function continueToApp(){
    AsyncStorage.setItem('userName', name)
    navigation.navigate("Views/ChatList")
  }

  return (
    <ThemedView style={styles.introWrapper}>
      <ThemedView style={styles.introWrapper}>
        <Image style={styles.introImage} source={require('../assets/images/chatIcon.png')}/>
        <ThemedText style={{textAlign: 'center', fontSize: 40, lineHeight: 40}}>Welcome to the ChatApp</ThemedText>
        <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='Your name here...' />
        {name && <Button title={'Go to the app'} onPress={continueToApp} />}
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
  },
  textInput:{
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 10,
    padding: 5,
    outline: 'none'
  }
})