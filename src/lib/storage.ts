import { AsyncStorage, createAsyncStorage } from '@react-native-async-storage/async-storage';

/**
 * Use the react-native async storage lib to store auth token (temporary) or saved filters, will need to switch on an encrypted solution soon
 */
export const storage: AsyncStorage = createAsyncStorage('store');
