// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {

    const response = await fetch('http://localhost:8080/orders', {
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