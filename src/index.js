import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpaceBackground from "./SpaceBackground";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<SpaceBackground />
		<Router>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</Router>
	</React.StrictMode>
);
