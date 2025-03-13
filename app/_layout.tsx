import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const convex = new ConvexReactClient('https://accurate-nightingale-338.convex.cloud');


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={convex}>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Views/ChatList" options={{ headerShown: false }} />
            <Stack.Screen name="Views/CreateChatRoom" options={{ headerShown: false }} />
            <Stack.Screen name="Views/Messages" options={{ headerShown: false }} />
            <Stack.Screen name="Views/QrcodeGenerator" options={{ headerShown: false }} />
            <Stack.Screen name="Views/QrcodeScanner" options={{ headerShown: false }} />  
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
