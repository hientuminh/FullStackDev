(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),i=t(3),m=t(2),l=t.n(m),f="/api/persons",s=function(){return l.a.get(f).then((function(e){return e.data}))},d=function(e){return l.a.post(f,e).then((function(e){return e.data}))},h=function(e,n){return l.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return l.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){return r.a.createElement("div",null,e.person.name,": ",e.person.number," ",r.a.createElement("button",{value:e.person.id,onClick:function(n){return function(n){window.confirm("Do you want to delete ".concat(e.person.name,"?"))&&e.onClickDeletePerson(n.target.value)}(n)}},"delete"))},v=function(e){var n=e.persons,t=e.onClickDeletePerson;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement(p,{key:e.id,person:e,onClickDeletePerson:t})})))},E=function(e){var n=e.onSubmissionChange,t=e.nameValue,a=e.numberValue,o=e.onInputChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,name:"name",onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,name:"number",onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.searchName,t=e.onPhoneBookFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,name:"search_name",onChange:t}))},w=function(e){var n=e.message;if(""===n.content)return null;var t="error"===n.type?"error":"success";return r.a.createElement("div",{className:t},n.content)},C=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)({type:"",content:""}),m=Object(i.a)(u,2),l=m[0],f=m[1];Object(a.useEffect)((function(){s().then((function(e){return o(e)}))}),[]);var p=Object(a.useState)(""),C=Object(i.a)(p,2),k=C[0],O=C[1],j=Object(a.useState)({name:"",number:""}),y=Object(i.a)(j,2),P=y[0],S=y[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:l}),r.a.createElement(g,{searchName:k,onPhoneBookFilterChange:function(e){"search_name"===e.target.name&&O(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(E,{onSubmissionChange:function(e){if(e.preventDefault(),t.find((function(e){return e.name===P.name}))){if(window.confirm("".concat(P.name," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===P.name})),a=Object(c.a)({},n,{number:P.number});h(n.id,a).then((function(e){o(t.map((function(t){return t.id!==n.id?t:e})))})).catch((function(e){alert("the phonebook was updated failed")}))}}else if(""===P.name||""===P.number)alert("You can NOT input empty number or name");else{var r={name:P.name,number:P.number,id:t.length+1};d(r).then((function(e){o(t.concat(r));var n={type:"succes",content:"Added ".concat(P.name)};f(n)})).catch((function(e){alert("the phonebook was created failed")}))}S({name:"",number:""}),O("")},nameValue:P.name,numberValue:P.number,onInputChange:function(e){if("name"===e.target.name){var n=Object(c.a)({},P,{name:e.target.value});S(n)}if("number"===e.target.name){var t=Object(c.a)({},P,{number:e.target.value});S(t)}}}),r.a.createElement(v,{persons:t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase().trim())})),onClickDeletePerson:function(e){var n=t.find((function(n){return n.id===e}));b(e).then((function(n){o(t.filter((function(n){return n.id!==e})))})).catch((function(e){var t={type:"error",content:"Information of ".concat(n.name," has already been removed from server")};f(t)}))}}))};t(37);u.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d792b44c.chunk.js.map