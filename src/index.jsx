import { h, render } from "preact";

// import "../rf_mnml";
import Tumblog from "./tumblog";

// import data from "./data.js"

render(<Tumblog {...data} />, document.body, document.getElementById("root"));

if (window.navigator.userAgent.indexOf("MSIE ") > 0) {
  const promisePolyfill = document.createElement("script");
  promisePolyfill.setAttribute("type", "text/javascript");
  promisePolyfill.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.0/lib/index.min.js"
  );
  const fetchPolyfill = document.createElement("script");
  fetchPolyfill.setAttribute("type", "text/javascript");
  fetchPolyfill.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/whatwg-fetch@2.0.4/fetch.min.js"
  );

  document.body.appendChild(fetchPolyfill);
  document.body.appendChild(promisePolyfill);
}
