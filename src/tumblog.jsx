import { h, Component, render } from "preact";

import Post from "./post";

export default class Tumblog extends Component {
  render(props, state) {
    return (
      <div>
        <h1>hello world</h1>
        {props.Posts.map(post => <Post {...post} />)}
      </div>
    );
  }
}
