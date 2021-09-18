"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceUtils = exports.DiceResult = exports.Bonus = exports.Dice = void 0;
var Dice = /** @class */ (function () {
    function Dice(value) {
        this.maxValue = value;
    }
    Object.defineProperty(Dice.prototype, "start", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dice.prototype, "value", {
        get: function () {
            return this.maxValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dice.prototype, "expectation", {
        get: function () {
            return (this.value + this.start) / 2;
        },
        enumerable: false,
        configurable: true
    });
    return Dice;
}());
exports.Dice = Dice;
var Bonus = /** @class */ (function () {
    function Bonus(bonus, value) {
        this.bonus = bonus;
        this.value = value;
    }
    Bonus.prototype.applyBonus = function (n) {
        switch (this.bonus) {
            case '+':
                return n + this.value;
            case '-':
                return n - this.value;
            case '*':
                return n * this.value;
            case '/':
                return n / this.value;
        }
        return n;
    };
    Bonus.prototype.toString = function () {
        return this.bonus + this.value.toString();
    };
    // TODO BOrdel pq c'esty si compliqué cette mezrdfe es, fkljdsnfdsqlk rtfq<wmslnvcsr<edjlkic
    // Faire un enum + fichier spécifique
    Bonus.bonusTypes = ['+', '-', '*', '/'];
    return Bonus;
}());
exports.Bonus = Bonus;
var DiceResult = /** @class */ (function () {
    function DiceResult(dice, result) {
        this.bonus = [];
        this.diceReference = dice;
        this.result = result;
    }
    Object.defineProperty(DiceResult.prototype, "dice", {
        get: function () {
            return this.diceReference;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiceResult.prototype, "result", {
        get: function () {
            return this.diceResult;
        },
        set: function (value) {
            this.diceResult = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiceResult.prototype, "isValid", {
        get: function () {
            return this.result >= this.dice.start && this.result <= this.dice.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiceResult.prototype, "getBonus", {
        get: function () {
            return this.bonus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiceResult.prototype, "hasBonus", {
        get: function () {
            return this.bonus.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    DiceResult.prototype.addBonus = function (bonus) {
        this.bonus.push(bonus);
    };
    DiceResult.DEFAULT_DICE_RESULT = new DiceResult(new Dice(-1), -1);
    return DiceResult;
}());
exports.DiceResult = DiceResult;
var DiceUtils = /** @class */ (function () {
    function DiceUtils() {
    }
    DiceUtils.roll = function (dice) {
        var rollResult = Math.floor(Math.random() * dice.value) + 1;
        return new DiceResult(dice, rollResult);
    };
    return DiceUtils;
}());
exports.DiceUtils = DiceUtils;
//# sourceMappingURL=dice-utils.js.map