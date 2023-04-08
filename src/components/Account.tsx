import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDB } from "../hooks/useDB";
import { DocumentData } from "firebase/firestore";

interface userDataInterface {
	displayName: string;
	email: string;
	photoURL: string;
	uid: string;
	description: string | null;
}

export default function Account() {
	const { user } = useAuth();
	const { getUserByUID } = useDB();

	const [userData, setUserData] = useState<
		userDataInterface | DocumentData | undefined
	>();

	const getUserData = useCallback(async () => {
		let a = (await getUserByUID(user!.uid)).data();
		setUserData(a);
	}, [user, getUserByUID]);

	useEffect(() => {
		user && getUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<div>
			{userData ? (
				<div>{userData.displayName}'s</div>
			) : (
				<div>loading...</div>
			)}
			Account
		</div>
	);
}
