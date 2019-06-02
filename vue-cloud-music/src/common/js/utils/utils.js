/*
*本地存储全局管理器
*/
class storageManager {
  constructor() {
    this.manager = null
  }

  setLocalStorage(key, value) {
    if (window.localStorage) {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      )
    }

  }
  getLocalStorage() {

  }

  setSessionStorage() {

  }

  getSessionStorage() {

  }

  getInstance() {
    if (!this.manager) {
      this.manager = new storageManager()
    }
    return this.manager

  }
}

export default storageManager().getInstance();
