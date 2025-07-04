import { collection, getDocs, getFirestore } from "firebase/firestore"
import app from "./firebase"

const firestore = getFirestore(app)

export async function retrieveData() {
    const snapshot = await getDocs(collection(firestore, "product"))
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data
}