import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore"
import app from "./firebase"
import bcrypt from "bcrypt"

const firestore = getFirestore(app)

export async function retrieveData() {
    const snapshot = await getDocs(collection(firestore, "product"))
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data
}

export async function retrieveDataById(collectionName: string, id: string) {
    const docRef = doc(firestore, collectionName, id)
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()
    return data
}

export async function signIn(userData: { email: string }) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    if (data) {
        return data[0]
    } else {
        return null
    }
}

export async function signUp(userData: { email: string, fullname: string, password: string, role?: string }, callback: Function) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    if (data.length > 0) {
        callback({ status: false, message: "Email already exists" })
    } else {
        userData.password = await bcrypt.hash(userData.password, 10)
        userData.role = "member"
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({ status: true, message: "Register Successfully" })
        }).catch((error) => {
            callback({ status: false, message: error })
        })
    }
}

export async function signInGoogle(userData: any, callback: any) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email))
    const snapshot = await getDocs(q)
    const data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    if (data.length > 0) {
        userData.role = data[0].role
        await updateDoc(doc(firestore, "users", data[0].id), userData).then(() => {
            callback({ status: true, message: "Sign In With Google Successfully", data: userData })
        }).catch(() => {
            callback({ status: false, message: "Sign In With Google Failed" })
        })
    } else {
        userData.role = "member"
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({ status: true, message: "Sign In With Google Successfully", data: userData })
        }).catch(() => {
            callback({ status: false, message: "Sign In With Google Failed" })
        })
    }
} 