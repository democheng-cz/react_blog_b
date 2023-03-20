class DcCache {
	setCache(key: string, value: any) {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	}

	getCache(key: string) {
		return JSON.parse(window.sessionStorage.getItem(key)!)
	}

	deleteCache(key: string) {
		window.sessionStorage.removeItem(key)
	}
}

export default new DcCache()
