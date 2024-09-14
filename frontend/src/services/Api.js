import {commonRequest} from "./ApiCall"
import {BASE_URL} from "./helper"

export const register = async(data, header) => {
    return await commonRequest("POST", `${BASE_URL}/user/register`, data, header)
}

export const getData = async(search,gender,status,sort,page) => {
       return await commonRequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"")
}

export const singleUser = async(id) => {
    return await commonRequest("GET",`${BASE_URL}/user/${id}`,"")
}

export const editUser = async(id,data,header) =>{
    return await commonRequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header)
}

export const deleteData = async(id) => {
    return await commonRequest("DELETE",`${BASE_URL}/user/delete/${id}`,{})
}

export const statusChange = async(id,data)=>{
    return await commonRequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}

export const exportToCsv = async() => {
    return await commonRequest("GET", `${BASE_URL}/userExport`,"")
}