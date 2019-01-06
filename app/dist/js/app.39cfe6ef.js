(function(t){function e(e){for(var a,r,i=e[0],u=e[1],c=e[2],f=0,d=[];f<i.length;f++)r=i[f],s[r]&&d.push(s[r][0]),s[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);l&&l(e);while(d.length)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var u=n[i];0!==s[u]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},s={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("64a9"),s=n.n(a);s.a},"3c56":function(t,e,n){"use strict";var a=n("80e8"),s=n.n(a);s.a},4662:function(t,e,n){"use strict";var a=n("e11d"),s=n.n(a);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("AuthRequired",[n("TaskList")],1)],1)])},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.authorized?n("div",[t._t("default")],2):n("div",[n("input",{attrs:{id:"enterAuth",type:"password",placeholder:"Enter auth env"},on:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.requestToken(e):null}}})])])},i=[],u={name:"AuthRequired",methods:{requestToken:function(t){this.$store.dispatch("requestToken",t.target.value)}},computed:{authorized:function(){return this.$store.getters.authorized}},mounted:function(){localStorage.token&&this.$store.commit("setupAxios",localStorage.token)}},c=u,l=(n("3c56"),n("2877")),f=Object(l["a"])(c,r,i,!1,null,"b7e3c2d2",null);f.options.__file="AuthRequired.vue";var d=f.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.tasksLoaded?n("ul",{staticClass:"task-list"},t._l(t.tasks,function(e){return n("TaskItem",t._b({},"TaskItem",e,!1,!0))}),1):n("div",{staticClass:"loading-label"},[t._v("Ща все будет...")])])},k=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("div",{staticClass:"task-li"},[n("span",[t._v("–")]),n("textarea",{directives:[{name:"focus",rawName:"v-focus"}],staticClass:"task",domProps:{value:t.title},on:{input:function(e){t.$emit("update:title",e.target.value)},change:t.taskChanged,keydown:[function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),t.taskChanged(e)):null},t.fit]}})])])},v=[],m={name:"TaskItem",props:["title","id"],methods:{taskChanged:function(t){""!==this.$store.getters.lastTask.title&&this.$store.commit("appendBlankTask"),fitTextArea(t.target)},fit:function(t){fitTextArea(t.target)}}},b=m,g=(n("4662"),Object(l["a"])(b,h,v,!1,null,"40ac2fa1",null));g.options.__file="TaskItem.vue";var _=g.exports,T={name:"TaskList",components:{TaskItem:_},computed:{tasksLoaded:function(){return this.$store.state.tasksLoaded},tasks:function(){return this.$store.state.tasks}},mounted:function(){this.$store.dispatch("refreshTasks")}},y=T,x=(n("639a"),Object(l["a"])(y,p,k,!1,null,"3041c6b2",null));x.options.__file="TaskList.vue";var O=x.exports,j={name:"app",components:{AuthRequired:d,TaskList:O}},w=j,$=(n("034f"),Object(l["a"])(w,s,o,!1,null,null,null));$.options.__file="App.vue";var A=$.exports,L=n("75fc"),C=n("2f62"),I=n("bc3a"),S=n.n(I);a["a"].use(C["a"]);var q=new C["a"].Store({state:{tasksLoaded:!1,tasks:[{title:""}],axiosInstance:null},mutations:{appendBlankTask:function(t){t.tasks=[].concat(Object(L["a"])(t.tasks),[{title:""}])},setupAxios:function(t,e){t.axiosInstance=S.a.create({headers:{Authorization:"JWT ".concat(e)}})},setTasks:function(t,e){t.tasks=[].concat(Object(L["a"])(e),Object(L["a"])(t.tasks))},setTasksLoaded:function(t){t.tasksLoaded=!0}},actions:{requestToken:function(t,e){var n=t.commit;t.dispatch;S.a.post("/login_via_env/".concat(e)).then(function(t){var e=localStorage.token=t.data.token;n("setupAxios",e)}).catch(function(t){alert(t.response.data.error)})},refreshTasks:function(t){var e=t.commit,n=t.state;n.axiosInstance.get("/tasks").then(function(t){e("setTasks",t.data),e("setTasksLoaded")})}},getters:{lastTask:function(t){return t.tasks[t.tasks.length-1]},authorized:function(t){return null!==t.axiosInstance}}}),E=function(t){t.style.height="1px",t.style.height=t.scrollHeight-4+"px"};a["a"].config.productionTip=!1,new a["a"]({store:q,render:function(t){return t(A)}}).$mount("#app"),a["a"].directive("focus",{inserted:function(t){E(t),t.focus()}})},"639a":function(t,e,n){"use strict";var a=n("8b5d"),s=n.n(a);s.a},"64a9":function(t,e,n){},"80e8":function(t,e,n){},"8b5d":function(t,e,n){},e11d:function(t,e,n){}});
//# sourceMappingURL=app.39cfe6ef.js.map