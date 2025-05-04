import { TransitionPresets } from "@react-navigation/stack";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
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
				<Stack.Screen name="OnboardingPager" options={{ headerShown: false }} />
				<Stack.Screen name="SignUpScreen" options={{ headerShown: false }} />
				<Stack.Screen name="LogInScreen" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<Toast />
		</>
	);
}
