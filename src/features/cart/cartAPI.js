export function addToCart(cartData) {
  return new Promise(async (resolve) => {

    const response = await fetch('/cart', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(cartData),
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

export function fetchItemsByUserId(){
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch("/cart"); 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function upadteCart(update) {
  return new Promise(async (resolve) => {

    const response = await fetch('/cart/'+update.id, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(update),
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


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {

    const response = await fetch('/cart/'+itemId, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "content-type": "application/json",
      },
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });

    const data = await response.json();
    // console.log(data);
    resolve({ data:{id:itemId} });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response=await fetchItemsByUserId();
    const items=response.data;
    console.log(items);
    for(let item of items){
      await deleteItemFromCart(item.id);
    }
    resolve({status:"Success"});
  });
}