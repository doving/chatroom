!function(A){function e(s){if(t[s])return t[s].exports;var i=t[s]={exports:{},id:s,loaded:!1};return A[s].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var t={};return e.m=A,e.c=t,e.p="",e(0)}([function(A,e,t){"use strict";function s(A){return A&&A.__esModule?A:{"default":A}}function i(A){if(Array.isArray(A)){for(var e=0,t=Array(A.length);e<A.length;e++)t[e]=A[e];return t}return Array.from(A)}var n=t(1),o=s(n);t(2),t(6);var a=io(),r=o["default"].$(".input"),g=o["default"].$(".send"),l=o["default"].$(".message ul"),c=o["default"].$(".inputname"),d=o["default"].$(".confirm"),u=o["default"].$("#shade"),B=o["default"].$(".userlist"),p=o["default"].$(".users .nums"),h=o["default"].$(".upload"),w=o["default"].$(".upload-form"),f=o["default"].$(".send-img"),m=o["default"].$(".heart"),Q=o["default"].$(".heart-dialog"),C=JSON.parse(localStorage.getItem("pics")||0)||[],E=o["default"].$(".pics-box"),y=o["default"].$(".heart-pics");c.focus();var I=function(A){[].concat(i(A)).forEach(function(A){var e=o["default"].$c("div",{className:"heart-item"}),t=o["default"].$c("img",{className:"heart-img",src:A});e.appendChild(t),E.appendChild(e)})},x=function(A,e){var t=o["default"].$c("li",{className:"chatitem "+(e?"myself":"others")}),s=o["default"].$c("span",{className:"time",textContent:"("+o["default"].timeformat(A.time)+")"}),i=o["default"].$c("p",{className:"username"}),n=document.createTextNode(A.username+(e?"-我":""));e?(i.appendChild(s),i.appendChild(n)):(i.appendChild(n),i.appendChild(s));var a=o["default"].$c("p",{className:"msg",innerHTML:A.msg});t.appendChild(i),t.appendChild(a),l.appendChild(t),t.scrollIntoView()},b=function(A,e){B.innerHTML="";var A=a.id;e.forEach(function(e){var t=o["default"].$c("li",{id:"id"+e.id,textContent:e.username+(e.id===A?"(我)":"")});B.appendChild(t)})},L=function(A,e,t){var s=a.id===e;if(s)u.style.display="none",r.focus();else if(!a.isLogin)return;b(e,t),p.textContent=t.length,v(A+" 加入群聊","userjoin")},Y=function(A,e,t){var s=o["default"].$("#id"+A);s.parentNode.removeChild(s),p.textContent=t,v(e+"退出群聊","userout")},v=function(A,e){var t=o["default"].$c("li",{className:"chatitem msgitem "+e,innerHTML:'<p class="msgcontent">'+A+"</p>"});l.appendChild(t),t.scrollIntoView()},F=function R(A){R.wait=1e3,clearTimeout(R[A]);var e=o["default"].$("#id"+A);e.querySelector(".inputing")||e.appendChild(o["default"].$c("span",{className:"inputing",textContent:"（正在输入……）"})),R[A]=setTimeout(function(){var A=e.querySelector(".inputing");clearTimeout(R.st),A.parentNode.removeChild(A)},R.wait)},G=function(A){c.classList.add("conflict"),c.setAttribute("placeholder","昵称"+A+"已被占用"),c.value="",u.style.display="",c.focus()},M=function(A,e){var t=document.createRange(),s=window.getSelection(),n=s.anchorNode;if(n&&(n===r||n.parentNode===r)){var a=s.anchorOffset,g=s.focusOffset,l=0,c=0;if(n===r){var d="text"===e?document.createTextNode(A):o["default"].$c("img",{className:"pic",src:A});console.log(n.childNodes[a]),n.insertBefore(d,n.childNodes[a]),c=a+1}else if("text"===e){var u=n.textContent;n.textContent=u.slice(0,a+l)+A+u.slice(g+l),c=a+A.length}else!function(){var e=o["default"].$c("img",{className:"pic",src:A}),t=document.createTextNode(n.textContent.slice(0,a)),s=document.createTextNode(n.textContent.slice(g)),l=document.createDocumentFragment();l.appendChild(t),l.appendChild(e),l.appendChild(s),n.parentNode.replaceChild(l,n),c=[].concat(i(r.childNodes)).findIndex(function(A){return A===e})+1,n=r}();console.log("target=",n.nodeName,"cursor=",c),t.setStart(n,c),s.removeAllRanges(),s.addRange(t)}},k=function(A,e){if(A&&/^image\/[a-z]+$/.test(A.type)){if(A.size>102400)return void v("图片不得超过100k","warning");var t=new FileReader;t.readAsDataURL(A),t.onload=function(A){e?M(A.target.result,"img"):(r.focus(),r.innerHTML+="<img class='pic' src='"+A.target.result+"'/>")}}};a.on("connect",function(){d.addEventListener("click",function(){var A=c.value.replace(/\s/g,"");A?a.emit("join",A,a.id):c.focus()}),c.addEventListener("keydown",function(A){13==A.keyCode&&d.click()}),a.on("conflict"+a.id,G),a.on("userjoin",function(A,e,t){L(A,e,t),a.id===e&&(a.isLogin=!0,I(C),a.on("userout",Y),a.on("inputing",F),g.addEventListener("click",function(A){var e=r.innerHTML.trim();e&&(a.emit("chat",e),r.innerHTML="")}),r.addEventListener("input",function(A){a.emit("inputing")}),r.addEventListener("keydown",function(A){13!=A.keyCode||A.ctrlKey||(g.click(),A.preventDefault())}),document.addEventListener("drop",function(A){var e=A.dataTransfer;[].concat(i(e.items)).forEach(function(A){var e=A.type;console.log(A),e.match(/^image\//)?k(A.getAsFile()):"text/plain"===e&&A.getAsString(function(A){M(A,/^data:image\/[a-z]+;base64/.test(A)?"img":"text")})}),A.preventDefault()}),r.addEventListener("paste",function(A){var e=A.clipboardData;[].concat(i(e.items)).forEach(function(A){var e=A.type;e.match(/^image\//)?k(A.getAsFile(),!0):"text/plain"===e&&A.getAsString(function(A){console.log("str=",A),M(A,"text")})}),A.preventDefault()}),f.addEventListener("click",function(A){h.click()}),a.on("chat",function(A){x(A,A.id===a.id)}),h.addEventListener("change",function(A){var e=this.files[0];e&&(/^image\/[a-z]+$/.test(e.type)?k(this.files[0]):v("请选择图片","warning"),w.reset())}),document.addEventListener("contextmenu",function(A){"pic"===A.target.className&&(Object.assign(Q.style,{top:A.pageY+"px",left:A.pageX+"px",display:"block"}),Q.pic=A.target.src,A.preventDefault())}),Q.addEventListener("click",function(A){var e=this;C.find(function(A){return A==e.pic})?v("该图已收藏","warning"):(C.push(this.pic),I([this.pic]),localStorage.setItem("pics",JSON.stringify(C))),this.style.display="none"}),m.addEventListener("click",function(A){this.open?y.style.display="none":y.style.display="block",this.open=!this.open}),E.addEventListener("click",function(A){var e=A.target;if(/^heart-img$|^heart-item$/.test(e.className)){var t="heart-item"===e.className?e.childNodes[0].src:e.src;r.innerHTML+='<img class="pic" src='+t+" />",m.open=!1,y.style.display="none"}}),document.addEventListener("click",function(A){var e=[].concat(i(o["default"].$(".tools").querySelectorAll("*"))).find(function(e){return e==A.target}),t=[o["default"].$(".send-img")].concat(i(o["default"].$(".send-img").querySelectorAll("*")));!t.find(function(A){return A==e})&&e||(m.open=!1,y.style.display="none")}))})})},function(A,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={$:function(A){return document.querySelector(A)},$$:function(A){return document.querySelectorAll(A)},$c:function(A,e){var t=document.createElement(A);return Object.assign(t,e),t},timeformat:function(A){var e=new Date(A),t=e.getMonth()+1,s=e.getDate(),i=e.getHours(),n=e.getMinutes(),o=e.getSeconds();return t=t>9?t:"0"+t,s=s>9?s:"0"+s,i=i>9?i:"0"+i,n=n>9?n:"0"+n,o=o>9?o:"0"+o,t+"-"+s+" "+i+":"+n+":"+o}}},function(A,e,t){var s=t(3);"string"==typeof s&&(s=[[A.id,s,""]]);t(5)(s,{});s.locals&&(A.exports=s.locals)},function(A,e,t){e=A.exports=t(4)(),e.push([A.id,"@font-face{font-family:fontello;src:url('data:application/octet-stream;base64,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') format('woff'),url('data:application/octet-stream;base64,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KwEUKy2wQyywNishIyAgPLAEI0IjOLErARQrsARDLrArKy2wRCywABUgR7AAI0KyAAEBFRQTLrAxKi2wRSywABUgR7AAI0KyAAEBFRQTLrAxKi2wRiyxAAEUE7AyKi2wRyywNCotsEgssAAWRSMgLiBGiiNhOLErARQrLbBJLLAII0KwSCstsEossgAAQSstsEsssgABQSstsEwssgEAQSstsE0ssgEBQSstsE4ssgAAQistsE8ssgABQistsFAssgEAQistsFEssgEBQistsFIssgAAPistsFMssgABPistsFQssgEAPistsFUssgEBPistsFYssgAAQCstsFcssgABQCstsFgssgEAQCstsFkssgEBQCstsFossgAAQystsFsssgABQystsFwssgEAQystsF0ssgEBQystsF4ssgAAPystsF8ssgABPystsGAssgEAPystsGEssgEBPystsGIssDcrLrErARQrLbBjLLA3K7A7Ky2wZCywNyuwPCstsGUssAAWsDcrsD0rLbBmLLA4Ky6xKwEUKy2wZyywOCuwOystsGgssDgrsDwrLbBpLLA4K7A9Ky2waiywOSsusSsBFCstsGsssDkrsDsrLbBsLLA5K7A8Ky2wbSywOSuwPSstsG4ssDorLrErARQrLbBvLLA6K7A7Ky2wcCywOiuwPCstsHEssDorsD0rLbByLLMJBAIDRVghGyMhWUIrsAhlsAMkUHiwARUwLQBLuADIUlixAQGOWbABuQgACABjcLEABUKyAAEAKrEABUKzCgIBCCqxAAVCsw4AAQgqsQAGQroCwAABAAkqsQAHQroAQAABAAkqsQMARLEkAYhRWLBAiFixA2REsSYBiFFYugiAAAEEQIhjVFixAwBEWVlZWbMMAgEMKrgB/4WwBI2xAgBEAAA=') format('truetype')}[class*=\" icon-\"]:before,[class^=icon-]:before{font-family:fontello;font-style:normal;font-weight:400;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em}.icon-heart:before{content:'\\E800'}.icon-picture:before{content:'\\E801'}",""])},function(A,e){"use strict";A.exports=function(){var A=[];return A.toString=function(){for(var A=[],e=0;e<this.length;e++){var t=this[e];t[2]?A.push("@media "+t[2]+"{"+t[1]+"}"):A.push(t[1])}return A.join("")},A.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},i=0;i<this.length;i++){var n=this[i][0];"number"==typeof n&&(s[n]=!0)}for(i=0;i<e.length;i++){var o=e[i];"number"==typeof o[0]&&s[o[0]]||(t&&!o[2]?o[2]=t:t&&(o[2]="("+o[2]+") and ("+t+")"),A.push(o))}},A}},function(A,e,t){function s(A,e){for(var t=0;t<A.length;t++){var s=A[t],i=u[s.id];if(i){i.refs++;for(var n=0;n<i.parts.length;n++)i.parts[n](s.parts[n]);for(;n<s.parts.length;n++)i.parts.push(g(s.parts[n],e))}else{for(var o=[],n=0;n<s.parts.length;n++)o.push(g(s.parts[n],e));u[s.id]={id:s.id,refs:1,parts:o}}}}function i(A){for(var e=[],t={},s=0;s<A.length;s++){var i=A[s],n=i[0],o=i[1],a=i[2],r=i[3],g={css:o,media:a,sourceMap:r};t[n]?t[n].parts.push(g):e.push(t[n]={id:n,parts:[g]})}return e}function n(A,e){var t=h(),s=m[m.length-1];if("top"===A.insertAt)s?s.nextSibling?t.insertBefore(e,s.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),m.push(e);else{if("bottom"!==A.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e)}}function o(A){A.parentNode.removeChild(A);var e=m.indexOf(A);e>=0&&m.splice(e,1)}function a(A){var e=document.createElement("style");return e.type="text/css",n(A,e),e}function r(A){var e=document.createElement("link");return e.rel="stylesheet",n(A,e),e}function g(A,e){var t,s,i;if(e.singleton){var n=f++;t=w||(w=a(e)),s=l.bind(null,t,n,!1),i=l.bind(null,t,n,!0)}else A.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=r(e),s=d.bind(null,t),i=function(){o(t),t.href&&URL.revokeObjectURL(t.href)}):(t=a(e),s=c.bind(null,t),i=function(){o(t)});return s(A),function(e){if(e){if(e.css===A.css&&e.media===A.media&&e.sourceMap===A.sourceMap)return;s(A=e)}else i()}}function l(A,e,t,s){var i=t?"":s.css;if(A.styleSheet)A.styleSheet.cssText=Q(e,i);else{var n=document.createTextNode(i),o=A.childNodes;o[e]&&A.removeChild(o[e]),o.length?A.insertBefore(n,o[e]):A.appendChild(n)}}function c(A,e){var t=e.css,s=e.media;if(s&&A.setAttribute("media",s),A.styleSheet)A.styleSheet.cssText=t;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(t))}}function d(A,e){var t=e.css,s=e.sourceMap;s&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var i=new Blob([t],{type:"text/css"}),n=A.href;A.href=URL.createObjectURL(i),n&&URL.revokeObjectURL(n)}var u={},B=function(A){var e;return function(){return"undefined"==typeof e&&(e=A.apply(this,arguments)),e}},p=B(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=B(function(){return document.head||document.getElementsByTagName("head")[0]}),w=null,f=0,m=[];A.exports=function(A,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=p()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var t=i(A);return s(t,e),function(A){for(var n=[],o=0;o<t.length;o++){var a=t[o],r=u[a.id];r.refs--,n.push(r)}if(A){var g=i(A);s(g,e)}for(var o=0;o<n.length;o++){var r=n[o];if(0===r.refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete u[r.id]}}}};var Q=function(){var A=[];return function(e,t){return A[e]=t,A.filter(Boolean).join("\n")}}()},function(A,e,t){var s=t(7);"string"==typeof s&&(s=[[A.id,s,""]]);t(5)(s,{});s.locals&&(A.exports=s.locals)},function(A,e,t){e=A.exports=t(4)(),e.push([A.id,"*{padding:0;margin:0;box-sizing:border-box}body{font:14px 微软雅黑,Helvetica,Arial,sans-serif}button,input{height:100%;outline:none;border:none}input[type=text]{padding:10px}li{list-style:none}.heart-dialog{position:absolute;background:#dffcfa;padding:10px;border-radius:4px;border:1px solid #80d7d0;z-index:2;display:none}.heart-dialog:hover{color:red;cursor:pointer}#shade{position:absolute;height:100%;width:100%;background:rgba(0,0,0,.5);z-index:10}.inputname.conflict{background:pink}.shadedialog{position:relative;width:30%;height:40px;margin:0 auto;background:#eee;top:40%}.shadedialog input{height:100%}.shadedialog input[type=text]{width:75%}.shadedialog input[type=button]{width:25%;background:#56af17}#cotainer{width:100%;min-height:100%;position:relative}.left{left:0;width:75%;min-width:calc(100% - 300px);min-width:-webkit-calc(100% - 300px)}.left,.right{position:absolute;top:0;height:100%}.right{right:0;width:25%;max-width:300px;float:right}.footer{bottom:0;width:100%;height:30%;padding:2px}.footer,.footer .input,.footer .send,.footer .tools{position:absolute}.footer .tools{top:0;left:0;width:100%;height:35px;border-top:1px solid #ccc}.footer .tools .upload{display:none}.footer .tools .tool{position:absolute;height:30px;width:30px;top:5px;line-height:28px;text-align:center;font-size:20px}.footer .tools .tool:hover{border:1px solid #aaa;color:green}.footer .tools .tool.send-img{left:5px}.footer .tools .tool.heart{left:40px}.footer .tools .heart-pics{position:absolute;height:320px;width:320px;top:-330px;left:38px;background:#ccc;z-index:1;display:none}.footer .tools .heart-pics .pics-box{position:absolute;height:300px;width:320px;left:0;top:10px;padding:10px 0 10px 20px;overflow:auto}.footer .tools .heart-pics .heart-item{float:left;height:70px;width:70px;border:1px solid #eee;text-align:center;line-height:68px}.footer .tools .heart-item .heart-img{vertical-align:middle;max-width:98%;max-height:98%}.footer .tools .heart-item:hover{border:1px solid green}.footer .tools .heart-pics:after{position:absolute;content:'';height:20px;width:20px;left:7px;bottom:-6px;-webkit-transform:rotate(31deg) skewY(31deg);transform:rotate(31deg) skewY(31deg);background:#ccc;z-index:-1}.footer .input{top:40px;left:0;bottom:30px;width:100%;padding:5px;outline:none;border:none;resize:none;overflow:auto;white-space:pre-wrap}.footer .input img{max-width:60%;max-height:80%}.footer .send{bottom:0;right:0;width:80px;height:30px}.users{position:absolute;top:0;right:0;width:100%;height:100%;border:1px solid #ccc}#container .time{color:#111;font-weight:400}.message{position:absolute;left:0;asdf:0;height:70%;width:100%}.users .user-title{height:30px;line-height:20px;padding:5px;border-bottom:1px solid #ccc}.message .chatbox{height:100%;padding:10px;overflow:auto}.message .chatbox .chatitem{padding:0 0 5px}.message .chatbox .chatitem .username{color:orange;font-weight:700;line-height:30px;width:100%}.message .chatbox .chatitem.myself .username{text-align:right}.message .chatbox .chatitem.myself .msg,.message .chatbox .chatitem.myself .username{float:right}.message .chatitem .msg{position:relative;line-height:22px;margin-top:5px;left:20px;max-width:80%;background:#eee;border-radius:5px;padding:5px 10px;display:inline-block;word-break:break-all;white-space:pre-wrap;z-index:1}.message .chatitem .msg img{max-width:100%}.message .chatbox .chatitem.myself .msg{background:#94e500;left:-20px}.message .chatbox .chatitem.myself:after{content:'';height:0;display:block;clear:both}.message .chatitem .msg img{vertical-align:middle}.message .chatitem .msg:after{position:absolute;content:'';top:6px;height:10px;width:10px;z-index:-1}.message .chatitem.others .msg:after{left:0;background:#eee;transform:translate(6px,-11px) rotateX(-186deg) rotate(-73deg) skewX(233deg);-webkit-transform:translate(6px,-11px) rotateX(-186deg) rotate(-73deg) skewX(233deg)}.message .chatitem.myself .msg:after{right:0;background:#94e500;transform:translate(-8px,-11px) rotate(-76deg) skewX(50deg);-webkit-transform:translate(-8px,-11px) rotate(-76deg) skewX(50deg)}.message .chatitem.msgitem{text-align:center}.message .chatitem.msgitem .msgcontent{display:inline-block;position:relative;max-width:80%;text-align:center;border-radius:3px;padding:0 10px;font-size:12px;user-select:none;-webkit-user-select:none;-moz-user-select:none}.message .chatitem.msgitem.userjoin .msgcontent{background:#55c227}.message .chatitem.msgitem.userout .msgcontent{background:#ccc}.message .chatitem.msgitem.warning .msgcontent{background:#ff7b7b}.users ul{padding:10px 5px;overflow:auto;height:calc(100% - 30px);height:-webkit-calc(100% - 30px)}.users ul li{padding:2px 0;line-height:16px}.users li .inputing{color:red}",""])}]);