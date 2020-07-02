//import {mapIso} from "./Map.js"


export default class Player {
  // constructor
  constructor(playerid, name, human, tribe, map, cities, armies) {
    this._id = playerid;
    this._name = name;
    this._tribe = tribe;
    this._human = human;
    this._map = map;
    this._cities = cities;
    this._armies = armies;
    // set mask map
    this._mapmask = this._map.createMask();
    this._gold = 1;
  }

  get id() {
    return this._id;
  }

  get tribe() {
    return this._tribe;
  }

  set capital(city) {
    this._capital = city;
  }

  get human() { return(this._human); }

  // define map mask
  mask() {
    // reset map mask (active to idle)
    this._map.unreset(this._mapmask);
    // map cities
    for (var city of this._cities) {
      if (city.player() === this._id) {
        this._map.mask(this._mapmask, city.coordinates(), 3); //city.visible(),
      }
    }
    // map mask armies
    for (var army in this._armies)
      if (army.payer === this._id)
        this._map.mask(this._mapmask, army.pos(), army.visible());
  }

  // turn
  turn() {
    // set map mask
    //this.mask();
    // if humman player
    if (this._human) {
      this._map.prepare(this._id, this._mapmask, this._cities, this._armies);
      // set map mask
      //this.mask();
      this._map.display(this._capital.coordinates());
      this._capital.render("screen");
    } else {
      // AI ...
    }
  }
}
