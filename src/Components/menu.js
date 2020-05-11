import React from "react";
import { Button, Text, Select, Slider } from "./components.js";

class LoadGame extends React.Component {
  constructor() {
    super();
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    e.persist();
  }

  render() {
    return (
      <>
        <div>Load Game constructor</div>
        <div className="button" onClick={this.handleEvent}>
          New
        </div>
      </>
    );
  }
}

// new game form
class NewGame extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      selection: 'new',
      config: {
        name: '',
        playernum: 1,
        mapsize: 'small',
        ratio: {
          land: '50',
          forest: '30',
          hills: '30',
          mountains: '10'
        }
      }
    };
  }

/// falta acertar o update VERIFICAR

  onChange(item) {
    if ( item.hasOwnProperty('click') ) {
       this.props.onSelection(this.state);
    } else {
      let obj = {...this.state.config};
      if ( ['land','forest','hills','mountains'].includes(Object.keys(item)[0]) ) {
        obj['ratio'][Object.keys(item)[0]] =  Object.values(item)[0];
      } else obj[Object.keys(item)[0]] =  Object.values(item)[0];
      this.setState({config:  {...obj}});
    }
  }

  render() {
    const playernumber = [1, 2, 3, 4, 5, 6, 7, 8];
    const mapsize = ["small", "medium", "large", "huge"];
    return (
      <>
        <div className="inputmenu">
          <Text onChange={this.onChange} name="name">Player name:</Text>
          <Select items={playernumber} onChange={this.onChange} name="playernum">Number of players:</Select>
          <Select items={mapsize} onChange={this.onChange} name="mapsize">Map size:</Select>
          <Slider value={this.state.ratio.land} onChange={this.onChange} name="land">Land ratio</Slider>
          <Slider value={this.state.ratio.forest} onChange={this.onChange} name="forest">Forest ratio</Slider>
          <Slider value={this.state.ratio.hills} onChange={this.onChange} name="hills">Hills ratio</Slider>
          <Slider value={this.state.ratio.mountains} onChange={this.onChange} name="mountains">Mountains ratio</Slider>
          <Button primary onClick={this.onChange} >Start Game</Button>
        </div>
      </>
    );
  }
}

// menu
export default class Menu extends React.Component {
  // contructor
  constructor() {
    super();
    this.state = { selection: 0 };
    this.callback = null;
    this.onMenuSelection = this.onMenuSelection.bind(this);
    this.onSelection = this.onDataSelection.bind(this);
  }
  // on click event
  onMenuSelection(e) {
    e.persist();
    switch (e.target.innerText) {
      case "New Game":
        this.setState({ selection: 1 });
        break;
      case "Load Game":
        this.setState({ selection: 2 });
        break;
      case "Credits":
        this.setState({ selection: 3 });
        break;
      default:
        break;
    }
  }

  // on data selection
  onDataSelection(data) {
    this.props.useCallback(data);
  }

  // render m
  render() {
    //this.callback = Object.assign({}, this.props);
    //console.log(this.callback);

    const elements = ["New Game", "Load Game", "Credits"];
    const items = [];
    switch (this.state.selection) {
      case 0:
        // display menu options
        for (const [index, value] of elements.entries()) {
          items.push(
            <li key={index} onClick={this.onMenuSelection}>
              {value}
            </li>
          );
        }
        return (
          <div className="appmenu">
            <ul>{items}</ul>
          </div>
        );
      case 1:
        return <NewGame onSelection={this.onSelection} />;
      case 2:
        return <LoadGame onSelection={this.onSelection} />;
      case 3:
        return "Credits";
      default:
        break;
    }
  }
}


