import { Platform, View, Text } from 'react-native';

const HomePage = () => {
    return (
        <View
            style={{
                maxWidth: 800,
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                paddingHorizontal: 24,
                paddingVertical: (Platform.select({ ios: 50, android: 80 }) ?? 0) + 16,
            }}
        >
            <Text>izdidzqv</Text>
        </View>
    );
};

export default HomePage;
