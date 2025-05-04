import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import Index from ".";
import OnboardingTwo from "./OnboardingTwo";
import OnboardingThree from "./OnboardingThree";
import React, { useRef } from "react";

export default function OnboardingPager() {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const pagerRef = useRef<PagerView>(null);

	return (
		<>
			<PagerView style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
				<Index pagerRef={pagerRef} />
				<OnboardingTwo pagerRef={pagerRef} />
				<OnboardingThree pagerRef={pagerRef} />
			</PagerView>
		</>
	);
}

const styles = StyleSheet.create({
	pagerView: {
		flex: 1,
		backgroundColor: Colors.background,
	},
});
