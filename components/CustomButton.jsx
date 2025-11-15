import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

// CustomButton component for reusable buttons
export default function CustomButton({ title, onPress, loading }) {
    return (
        <TouchableOpacity style={[styles.button, loading && {opacity:0.7}]} onPress={onPress} disabled={loading}>
            {loading ? <LoadingSpinner size='small' color='#ffffff'/> : <Text style={styles.buttonText}>{title}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
