import React,{useState, useEffect} from 'react';
import {StyleSheet,View, Text,ActivityIndicator,Image,TouchableOpacity} from 'react-native';
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';

function FilmDetails(props){
    const {idFilm}=props.idFilm
    const [filmState,setFilmState] = useState({ 
        film: undefined,
        isLoading: true
     });  

     function displayLoading(){
        if(filmState.isLoading){
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" />         
            </View>
          )       
        }
      };
        

      useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur   
           
        getFilmDetailFromApi(idFilm).then((data)=>{         
            setFilmState({
                film: data,
                isLoading: false
             });
        });  
        console.log(props.favoritesFilm)     
      },[]);

      function toogleFavoris(){
        //on met à jour la liste des favoris
        const action={type:"TOOGLE_FAVORITE", value: filmState.film}
        props.dispatch(action)
      }

      function displayFavoriteImage(){
        var sourceImage=require("../Images/nonFavoris.png")
        if(props.favoritesFilm.findIndex((item) => item.id ===filmState.film.id) !== -1)
         {
           sourceImage=require("../Images/favoris.png")
          }

         return (
          <Image style={styles.favorites_image} source={sourceImage} />
         )
      }

      function displayFilm(){
          const film=filmState.film
        if (film != undefined){
           return( 
           <ScrollView style={styles.scrollView_Container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={{uri:getImageFromApi(film.backdrop_path)}} />
                    <TouchableOpacity 
                    style={styles.favorites_container}
                    onPress={() => toogleFavoris()}>
                    {displayFavoriteImage()}
                    </TouchableOpacity>

                </View>
                <View style={styles.title}>
                    <Text style={styles.title_text}>{film.title}</Text>                    
                </View>
                <View style={styles.description}>
                 <Text style={styles.description_text}>{film.overview}</Text>
                </View>
                <View style={styles.about_film}>
                <Text style={styles.about_film_text}>Date de sortie: {moment(new Date(film.release_date)).format('DD/MM/YY')}</Text>  
                <Text style={styles.about_film_text}>Note: {film.vote_average}</Text>  
                <Text style={styles.about_film_text}>Nombre de Votes: {film.vote_count}</Text>  
                <Text style={styles.about_film_text}>Budget: {numeral(film.budget).format('0,0[.]00 $')}</Text>  
                <Text style={styles.about_film_text}>Genre(s) : {film.genres.map((genre)=>{
                    return genre.name;
                    }).join(" / ")}
                </Text>
                <Text style={styles.about_film_text}>Companie(s) : {film.production_companies.map((company)=>{
                    return company.name;
                    }).join(" / ")}
                </Text> 
                </View>
            </ScrollView>)
          }
      }

    return(
        <View style={styles.container}>
           
            {displayFilm()}
            {displayLoading()}
           
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
       flex: 1, 
       alignItems: 'center',
       justifyContent: 'center'
    },
    loading_container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
      },
    scrollView_Container:{
        flex:1
     },
      header:{
        flex:1,
        justifyContent:'center'
      },
      image: {
        width: 'auto',
        height: 200,
        margin: 5,
        backgroundColor: 'gray'
      },
      title:{
        flex:1,
        alignItems:'center'
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 20,        
        flexWrap: 'wrap',
        padding: 5
    },   
     description:{
        flex:7,  
        marginRight:15,
        marginLeft:15,
        justifyContent:'center'    
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    about_film:{
        flex:3,
        justifyContent:'flex-start'
    },
    about_film_text:{
        fontWeight: 'bold',
        fontSize: 15,        
        flexWrap: 'wrap',
        padding: 5
    },
    favorites_container:{
      alignItems:'center'
    },
    favorites_image:{
      width:40,
      height:40
    }
  
});

const mapStateToProps = (state) => {   
    return {
      favoritesFilm: state.favoritesFilm
    };
}


export default connect(mapStateToProps)(FilmDetails)