import { h, render } from "preact";

import "preact/devtools";

import Tumblog from "./tumblog";

// import data from "./data.js";

import "../rf_mnml";

render(<Tumblog {...data} />, document.body);
