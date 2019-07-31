import { actionTypes } from "./actionTypes"
import { request } from "../config/api"

// actions
const saveCounts = (data) => ({
    type: actionTypes.ACTION_FETCHING_DATA,
    data: data
})

const upCount = (data) => ({
    type: actionTypes.ACTION_ADD_DATA,
    data: data,
})

const downCount = (data) => ({
    type: actionTypes.ACTION_SUB_DATA,
    data: data,
})

export const changeCount = (data) => ({
    type: actionTypes.ACTION_UPDATE_DATA,
    data: data,
})

const delCount = (data) => ({
    type: actionTypes.ACTION_DELETE_ITEM,
    data: data,   
})

export function getCount() {
    return dispatch => {
        return request().get(`control-size`).then(res => {
            dispatch(saveCounts(res.data.list))
            return res.data.list
        }).catch(err => {
            console.log(err)
        })
    }
}

export function addCounts(number) {
    let data = {
        number : number
    }
    return dispatch => {
        return request().post(`control-size/create`, data).then(res => {
            dispatch(upCount(res.data.listNew));
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })
    }
}

export function subCounts(number) {
    let data = {
        number : number
    }
    return dispatch => {
        return request().post(`control-size/down`, data).then(res => {
            dispatch(downCount(res.data.number));
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })
    }    
}

export function updateCount(id,value) {
    let data = {
        value: value,
    }
    return dispatch => {
        return request().put(`control-size/detail/${id}`, data).then(res => {
            dispatch(changeCount(res.data.content));
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })
    } 
}

export function deleteCount(id) {
    return dispatch => {
        return request().delete(`control-size/detail/${id}`).then(res => {
            dispatch(delCount(id))
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })
    } 
}

export default {
    getCount,
    addCounts,
    subCounts,
    updateCount,
    deleteCount,
}