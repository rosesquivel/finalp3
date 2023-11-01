import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';


import Home from '../../screens/Home/Home';
/* import PostForm from '../../screens/PostForm/PostForm'; */

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>

        <Tab.Screen name='Home' component={Home} 
            options={{ headerShown: false,
            tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}}/>   
            
        <Tab.Screen name='New Post' component={PostForm}  
            options={{ headerShown: false,
            tabBarIcon: () => <Entypo name="squared-plus" size={24} color="black" />}}/>             
        
        </Tab.Navigator>
    )
}


export default Menu;