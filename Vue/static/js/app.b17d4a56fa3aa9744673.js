webpackJsonp([1],{"4qN4":function(t,e){},"7OjK":function(t,e){},"G/2H":function(t,e){t.exports="data:image/gif;base64,R0lGODlhGAAYAKIAAP///8z/zAAAAOjo6AAzAACZMwAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAGAAYAAADQgi63P4wykmrvTjrzbufQyiKjmCe56iWKPpFQcAQxBXLRQHQNXUrOQVv8gPqhDRYjBFcDB9L5tHZqzQ5101Ws3UkAAAh+QQJCgAAACwAAAAAGAAYAAADRQi63P4wykmrjUJcl/Ve3QdmohKWAImuDeG+7wXPrDQMTFFcNx4EAN2O0lP8FMJJ0QhE6iJLZu75uDWO0wsWtS11RV9HAgAh+QQJCgAAACwAAAAAGAAYAAADRwi6DCItSvambfXqrC1XBNEtXyiODgSGqJKZrQvBMcPWuFbsPN/2wFwuEMgNBgBisXZUKJlIJzHWXDxRVetylDVGhV1cOJIAACH5BAkKAAAALAAAAAAYABgAAANICLoMRC1K9qZt9eqslRAYxBTF9IELB5Cl+aXiSmqnkrEdUFd4rqOKmW9IBASOSOQwySw6F4PBExqdKqJSK9YK2Gqz3LB4zEgAACH5BAkKAAAALAAAAAAYABgAAANDCLoMVS1K9qZt9eqsFSEYxATB9IELB5Cl+aXiSmqnkrEdUFd4rqOKmW+oEBiPx8hgyWQin8pmk0itWq/YrHbL7XojCQAh+QQJCgAAACwAAAAAGAAYAAADRwi6DBEtSvambfXqrFUpGMQMw/SBCweQpfml4kpqp5KxHVBXeK6jiplvqCAYj8chckls+gQC5wIalVKlgKsVis1Wu+CwGJwAACH5BAkKAAAALAAAAAAYABgAAANICLoMMy1K9qZt9eqsVQgY1HkfJY7AByocqrInmpatXMp4VOw8L/fAnLBDIAwVRaNAkEsqljjnk4mSTmXFBvQI2B69Q7BQHEkAACH5BAUKAAAALAAAAAAYABgAAANECLrc/jDKSWscw0KctePeh4UNSC7jSQZs22purM5OUTCCoNk3QQA5HYWn8CmCE2Lxd8xFlEuc82FrGKWaq0p74pK8jgQAOw=="},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("cEpl"),i=o.n(n),s={name:"Test",data:function(){return{msg:"你好",items:[1,2,3,4,5,6,7],input:"",active:"active"}},methods:{getInfo:function(t){t.target.setAttribute("class","active")},getKey:function(){this.items.push(this.input),this.input=""},sendInfo:function(){this.$emit("sendInfo",this.msg)}},watch:{items:function(t){console.log(1),this.msg="enter"}},computed:{},props:{title:{type:String,required:!0},title2:{type:Object,default:function(){return{name:" ",value:0}},validator:function(t){return t.value>9}}}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Test"},[o("P",{class:t.active},[t._v(t._s(t.msg)+"-"+t._s(t.title)+"-"+t._s(t.title2.value))]),t._v(" "),o("ul",t._l(t.items,function(e){return o("li",{on:{click:t.getInfo}},[t._v(t._s(e))])})),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],attrs:{type:"text"},domProps:{value:t.input},on:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.getKey(e):null},input:function(e){e.target.composing||(t.input=e.target.value)}}}),t._v(" "),o("button",{on:{click:t.sendInfo}},[t._v("发送信息")]),t._v(" "),t._t("s2",[t._v("默认信息")],{text:"传递信息"}),t._v(" "),t._t("default")],2)},staticRenderFns:[]};var r={name:"HelloWorld",data:function(){return{msg:"Hello Vue",title:"Hello Vue",title2:{name:"hello",value:10}}},components:{Test:o("VU/8")(s,a,!1,function(t){o("qFRR")},null,null).exports},methods:{getInfo:function(t){console.log(t)}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"hello"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),o("Test",{attrs:{title:t.title,title2:t.title2},on:{sendInfo:t.getInfo},scopedSlots:t._u([{key:"s2",fn:function(e){return o("div",{},[t._v("\n          "+t._s(e.text)+"\n      ")])}}])},[o("div",[t._v("匿名")])])],1)},staticRenderFns:[]};var c=o("VU/8")(r,l,!1,function(t){o("Vxtw")},"data-v-194a2349",null).exports,d=o("mvHQ"),u=o.n(d);function m(t){return("00"+t).substr(t.length)}var v={name:"sonTodoForm",data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()+864e5<=Date.now()},shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}},{text:"明天",onClick:function(t){var e=new Date;e.setTime(e.getTime()+864e5),t.$emit("pick",e)}},{text:"一周后",onClick:function(t){var e=new Date;e.setTime(e.getTime()+6048e5),t.$emit("pick",e)}}]},timeOptions:{selectableRange:function(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var o={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var n in o)if(new RegExp("("+n+")").test(e)){var i=o[n]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?i:m(i))}return e}(new Date,"hh:mm:ss")+" - 23:59:59"}}},methods:{addsonTodo:function(){for(var t in this.sonTodo)if(""==this.sonTodo[t])return console.log("不能为空",this.sonTodo[t]),void this.$notify({title:"警告",message:"请输入内容",type:"warning"});var e=new Date(this.sonTodo.date+" "+this.sonTodo.time);this.sonTodo.timestamp=Date.parse(e),this.$emit("sendTodo",JSON.parse(u()(this.sonTodo))),this.$notify({title:"成功",message:"已为您记录",type:"success"})}},props:{sonTodo:{type:Object},isAdd:{type:Boolean},inline:{type:Boolean}}},p={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{model:t.sonTodo,"label-width":"80px",inline:t.inline}},[o("el-form-item",{attrs:{label:"标题："}},[o("el-input",{attrs:{type:"text"},model:{value:t.sonTodo.title,callback:function(e){t.$set(t.sonTodo,"title",e)},expression:"sonTodo.title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"描述："}},[o("el-input",{attrs:{type:"text"},model:{value:t.sonTodo.describe,callback:function(e){t.$set(t.sonTodo,"describe",e)},expression:"sonTodo.describe"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"日期："}},[o("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd","picker-options":t.pickerOptions},model:{value:t.sonTodo.date,callback:function(e){t.$set(t.sonTodo,"date",e)},expression:"sonTodo.date"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"时间："}},[o("el-time-picker",{attrs:{"picker-options":t.timeOptions,placeholder:"选择时间点","value-format":"HH:mm:ss"},model:{value:t.sonTodo.time,callback:function(e){t.$set(t.sonTodo,"time",e)},expression:"sonTodo.time"}})],1),t._v(" "),o("el-form-item",[t.isAdd?o("el-button",{on:{click:t.addsonTodo}},[t._v("添加")]):t._e()],1)],1)],1)},staticRenderFns:[]};var f={name:"TodoList",created:function(){var t=JSON.parse(localStorage.getItem("myTodos"));t&&(this.Todos=t)},components:{TodoForm:o("VU/8")(v,p,!1,function(t){o("erq3")},"data-v-ba9358da",null).exports},updated:function(){},mounted:function(){this.loading=!1},data:function(){return{Todos:[],Todo:{title:"",describe:"",date:"",time:"",timestamp:-1},items:[],num:0,loading:!0,timestamp:Date.parse(new Date),dialogTableVisible:!1,dialogFormVisible:!1,myTodo:{},index:0}},methods:{randomIndex:function(){return Math.floor(Math.random()*this.items.length)},tableRowClassName:function(t){t.row;var e=t.rowIndex;return this.Todos[e].timestamp<this.timestamp?"warning-row":this.Todos[e].timestamp-864e5<this.timestamp?"success-row":""},getTodo:function(t){var e={title:t.title,describe:t.describe,date:t.date,time:t.time,timestamp:t.timestamp};this.dialogFormVisible?(console.log(this.index,e),this.Todos.splice(this.index,1,e)):this.Todos.push(e),this.Todo={title:"",describe:"",time:"",date:"",timestamp:-1},localStorage.setItem("myTodos",u()(this.Todos)),this.dialogFormVisible=!1},removeTodo:function(t){this.Todos.splice(t,1),localStorage.setItem("myTodos",u()(this.Todos))},edit:function(t){this.index=t,this.myTodo=JSON.parse(u()(this.Todos[t])),this.dialogFormVisible=!0},changeTodo:function(){this.$refs._TodoForm.addsonTodo()}}},g={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",[o("h2",[t._v("TodoList")]),t._v(" "),o("div",{staticClass:"color-grid warning-row"},[t._v("已过期")]),o("div",{staticClass:"color-grid success-row"},[t._v("即将到来")])]),t._v(" "),o("el-row",[o("el-col",[o("TodoForm",{attrs:{sonTodo:t.Todo,isAdd:"",inline:""},on:{sendTodo:t.getTodo}})],1)],1),t._v(" "),o("el-table",{directives:[{name:"show",rawName:"v-show",value:t.Todos.length>0,expression:"Todos.length>0"},{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.Todos,height:"400","row-class-name":t.tableRowClassName}},[o("el-table-column",{attrs:{type:"index",width:"80",fixed:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"title",label:"标题",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{prop:"describe",label:"描述",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{prop:"date",label:"日期"}}),t._v(" "),o("el-table-column",{attrs:{prop:"time",label:"时间"}}),t._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticClass:"Todo-button",attrs:{type:"text",size:"small"},on:{click:function(o){t.removeTodo(e.$index)}}},[t._v("\n\t\t\t\t\t\t移除\n\t\t\t\t\t")]),t._v(" "),o("el-button",{staticClass:"Todo-button",attrs:{type:"text",size:"small"},on:{click:function(o){t.edit(e.$index)}}},[t._v("\n\t\t\t\t\t\t编辑\n\t\t\t\t\t\t")])]}}])})],1),t._v(" "),o("el-dialog",{attrs:{title:"编辑",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("todo-form",{ref:"_TodoForm",attrs:{sonTodo:t.myTodo,inline:!1},on:{sendTodo:t.getTodo}}),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.changeTodo}},[t._v("更 改")])],1)],1)],1)},staticRenderFns:[]};var A=o("VU/8")(f,g,!1,function(t){o("a7M4")},null,null).exports,h={name:"myslot",data:function(){return{test:"aa"}},props:{title:{type:Array,require:!0,validator:function(t){return!0}}},methods:{sendInfo:function(){this.$emit("test",this.test)}}},_={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.title[0].title,expression:"title[0].title"}],attrs:{type:"text"},domProps:{value:t.title[0].title},on:{input:function(e){e.target.composing||t.$set(t.title[0],"title",e.target.value)}}}),t._v(" "),o("button",{on:{click:t.sendInfo}},[t._v("子组件传递给父组件消息")]),t._v(" "),t._l(t.title,function(e){return o("ul",[o("li",[t._v(t._s(e.title))]),t._v(" "),o("li",[t._v(t._s(e.content))])])})],2)},staticRenderFns:[]};var b={name:"api",data:function(){return{titile:[{title:"111",content:"content1"},{title:"123",content:"content2"}]}},components:{myslot:o("VU/8")(h,_,!1,function(t){o("7OjK")},null,null).exports},methods:{getinfo:function(t){console.log("我是子组件的prop:"+t)}}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this._v("\n\tapi\n\t"),e("myslot",{attrs:{title:this.titile},on:{test:this.getinfo}})],1)},staticRenderFns:[]};var w=o("VU/8")(b,T,!1,function(t){o("P9hq")},null,null).exports,x={name:"Myanimate",data:function(){return{myFontColor:""}},mounted:function(){this.myFontColor=this.fontColor},props:{progress:{},fontColor:{default:function(){return"blue"}},bkground:{default:function(){return"rgb(118, 218, 255)"}}},computed:{myProgress:function(){var t=parseInt(this.progress);return t>=55&&(this.myFontColor="white"),35-t+"%"}}},y={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container"},[o("span",{staticClass:"progress",style:{color:t.myFontColor}},[t._v(t._s(t.progress?t.progress:0)+"%")]),t._v(" "),o("div",{staticClass:"water",style:{background:t.bkground}},[o("div",{staticClass:"wave",style:{top:t.myProgress}})])])},staticRenderFns:[]};var C=o("VU/8")(x,y,!1,function(t){o("zEJD")},"data-v-45365fed",null).exports,k={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",[t._v("我的Vue主页")]),t._v(" "),o("h3",[t._v("该网页是使用Vue-cli+Element UI进行开发的，包含了我的各种Vue的小练习。")]),t._v(" "),o("p",[o("strong",[o("router-link",{attrs:{to:"/list"}},[t._v("TodoList:")])],1),t._v("一个简单的记事本，可以当做备忘录使用。熟悉了父子组件间的传值。")]),t._v(" "),o("p",[o("strong",[o("router-link",{attrs:{to:"/douban"}},[t._v("豆瓣电影排行榜:")])],1),t._v("强化组件化练习，使用vue-axios和vue lazyload")])])},staticRenderFns:[]};var F=o("VU/8")({name:"index",data:function(){return{}}},k,!1,function(t){o("hv29")},"data-v-2b25779c",null).exports,E=(o("4qN4"),{name:"App",components:{HelloWorld:c,TodoList:A,api:w,Myanimate:C,index:F},mounted:function(){this.changeProgress()},data:function(){return{progress:0,activeIndex:"/"}},updated:function(){var t=location.href.split("").slice(location.href.indexOf("#")+1).join("");this.activeIndex=t},methods:{changeProgress:function(){var t=this,e=setInterval(function(){t.progress=parseInt(t.progress)+2,t.progress>=100&&clearInterval(e)},60)},handleSelect:function(t,e){console.log(t,e)}}}),V={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":t.activeIndex,router:!0,mode:"horizontal"},on:{select:t.handleSelect}},[o("el-menu-item",{attrs:{index:"/"}},[t._v("首页")]),t._v(" "),o("el-menu-item",{attrs:{index:"/list"}},[t._v("TodoList")]),t._v(" "),o("el-menu-item",{attrs:{index:"/douban"}},[t._v("豆瓣电影TOP250")]),t._v(" "),o("el-menu-item",{attrs:{index:"/3",disabled:""}},[t._v("暂未开放")])],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:24}},[o("router-view")],1)],1),t._v(" "),t.progress<100?o("div",{staticClass:"loading"},[o("Myanimate",{staticClass:"vcenter",attrs:{progress:t.progress}})],1):t._e()],1)},staticRenderFns:[]};var S=o("VU/8")(E,V,!1,function(t){o("NQ64")},null,null).exports,I=o("x4un"),Q=o.n(I),q=o("zO6J"),D={name:"DoubanMovie",data:function(){return{}},computed:{getDirectots:function(){return B(this.movie.directors)},getCasts:function(){return B(this.movie.casts)},getStars:function(){return parseFloat(this.movie.rating.average)}},props:{movie:{type:Object}},mounted:function(){}};function B(t){if(1==t.length)return t[0].name;if(t.length>1){for(var e="",o=0,n=t.length-1;o<n;o++)e+=t[o].name+"/";return e+=t[t.length-1].name}return"暂未收录"}var N={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"movie"},[o("el-row",{staticClass:"movie-info-container"},[o("el-col",{attrs:{xs:8,sm:8,lg:{span:6,offset:2}}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.movie.images.large,expression:"movie.images.large"}],staticClass:"movie-cover"})]),t._v(" "),o("el-col",{staticClass:"movie-info",attrs:{xs:16,sm:16,lg:14}},[o("h4",[t._t("rank"),t._v(t._s(t.movie.title)+t._s(t.movie.original_title?"/"+t.movie.original_title:""))],2),t._v(" "),o("p",[t._v("导演: "+t._s(t.getDirectots))]),t._v(" "),o("p",[t._v("主演: "+t._s(t.getCasts))]),t._v(" "),o("p",[t._v("上映时间: "+t._s(t.movie.year))]),t._v(" "),o("p",[t._v("标签: \n                "),t._l(t.movie.genres,function(e){return o("span",{staticClass:"movie-tags"},[o("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e))])],1)})],2),t._v(" "),o("p",[t._v("评分:"),o("span",{staticClass:"movie-star"},[o("el-rate",{attrs:{manx:"10",disabled:"","show-score":"",colors:["#99A9BF","#F7BA2A","#FF9900"]},model:{value:t.getStars,callback:function(e){t.getStars=e},expression:"getStars"}})],1)])])],1)],1)},staticRenderFns:[]};var R=o("VU/8")(D,N,!1,function(t){o("luRc")},"data-v-9270d02a",null).exports,O=o("6yg2"),$={name:"Douban",data:function(){return{movies:[],len:0,isloading:!0}},components:{DoubanMovie:R},methods:{getinfo:function(t){var e=this;this.isloading=!0,O('http://query.yahooapis.com/v1/public/yql?q=select * from json where url="api.douban.com/v2/movie/top250?start='+t+'"&format=json',null,function(t,o){if(t)console.error(t.message),e.isloading=!1;else{console.log(o);var n=JSON.parse(u()(o)).query.results.json;console.log(n),e.movies.length>0?e.movies=e.movies.concat(n.subjects):e.movies=n.subjects,localStorage.setItem("movies",u()(e.movies)),e.isloading=!1,e.len>=240?e.len=250:e.len+=20}})},changeScroll:function(){(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)+document.documentElement.clientHeight+20>=document.body.scrollHeight&&!this.isloading&&(this.isloading=!0,console.log("你好"),this.getinfo(this.len))}},mounted:function(){window.addEventListener("scroll",this.changeScroll)},destroyed:function(){window.removeEventListener("scroll",this.changeScroll)},created:function(){localStorage.getItem("movies")?(this.movies=JSON.parse(localStorage.getItem("movies")),this.len=this.movies.length,console.log(this.movies),this.isloading=!1):(console.log("初始化"),this.getinfo(this.len))}},H={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"top-info"},[o("h2",[t._v("豆瓣电影TOP250")])])])],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:24}},[o("ul",{staticClass:"movie-list"},[t._l(t.movies,function(e,n){return o("li",[o("DoubanMovie",{attrs:{movie:e}},[o("span",{class:n<3?["movie-rank"+n,"movie-rank"]:"movie-rank",attrs:{slot:"rank"},slot:"rank"},[t._v(t._s(n+1))])])],1)}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isloading,expression:"isloading"}],attrs:{id:"loading"}},[o("div",{staticClass:"movie-loading"},[o("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[o("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])])])],2)])],1)],1)},staticRenderFns:[]};var K=o("VU/8")($,H,!1,function(t){o("cVHN")},"data-v-29d8c22d",null).exports,M=o("aozt"),j=o.n(M),J=o("lJzc"),L=o.n(J);i.a.config.productionTip=!1,i.a.prototype.$ajax=j.a,i.a.use(L.a,{loading:o("G/2H")}),i.a.use(q.a);var P=new q.a({routes:[{path:"/",component:F},{path:"/list",component:A},{path:"/douban",component:K}]});i.a.use(Q.a);new i.a({el:"#app",render:function(t){return t(S)},router:P}).$mount("#app")},NQ64:function(t,e){},P9hq:function(t,e){},Vxtw:function(t,e){},a7M4:function(t,e){},cVHN:function(t,e){},erq3:function(t,e){},hv29:function(t,e){},luRc:function(t,e){},qFRR:function(t,e){},zEJD:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b17d4a56fa3aa9744673.js.map