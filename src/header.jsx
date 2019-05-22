import { h, Component } from "preact";

export default class Header {
  render(props) {
    return (
      <header id="masthead">
        {props.ShowHeader ? (
          <div id="logo">
            <a href={props.BlogURL} title="Home">
              <img src={props.Header} alt={props.Title} />
            </a>
          </div>
        ) : (
          ""
        )}
        <div id="title-line" class={props.HeaderLineColour}>
          {props.ShowTitle ? (
            <h1 id="title">
              <a href={props.BlogURL} title="Home">
                {props.Title}
              </a>
              <svg
                onClick="titleSlider(0)"
                width="52"
                height="52"
                id="hamburger">
                <title>show menu</title>
                <rect x="5" y="9.5" width="42" height="7" />
                <rect x="5" y="22.5" width="42" height="7" />
                <rect x="5" y="35.5" width="42" height="7" />
              </svg>
            </h1>
          ) : (
            ""
          )}
          <nav id="pages-nav">
            {props.ShowTitle ? (
              <svg
                onClick="titleSlider(1)"
                width="52"
                height="52"
                id="cheeseburger">
                <title>show title</title>
                <rect x="5" y="9.5" width="42" height="7" />
                <rect x="5" y="22.5" width="18" height="7" />
                <rect x="29" y="22.5" width="18" height="7" />
                <rect x="5" y="35.5" width="42" height="7" />
              </svg>
            ) : (
              ""
            )}
            {props.Pages.map(page => <a href={page.URL}>{page.Label}</a>)}
            {props.AskEnabled ? <a href="/ask">{props.AskLabel}</a> : ""}
            {props.SubmissionsEnabled ? (
              <a href="/submit">{props.SubmitLabel}</a>
            ) : (
              ""
            )}
          </nav>
        </div>
      </header>
    );
  }
}
