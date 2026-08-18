import axios from 'axios';
const apiEP = 'http://localhost:8000/api/v1/tasks';
// const apiProcessor = async () => {
//     try{
//         const response = await axios ({
//             method,
//             url
//         })
//     }
//     catch(error){
//         return {
//             status: 'error',
//             message: error.message
//         }
//     }
// }

export const postTask = async(data) => {
    try{
        const response = await axios.post(apiEP, data);
        console.log(response.data);
        return response.data;
        
    }
catch(error)
{
    return{
        status: 'error',
        message: error.message
    };
}
};