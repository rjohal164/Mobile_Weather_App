import { Image, StyleSheet } from 'react-native';

// Logo component showing a static image logo
export default function Logo() {
    return (
        <Image
            source={require('../assets/adaptive-icon.png')}
            style={styles.logo}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});
