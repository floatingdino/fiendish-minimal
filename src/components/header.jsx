import { h, Component } from "preact";

import { route } from "preact-router";

export default class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      navShown: false
    };
    this.hasNavLine = props.Pages.length || props.Ask || props.Submissions;
  }
  toggleNav() {
    this.setState({
      navShown: !this.state.navShown
    });
  }
  handleLink(e, url) {
    // Pass header links to router if they're local
    const relativeURL = url.replace(window.location.origin, "");
    if (!/^(https?:)?\/\//.test(relativeURL)) {
      e.preventDefault();
      route(relativeURL);
    }
  }
  render(props, state) {
    return (
      <header id="masthead">
        {props.ShowHeader && (
          <div id="logo">
            <a href="/" onClick={e => this.handleLink(e, "/")} title="Home">
              <img alt={props.Title} src={props.Header} />
            </a>
          </div>
        )}
        <div class={props.HeaderLineColour} id="title-line">
          {props.ShowTitle && (
            <h1 id="title" style={state.navShown && "margin-top: -54px"}>
              <a href="/" onClick={e => this.handleLink(e, "/")} title="Home">
                {props.Title}
              </a>
              {this.hasNavLine && (
                <svg
                  height="52"
                  id="hamburger"
                  onClick={() => this.toggleNav()}
                  width="52">
                  <title>show menu</title>
                  <rect height="7" width="42" x="5" y="9.5" />
                  <rect height="7" width="42" x="5" y="22.5" />
                  <rect height="7" width="42" x="5" y="35.5" />
                </svg>
              )}
            </h1>
          )}
          {this.hasNavLine && (
            <nav id="pages-nav">
              {props.ShowTitle && (
                <svg
                  height="52"
                  id="cheeseburger"
                  onClick={() => this.toggleNav()}
                  width="52">
                  <title>show title</title>
                  <rect height="7" width="42" x="5" y="9.5" />
                  <rect height="7" width="18" x="5" y="22.5" />
                  <rect height="7" width="18" x="29" y="22.5" />
                  <rect height="7" width="42" x="5" y="35.5" />
                </svg>
              )}
              {props.Pages.map(page => (
                <a
                  href={page.URL}
                  key={page.Label}
                  onClick={e => this.handleLink(e, page.URL)}>
                  {page.Label}
                </a>
              ))}
              {props.Ask && (
                <a href="/ask" onClick={e => this.handleLink(e, "/ask")}>
                  {props.Ask}
                </a>
              )}
              {props.Submissions && (
                <a href="/submit" onClick={e => this.handleLink(e, "/submit")}>
                  {props.Submissions}
                </a>
              )}
            </nav>
          )}
        </div>
      </header>
    );
  }
}
