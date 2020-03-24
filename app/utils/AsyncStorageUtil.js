import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageUtil {

    static async getAllItems (paramKeys) {
        try {
            const val = await AsyncStorage.multiGet(paramKeys);
            return val;
        }
        catch(error) {
            return null;
        }
    }
    static async setAllItems (keyValuePairs){
        
        try {
            AsyncStorage.multiSet(keyValuePairs);
          } catch (error) {
            console.error('AsyncStorage error: ' + error);
          }
    }
    
    static async getItem(key, defaultValue) {
        try {
            const res = await AsyncStorage.getItem(key);
            if (res !== null){
                return (JSON.parse(res));
            } else {
                return defaultValue;
            }
        } catch (error) {
            return defaultValue;
		}
    }

    static setItem(key, value){
		try {
            AsyncStorage.setItem(key, typeof value == "string" ? value : value.toString());
        } catch (error) {
            console.error('AsyncStorage error: ' + error);
        }
    }

    static removeItem(key){
		try {
            AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('AsyncStorage error: ' + error);
        }
    }

}