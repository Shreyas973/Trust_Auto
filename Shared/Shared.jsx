import { getDoc,doc,setDoc, updateDoc } from "firebase/firestore"
import {db} from '../config/FireBaseConfig'

 const GetFavList=async(user)=>{
    const docSnap=await getDoc(doc(db,'Favorite',user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists())
    {
        return docSnap.data();
    
    }
    else{
        await setDoc(doc(db,'Favorite',user?.primaryEmailAddress?.emailAddress),{
        email:user?.primaryEmailAddress?.emailAddress,
        favorites:[]
    })
    }
}
const updateFav=async(user,favorites)=>{
    const docRef=doc(db,'Favorite',user?.primaryEmailAddress?.emailAddress);
    try{
        await updateDoc(docRef,{
            favorites:favorites
        })
    }catch(e){

    }
}
export default{
    GetFavList,
    updateFav
}