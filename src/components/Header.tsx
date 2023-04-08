import Logo from "./Logo";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../css/Header.css";
import "../css/Dropdown.css";
import { getAuth } from "firebase/auth";

export default function Header() {
	const { signOut } = useAuth();
	const auth = getAuth()
	const user = auth.currentUser;

	return (
		<header id="header">
			<Logo />
			{!user ? (
				<SignIn />
			) : (
				<div>
					<div className="dropdown">
						<button className="dropbtn">
							<div className="header-display-name-div">
								Weclome&nbsp;
								<span className="header-display-name">
									{user.displayName}
								</span>
								&nbsp;
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
									fill="white"
									height={"20px"}
								>
									{/* Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
									<path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
								</svg>
							</div>
						</button>
						<div className="dropdown-content">
							<Link to={`/account`}>Account</Link>
							<Link to={`/account/${user.uid}`}>Profile</Link>
							<div onClick={() => signOut()}>Sign Out</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
