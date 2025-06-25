import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { DarkColors } from "../../constants/Colors";
import { JournalEntry } from "../../lib/apiGetActions";
import EntryCard from "./EntryCards";

interface SwipeableCardProps {
	entry: JournalEntry;
	index: number;
	onPress: () => void;
	onDelete: () => void;
	onMove: () => void;
}

const ACTION_WIDTH = 160;

const SwipeableCard: React.FC<SwipeableCardProps> = ({
	entry,
	index,
	onPress,
	onDelete,
	onMove,
}) => {
	const translateX = useSharedValue(0);
	const isSwiping = useSharedValue(false);

	const panGesture = Gesture.Pan()
		.onBegin(() => {
			isSwiping.value = true;
		})
		.onUpdate((event) => {
			if (event.translationX < 0) {
				translateX.value = event.translationX;
			}
		})
		.onEnd((event) => {
			if (event.translationX < -ACTION_WIDTH / 2) {
				translateX.value = withSpring(-ACTION_WIDTH);
			} else {
				translateX.value = withSpring(0);
			}
			isSwiping.value = false;
		})
		.onFinalize(() => {
			if (!isSwiping.value && Math.abs(translateX.value) < ACTION_WIDTH / 2) {
				translateX.value = withSpring(0);
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const animatedActionsStyle = useAnimatedStyle(() => ({
		width: -translateX.value,
		opacity: translateX.value < -20 ? 1 : 0,
	}));

	return (
		<GestureHandlerRootView>
			<View style={styles.container}>
				{/* Actions behind the card */}
				<Animated.View style={[styles.actionsContainer, animatedActionsStyle]}>
					<TouchableOpacity
						style={[styles.actionButton, styles.moveButton]}
						onPress={onMove}
					>
						<Text style={styles.actionText}>Move</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.actionButton, styles.deleteButton]}
						onPress={onDelete}
					>
						<Text style={styles.actionText}>Delete</Text>
					</TouchableOpacity>
				</Animated.View>

				{/* The actual card */}
				<GestureDetector gesture={panGesture}>
					<Animated.View style={animatedStyle}>
						<EntryCard entry={entry} index={index} onPress={onPress} />
					</Animated.View>
				</GestureDetector>
			</View>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		marginBottom: 16,
		overflow: "hidden",
	},
	actionsContainer: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		flexDirection: "row",
		paddingBottom: 15,
		borderRadius: 40,
	},
	actionButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 80,
	},
	moveButton: {
		backgroundColor: "#57B9FF",
	},
	deleteButton: {
		backgroundColor: "#FF0000",
	},
	actionText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		fontSize: 14,
	},
});

export default SwipeableCard;
