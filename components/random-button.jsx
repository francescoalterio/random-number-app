import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RandomButton({ onPress, isGenerating }) {
    const buttonStyles = isGenerating ? [styles.button, styles.disabled] : styles.button;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={isGenerating} />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#82c143",
        width: "150%",
        height: 300,
        position: "relative",
        left: 0,
        bottom: -120,
        borderTopLeftRadius: 9999,
        borderTopRightRadius: 9999,
    },
    disabled: {
        backgroundColor: "#c1c1c1"
    }
})