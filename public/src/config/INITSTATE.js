export default Object.freeze({
	user: {
		myself: {
			id: 333,
			name: 222,
			head: 'http://img1.qq.com/www/pics/6743/6743671.jpg'
		},
		list: [
			{
				id: 111,
				name: 111,
				head: 'http://img1.qq.com/www/pics/6743/6743671.jpg'
			},
			{
				id: 222,
				name: 222,
				head: 'http://img1.qq.com/www/pics/6743/6743671.jpg'
			}
		]
	},
	message: {
		currentId: 111,
		list: {
			111: {
				news: [ //新消息列表
					{
						type: 'msg|warn|tip',
						content: 'xxx',
						time: ''
					}
				],
				msg: [ //消息列表
					{
						type: 'msg|warn|tip',
						content: 'xxx',
						time: '',
						id: 111
					},
					{
						type: 'msg|warn|tip',
						content: 'xxx',
						time: '',
						id: 333
					}
				]
			}
		}
	},
	send: {
		favor: [],

	}
})