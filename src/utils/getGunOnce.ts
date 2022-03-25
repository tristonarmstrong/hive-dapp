const getGunOnce = async (node): Promise<{ node: any, data: { [key: string]: any } }> => {
	return new Promise(function (resolve, reject) {
		try {
			node.once(data => resolve({ node, data }))
			return
		} catch (error) {
			reject(error)
			return
		}
	})
}

export default getGunOnce