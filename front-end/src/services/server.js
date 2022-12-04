import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:8080",
});

const signup = async (email, password, checkPassword, fname, lname, phone) => {

    const response = await client.post('/signup', {
        "email": email, 
        "password": password,
        "checkPassword": checkPassword,
        "fname": fname,
        "lname": lname,
        "phone": phone
    });

    return response.data;
}

const login = async (email, password) => {

    const response = await client.post('/login', {
        "email": email,
        "password": password
    });

    return response.data;
}

const logout = () => {
    let result = window.confirm('Are you sure you want to log out?');
    if(result){
        localStorage.activeUser = null;
    }
}

const addPet = async (pet) => {
    const formData = new FormData();
    formData.append("name", pet.name);
    formData.append("type", pet.type);
    formData.append("status", pet.status);
    formData.append("height", pet.height);
    formData.append("weight", pet.weight);
    formData.append("color", pet.color);
    formData.append("bio", pet.bio);
    formData.append("hypo", pet.hypo);
    formData.append("diet", pet.diet);
    formData.append("breed", pet.breed);
    formData.append("picture", pet.picture, pet.picture.name);

    const response = await client.post('/pet', formData);
    return response.data;
}

const getPets = async (name, status, height, weight, type) => {
    
    // const response = client.get(`/pet?${name ? `name=${name}&` : ''}${status ? `status=${status}&` : ''}${height ? `height=${height}&` : ''}${weight ? `weight=${weight}&` : ''}${type ? `type=${type}&` : ''}`)
    // console.log(response.data)
    // return response.data;

    const response = await client.get('/pet');
    return response.data;
}

const updateUser = async (id, firstName, lastName, email, phone) => {

    const response = await client.put(`/user/${id}`, {
        "email": email,
        "fname": firstName,
        "lname": lastName,
        "phone": phone
    });

    return response.data;
}

const getPetbyId = async (id) => {

    const response = await client.get(`/pet/${id}`);
    return response.data;

}

const adoptPet = async (userId, petId) => {
    const response = await client.post(`/pet/${petId}/adopt`, {
        "user_id": userId
    });

    return response.data;
}

const returnPet = async (userId, petId) => {
    const response = await client.post(`/pet/${petId}/return`, {
        "user_id": userId
    });

    return response.data;
}


const savePet = async (userId, petId) => {
    const response = await client.post(`/pet/${petId}/save`, {
        "user_id": userId
    });

    return response.data;
}

const deletePet = async (userId, petId) => {
    console.log(petId)

    const response = await client.delete(`/pet/${petId}/save`, {
        data: {
            "user_id": userId
        }
    });
    return response.data;
}
export { signup, login, logout, addPet, getPets, getPetsByUserId, updateUser, getPetbyId, adoptPet, returnPet, savePet, deletePet }