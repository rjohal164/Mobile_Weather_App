import { View, ActivityIndicator, StyleSheet } from 'react-native';

// LoadingSpinner component to show a spinner
export default function LoadingSpinner({size, color="#3498db"}) {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
