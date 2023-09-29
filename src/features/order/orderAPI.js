// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {

    const response = await fetch('/orders', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(order),
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

export function fetchAllOrders(sort ,pagination) {
  let queryString="";
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('/orders?'+queryString) 
    const data = await response.json()
    const totalItems =  response.headers.get('X-Total-Count')
    resolve({data:{orders:data,totalOrders:+totalItems}})
  }
  );
}



export function updateOrder(order) {
  return new Promise(async (resolve) => {

    const response = await fetch(`/orders/${order.id}`, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(order),
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