import React, { useState, useEffect } from "react";
import { TextInput, View, Button ,StyleSheet} from "react-native";
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdMobBanner} from 'expo-ads-admob';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import App from "../../../api/firebase";
import { getAuth } from "firebase/auth";

const CreateNote = (props) => {
    const db=getFirestore(App);
    const auth=getAuth();
    const {email, title:noteTitle , description: noteDescription}=props.route.params

    const [title, setTitle]= useState(noteTitle)
    const [description, setDescription]= useState(noteDescription)

    useEffect(()=>{
    }, [])

    // const loadData = async () =>{
        
    //     if (noteTitle){
    //         let description= await AsyncStorage.getItem(noteTitle)
    //         setTitle(noteTitle)
    //         setDescription(description)
    //     }
    // }

    const onAddPressed=async() => {
        if(title != '' && description != ''){
            try{
                //it creates a random doc id
                const docRef = await setDoc(doc(db, email, title), {
                    title: title,
                    description: description,
                  });
                //   console.log("Document written with ID: ", docRef.id);

                // await setDoc(doc(db, "Notes", title), {
                //     description
                //   });

                // let value= await AsyncStorage.getItem(title)
                // if(value &&  noteTitle){
                //     alert('Title already exists')
                // }else{
                //     await AsyncStorage.setItem(title, description)
                //     //setTitle('')
                //     //setDescription('')
                        alert('Note saved')
                        props.navigation.goBack()
                // }
            }catch(e){
                console.log(e)
            }
            
        }else{
            alert("Kindly add title and description")
        }
    }
    return(
        <View style={styles.container}>
            <View style={{...styles.card, height: '8%'}}>
                <TextInput
                    style={{margin: 5}}
                    placeholder={"Enter title here"}
                    multiline= {true}
                    value={title}
                    editable={noteTitle?false:true}
                    onChangeText= {(t)=> setTitle(t)}
                    
                />
            </View>
            <View style={{...styles.card, height: '70%'}}>
            <TextInput
                    style={{margin: 20}}
                    placeholder={'Enter description here'}
                    multiline= {true}
                    onChangeText= {(t)=> setDescription(t)}
                    value={description}
            />
            </View>
            <Button
                title={noteTitle?"Update note":"Add note"}
                onPress={()=> onAddPressed()}
            />
            <AdMobBanner
                bannerSize="largeBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                //onDidFailToReceiveAdWithError={this.bannerError} 
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    }, card:{
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_BLACK,
        borderRadius: 50,
        margin: 10,
        borderWidth: 0.5
    }

})
export default CreateNote
