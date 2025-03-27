'use strict'

module.exports = ({ data, included }) => {
  const includedMap = new Map(included?.map(item => [`${item.type}:${item.id}`, item]))

  function serializeItem({ id, type, attributes = {}, relationships = {} }, ancestry = []) {
    return {
      id,
      type,
      ...serializeAttributes(attributes),
      ...serializeRelationships(relationships, ancestry + [`${type}:${id}`])
    }
  }

  function serializeRelationships(relationships, ancestry = []) {
    return Object.entries(relationships).reduce((acc, [key, value]) => {
      if (Array.isArray(value.data)) {
        value.data.forEach(item => {
          const includedKey = `${item?.type}:${item?.id}`

          if (includedMap.has(includedKey) && !ancestry.includes(includedKey)) {
            if (!acc[camelCase(key)]) {
              acc[camelCase(key)] = []
            }

            acc[camelCase(key)].push(serializeItem(includedMap.get(includedKey), ancestry + [includedKey]))
          }
        })
      } else {
        const includedKey = `${value.data?.type}:${value.data?.id}`

        if (includedMap.has(includedKey) && !ancestry.includes(includedKey)) {
          acc[camelCase(key)] = serializeItem(includedMap.get(includedKey), ancestry + [includedKey])
        }
      }

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

  if (Array.isArray(data)) {
    return data.map(serializeItem)
  } else {
    return serializeItem(data)
  }
}