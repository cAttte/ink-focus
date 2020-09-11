const keypress = require("keypress")

keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()

module.exports.FocusManager = require("./components/FocusManager")
module.exports.Focusable = require("./components/Focusable")
