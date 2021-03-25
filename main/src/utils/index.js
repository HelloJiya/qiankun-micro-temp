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
