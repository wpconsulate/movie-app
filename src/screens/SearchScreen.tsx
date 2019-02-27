import React, { Component } from "react";
import {AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Input, Item,Text, Row, Grid, Col } from 'native-base';
import { Pill } from "../components";

class SearchScreen extends Component<any,any> {
  constructor(props: any){
    super(props)
    this.state={
      userInput: "", //save when user types on search bar here
      searchHistory:[]
    }

  }
  static navigationOptions = {
    title: "Search"
  };

  //get search history (if any) that display pill
  async componentWillMount() {
    let historyList = await this.getLocalHistory()
    if(historyList.length>0){
      this.populateStateWithSearchHistory(historyList)
    }
  }

  //return: list of string, repersent search history
  async getLocalHistory(){
    let value = new Array()
    value = await AsyncStorage.getAllKeys()
    return value
  }

  //populate search history with list of strings
  populateStateWithSearchHistory(historyList: string[]){
    const value = historyList
      let history = new Array()
      value.forEach(element=>{
        history.push(element)
        
      })
      this.setState({searchHistory: history})
  }

  //record user input on search bar
  onChange = (text: string) =>{
    this.setState({userInput: text})
  }

  onsubmit = ()=>{
    
    this._retrieveData(this.state.userInput) //save search result if not saved already
    this.setState({userInput: ""}) //clear search bar
    
  }

  _storeData = async (userInput: string) => {
    try {
      await AsyncStorage.setItem(userInput, userInput);
      let previousSearch = this.state.searchHistory
      previousSearch.push(userInput)
      this.setState({searchHistory: previousSearch})
    } catch (error) {
      console.log(error)
    }
  };
  _retrieveData = async (userInput: string) => {
    try {
      const value = await AsyncStorage.getItem(userInput);
      if (value === null) {
        this._storeData(userInput)
      }
    } catch (error) {
      // Error retrieving data
      console.log("retrive didnt work")
      
    }
  };

  //called by clear all button
  clearSearchHistory = async () => {
    await AsyncStorage.multiRemove(this.state.searchHistory)
    this.setState({searchHistory: []})
  }

  //called tapping search history pills
  searchHistoryOnPress(text:string){
    this.setState({userInput: text}) //populate searchbar with selected search history
  }
  render() {
    return (
      <Container style={{backgroundColor: '#181F52'}}>
        <Header />
        <Content>
          <Item regular>
            <Input placeholder='Regular Textbox' onChangeText={this.onChange} onSubmitEditing={this.onsubmit} value={this.state.userInput} />         
          </Item>
          <Grid>
            <Row>
              <Col>
              <Text style={{fontSize:30, color: 'white', fontWeight:"bold"}}>Search History</Text>
              </Col>
              <Col>
              <TouchableOpacity onPress={this.clearSearchHistory}>
                <Text style={{color:'red', fontSize:20, alignSelf:'flex-end', fontWeight:'200'}}>Clear</Text>
              </TouchableOpacity>
              </Col>
            </Row>
            <Row>
            <ScrollView horizontal>
          {
            this.state.searchHistory ? this.state.searchHistory.map((e:any)=>{
              return(
                <TouchableOpacity key={e} onPress={()=>this.searchHistoryOnPress(e)}>

                  <Pill text={e} colour={'#4F547E'} textColour={"white"}/>
                </TouchableOpacity>
              )
            }) : ''
          }
          </ScrollView>
            </Row>
          </Grid>
          
        </Content>
      </Container>
    );
  }
}

export default SearchScreen;
