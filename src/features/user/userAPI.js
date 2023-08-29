// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrder(userId) {
  return new Promise(async(resolve) =>{
    const response=await fetch(`http://localhost:8080/orders/?users.id=${userId}`)
    const data=await response.json()
    resolve({data});
  });
}

  
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('http://localhost:8080/users/'+userData.id, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });

    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}