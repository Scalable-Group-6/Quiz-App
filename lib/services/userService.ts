import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { User } from "../models/UserModel";
import { db } from "../firebase";

async function createUser(user: User) {
  try {
    const userRef = doc(db, "users", user.id as string);
    await setDoc(userRef, user);
  } catch (error) {
    throw error;
  }
}
async function getUserById(id: string): Promise<User> {
  try {
    const userRef = doc(db, "users", id);
    const userData = await getDoc(userRef);
    return userData.data() as User;
  } catch (error) {
    return {} as User;
    throw error;
  }
}
async function getUserByEmail(email: string): Promise<User> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );

    const userData = await getDocs(userRef);
    // console.log(userData.docs[0].data());
    return userData.docs[0].data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {} as User;
  }
}

const userService = {
  createUser,
  getUserByEmail,
  getUserById,
};
export default userService;
