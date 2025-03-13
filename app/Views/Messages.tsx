import { Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RouteProp, useRoute, useNavigation, NavigationAction } from '@react-navigation/native';
import { cloneElement, useEffect, useState } from 'react';

interface MessagesRouteParams {
  chatRoom: {
    _id: string,
    name: string,
    _creationTime: string
  }; 
}

type RootStackParamList = {
  Messages: MessagesRouteParams;
};

export default function Messages() {
  const navigation = useNavigation<any>()
  const route = useRoute<RouteProp<RootStackParamList, 'Messages'>>()
  const [messageText, setMessageText] = useState<string>('')

  useEffect(()=>{
    if(!route.params.chatRoom?._id){
      navigation.navigate('Views/ChatList')
    }
  },[route.params.chatRoom])

  return (
    <ThemedView style={styles.messageWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Views/ChatList')}><ThemedText>Back</ThemedText></TouchableOpacity>
        <ThemedText style={{fontSize: 30, textAlign: 'center'}}>{route?.params?.chatRoom?.name}</ThemedText>
      </View>
      <ScrollView style={styles.messageContainer}>
        <View style={styles.message}>
          <Text style={{color: 'white'}}>Name ( timestamp )</Text>
          <Text style={styles.messageBubble}>Message message messageMessage message messageMessage message messageMessage message message</Text>
        </View>
      </ScrollView>
      <View style={styles.messageInputWrapper}>
        <TextInput style={{width: '100%', outline: 'none', color: 'white'}} placeholder='Type something...' value={messageText} onChangeText={(text)=>setMessageText(text)} />
        <View style={styles.sendMessageButton}><Image style={{width: "100%", height: "100%"}} source={require('../../assets/images/sendIcon.png')}/></View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  messageWrapper:{
    height: '100%',
  },
  header:{
    // height: '70',
    backgroundColor: '#0391FD',
    padding: 10,
    gap: 20
  },
  messageContainer:{
    gap: 10,
    padding: 10,
  },
  message:{
    gap: 5 
  },
  messageBubble:{
    padding: 5,
    width: "auto",
    borderWidth: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5
  },
  messageInputWrapper:{
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'gray'
  },
  sendMessageButton:{
    padding: 5,
    backgroundColor: '#0391FD',
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
