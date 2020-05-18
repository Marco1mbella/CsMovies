const initialState ={favoritesFilm: []}

export default function toogleFavorite(state=initialState, action: { type: any; value: { id: any } }){
    let nextState

    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            const favoriteFilmIndex=state.favoritesFilm.findIndex((item:any) => item.id === action.value.id)

            if (favoriteFilmIndex !== -1) {
                //On supprime
                nextState={
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item,index:number)=> index !== favoriteFilmIndex)
                }
            }else{
                nextState={
                    ...state,
                    favoritesFilm: [...state.favoritesFilm,action.value]
                }
            }

            return nextState || state;
    
        default:
            return state;            
    }
}

