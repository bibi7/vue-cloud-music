/*
*本地存储全局管理器
*/
class storageManager {
  constructor() {
    this.manager = null
  }

  setLocalStorage(key, value, expires) {
    if (window.localStorage) {
      const item = expires ? value :  {
        data: {
          ...value
        },
        expires,
        currentTime: Date.now()
      }
      window.localStorage.setItem(
        key,
        JSON.stringify(item)
      )
    }
  }

  getLocalStorage(key) {
    if (window.localStorage) {
      const item = window.localStorage.getItem(key)
      if (item && item.expires) {
        const time = Date.now();
        switch (item.expires) {
          case '30m':
            if (item.currentTime < (time - 60 * 30)) {
              window.localStorage.clear(key)
              return null
            }
            break;
          case '1h':
            if (item.currentTime < (time - 60 * 60)) {
              window.localStorage.clear(key)
              return null
            }
            break;
          case '1d':
            if (item.currentTime < (time - 60 * 60 * 24)) {
              window.localStorage.clear(key)
              return null
            }
            break;
        }
        return item.data
      }
      return item
      // return 
    }
  }

  setSessionStorage(key, value) {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      )
    }
  }

  getSessionStorage(key) {
    if (window.sessionStorage) {
      return window.sessionStorage.getItem(key)
    }
  }

  getInstance() {
    if (!this.manager) {
      this.manager = new storageManager()
    }
    return this.manager

  }
}

export default new storageManager().getInstance()
