import { Component } from "preact";

export default class LoadablePost extends Component {
  componentDidMount() {
    // Find elements that change size after loading
    this.loadables = this.frame.querySelectorAll("img,video");
    // If they're cached they may not trigger a load event, so we check the "complete" attribute on mount
    this.preloaded = Array.prototype.reduce.call(
      this.loadables,
      (accumulator, loadable) => accumulator + loadable.complete && 1,
      0
    );
    if (this.preloaded >= this.loadables.length) {
      this.props.loadPost();
    } else {
      this.loaded = this.preloaded;
      this.loadables.forEach(loadable => {
        loadable.addEventListener("load", () => this.handleLoad());
      });
    }
  }
  handleLoad() {
    this.loaded++;
    if (this.loaded >= this.loadables.length) {
      this.props.loadPost();
    }
  }
}
