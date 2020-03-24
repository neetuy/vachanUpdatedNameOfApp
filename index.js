import React, {Component} from 'react'
import { AppRegistry,AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga'
import { Provider } from "react-redux";
import { persistStore,persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react'

import {createStore,applyMiddleware,combineReducers} from 'redux'
import App from './App'
import rootSaga from './app/store/saga/'
import rootReducer from './app/store/reducer/'
// import updateStylingReducer from './app/store/reducer/updateStylingReducer'
// import UpdateVersionReducer from './app/store/reducer/updateVersionReducer'

const sagaMiddleware = createSagaMiddleware()


const persistConfig = {
    // Root?
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['updateVersion','updateStyling'],
  };

//   const versionPersistConfig = {
//     key: 'updateVersion',
//     storage: AsyncStorage,
//     blacklist: ['parallelContentType', 'parallelContentLanguage', 'parallelContentLanguageCode', 'parallelContentVersion', 'parallelContentVersionCode', 'parallelContentDownloaded']
// };

// const stylingPersistConfig = {
//     key: 'updateStyling',
//     storage: AsyncStorage,
//     blacklist: ['colorFile','sizeFile','verseInLine','fontFamily'],
// };

const reducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(reducer);

// const persistedReducer = persistReducer(persistConfig, combineReducers({
//     updateStyling: persistReducer(stylingPersistConfig, updateStylingReducer),
//     updateVersion: persistReducer(versionPersistConfig, UpdateVersionReducer)
// }));


const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  )

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

class RNRedux extends Component{
    // componentDidMount(){
    //     // await this.setInitialValue()
    //       SplashScreen.hide()
    //     }
    render(){
    return <Provider store={store}>
                <PersistGate 
                    persistor={persistor}
                >
                <App/>   
            </PersistGate >
            </Provider>
    }
}
AppRegistry.registerComponent('VachanOnline', () => RNRedux ) ;
