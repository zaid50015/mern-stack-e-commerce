// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>{
    const data = fetch("");
    const parsedData=  data.json();
    resolve({parsedData})
  });
}
