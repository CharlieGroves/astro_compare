import { useEffect, useState } from "react";
import firebase from "../service/firebase";

export const useAuth = () => {
	const [user, setUser] = useState<firebase.User | null>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error>();

	const auth = firebase.auth();
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = (user: firebase.User | null) => {
		setUser(user);
		setIsLoading(false);
	};

	const signIn = ():void => {
		auth.signInWithPopup(provider)
			.then((res) => {
				handleUser(res.user);
			})
			.catch((error: firebase.auth.Error) => setAuthError(error));
	};

	const signOut = ():void => {
		auth.signOut().then(() => handleUser(null));
	};

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, []);

	return { user, isLoading, authError, signIn, signOut };
};
