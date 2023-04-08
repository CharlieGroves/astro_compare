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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 576 512"
											height={"20px"}
											fill="white"
											onClick={() => setEditing(true)}
										>
											<path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
										</svg>
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
