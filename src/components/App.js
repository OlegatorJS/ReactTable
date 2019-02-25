import React, { Component } from 'react';
import AddNewPerson from './AddNewPerson';
import myData from './ParticipantsList.json';
import List from './List';
import _ from 'lodash';

import './style/style.css';
var Plists=myData.Participants;
var toggle=1;
export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      Plists
    }
    const promise = new Promise((res, rej) => {
      setTimeout(() => res ('Servers response'), 1000);
      });
    const onError = (err) => console.log(`Error: ${err}`);

    promise
        .then(rez => {
            console.log(`Rez1: ${rez}`);

            return new Promise((resolve) => setTimeout(
              ()=>resolve('Database result'),
              1000));
        })
        .then(r=>console.log(`Rez2: ${r}`))
        .catch(onError);
    console.log('Promises script is running');
  }

  render() {
    return (
      <div className="App">

        <main className="App-main">
          <h2>Table</h2>        
          <AddNewPerson addPerson={this.addPerson.bind(this)}
                        Plists={this.state.Plists}/>        
          <List Plists={this.state.Plists}
                savePerson={this.savePerson.bind(this)}
                deletePerson={this.deletePerson.bind(this)}
                sortByName={this.sortByName.bind(this)}
                sortByEmail={this.sortByEmail.bind(this)}
                sortByPhone={this.sortByPhone.bind(this)}                
                />        
        </main>
      </div>
    );
  }

  addPerson(name,email,phoneNumber){
    this.state.Plists.unshift({
      name,
      email,
      phoneNumber
    });
    this.setState({ Plists:this.state.Plists})
  }
  
  savePerson(oldPerson,newPerson){
    const findPerson =_.find(this.state.Plists, Plist =>Plist.name === oldPerson);
    findPerson.name = newPerson.name;
    findPerson.email= newPerson.email;
    findPerson.phoneNumber=newPerson.phoneNumber;
    this.setState({Plists: this.state.Plists});
  }

  deletePerson(personToDelete){
    _.remove(this.state.Plists,Plist=>Plist.name ===personToDelete);
    this.setState({Plists:this.state.Plists});
  }
  
  sortByName(){    
    if (toggle===1){
      this.setState({Plists: _.orderBy(this.state.Plists,['name'],['asc'])});      
      toggle*=-1;}
    else {
      this.setState({Plists: _.orderBy(this.state.Plists,['name'],['desc'])});
      toggle*=-1;}
    }
    
  
  sortByEmail(){
    if (toggle===1){
      this.setState({Plists: _.orderBy(this.state.Plists,['email'],['asc'])});      
      toggle*=-1;}
    else {
      this.setState({Plists: _.orderBy(this.state.Plists,['email'],['desc'])});
      toggle*=-1;}
  }
  sortByPhone(){
    if (toggle===1){
      this.setState({Plists: _.orderBy(this.state.Plists,['phoneNumber'],['asc'])});      
      toggle*=-1;}
    else {
      this.setState({Plists: _.orderBy(this.state.Plists,['phoneNumber'],['desc'])});
      toggle*=-1;}
  }
  
}
