(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c211b"],{4977:function(t,n,e){"use strict";e.r(n),e.d(n,"pwa_camera_modal",(function(){return c}));var o=e("c38e"),r=function(t,n,e,o){function r(t){return t instanceof e?t:new e((function(n){n(t)}))}return new(e||(e=Promise))((function(e,i){function c(t){try{a(o.next(t))}catch(n){i(n)}}function u(t){try{a(o["throw"](t))}catch(n){i(n)}}function a(t){t.done?e(t.value):r(t.value).then(c,u)}a((o=o.apply(t,n||[])).next())}))},i=function(t,n){var e,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(t){return function(n){return a([t,n])}}function a(i){if(e)throw new TypeError("Generator is already executing.");while(c)try{if(e=1,o&&(r=2&i[0]?o["return"]:i[0]?o["throw"]||((r=o["return"])&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(r=c.trys,!(r=r.length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=n.call(t,c)}catch(u){i=[6,u],o=0}finally{e=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}},c=function(){function t(t){Object(o["h"])(this,t),this.onPhoto=Object(o["d"])(this,"onPhoto",7),this.noDeviceError=Object(o["d"])(this,"noDeviceError",7)}return t.prototype.present=function(){return r(this,void 0,void 0,(function(){var t,n=this;return i(this,(function(e){return t=document.createElement("pwa-camera-modal-instance"),t.addEventListener("onPhoto",(function(t){return r(n,void 0,void 0,(function(){var n;return i(this,(function(e){return this._modal?(n=t.detail,this.onPhoto.emit(n),[2]):[2]}))}))})),t.addEventListener("noDeviceError",(function(t){return r(n,void 0,void 0,(function(){return i(this,(function(n){return this.noDeviceError.emit(t),[2]}))}))})),document.body.append(t),this._modal=t,[2]}))}))},t.prototype.dismiss=function(){return r(this,void 0,void 0,(function(){return i(this,(function(t){return this._modal?(this._modal&&this._modal.parentNode.removeChild(this._modal),this._modal=null,[2]):[2]}))}))},t.prototype.render=function(){return Object(o["g"])("div",null)},Object.defineProperty(t,"style",{get:function(){return":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0,0,0,.15)}.content{-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2);width:600px;height:600px}"},enumerable:!0,configurable:!0}),t}()}}]);
//# sourceMappingURL=chunk-2d0c211b.b267e68d.js.map