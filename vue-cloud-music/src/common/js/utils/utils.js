/*
*本地存储全局管理器
*/
class storageManager {
  constructor() {
    this.manager = null
  }

  setLocalStorage(key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      )
    }
  }

  getLocalStorage(key) {
    if (window.localStorage) {
      return window.localStorage.getItem(key)
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

export default new storageManager().getInstance();
