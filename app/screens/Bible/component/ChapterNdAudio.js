import React from 'react';
import { View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Player from '../Navigate/Audio/Player'


const ChapterNdAudio = ({
    styles,
    currentVisibleChapter,navigation
    ,queryBookFromAPI,bookId,status,
    totalChapters,languageCode,versionCode,
    
    })=>(
        <View  style={{justifyContent:(currentVisibleChapter != 1 &&  currentVisibleChapter == currentVisibleChapter != totalChapters) ? 'center' : 'space-around',alignItems:'center'}}>
        {
        currentVisibleChapter == 1 
        ? null :
        <View style={navigation.getParam("visibleParallelView") ? styles.bottomBarParallelPrevView : styles.bottomBarPrevView }>
            <Icon name={'chevron-left'} color="#3F51B5" size={navigation.getParam("visibleParallelView") ? 16 : 32} 
                style={styles.bottomBarChevrontIcon} 
                onPress={()=>queryBookFromAPI(-1)}
                />
        </View>
        }
        {
        status && <View style={styles.bottomBarAudioCenter}><Player 
        languageCode={languageCode} 
        versionCode={versionCode}  
        bookId={bookId}
        chapter={currentVisibleChapter}
        />
        </View>
        }
        {
       currentVisibleChapter == totalChapters
        ? null :
        <View style={navigation.getParam("visibleParallelView") ? styles.bottomBarNextParallelView : styles.bottomBarNextView }>
            <Icon name={'chevron-right'} color="#3F51B5" size={navigation.getParam("visibleParallelView") ? 16 : 32} 
                style={styles.bottomBarChevrontIcon} 
                onPress={()=>queryBookFromAPI(1)}
                />
        </View>
        }
        </View>
)
  


export default ChapterNdAudio