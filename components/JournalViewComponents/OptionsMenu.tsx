import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../../constants/Colors";

interface OptionsMenuProps {
	position: { x: number; y: number };
	onClose: () => void;
	onSelect: (option: string) => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
	position,
	onClose,
	onSelect,
}) => {
	const options = ["Move", "Delete"];

	return (
		<Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
			<View
				style={[
					styles.optionsContainer,
					{ top: position.y, left: position.x - 160 },
				]}
			>
				{options.map((option) => (
					<TouchableOpacity
						key={option}
						style={styles.option}
						onPress={() => onSelect(option)}
					>
						<Text style={styles.optionText}>{option}</Text>
					</TouchableOpacity>
				))}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	optionsContainer: {
		backgroundColor: "#333",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: 200,
		position: "absolute",
	},
	option: {
		paddingVertical: 10,
	},
	optionText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 16,
	},
});

export default OptionsMenu;
