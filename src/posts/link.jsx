import { h, Component } from "preact";

export default class LinkPost extends Component {
  componentDidMount() {
    this.props.loadPost();
  }
  render(props) {
    return (
      <a href={props.URL}>
        {props.Host && <h3>{props.Host}</h3>}
        {props.Description && <p>{props.Description}</p>}
      </a>
    );
  }
}
