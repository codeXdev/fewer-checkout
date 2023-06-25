"use strict";(globalThis.webpackChunkfewer_checkout_woocommerce=globalThis.webpackChunkfewer_checkout_woocommerce||[]).push([[1142],{3641:(e,t,i)=>{i.d(t,{c:()=>o,g:()=>a,h:()=>n,o:()=>r});const n=(e,t)=>null!==t.closest(e),o=(e,t)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},t):t,a=e=>{const t={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((e=>null!=e)).map((e=>e.trim())).filter((e=>""!==e)):[])(e).forEach((e=>t[e]=!0)),t},s=/^[a-z][a-z0-9+\-.]*:/,r=async(e,t,i,n)=>{if(null!=e&&"#"!==e[0]&&!s.test(e)){const o=document.querySelector("ion-router");if(o)return null!=t&&t.preventDefault(),o.push(e,i,n)}return!1}},9204:(e,t,i)=>{i.d(t,{i:()=>n});const n=e=>e&&""!==e.dir?"rtl"===e.dir.toLowerCase():"rtl"===(null===document||void 0===document?void 0:document.dir.toLowerCase())},1142:(e,t,i)=>{i.r(t),i.d(t,{ion_segment:()=>l});var n=i(6472),o=i(2445),a=i(6567),s=i(9204),r=i(3641);const l=class{constructor(e){(0,n.r)(this,e),this.ionChange=(0,n.d)(this,"ionChange",7),this.ionSelect=(0,n.d)(this,"ionSelect",7),this.ionStyle=(0,n.d)(this,"ionStyle",7),this.onClick=e=>{const t=e.target,i=this.checked;"ION-SEGMENT"!==t.tagName&&(this.value=t.value,t!==i&&this.emitValueChange(),!this.scrollable&&this.swipeGesture||(i?this.checkButton(i,t):this.setCheckedClasses()))},this.getSegmentButton=e=>{var t,i;const n=this.getButtons().filter((e=>!e.disabled)),o=n.findIndex((e=>e===document.activeElement));switch(e){case"first":return n[0];case"last":return n[n.length-1];case"next":return null!==(t=n[o+1])&&void 0!==t?t:n[0];case"previous":return null!==(i=n[o-1])&&void 0!==i?i:n[n.length-1];default:return null}},this.activated=!1,this.color=void 0,this.disabled=!1,this.scrollable=!1,this.swipeGesture=!0,this.value=void 0,this.selectOnFocus=!1}colorChanged(e,t){(void 0===t&&void 0!==e||void 0!==t&&void 0===e)&&this.emitStyle()}swipeGestureChanged(){this.gestureChanged()}valueChanged(e){if(this.ionSelect.emit({value:e}),this.scrollable){const t=this.getButtons().find((t=>t.value===e));void 0!==t&&t.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}}disabledChanged(){this.gestureChanged();const e=this.getButtons();for(const t of e)t.disabled=this.disabled}gestureChanged(){this.gesture&&this.gesture.enable(!this.scrollable&&!this.disabled&&this.swipeGesture)}connectedCallback(){this.emitStyle()}componentWillLoad(){this.emitStyle()}async componentDidLoad(){this.setCheckedClasses(),this.gesture=(await i.e(2406).then(i.bind(i,1463))).createGesture({el:this.el,gestureName:"segment",gesturePriority:100,threshold:0,passive:!1,onStart:e=>this.onStart(e),onMove:e=>this.onMove(e),onEnd:e=>this.onEnd(e)}),this.gestureChanged(),this.disabled&&this.disabledChanged()}onStart(e){this.valueBeforeGesture=this.value,this.activate(e)}onMove(e){this.setNextIndex(e)}onEnd(e){this.setActivated(!1);const t=this.setNextIndex(e,!0);e.event.stopImmediatePropagation(),t&&this.addRipple(e);const i=this.value;void 0!==i&&this.valueBeforeGesture!==i&&this.emitValueChange(),this.valueBeforeGesture=void 0}emitValueChange(){const{value:e}=this;this.ionChange.emit({value:e})}getButtons(){return Array.from(this.el.querySelectorAll("ion-segment-button"))}get checked(){return this.getButtons().find((e=>e.value===this.value))}addRipple(e){if(!o.c.getBoolean("animated",!0)||!o.c.getBoolean("rippleEffect",!0))return;const t=this.getButtons().find((e=>e.value===this.value)),i=(t.shadowRoot||t).querySelector("ion-ripple-effect");if(!i)return;const{x:n,y:s}=(0,a.u)(e.event);i.addRipple(n,s).then((e=>e()))}setActivated(e){this.getButtons().forEach((t=>{e?t.classList.add("segment-button-activated"):t.classList.remove("segment-button-activated")})),this.activated=e}activate(e){const t=e.event.target,i=this.getButtons().find((e=>e.value===this.value));"ION-SEGMENT-BUTTON"===t.tagName&&(i||(this.value=t.value,this.setCheckedClasses()),this.value===t.value&&this.setActivated(!0))}getIndicator(e){return(e.shadowRoot||e).querySelector(".segment-button-indicator")}checkButton(e,t){const i=this.getIndicator(e),o=this.getIndicator(t);if(null===i||null===o)return;const a=i.getBoundingClientRect(),s=o.getBoundingClientRect(),r=a.width/s.width,l=`translate3d(${a.left-s.left}px, 0, 0) scaleX(${r})`;(0,n.w)((()=>{o.classList.remove("segment-button-indicator-animated"),o.style.setProperty("transform",l),o.getBoundingClientRect(),o.classList.add("segment-button-indicator-animated"),o.style.setProperty("transform","")})),this.value=t.value,this.setCheckedClasses()}setCheckedClasses(){const e=this.getButtons(),t=e.findIndex((e=>e.value===this.value))+1;for(const t of e)t.classList.remove("segment-button-after-checked");t<e.length&&e[t].classList.add("segment-button-after-checked")}setNextIndex(e,t=!1){const i=(0,s.i)(this.el),n=this.activated,o=this.getButtons(),a=o.findIndex((e=>e.value===this.value)),r=o[a];let l,c;if(-1===a)return;const u=r.getBoundingClientRect(),d=u.left,h=u.width,g=e.currentX,m=u.top+u.height/2,v=this.el.getRootNode().elementFromPoint(g,m);if(n&&!t){if(i?g>d+h:g<d){const e=a-1;e>=0&&(c=e)}else if((i?g<d:g>d+h)&&n&&!t){const e=a+1;e<o.length&&(c=e)}void 0===c||o[c].disabled||(l=o[c])}if(!n&&t&&(l=v),null!=l){if("ION-SEGMENT"===l.tagName)return!1;r!==l&&this.checkButton(r,l)}return!0}emitStyle(){this.ionStyle.emit({segment:!0})}onKeyDown(e){const t=(0,s.i)(this.el);let i,n=this.selectOnFocus;switch(e.key){case"ArrowRight":e.preventDefault(),i=t?this.getSegmentButton("previous"):this.getSegmentButton("next");break;case"ArrowLeft":e.preventDefault(),i=t?this.getSegmentButton("next"):this.getSegmentButton("previous");break;case"Home":e.preventDefault(),i=this.getSegmentButton("first");break;case"End":e.preventDefault(),i=this.getSegmentButton("last");break;case" ":case"Enter":e.preventDefault(),i=document.activeElement,n=!0}if(i){if(n){const e=this.checked;this.checkButton(e||i,i),i!==e&&this.emitValueChange()}i.setFocus()}}render(){const e=(0,o.g)(this);return(0,n.h)(n.H,{role:"tablist",onClick:this.onClick,class:(0,r.c)(this.color,{[e]:!0,"in-toolbar":(0,r.h)("ion-toolbar",this.el),"in-toolbar-color":(0,r.h)("ion-toolbar[color]",this.el),"segment-activated":this.activated,"segment-disabled":this.disabled,"segment-scrollable":this.scrollable})},(0,n.h)("slot",null))}get el(){return(0,n.e)(this)}static get watchers(){return{color:["colorChanged"],swipeGesture:["swipeGestureChanged"],value:["valueChanged"],disabled:["disabledChanged"]}}};l.style={ios:":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;align-items:stretch;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;user-select:none}:host(.segment-scrollable){justify-content:start;width:auto;overflow-x:auto}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.065);border-radius:8px;overflow:hidden;z-index:0}:host(.ion-color){background:rgba(var(--ion-color-base-rgb), 0.065)}:host(.in-toolbar){-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;width:auto}:host(.in-toolbar:not(.ion-color)){background:var(--ion-toolbar-segment-background, var(--background))}:host(.in-toolbar-color:not(.ion-color)){background:rgba(var(--ion-color-contrast-rgb), 0.11)}",md:":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;align-items:stretch;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;user-select:none}:host(.segment-scrollable){justify-content:start;width:auto;overflow-x:auto}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:transparent}:host(.in-toolbar){min-height:var(--min-height)}:host(.segment-scrollable) ::slotted(ion-segment-button){min-width:auto}"}},6567:(e,t,i)=>{i.d(t,{a:()=>u,b:()=>g,c:()=>a,d:()=>r,e:()=>p,f:()=>b,g:()=>h,h:()=>m,i:()=>c,j:()=>w,k:()=>S,l:()=>v,m:()=>x,n:()=>y,o:()=>s,p:()=>f,q:()=>B,r:()=>d,s:()=>E,t:()=>n,u:()=>C,v:()=>k});const n=(e,t=0)=>new Promise((i=>{o(e,t,i)})),o=(e,t=0,i)=>{let n,o;const a={passive:!0},s=()=>{n&&n()},r=t=>{void 0!==t&&e!==t.target||(s(),i(t))};return e&&(e.addEventListener("webkitTransitionEnd",r,a),e.addEventListener("transitionend",r,a),o=setTimeout(r,t+500),n=()=>{o&&(clearTimeout(o),o=void 0),e.removeEventListener("webkitTransitionEnd",r,a),e.removeEventListener("transitionend",r,a)}),s},a=(e,t)=>{e.componentOnReady?e.componentOnReady().then((e=>t(e))):g((()=>t(e)))},s=e=>void 0!==e.componentOnReady,r=(e,t=[])=>{const i={};return t.forEach((t=>{e.hasAttribute(t)&&(null!==e.getAttribute(t)&&(i[t]=e.getAttribute(t)),e.removeAttribute(t))})),i},l=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],c=(e,t)=>{let i=l;return t&&t.length>0&&(i=i.filter((e=>!t.includes(e)))),r(e,i)},u=(e,t,i,n)=>{var o;if("undefined"!=typeof window){const a=window,s=null===(o=null==a?void 0:a.Ionic)||void 0===o?void 0:o.config;if(s){const o=s.get("_ael");if(o)return o(e,t,i,n);if(s._ael)return s._ael(e,t,i,n)}}return e.addEventListener(t,i,n)},d=(e,t,i,n)=>{var o;if("undefined"!=typeof window){const a=window,s=null===(o=null==a?void 0:a.Ionic)||void 0===o?void 0:o.config;if(s){const o=s.get("_rel");if(o)return o(e,t,i,n);if(s._rel)return s._rel(e,t,i,n)}}return e.removeEventListener(t,i,n)},h=(e,t=e)=>e.shadowRoot||t,g=e=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(e):"function"==typeof requestAnimationFrame?requestAnimationFrame(e):setTimeout(e),m=e=>!!e.shadowRoot&&!!e.attachShadow,v=e=>{const t=e.closest("ion-item");return t?t.querySelector("ion-label"):null},b=e=>{if(e.focus(),e.classList.contains("ion-focusable")){const t=e.closest("ion-app");t&&t.setFocus([e])}},f=(e,t)=>{let i;const n=e.getAttribute("aria-labelledby"),o=e.id;let a=null!==n&&""!==n.trim()?n:t+"-lbl",s=null!==n&&""!==n.trim()?document.getElementById(n):v(e);return s?(null===n&&(s.id=a),i=s.textContent,s.setAttribute("aria-hidden","true")):""!==o.trim()&&(s=document.querySelector(`label[for="${o}"]`),s&&(""!==s.id?a=s.id:s.id=a=`${o}-lbl`,i=s.textContent)),{label:s,labelId:a,labelText:i}},p=(e,t,i,n,o)=>{if(e||m(t)){let e=t.querySelector("input.aux-input");e||(e=t.ownerDocument.createElement("input"),e.type="hidden",e.classList.add("aux-input"),t.appendChild(e)),e.disabled=o,e.name=i,e.value=n||""}},w=(e,t,i)=>Math.max(e,Math.min(t,i)),y=(e,t)=>{if(!e){const e="ASSERT: "+t;throw console.error(e),new Error(e)}},k=e=>e.timeStamp||Date.now(),C=e=>{if(e){const t=e.changedTouches;if(t&&t.length>0){const e=t[0];return{x:e.clientX,y:e.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},x=e=>{const t="rtl"===document.dir;switch(e){case"start":return t;case"end":return!t;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},S=(e,t)=>{const i=e._original||e;return{_original:e,emit:B(i.emit.bind(i),t)}},B=(e,t=0)=>{let i;return(...n)=>{clearTimeout(i),i=setTimeout(e,t,...n)}},E=(e,t)=>{if(null!=e||(e={}),null!=t||(t={}),e===t)return!0;const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!1;for(const n of i){if(!(n in t))return!1;if(e[n]!==t[n])return!1}return!0}}}]);