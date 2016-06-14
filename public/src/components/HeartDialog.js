import React      from 'react';
import actions    from '../actions';
import isOutSide  from '../util/isOutSide';

export default React.createClass({
	getInitialState() {
		return {
			current: '',
			hearted: false
		}
	},

	render() {
		const hearted = this.state.hearted;

		return (
			<div ref='heartDialog' className={'heart-dialog none' + (hearted ? ' hearted' : '')} onClick={this.heartClick}>
				{hearted ? '该图已收藏' : '收藏图片'}<i className='icon-heart'></i>
			</div>
		);
	},

	componentDidMount() {
		document.addEventListener('contextmenu', e => {
			this.refs.heartDialog.classList.add('none');
			
            if(e.target.className === 'pic'){
                Object.assign(this.refs.heartDialog.style, {
                    top: `${e.pageY}px`,
                    left: `${e.pageX}px`
                });

                let current = e.target.src;

                this.setState({
                	current,
                	hearted: !!this.props.favor.find(p => p == current)
                }, e => this.refs.heartDialog.classList.remove('none'));

            }
            e.preventDefault();
        });

        document.addEventListener('click', e => {
        	if(isOutSide(e.pageX, e.pageY, this.refs.heartDialog.getBoundingClientRect())){
        		this.refs.heartDialog.classList.add('none');
        	}
        });
	},

	heartClick() {
		if(this.state.hearted)return;

		let { favor, dispatch } = this.props;

		favor = [...favor||[]];

		favor.push(this.state.current);

        dispatch(actions.changeFavor(favor));

        this.refs.heartDialog.classList.add('none');
	}
});