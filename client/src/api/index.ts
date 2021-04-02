import axios from 'axios'

const getRequest=()=>axios.create({
    baseURL:"https://dsm-sign.herokuapp.com",
    headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
    }
});


export default getRequest;