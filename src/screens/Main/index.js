import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { ADD_BUTTON_IMG, COLOR_WHITE, DELETE_ICON, NOTE_IMG } from "../../../res/drawables";
import ImageButton from "../../componets/ImageButton";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdMobBanner} from 'expo-ads-admob';
import App from "../../../api/firebase";
import { collection, getDocs, getFirestore, query, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";
import axios from "axios";

const Main = (props) => {

    const[data, setData]=useState([])
    const [selectedNote, setSelectedNote]=useState([])
    const [loading, setLoading]=useState(false)
    const {email}=props.route.params
    const db = getFirestore(App)

    const loadData = async()=>{
        setLoading(true)
        // let response=await axios.post('url',{
        //     param1: 'abc',
        //     parameter:'asdfasdf'
        // })
        //alert('Temperature :' + weather.data.current.temp_c)
    //     const querySnapshot = await getDocs(collection(db,email));
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     keys.push(doc.data())
    // });
    const q = query(collection(db, email))
    try{
        let keys=[]
        const unsub=onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                keys.push(doc.data());
            });
           setData(keys)
          });
    }catch(e){

    }
    
    setLoading(false)
    }

    useEffect(()=>{
        loadData()
        //loadAllKeyFromAsyncStorage()
    },[]);

    // const loadAllKeyFromAsyncStorage=async()=>{
    //     let keys= await AsyncStorage.getAllKeys();
    //     if(keys.length != data.length)
    //         setData(keys);
    // }

    const deleteNote = async(item) =>{
        try {
            await AsyncStorage.removeItem(item);    
            props.navigation.replace('Main')
        }
        catch(exception) {
            console.log(exception)   
        }
    }

    return(
        <View style= {styles.container}>
            {loading?<ActivityIndicator />: null}
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({item}) => {
                    return(
                            <View style={{ margin: 5}}>
                            <ImageButton style={styles.deleteIcon}
                                source={DELETE_ICON}
                                onPress={()=> deleteNote(item)}
                            />
                            <ImageButton style={styles.noteIcon}
                                source={NOTE_IMG} 
                                onPress={()=>{props.navigation.navigate('Create',{title : item.title, description: item.description, email})}}
                            />
                            <Text style={styles.text}>{item.title}</Text>
                            </View>
                            
                    
                    )}}
                
                keyExtractor={(item)=> item}
            />

            <ImageButton 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}
                source= {ADD_BUTTON_IMG}
                onPress={()=>props.navigation.navigate('Create',{title: null, description: null, email})}
            />
            <AdMobBanner
                bannerSize="fullBanner"
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
        justifyContent: 'space-between'
    }, noteIcon:{
        height:100, 
        width:100
    }, text:{
        alignSelf: 'center', 
        fontWeight: 'bold'
    },deleteIcon:{
        height:25,
        width:25,

    }
    // button:{
    //     flex: 1,
    //     alignItems: 'flex-end',
    //     position: 'absolute',
    //     bottom:35,
    //     right:5,
    //     padding: 20,
    //     //alignSelf: 'flex-end',

    // }
});
export default Main;