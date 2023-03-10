import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppWrapper from "./AppWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route path='/' component={AppWrapper} />
			</Switch>
		</Router>
	</React.StrictMode>
);
