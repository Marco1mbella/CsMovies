import React from 'react';
import { View, TextInput,StyleSheet, FlatList,Text, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import {connect} from 'react-redux';

class Search extends React.Component{

    constructor(props) {
      super(props)
      this.state = { 
        films: [],
        isLoading: false
     }     
      this.searchedText=""
      this.page=0
      this.totalPages=0            
    }

    _loadFilms() {     
      if(this.searchedText.length > 0){
        this.setState({isLoading : true})
        getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then((data) => {               
          this.page=data.page
          this.totalPages=data.total_pages
          this.setState({ 
            films: [ ...this.state.films, ...data.results ],// OR this.state.films.concat(data.results)
            isLoading: false
          })});
      }
    }

    _displayLoading(){
      if(this.state.isLoading){
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" />         
          </View>
        );        
      }
    }

    _searchedText(text){ 
      this.searchedText= text;
    }

    _searchFilms(){
      this.page=0
      this.totalPages=0
      this.setState({
        films: []
      },() =>{
        console.log("page: "+this.page+" Total pages : "+this.totalPages+" Nombre de films : "+this.state.films.length)
        this._loadFilms()
      }) 
    }

    _displayDetailForFilm = (idFilm)=>{
      this.props.naviguer.navigate('Details',{idFilm: idFilm})     
    }
    _addFavorite(item){
     let isPresent=false
       if (this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1){
         isPresent=true 
        }
        console.log("Resulter: "+isPresent)
        return isPresent
    }
    render(){

      console.log("Nouvelle Recherche: "+this.state.isLoading);

      return (
        <View style={styles.container}>

           <View style={styles.headerStyle}>
              <Text style={styles.TextStyle}>MOVIES</Text>

              <View style={styles.contentStyle}>
                <TextInput onChangeText={(text) =>this._searchedText(text)} onSubmitEditing={() => this._searchFilms()} style={styles.textInput} placeholder="Title of the movie"/>
                
                <Text onPress={() => this._searchFilms()} style={styles.btnTextStyle}>Rechercher</Text>
              </View>
          </View>

          <View style={styles.content}>
              <FlatList
                extraData={this.props.favoritesFilm}
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                  if(this.page < this.totalPages){
                    this._loadFilms()
                  }
                  
                }}
                renderItem={({item}) => <FilmItem film={ item } 
                isFilmFavorite={this._addFavorite(item)}
                displayDetailForFilm={this._displayDetailForFilm}               
                 />}
              />                                                       
          </View>

          {this._displayLoading()}   

        </View>
      );
  }
}

  const styles = StyleSheet.create({
    container: {   
        flex:1,   
        backgroundColor: '#fff',
        margin:'auto',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center',
        padding:10
    },

    loading_container:{
      position:'absolute',
      left:0,
      right:0,
      top:100,
      bottom:0,
      alignItems:'center',
      justifyContent:'center'
    },

    headerStyle:{  
      flex: 1, 
      marginTop:5,    
      textAlign:'center',
      justifyContent:'center',      
      flexDirection:'column',    
      padding:5     
    },
    content:{
      flex:7,
     
    },
    TextStyle:{     
      fontWeight: 'bold',
      fontSize: 30,  
    },
    contentStyle:{
      alignItems: 'stretch',           
    },
    textInput:{                    
        height: 35,
        width: 'auto',
        borderColor: '#000000',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius:10,       
    },
    btnTextStyle:{
      marginTop:10,
      fontWeight: 'bold',
      fontSize: 15,  
      color:'rgb(51,103,214)',
      height:30,        
      textAlign:'center',     
    },  
  });
  
  const mapStateToProps = (state) => {   
    return {
      favoritesFilm: state.favoritesFilm
    };
}


export default connect(mapStateToProps)(Search);