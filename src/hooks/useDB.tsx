import { db } from "../service/firebase";
import {
    DocumentSnapshot,
    DocumentData,
	doc,
	getDoc,
} from "firebase/firestore";

export function useDB() {
	const getUserByUID = async (uid: string):Promise<DocumentSnapshot<DocumentData>> => {
		console.log("get user by id")
		const data = await getDoc(doc(db, "users", uid))
        return data;
	};

	return { getUserByUID };
}
