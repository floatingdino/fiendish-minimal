import { h, Component, render } from "preact";

import Header from "./header";
import Home from "./pages/home";

export default class Tumblog extends Component {
  render(props, state) {
    return (
      <div class={`wrapper ${props.page.type}`}>
        <Header {...props.blog} />
        <Home Posts={props.Posts} />
      </div>
    );
  }
}
