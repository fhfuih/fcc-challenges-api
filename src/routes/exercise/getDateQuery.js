function getDateQuery (from, to) {
  const query = []
  if (from) {
    query.push({
      date: {
        $gte: from
      }
    })
  }
  if (to) {
    query.push({
      date: {
        $lte: to
      }
    })
  }

  if (query.length > 1) {
    return {
      $and: query
    }
  }
  return query[0]
  // if both undefined, returned query[0] is undefined
}

module.exports = getDateQuery
