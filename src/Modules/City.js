const INITIAL_LEVEL = 1;
const INITIAL_HAPINESS = 1;
const HUMAN = 0;
const AUTO = 1;

export const CITY = 0x01;
export const MONESTERY = 0x02;
export const HOTPOST = 0x04;
export const KEEP = 0x08;

export class city {
  //
  // constuctor
  constructor(player, name, tribe, type, pos) {
    this._info = {
      player: player,
      name: name,
      tribe: tribe,
      type: type,
      coordinates: pos
    };
    this._population = {
      nobles: 0,
      cleric: 0,
      craftsmen: 0,
      merchants: 0,
      pleasant: 0,
      servent: 0
    };
    this._level = {
      tax: 0,
      level: INITIAL_LEVEL,
      hapiness: INITIAL_HAPINESS,
      health: 0,
      religion: 0,
      security: 0
    };
    this._buildings = [];
    this._goods = {
      stock: {},
      production: {},
      supply: {},
      demand: {},
      import: {},
      export: {},
      trade: []
    };
  }

  get coordinates() { return this._info.coordinates;}

  // calculate health level
  health() {
    // Health = food_level * plagues
  }

  // calculate happines level
  happiness() {
    // Happiness = security * health * religion * 1/tax
    this._level.hapiness =
      this._level.security *
      this._level.health *
      this._level.religion *
      (this._level.tax ? 1 / this._level.tax : 1);
  }

  // calculate security
  security() {
    // Security = army_protection * fortress_level
  }

  // add new building to
  building(buildtype) {}

  // calculate city growth
  growth() {}

  auto() {}

  turn() {
    this.growth();

    // add imports to trade

    // foreach building calculate production with existing stock
    this._buldings.forEach(item => {
      item.turn(this._goods.stock);
    });
    // for each building calculate demand and supply at current procuction capacity
    this._buildings.forEach(item => {
      item.production(this._goods.supply, this._goods.demand);
    });

    // calculate trade list (trade = stock - demand )
  }

  // render city window
  render(id) {

    var el = document.createElement('div');
    el.setAttribute("id", "city");
    el.setAttribute("class", "right-menu");
    document.getElementById(id).appendChild(el);
    
  }

  // handleEvent
  handleEvent(e) {
    
  }
}