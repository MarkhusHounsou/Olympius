import { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Anton_400Regular } from '@expo-google-fonts/anton';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { AppDemoProvider } from './src/context/AppDemoContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function OlympiusApp() {
  const { theme } = useTheme();
  const navigationTheme = useMemo(() => ({
    dark: true,
    colors: {
      primary: theme.accentPrimary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.track,
      notification: theme.danger,
    },
  }), [theme]);
  return <NavigationContainer theme={navigationTheme}><StatusBar style="light" /><RootNavigator /></NavigationContainer>;
}

export default function App() {
  const [fontsLoaded] = useFonts({ Anton_400Regular });
  if (!fontsLoaded) return null;
  return <SafeAreaProvider><ThemeProvider><AppDemoProvider><OlympiusApp /></AppDemoProvider></ThemeProvider></SafeAreaProvider>;
}
