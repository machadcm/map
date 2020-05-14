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
      },
      player: 0
    };
    this.data = null;
  }

  // set up triggers
  componentDidMount() {
    // set up triggers
    // window.addEventListener("resize", this.handleResize.bind(this));
    // save canvas context
    // this.setState({ context: this.refs.canvas.getContext("2d") });
  }

  /*
  // remove triggers
  componentWillUnmount() {
   window.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    this.player[this.state.player].turn();
  }
  */

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
    console.log("Player");
    //this.setState({ player: this.props.player });
    this.player = this.props.player;
    /*
    if (this.player.human) {
      return "player: " + this.props.player.id;
    } else {
      return "not humman";
    }
*/
    const canvasRef = React.createRef(null);
    return (
      <div>
        <canvas
          ref={canvasRef}
          width={this.state.screen.width * this.state.screen.devicePixelRatio}
          height={this.state.screen.height * this.state.screen.devicePixelRatio}
        />
      </div>
    );
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
    this.state = { player: 0 };
    this.handleCallback = this.handleCallback.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  handleCallback(status) {
    if (status === "endturn") {
      // if end turn increment player
      this.setState({
        player: (this.state.player + 1) % this.props.data.playernum
      });
    }
  }

  render() {
    console.log(this.props);
    //return <div>GAME</div>;

    return (
      <>
        <Header />
        <Screen player={this.props.data.players[this.state.player]} />
        <Footer />
      </>
    );
  }
}
