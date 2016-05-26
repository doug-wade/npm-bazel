"use strict"

let x = 0

module.exports = {
  inc: function() {
    x = x + 1
  },

  dec: function() {
    x = x - 1
  },

  get: function() {
    return x
  },

  set: function(y) {
    x = y
  }
}
