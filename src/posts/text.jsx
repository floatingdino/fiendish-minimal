import { h, Component } from "preact";

export default class TextPost extends Component {
  componentDidMount() {
    this.props.loadPost();
  }
  render(props) {
    return <div dangerouslySetInnerHTML={{ __html: props.Body }} />;
  }
}
