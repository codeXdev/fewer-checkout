"use strict";(globalThis.webpackChunkfewer_checkout_woocommerce=globalThis.webpackChunkfewer_checkout_woocommerce||[]).push([[697,2893],{555:(e,t,n)=>{n.d(t,{m:()=>u});var a=n(2893),i=n(6567),o=n(2445),r=n(741);const s=e=>(0,r.c)().duration(e?400:300),l=e=>{let t,n;const a=e.width+8,i=(0,r.c)(),l=(0,r.c)();e.isEndSide?(t=a+"px",n="0px"):(t=-a+"px",n="0px"),i.addElement(e.menuInnerEl).fromTo("transform",`translateX(${t})`,`translateX(${n})`);const d="ios"===(0,o.g)(e),c=d?.2:.25;return l.addElement(e.backdropEl).fromTo("opacity",.01,c),s(d).addAnimation([i,l])},d=e=>{let t,n;const a=(0,o.g)(e),i=e.width;e.isEndSide?(t=-i+"px",n=i+"px"):(t=i+"px",n=-i+"px");const l=(0,r.c)().addElement(e.menuInnerEl).fromTo("transform",`translateX(${n})`,"translateX(0px)"),d=(0,r.c)().addElement(e.contentEl).fromTo("transform","translateX(0px)",`translateX(${t})`),c=(0,r.c)().addElement(e.backdropEl).fromTo("opacity",.01,.32);return s("ios"===a).addAnimation([l,d,c])},c=e=>{const t=(0,o.g)(e),n=e.width*(e.isEndSide?-1:1)+"px",a=(0,r.c)().addElement(e.contentEl).fromTo("transform","translateX(0px)",`translateX(${n})`);return s("ios"===t).addAnimation(a)},u=(()=>{const e=new Map,t=[],n=async e=>{if(await p(),"start"===e||"end"===e){return f((t=>t.side===e&&!t.disabled))||f((t=>t.side===e))}if(null!=e)return f((t=>t.menuId===e));const n=f((e=>!e.disabled));return n||(t.length>0?t[0].el:void 0)},o=async()=>(await p(),u()),r=(t,n)=>{e.set(t,n)},s=e=>{const n=e.side;t.filter((t=>t.side===n&&t!==e)).forEach((e=>e.disabled=!0))},u=()=>f((e=>e._isOpen)),m=()=>t.some((e=>e.isAnimating)),f=e=>{const n=t.find(e);if(void 0!==n)return n.el},p=()=>Promise.all(Array.from(document.querySelectorAll("ion-menu")).map((e=>new Promise((t=>(0,i.c)(e,t))))));return r("reveal",c),r("push",d),r("overlay",l),"undefined"!=typeof document&&document.addEventListener("ionBackButton",(e=>{const t=u();t&&e.detail.register(a.MENU_BACK_BUTTON_PRIORITY,(()=>t.close()))})),{registerAnimation:r,get:n,getMenus:async()=>(await p(),t.map((e=>e.el))),getOpen:o,isEnabled:async e=>{const t=await n(e);return!!t&&!t.disabled},swipeGesture:async(e,t)=>{const a=await n(t);return a&&(a.swipeGesture=e),a},isAnimating:async()=>(await p(),m()),isOpen:async e=>{if(null!=e){const t=await n(e);return void 0!==t&&t.isOpen()}return void 0!==await o()},enable:async(e,t)=>{const a=await n(t);return a&&(a.disabled=!e),a},toggle:async e=>{const t=await n(e);return!!t&&t.toggle()},close:async e=>{const t=await(void 0!==e?n(e):o());return void 0!==t&&t.close()},open:async e=>{const t=await n(e);return!!t&&t.open()},_getOpenSync:u,_createAnimation:(t,n)=>{const a=e.get(t);if(!a)throw new Error("animation not registered");return a(n)},_register:e=>{t.indexOf(e)<0&&(e.disabled||s(e),t.push(e))},_unregister:e=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},_setOpen:async(e,t,n)=>{if(m())return!1;if(t){const t=await o();t&&e.el!==t&&await t.setOpen(!1,!1)}return e._setOpen(t,n)},_setActiveMenu:s}})()},1810:(e,t,n)=>{n.d(t,{w:()=>a});const a="undefined"!=typeof window?window:void 0},2893:(e,t,n)=>{n.r(t),n.d(t,{MENU_BACK_BUTTON_PRIORITY:()=>r,OVERLAY_BACK_BUTTON_PRIORITY:()=>o,blockHardwareBackButton:()=>a,startHardwareBackButton:()=>i});const a=()=>{document.addEventListener("backbutton",(()=>{}))},i=()=>{const e=document;let t=!1;e.addEventListener("backbutton",(()=>{if(t)return;let n=0,a=[];const i=new CustomEvent("ionBackButton",{bubbles:!1,detail:{register(e,t){a.push({priority:e,handler:t,id:n++})}}});e.dispatchEvent(i);const o=()=>{if(a.length>0){let e={priority:Number.MIN_SAFE_INTEGER,handler:()=>{},id:-1};a.forEach((t=>{t.priority>=e.priority&&(e=t)})),t=!0,a=a.filter((t=>t.id!==e.id)),(async e=>{try{if(null==e?void 0:e.handler){const t=e.handler(o);null!=t&&await t}}catch(e){console.error(e)}})(e).then((()=>t=!1))}};o()}))},o=100,r=99},6567:(e,t,n)=>{n.d(t,{a:()=>c,b:()=>f,c:()=>o,d:()=>s,e:()=>y,f:()=>g,g:()=>m,h:()=>p,i:()=>d,j:()=>E,k:()=>T,l:()=>h,m:()=>_,n:()=>b,o:()=>r,p:()=>v,q:()=>x,r:()=>u,s:()=>k,t:()=>a,u:()=>A,v:()=>w});const a=(e,t=0)=>new Promise((n=>{i(e,t,n)})),i=(e,t=0,n)=>{let a,i;const o={passive:!0},r=()=>{a&&a()},s=t=>{void 0!==t&&e!==t.target||(r(),n(t))};return e&&(e.addEventListener("webkitTransitionEnd",s,o),e.addEventListener("transitionend",s,o),i=setTimeout(s,t+500),a=()=>{i&&(clearTimeout(i),i=void 0),e.removeEventListener("webkitTransitionEnd",s,o),e.removeEventListener("transitionend",s,o)}),r},o=(e,t)=>{e.componentOnReady?e.componentOnReady().then((e=>t(e))):f((()=>t(e)))},r=e=>void 0!==e.componentOnReady,s=(e,t=[])=>{const n={};return t.forEach((t=>{e.hasAttribute(t)&&(null!==e.getAttribute(t)&&(n[t]=e.getAttribute(t)),e.removeAttribute(t))})),n},l=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],d=(e,t)=>{let n=l;return t&&t.length>0&&(n=n.filter((e=>!t.includes(e)))),s(e,n)},c=(e,t,n,a)=>{var i;if("undefined"!=typeof window){const o=window,r=null===(i=null==o?void 0:o.Ionic)||void 0===i?void 0:i.config;if(r){const i=r.get("_ael");if(i)return i(e,t,n,a);if(r._ael)return r._ael(e,t,n,a)}}return e.addEventListener(t,n,a)},u=(e,t,n,a)=>{var i;if("undefined"!=typeof window){const o=window,r=null===(i=null==o?void 0:o.Ionic)||void 0===i?void 0:i.config;if(r){const i=r.get("_rel");if(i)return i(e,t,n,a);if(r._rel)return r._rel(e,t,n,a)}}return e.removeEventListener(t,n,a)},m=(e,t=e)=>e.shadowRoot||t,f=e=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(e):"function"==typeof requestAnimationFrame?requestAnimationFrame(e):setTimeout(e),p=e=>!!e.shadowRoot&&!!e.attachShadow,h=e=>{const t=e.closest("ion-item");return t?t.querySelector("ion-label"):null},g=e=>{if(e.focus(),e.classList.contains("ion-focusable")){const t=e.closest("ion-app");t&&t.setFocus([e])}},v=(e,t)=>{let n;const a=e.getAttribute("aria-labelledby"),i=e.id;let o=null!==a&&""!==a.trim()?a:t+"-lbl",r=null!==a&&""!==a.trim()?document.getElementById(a):h(e);return r?(null===a&&(r.id=o),n=r.textContent,r.setAttribute("aria-hidden","true")):""!==i.trim()&&(r=document.querySelector(`label[for="${i}"]`),r&&(""!==r.id?o=r.id:r.id=o=`${i}-lbl`,n=r.textContent)),{label:r,labelId:o,labelText:n}},y=(e,t,n,a,i)=>{if(e||p(t)){let e=t.querySelector("input.aux-input");e||(e=t.ownerDocument.createElement("input"),e.type="hidden",e.classList.add("aux-input"),t.appendChild(e)),e.disabled=i,e.name=n,e.value=a||""}},E=(e,t,n)=>Math.max(e,Math.min(t,n)),b=(e,t)=>{if(!e){const e="ASSERT: "+t;throw console.error(e),new Error(e)}},w=e=>e.timeStamp||Date.now(),A=e=>{if(e){const t=e.changedTouches;if(t&&t.length>0){const e=t[0];return{x:e.clientX,y:e.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},_=e=>{const t="rtl"===document.dir;switch(e){case"start":return t;case"end":return!t;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},T=(e,t)=>{const n=e._original||e;return{_original:e,emit:x(n.emit.bind(n),t)}},x=(e,t=0)=>{let n;return(...a)=>{clearTimeout(n),n=setTimeout(e,t,...a)}},k=(e,t)=>{if(null!=e||(e={}),null!=t||(t={}),e===t)return!0;const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(const a of n){if(!(a in t))return!1;if(e[a]!==t[a])return!1}return!0}},741:(e,t,n)=>{n.d(t,{c:()=>h});var a=n(6567),i=n(1810);let o;const r=e=>(e.forEach((e=>{for(const t in e)if(e.hasOwnProperty(t)){const n=e[t];if("easing"===t)e["animation-timing-function"]=n,delete e[t];else{const a=s(t);a!==t&&(e[a]=n,delete e[t])}}})),e),s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=e=>{if(void 0===o){const t=void 0!==e.style.animationName,n=void 0!==e.style.webkitAnimationName;o=!t&&n?"-webkit-":""}return o},d=(e,t,n)=>{const a=t.startsWith("animation")?l(e):"";e.style.setProperty(a+t,n)},c=(e,t)=>{const n=t.startsWith("animation")?l(e):"";e.style.removeProperty(n+t)},u=[],m=e=>{let t=u.indexOf(e);return t<0&&(t=u.push(e)-1),`ion-animation-${t}`},f=(e,t,n)=>{var a;const i=(e=>{const t=void 0!==e.getRootNode?e.getRootNode():e;return t.head||t})(n),o=l(n),r=i.querySelector("#"+e);if(r)return r;const s=(null!==(a=n.ownerDocument)&&void 0!==a?a:document).createElement("style");return s.id=e,s.textContent=`@${o}keyframes ${e} { ${t} } @${o}keyframes ${e}-alt { ${t} }`,i.appendChild(s),s},p=(e=[],t)=>{if(void 0!==t){const n=Array.isArray(t)?t:[t];return[...e,...n]}return e},h=e=>{let t,n,o,s,l,u,h,g,v,y,E,b,w,A=[],_=[],T=[],x=!1,k={},$=[],O=[],C={},S=0,R=!1,L=!1,I=!0,B=!1,N=!0,P=!1;const F=e,q=[],X=[],M=[],D=[],K=[],U=[],Y=[],j=[],W=[],z=[],G="function"==typeof AnimationEffect||void 0!==i.w&&"function"==typeof i.w.AnimationEffect,H="function"==typeof Element&&"function"==typeof Element.prototype.animate&&G,V=()=>z,Z=(e,t)=>(((null==t?void 0:t.oneTimeCallback)?X:q).push({c:e,o:t}),w),J=()=>{if(H)z.forEach((e=>{e.cancel()})),z.length=0;else{const e=M.slice();(0,a.b)((()=>{e.forEach((e=>{c(e,"animation-name"),c(e,"animation-duration"),c(e,"animation-timing-function"),c(e,"animation-iteration-count"),c(e,"animation-delay"),c(e,"animation-play-state"),c(e,"animation-fill-mode"),c(e,"animation-direction")}))}))}},Q=()=>{K.forEach((e=>{(null==e?void 0:e.parentNode)&&e.parentNode.removeChild(e)})),K.length=0},ee=()=>void 0!==l?l:h?h.getFill():"both",te=()=>void 0!==v?v:void 0!==u?u:h?h.getDirection():"normal",ne=()=>R?"linear":void 0!==o?o:h?h.getEasing():"linear",ae=()=>L?0:void 0!==y?y:void 0!==n?n:h?h.getDuration():0,ie=()=>void 0!==s?s:h?h.getIterations():1,oe=()=>void 0!==E?E:void 0!==t?t:h?h.getDelay():0,re=()=>{0!==S&&(S--,0===S&&((()=>{he(),j.forEach((e=>e())),W.forEach((e=>e()));const e=I?1:0,t=$,n=O,a=C;M.forEach((e=>{const i=e.classList;t.forEach((e=>i.add(e))),n.forEach((e=>i.remove(e)));for(const t in a)a.hasOwnProperty(t)&&d(e,t,a[t])})),q.forEach((t=>t.c(e,w))),X.forEach((t=>t.c(e,w))),X.length=0,N=!0,I&&(B=!0),I=!0})(),h&&h.animationFinish()))},se=(t=!0)=>{Q();const n=r(A);M.forEach((i=>{if(n.length>0){const o=((e=[])=>e.map((e=>{const t=e.offset,n=[];for(const t in e)e.hasOwnProperty(t)&&"offset"!==t&&n.push(`${t}: ${e[t]};`);return`${100*t}% { ${n.join(" ")} }`})).join(" "))(n);b=void 0!==e?e:m(o);const r=f(b,o,i);K.push(r),d(i,"animation-duration",`${ae()}ms`),d(i,"animation-timing-function",ne()),d(i,"animation-delay",`${oe()}ms`),d(i,"animation-fill-mode",ee()),d(i,"animation-direction",te());const s=ie()===1/0?"infinite":ie().toString();d(i,"animation-iteration-count",s),d(i,"animation-play-state","paused"),t&&d(i,"animation-name",`${r.id}-alt`),(0,a.b)((()=>{d(i,"animation-name",r.id||null)}))}}))},le=(e=!0)=>{(()=>{U.forEach((e=>e())),Y.forEach((e=>e()));const e=_,t=T,n=k;M.forEach((a=>{const i=a.classList;e.forEach((e=>i.add(e))),t.forEach((e=>i.remove(e)));for(const e in n)n.hasOwnProperty(e)&&d(a,e,n[e])}))})(),A.length>0&&(H?(M.forEach((e=>{const t=e.animate(A,{id:F,delay:oe(),duration:ae(),easing:ne(),iterations:ie(),fill:ee(),direction:te()});t.pause(),z.push(t)})),z.length>0&&(z[0].onfinish=()=>{re()})):se(e)),x=!0},de=e=>{if(e=Math.min(Math.max(e,0),.9999),H)z.forEach((t=>{t.currentTime=t.effect.getComputedTiming().delay+ae()*e,t.pause()}));else{const t=`-${ae()*e}ms`;M.forEach((e=>{A.length>0&&(d(e,"animation-delay",t),d(e,"animation-play-state","paused"))}))}},ce=e=>{z.forEach((e=>{e.effect.updateTiming({delay:oe(),duration:ae(),easing:ne(),iterations:ie(),fill:ee(),direction:te()})})),void 0!==e&&de(e)},ue=(e=!0,t)=>{(0,a.b)((()=>{M.forEach((n=>{d(n,"animation-name",b||null),d(n,"animation-duration",`${ae()}ms`),d(n,"animation-timing-function",ne()),d(n,"animation-delay",void 0!==t?`-${t*ae()}ms`:`${oe()}ms`),d(n,"animation-fill-mode",ee()||null),d(n,"animation-direction",te()||null);const i=ie()===1/0?"infinite":ie().toString();d(n,"animation-iteration-count",i),e&&d(n,"animation-name",`${b}-alt`),(0,a.b)((()=>{d(n,"animation-name",b||null)}))}))}))},me=(e=!1,t=!0,n)=>(e&&D.forEach((a=>{a.update(e,t,n)})),H?ce(n):ue(t,n),w),fe=()=>{x&&(H?z.forEach((e=>{e.pause()})):M.forEach((e=>{d(e,"animation-play-state","paused")})),P=!0)},pe=()=>{g=void 0,re()},he=()=>{g&&clearTimeout(g)},ge=e=>new Promise((t=>{(null==e?void 0:e.sync)&&(L=!0,Z((()=>L=!1),{oneTimeCallback:!0})),x||le(),B&&(H?(de(0),ce()):ue(),B=!1),N&&(S=D.length+1,N=!1),Z((()=>t()),{oneTimeCallback:!0}),D.forEach((e=>{e.play()})),H?(z.forEach((e=>{e.play()})),0!==A.length&&0!==M.length||re()):(()=>{if(he(),(0,a.b)((()=>{M.forEach((e=>{A.length>0&&d(e,"animation-play-state","running")}))})),0===A.length||0===M.length)re();else{const e=oe()||0,t=ae()||0,n=ie()||1;isFinite(n)&&(g=setTimeout(pe,e+t*n+100)),((e,t)=>{let n;const i={passive:!0},o=()=>{n&&n()},r=t=>{e===t.target&&(o(),he(),(0,a.b)((()=>{M.forEach((e=>{c(e,"animation-duration"),c(e,"animation-delay"),c(e,"animation-play-state")})),(0,a.b)(re)})))};e&&(e.addEventListener("webkitAnimationEnd",r,i),e.addEventListener("animationend",r,i),n=()=>{e.removeEventListener("webkitAnimationEnd",r,i),e.removeEventListener("animationend",r,i)})})(M[0])}})(),P=!1})),ve=(e,t)=>{const n=A[0];return void 0===n||void 0!==n.offset&&0!==n.offset?A=[{offset:0,[e]:t},...A]:n[e]=t,w};return w={parentAnimation:h,elements:M,childAnimations:D,id:F,animationFinish:re,from:ve,to:(e,t)=>{const n=A[A.length-1];return void 0===n||void 0!==n.offset&&1!==n.offset?A=[...A,{offset:1,[e]:t}]:n[e]=t,w},fromTo:(e,t,n)=>ve(e,t).to(e,n),parent:e=>(h=e,w),play:ge,pause:()=>(D.forEach((e=>{e.pause()})),fe(),w),stop:()=>{D.forEach((e=>{e.stop()})),x&&(J(),x=!1),R=!1,L=!1,N=!0,v=void 0,y=void 0,E=void 0,S=0,B=!1,I=!0,P=!1},destroy:e=>(D.forEach((t=>{t.destroy(e)})),(e=>{J(),e&&Q()})(e),M.length=0,D.length=0,A.length=0,q.length=0,X.length=0,x=!1,N=!0,w),keyframes:e=>{const t=A!==e;return A=e,t&&(e=>{H?V().forEach((t=>{if(t.effect.setKeyframes)t.effect.setKeyframes(e);else{const n=new KeyframeEffect(t.effect.target,e,t.effect.getTiming());t.effect=n}})):se()})(A),w},addAnimation:e=>{if(null!=e)if(Array.isArray(e))for(const t of e)t.parent(w),D.push(t);else e.parent(w),D.push(e);return w},addElement:e=>{if(null!=e)if(1===e.nodeType)M.push(e);else if(e.length>=0)for(let t=0;t<e.length;t++)M.push(e[t]);else console.error("Invalid addElement value");return w},update:me,fill:e=>(l=e,me(!0),w),direction:e=>(u=e,me(!0),w),iterations:e=>(s=e,me(!0),w),duration:e=>(H||0!==e||(e=1),n=e,me(!0),w),easing:e=>(o=e,me(!0),w),delay:e=>(t=e,me(!0),w),getWebAnimations:V,getKeyframes:()=>A,getFill:ee,getDirection:te,getDelay:oe,getIterations:ie,getEasing:ne,getDuration:ae,afterAddRead:e=>(j.push(e),w),afterAddWrite:e=>(W.push(e),w),afterClearStyles:(e=[])=>{for(const t of e)C[t]="";return w},afterStyles:(e={})=>(C=e,w),afterRemoveClass:e=>(O=p(O,e),w),afterAddClass:e=>($=p($,e),w),beforeAddRead:e=>(U.push(e),w),beforeAddWrite:e=>(Y.push(e),w),beforeClearStyles:(e=[])=>{for(const t of e)k[t]="";return w},beforeStyles:(e={})=>(k=e,w),beforeRemoveClass:e=>(T=p(T,e),w),beforeAddClass:e=>(_=p(_,e),w),onFinish:Z,isRunning:()=>0!==S&&!P,progressStart:(e=!1,t)=>(D.forEach((n=>{n.progressStart(e,t)})),fe(),R=e,x||le(),me(!1,!0,t),w),progressStep:e=>(D.forEach((t=>{t.progressStep(e)})),de(e),w),progressEnd:(e,t,n)=>(R=!1,D.forEach((a=>{a.progressEnd(e,t,n)})),void 0!==n&&(y=n),B=!1,I=!0,0===e?(v="reverse"===te()?"normal":"reverse","reverse"===v&&(I=!1),H?(me(),de(1-t)):(E=(1-t)*ae()*-1,me(!1,!1))):1===e&&(H?(me(),de(t)):(E=t*ae()*-1,me(!1,!1))),void 0!==e&&(Z((()=>{y=void 0,v=void 0,E=void 0}),{oneTimeCallback:!0}),h||ge()),w)}}},697:(e,t,n)=>{n.d(t,{u:()=>i});var a=n(555);const i=async e=>{const t=await a.m.get(e);return!(!t||!await t.isActive())}}}]);