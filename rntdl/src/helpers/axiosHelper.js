import axios from 'axios';
const apiEP = 'http://localhost:8000/api/v1/tasks';
const apiProcessor = async ({method, data}) => {
    try{
        const response = await axios ({
            method, 
            url: apiEP,
            data
        });
        return response.data;
    }
    
    catch(error){
        return {
            status: 'error',
            message: error.message
        }
    }
}

export const postTask = async(data) => {
    const obj = {
        method: 'post',      // code refactoring
        data,
    }
    return apiProcessor(obj);
//     try{
//         const response = await axios.post(apiEP, data);
//         console.log(response);
//         return response.data;

//     }
// catch(error)
// {
//     return{
//         status: 'error',
//         message: error.message
//     };
// }
};

export const fetchAllTasks = async (data) => {
     const obj = {
        method: 'get',      // code refactoring
        data,
    }
    return apiProcessor(obj);
}

export const updateTasks = async (data) => {
    const obj = {
        method: 'patch',      // code refactoring
        data,
    }
    return apiProcessor(obj);
}