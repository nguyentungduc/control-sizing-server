import { actionTypes } from "../actions/actionTypes";

const initData = {
    list: [],
}

export default function (state = initData, action) {
    switch (action.type) {
        case actionTypes.ACTION_FETCHING_DATA:
            return {
                ...state,
                list: action.data,
            }

        case actionTypes.ACTION_ADD_DATA:
            return {
                ...state,
                list: state.list.concat(action.data)
            }

        case actionTypes.ACTION_SUB_DATA:
            return {
                ...state,
                list: state.list.slice(0, -1*action.data)
            }

        case actionTypes.ACTION_UPDATE_DATA: {
            const _id = action.data.id
            const newValue = action.data.value;
            return {
                ...state,
                list: state.list.map((item, index) => {
                    return _id === item.id ? {
                        ...item,
                        value: newValue
                    } : item;
                })
            }
        }

        case actionTypes.ACTION_DELETE_ITEM:{
            const _id = action.data;
            return {
                ...state,
                list: state.list.filter((item) => _id !== item.id)
            }           
        }

        default:
            return {
                ...state
            }
    }
}