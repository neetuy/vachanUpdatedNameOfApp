import {createSwitchNavigator,createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import SelectBook from '../SelectBook/'
import SelectChapter from '../SelectChapter'
import SelectVerse from '../SelectVerse/'


const SelectionTabStack = createMaterialTopTabNavigator(
	{
        Books: {
            screen: SelectBook,
            navigationOptions: {
                tabBarLabel: 'Select Book',
                // tabBarIcon: ({ tintColor }) => <MaterialIcons name='account-circle' size={26} style={{ color: tintColor }} />
              },
        },
        Chapters:{
            screen:SelectChapter,
            navigationOptions: {
                tabBarLabel: 'Select Chapter',
                // tabBarIcon: ({ tintColor }) => <MaterialIcons name='account-circle' size={26} style={{ color: tintColor }} />
              },
        },
        Verses:{
            
            screen:SelectVerse,
            navigationOptions: {
                tabBarLabel: 'Select Verse',
                // tabBarIcon: ({ tintColor }) => <MaterialIcons name='account-circle' size={26} style={{ color: tintColor }} />
              },
        },
       
    },
    {   
        // tabBarPosition: 'bottom',
        // activeTintColor:'#3F51B5',
        inactiveTintColor:'#000',
        swipeEnabled:false,
        tabBarOptions: {
            labelStyle: { fontSize: 16,margin:0,padding:0,color:"#3F51B5" },
            // showIcon: true,
            // showLabel: true,
            // activeTintColor: '#3F51B5',
            // inactiveTintColor:"#fff",
            upperCaseLabel: false,
            style: {
                backgroundColor:"#fff",
                // backgroundColor: '#3F51B5', // Makes Android tab bar white instead of standard blue
                height:36
            },
            indicatorStyle: {
                backgroundColor: '#3F51B5',
            },
        },
      
    }
	
)


const SwitchNavigator = createSwitchNavigator({
    SelectionTabStack: { screen: SelectionTabStack },
  });
  
export const SelectionTab = createAppContainer(SwitchNavigator)