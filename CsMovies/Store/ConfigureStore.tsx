import {createStore} from 'redux';
import Favorite from './Reducers/FavoriteReducer';

const Store= createStore(Favorite)

export default Store;