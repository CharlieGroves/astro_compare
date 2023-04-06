import { useEffect, useState } from "react";
import firebase from "../service/firebase";

export const useAuth = () => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error | null>(
		null
	);

	const auth: firebase.auth.Auth = firebase.auth();
	const provider: firebase.auth.GoogleAuthProvider =
		new firebase.auth.GoogleAuthProvider();

	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = (user: firebase.User | null): void => {
		setUser(user);
		setIsLoading(false);
	};

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
		const unsubscribe = auth.onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, []);

	return { user, isLoading, authError, signIn, signOut };
};
