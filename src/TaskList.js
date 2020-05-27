import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TaskList({data, deleteItem, editItem}) {
 return (
   <View style={styles.container}>
       <TouchableOpacity onPress={()=>deleteItem(data.key)} style={styles.button}>
            <Icon name="trash" color="#FFF" size={20}/>
       </TouchableOpacity>
       <View style={styles.viewTask}>
           <TouchableWithoutFeedback onPress={()=>editItem(data)}>
            <Text style={styles.taskText}>{data.nome}</Text>
           </TouchableWithoutFeedback>
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#121212',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        borderRadius:5
    },
    
    button:{
        marginRight:10
    },

    viewTask:{
        paddingRight:15
    },

    taskText:{
        color:'#fff',
        paddingRight:10
    }
})