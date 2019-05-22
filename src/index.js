import { h, render } from "preact";

import Tumblog from "./tumblog";

import data from "./data.js";

render(<Tumblog {...data} />, document.body);
