import { View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';

type PaymentButtonProps = {
    ctaText: string;
};

const PaymentButton = ({ ctaText }: PaymentButtonProps) => {
    const handlePress = async (): Promise<void> => {
        const result = await RevenueCatUI.presentPaywall();

        if (result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED) {
            const customerInfo = await Purchases.getCustomerInfo();

            if (customerInfo.entitlements.active['nugget_premium']) {
                console.log('Accès Premium actif');
            }
        }
    };

    return (
        <View>
            <Button onPress={handlePress}>
                <ButtonText>{ctaText}</ButtonText>
            </Button>
        </View>
    );
};

export default PaymentButton;
