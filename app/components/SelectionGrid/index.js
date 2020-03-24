import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';



const SelectionGrid=({
    styles,
    onNumPress,
    numbers,
    loader,
    heighlightedNumber

})=>(
    <View style={styles.chapterSelectionContainer}>
      {loader && 
         <Spinner
         visible={true}
         textContent={'Loading...'}
        //  textStyle={styles.spinnerTextStyle}
      />}
        <FlatList
        numColumns={4}
        data={numbers}
        renderItem={({item,index}) => 
        <TouchableOpacity 
        style={[styles.selectGridNum,
          {backgroundColor:'transparent'}]}
          onPress={()=>{onNumPress(item,index)}}>
            <View>
                <Text style={[styles.chapterNum,{fontWeight: item == heighlightedNumber ? "bold":"normal"}]}>{item}</Text>
            </View>
            </TouchableOpacity>
        }
        // keyExtractor={item}
      />
      </View>
)
export default SelectionGrid;

