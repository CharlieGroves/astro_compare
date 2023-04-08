import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpaceBackground from "./components/SpaceBackground";

import App from "./components/App";
import Account from "./components/Account";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<React.StrictMode>
		<SpaceBackground />
		<Router>
			<Header />
			<Switch>
				<Route path="/account/:uid" component={Account} />
				<Route exact path="/" component={App} />
			</Switch>
		</Router>
	</React.StrictMode>
);
