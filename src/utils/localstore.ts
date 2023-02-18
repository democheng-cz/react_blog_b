class DcCache {
	setCache(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	getCache(key: string) {
		return JSON.parse(window.localStorage.getItem(key)!)
	}

	deleteCache(key: string) {
		window.localStorage.removeItem(key)
	}
}

export default new DcCache()
