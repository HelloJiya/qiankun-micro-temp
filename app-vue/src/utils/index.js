// 本地数据存储/获取
export function localStorageChange(name, value) {
  const val = localStorage.getItem(name)
  if (!val) {
    localStorage.setItem(name, JSON.stringify(value))
  } else {
    value = JSON.parse(val)
  }

  return value
}

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// 判断传入的日期是否大于等于当天
export function disabledDate(time) {
  const now = new Date()
  const isBefore = Date.parse(now) > Date.parse(time)
  return isBefore
}
