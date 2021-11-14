const BASE_URL ='https://0c8f6cba-9e8e-450e-8020-106de240b6e5.bspapp.com/http/'  //这里改成自己的服务器地址可以在unicloud获取
export default function request({
    url,
    method = "GET",
    params = {},
    header,
    loadding = false,
    loaddingText = "加载中..."
}) {
    return new Promise((resolve, reject) => {
        if (loadding) {
            uni.showLoading({
                title: loaddingText
            })
        }
		uni.request({
			url: BASE_URL+url,
			method: method,
			data: params,
			// header: header,
			success: (res) => {
				if (res) {
					resolve(res.data)
				} else {
					resolve(res)
				}
				if (loadding) {
					uni.hideLoading()
				}
			},
			fail: (res) => {
				reject(res)
			}
		})
        // setTimeout(() => {
        // }, 1000)
    }).catch(err => {
        // 这里既可以捕获throw的异常也可以捕获reject的异常
        console.log("[Promise catch]:", err)
        if (loadding) {
            uni.hideLoading()
        }
    })
}