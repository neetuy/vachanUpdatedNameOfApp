

// // import {createStore,combineReducers,applyMiddleware} from 'redux'
// // import createSagaMiddleware from 'redux-saga'
// // import rootReducer from './reducer/'

// // Imports: Dependencies
// import AsyncStorage from '@react-native-community/async-storage';
// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga'

// // Imports: Redux
// import rootReducer from '../store/reducer/'



// const persistConfig = {
//     // Root?
//     key: 'root',
//     storage: AsyncStorage,
//   };

//   const versionPersistConfig = {
//     key: 'updateVersion',
//     storage: storage,
//     blacklist: ['parallelContentType', 'parallelContentLanguage', 'parallelContentLanguageCode', 'parallelContentVersion', 'parallelContentVersionCode', 'parallelContentDownloaded']
// };

// const stylingPersistConfig = {
//     key: 'updateStyling',
//     storage: AsyncStorage,
//     blacklist: ['colorFile','sizeFile','verseInLine','fontFamily'],
// };

// const persistedReducer = persistReducer(persistConfig, combineReducers({
//     updateStyling: persistReducer(stylingPersistConfig, updateStylingReducer),
//     updateVersion: persistReducer(versionPersistConfig, UpdateVersionReducer)
// }));
  


// // Redux: Store
// const sagaMiddleware = createSagaMiddleware()

// const store = createStore(
//     persistedReducer,
//     applyMiddleware(sagaMiddleware)
//   )

// // Middleware: Redux Persist Persister
// let persistor = persistStore(store)

// // const store = createStore(
// //     reducer,
// //     applyMiddleware(sagaMiddleware)
// //   )
// // export default function configureStore(initialState){

// //     const sagaMiddleware = createSagaMiddleware()
// //     return {
// //         ...createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware)),
// //         runSaga: sagaMiddleware.run
// //     }
// // }
// // Exports
// export {
//   store,
//   persistor,
// };
