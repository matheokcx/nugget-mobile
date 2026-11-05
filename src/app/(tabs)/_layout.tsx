import AppTabs from '@/components/AppTabs';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

const TabsLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return <AppTabs />;
};

export default TabsLayout;
