import {createAppContainer,createStackNavigator ,createBottomTabNavigator} from "react-navigation";
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Commentary from '../Navigate/Commentary'


const CommentaryStack = createStackNavigator(
    { screen:Commentary,
        navigationOptions: () => ({
            headerStyle: {
              backgroundColor:"#3F51B5",
            },
            headerTintColor: '#3F51B5',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
             
          })
    },
    {
        navigationOptions: {
            tabBarLabel: 'Commentary',
            tabBarIcon: () => <Icon name="comment-text" size={28} style={{color:'#fff'}}/>,
            

        },
    }
  );
  const ParallelBible = createStackNavigator(
    { screen:Commentary,
        navigationOptions: () => ({
            headerStyle: {
              backgroundColor:"#3F51B5",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
             
          })
    },
    {
        navigationOptions:{
            tabBarLabel: 'Parallel',
        tabBarIcon: () => <Icon name="view-parallel" size={28} style={{color:'#fff'}}/>,
        },
    }
   
  );
  const InfoGraphics = createStackNavigator(
    { screen:Commentary,
        navigationOptions: () => ({
            headerStyle: {
              backgroundColor:"#3F51B5",
            
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
             
          })
    },
    {
        navigationOptions:{
            tabBarLabel: 'InfoGraphics',
            tabBarIcon: () => <Icon name="chart-line" size={28} style={{color:'#fff'}}/>,
        },
    }
  );
export const SplitScreen = createAppContainer(createBottomTabNavigator(
    {
        CommentaryStack,
        ParallelBible,
        InfoGraphics
    },
    {   
        tabBarPosition: 'bottom',
        activeTintColor:'#fff',
        inactiveTintColor:'#D3D3D3',
        swipeEnabled:false,
        tabBarOptions: {
            labelStyle: { fontSize: 10,margin:0,padding:0 },
            showIcon: true,
            showLabel: true,
            activeTintColor: '#fff',
            upperCaseLabel: false,
            style: {
                backgroundColor: '#3F51B5', // Makes Android tab bar white instead of standard blue
            },
            indicatorStyle: {
                backgroundColor: '#fff',
            },
        },
  
    },
))