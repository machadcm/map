/*
const knight = 1;
const cavalary = 2;
const infantary = 3;
const archers = 4;
const pikeman = 5;
const mercenaries = 6;
*/
var armies = {
  knight: {
    cost: 20,
    maintenance: 5,
    attack: 20,
    defence: 30,
    movement: 4,
    size: 10
  },
  cavalary: {
    cost: 20,
    maintenance: 4,
    attack: 20,
    defence: 30,
    movement: 4,
    size: 10
  },
  archer: {
    cost: 5,
    maintenance: 1,
    attack: 10,
    defence: 2,
    movement: 2,
    size: 10
  },
  pikeman: {
    cost: 4,
    maintenance: 1,
    attack: 5,
    defence: 10,
    movement: 2,
    size: 10
  },
  infantary: {
    cost: 1,
    maintenance: 1,
    attack: 5,
    defence: 5,
    movement: 2,
    size: 10
  },
  mercenary: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  },
  raider: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  },
  pirate: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  }
};

export class army {
  constructor(type) {
    this._info = {
      type: type
    };
    this._status = {
      morare: 100,
      health: 0,
      experience: 0
    };
  }

  add(type) {}
}