import React from 'react';
import {StyleSheet, ActivityIndicator,AsyncStorage, Text, View,TextInput,TouchableOpacity} from 'react-native';
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

const userInfo={username:'saadah', id:'1', phone:'012', email:'saadah', date:'1/1/1111'};
class ReserveForm extends React.Component {
constructor(props){
  super(props);
  this.state ={username:'', id:'', phone:'', email:'', date:''}
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RentBook</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(username)=>this.SetState({username})}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          onChangeText={(id)=>this.SetState({id})}
          value={this.state.id}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone NUmber"
          onChangeText={(phone)=>this.SetState({phone})}
          value={this.state.phone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email)=>this.SetState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Rental"
          onChangeText={(date)=>this.SetState({date})}
          value={this.state.date}
        />
        <TouchableOpacity style={styles.btnSubmit} onPress={this._reservein}>
          <Text style={styles.btnEnterText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _reservein = async() =>{
    if(userInfo.username === this.state.username && userInfo.id === this.state.id && userInfo.id === this.state.phone && this.state.email && this.state.date){
      alert('Thank you! Your request is in progress. ');
      await AsyncStorage.setItem('reserve',true);
    }
  }
}

class HomeScreen extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to RentBook
        </Text>
      </View>
      );
  }
}

class AuthLoadingScreen extends React.Component{
  constructor(props){
    super(props);
    this._loadData();
  }
  render(){
    return(
      <View style ={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle ="default"/>
      </View>
      );
  }

  _loadData = async() => {
    const reserve = await AsyncStorage.getItem(reserve);
    this.props.navigation.navigate(reserve !== true ? 'Auth':'App');
  }
}

const AppStack =createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({Reserve: ReserveForm});

export default createAppContainer(
  crateSwitchNavigator(
    {
      AuthLoading : AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },{
      initialRouteName:'Auth'
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10},
  input:{
    margin:15,
    height:40,
    padding:5,
    fontSize:16,
    borderBottomWidth:1,
    borderBottomColor:'#428AF8',
},
  btnSubmit:{
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#428AF8',
    alignItems:'center',
    marginLeft:15,
    marginRight:15,
    padding:10
  },
  btnEnterText:{
    color:'#F5FCFF',
    fontWeight:'700'
  }
});
