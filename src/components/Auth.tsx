import { useAuth } from "../hooks/useAuth";

export default function Auth() {
	const { signIn } = useAuth();

	return (
		<div>
			<button className="button" onClick={signIn}>
				<i className="fab fa-google"></i>Sign in with google
			</button>
		</div>
	);
}
