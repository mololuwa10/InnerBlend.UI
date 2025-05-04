import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import FirstSection from "../MoreSectionComponents/FirstSection";
import ThirdSection from "../MoreSectionComponents/ThirdSection";
import FourthSection from "../MoreSectionComponents/FourthSection";
import { DarkColors } from "@/constants/Colors";

export default function MoreSection() {
	return (
		<>
			<View style={{ flex: 1, backgroundColor: DarkColors.background }}>
				<View style={{ flexDirection: "row", padding: 20 }}>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: "#fff",
							marginStart: 10,
							marginTop: 20,
							marginBottom: 10,
						}}
					>
						Menu
					</Text>
				</View>

				<ScrollView style={{ flex: 1 }}>
					<View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
						<FirstSection />

						{/* Divider */}
						{/* <View
							style={{
								borderBottomColor: "#ccc",
								borderBottomWidth: 1,
								marginVertical: 20,
								width: "100%",
							}}
						/> */}

						{/* <SecondSection /> */}

						{/* Divider */}
						<View
							style={{
								borderBottomColor: "#ccc",
								borderBottomWidth: 1,
								marginVertical: 20,
								width: "100%",
							}}
						/>

						<ThirdSection />

						{/* Divider */}
						<View
							style={{
								borderBottomColor: "#ccc",
								borderBottomWidth: 1,
								marginVertical: 20,
								width: "100%",
							}}
						/>

						<FourthSection />
					</View>
				</ScrollView>
			</View>
		</>
	);
}
