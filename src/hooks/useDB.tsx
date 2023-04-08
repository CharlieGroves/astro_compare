import { db } from "../service/firebase";
import {
	DocumentSnapshot,
	DocumentData,
	doc,
	getDoc,
	updateDoc,
	collection,
} from "firebase/firestore";

export function useDB() {
	const userRef = collection(db, "users");

	const getUserByUID = async (
		uid: string
	): Promise<DocumentSnapshot<DocumentData>> => {
		console.log("get user by id");
		const data = await getDoc(doc(db, "users", uid));
		return data;
	};

	const updateUserDescriptionByUID = async (
		uid: string,
		description: string
	) => {
		updateDoc(doc(userRef, uid), {
			description: description,
		});
	};

	return { getUserByUID, updateUserDescriptionByUID };
}
