// import { Text, View, ScrollView, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import { StackNavigationProp } from "@react-navigation/stack";

// type RootStackParamList = {
// 	TaskList: undefined;
// };

// type NavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	"TaskList"
// >;

// export default function SecondSection() {
// 	const navigation = useNavigation<NavigationProp>();

// 	return (
// 		<>
// 			<View style={{ flex: 1 }}>
// 				<TouchableOpacity
// 					style={{
// 						flex: 1,
// 						flexDirection: "row",
// 						alignItems: "center",
// 						gap: 20,
// 						marginStart: 10,
// 					}}
// 					onPress={() => {
// 						navigation.navigate("TaskList");
// 					}}
// 				>
// 					<Ionicons
// 						name="checkmark-done-outline"
// 						size={35}
// 						color={"#FFFFFF"}
// 						style={{
// 							color: "#fff",
// 							textAlign: "center",
// 							width: 50,
// 						}}
// 					/>

// 					<Text style={{ color: "#fff", fontSize: 16 }}>My Tasks/Progress</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={{
// 						flex: 1,
// 						flexDirection: "row",
// 						alignItems: "center",
// 						marginTop: 20,
// 						gap: 20,
// 						marginStart: 10,
// 					}}
// 					onPress={() => {
// 						console.log("Notifications");
// 					}}
// 				>
// 					<Ionicons
// 						name="bookmark-outline"
// 						size={35}
// 						color={"#FFFFFF"}
// 						style={{
// 							color: "#fff",
// 							textAlign: "center",
// 							width: 50,
// 						}}
// 					/>

// 					<Text style={{ color: "#fff", fontSize: 16 }}>Saved Items</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={{
// 						flex: 1,
// 						flexDirection: "row",
// 						alignItems: "center",
// 						marginTop: 20,
// 						gap: 20,
// 						marginStart: 10,
// 					}}
// 					onPress={() => {
// 						console.log("Settings");
// 					}}
// 				>
// 					<Ionicons
// 						name="medal-outline"
// 						size={35}
// 						color={"#FFFFFF"}
// 						style={{
// 							color: "#fff",
// 							textAlign: "center",
// 							width: 50,
// 						}}
// 					/>

// 					<Text style={{ color: "#fff", fontSize: 16 }}>Achievements</Text>
// 				</TouchableOpacity>
// 			</View>
// 		</>
// 	);
// }
