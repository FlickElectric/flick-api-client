const { deserialize } = require('.')
const json = require('./sample.json')
const result = deserialize(json)

console.log(result)
