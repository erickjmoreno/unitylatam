import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./AuthContext";

ReactDom.render(
	<AuthProvider>
		<Router>
			<App />
		</Router>
	</AuthProvider>,
	document.getElementById("root")
);
