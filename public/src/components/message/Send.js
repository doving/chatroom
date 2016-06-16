import React       from 'react';
import isOutside   from '../../util/isOutside';
import actions     from '../../actions';

export default React.createClass({
	heartOpen: false,

	imgMaxSize: 100, //k

	render() {
		const { send } = this.props;
		const favor = send.favor || [];

		return (
			<div className='footer'>
				<div className='tools'>
					<form ref='uploadForm' className='upload-form'>
						<input className='upload' ref='upload' type='file' 
						accept='image/*;capture=camera' onChange={this.uploadHandler}/>
					</form>
					<div className='tool send-img' title='发送图片' onClick={this.clickImgHandler}>
						<i className='icon-picture'></i>
					</div>
					<div ref='heart' className='tool heart' title='我的收藏' onClick={this.heartClickHandler}>
						<i className='icon-heart'></i>
					</div>
					<div ref='heartBox' className='heart-pics none'>
						<div className='pics-box' onClick={this.heartItemClickHandler}>
							{favor.map((url, i) => 
								<div key={i} className="heart-item">
									<div className="del-img" title="删除">×</div>
									<img className="heart-img" src={url} />
								</div>
							)}
						</div>
					</div>
				</div>
				<section className='input' ref='input' contentEditable='true' 
				onInput={this.inputHandler} onDrop={this.dropHandler}
				onPaste={this.pasteHandler} onKeyDown={this.keydownHandler}></section>
				<button className='send' onClick={this.sendHandler}>发送</button>
			</div>
		);
	},

	componentDidMount() {
		document.addEventListener('click', e => {
			const { clientX: x, clientY: y } = e;

			const heartO = this.refs.heart.getBoundingClientRect();
			const heartBoxO = this.refs.heartBox.getBoundingClientRect();

			if(isOutside(x, y, heartO) && isOutside(x, y, heartBoxO)){
				this.refs.heartBox.classList.add('none');
			}
		});

		this.refs.input.focus();
	},

	//shouldComponentUpdate(){ return false; },

	heartItemClickHandler(e) {
		const { send, dispatch } = this.props;

		let favor = [...send.favor||[]];

        let target = e.target;

        if(/^heart-img$|^heart-item$/.test(target.className)){

            let src = target.className === 'heart-item' ? 
                target.childNodes[0].src : target.src;

            this.dropInsert(src);
        }else if('del-img' === target.className){
            let index = favor.findIndex(pic => pic === target.nextElementSibling.src);

           	favor.splice(index, 1);

            dispatch(actions.changeFavor(favor));
        }
	},

	heartClickHandler(e) {
		this.refs.heartBox.classList.toggle('none');
	},

	clickImgHandler() {
		this.refs.upload.click();
	},

	inputHandler() {

	},

	dropHandler(e) {
		let data = e.dataTransfer;

        [...data.items].forEach(item => {
            let type = item.type;
            if(type.match(/^image\//)){
                this.loadImg(item.getAsFile());
            }else if(type === 'text/plain'){
                item.getAsString(this.dropInsert);
            }
        });

        e.preventDefault();
	},

	pasteHandler(e) {
		let data = e.clipboardData;

        [...data.items].forEach(item => {
            let type = item.type;
            if(type.match(/^image\//)){
                this.loadImg(item.getAsFile(), true);
            }else if(type === 'text/plain'){
                item.getAsString(str => {
                    this.insertCont(str, 'text')
                });
            }
        });

        e.preventDefault();
	},

	keydownHandler(e) {
		if(e.keyCode == 13 && !e.ctrlKey){
            this.sendHandler();
            e.preventDefault();
        }
	},

	uploadHandler(e) {
		const { dispatch, myself, currentId } = this.props;

		let img = e.target.files[0];

        if(!img) return;

        if(/^image\/[a-z]+$/.test(img.type)){
            this.loadImg(img);
        }else{
            dispatch(actions.receiveMsg({
            	content: '请选择图片', 
            	type: 'warning',
            	id: myself.id,
            	target: currentId
            }));
        }
        
        this.refs.uploadForm.reset();
	},

	dropInsert(str) {
	    let range = document.createRange();
	    let sel = window.getSelection();
	    let input = this.refs.input;

	    input.innerHTML += /^data:image\/[a-z]+;base64/.test(str) ?
	        `<img class='pic' src=${str}>` : str;

	    range.setStart(input, input.childNodes.length);
	    sel.removeAllRanges();
	    sel.addRange(range);
	},

	loadImg(img, isPaste) {
		const { dispatch, myself, currentId } = this.props;

		if(img && /^image\/[a-z]+$/.test(img.type)){
	        if(img.size <= 0)return;

	        if(img.size > 1024 * this.imgMaxSize){
	            dispatch(actions.receiveMsg({
	            	content: `图片不得超过${this.imgMaxSize}k`, 
	            	type: 'warning',
	            	id: myself.id,
	            	target: currentId
	            }));
	            return;
	        }

	        let fr = new FileReader;

	        fr.onload = e => {
	            isPaste ? this.insertCont(e.target.result) : this.dropInsert(e.target.result);
	        }

	        fr.readAsDataURL(img);
	    }
	},

	insertCont(cont, type) {
		let input = this.refs.input;

	    let range = document.createRange();

	    let selection = window.getSelection();

	    let target = selection.anchorNode;
	    //console.log(cont, target);
	    if(!target || (target !== input && target.parentNode !== input))return;

	    let start = selection.anchorOffset;
	    let end  = selection.focusOffset;
	    

	    let delta = 0;
	    let cursor = 0;

	    //cont = cont.replace(/(\r|\n|\r\n){1,2}/g, '<br/>');
	    let imgEl = document.createElement('img');
	    imgEl.className = 'pic';
	    type !== 'text' && imgEl.setAttribute('src', cont);

	    if(target === input){
	        let node = type === 'text' ? document.createTextNode(cont) : imgEl;
	        //console.log(target.childNodes[start]);
	        target.insertBefore(node, target.childNodes[start]);
	        cursor = start + 1;
	    }else{
	        if(type === 'text'){
	            let content = target.textContent;
	            target.textContent = content.slice(0, start + delta) + cont + content.slice(end + delta);
	            cursor = start + cont.length;
	        }else{
	            let text1 = document.createTextNode(target.textContent.slice(0, start));
	            let text2 = document.createTextNode(target.textContent.slice(end));
	            let frag = document.createDocumentFragment();

	            frag.appendChild(text1);
	            frag.appendChild(imgEl);
	            frag.appendChild(text2);

	            target.parentNode.replaceChild(frag, target);

	            cursor = [...input.childNodes].findIndex(item => item === imgEl) + 1;
	            target = input;
	        }
	    }

	    range.setStart(target, cursor);
	    selection.removeAllRanges();
	    selection.addRange(range);
	},

	sendHandler() {
		const { socket, currentId } = this.props;

		let input = this.refs.input;
		let msg = input.innerHTML.trim();

        if(msg){
            //util.compress(msg, function(str){
                socket.emit('chat', {
                	to: currentId,
                	msg
                });
                input.innerHTML = '';
            //});
        }
	}
});