import { useEffect, useState } from "react";
import firebase from "../service/firebase";

export const useAuth = () => {
	const [user, setUser] = useState<firebase.User>();
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error>();

	const auth = firebase.auth();
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = (user: firebase.User | null) => {
		if (user) {
			setUser(user);
		} else {
			setUser(undefined);
		}

		setIsLoading(false);
	};

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((res) => {
				handleUser(res.user);
			})
			.catch((error: firebase.auth.Error) => setAuthError(error));
	};

	const signOut = () => {
		auth.signOut().then(() => handleUser(null));
	};

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, []);

	return { user, isLoading, authError, signIn, signOut };
};
