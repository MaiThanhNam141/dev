import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db, auth } from "../../../firebase";

export const addToOrders = async() =>{
    const userDocRef = doc(db,"users",auth.currentUser.uid)
    const userDocSnapshot = await getDoc(userDocRef);
    if(userDocSnapshot.exists()){
        const userData = userDocSnapshot.data();
        const cartItems = userData.cart;
        const orderItems = orderItems||[];
        cartItems.map(item=>{
            orderItems.push({
                orderId: uuidv4().replace(/-/g, '').substring(0, 12),
                id:item.id,
                image:item.image,
                title:item.title,
                bookName:item.bookName,
                price:item.price,
                qty:item.qty,
                date: new Date().toLocaleString()
            })
        })
        await updateDoc(userDocRef,{orders:orderItems,cart:[]});
        console.log("Order Added")
        return {success:true,data:orderItems}
    }
}

export const getAllOrderItems = async ()=>{
    const userRef=doc(db,"users",auth.currentUser.uid)
    const userDocSnapshot = await getDoc(userRef)
    const data = userDocSnapshot.data().orders;
    return {success:true,data}
}