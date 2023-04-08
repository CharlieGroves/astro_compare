import { useCallback, useEffect, useState } from "react";
import firebase, { db } from "../service/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export const useAuth = () => {
	const userRef = collection(db, "users");
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error | null>(
		null
	);

	const auth: firebase.auth.Auth = firebase.auth();
	const provider: firebase.auth.GoogleAuthProvider =
		new firebase.auth.GoogleAuthProvider();

	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = useCallback(
		(user: firebase.User | null): void => {
			console.log("handle user", user);
			setUser(user);
			
			user && updateDoc(doc(userRef, user.uid), {
				displayName: user.displayName,
				photoURL: user.photoURL,
				uid: user.uid,
				email: user.email,
			});
			setIsLoading(false);
		},
		[userRef]
	);

	const signIn = (): void => {
		auth.signInWithPopup(provider)
			.then((res: firebase.auth.UserCredential): void => {
				handleUser(res.user);
			})
			.catch((error: firebase.auth.Error): void => setAuthError(error));
	};

	const signOut = (): void => {
		auth.signOut().then((): void => handleUser(null));
	};

	useEffect(() => {
		console.log("unsubscribe")
		const unsubscribe = auth.onIdTokenChanged((user) => handleUser(user));
		return () => unsubscribe();
	}, [auth, handleUser]);

	console.log(user)

	return { user, isLoading, authError, signIn, signOut };
};
