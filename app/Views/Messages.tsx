import { Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RouteProp, useRoute, useNavigation, NavigationAction } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [savedName, setSavedName] = useState<string>('')
  const sendMessage = useMutation(api.chat.sendMessage)
  const messages = useQuery(api.chat.getMessagesByRoom, {
    chat_room_id: route.params.chatRoom?._id,
  });
  
  useEffect(()=>{
    getUserName()
    console.log(name, name)
    if(!route.params.chatRoom?._id){
      navigation.navigate('Views/ChatList')
    }
  },[route.params.chatRoom])
  
  
  async function getUserName() {
    try {
      const userName = await AsyncStorage.getItem("userName");
      if (userName !== null) {
        setSavedName(userName)
        return userName;
      } else {
        console.log("User Name not found.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user name:", error);
      return null;
    }
  }

  function returnDateTime(timeStamp: number){

    let date = new Date(timeStamp);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
  
    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    console.log(formattedDateTime, 'asd')
    return formattedDateTime
  }

  async function sendWrittenMessage(){
    await sendMessage({user: savedName, chat_room_id: route.params.chatRoom?._id, body: messageText})
    setMessageText('')
  }

  return (
    <ThemedView style={styles.messageWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Views/ChatList')}><ThemedText>Back</ThemedText></TouchableOpacity>
        <ThemedText style={{fontSize: 30, textAlign: 'center'}}>{route?.params?.chatRoom?.name}</ThemedText>
      </View>
      <ScrollView style={styles.messageContainer}>
        <View style={{flexDirection: 'column-reverse'}}>
          {messages?.map((messageObject)=>{
              return <View style={styles.message} key={messageObject._id}>
              <Text style={{color: 'white', textAlign: messageObject.user == savedName ? 'right' : 'left'}}>{messageObject.user} ( {returnDateTime(messageObject._creationTime)} )</Text>
              <Text style={{...styles.messageBubble, marginLeft: messageObject.user == savedName ? 'auto' : 0 , backgroundColor: messageObject.user == savedName ? "#71c1fd": "lightgray"}}>{messageObject.body}</Text>
            </View>
          })}
        </View>
      </ScrollView>
      <View style={styles.messageInputWrapper}>
        <TextInput style={{width: '100%', outline: 'none', color: 'white'}} placeholder='Type something...' value={messageText} onChangeText={(text)=>setMessageText(text)} />
        <TouchableOpacity disabled={!messageText} style={styles.sendMessageButton} onPress={sendWrittenMessage}><Image style={{width: "100%", height: "100%"}} source={require('../../assets/images/sendIcon.png')}/></TouchableOpacity>
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
    flexDirection: 'column-reverse',
    padding: 10,
  },
  message:{
    gap: 5 
  },
  messageBubble:{
    padding: 5,
    width: "fit-content",
    borderWidth: 1,
    borderRadius: 5
  },
  messageInputWrapper:{
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#71c1fd'
  },
  sendMessageButton:{
    padding: 5,
    backgroundColor: '#0391FD',
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
