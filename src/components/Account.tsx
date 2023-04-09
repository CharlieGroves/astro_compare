import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDB } from "../hooks/useDB";
import { DocumentData } from "firebase/firestore";
import { useHistory } from "react-router-dom";

interface userDataInterface {
	displayName: string;
	email: string;
	photoURL: string;
	uid: string;
	description: string | null;
}

export default function Account() {
	const { user } = useAuth();
	const { getUserByUID, deleteAccount } = useDB();
	const history = useHistory();

	const [wantToDelete, setWantToDelete] = useState(false);
	const [accountBeingDeleted, setAccountBeingDeleted] = useState(false);

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

	const deleteAccountHandler = () => {
		history.push("/");
		deleteAccount(userData!.uid, setAccountBeingDeleted);
	};

	return (
		<div>
			{userData ? (
				<div>
					<div id="delete-account-container">
						{!wantToDelete ? (
							<div
								onClick={() => setWantToDelete(true)}
								id="delete-account-button"
								className="delete-button"
							>
								Delete Account
							</div>
						) : (
							<div id="delete-account-confirm-container">
								Are you sure?
								<button
									disabled={accountBeingDeleted}
									onClick={() => deleteAccountHandler()}
									id="go-back-delete-account"
									className="delete-button"
								>
									Yes
								</button>
								<div
									onClick={() => setWantToDelete(false)}
									id="confim-delete-account"
									className="delete-button"
								>
									Go back
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}
