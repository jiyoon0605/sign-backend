import axios from 'axios'

const clinet=axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
    }
});

export default clinet;