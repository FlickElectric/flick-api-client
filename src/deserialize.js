'use strict'

module.exports = ({ data, included }) => {
  const includedMap = new Map(included.map(item => [`${item.type}:${item.id}`, item]))

  function serializeItem({ id, type, attributes = {}, relationships = {} }) {
    return {
      id,
      type,
      ...serializeAttributes(attributes),
      ...serializeRelationships(relationships)
    }
  }

  function serializeRelationships(relationships) {
    return Object.entries(relationships).reduce((acc, [key, value]) => {
      acc[camelCase(key)] = value.data.map(item => 
        serializeItem(includedMap.get(`${item.type}:${item.id}`))
      )
      return acc
    }, {})
  }

  function serializeAttributes(attributes) {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
      acc[camelCase(key)] = value
      return acc
    }, {})
  }

  function camelCase(str) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
  }

  if (data.length) {
    return data.map(serializeItem)
  } else {
    return serializeItem(data)
  }
}