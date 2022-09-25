import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Image, LogBox } from 'react-native';
import { BACKGROUND_COLOR } from '../../../res/drawables';

const Splash = (props) => {

    setTimeout(() => {
        props.navigation.replace('Login')
    },3000)
    
    return(
        <View style= {styles.container} >
            <Image style={styles.logo}
                source={require('../../../assets/logoo.png')}

            />
        </View>
    )
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },
    logo:{
        height:100, 
        width:150
    }
});
export default Splash;