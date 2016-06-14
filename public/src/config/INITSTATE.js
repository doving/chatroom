export default Object.freeze({
	user: {
		socket: null,
		defaultHead: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAoACgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0TUbv7DZPOE8xwQkaZxvdiFVc9ssQM9s5qhbaDG8BOqyyXdw7mR/30nlqSc4RSx2gdBTfFHmtHpkMIyZNSt9w/wBlW3n/ANAq7LbX76vBcx6iI7JExJaeSD5h+bnfnI6rx/s+5oAgOjCAbtNvbq2lB48yZ54yP7pRyQB/u7T6EU+11Flu00/UVWK9ZSYyufLnA6lM9Dzyp5HuPmNiaxgmv4Lx/M823DBMSELg9cjoaTUbGO/tvKY7JEIeGUDLRSD7rD3Hp0IyDwTQBboqppV095pltcTKqTOg81F6JIOGX8GBH4UUARa3J9nsPtmxW+yyJMxYZ2IGHmMPcIXNXtw2bl+YYyMd6U1hwxXugqYoo5L7TAxKInM1svXaB/y0QdgPmAwAGoAs/wBqXv8A0L+pf9/Lf/47V+2leaBZJLeS3Zs5jkKll577SR+RrOk8R6VCqtczy26s20NcW8kSk+mWUDPB49qJNaSYKmkwSX0smNropWED+80hG3A7gZb0BoAXw7n+z5/+v67x/wCBElFWtLs/sGnxWxkMrrlpJCMeY7EszY7ZYk47ZooAt0UUUAY/ie1Nxp9vIlu88tte280aopJBEqgnA/2S34ZrYoooAKKKKAP/2Q==",
		isLogin: false,
		myself: {
			/*id: 333,
			nickname: '我自己',
			head: '',
			active: true*/
		},
		list: [
			/*{
				id: 111,
				nickname: '用户1',
				head: '',
				active: true
			},*/
		]
	},
	message: {
		currentId: 'HALL',
		list: {
			/*'HALL': {
				news: [ //新消息列表
					{
						type: 'msg',
						content: 'xxx',
						time: ''
					}
				],
				msg: [ //消息列表
					{
						type: 'msg',
						content: 'xxx',
						time: '',
						id: 111,
						target: 'HALL'
					},
				]
			}*/
		}
	},
	send: {
		favor: JSON.parse(localStorage.getItem('pics')||'[]'),
	}
})