import React      from 'react';
import actions    from '../../actions'; 

export default React.createClass({
	render() {
		const { user, message } = this.props;
		const { myself, list, defaultHead } = user;
		const { currentId } = message;

		let heads = [<img key='0' className='hall-head' src={myself.head}/>];
		let users = [];

		let count = 1;

		list.forEach((item, index) => {
			if(!item.active)return;

			const cls = item.id === currentId ? 'item active' : 'item';

			const newCount = (message.list[item.id] || {news: []}).news.length;

			users.push(
				<li className={cls} key={index} onClick={() => this.clickHandler(item.id)}>
					<img className='head' src={item.head || defaultHead}/>
					{item.nickname}
					{newCount > 0 ? <span className='news-count'>{newCount}</span> : ''}
				</li>
			);

			if(count < 9){
				heads.push(
					<img key={count} className='hall-head' src={item.head || defaultHead}/>
				);
			}
			count++;
		});

		let headClass = count > 4 ? 'nine' : count == 4 ? 'four' : count == 3 ? 'three' : 'two';

		let hallClass = currentId === 'HALL' ? 'item hall active' : 'item hall';

		const hallNewCount = (message.list['HALL'] || {news: []}).news.length;
		
		return (
			<div className='users'>
				<ul className='userlist'>
					<li className={hallClass} onClick={() => this.clickHandler('HALL')}>
						<div className={'head ' + headClass}>{heads}</div>
						大厅（{count}）
						{hallNewCount > 0 ? <span className='news-count'>{hallNewCount}</span> : ''}
					</li>
					{users}
				</ul>
			</div>
		);
	},

	clickHandler(id) {
		this.props.dispatch(actions.changeCurrentId(id));
	}
});