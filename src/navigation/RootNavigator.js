import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PassScreen } from '../screens/PassScreen';
import { ChallengesScreen } from '../screens/ChallengesScreen';
import { ChallengeDetailScreen } from '../screens/ChallengeDetailScreen';
import { RecordingScreen } from '../screens/RecordingScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { RankingScreen } from '../screens/RankingScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { RulesScreen } from '../screens/RulesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ title: 'Défis' }} />
      <Tab.Screen name="Ranking" component={RankingScreen} options={{ title: 'Classement' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="App" component={MainTabs} />
      <Stack.Screen name="Pass" component={PassScreen} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
      <Stack.Screen name="Recording" component={RecordingScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Rules" component={RulesScreen} />
    </Stack.Navigator>
  );
}
