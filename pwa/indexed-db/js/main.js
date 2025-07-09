const DB_NAME = "FRONT_PWA";
const STORE_NAME = "user_store";
const DB_VERSION = 1;
//store==collect=table
// products
function openDB() {
  return new Promise((resolve, reject) => {
    const requset = indexedDB.open(DB_NAME, DB_VERSION);

    requset.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        var store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    requset.onsuccess = () => resolve(requset.result);
    requset.onerror = () => reject("Error Opening DB");
  });
}

// CRUD->collection=>users

async function addData(data) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.add(data);
  return transaction.result;
}

// addData({id:2,name:'ramy mohamed',email:"ramy@gmail.com"}).then(()=>console.log("Data Added")).catch(()=>console.log('Error adding data'))

async function getData(){
    const db = await openDB();
    return new Promise((res,rej)=>{
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const requset= store.getAll()

        requset.onsuccess=()=>res(requset.result)
        requset.onerror=()=>rej('Error getting data ')

    })
}

// getData().then((data)=>console.log("retrived Data :",data)).catch((err)=>console.log(err))


async function updataData(userId,updatedData){
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request= store.get(userId)
    request.onsuccess=()=>{
        const data=request.result

        if(!data){
            console.log('No User with this id');
            return
        }
        let newData={...data,...updatedData}
        store.put(newData)

    }


}
updataData(1,{name:'osama mohamed',email:'osama@gamil.com'})

// delete

// Delete by ID
async function deleteDataById(id) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log(`User with ID ${id} deleted`);
      resolve();
    };
    request.onerror = () => {
      console.log("Error deleting data");
      reject("Error deleting data");
    };
  });
}

// Delete all records
async function deleteAllData() {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.clear();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log("All data deleted");
      resolve();
    };
    request.onerror = () => {
      console.log("Error deleting all data");
      reject("Error deleting all data");
    };
  });
}
