import axios from 'axios'

const getRequest=()=>axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
    }
});

export default getRequest;