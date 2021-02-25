import React from 'react'
import {Text,View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component{

    constructor(){

        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            //status === granted - isTrue when the user has granted permission
            //status === granted - isFalse when theuser has not
            hasCameraPermissions: status === 'granted',
            buttonState:'clicked'
        })
    }
    handleBarCodeScanned = async({type,data})=>{
        this.setState({scanned:true, scannedData: data, buttonState: 'normal'})
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if(buttonState==='clicked' && hasCameraPermissions){
            return(
               < BarCodeScanner onBarCodeScanned={scanned? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
            )
        }else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                <Image
                     source={
                     require('../assets/scanner.jpg')}
                     style = {{width:200, height:200, alignSelf:"center", marginTop:50}}
      />
      <Text style={styles.text}>Bar Code Scanner</Text>
      <Text style={styles.text2}>{hasCameraPermissions===true?this.state.scannedData : 'Request Camera Permission'}</Text>
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}><Text style={styles.displayText}>Scan QR Code</Text></TouchableOpacity>
                 </View>
            )
        }
        
    }
}

const styles= StyleSheet.create({
   scanButton:{
        borderRadius:25, 
        backgroundColor:'yellow', 
        height:50, 
        width:150, 
        borderWidth:5, 
        marginTop:25,
        alignSelf:"center"
    },
    displayText:{
        fontWeight:'bold', 
        fontSize:15, 
        textAlign:"center", 
        marginTop:8
    },
    text:{
      fontWeight:'bold', 
        fontSize:30, 
        textAlign:"center", 
        marginTop:8
    },
    text2:{
      fontWeight:'bold', 
        fontSize:15, 
        textAlign:"center", 
        marginTop:8,
        textDecorationLine:'underline'

    }
})

