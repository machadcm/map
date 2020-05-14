import React from "react";
import { mapIso } from "./Modules/Map.js";
import Player from "./Modules/Player.js";

const mapsize = {
  small: { width: 100, height: 100 },
  medium: { width: 100, height: 100 },
  large: { width: 100, height: 100 },
  huge: { width: 100, height: 100 }
};

const loadingLabels = [
  "Building world...",
  "Adding mountains...",
  "Adding rivers...",
  "Add players...",
  "Add cities..."
];

// define map build const
const terrainType = { ocean: 1, land: 2, florest: 3, hills: 4, mountains: 5 };

const SMALLBLOCK = 10;

class mapCreation {
  constructor(mapsize, ratio) {
    this._mapsize = mapsize;
    this._ratio = ratio;
    this._halfmap = [];
    this._map = [];
  }

  get map() {
    return this._map;
  }

  // create small map
  createSmallMap() {
    // define sea and land areas
    var smallmap = [];
    var maxx = Math.round(this._mapsize.width / SMALLBLOCK);
    var maxy = Math.round(this._mapsize.height / SMALLBLOCK);

    for (var x = 0; x < maxx; x++) {
      smallmap[x] = [];
      for (var y = 0; y < maxy; y++) {
        if (
          x === 0 ||
          x === maxx - 1 ||
          y === 0 ||
          y === maxy - 1 ||
          Math.round(Math.random() * 100) > this._ratio.land
        )
          smallmap[x][y] = terrainType.ocean;
        else smallmap[x][y] = terrainType.land;
      }
    }

    // convert small map to map
    this._halfmap = [];
    for (y = 0; y < this._mapsize.width / 2; y++) {
      this._halfmap[y] = [];
      for (x = 0; x < this._mapsize.height / 2; x++) {
        this._halfmap[y][x] =
          smallmap[Math.floor(x / (SMALLBLOCK / 2))][
            Math.floor(y / (SMALLBLOCK / 2))
          ];
      }
    }
    // adapt shores
    loopMap(this._halfmap, 1, terrainType.land, terrainType.ocean, 40);
    loopMap(this._halfmap, 1, terrainType.ocean, terrainType.land, 30);

    function loopMap(map, loop, testTile, changeTile, prob) {
      for (var l = 0; l < loop; l++) {
        for (x = 1; x < map.length - 1; x++)
          for (y = 1; y < map[x].length - 1; y++)
            if (
              map[x][y] === testTile &&
              (map[x - 1][y] === changeTile ||
                map[x + 1][y] === changeTile ||
                map[x][y - 1] === changeTile ||
                map[x][y + 1] === changeTile) &&
              Math.round(Math.random() * 100) < prob
            )
              map[x][y] = changeTile;
      }
    }
  }

  addHillsAndMountains() {
    for (var x = 1; x < this._halfmap.length - 1; x++)
      for (var y = 1; y < this._halfmap[x].length - 1; y++) {
        //if no coast
        if (
          this._halfmap[x][y - 1] !== terrainType.ocean &&
          this._halfmap[x + 1][y] !== terrainType.ocean &&
          this._halfmap[x + 1][y + 1] !== terrainType.ocean &&
          this._halfmap[x - 1][y] !== terrainType.ocean
        ) {
          if (Math.round(Math.random() * 100) < this._ratio.forestRatio)
            this._halfmap[x][y] = terrainType.florest;
          else if (Math.round(Math.random() * 100) < this._ratio.hillsRatio)
            this._halfmap[x][y] = terrainType.hills;
          else if (Math.round(Math.random() * 100) < this._ratio.mountainRatio)
            this._halfmap[x][y] = terrainType.mountains;
        }
      }
  }

  // add different type of terrain depending of longituge
  addTerrain() {}

  convertHalfToFullMap() {
    for (var y = 0; y < this._halfmap.length; y++) {
      var a = [],
        b = [];
      for (var x = 0; x < this._halfmap[0].length; x++) {
        a.push(this._halfmap[y][x]);
        a.push(this._halfmap[y][x]);
        b.push(this._halfmap[y][x]);
        b.push(this._halfmap[y][x]);
      }
      this._map.push(a);
      this._map.push(b);
    }

    // filter out some to make coast not linear
    for (x = 0; x < this._width; x++)
      for (y = 0; y < this._heigth; y++) {
        if (
          [
            terrainType.florest,
            terrainType.hills,
            terrainType.mountains
          ].includes(this._map[x][y]) &&
          Math.round(Math.random() * 100) > 70
        )
          this._map[x][y] = terrainType.land;
      }
  }

  addRivers() {
    // create add rivers logic
  }
}

export default class Build extends React.Component {
  constructor() {
    super();
    this.state = { flow: 0 };
    this._config = {
      map: null,
      players: [],
      cities: [],
      armies: []
    };
    this._map = null;
  }

  componentDidMount() {
    this.setState({ flow: this.state.flow + 1 });
  }

  // process flow
  componentDidUpdate() {
    switch (this.state.flow) {
      case 0:
        break;
      case 1:
        // build world
        this._map.createSmallMap();
        break;
      case 2:
        // Add mountains, hills and forrests
        this._map.addHillsAndMountains();
        break;
      case 3:
        // Add rivers
        this._map.convertHalfToFullMap();
        this._map.addRivers();
        break;
      case 4:
        // Add players
        this._config.map = new mapIso(this._map.map);

        let human = Math.round(Math.random() * (this._config.playernum - 1));
        for (let p = 0; p < this._config.playernum; p++)
          if (p === human) {
            this._config.players.push(
              new Player(
                p,
                this.props.name,
                true,
                this.props.tribe,
                this._config.map,
                this._config.cities,
                this._config.armies
              )
            );
          } else
            this._config.players.push(
              new Player(
                p,
                null,
                false,
                null,
                this._config.map,
                this._config.cities,
                this._config.armies
              )
            );
        break;
      case 5:
        // Add cities
        break;
      case 6:
      default:
        // return config
        this.props.useCallback({
          selection: "build",
          config: { ...this._config }
        });
        break;
    }
    // change flow state
    this.setState({ flow: this.state.flow + 1 });
  }

  // render component
  render() {
    // save props
    if (this.state.flow === 0) {
      this._config.playernum = this.props.config.playernum;
      this._config.mapsize = mapsize[this.props.config.mapsize];
      this._map = new mapCreation(
        this._config.mapsize,
        this.props.config.ratio
      );
      //this.setState({flow: 1})
    }
    return (
      <label className="loading">{loadingLabels[this.state.flow - 1]}</label>
    );
  }
}

//console.log(arguments.callee.name)
