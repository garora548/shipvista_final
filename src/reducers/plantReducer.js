import {ACTION_TYPES} from "../actions/plants";
const intialState   = {
    list:[]
}

export const plantReducer = (state = intialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list:[...action.payload ]
            }    
        case ACTION_TYPES.CREATE :
           return  {
                ...state,
                list: [...state.list, action.p]
            }
        case ACTION_TYPES.UPDATE :
         return  {
                 ...state,
                 list: state.list.map(x=>x.id == action.payload.id ? action.payload: x)
               }
         case ACTION_TYPES.DELETE :
             return  {
            ...state,
            list: state.list.filter(x=> x.id != action.payload.id)
            }
        default:
            return state;
    }
}