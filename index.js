/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys, arr) => {
  arr.forEach(item => {
    keys.forEach(key => {
      if (item.hasOwnProperty(key)) {
        delete item[key]
      }
    })
  })
  return arr
};
exports.excludeByProperty = (key, arr) => {
  const res = []
  let item = null
  while (arr.length) {
    item = arr.shift()
    if (!item.hasOwnProperty(key)) {
      res.push(item)
    }
  }
  return res
};
exports.sumDeep = (arr) => {
  const res = []
  let temp = {}
  arr.forEach(item => {
    Object.keys(item).forEach(key => {
      temp[key] = item[key].reduce((total, cur) => {
        return total + cur.val
      }, 0)
    })
    res.push({ ...temp })
    temp = {}
  })
  return res
};
exports.applyStatusColor = (colors, arr) => {
  const temp = Object.keys(colors).reduce((total, cur) => {
    colors[cur].forEach(item => {
      total[item] = cur
    })
    return total
  }, {})
  let res = []
  let item = {}
  while (arr.length) {
    item = arr.shift()
    item['color'] = temp[item.status]
    res.push(item)
  }
  res = res.filter(item => item.color !== undefined)
  return res
};
exports.createGreeting = (fn, str) => {
  return function (name) {
    return fn (str, name)
  }
};
exports.setDefaults = (defaults) => {
  const keys = Object.keys(defaults)
  return function (obj) {
    keys.forEach(key => {
      if (!obj.hasOwnProperty(key)) {
        obj[key] = defaults[key]
      }
    })
    return obj
  }
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
  return services.fetchUsers().then(users => {
    const user = users.find(item => item.name === name)
    return Promise.all([
      services.fetchStatus(),
      services.fetchCompanyById(user.companyId)
    ]).then(res => {
      return {
        status: res[0],
        company: res[1],
        user
      }
    })
  })
};
