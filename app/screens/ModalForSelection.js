import React, {Component} from  'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  
} from 'react-native';
//import all the components we needed
 
export default class App extends Component {
  constructor() {
    super();
    //Array of Item to add in Scrollview
    this.items = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten ',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
      'twenty ',
      'twenty-one',
      'twenty-two',
      'twenty-three',
      'twenty-four',
      'twenty-five',
      'twenty-six',
      'twenty-seven',
      'twenty-eight',
      'twenty-nine',
      'thirty',
      'thirty-one',
      'thirty-two',
      'thirty-three',
      'thirty-four',
      'thirty-five',
      'thirty-six',
      'thirty-seven',
      'thirty-eight',
      'thirty-nine',
      'forty',
    ];
    //Blank array to store the location of each item
    this.arr = [];
    this.state = { dynamicIndex: 0 };
  }
  downButtonHandler = () => {
    if (this.arr.length >= this.state.dynamicIndex) {
      // To Scroll to the index 5 element
      this.scrollview_ref.scrollTo({
        x: 0,
        y: this.arr[this.state.dynamicIndex],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };
  render() {
    console.log("array ",this.arr)

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#1e73be',
            padding: 5,
          }}>
          <TextInput
            value={String(this.state.dynamicIndex)}
            numericvalue
            keyboardType={'numeric'}
            onChangeText={dynamicIndex => this.setState({ dynamicIndex })}
            placeholder={'Enter the index to scroll'}
            style={{ flex: 1, backgroundColor: 'white', padding: 10 }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.downButtonHandler}
            style={{ padding: 15, backgroundColor: '#f4801e' }}>
            <Text style={{ color: '#fff' }}>Go to Index</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={ref => {
            this.scrollview_ref = ref;
          }}>
          {/*Loop of JS which is like foreach loop*/}
          {this.items.map((item, key) => (
            //key is the index of the array
            //item is the single item of the array
            <View
              key={key}
              style={styles.item}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                this.arr[key] = layout.y;
              }}>
              <Text style={styles.text}>
                {key}. {item}
              </Text>
              <View style={styles.separator} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
 
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
});