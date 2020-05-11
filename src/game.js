import React from "react";

// header
// includes menu and general information
class Header extends React.Component {
  render() {
    return null;
  }
}

// display map and control selections
//
class Screen extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    };
  }

  // set up triggers
  componentDidMount() {
    // set up triggers
    window.addEventListener("resize", this.handleResize.bind(this));
    // save canvas context
    this.setState({ context: this.refs.canvas.getContext("2d") });
  }

  // remove triggers
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {}

  // handle screen resize
  handleResize() {
    this.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    });
  }

  render() {
    return null;
    /*
    return (
      <div>
        <canvas ref="canvas" 
          width={this.state.screen.width * this.state.screen.devicePixelRatio}
          height={this.state.screen.height * this.state.screen.devicePixelRatio} 
        />
      </div>
    );
    */
  }
}

// footer, includes turn button
class Footer extends React.Component {
  render() {
    return null;
  }
}

//
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = { selection: 0, config: null };
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback() {}

  render() {
    console.log(this.props);
    return <div>GAME</div>;
    /*
    return (
      <>
        <Header />
        <Screen />
        <Footer />
      </>
    );
    */
  }
}
