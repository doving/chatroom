import React      from 'react';
import isOutside  from '../../util/isOutside';

export default React.createClass({
	getInitialState() {
		return {
			flag: '∧∨'
		}
	},

	render() {
		const { user, currentId } = this.props;

		const currentIndex = user.list.findIndex(o => o.id == currentId);
		const msgTitle = currentIndex > -1 ? user.list[currentIndex].nickname : '大厅';

		let members = [];

		if(currentId == 'HALL'){
			[user.myself, ...user.list].forEach((o, i) =>{
				o.active && members.push(
					<div key={i} className='member'>
						<img className='head' src={o.head} />
						<p className='nickname'>{o.nickname}</p>
					</div>
				);
			}) 
		}else{
			let o = user.list[currentIndex];
			members = <div className='member'>
						<img className='head' src={o.head} />
						<p className='nickname'>{o.nickname}</p>
					</div>
		}

		return (
			<div className='message-title'>
				<p className='title' onClick={this.clickHandler}>{msgTitle}</p>
				<div className='members' ref='members'>{members}</div>
			</div>
		);
	},

	componentDidMount() {
		document.addEventListener('click', e => {
			if(isOutside(e.pageX, e.pageY, this.refs.members.getBoundingClientRect())){
				this.refs.members.classList.remove('open');
			}
		});
	},

	clickHandler() {
		this.refs.members.classList.toggle('open');
	}
});