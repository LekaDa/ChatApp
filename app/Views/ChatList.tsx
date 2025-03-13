import { StyleSheet, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useNavigation } from '@react-navigation/native';

export default function ChatList() {
  const navigation = useNavigation<any>()
  const allChatRooms = useQuery(api.chat.getChatRooms)

  function openModalForCreation(){
    navigation.navigate('Views/CreateChatRoom')
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/chatIcon.png')}
          style={styles.chatIcon}
        />
      }>
      <ThemedView style={styles.createRoomWrapper}>
        <Button title='Create chat rooms' onPress={openModalForCreation}/>
      </ThemedView>
      <ThemedView style={styles.chatRoomWrapper}>
        {allChatRooms?.length ? allChatRooms?.map((chatRoom)=>{
          return <TouchableOpacity key={chatRoom['_id']} style={styles.chatRoom} onPress={()=>navigation.navigate('Views/Messages',{chatRoom})}>
            <ThemedView>
              <ThemedText style={{fontSize:22}}>{chatRoom?.name}</ThemedText>
              <ThemedText style={{fontSize:10}}>{chatRoom?._id}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        }) : 
          <ThemedText>No chat rooms created yet!</ThemedText>
        }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  createRoomWrapper:{
    position: "fixed",
    width: '100%',
    paddingInline: 20,
    bottom: 10,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  chatIcon: {
    height: 200,
    width: 200,
    bottom: 20,
    left: 20,
    position: 'absolute',
  },
  chatRoomWrapper:{
    gap: 10
  },
  chatRoom:{
    padding: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  }
});
