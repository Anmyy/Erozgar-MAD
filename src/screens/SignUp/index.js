import React, { useState, useEffect } from "react";
import { TextInput, View, Button , AsyncStorage, StyleSheet, Image } from "react-native";
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc, addDoc, getFirestore, collection} from "firebase/firestore"
import App from "../../../api/firebase";
import { COLLECTION_USER } from "../../../res/strings";


const Signup = (props) => {
    
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    
    const onSignupPressed=async()=>{
            const auth = getAuth();
            if(email.includes('@') && password){
                try{
                    
                    await addDoc(collection(db, email))
                    let res = await createUserWithEmailAndPassword(auth, email, password)
                    alert('User created successfully')
                    props.navigation.goBack()
                } catch(e){
                    console.log(e) 
                    alert('There is an error')
                }
            }else{
                alert('Kindly enter email and password')
            }
    }
    const onAlreadyAccountPressed=()=>{
        props.navigation.goBack()
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
                title={"Sign Up"}
                onPress={()=> onSignupPressed()}
            />
            <Button
                title={"Already have an account?"}
                onPress={()=> onAlreadyAccountPressed()}
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
export default Signup
