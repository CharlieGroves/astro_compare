import React, {
	PropsWithChildren,
	useEffect,
	useState,
	useCallback,
} from "react";
import { useDB } from "../hooks/useDB";
import "../css/Profile.css";
import { DocumentData } from "firebase/firestore";
import { getAuth, updateCurrentUser } from "firebase/auth";
import Editing from "./Editing";

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

export default function Profile(props: PropsWithChildren<matchParams>) {
	const { uid } = props.match.params;
	const { getUserByUID, updateUserDescriptionByUID } = useDB();

	const auth = getAuth();
	const user = auth.currentUser;

	const [userData, setUserData] = useState<
		userDataInterface | DocumentData | undefined
	>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [updateDescriptionLoading, setUpdateDescriptionLoading] =
		useState(false);
	const [editing, setEditing] = useState(false);
	const [description, setDescription] = useState("");

	const getUserData = useCallback(async () => {
		let a = (await getUserByUID(uid)).data();
		setUserData(a);
		setIsLoading(false);
	}, [uid, getUserByUID]);

	useEffect(() => {
		!userData && isLoading && getUserData();
		userData && setDescription(userData.description);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const updateDescription = async () => {
		setUpdateDescriptionLoading(true);
		await updateUserDescriptionByUID(user!.uid, description);
		await getUserData();
		setUpdateDescriptionLoading(false);
		setEditing(false);
	};

	return (
		<div id="profile-container">
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
								{userData && !user ? (
									<div id="user-profile-description">
										{userData.description}
									</div>
								) : user &&
								  userData.uid === user.uid &&
								  !editing ? (
									<div id="profile-description-editing-box">
										<div id="user-profile-description">
											{userData.description}
										</div>
										<Editing setEditing={setEditing} />
									</div>
								) : (
									<>
										<textarea
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
										></textarea>
										<button
											disabled={updateDescriptionLoading}
											onClick={() => updateDescription()}
										>
											Save
										</button>
									</>
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
