import { addDoc, collection, serverTimestamp,setDoc } from 'firebase/firestore'
import { db } from '../firebase/clientApp';

export const sendData = async (clients:any) => {
    console.log(clients);
    console.log('util send data');
try {
    

      const collectionRef = collection(db, "clients");
    const docRefs = await addDoc(collectionRef, { ...clients, timestamp: serverTimestamp })

    console.log(docRefs.id)
    console.log(clients);
    
    
    // setClients({ firstName: '', lastName: '', email: '', campus: '', city: '', phone: '', });
    alert(`client with id ${docRefs.id} is added succesfully`)
      
    } catch (error) {

      console.log(error)
      
    }

}