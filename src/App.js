import React from "react";

import Menu from "./Components/menu.js";
import Build from "./build.js";
import Game from "./game.js";

import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    //this.state = { selection: 'none', config: null };
    this.handleCallback = this.handleCallback.bind(this);

    this.state = {
      selection: "build",
      config: {
        name: "xpto",
        playernum: 4,
        mapsize: "small",
        ratio: {
          land: "50",
          forest: "30",
          hills: "30",
          mountains: "10"
        }
      },
      data: {}
    };
  }

  handleCallback(data) {
    console.log("handleCallBack@Menu");
    console.log(data);
    switch (data.selection) {
      case "new":
        this.setState({ selection: "build" });
        break;
      case "load":
        this.setState({ selection: "game", config: data.config });
        break;
      case "build":
        this.setState({ selection: "game", config: data.config });
        console.log(this.state);
        break;
      default:
        break;
    }
  }

  render() {
    switch (this.state.selection) {
      case "none": // display entry menu
        return <Menu useCallback={this.handleCallback} />;
      case "build": // build map and data
        return (
          <Build config={this.state.config} useCallback={this.handleCallback} />
        );
      case "game": // start game
        return (
          <Game data={this.state.config} useCallback={this.handleCallback} />
        );
      default:
        return (
          <div className="App">
            <h1>Hello</h1>
            <h2>Something to see..</h2>
          </div>
        );
    }
  }
}
