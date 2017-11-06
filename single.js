var React = require("react");
var Link = require("react-router").Link;

if (!React) {
  React = window.react;
}

if (!Link) {
  Link = window.router.Link;
}
/*
 * includes
 */

class Content extends React.Component {
  render() {
    let image, title, content, date;
    ({ image, title, content, date } = this.props);
    return (
      <section id="content" className="main">
        <span className="image main">
          <img src={image} style={{ marginTop: 80 }} />
        </span>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    );
  }
}

class Footer extends React.Component {
  render() {
    let { footerWidgets } = this.props;
    return (
      <footer id="footer">
        {footerWidgets &&
          footerWidgets.map((fw, i) => <section key={i}>{fw}</section>)}
        <p className="copyright">Rendact Team</p>
      </footer>
    );
  }
}

class Header extends React.Component {
  render() {
    let logo, title, tagline;
    ({ logo, title, tagline } = this.props);
    return (
      <header id="header">
        {logo && (
          <span className="logo">
            <img src={logo} style={{ maxHeight: 85, maxWidth: 85 }} />
          </span>
        )}
        <h1>{title}</h1>
        <p>{tagline}</p>
      </header>
    );
  }
}

class Main extends React.Component {
  componentDidMount() {
    document.getElementById("root").style = "";
    document.getElementById("router").style = "";
  }
  render() {
    let { children, className } = this.props;
    return (
      <div id="main" className={className ? className : null}>
        {this.props.children}
      </div>
    );
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  handleOnScroll(e) {
    let navControl, footer;
    navControl = document.getElementById("navControl");
    footer = document.getElementById("footer");

    let rect = navControl && navControl.getBoundingClientRect();

    let footerRect = footer && footer.getBoundingClientRect();

    if (rect.top <= window.pageXOffset) {
      this.nav && this.nav.classList.add("alt");
    } else {
      this.nav && this.nav.classList.remove("alt");
    }

    if (footerRect.top + rect.height <= window.pageXOffset) {
      this.nav && this.nav.classList.remove("alt");
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }
  componentWillUnMount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }
  render() {
    let theMenu = this.props.theMenu();
    return (
      <div>
        <div id="navControl" />
        <nav id="nav" ref={nav => (this.nav = nav)}>
          {theMenu.props.menuItems.length ? (
            <ul className="icons" style={{ position: "absolute" }}>
              <li>
                <Link to="/" className="icon fa-home">
                  {" "}
                  Home
                </Link>
              </li>
            </ul>
          ) : null}
          {theMenu}
        </nav>
      </div>
    );
  }
}

class PostList extends React.Component {
  render() {
    let { image, content, title, date, id } = this.props;
    return (
      <section className="row">
        <div className="8u">
          <h2 style={{ textTransform: "capitalize" }}>
            <Link to={"/post/" + id}>{title}</Link>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: content }} />
          <ul className="actions align-right">
            <li>
              <Link to={"/post/" + id} className="button">
                Read More
              </Link>
            </li>
          </ul>
        </div>
        <div className="4u">
          <span className="image fit">
            <img src={image} />
          </span>
        </div>
      </section>
    );
  }
}

/*
 * Layouts
 */

export class Blog extends React.Component {
  renderPostList(data, thePagination) {
    return (
      <section className="main">
        {data &&
          data.map(post => (
            <PostList
              key={post.id}
              title={post.title}
              content={post.content && post.content.trim().slice(0, 100)}
              image={
                post.imageFeatured
                  ? post.imageFeatured.blobUrl
                  : require("images/logo-128.png")
              }
              id={post.id}
            />
          ))}
        {thePagination}
      </section>
    );
  }

  componentDidMount() {
    require("./main.css");
  }
  render() {
    let { latestPosts, thePagination, loadDone, theConfig } = this.props;
    return (
      <div id="wrapper">
        <Header
          title={(theConfig && theConfig.name) || "Rendact"}
          tagline={
            (theConfig && theConfig.tagline) || "Just another rendact blog"
          }
          logo={
            (theConfig && theConfig.logo) || require("images/logo-circle.svg")
          }
        />
        <Nav {...this.props} />
        <Main>
          {latestPosts ? this.renderPostList(latestPosts, thePagination) : null}
        </Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export class Home extends React.Component {
  renderPostList(data, thePagination) {
    return (
      <section className="main">
        {data &&
          data.map(post => (
            <PostList
              key={post.id}
              title={post.title}
              content={post.content && post.content.trim().slice(0, 100)}
              image={
                post.imageFeatured
                  ? post.imageFeatured.blobUrl
                  : require("images/logo-128.png")
              }
              id={post.id}
            />
          ))}
        {thePagination}
      </section>
    );
  }

  componentDidMount() {
    require("./main.css");
  }
  render() {
    let { data, thePagination, loadDone, theConfig } = this.props;
    return (
      <div id="wrapper">
        <Header
          title={(theConfig && theConfig.name) || "Rendact"}
          tagline={
            (theConfig && theConfig.tagline) || "Just another rendact blog"
          }
          logo={
            (theConfig && theConfig.logo) || require("images/logo-circle.svg")
          }
        />
        <Nav {...this.props} />
        <Main>
          {loadDone ? (
            theConfig.frontPage === "page" ? (
              <Content content={data && data.content} />
            ) : (
              this.renderPostList(data, thePagination)
            )
          ) : null}
        </Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export class Single extends React.Component {
  componentDidMount() {
    require("./main.css");
  }
  render() {
    let { theConfig, postData } = this.props;
    return (
      <div id="wrapper">
        <Header title={postData.title} />
        <Nav {...this.props} />
        <Main>
          <Content
            image={
              postData.imageFeatured
                ? postData.imageFeatured.blobUrl
                : require("images/logo-128.png")
            }
            content={postData.content}
          />
        </Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export const widgetArea = ["Sidebar", "Single", "Footer"];
