"use strict";(globalThis.webpackChunkfewer_checkout_woocommerce=globalThis.webpackChunkfewer_checkout_woocommerce||[]).push([[205],{3641:(e,t,n)=>{n.d(t,{c:()=>r,g:()=>i,h:()=>a,o:()=>s});const a=(e,t)=>null!==t.closest(e),r=(e,t)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},t):t,i=e=>{const t={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((e=>null!=e)).map((e=>e.trim())).filter((e=>""!==e)):[])(e).forEach((e=>t[e]=!0)),t},o=/^[a-z][a-z0-9+\-.]*:/,s=async(e,t,n,a)=>{if(null!=e&&"#"!==e[0]&&!o.test(e)){const r=document.querySelector("ion-router");if(r)return null!=t&&t.preventDefault(),r.push(e,n,a)}return!1}},3986:(e,t,n)=>{n.d(t,{a:()=>r,b:()=>i,p:()=>a});const a=(e,...t)=>console.warn(`[Ionic Warning]: ${e}`,...t),r=(e,...t)=>console.error(`[Ionic Error]: ${e}`,...t),i=(e,...t)=>console.error(`<${e.tagName.toLowerCase()}> must be used inside ${t.join(" or ")}.`)},3797:(e,t,n)=>{n.d(t,{A:()=>fe,B:()=>be,C:()=>u,D:()=>Te,E:()=>m,F:()=>ce,G:()=>V,H:()=>he,I:()=>pe,J:()=>d,K:()=>G,L:()=>J,M:()=>se,N:()=>q,O:()=>M,P:()=>f,Q:()=>b,R:()=>Z,S:()=>Q,T:()=>H,a:()=>K,b:()=>o,c:()=>r,d:()=>_,e:()=>P,f:()=>p,g:()=>B,h:()=>O,i:()=>i,j:()=>k,k:()=>I,l:()=>E,m:()=>A,n:()=>C,o:()=>g,p:()=>w,q:()=>v,r:()=>y,s:()=>D,t:()=>de,u:()=>N,v:()=>L,w:()=>s,x:()=>l,y:()=>we,z:()=>ve});var a=n(3986);const r=(e,t)=>e.month===t.month&&e.day===t.day&&e.year===t.year,i=(e,t)=>!!(e.year<t.year||e.year===t.year&&e.month<t.month||e.year===t.year&&e.month===t.month&&null!==e.day&&e.day<t.day),o=(e,t)=>!!(e.year>t.year||e.year===t.year&&e.month>t.month||e.year===t.year&&e.month===t.month&&null!==e.day&&e.day>t.day),s=(e,t,n)=>{const r=Array.isArray(e)?e:[e];for(const s of r)if(void 0!==t&&i(s,t)||void 0!==n&&o(s,n)){(0,a.p)(`The value provided to ion-datetime is out of bounds.\n\nMin: ${JSON.stringify(t)}\nMax: ${JSON.stringify(n)}\nValue: ${JSON.stringify(e)}`);break}},d=(e,t)=>{if(void 0!==t)return"h23"===t;const n=new Intl.DateTimeFormat(e,{hour:"numeric"}),a=n.resolvedOptions();if(void 0!==a.hourCycle)return"h23"===a.hourCycle;const r=new Date("5/18/2021 00:00"),i=n.formatToParts(r).find((e=>"hour"===e.type));if(!i)throw new Error("Hour value not found from DateTimeFormat");return"00"===i.value},l=(e,t)=>4===e||6===e||9===e||11===e?30:2===e?(e=>e%4==0&&e%100!=0||e%400==0)(t)?29:28:31,u=(e,t={month:"numeric",year:"numeric"})=>"month"===new Intl.DateTimeFormat(e,t).formatToParts(new Date)[0].type,m=e=>"dayPeriod"===new Intl.DateTimeFormat(e,{hour:"numeric"}).formatToParts(new Date)[0].type,c=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,h=/^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,y=e=>{if(void 0===e)return;let t,n=e;return"string"==typeof e&&(n=e.replace(/\[|\]|\s/g,"").split(",")),t=Array.isArray(n)?n.map((e=>parseInt(e,10))).filter(isFinite):[n],t},p=e=>({month:parseInt(e.getAttribute("data-month"),10),day:parseInt(e.getAttribute("data-day"),10),year:parseInt(e.getAttribute("data-year"),10),dayOfWeek:parseInt(e.getAttribute("data-day-of-week"),10)});function v(e){if(Array.isArray(e))return e.map((e=>v(e)));let t=null;if(null!=e&&""!==e&&(t=h.exec(e),t?(t.unshift(void 0,void 0),t[2]=t[3]=void 0):t=c.exec(e)),null!==t){for(let e=1;e<8;e++)t[e]=void 0!==t[e]?parseInt(t[e],10):void 0;return{year:t[1],month:t[2],day:t[3],hour:t[4],minute:t[5],ampm:t[4]<12?"am":"pm"}}}const f=(e,t,n)=>t&&i(e,t)?t:n&&o(e,n)?n:e,b=e=>e>=12?"pm":"am",g=(e,t)=>{const{month:n,day:a,year:r,hour:i,minute:o}=v(e),s=null!=r?r:t.year,d=null!=n?n:12;return{month:d,day:null!=a?a:l(d,s),year:s,hour:null!=i?i:23,minute:null!=o?o:59}},w=(e,t)=>{const{month:n,day:a,year:r,hour:i,minute:o}=v(e);return{month:null!=n?n:1,day:null!=a?a:1,year:null!=r?r:t.year,hour:null!=i?i:0,minute:null!=o?o:0}},T=e=>("0"+(void 0!==e?Math.abs(e):"0")).slice(-2),x=e=>("000"+(void 0!==e?Math.abs(e):"0")).slice(-4);function D(e){if(Array.isArray(e))return e.map((e=>D(e)));let t="";return void 0!==e.year?(t=x(e.year),void 0!==e.month&&(t+="-"+T(e.month),void 0!==e.day&&(t+="-"+T(e.day),void 0!==e.hour&&(t+=`T${T(e.hour)}:${T(e.minute)}:00`)))):void 0!==e.hour&&(t=T(e.hour)+":"+T(e.minute)),t}const $=(e,t)=>void 0===t?e:"am"===t?12===e?0:e:12===e?12:e+12,k=e=>{const{dayOfWeek:t}=e;if(null==t)throw new Error("No day of week provided");return F(e,t)},O=e=>{const{dayOfWeek:t}=e;if(null==t)throw new Error("No day of week provided");return j(e,6-t)},E=e=>j(e,1),I=e=>F(e,1),A=e=>F(e,7),C=e=>j(e,7),F=(e,t)=>{const{month:n,day:a,year:r}=e;if(null===a)throw new Error("No day provided");const i={month:n,day:a,year:r};if(i.day=a-t,i.day<1&&(i.month-=1),i.month<1&&(i.month=12,i.year-=1),i.day<1){const e=l(i.month,i.year);i.day=e+i.day}return i},j=(e,t)=>{const{month:n,day:a,year:r}=e;if(null===a)throw new Error("No day provided");const i={month:n,day:a,year:r},o=l(n,r);return i.day=a+t,i.day>o&&(i.day-=o,i.month+=1),i.month>12&&(i.month=1,i.year+=1),i},_=e=>{const t=1===e.month?12:e.month-1,n=1===e.month?e.year-1:e.year,a=l(t,n);return{month:t,year:n,day:a<e.day?a:e.day}},P=e=>{const t=12===e.month?1:e.month+1,n=12===e.month?e.year+1:e.year,a=l(t,n);return{month:t,year:n,day:a<e.day?a:e.day}},S=(e,t)=>{const n=e.month,a=e.year+t,r=l(n,a);return{month:n,year:a,day:r<e.day?r:e.day}},M=e=>S(e,-1),q=e=>S(e,1),U=(e,t,n)=>t?e:$(e,n),Z=(e,t)=>{const{ampm:n,hour:a}=e;let r=a;return"am"===n&&"pm"===t?r=$(r,"pm"):"pm"===n&&"am"===t&&(r=Math.abs(r-12)),r},L=(e,t,n)=>{const{month:a,day:i,year:o}=e,s=f(Object.assign({},e),t,n),d=l(a,o);return null!==i&&d<i&&(s.day=d),void 0!==t&&r(s,t)&&void 0!==s.hour&&void 0!==t.hour&&(s.hour<t.hour?(s.hour=t.hour,s.minute=t.minute):s.hour===t.hour&&void 0!==s.minute&&void 0!==t.minute&&s.minute<t.minute&&(s.minute=t.minute)),void 0!==n&&r(e,n)&&void 0!==s.hour&&void 0!==n.hour&&(s.hour>n.hour?(s.hour=n.hour,s.minute=n.minute):s.hour===n.hour&&void 0!==s.minute&&void 0!==n.minute&&s.minute>n.minute&&(s.minute=n.minute)),s},N=(e,t,n,a,r,i)=>{const{hour:o,minute:s,day:d,month:l,year:u}=e,m=Object.assign(Object.assign({},e),{dayOfWeek:void 0});return void 0!==t&&(m.month=R(l,t)),null!==d&&void 0!==n&&(m.day=R(d,n)),void 0!==a&&(m.year=R(u,a)),void 0!==o&&void 0!==r&&(m.hour=R(o,r),m.ampm=b(m.hour)),void 0!==s&&void 0!==i&&(m.minute=R(s,i)),m},R=(e,t)=>{let n=t[0],a=Math.abs(n-e);for(let r=1;r<t.length;r++){const i=t[r],o=Math.abs(i-e);o<a&&(n=i,a=o)}return n},G=(e,t,n)=>{const a={hour:t.hour,minute:t.minute};return void 0===a.hour||void 0===a.minute?"Invalid Time":new Intl.DateTimeFormat(e,{hour:"numeric",minute:"numeric",timeZone:"UTC",hourCycle:n?"h23":"h12"}).format(new Date(D(Object.assign({year:2023,day:1,month:1},a))+"Z"))},W=e=>{const t=e.toString();return t.length>1?t:`0${t}`},z=(e,t)=>t?W(e):0===e?"12":e.toString(),B=(e,t,n)=>{if(null===n.day)return null;const a=new Date(`${n.month}/${n.day}/${n.year} GMT+0000`),r=new Intl.DateTimeFormat(e,{weekday:"long",month:"long",day:"numeric",timeZone:"UTC"}).format(a);return t?`Today, ${r}`:r},J=(e,t)=>{const n=new Date(`${t.month}/${t.day}/${t.year} GMT+0000`);return new Intl.DateTimeFormat(e,{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"}).format(n)},V=(e,t)=>{const n=new Date(`${t.month}/${t.day}/${t.year} GMT+0000`);return new Intl.DateTimeFormat(e,{month:"long",year:"numeric",timeZone:"UTC"}).format(n)},H=(e,t)=>Q(e,t,{month:"short",day:"numeric",year:"numeric"}),K=(e,t)=>ee(e,t,{day:"numeric"}).find((e=>"day"===e.type)).value,X=(e,t)=>Q(e,t,{year:"numeric"}),Y=e=>{const t=void 0!==e.hour&&void 0!==e.minute?` ${e.hour}:${e.minute}`:"";return new Date(`${e.month}/${e.day}/${e.year}${t} GMT+0000`)},Q=(e,t,n)=>{const a=Y(t);return te(e,n).format(a)},ee=(e,t,n)=>{const a=Y(t);return te(e,n).formatToParts(a)},te=(e,t)=>new Intl.DateTimeFormat(e,Object.assign(Object.assign({},t),{timeZone:"UTC"})),ne=e=>{if("RelativeTimeFormat"in Intl){const t=new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(0,"day");return t.charAt(0).toUpperCase()+t.slice(1)}return"Today"},ae=e=>{const t=e.getTimezoneOffset();return e.setMinutes(e.getMinutes()-t),e},re=ae(new Date("2022T01:00")),ie=ae(new Date("2022T13:00")),oe=(e,t)=>{const n="am"===t?re:ie,a=new Intl.DateTimeFormat(e,{hour:"numeric",timeZone:"UTC"}).formatToParts(n).find((e=>"dayPeriod"===e.type));return a?a.value:(e=>void 0===e?"":e.toUpperCase())(t)},se=e=>Array.isArray(e)?e.join(","):e,de=()=>ae(new Date).toISOString(),le=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],ue=[0,1,2,3,4,5,6,7,8,9,10,11],me=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],ce=(e,t,n=0)=>{const a="ios"===t?"short":"narrow",r=new Intl.DateTimeFormat(e,{weekday:a}),i=new Date("11/01/2020"),o=[];for(let e=n;e<n+7;e++){const t=new Date(i);t.setDate(t.getDate()+e),o.push(r.format(t))}return o},he=(e,t,n)=>{const a=l(e,t),r=new Date(`${e}/1/${t}`).getDay(),i=r>=n?r-(n+1):6-(n-r);let o=[];for(let e=1;e<=a;e++)o.push({day:e,dayOfWeek:(i+e)%7});for(let e=0;e<=i;e++)o=[{day:null,dayOfWeek:null},...o];return o},ye=(e,t="h12",n,a,s,d)=>{const l="h23"===t;let u=l?me:ue,m=le,c=!0,h=!0;if(s&&(u=u.filter((e=>s.includes(e)))),d&&(m=m.filter((e=>d.includes(e)))),n)if(r(e,n)){if(void 0!==n.hour&&(u=u.filter((t=>{const a="pm"===e.ampm?(t+12)%24:t;return(l?t:a)>=n.hour})),c=n.hour<13),void 0!==n.minute){let t=!1;void 0!==n.hour&&void 0!==e.hour&&e.hour>n.hour&&(t=!0),m=m.filter((e=>!!t||e>=n.minute))}}else i(e,n)&&(u=[],m=[],c=h=!1);return a&&(r(e,a)?(void 0!==a.hour&&(u=u.filter((t=>{const n="pm"===e.ampm?(t+12)%24:t;return(l?t:n)<=a.hour})),h=a.hour>=12),void 0!==a.minute&&e.hour===a.hour&&(m=m.filter((e=>e<=a.minute)))):o(e,a)&&(u=[],m=[],c=h=!1)),{hours:u,minutes:m,am:c,pm:h}},pe=e=>[_(e),{month:e.month,year:e.year,day:e.day},P(e)],ve=(e,t,n,a,r,i={month:"long"})=>{const{year:o}=t,s=[];if(void 0!==r){let t=r;void 0!==(null==a?void 0:a.month)&&(t=t.filter((e=>e<=a.month))),void 0!==(null==n?void 0:n.month)&&(t=t.filter((e=>e>=n.month))),t.forEach((t=>{const n=new Date(`${t}/1/${o} GMT+0000`),a=new Intl.DateTimeFormat(e,Object.assign(Object.assign({},i),{timeZone:"UTC"})).format(n);s.push({text:a,value:t})}))}else{const t=a&&a.year===o?a.month:12,r=n&&n.year===o?n.month:1;for(let n=r;n<=t;n++){const t=new Date(`${n}/1/${o} GMT+0000`),a=new Intl.DateTimeFormat(e,Object.assign(Object.assign({},i),{timeZone:"UTC"})).format(t);s.push({text:a,value:n})}}return s},fe=(e,t,n,a,r,i={day:"numeric"})=>{const{month:o,year:s}=t,d=[],u=l(o,s),m=null!==(null==a?void 0:a.day)&&void 0!==(null==a?void 0:a.day)&&a.year===s&&a.month===o?a.day:u,c=null!==(null==n?void 0:n.day)&&void 0!==(null==n?void 0:n.day)&&n.year===s&&n.month===o?n.day:1;if(void 0!==r){let t=r;t=t.filter((e=>e>=c&&e<=m)),t.forEach((t=>{const n=new Date(`${o}/${t}/${s} GMT+0000`),a=new Intl.DateTimeFormat(e,Object.assign(Object.assign({},i),{timeZone:"UTC"})).format(n);d.push({text:a,value:t})}))}else for(let t=c;t<=m;t++){const n=new Date(`${o}/${t}/${s} GMT+0000`),a=new Intl.DateTimeFormat(e,Object.assign(Object.assign({},i),{timeZone:"UTC"})).format(n);d.push({text:a,value:t})}return d},be=(e,t,n,a,r)=>{var i,o;let s=[];if(void 0!==r)s=r,void 0!==(null==a?void 0:a.year)&&(s=s.filter((e=>e<=a.year))),void 0!==(null==n?void 0:n.year)&&(s=s.filter((e=>e>=n.year)));else{const{year:e}=t,r=null!==(i=null==a?void 0:a.year)&&void 0!==i?i:e,d=null!==(o=null==n?void 0:n.year)&&void 0!==o?o:e-100;for(let e=r;e>=d;e--)s.push(e)}return s.map((n=>({text:X(e,{year:n,month:t.month,day:t.day}),value:n})))},ge=(e,t)=>e.month===t.month&&e.year===t.year?[e]:[e,...ge(P(e),t)],we=(e,t,n,a,i,o)=>{let s=[],d=[],l=ge(n,a);return o&&(l=l.filter((({month:e})=>o.includes(e)))),l.forEach((o=>{const l={month:o.month,day:null,year:o.year},u=fe(e,l,n,a,i,{month:"short",day:"numeric",weekday:"short"}),m=[],c=[];u.forEach((n=>{const a=r(Object.assign(Object.assign({},l),{day:n.value}),t);c.push({text:a?ne(e):n.text,value:`${l.year}-${l.month}-${n.value}`}),m.push({month:l.month,year:l.year,day:n.value})})),d=[...d,...m],s=[...s,...c]})),{parts:d,items:s}},Te=(e,t,n,a,r,i,o)=>{const s=d(e,n),{hours:l,minutes:u,am:m,pm:c}=ye(t,s?"h23":"h12",a,r,i,o),h=l.map((e=>({text:z(e,s),value:U(e,s,t.ampm)}))),y=u.map((e=>({text:W(e),value:e}))),p=[];return m&&!s&&p.push({text:oe(e,"am"),value:"am"}),c&&!s&&p.push({text:oe(e,"pm"),value:"pm"}),{minutesData:y,hoursData:h,dayPeriodData:p}}},6567:(e,t,n)=>{n.d(t,{a:()=>u,b:()=>h,c:()=>i,d:()=>s,e:()=>b,f:()=>v,g:()=>c,h:()=>y,i:()=>l,j:()=>g,k:()=>$,l:()=>p,m:()=>D,n:()=>w,o:()=>o,p:()=>f,q:()=>k,r:()=>m,s:()=>O,t:()=>a,u:()=>x,v:()=>T});const a=(e,t=0)=>new Promise((n=>{r(e,t,n)})),r=(e,t=0,n)=>{let a,r;const i={passive:!0},o=()=>{a&&a()},s=t=>{void 0!==t&&e!==t.target||(o(),n(t))};return e&&(e.addEventListener("webkitTransitionEnd",s,i),e.addEventListener("transitionend",s,i),r=setTimeout(s,t+500),a=()=>{r&&(clearTimeout(r),r=void 0),e.removeEventListener("webkitTransitionEnd",s,i),e.removeEventListener("transitionend",s,i)}),o},i=(e,t)=>{e.componentOnReady?e.componentOnReady().then((e=>t(e))):h((()=>t(e)))},o=e=>void 0!==e.componentOnReady,s=(e,t=[])=>{const n={};return t.forEach((t=>{e.hasAttribute(t)&&(null!==e.getAttribute(t)&&(n[t]=e.getAttribute(t)),e.removeAttribute(t))})),n},d=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],l=(e,t)=>{let n=d;return t&&t.length>0&&(n=n.filter((e=>!t.includes(e)))),s(e,n)},u=(e,t,n,a)=>{var r;if("undefined"!=typeof window){const i=window,o=null===(r=null==i?void 0:i.Ionic)||void 0===r?void 0:r.config;if(o){const r=o.get("_ael");if(r)return r(e,t,n,a);if(o._ael)return o._ael(e,t,n,a)}}return e.addEventListener(t,n,a)},m=(e,t,n,a)=>{var r;if("undefined"!=typeof window){const i=window,o=null===(r=null==i?void 0:i.Ionic)||void 0===r?void 0:r.config;if(o){const r=o.get("_rel");if(r)return r(e,t,n,a);if(o._rel)return o._rel(e,t,n,a)}}return e.removeEventListener(t,n,a)},c=(e,t=e)=>e.shadowRoot||t,h=e=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(e):"function"==typeof requestAnimationFrame?requestAnimationFrame(e):setTimeout(e),y=e=>!!e.shadowRoot&&!!e.attachShadow,p=e=>{const t=e.closest("ion-item");return t?t.querySelector("ion-label"):null},v=e=>{if(e.focus(),e.classList.contains("ion-focusable")){const t=e.closest("ion-app");t&&t.setFocus([e])}},f=(e,t)=>{let n;const a=e.getAttribute("aria-labelledby"),r=e.id;let i=null!==a&&""!==a.trim()?a:t+"-lbl",o=null!==a&&""!==a.trim()?document.getElementById(a):p(e);return o?(null===a&&(o.id=i),n=o.textContent,o.setAttribute("aria-hidden","true")):""!==r.trim()&&(o=document.querySelector(`label[for="${r}"]`),o&&(""!==o.id?i=o.id:o.id=i=`${r}-lbl`,n=o.textContent)),{label:o,labelId:i,labelText:n}},b=(e,t,n,a,r)=>{if(e||y(t)){let e=t.querySelector("input.aux-input");e||(e=t.ownerDocument.createElement("input"),e.type="hidden",e.classList.add("aux-input"),t.appendChild(e)),e.disabled=r,e.name=n,e.value=a||""}},g=(e,t,n)=>Math.max(e,Math.min(t,n)),w=(e,t)=>{if(!e){const e="ASSERT: "+t;throw console.error(e),new Error(e)}},T=e=>e.timeStamp||Date.now(),x=e=>{if(e){const t=e.changedTouches;if(t&&t.length>0){const e=t[0];return{x:e.clientX,y:e.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},D=e=>{const t="rtl"===document.dir;switch(e){case"start":return t;case"end":return!t;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},$=(e,t)=>{const n=e._original||e;return{_original:e,emit:k(n.emit.bind(n),t)}},k=(e,t=0)=>{let n;return(...a)=>{clearTimeout(n),n=setTimeout(e,t,...a)}},O=(e,t)=>{if(null!=e||(e={}),null!=t||(t={}),e===t)return!0;const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(const a of n){if(!(a in t))return!1;if(e[a]!==t[a])return!1}return!0}},205:(e,t,n)=>{n.r(t),n.d(t,{ion_datetime_button:()=>l});var a=n(6472),r=n(2445),i=n(6567),o=n(3986),s=n(3641),d=n(3797);const l=class{constructor(e){(0,a.r)(this,e),this.datetimeEl=null,this.overlayEl=null,this.getParsedDateValues=e=>null==e?[]:Array.isArray(e)?e:[e],this.setDateTimeText=()=>{const{datetimeEl:e,datetimePresentation:t}=this;if(!e)return;const{value:n,locale:a,hourCycle:r,preferWheel:i,multiple:s,titleSelectedDatesFormatter:l}=e,u=this.getParsedDateValues(n),m=(0,d.q)(u.length>0?u:[(0,d.t)()])[0],c=(0,d.J)(a,r);switch(this.dateText=this.timeText=void 0,t){case"date-time":case"time-date":const t=(0,d.T)(a,m),n=(0,d.K)(a,m,c);i?this.dateText=`${t} ${n}`:(this.dateText=t,this.timeText=n);break;case"date":if(s&&1!==u.length){let t=`${u.length} days`;if(void 0!==l)try{t=l(u)}catch(e){(0,o.a)("Exception in provided `titleSelectedDatesFormatter`: ",e)}this.dateText=t}else this.dateText=(0,d.T)(a,m);break;case"time":this.timeText=(0,d.K)(a,m,c);break;case"month-year":this.dateText=(0,d.G)(a,m);break;case"month":this.dateText=(0,d.S)(a,m,{month:"long"});break;case"year":this.dateText=(0,d.S)(a,m,{year:"numeric"})}},this.waitForDatetimeChanges=async()=>{const{datetimeEl:e}=this;return e?new Promise((t=>{(0,i.a)(e,"ionRender",t,{once:!0})})):Promise.resolve()},this.handleDateClick=async e=>{const{datetimeEl:t,datetimePresentation:n}=this;if(!t)return;let a=!1;switch(n){case"date-time":case"time-date":const e="date"!==t.presentation;!t.preferWheel&&e&&(t.presentation="date",a=!0)}this.selectedButton="date",this.presentOverlay(e,a,this.dateTargetEl)},this.handleTimeClick=e=>{const{datetimeEl:t,datetimePresentation:n}=this;if(!t)return;let a=!1;switch(n){case"date-time":case"time-date":"time"!==t.presentation&&(t.presentation="time",a=!0)}this.selectedButton="time",this.presentOverlay(e,a,this.timeTargetEl)},this.presentOverlay=async(e,t,n)=>{const{overlayEl:a}=this;a&&("ION-POPOVER"===a.tagName?(t&&await this.waitForDatetimeChanges(),a.present(Object.assign(Object.assign({},e),{detail:{ionShadowTarget:n}}))):a.present())},this.datetimePresentation="date-time",this.dateText=void 0,this.timeText=void 0,this.datetimeActive=!1,this.selectedButton=void 0,this.color="primary",this.disabled=!1,this.datetime=void 0}async componentWillLoad(){const{datetime:e}=this;if(!e)return void(0,o.a)("An ID associated with an ion-datetime instance is required for ion-datetime-button to function properly.",this.el);const t=this.datetimeEl=document.getElementById(e);if(!t)return void(0,o.a)(`No ion-datetime instance found for ID '${e}'.`,this.el);const n=new IntersectionObserver((e=>{const t=e[0];this.datetimeActive=t.isIntersecting}),{threshold:.01});n.observe(t);const a=this.overlayEl=t.closest("ion-modal, ion-popover");a&&a.classList.add("ion-datetime-button-overlay"),(0,i.c)(t,(()=>{const e=this.datetimePresentation=t.presentation||"date-time";switch(this.setDateTimeText(),(0,i.a)(t,"ionValueChange",this.setDateTimeText),e){case"date-time":case"date":case"month-year":case"month":case"year":this.selectedButton="date";break;case"time-date":case"time":this.selectedButton="time"}}))}render(){const{color:e,dateText:t,timeText:n,selectedButton:i,datetimeActive:o,disabled:d}=this,l=(0,r.g)(this);return(0,a.h)(a.H,{class:(0,s.c)(e,{[l]:!0,[`${i}-active`]:o,"datetime-button-disabled":d})},t&&(0,a.h)("button",{class:"ion-activatable",id:"date-button","aria-expanded":o?"true":"false",onClick:this.handleDateClick,disabled:d,part:"native",ref:e=>this.dateTargetEl=e},(0,a.h)("slot",{name:"date-target"},t),"md"===l&&(0,a.h)("ion-ripple-effect",null)),n&&(0,a.h)("button",{class:"ion-activatable",id:"time-button","aria-expanded":o?"true":"false",onClick:this.handleTimeClick,disabled:d,part:"native",ref:e=>this.timeTargetEl=e},(0,a.h)("slot",{name:"time-target"},n),"md"===l&&(0,a.h)("ion-ripple-effect",null)))}get el(){return(0,a.e)(this)}};l.style={ios:":host{display:flex;align-items:center;justify-content:center}:host button{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, #edeef0);color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;appearance:none;overflow:hidden}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}",md:":host{display:flex;align-items:center;justify-content:center}:host button{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, #edeef0);color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;appearance:none;overflow:hidden}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}"}}}]);