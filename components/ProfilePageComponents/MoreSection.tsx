import { DarkColors } from "@/constants/Colors";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import FirstSection from "../MoreSectionComponents/FirstSection";
import FourthSection from "../MoreSectionComponents/FourthSection";
import ThirdSection from "../MoreSectionComponents/ThirdSection";

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
