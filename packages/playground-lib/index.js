"use strict"

const s = require('playground-singleton');

module.exports = {
  mutateAndGet: function(val) {
    let method

    if (val > 0) {
      method = 'inc'
    } else {
      method = 'dec'
    }

    for (let i = 0; i < Math.abs(val); i++) {
      s[method]()
    }

    return s.get()
  }
}
