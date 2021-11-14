<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			const userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				this.$store.state.userinfo = userInfo
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			api: {
				home: 'api/home',
				openid: 'api/send',
			},
			subscribe: 'subscribe',
			login: 'login',
		},
		methods: {
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
