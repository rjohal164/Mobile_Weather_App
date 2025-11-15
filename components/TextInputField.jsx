import { TextInput, StyleSheet } from 'react-native';

// TextInputField component for reusable text inputs
export default function TextInputField({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#f1f1f1',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        fontSize: 16,
    },
});
