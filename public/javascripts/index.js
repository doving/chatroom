import util from './util';

var socket = io();

var input = util.$('.input');
var send = util.$('.send');
var message = util.$('.message ul');
var inputname = util.$('.inputname');
var comfirm = util.$('.confirm');
var shade = util.$('#shade');
var userlist = util.$('.userlist');
var nums = util.$('.users .nums');

inputname.focus();

var sendMsg = function(data, isMyself){
    var li = util.$c('li', {
        className: `chatitem ${isMyself ? 'myself' : 'others'}`
    });

    var time = util.$c('span', {
        className: 'time',
        textContent: `(${util.timeformat(data.time)})`
    });

    var username = util.$c('p', {
        className: 'username'
    });

    var text = document.createTextNode(data.username + (isMyself ? '-我' : ''));

    if(isMyself){
        username.appendChild(time);
        username.appendChild(text);
    }else{
        username.appendChild(text);
        username.appendChild(time);
    }

    var msg = util.$c('p', {
        className: 'msg',
        textContent: data.msg
    });

    li.appendChild(username);
    li.appendChild(msg);

    message.appendChild(li);
    li.scrollIntoView();
}

var initusers = function(id, users){
    userlist.innerHTML = '';
    var id = socket.id;

    users.forEach(function(user){
        var li = util.$c('li', {
            id: 'id' + user.id,
            textContent: user.username + (user.id === id ? '(我)' : '')
        });
        userlist.appendChild(li);
    });
}

var userJoin = function(username, id, users){
    var isMyself = socket.id === id;
    
    if(isMyself){
        shade.style.display = 'none';
        input.focus();
    }else if(!socket.isLogin){
        return;
    }

    var li = util.$c('li', {
        className: 'chatitem msgitem userjoin',
        innerHTML: '<p class="msgcontent">' + username+(isMyself?'(我)':'') + ' 加入群聊</p>'
    });

    message.appendChild(li);

    initusers(id, users);

    nums.textContent = users.length;

    li.scrollIntoView();
}

var userOut = function(id, username, length){
    console.log(username);
    var li = util.$('#id' + id);
    li.parentNode.removeChild(li);
    nums.textContent = length;

    var li2 = util.$c('li', {
        className: 'chatitem msgitem userout',
        innerHTML: `<p class="msgcontent">${username}退出群聊</p>`
    });

    message.appendChild(li2);

    li2.scrollIntoView();
}

var inputing = function(id){
    inputing.wait = 1000;
    clearTimeout(inputing[id]);
    var li = util.$('#id' + id);

    if(!li.querySelector('.inputing')){
        li.appendChild(util.$c('span', {
            className: 'inputing',
            textContent: '（正在输入……）'
        }));
    }

    inputing[id] = setTimeout(function(){
        var inp = li.querySelector('.inputing');
        clearTimeout(inputing.st);
        inp.parentNode.removeChild(inp);
    }, inputing.wait);
}

var nameconflict = function(username){
    inputname.classList.add('conflict');
    inputname.setAttribute('placeholder', `昵称${username}已被占用`);
    inputname.value = '';
    shade.style.display = '';
    inputname.focus();
}

input.onkeydown = function(e){
    if(e.keyCode == 13){ 
        send.click();
        return false;
    }
}

inputname.onkeydown = function(e){
    e.keyCode == 13 && comfirm.click();
}

document.body.ontouchmove = function(){return false;}

socket.on('connect', function(){
    comfirm.onclick = function(){
        var username = inputname.value.replace(/\s/g, '');
        if(username){
            socket.emit('join', username, socket.id);
        }else{
            inputname.focus();
        }
    } 

    socket.on('conflict' + socket.id, nameconflict)

    socket.on('userjoin', function(username, id, users){
        
        userJoin(username, id, users);

        if(socket.id === id){
            socket.isLogin = true;

            socket.on('userout', userOut);

            socket.on('inputing', inputing);

            send.onclick = function(){
                var msg = input.value.trim();
                if(msg){
                    socket.emit('chat', msg);
                    input.value = '';
                    input.focus();
                }
            }

            input.oninput = function(){
                socket.emit('inputing');
            }

            socket.on('chat', function(data){
                sendMsg(data, data.id === socket.id);
            });
        }
    }); 


})