(function(t){function e(e){for(var s,r,i=e[0],u=e[1],c=e[2],d=0,f=[];d<i.length;d++)r=i[d],a[r]&&f.push(a[r][0]),a[r]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(t[s]=u[s]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],s=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(s=!1)}s&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var s={},a={app:0},o=[];function r(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var s=n("64a9"),a=n.n(s);a.a},"0648":function(t,e,n){"use strict";var s=n("0cd9"),a=n.n(s);a.a},"0cd9":function(t,e,n){},"3c56":function(t,e,n){"use strict";var s=n("80e8"),a=n.n(s);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("AuthRequired",[n("TaskList")],1)],1)])},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.authorized?n("div",[t._t("default")],2):n("div",[n("input",{attrs:{id:"enterAuth",type:"password",placeholder:"Enter auth env"},on:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.requestToken(e):null}}})])])},i=[],u={name:"AuthRequired",methods:{requestToken:function(t){this.$store.dispatch("requestToken",t.target.value)}},computed:{authorized:function(){return this.$store.getters.authorized}},mounted:function(){localStorage.token&&this.$store.commit("setupAxios",localStorage.token)}},c=u,l=(n("3c56"),n("2877")),d=Object(l["a"])(c,r,i,!1,null,"b7e3c2d2",null);d.options.__file="AuthRequired.vue";var f=d.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.tasksLoaded?n("ul",{staticClass:"task-list"},t._l(t.tasks,function(e){return n("TaskItem",t._b({key:e.id},"TaskItem",e,!1,!0))}),1):n("div",{staticClass:"loading-label"},[t._v("Ща все будет...")])])},p=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("div",{staticClass:"task-li"},[n("span",[t._v("–")]),n("textarea",{directives:[{name:"focus",rawName:"v-focus"}],staticClass:"task",domProps:{value:t.title},on:{input:function(e){t.$emit("update:title",e.target.value)},change:t.taskChanged,keydown:[function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),t.taskChanged(e)):null},t.fit]}})])])},v=[],m=function(t){t.style.height="1px",t.style.height=t.scrollHeight-4+"px"},T={name:"TaskItem",props:["title","id"],methods:{taskChanged:function(t){""!==this.$store.getters.lastTask.title&&this.$store.commit("appendBlankTask");var e=this.$store.getters.getTaskById(this.id);""!==e.title&&e.new&&this.$store.dispatch("createTask",e),m(t.target)},fit:function(t){m(t.target)}}},g=T,b=(n("57e3"),Object(l["a"])(g,h,v,!1,null,"5fb4e664",null));b.options.__file="TaskItem.vue";var _=b.exports,y={name:"TaskList",components:{TaskItem:_},computed:{tasksLoaded:function(){return this.$store.state.tasksLoaded},tasks:function(){return this.$store.state.tasks}},mounted:function(){this.$store.commit("appendBlankTask"),this.$store.dispatch("refreshTasks")}},x=y,w=(n("0648"),Object(l["a"])(x,k,p,!1,null,"62580242",null));w.options.__file="TaskList.vue";var O=w.exports,j={name:"app",components:{AuthRequired:f,TaskList:O}},$=j,I=(n("034f"),Object(l["a"])($,a,o,!1,null,null,null));I.options.__file="App.vue";var C=I.exports,L=(n("20d6"),n("7514"),n("75fc")),A=n("2f62"),S=n("bc3a"),q=n.n(S),E=n("c64e"),P=n.n(E);s["a"].use(A["a"]);var z="",B=new A["a"].Store({state:{tasksLoaded:!1,tasks:[],axiosInstance:null},mutations:{appendBlankTask:function(t){t.tasks=[].concat(Object(L["a"])(t.tasks),[{title:"",id:P()(),new:!0}])},setupAxios:function(t,e){t.axiosInstance=q.a.create({headers:{Authorization:"JWT ".concat(e)},baseURL:z})},setTasks:function(t,e){t.tasks=[].concat(Object(L["a"])(e),Object(L["a"])(t.tasks))},setTasksLoaded:function(t){t.tasksLoaded=!0},setCreatedTask:function(t,e){var n=e.oldTask,s=e.newTask,a=this.getters.getTaskIndex(n.id);t.tasks=[].concat(Object(L["a"])(t.tasks.slice(0,a)),[s],Object(L["a"])(t.tasks.slice(a-t.tasks.length+1)))},setTaskNotNew:function(t,e){e.new=!1}},actions:{requestToken:function(t,e){var n=t.commit;t.dispatch;q.a.post("".concat(z,"/login_via_env/").concat(e)).then(function(t){var e=localStorage.token=t.data.token;n("setupAxios",e)}).catch(function(t){alert(t.response.data.error)})},refreshTasks:function(t){var e=t.commit,n=t.state;n.axiosInstance.get("/tasks").then(function(t){e("setTasks",t.data),e("setTasksLoaded")})},createTask:function(t,e){var n=t.commit,s=t.state;n("setTaskNotNew",e),s.axiosInstance.post("/tasks/create",e).then(function(t){n("setCreatedTask",{oldTask:e,newTask:t.data})})}},getters:{lastTask:function(t){return t.tasks[t.tasks.length-1]},authorized:function(t){return null!==t.axiosInstance},getTaskById:function(t){return function(e){return t.tasks.find(function(t){return t.id===e})}},getTaskIndex:function(t){return function(e){return t.tasks.findIndex(function(t){return t.id===e})}}}});s["a"].config.productionTip=!1,new s["a"]({store:B,render:function(t){return t(C)}}).$mount("#app"),s["a"].directive("focus",{inserted:function(t){m(t),t.focus()}})},"57e3":function(t,e,n){"use strict";var s=n("99f3"),a=n.n(s);a.a},"64a9":function(t,e,n){},"80e8":function(t,e,n){},"99f3":function(t,e,n){}});
//# sourceMappingURL=app.100ca491.js.map