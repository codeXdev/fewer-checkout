"use strict";(globalThis.webpackChunkfewer_checkout_woocommerce=globalThis.webpackChunkfewer_checkout_woocommerce||[]).push([[4944],{3641:(e,t,i)=>{i.d(t,{c:()=>n,g:()=>a,h:()=>o,o:()=>l});const o=(e,t)=>null!==t.closest(e),n=(e,t)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},t):t,a=e=>{const t={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((e=>null!=e)).map((e=>e.trim())).filter((e=>""!==e)):[])(e).forEach((e=>t[e]=!0)),t},r=/^[a-z][a-z0-9+\-.]*:/,l=async(e,t,i,o)=>{if(null!=e&&"#"!==e[0]&&!r.test(e)){const n=document.querySelector("ion-router");if(n)return null!=t&&t.preventDefault(),n.push(e,i,o)}return!1}},3986:(e,t,i)=>{i.d(t,{a:()=>n,b:()=>a,p:()=>o});const o=(e,...t)=>console.warn(`[Ionic Warning]: ${e}`,...t),n=(e,...t)=>console.error(`[Ionic Error]: ${e}`,...t),a=(e,...t)=>console.error(`<${e.tagName.toLowerCase()}> must be used inside ${t.join(" or ")}.`)},4944:(e,t,i)=>{i.r(t),i.d(t,{ion_toggle:()=>h});var o=i(6472),n=i(1732),a=i(2445),r=i(4056),l=i(6567),s=i(3986),g=i(1639),c=i(9204),d=i(3641);const h=class{constructor(e){(0,o.r)(this,e),this.ionChange=(0,o.d)(this,"ionChange",7),this.ionFocus=(0,o.d)(this,"ionFocus",7),this.ionBlur=(0,o.d)(this,"ionBlur",7),this.ionStyle=(0,o.d)(this,"ionStyle",7),this.inputId="ion-tg-"+u++,this.lastDrag=0,this.inheritedAttributes={},this.hasLoggedDeprecationWarning=!1,this.onClick=e=>{e.preventDefault(),this.lastDrag+300<Date.now()&&this.toggleChecked()},this.onFocus=()=>{this.ionFocus.emit()},this.onBlur=()=>{this.ionBlur.emit()},this.getSwitchLabelIcon=(e,t)=>"md"===e?t?n.u:n.v:t?n.v:n.w,this.activated=!1,this.color=void 0,this.name=this.inputId,this.checked=!1,this.disabled=!1,this.value="on",this.enableOnOffLabels=a.c.get("toggleOnOffLabels"),this.labelPlacement="start",this.legacy=void 0,this.justify="space-between"}disabledChanged(){this.emitStyle(),this.gesture&&this.gesture.enable(!this.disabled)}toggleChecked(){const{checked:e,value:t}=this,i=!e;this.checked=i,this.ionChange.emit({checked:i,value:t})}async connectedCallback(){const{el:e}=this;this.legacyFormController=(0,r.c)(e),this.gesture=(await i.e(2406).then(i.bind(i,1463))).createGesture({el:e,gestureName:"toggle",gesturePriority:100,threshold:5,passive:!1,onStart:()=>this.onStart(),onMove:e=>this.onMove(e),onEnd:e=>this.onEnd(e)}),this.disabledChanged()}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}componentWillLoad(){this.emitStyle(),this.legacyFormController.hasLegacyControl()||(this.inheritedAttributes=Object.assign({},(0,l.i)(this.el)))}emitStyle(){this.legacyFormController.hasLegacyControl()&&this.ionStyle.emit({"interactive-disabled":this.disabled})}onStart(){this.activated=!0,this.setFocus()}onMove(e){p((0,c.i)(this.el),this.checked,e.deltaX,-10)&&(this.toggleChecked(),(0,g.d)())}onEnd(e){this.activated=!1,this.lastDrag=Date.now(),e.event.preventDefault(),e.event.stopImmediatePropagation()}getValue(){return this.value||""}setFocus(){this.focusEl&&this.focusEl.focus()}renderOnOffSwitchLabels(e,t){const i=this.getSwitchLabelIcon(e,t);return(0,o.h)("ion-icon",{class:{"toggle-switch-icon":!0,"toggle-switch-icon-checked":t},icon:i,"aria-hidden":"true"})}renderToggleControl(){const e=(0,a.g)(this),{enableOnOffLabels:t,checked:i}=this;return(0,o.h)("div",{class:"toggle-icon",part:"track"},t&&"ios"===e&&[this.renderOnOffSwitchLabels(e,!0),this.renderOnOffSwitchLabels(e,!1)],(0,o.h)("div",{class:"toggle-icon-wrapper"},(0,o.h)("div",{class:"toggle-inner",part:"handle"},t&&"md"===e&&this.renderOnOffSwitchLabels(e,i))))}get hasLabel(){return""!==this.el.textContent}render(){const{legacyFormController:e}=this;return e.hasLegacyControl()?this.renderLegacyToggle():this.renderToggle()}renderToggle(){const{activated:e,color:t,checked:i,disabled:n,el:r,justify:s,labelPlacement:g,inputId:h,name:p}=this,u=(0,a.g)(this),w=this.getValue(),m=(0,c.i)(r)?"rtl":"ltr";return(0,l.e)(!0,r,p,i?w:"",n),(0,o.h)(o.H,{onClick:this.onClick,class:(0,d.c)(t,{[u]:!0,"in-item":(0,d.h)("ion-item",r),"toggle-activated":e,"toggle-checked":i,"toggle-disabled":n,[`toggle-justify-${s}`]:!0,[`toggle-label-placement-${g}`]:!0,[`toggle-${m}`]:!0})},(0,o.h)("label",{class:"toggle-wrapper"},(0,o.h)("input",Object.assign({type:"checkbox",role:"switch","aria-checked":`${i}`,checked:i,disabled:n,id:h,onFocus:()=>this.onFocus(),onBlur:()=>this.onBlur(),ref:e=>this.focusEl=e},this.inheritedAttributes)),(0,o.h)("div",{class:{"label-text-wrapper":!0,"label-text-wrapper-hidden":!this.hasLabel}},(0,o.h)("slot",null)),(0,o.h)("div",{class:"native-wrapper"},this.renderToggleControl())))}renderLegacyToggle(){this.hasLoggedDeprecationWarning||((0,s.p)('ion-toggle now requires providing a label with either the default slot or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the component or the "aria-label" attribute.\n\nExample: <ion-toggle>Email</ion-toggle>\nExample with aria-label: <ion-toggle aria-label="Email"></ion-toggle>\n\nDevelopers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.',this.el),this.legacy&&(0,s.p)('ion-toggle is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.\n\nDevelopers can dismiss this warning by removing their usage of the "legacy" property and using the new toggle syntax.',this.el),this.hasLoggedDeprecationWarning=!0);const{activated:e,color:t,checked:i,disabled:n,el:r,inputId:g,name:h}=this,p=(0,a.g)(this),{label:u,labelId:w,labelText:m}=(0,l.p)(r,g),b=this.getValue(),v=(0,c.i)(r)?"rtl":"ltr";return(0,l.e)(!0,r,h,i?b:"",n),(0,o.h)(o.H,{onClick:this.onClick,"aria-labelledby":u?w:null,"aria-checked":`${i}`,"aria-hidden":n?"true":null,role:"switch",class:(0,d.c)(t,{[p]:!0,"in-item":(0,d.h)("ion-item",r),"toggle-activated":e,"toggle-checked":i,"toggle-disabled":n,"legacy-toggle":!0,interactive:!0,[`toggle-${v}`]:!0})},this.renderToggleControl(),(0,o.h)("label",{htmlFor:g},m),(0,o.h)("input",{type:"checkbox",role:"switch","aria-checked":`${i}`,disabled:n,id:g,onFocus:()=>this.onFocus(),onBlur:()=>this.onBlur(),ref:e=>this.focusEl=e}))}get el(){return(0,o.e)(this)}static get watchers(){return{disabled:["disabledChanged"]}}},p=(e,t,i,o)=>t?!e&&o>i||e&&-o<i:!e&&-o<i||e&&o>i;let u=0;h.style={ios:":host{box-sizing:content-box !important;display:inline-block;position:relative;max-width:100%;outline:none;cursor:pointer;touch-action:none;user-select:none;z-index:2}:host(.in-item:not(.legacy-toggle)){width:100%;height:100%}:host(.in-item[slot=start]:not(.legacy-toggle)),:host(.in-item[slot=end]:not(.legacy-toggle)){width:auto}:host(.legacy-toggle){contain:content}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}:host(.legacy-toggle) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0;pointer-events:none}@supports (inset-inline-start: 0){:host(.legacy-toggle) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-toggle) label{left:0}:host-context([dir=rtl]):host(.legacy-toggle) label,:host-context([dir=rtl]).legacy-toggle label{left:unset;right:unset;right:0}}:host(.legacy-toggle) label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.toggle-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;transition:background-color 15ms linear;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;align-items:center}:host(.toggle-justify-space-between) .toggle-wrapper{justify-content:space-between}:host(.toggle-justify-start) .toggle-wrapper{justify-content:start}:host(.toggle-justify-end) .toggle-wrapper{justify-content:end}:host(.toggle-label-placement-start) .toggle-wrapper{flex-direction:row}:host(.toggle-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-end) .toggle-wrapper{flex-direction:row-reverse}:host(.toggle-label-placement-end) .label-text-wrapper{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.toggle-icon-wrapper{display:flex;position:relative;align-items:center;width:100%;height:100%;transition:var(--handle-transition);will-change:transform}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;background:var(--track-background);pointer-events:none;overflow:inherit}:host(.toggle-checked) .toggle-icon{background:var(--track-background-checked)}.toggle-inner{border-radius:var(--handle-border-radius);position:absolute;left:var(--handle-spacing);width:var(--handle-width);height:var(--handle-height);max-height:var(--handle-max-height);transition:var(--handle-transition);background:var(--handle-background);box-shadow:var(--handle-box-shadow);contain:strict}:host(.toggle-ltr) .toggle-inner{left:var(--handle-spacing)}:host(.toggle-rtl) .toggle-inner{right:var(--handle-spacing)}:host(.toggle-ltr.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(100% - var(--handle-width)), 0, 0)}:host(.toggle-rtl.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(-100% + var(--handle-width)), 0, 0)}:host(.toggle-checked) .toggle-inner{background:var(--handle-background-checked)}:host(.toggle-ltr.toggle-checked) .toggle-inner{transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0)}:host(.toggle-rtl.toggle-checked) .toggle-inner{transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0)}:host{--track-background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.088);--track-background-checked:var(--ion-color-primary, #3880ff);--border-radius:16px;--handle-background:#ffffff;--handle-background-checked:#ffffff;--handle-border-radius:25.5px;--handle-box-shadow:0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);--handle-height:calc(32px - (2px * 2));--handle-max-height:calc(100% - var(--handle-spacing) * 2);--handle-width:calc(32px - (2px * 2));--handle-spacing:2px;--handle-transition:transform 300ms, width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms}:host(.legacy-toggle){width:51px;height:32px;contain:strict;overflow:hidden}.native-wrapper .toggle-icon{width:51px;height:32px;overflow:hidden}:host(.ion-color.toggle-checked) .toggle-icon{background:var(--ion-color-base)}:host(.toggle-activated) .toggle-switch-icon{opacity:0}.toggle-icon{transform:translate3d(0, 0, 0);transition:background-color 300ms}.toggle-inner{will-change:transform}.toggle-switch-icon{position:absolute;top:50%;width:11px;height:11px;transform:translateY(-50%);transition:opacity 300ms, color 300ms}.toggle-switch-icon{position:absolute;color:var(--ion-color-dark)}:host(.toggle-ltr) .toggle-switch-icon{right:6px}:host(.toggle-rtl) .toggle-switch-icon{right:initial;left:6px;}:host(.toggle-checked) .toggle-switch-icon.toggle-switch-icon-checked{color:var(--ion-color-contrast, #fff)}:host(.toggle-checked) .toggle-switch-icon:not(.toggle-switch-icon-checked){opacity:0}.toggle-switch-icon-checked{position:absolute;width:15px;height:15px;transform:translateY(-50%) rotate(90deg)}:host(.toggle-ltr) .toggle-switch-icon-checked{right:initial;left:4px;}:host(.toggle-rtl) .toggle-switch-icon-checked{right:4px}:host(.toggle-activated) .toggle-icon::before,:host(.toggle-checked) .toggle-icon::before{transform:scale3d(0, 0, 0)}:host(.toggle-activated.toggle-checked) .toggle-inner::before{transform:scale3d(0, 0, 0)}:host(.toggle-activated) .toggle-inner{width:calc(var(--handle-width) + 6px)}:host(.toggle-ltr.toggle-activated.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(100% - var(--handle-width) - 6px), 0, 0)}:host(.toggle-rtl.toggle-activated.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(-100% + var(--handle-width) + 6px), 0, 0)}:host(.toggle-disabled){opacity:0.3}:host(.in-item.legacy-toggle){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:0;padding-inline-end:0;padding-top:6px;padding-bottom:5px}:host(.in-item.legacy-toggle[slot=start]){-webkit-padding-start:0;padding-inline-start:0;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:6px;padding-bottom:5px}",md:":host{box-sizing:content-box !important;display:inline-block;position:relative;max-width:100%;outline:none;cursor:pointer;touch-action:none;user-select:none;z-index:2}:host(.in-item:not(.legacy-toggle)){width:100%;height:100%}:host(.in-item[slot=start]:not(.legacy-toggle)),:host(.in-item[slot=end]:not(.legacy-toggle)){width:auto}:host(.legacy-toggle){contain:content}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}:host(.legacy-toggle) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0;pointer-events:none}@supports (inset-inline-start: 0){:host(.legacy-toggle) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-toggle) label{left:0}:host-context([dir=rtl]):host(.legacy-toggle) label,:host-context([dir=rtl]).legacy-toggle label{left:unset;right:unset;right:0}}:host(.legacy-toggle) label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.toggle-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;transition:background-color 15ms linear;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;align-items:center}:host(.toggle-justify-space-between) .toggle-wrapper{justify-content:space-between}:host(.toggle-justify-start) .toggle-wrapper{justify-content:start}:host(.toggle-justify-end) .toggle-wrapper{justify-content:end}:host(.toggle-label-placement-start) .toggle-wrapper{flex-direction:row}:host(.toggle-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-end) .toggle-wrapper{flex-direction:row-reverse}:host(.toggle-label-placement-end) .label-text-wrapper{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.toggle-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.toggle-icon-wrapper{display:flex;position:relative;align-items:center;width:100%;height:100%;transition:var(--handle-transition);will-change:transform}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;background:var(--track-background);pointer-events:none;overflow:inherit}:host(.toggle-checked) .toggle-icon{background:var(--track-background-checked)}.toggle-inner{border-radius:var(--handle-border-radius);position:absolute;left:var(--handle-spacing);width:var(--handle-width);height:var(--handle-height);max-height:var(--handle-max-height);transition:var(--handle-transition);background:var(--handle-background);box-shadow:var(--handle-box-shadow);contain:strict}:host(.toggle-ltr) .toggle-inner{left:var(--handle-spacing)}:host(.toggle-rtl) .toggle-inner{right:var(--handle-spacing)}:host(.toggle-ltr.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(100% - var(--handle-width)), 0, 0)}:host(.toggle-rtl.toggle-checked) .toggle-icon-wrapper{transform:translate3d(calc(-100% + var(--handle-width)), 0, 0)}:host(.toggle-checked) .toggle-inner{background:var(--handle-background-checked)}:host(.toggle-ltr.toggle-checked) .toggle-inner{transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0)}:host(.toggle-rtl.toggle-checked) .toggle-inner{transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0)}:host{--track-background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.39);--track-background-checked:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.5);--border-radius:14px;--handle-background:#ffffff;--handle-background-checked:var(--ion-color-primary, #3880ff);--handle-border-radius:50%;--handle-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);--handle-width:20px;--handle-height:20px;--handle-max-height:calc(100% + 6px);--handle-spacing:0;--handle-transition:transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background-color 160ms cubic-bezier(0.4, 0, 0.2, 1)}:host(.legacy-toggle){-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:12px;padding-bottom:12px;width:36px;height:14px;contain:strict}.native-wrapper .toggle-icon{width:36px;height:14px}:host(.ion-color.toggle-checked) .toggle-icon{background:rgba(var(--ion-color-base-rgb), 0.5)}:host(.ion-color.toggle-checked) .toggle-inner{background:var(--ion-color-base)}:host(.toggle-checked) .toggle-inner{color:var(--ion-color-contrast, #fff)}.toggle-icon{transition:background-color 160ms}.toggle-inner{will-change:background-color, transform;display:flex;align-items:center;justify-content:center;color:#000}.toggle-inner .toggle-switch-icon{-webkit-padding-start:1px;padding-inline-start:1px;-webkit-padding-end:1px;padding-inline-end:1px;padding-top:1px;padding-bottom:1px;width:100%;height:100%}:host(.toggle-disabled){opacity:0.3}:host(.in-item.legacy-toggle){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:0;padding-inline-end:0;padding-top:12px;padding-bottom:12px;cursor:pointer}:host(.in-item.legacy-toggle[slot=start]){-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:18px;padding-inline-end:18px;padding-top:12px;padding-bottom:12px}"}},4056:(e,t,i)=>{i.d(t,{c:()=>n});var o=i(6567);const n=e=>{const t=e;let i;return{hasLegacyControl:()=>{if(void 0===i){const e=void 0!==t.label||a(t),n=t.hasAttribute("aria-label")||t.hasAttribute("aria-labelledby")&&null===t.shadowRoot,r=(0,o.l)(t);i=!0===t.legacy||!e&&!n&&null!==r}return i}}},a=e=>!!(null!==e.shadowRoot&&(r.includes(e.tagName)&&null!==e.querySelector('[slot="label"]')||l.includes(e.tagName)&&""!==e.textContent)),r=["ION-RANGE"],l=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},9204:(e,t,i)=>{i.d(t,{i:()=>o});const o=e=>e&&""!==e.dir?"rtl"===e.dir.toLowerCase():"rtl"===(null===document||void 0===document?void 0:document.dir.toLowerCase())},1732:(e,t,i)=>{i.d(t,{a:()=>g,b:()=>o,c:()=>c,d:()=>p,e:()=>v,f:()=>h,g:()=>l,h:()=>r,i:()=>u,j:()=>w,k:()=>m,l:()=>f,m:()=>x,n:()=>a,o:()=>n,p:()=>C,q:()=>E,r:()=>y,s:()=>L,t:()=>d,u:()=>s,v:()=>k,w:()=>b});const o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",b="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",k="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",L="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},1639:(e,t,i)=>{i.d(t,{a:()=>r,b:()=>l,c:()=>s,d:()=>a,h:()=>g});const o={getEngine(){var e;const t=window;return t.TapticEngine||(null===(e=t.Capacitor)||void 0===e?void 0:e.isPluginAvailable("Haptics"))&&t.Capacitor.Plugins.Haptics},available(){var e;const t=window;return!!this.getEngine()&&("web"!==(null===(e=t.Capacitor)||void 0===e?void 0:e.getPlatform())||"undefined"!=typeof navigator&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(e){const t=this.getEngine();if(!t)return;const i=this.isCapacitor()?e.style.toUpperCase():e.style;t.impact({style:i})},notification(e){const t=this.getEngine();if(!t)return;const i=this.isCapacitor()?e.style.toUpperCase():e.style;t.notification({style:i})},selection(){this.impact({style:"light"})},selectionStart(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionEnd():e.gestureSelectionEnd())}},n=()=>o.available(),a=()=>{n()&&o.selection()},r=()=>{n()&&o.selectionStart()},l=()=>{n()&&o.selectionChanged()},s=()=>{n()&&o.selectionEnd()},g=e=>{n()&&o.impact(e)}},6567:(e,t,i)=>{i.d(t,{a:()=>c,b:()=>p,c:()=>a,d:()=>l,e:()=>v,f:()=>m,g:()=>h,h:()=>u,i:()=>g,j:()=>x,k:()=>L,l:()=>w,m:()=>C,n:()=>f,o:()=>r,p:()=>b,q:()=>E,r:()=>d,s:()=>j,t:()=>o,u:()=>y,v:()=>k});const o=(e,t=0)=>new Promise((i=>{n(e,t,i)})),n=(e,t=0,i)=>{let o,n;const a={passive:!0},r=()=>{o&&o()},l=t=>{void 0!==t&&e!==t.target||(r(),i(t))};return e&&(e.addEventListener("webkitTransitionEnd",l,a),e.addEventListener("transitionend",l,a),n=setTimeout(l,t+500),o=()=>{n&&(clearTimeout(n),n=void 0),e.removeEventListener("webkitTransitionEnd",l,a),e.removeEventListener("transitionend",l,a)}),r},a=(e,t)=>{e.componentOnReady?e.componentOnReady().then((e=>t(e))):p((()=>t(e)))},r=e=>void 0!==e.componentOnReady,l=(e,t=[])=>{const i={};return t.forEach((t=>{e.hasAttribute(t)&&(null!==e.getAttribute(t)&&(i[t]=e.getAttribute(t)),e.removeAttribute(t))})),i},s=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],g=(e,t)=>{let i=s;return t&&t.length>0&&(i=i.filter((e=>!t.includes(e)))),l(e,i)},c=(e,t,i,o)=>{var n;if("undefined"!=typeof window){const a=window,r=null===(n=null==a?void 0:a.Ionic)||void 0===n?void 0:n.config;if(r){const n=r.get("_ael");if(n)return n(e,t,i,o);if(r._ael)return r._ael(e,t,i,o)}}return e.addEventListener(t,i,o)},d=(e,t,i,o)=>{var n;if("undefined"!=typeof window){const a=window,r=null===(n=null==a?void 0:a.Ionic)||void 0===n?void 0:n.config;if(r){const n=r.get("_rel");if(n)return n(e,t,i,o);if(r._rel)return r._rel(e,t,i,o)}}return e.removeEventListener(t,i,o)},h=(e,t=e)=>e.shadowRoot||t,p=e=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(e):"function"==typeof requestAnimationFrame?requestAnimationFrame(e):setTimeout(e),u=e=>!!e.shadowRoot&&!!e.attachShadow,w=e=>{const t=e.closest("ion-item");return t?t.querySelector("ion-label"):null},m=e=>{if(e.focus(),e.classList.contains("ion-focusable")){const t=e.closest("ion-app");t&&t.setFocus([e])}},b=(e,t)=>{let i;const o=e.getAttribute("aria-labelledby"),n=e.id;let a=null!==o&&""!==o.trim()?o:t+"-lbl",r=null!==o&&""!==o.trim()?document.getElementById(o):w(e);return r?(null===o&&(r.id=a),i=r.textContent,r.setAttribute("aria-hidden","true")):""!==n.trim()&&(r=document.querySelector(`label[for="${n}"]`),r&&(""!==r.id?a=r.id:r.id=a=`${n}-lbl`,i=r.textContent)),{label:r,labelId:a,labelText:i}},v=(e,t,i,o,n)=>{if(e||u(t)){let e=t.querySelector("input.aux-input");e||(e=t.ownerDocument.createElement("input"),e.type="hidden",e.classList.add("aux-input"),t.appendChild(e)),e.disabled=n,e.name=i,e.value=o||""}},x=(e,t,i)=>Math.max(e,Math.min(t,i)),f=(e,t)=>{if(!e){const e="ASSERT: "+t;throw console.error(e),new Error(e)}},k=e=>e.timeStamp||Date.now(),y=e=>{if(e){const t=e.changedTouches;if(t&&t.length>0){const e=t[0];return{x:e.clientX,y:e.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},C=e=>{const t="rtl"===document.dir;switch(e){case"start":return t;case"end":return!t;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},L=(e,t)=>{const i=e._original||e;return{_original:e,emit:E(i.emit.bind(i),t)}},E=(e,t=0)=>{let i;return(...o)=>{clearTimeout(i),i=setTimeout(e,t,...o)}},j=(e,t)=>{if(null!=e||(e={}),null!=t||(t={}),e===t)return!0;const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!1;for(const o of i){if(!(o in t))return!1;if(e[o]!==t[o])return!1}return!0}}}]);