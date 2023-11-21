(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[8],{221:function(t,e,n){},233:function(t,e,n){"use strict";n.r(e);var r=n(49),c=n(36),a=n(1),s=n(3),i=n(43),o=n(13),u=n(37),l=n(231),p=n(232),b=(n(221),n(0)),j=function(t,e,n){switch(t){case"waiting":return Object(b.jsx)(o.a,{});case"loading":return n?Object(b.jsx)(e,{}):Object(b.jsx)(o.a,{});case"confirmed":return Object(b.jsx)(e,{});case"error":return Object(b.jsx)(u.a,{});default:throw new Error("Unexpected process value")}},m=function(){var t=Object(a.useState)([]),e=Object(c.a)(t,2),n=e[0],o=e[1],u=Object(a.useState)(0),m=Object(c.a)(u,2),h=m[0],d=m[1],f=Object(a.useState)(!1),v=Object(c.a)(f,2),O=v[0],x=v[1],g=Object(a.useState)(!1),w=Object(c.a)(g,2),_=w[0],y=w[1],k=Object(i.a)(),C=k.getAllComics,N=k.process,A=k.setProcess;Object(a.useEffect)((function(){E(h,!0)}),[]);var E=function(t,e){x(!e),C(t).then(S).then((function(){return A("confirmed")}))},S=function(t){var e=!1;t.length<8&&(e=!0),o((function(e){return[].concat(Object(r.a)(e),Object(r.a)(t))})),x(!1),d((function(t){return t+8})),y(e)};return Object(b.jsxs)("div",{className:"comics__list",children:[j(N,(function(){return function(t){var e=t.map((function(t){var e={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===t.thumbnail&&(e={objectFit:"unset"}),Object(b.jsx)(l.a,{timeout:500,classNames:"comics__item",children:Object(b.jsx)("li",{className:"comics__item",children:Object(b.jsxs)(s.Link,{to:"/comics/".concat(t.id),children:[Object(b.jsx)("img",{src:t.thumbnail,alt:"comic",className:"comics__item-img",style:e}),Object(b.jsx)("div",{className:"comics__item-name",children:t.title}),Object(b.jsxs)("div",{className:"comics__item-price",children:[t.price,"$"]})]})})},t.id)}));return Object(b.jsx)("ul",{className:"comics__grid",children:Object(b.jsx)(p.a,{component:null,children:e})})}(n)}),O),Object(b.jsx)("button",{className:"button button__main button__long",disabled:O,style:{display:_?"none":"block"},onClick:function(){return E(h)},children:Object(b.jsx)("div",{className:"inner",children:"load more"})})]})},h=n(79),d=n(77),f=n(62);e.default=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(f.a,{children:[Object(b.jsx)("meta",{name:"description",content:"Marvel comics"}),Object(b.jsx)("title",{children:"Marvel comics"})]}),Object(b.jsx)(d.a,{children:Object(b.jsx)(h.a,{})}),Object(b.jsx)(d.a,{children:Object(b.jsx)(m,{})})]})}},37:function(t,e,n){"use strict";var r=n.p+"static/media/error.42292aa1.gif",c=n(0);e.a=function(){return Object(c.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:r,alt:"Error"})}},43:function(t,e,n){"use strict";var r=n(44),c=n.n(r),a=n(45),s=n(36),i=n(1);e.a=function(){var t=function(){var t=Object(i.useState)("waiting"),e=Object(s.a)(t,2),n=e[0],r=e[1];return{request:Object(i.useCallback)(function(){var t=Object(a.a)(c.a.mark((function t(e){var n,a,s,i,o,u=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"GET",a=u.length>2&&void 0!==u[2]?u[2]:null,s=u.length>3&&void 0!==u[3]?u[3]:{"Content-type":"application/json"},r("loading"),t.prev=4,t.next=7,fetch(e,{method:n,body:a,headers:s});case 7:if((i=t.sent).ok){t.next=10;break}throw new Error("Could not fetch ".concat(e,", status: ").concat(i.status));case 10:return t.next=12,i.json();case 12:return o=t.sent,t.abrupt("return",o);case 16:throw t.prev=16,t.t0=t.catch(4),r("error"),t.t0;case 20:case"end":return t.stop()}}),t,null,[[4,16]])})));return function(e){return t.apply(this,arguments)}}(),[]),clearError:Object(i.useCallback)((function(){r("loading")}),[]),process:n,setProcess:r}}(),e=t.request,n=t.clearError,r=t.process,o=t.setProcess,u="https://gateway.marvel.com:443/v1/public/",l="apikey=5b384501e48304843a7e8a1c83146bf3",p=210,b=function(){var t=Object(a.a)(c.a.mark((function t(){var n,r,a=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.length>0&&void 0!==a[0]?a[0]:p,t.next=3,e("".concat(u,"characters?limit=9&offset=").concat(n,"&").concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(h));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),j=function(){var t=Object(a.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("".concat(u,"characters?name=").concat(n,"&").concat(l));case 2:return r=t.sent,t.abrupt("return",r.data.results.map(h));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=Object(a.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("".concat(u,"characters/").concat(n,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",h(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(t){return{name:t.name,description:t.description?t.description.slice(0,210):"There is no description for this character.",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,homepage:t.urls[0].url,wiki:t.urls[1].url,id:t.id,comics:t.comics.items}},d=function(){var t=Object(a.a)(c.a.mark((function t(){var n,r,a=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.length>0&&void 0!==a[0]?a[0]:p,t.next=3,e("".concat(u,"comics?limit=8&offset=").concat(n,"&").concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(v));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("".concat(u,"comics/").concat(n,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",v(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(t){var e;return{id:t.id,title:t.title,description:t.description||"There is no description",pageCount:t.pageCount?"".concat(t.pageCount," p."):"No information about the number of pages",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,language:(null===(e=t.textObjects[0])||void 0===e?void 0:e.language)||"en-us",price:t.prices[0].price?"".concat(t.prices[0].price,"$"):"not available"}};return{clearError:n,process:r,setProcess:o,getAllCharacters:b,getCharacterByName:j,getCharacter:m,getAllComics:d,getComic:f}}},77:function(t,e,n){"use strict";var r=n(34),c=n(35),a=n(40),s=n(41),i=n(7),o=n(37),u=n(0),l=function(t){Object(a.a)(n,t);var e=Object(s.a)(n);function n(){var t;Object(r.a)(this,n);for(var c=arguments.length,a=new Array(c),s=0;s<c;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).state={error:!1},t}return Object(c.a)(n,[{key:"componentDidCatch",value:function(t,e){console.log(t,e),this.setState({error:!0})}},{key:"render",value:function(){return!0===this.state.error?Object(u.jsx)(o.a,{}):this.props.children}}]),n}(i.Component);e.a=l},78:function(t,e,n){},79:function(t,e,n){"use strict";n(78);var r=n.p+"static/media/Avengers.4065c8f9.png",c=n.p+"static/media/Avengers_logo.9eaf2193.png",a=n(0);e.a=function(){return Object(a.jsxs)("div",{className:"app__banner",children:[Object(a.jsx)("img",{src:r,alt:"Avengers"}),Object(a.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(a.jsx)("br",{}),"Stay tuned!"]}),Object(a.jsx)("img",{src:c,alt:"Avengers logo"})]})}}}]);
//# sourceMappingURL=8.29268ce0.chunk.js.map