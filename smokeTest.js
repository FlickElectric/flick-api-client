const { deserialize } = require('.')
const sample = require('./sample.json')
const sampleResult = deserialize(sample)
console.log(sampleResult)

const empty = require('./empty.json')
const emptyResult = deserialize(empty)
console.log(emptyResult)

const circular = require('./circular.json')
const circularResult = deserialize(circular)
console.log(circularResult)
