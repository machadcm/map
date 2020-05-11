/*

1. Mill: food multiplier
2. Farm: +food
3. Brewery: +happiness +growth
4. Castle: +defense
5. Church: +happiness +culture
6. Industry: +growth +wealth
7. Well: +sanitation +happiness
City: Only cities can contain these structures
1. Large Castle (upgraded from Castle): +defense
2. Fortifications: +defense
3. Theatre: +happiness +culture
4. Library: +happiness +culture +research
5. Market: +growth +wealth
6. Barracks
7. Range
8. Stable
9. Siege Workshop
Infrastructure: Region upgrades
1. Roads: +movement
Town: Any town
1. Guardhouse: +defense
Salt Town
1. Salt Works: +salt
2. Salt Trade: +wealth +growth
Mining Town
1. Iron Mine: +iron
2. Iron Trade: +wealth +growth
Quarry Town
1. Quarry: +iron
2. Stone Trade: +wealth +growth
Market Town
1. Market: +wealth +growth
2. Inn: +happiness
Harbor Town
1. Fishery: +growth +food
2. Military Harbor
3. Trade Port: +growth +wealth
Logging Town
1. Hunting Lodge: +food +wealth
2. Woodcutter: +wood

*/

const buldings = {
  farm: { level: 1, turns: 1, cost: 0, demand: {}, supply: { food: 1 }, social: {}, workers: 100 },
  mill: { level: 1, turns: 1, cost: 1, demand: {}, supply: { food: 1 }, social: {}, workers: 100 }
};

export class building {
  constructor(player, name, type, tribe, pos) {
    this._info = {
      player: player,
      name: name,
      tribe: tribe,
      type: type,
      coordinates: pos
    };
    this._status = {
      build: building[this._info.type].turns,
      level: 0,
      health: 0,
      workers: 0,
      maxworkers: building[this._info.type].workers
    };
  }

  // return building information
  get info() { return this._info; }

  // return building status
  get status() { return this._status; }

  // set workers
  set workers(wrk) { this._status.workers = wrk; }

  // set current production needs and outcome
  social(scl) {
    if (this._status.level) {
      var productionratio =
        (this._status.level * this._status.health * this._status.workers) /
        (building[this._type].workers * this._status.level);
      // set supply and demand lists
      for (var item in building[this._type].social)
        scl[item] += this.building[this._type].social[item] * productionratio;
    }
  }

  // set current production needs and outcome
  production(supply, demand) {
    if (this._status.level) {
      var productionratio =
        (this._status.level * this._status.health * this._status.workers) /
        (building[this._type].workers * this._status.level);
      // set supply and demand lists
      for (var item in building[this._type].demand)
        demand[item] +=
          this.building[this._type].demand[item] * productionratio;
      for (item in building[this._type].supply)
        supply[item] +=
          this.building[this._type].supply[item] * productionratio;
    }
  }

  // building turn
  turn(stock) {
    // check if in upgrade
    if (this._build > 0) this._build--;
    else {
      if (this._build === 0) {
        this._status.level++;
        this._maxworkers =
          building[this._info.type].workers * this._status.level;
        this._build = -1;
      }
    }

    if (this._status.level) {
      // check if demand exists on stock
      var productionratio =
        (this._status.level * this._status.health * this._status.workers) /
        (building[this._type].workers * this._status.level);
      // remove from stock
      // add production to stock
    }
  }
}