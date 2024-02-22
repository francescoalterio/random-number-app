import { Text, View, StyleSheet } from "react-native";

export default function RandomNumber({ number }) {
    return (
        <View>
            <Text style={styles.number}>{number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    number: {
        fontSize: 140,
        color: "#fff",
    }
})