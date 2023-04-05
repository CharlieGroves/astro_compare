import React from "react";
import { signInWithGoogle } from "../service/firebase";

export default function Auth() {
	return (
		<div>
			<button className="button" onClick={signInWithGoogle}>
				<i className="fab fa-google"></i>Sign in with google
			</button>
		</div>
	);
}
