(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4ad8ba0"],{"0113":function(t,e,n){"use strict";n.r(e);var a=n("7a23");function c(t,e,n,c,o,s){var r=Object(a["I"])("AdminNavbar"),i=Object(a["I"])("router-view");return Object(a["y"])(),Object(a["g"])(a["a"],null,[Object(a["k"])(r),Object(a["k"])(i)],64)}n("ac1f"),n("5319");var o={class:"navbar navbar-expand-lg navbar-dark bg-dark"},s={class:"container-fluid"},r=Object(a["j"])("Brand Logo"),i=Object(a["h"])("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(a["h"])("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarSupportedContent"},b={class:"navbar-nav me-auto mb-2 mb-lg-0"},l={class:"nav-item"},d=Object(a["j"])("產品管理"),h={class:"nav-item"},p=Object(a["j"])("訂單管理"),j={class:"nav-item"},O=Object(a["j"])("優惠券"),v=Object(a["j"])("回前台");function f(t,e,n,c,f,k){var m=Object(a["I"])("router-link");return Object(a["y"])(),Object(a["g"])("nav",o,[Object(a["h"])("div",s,[Object(a["k"])(m,{class:"navbar-brand",to:"/"},{default:Object(a["U"])((function(){return[r]})),_:1}),i,Object(a["h"])("div",u,[Object(a["h"])("ul",b,[Object(a["h"])("li",l,[Object(a["k"])(m,{class:"nav-link",to:"/admin/products"},{default:Object(a["U"])((function(){return[d]})),_:1})]),Object(a["h"])("li",h,[Object(a["k"])(m,{class:"nav-link",to:"/admin/orders"},{default:Object(a["U"])((function(){return[p]})),_:1})]),Object(a["h"])("li",j,[Object(a["k"])(m,{class:"nav-link",to:"/admin/coupons"},{default:Object(a["U"])((function(){return[O]})),_:1})])]),Object(a["h"])("div",null,[Object(a["h"])("button",{type:"button",class:"btn btn-outline-primary me-3",onClick:e[0]||(e[0]=function(){return t.logOut&&t.logOut.apply(t,arguments)})}," 登出 "),Object(a["k"])(m,{to:"/cart",class:"btn btn-primary"},{default:Object(a["U"])((function(){return[v]})),_:1})])])])])}var k=n("5ba8"),m=n("7695"),g={mixins:[k["a"],m["a"]],methods:{}},$=n("6b0d"),x=n.n($);const w=x()(g,[["render",f]]);var y=w,L={name:"Dashboard",components:{AdminNavbar:y},data:function(){return{checkSuccess:!1}},methods:{checkLogin:function(){var t=this,e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e,this.$http.post("".concat("https://vue3-course-api.hexschool.io/v2","/api/user/check")).then((function(e){t.checkSuccess=!0,t.$httpMessageState(e,"登入")})).catch((function(e){t.$httpMessageState(e.response,"登入"),t.$router.push("/login")}))}},mounted:function(){this.checkLogin()}};const S=x()(L,[["render",c]]);e["default"]=S},"5ba8":function(t,e,n){"use strict";n("ac1f"),n("5319");e["a"]={data:function(){return{isLogin:!1}},methods:{checkLogin:function(){var t=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t,this.isLogin=!!t}},mounted:function(){this.checkLogin()}}},7695:function(t,e,n){"use strict";e["a"]={methods:{logOut:function(){document.cookie='hexToken=""; expires=""',alert("已清除 Token"),this.$router.push("/login")}}}}}]);
//# sourceMappingURL=chunk-e4ad8ba0.2af05060.js.map