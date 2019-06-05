import { Component } from "preact";

export default class LoadablePost extends Component {
  componentDidMount() {
    if (this.props.Masonry() && this.props.Masonry().size) {
      this.props.Masonry().appended(this.frame);
    }
    // Find elements that change size after loading
    this.loadables = this.frame.querySelectorAll("img");
    // If they're cached they may not trigger a load event, so we check the "complete" attribute on mount
    this.preloaded = Array.prototype.reduce.call(
      this.loadables,
      (accumulator, loadable) => accumulator + (loadable.complete ? 1 : 0),
      0
    );
    if (this.preloaded >= this.loadables.length) {
      this.props.loadPost();
      this.setState({
        loaded: true
      });
    } else {
      this.loaded = this.preloaded;
      for (let i = this.loadables.length - 1; i >= 0; i--) {
        const loadable = this.loadables[i];
        loadable.addEventListener("load", () => this.handleLoad());
      }
    }
  }
  handleLoad() {
    this.loaded++;
    if (this.loaded >= this.loadables.length) {
      requestAnimationFrame(() => {
        this.props.loadPost();
        this.setState({
          loaded: true
        });
      });
    }
  }
}
