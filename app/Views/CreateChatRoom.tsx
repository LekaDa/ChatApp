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
  const [roomName, setRoomName] = useState<string>('');
  const createChatRoom = useMutation(api.chat.createChatRoom)


  const handleCreateRoom = async () => {
    try {
      await createChatRoom({ name: roomName });
      setRoomName('')
      navigation.navigate('Views/ChatList')
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/chatIcon.png')}
          style={styles.chatIcon}
        />
      }>
      <ThemedView>
        <ThemedView style={styles.formWrapper}>
          <ThemedText style={styles.title}>Create Chat Room</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Room Name (Optional)"
            value={roomName}
            onChangeText={setRoomName}
          />
          <Button title="Create Room" onPress={handleCreateRoom} />
          <Button title="Back" onPress={()=> navigation.goBack()} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  formWrapper:{
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
});
