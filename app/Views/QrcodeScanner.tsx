import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/constants/types';

const { width, height } = Dimensions.get('window');

export default function QRCodeScannerComponent() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<RootStackParamList, 'Messages'>>() // same id used in messages
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef(null)

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
}

  return (
    <ThemedView style={styles.qrCodeWrapper}>
    <View style={styles.header}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Views/ChatList')}><ThemedText>Back</ThemedText></TouchableOpacity>
      </View>
      <ThemedText style={{fontSize: 30, textAlign: 'center'}}>{route?.params?.chatRoom?.name}</ThemedText>
    </View>
    <ThemedView style={styles.qrCodeContainer}>
        <CameraView style={styles.camera} onBarcodeScanned={({data})=>navigation.navigate('Views/Messages',{chatRoom: JSON.parse(data)})}  facing={facing} ref={ref}/>
        <Button title={'Flip Camera'} onPress={toggleCameraFacing}/>
    </ThemedView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        width: '100%',
        // height: 400,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    takePicButton: {
        // position: "absolute",
        // bottom: 50,
        width: '100%',
        gap: 10
    },
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
    }
});