const items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2
    }
  ]

const baseURL = 'http://localhost:8080/customers';

export async function getAll(setCustomers) {
    const myInit = {
        method: 'GET',
        mode: 'cors' 
    };
    
    const fetchData = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            alert(error);
        }
    }

    fetchData(baseURL);
}

export function deleteById(id, callback) {
    const myInit = {
        method: 'DELETE',
        mode: 'cors' 
    };
    
    const deleteData = async (url) => {
        try {
            const response = await fetch(`${url}/${id}`, myInit);
            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.status}`);
            }
            await response.json();
            callback();
        } catch (error) {
            alert(error);
        }
    }
    deleteData(baseURL)
}

export function post(item, callback) {
    delete item.id
    const myInit = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const postData = async (url) => {
        try {
            const response = await fetch(`${url}`, myInit);
            if (!response.ok) {
                throw new Error(`Error posting data: ${response.status}`);
            }
            await response.json();
            callback();
        } catch (error) {
            alert(error);
        }
    }
    postData(baseURL)
}

export function put(id, item, callback) {
    const myInit = {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const putData = async (url) => {
        try {
            const response = await fetch(`${url}/${id}`, myInit);
            if (!response.ok) {
                throw new Error(`Error putting data: ${response.status}`);
            }
            await response.json();
            callback();
        } catch (error) {
            alert(error);
        }
    }
    putData(baseURL)
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


