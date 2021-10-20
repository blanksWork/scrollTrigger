"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * scrollTrigger 1.0.0
 *
 * Copyright 2021 Blanks WORK
 *
 * Released under the MIT License
 *
 * Released on: October 20, 2021
 */
var scrollTrigger = /*#__PURE__*/function () {
  function scrollTrigger(settings) {
    _classCallCheck(this, scrollTrigger);

    this.$initSettings = {
      triggerClass: 'scroll-trigger',
      scrolledClass: 'is-scrolled',
      syncAttr: 'data-sync',
      delayAttr: 'data-delay',
      PositionBaseY: 'top',
      PositionY: '50%',
      PositionBaseX: 'left',
      PositionX: '0%'
    };

    this._setSetting(settings, this.$initSettings);

    this.triggerY = this._convertPosition(this.PositionY);
    this.triggerX = this._convertPosition(this.PositionX);

    this._setMain();
  }

  _createClass(scrollTrigger, [{
    key: "_setSetting",
    value: function _setSetting(userSets, initSets) {
      if (userSets !== undefined && userSets !== null) {
        for (var attr in initSets) {
          if (_typeof(initSets[attr]) === "object") {} else {
            if (userSets[attr] === undefined) {
              this[attr] = initSets[attr];
            } else {
              this[attr] = userSets[attr];
            }
          }
        }
      } else {
        for (var _attr in initSets) {
          this[_attr] = initSets[_attr];
        }
      }
    }
  }, {
    key: "_setMain",
    value: function _setMain() {
      var _this = this;

      var triggers = document.querySelectorAll(".".concat(this.triggerClass));
      window.addEventListener('scroll', function () {
        triggers.forEach(function (trigger) {
          _this._main(trigger);
        });
      });
      window.addEventListener('load', function () {
        triggers.forEach(function (trigger) {
          _this._main(trigger);
        });
      });
    }
  }, {
    key: "_main",
    value: function _main(trigger) {
      var _this2 = this;

      if (!trigger.classList.contains(this.scrolledClass)) {
        var Rect = trigger.getBoundingClientRect();

        if (this._isReachX(Rect.left) || this._isReachY(Rect.top)) {
          var delay = Number(trigger.getAttribute(this.delayAttr));

          if (delay !== undefined && delay !== null && delay !== '' && delay !== NaN) {
            setTimeout(function () {
              trigger.classList.add(_this2.scrolledClass);
            }, delay);
          } else {
            trigger.classList.add(this.scrolledClass);
          }

          var syncId = trigger.getAttribute(this.syncAttr);

          if (syncId !== undefined && syncId !== null && syncId !== '') {
            this._addClassSyncItems(syncId);
          }
        }
      }
    }
  }, {
    key: "_addClassSyncItems",
    value: function _addClassSyncItems(syncId) {
      var _this3 = this;

      var syncItems = document.querySelectorAll("[".concat(this.syncAttr, "=\"").concat(syncId, "\"]"));

      if (syncItems.length) {
        syncItems.forEach(function (item) {
          var delay = Number(item.getAttribute(_this3.delayAttr));

          if (delay !== undefined && delay !== null && delay !== '' && delay !== NaN) {
            setTimeout(function () {
              item.classList.add(_this3.scrolledClass);
            }, delay);
          } else {
            item.classList.add(_this3.scrolledClass);
          }
        });
      }
    }
  }, {
    key: "_convertPosition",
    value: function _convertPosition(position) {
      if (position.endsWith('%')) {
        var p = position.slice(0, -1);
        return Number(p) * 0.01;
      } else if (position.endsWith('px')) {
        var _p = position.slice(0, -2);

        return Number(_p);
      } else {
        return 0.5;
      }
    }
  }, {
    key: "_isReachX",
    value: function _isReachX(left) {
      var reachX = this.triggerX > 1 ? this.triggerX : this.PositionBaseX === 'bottom' ? window.innerWidth * (1 - this.triggerX) : window.innerWidth * this.triggerX;

      if (left < reachX) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "_isReachY",
    value: function _isReachY(top) {
      var reachY = this.triggerY > 1 ? this.triggerY : this.PositionBaseY === 'bottom' ? window.innerHeight * (1 - this.triggerY) : window.innerHeight * this.triggerY;

      if (top < reachY) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return scrollTrigger;
}();