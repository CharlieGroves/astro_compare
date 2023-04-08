import React, {
	PropsWithChildren,
	useEffect,
	useState,
	useCallback,
} from "react";
import { useDB } from "../hooks/useDB";
import "../css/Account.css";
import { DocumentData } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface matchParams {
	match: {
		params: {
			uid: string;
		};
	};
}

interface userDataInterface {
	displayName: string;
	email: string;
	photoURL: string;
	uid: string;
	description: string | null;
}

export default function Account(props: PropsWithChildren<matchParams>) {
	const { uid } = props.match.params;
	const { getUserByUID } = useDB();

	const auth = getAuth()
	const user = auth.currentUser;

	const [userData, setUserData] = useState<
		userDataInterface | DocumentData | undefined
	>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getUserData = useCallback(async () => {
		let a = (await getUserByUID(uid)).data();
		setUserData(a);
		setIsLoading(false);
	}, [uid, getUserByUID]);

	useEffect(() => {
		!userData && isLoading && getUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	return (
		<div id="account-container">
			{isLoading ? (
				<div>loading</div>
			) : (
				<div>
					{userData ? (
						<div id="user-profile-container">
							<img
								src={`${userData.photoURL}`}
								alt={`${userData.displayName}'s profile`}
								id="user-profile-image"
							/>
							<div id="user-profile-data-container">
								<div id="user-profile-display-name">
									{userData.displayName}
								</div>
								{userData.uid === user!.uid ? (
									<div id="user-profile-description">
										{userData.description}
									</div>
								) : (
									<textarea
										value={userData.description}
									></textarea>
								)}
							</div>
						</div>
					) : (
						<div>No data</div>
					)}
				</div>
			)}
		</div>
	);
}
