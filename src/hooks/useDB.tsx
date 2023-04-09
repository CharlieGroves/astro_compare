import { db } from "../service/firebase";
import {
	DocumentSnapshot,
	DocumentData,
	doc,
	getDoc,
	updateDoc,
	collection,
	deleteDoc,
} from "firebase/firestore";
import { useAuth } from "./useAuth";
import { Redirect } from "react-router-dom";

export function useDB() {
	const userRef = collection(db, "users");
	const { signOut } = useAuth();

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

	const deleteAccount = async (
		uid: string,
		setAccountBeingDeleted: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		setAccountBeingDeleted(true);
		console.log("deleting...");
		signOut();
		await deleteDoc(doc(userRef, uid));
		setAccountBeingDeleted(false);
	};

	return { getUserByUID, updateUserDescriptionByUID, deleteAccount };
}
