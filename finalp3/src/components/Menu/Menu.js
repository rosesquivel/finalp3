import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Feather, Ionicons, AntDesign } from '@expo/vector-icons'; 

import Profile from '../../screens/Profile/Profile';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm'; 
import SearchResults from '../../screens/SearchResults/SearchResults';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>

        <Tab.Screen name='Home' component={Home} 
            options={{ headerShown: false,
            tabBarIcon: () => <Ionicons name="ios-home-outline" size={24} color="black" />}}/>   
            
        <Tab.Screen name='New Post' component={PostForm}  
            options={{ headerShown: false,
            tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="black" />}}/>         
        <Tab.Screen name='Search' component={SearchResults}  
            options={{ headerShown: false,
            tabBarIcon: () => <AntDesign name="user" size={24} color="black" />}}/>     
        <Tab.Screen name='Profile' component={Profile}  
            options={{ headerShown: false,
            tabBarIcon: () => <AntDesign name="user" size={24} color="black" />}}/>

        </Tab.Navigator>
    )
}


export default Menu;