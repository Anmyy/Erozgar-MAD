import React, { useState, useEffect } from "react";
import { TextInput, View, Button ,StyleSheet, Image } from "react-native";
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {async} from "@firebase/util";


const Login = (props) => {
    
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const onLoginPressed= async()=>{
        const auth = getAuth();
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     alert('User signed in')
        // })
        // .catch((error) => {
        //     alert(error.message);
        // });
        if(email.includes('@') && password){
            try{
                let res= await signInWithEmailAndPassword(auth, email, password)
                alert('User signed in')
                props.navigation.navigate('Main', {email: email})
            }catch(e){
                alert(e.message)
            }
        }else{
            alert('Kindly enter your email and password')
        }
    }
    const onForgetPasswordPressed=async()=>{
        const auth=getAuth();
        if(email.includes('@')){
            try{
                await sendPasswordResetEmail(auth, email)
                alert('Check your email to reset password')
            }catch(e){

            }
        }else{
            alert('')
        }
    }
    const onSignupPressed=()=>{
        props.navigation.navigate('Signup')
    }
    
            
    return(
        <View style={styles.container}>
            <Image style={styles.logo}
                source={require('../../../assets/logoo.png')}
            />
            <View style={{...styles.card, height: '7%'}}>
                <TextInput
                    style={{margin: 10}}
                    placeholder={"Enter email here"}
                    value={email}
                    onChangeText= {(t)=> setEmail(t)}  
                />
            </View>
            <View style={{...styles.card, height: '7%'}}>
            <TextInput
                    style={{margin: 10}}
                    placeholder={'Enter password here'}
                    value={password}  
                    secureTextEntry={true}
                    onChangeText= {(t)=> setPassword(t)}
                    //keyboardType="password"
                     
            />
            </View>
            <Button
                title={"Login"}
                onPress={()=> onLoginPressed()}
            />
            <Button
                title={"Forget Password?"}
                onPress={()=> onForgetPasswordPressed()}
            />
            <Button
                title={"Does not have an account?"}
                onPress={()=> onSignupPressed()}
            />
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center'
    }, card:{
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_BLACK,
        borderRadius: 50,
        margin: 10,
        borderWidth: 0.5
    },logo:{
        height:100, 
        width:150,
        alignSelf: 'center'
    }

})
export default Login
