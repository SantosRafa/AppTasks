import React, {useState, useEffect, useRef} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import firebase from './src/firebaseConnection';
import TaskList from './src/TaskList';

export default function App() {
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  useEffect(()=>{
    async function loadTasks(){
      await firebase.database().ref('tasks').on('value',(snapshot)=>{
        setTasks([]);

        snapshot.forEach((childItem)=>{
          let data = {
            key:childItem.key,
            nome:childItem.val().nome
          };

          setTasks(oldArray =>[...oldArray, data]);
        })
      })
    }

    loadTasks();
  },[]);

  async function handleAdd(){
    if(!key){
      if(newTask != ''){

        let task = await firebase.database().ref('tasks');
        let key = await task.push().key
  
        task.child(key).set({
          nome:newTask
        });
  
        Keyboard.dismiss();
        setNewTask('');
      }
    }else {
      await firebase.database().ref('tasks').child(key).update({
        nome: newTask
      });

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
  }
    
}
  async function handleDelete(key){
    await firebase.database().ref('tasks').child(key).remove()
  }

   function handleEdit(data){
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus()

  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      {key ? 
        <View style={styles.editingView}>
          <TouchableOpacity onPress={cancelEdit}>
           <Icon name="x-circle" size={20} color ="#FF0000"/>
          </TouchableOpacity>
          <Text style={styles.editingText}> Você esta editando uma tarefa</Text>
       </View>
       : 
       <></>}
      
      <View style={styles.containerTask}>
        <TextInput
        style={styles.input}
        placeholder="O que vamos fazer hoje??"
        underlineColorAndroid="transparent"
        onChangeText={(text)=>setNewTask(text)}
        value={newTask}
        ref={inputRef}
        />

        <TouchableOpacity onPress={handleAdd} style={styles.BtnAdd}>
          <Text style={styles.BtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      data={tasks}
      keyExtractor={item =>item.key}
      renderItem={({item}) => (
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
    marginLeft:10,
    marginRight:10,
    
  },

  containerTask: {
    flexDirection:'row'
  },

  input: {
    flex:1,
    marginBottom:10,
    padding:10,
    borderWidth:1,
    borderColor: '#121212',
    height:40,
    fontSize:17
  },

  BtnAdd: {
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor:'#121212',
    paddingLeft:14,
    paddingRight:14,
    marginLeft: 4
  },

  BtnText: {
    fontSize:23,
    color:'#fff'
  },

  editingView: {
    flexDirection:'row'
  },

  editingText: {
    marginLeft:5,
    marginBottom:8,
    color:'#ff0000'
  }


});
