import { h, Component, render } from "preact";

import Header from "./header";
import Post from "./post";

export default class Tumblog extends Component {
  render(props, state) {
    return (
      <div>
        <Header {...props.blog} />
        <main id="content">{props.Posts.map(post => <Post {...post} />)}</main>
      </div>
    );
  }
}
