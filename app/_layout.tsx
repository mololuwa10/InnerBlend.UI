import { TransitionPresets } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		// Comic Neue
		"ComicNeue-Regular": require("../assets/fonts/ComicNeue-Regular.ttf"),
		"ComicNeue-Bold": require("../assets/fonts/ComicNeue-Bold.ttf"),
		"ComicNeue-BoldItalic": require("../assets/fonts/ComicNeue-BoldItalic.ttf"),
		"ComicNeue-Italic": require("../assets/fonts/ComicNeue-Italic.ttf"),
		"ComicNeue-Light": require("../assets/fonts/ComicNeue-Light.ttf"),
		"ComicNeue-LightItalic": require("../assets/fonts/ComicNeue-LightItalic.ttf"),

		// Others
		DancingScript: require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
		SpecialElite: require("../assets/fonts/SpecialElite-Regular.ttf"),
		BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
		Pompier: require("../assets/fonts/Pompiere-Regular.ttf"),
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		ImperialScript: require("../assets/fonts/ImperialScript-Regular.ttf"),
		BerkshireSwash: require("../assets/fonts/BerkshireSwash-Regular.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	return (
		<>
			<Stack
				screenOptions={{
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
					gestureDirection: undefined,
				}}
			>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="OnboardingTwo" options={{ headerShown: false }} />
				<Stack.Screen name="OnboardingThree" options={{ headerShown: false }} />
				<Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
				{/* <Stack.Screen name="OnboardingPager" options={{ headerShown: false }} /> */}
				<Stack.Screen name="SignUpScreen" options={{ headerShown: false }} />
				<Stack.Screen name="LogInScreen" options={{ headerShown: false }} />
				<Stack.Screen name="JournalView" options={{ headerShown: false }} />
				<Stack.Screen name="PersonalInfo" options={{ headerShown: false }} />
				<Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="Journal" options={{ headerShown: false }} />
				<Stack.Screen
					name="Journal/JournalView"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Journal/NewEntryScreen"
					options={{ headerShown: false }}
				/>
			</Stack>
			<Toast />
		</>
	);
}
