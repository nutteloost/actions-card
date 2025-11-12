const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class t{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(o,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:l,getPrototypeOf:p}=Object,_=globalThis,u=_.trustedTypes,g=u?u.emptyScript:"",f=_.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},C=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:C};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class i extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...l(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const s=n.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,n=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??C)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,f?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.1");const b=globalThis,$=b.trustedTypes,E=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+A,P=`<${k}>`,T=document,S=()=>T.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,L="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,O=/>/g,M=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),j=new WeakMap,F=T.createTreeWalker(T,129);function V(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===N?"!--"===c[1]?r=U:void 0!==c[1]?r=O:void 0!==c[2]?(I.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=M):void 0!==c[3]&&(r=M):r===M?">"===c[0]?(r=n??N,d=-1):void 0===c[1]?d=-2:(d=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?M:'"'===c[3]?B:R):r===B||r===R?r=M:r===U||r===O?r=N:(r=M,n=void 0);const l=r===M&&t[e+1].startsWith("/>")?" ":"";s+=r===N?i+P:d>=0?(o.push(a),i.slice(0,d)+x+i.slice(d)+A+l):i+A+(-2===d?e:l)}return[V(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[c,d]=X(t,e);if(this.el=Y.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=F.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(x)){const e=d[s++],i=o.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?Q:"?"===r[1]?tt:"@"===r[1]?et:K}),o.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:n}),o.removeAttribute(t));if(I.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],S()),F.nextNode(),a.push({type:2,index:++n});o.append(t[e],S())}}}else if(8===o.nodeType)if(o.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){if(e===z)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=H(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,o)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??T).importNode(e,!0);F.currentNode=o;let n=F.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Z(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(n=F.nextNode(),s++)}return F.currentNode=T,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),H(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new G(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new Y(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new Z(this.O(S()),this.O(S()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=J(this,t,e,0),s=!H(t)||t!==this._$AH&&t!==z,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,o[i+r],e,r),a===z&&(a=this._$AH[r]),s||=!H(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends K{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===z)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=b.litHtmlPolyfillSupport;ot?.(Y,Z),(b.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;class st extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new Z(e.insertBefore(S(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}st._$litElement$=!0,st.finalized=!0,nt.litElementHydrateSupport?.({LitElement:st});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:st}),(nt.litElementVersions??=[]).push("4.2.1");const at=(t,...e)=>{};function ct(t,e,i){return t.entity||t.entity_id||e.entity||(i&&i.config?i.config.entity:null)}const dt="navigate",ht="url",lt="toggle",pt="call-service",_t="more-info",ut="assist",gt="fire-dom-event",ft=[{value:"none",label:"None"},{value:lt,label:"Toggle"},{value:dt,label:"Navigate"},{value:ht,label:"URL"},{value:pt,label:"Call Service"},{value:_t,label:"More Info"},{value:ut,label:"Assist"},{value:gt,label:"Fire DOM Event"}],mt=50,vt=100,Ct=10,yt=50,wt=100,bt=(t,e,i={},o={})=>{const n=new CustomEvent(e,{detail:i,bubbles:!1!==o.bubbles,cancelable:Boolean(o.cancelable),composed:!1!==o.composed});return t.dispatchEvent(n),n},$t=(t,e)=>{if(e.has("config")||e.has("_config"))return!0;const i=e.get("hass");return!i||i!==t.hass},Et=t=>t&&t.action&&"none"!==t.action,xt=(t,e,i,o)=>{const n=i[`${o}_action`];t._actionExecutor&&Et(n)&&t._actionExecutor.handleAction(o)},At=t=>{if(t&&"function"==typeof t.getCardSize)try{return t.getCardSize()}catch(t){console.warn("Error getting card size:",t)}return 1},kt=async()=>window.loadCardHelpers?.()||null;function Pt(){return{LitElement:st,html:W,css:s,fireEvent:bt,hasConfigOrEntityChanged:$t,hasAction:Et,handleAction:xt,computeCardSize:At,loadCardHelpers:kt}}class Tt{constructor(t,e,i,o){this.element=t,this.config=i,this.childCard=o,this._lastActionTime=0}handleAction(t="tap"){const e=this.config[`${t}_action`];e&&"none"!==e.action&&(e.confirmation?this._showConfirmationDialog(e):this._executeAction(e))}_showConfirmationDialog(t){let e,i="Are you sure?",o="Confirm",n="Cancel";"object"==typeof t.confirmation?(i=t.confirmation.text||i,e=t.confirmation.title,o=t.confirmation.confirm_text||o,n=t.confirmation.dismiss_text||n):"string"==typeof t.confirmation&&(i=t.confirmation);const s=document.createElement("ha-dialog");s.heading=e||"",s.open=!0;const r=document.createElement("div");r.innerText=i,s.appendChild(r);const a=document.createElement("mwc-button");a.slot="primaryAction",a.label=o,a.style.color="var(--primary-color)",a.setAttribute("aria-label",o),a.addEventListener("click",()=>{s.parentNode.removeChild(s),this._executeAction(t)});const c=document.createElement("mwc-button");c.slot="secondaryAction",c.label=n,c.setAttribute("aria-label",n),c.addEventListener("click",()=>{s.parentNode.removeChild(s)}),s.appendChild(a),s.appendChild(c),document.body.appendChild(s)}_executeAction(t){this._lastActionTime=Date.now();const e=this.element.hass;if(e&&t.action)try{switch(t.action,this.element._suppressChildCardEvents&&this.element._suppressChildCardEvents(300),t.action){case dt:!function(t){const{fireEvent:e}=Pt(),i=t.navigation_path||"",o=!0===t.navigation_replace;i&&(o?window.history.replaceState(null,"",i):window.history.pushState(null,"",i),e(window,"location-changed",{replace:o}))}(t,0,this.config,this.childCard);break;case ht:!function(t){const e=t.url_path||"";e&&(t.target,window.open(e,t.target||"_blank"))}(t,0,this.config,this.childCard);break;case lt:!function(t,e,i,o){const n=ct(t,i,o);n&&e.callService("homeassistant","toggle",{entity_id:n})}(t,e,this.config,this.childCard);break;case pt:!function(t,e){if(!t.service)return;const[i,o]=t.service.split(".",2);if(!i||!o)return void t.service;const n={...t.service_data||t.data||{}},s=t.target||(n.entity_id?{entity_id:n.entity_id}:{});s.entity_id&&n.entity_id&&delete n.entity_id,e.callService(i,o,n,s)}(t,e,this.config,this.childCard);break;case _t:!function(t,e,i,o,n){const{fireEvent:s}=Pt(),r=ct(t,i,o);r&&s(n,"hass-more-info",{entityId:r})}(t,0,this.config,this.childCard,this.element);break;case ut:!function(t,e,i,o,n){const{fireEvent:s}=Pt();t.pipeline_id,t.start_listening,s(n,"assist",{pipeline_id:t.pipeline_id||"last_used",start_listening:!0===t.start_listening})}(t,0,this.config,this.childCard,this.element);break;case gt:!function(t,e,i,o,n){const{fireEvent:s}=Pt();if("browser_mod"===t.event_type&&t.event_data)return t.event_data,void s(n,"ll-custom",{browser_mod:t.event_data});t.event_type&&(t.event_type,t.event_data,s(n,t.event_type,t.event_data||null))}(t,0,this.config,this.childCard,this.element);break;default:t.action}}catch(e){console.error("ActionsCard: Error executing action:",t.action,e)}}getLastActionTime(){return this._lastActionTime}}class ActionsCard extends st{static get properties(){return{hass:{type:Object},config:{type:Object},_childCard:{type:Object,state:!0}}}static getStubConfig(){return{card:null,tap_action:{action:"none"},hold_action:{action:"none"},double_tap_action:{action:"none"},prevent_default_dialog:!1}}constructor(){super(),this._holdTimeout=null,this._clickTimeout=null,this._holdTriggered=!1,this._clickCount=0,this._lastActionTime=0,this._childCard=null,this.config={},this._childCardClickHandler=null,this._cardHelpers=null,this._actionExecutor=null,this._currentCardConfig=null,this._cardModConfig=null,this._swipeStartTime=0,this._swipeInProgress=!1,this._isWindowTracked=!1,this._processingPointerUp=!1,this._isClickBlocked=!1,this._clickBlockTimer=null,this._boundOnPointerMove=this._onPointerMove.bind(this),this._boundOnPointerUp=this._onPointerUp.bind(this),this._boundPreventClick=this._preventClick.bind(this),this._holdProgressElement=null,this._holdCompleted=!1,this._holdStartX=0,this._holdStartY=0,this._cancelDistance=50,this._holdWithProgressCanceled=!1}shouldUpdate(t){return $t(this,t)}willUpdate(t){if(super.willUpdate(t),(t.has("config")||t.has("_childCard"))&&this._actionExecutor&&(this._actionExecutor.config=this.config,this._actionExecutor.childCard=this._childCard),t.has("hass")&&this._childCard&&this._childCard.hass!==this.hass)try{this._childCard.hass=this.hass}catch(t){this.config?.card&&this._createCardElement(this.config.card)}}async _loadCardHelpers(){if(!this._cardHelpers)try{this._cardHelpers=await async function(){if(!window.loadCardHelpers)return null;try{return await window.loadCardHelpers()}catch(t){return null}}()}catch(t){}}setConfig(t){JSON.stringify(t),this.config=t,t.card_mod?(t.card_mod,this._cardModConfig=JSON.parse(JSON.stringify(t.card_mod))):this._cardModConfig=null,this._actionExecutor=new Tt(this,null,this.config,this._childCard),t&&t.card?this._childCard&&JSON.stringify(this._currentCardConfig)===JSON.stringify(t.card)||(this._currentCardConfig=JSON.parse(JSON.stringify(t.card)),this._createCardElement(t.card).catch(t=>{})):(this._childCard=null,this._currentCardConfig=null,this.requestUpdate())}async _createCardElement(t){if(!t)return this._childCard=null,void this.requestUpdate();try{const e=Array.isArray(t)?t[0]:t,i=e.type;if(!i)throw new Error("Card configuration requires a `type`.");if(i.startsWith("custom:"))return void await this._createCardElementDirect(e);const o=await this._tryCreateWithCardHelpers(e);o?await this._finalizeCardElement(o,i):await this._createCardElementDirect(e)}catch(e){this._createErrorCard(e.message,t)}this.requestUpdate()}async _tryCreateWithCardHelpers(t){try{if(this._cardHelpers||await this._loadCardHelpers(),this._cardHelpers)return t.type,await this._cardHelpers.createCardElement(t)}catch(e){t.type}return null}async _finalizeCardElement(t,e){this.hass&&(t.hass=this.hass),this._childCard=t,this._actionExecutor&&(this._actionExecutor.childCard=this._childCard),await this._applyDialogPrevention(),setTimeout(()=>{this._triggerCardModRefresh()},100)}async _applyDialogPrevention(){await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this._preventDefaultDialogs()},mt)}async _createCardElementDirect(t,e=0){const i=t.type;if(e>Ct)return void this._createErrorCard(`Failed to create card: ${i}`,t);const o=i.startsWith("custom:")?i.substring(7):`hui-${i}-card`,n=document.createElement(o);if("function"!=typeof n.setConfig)return e<5?void setTimeout(()=>this._createCardElementDirect(t,e+1),vt):void this._createErrorCard(`Card type ${i} is not available`,t);try{n.setConfig(t),this.hass&&(n.hass=this.hass),this._childCard=n,this._actionExecutor&&(this._actionExecutor.childCard=this._childCard),await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this._preventDefaultDialogs(),this._triggerCardModRefresh()},50)}catch(e){this._createErrorCard(`Error setting up card: ${e.message}`,t)}}_createErrorCard(t,e){try{const i=document.createElement("hui-error-card");i.setConfig({type:"error",error:t,origConfig:e}),this.hass&&(i.hass=this.hass),this._childCard=i}catch(e){const i=document.createElement("div");i.innerHTML=`<ha-alert alert-type="error">Error: ${t}</ha-alert>`,this._childCard=i}this._actionExecutor&&(this._actionExecutor.childCard=this._childCard),this.requestUpdate()}_onClick(t){this.config.prevent_default_dialog&&(t.preventDefault(),t.stopPropagation())}_preventClick(t){if(this._isClickBlocked||this._swipeInProgress)return t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),!1}_blockClicksTemporarily(t=300){this._isClickBlocked=!0,this._clickBlockTimer&&clearTimeout(this._clickBlockTimer),this._clickBlockTimer=setTimeout(()=>{this._isClickBlocked=!1,this._clickBlockTimer=null},t)}_preventDefaultDialogs(){if(!this._childCard||!this.config.prevent_default_dialog)return;this._cleanupDefaultDialogPrevention(),this._childCardClickHandler=t=>{t.type,"hass-more-info"!==t.type&&"click"!==t.type&&"tap"!==t.type||(t.type,t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation())};const t=()=>{if(this._childCard){const t=["hass-more-info","click","tap"];t.forEach(t=>{this._childCard.addEventListener(t,this._childCardClickHandler,{capture:!0,passive:!1}),this._childCard.shadowRoot&&this._childCard.shadowRoot.addEventListener(t,this._childCardClickHandler,{capture:!0,passive:!1})});this._childCard.querySelectorAll("*").forEach(e=>{t.forEach(t=>{e.addEventListener(t,this._childCardClickHandler,{capture:!0,passive:!1})})})}},e=(i=0)=>{if(!(i>5))try{t()}catch(t){setTimeout(()=>e(i+1),100)}};e(),setTimeout(()=>e(),500)}_cleanupDefaultDialogPrevention(){if(this._childCard&&this._childCardClickHandler){const t=["hass-more-info","click","tap"];t.forEach(t=>{this._childCard.removeEventListener(t,this._childCardClickHandler,!0),this._childCard.shadowRoot&&this._childCard.shadowRoot.removeEventListener(t,this._childCardClickHandler,!0)});try{this._childCard.querySelectorAll("*").forEach(e=>{t.forEach(t=>{e.removeEventListener(t,this._childCardClickHandler,!0)})})}catch(t){}this._childCardClickHandler=null}}set hass(t){const e=this._hass;if(this._hass=t,this._childCard&&this._childCard.hass!==t)try{this._childCard.hass=t}catch(t){this.config&&this.config.card&&this._createCardElement(this.config.card)}e!==t&&this.requestUpdate()}get hass(){return this._hass}getCardSize(){return this._childCard?At(this._childCard):3}updated(t){if(super.updated(t),t.has("config")&&this._cardModConfig&&this._applyCardModStyles(),t.has("_childCard")){const t=this.shadowRoot?.querySelector(".card-wrapper");if(t){const e=t.querySelector(":scope > *");e&&e!==this._childCard&&t.removeChild(e),this._childCard&&!t.contains(this._childCard)&&t.appendChild(this._childCard)}}t.has("_childCard")&&this._childCard&&this.config&&this.config.prevent_default_dialog&&setTimeout(()=>{this._preventDefaultDialogs()},100),(t.has("config")||t.has("_childCard"))&&this._actionExecutor&&(this._actionExecutor.config=this.config,this._actionExecutor.childCard=this._childCard)}connectedCallback(){super.connectedCallback(),this._cardHelpers||this._loadCardHelpers(),this._cardModConfig&&this._applyCardModStyles()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDefaultDialogPrevention(),this._hideHoldProgress(),window.removeEventListener("pointermove",this._boundOnPointerMove),window.removeEventListener("pointerup",this._boundOnPointerUp),this._clickBlockTimer&&(clearTimeout(this._clickBlockTimer),this._clickBlockTimer=null)}_handleAction(t="tap"){this._actionExecutor&&this._actionExecutor.handleAction(t)}_resetState(t){t&&t.stopPropagation(),this._isWindowTracked&&(window.removeEventListener("pointermove",this._boundOnPointerMove),window.removeEventListener("pointerup",this._boundOnPointerUp),this._isWindowTracked=!1),clearTimeout(this._holdTimeout),clearTimeout(this._clickTimeout),this._holdTimeout=null,this._clickTimeout=null,this._holdTriggered=!1,this._clickCount=0,this._swipeInProgress=!1,this._swipeStartTime=0,this._pointerType=null,this._processingPointerUp=!1,this._hideHoldProgress(),this._holdCompleted=!1,this._holdStartX=0,this._holdStartY=0,this._holdWithProgressCanceled=!1}_showHoldProgress(t,e,i){this._hideHoldProgress();const o="ontouchstart"in window||navigator.maxTouchPoints>0?wt:yt,n=getComputedStyle(this),s=n.getPropertyValue("--actions-card-hold-progress-color").trim()||n.getPropertyValue("--primary-color").trim()||"#03a9f4",r=n.getPropertyValue("--actions-card-hold-progress-inactive-color").trim()||s,a=n.getPropertyValue("--actions-card-hold-progress-inactive-opacity").trim()||"0.2",c=n.getPropertyValue("--actions-card-hold-progress-opacity").trim()||"1",d=parseInt(n.getPropertyValue("--actions-card-hold-progress-width").trim())||4,h=o/2-d/2,l=2*Math.PI*h;this._holdProgressElement=document.createElement("div"),this._holdProgressElement.style.cssText=`\n      position: fixed;\n      left: ${t}px;\n      top: ${e}px;\n      width: ${o}px;\n      height: ${o}px;\n      transform: translate(-50%, -50%);\n      pointer-events: none;\n      z-index: 99999;\n    `,this._holdProgressElement.innerHTML=`\n      <svg width="${o}" height="${o}" style="display: block;">\n        \x3c!-- Inactive circle --\x3e\n        <circle\n          cx="${o/2}"\n          cy="${o/2}"\n          r="${h}"\n          fill="none"\n          stroke="${r}"\n          stroke-width="${d}"\n          opacity="${a}"\n        />\n        \x3c!-- Progress circle --\x3e\n        <circle\n          cx="${o/2}"\n          cy="${o/2}"\n          r="${h}"\n          fill="none"\n          stroke="${s}"\n          stroke-width="${d}"\n          stroke-linecap="round"\n          opacity="${c}"\n          transform="rotate(-90 ${o/2} ${o/2})"\n          style="\n            stroke-dasharray: ${l};\n            stroke-dashoffset: ${l};\n            transition: stroke-dashoffset ${i}ms linear;\n          "\n        />\n      </svg>\n    `,document.body.appendChild(this._holdProgressElement);const p=this._holdProgressElement.querySelector("circle:last-child");requestAnimationFrame(()=>{p.style.strokeDashoffset="0"})}_applyCardModStyles(){if(!this._cardModConfig||!this._cardModConfig.style)return;const t=this.shadowRoot;if(!t)return;let e=t.querySelector("#actions-card-mod-styles");e||(e=document.createElement("style"),e.id="actions-card-mod-styles",t.appendChild(e)),e.textContent=this._cardModConfig.style}_hideHoldProgress(){this._holdProgressElement&&(this._holdProgressElement.remove(),this._holdProgressElement=null)}_hasMovedTooFar(t,e){const i=t-this._holdStartX,o=e-this._holdStartY;return Math.sqrt(i*i+o*o)>this._cancelDistance}_onPointerDown(t){const e=["INPUT","BUTTON","SELECT","TEXTAREA","A","HA-SLIDER","HA-SWITCH","PAPER-SLIDER","PAPER-BUTTON","MWC-BUTTON"];let i=t.target;for(;i&&i!==this;){if(e.includes(i.tagName)||i.hasAttribute("actions-card-interactive"))return void at(0,i.tagName);i=i.parentElement||i.getRootNode().host}if((0===t.button||"mouse"!==t.pointerType)&&(t.stopPropagation(),this._startX=t.clientX,this._startY=t.clientY,this._swipeStartTime=Date.now(),this._swipeInProgress=!1,this._pointerType=t.pointerType,this._holdStartX=t.clientX,this._holdStartY=t.clientY,this._holdCompleted=!1,this._holdWithProgressCanceled=!1,clearTimeout(this._holdTimeout),this._holdTriggered=!1,"mouse"===t.pointerType?(this._isWindowTracked=!0,window.addEventListener("pointermove",this._boundOnPointerMove),window.addEventListener("pointerup",this._boundOnPointerUp)):this._isWindowTracked=!1,this.config.hold_action&&"none"!==this.config.hold_action.action)){const e=this.config.hold_action.hold_time||500,i=this.config.hold_action.show_progress||!1;i&&this._showHoldProgress(t.clientX,t.clientY,e),this._holdTimeout=window.setTimeout(()=>{Math.abs(t.clientX-this._startX)<10&&Math.abs(t.clientY-this._startY)<10?i?this._holdCompleted=!0:(this._holdTriggered=!0,this._handleAction("hold"),this._clickCount=0):(this._hideHoldProgress(),this._resetState())},e)}}_onPointerUp(t){if(this._processingPointerUp)return;if(this._isWindowTracked&&t.currentTarget!==window)return;if(0!==t.button&&"mouse"===t.pointerType)return;this._processingPointerUp=!0,"mouse"===this._pointerType&&this._isWindowTracked&&(window.removeEventListener("pointermove",this._boundOnPointerMove),window.removeEventListener("pointerup",this._boundOnPointerUp),this._isWindowTracked=!1),t.stopPropagation(),this.config.prevent_default_dialog&&t.preventDefault();const e=t.clientX-this._startX,i=t.clientY-this._startY,o=Math.sqrt(e*e+i*i);if(this._hideHoldProgress(),clearTimeout(this._holdTimeout),this.config.hold_action?.show_progress&&(this._holdCompleted||this._holdWithProgressCanceled))return this._holdCompleted&&!this._hasMovedTooFar(t.clientX,t.clientY)?this._handleAction("hold"):(this._holdWithProgressCanceled||this._hasMovedTooFar(t.clientX,t.clientY))&&this._suppressChildCardEvents(300),this._resetState(),void setTimeout(()=>{this._processingPointerUp=!1},10);if(this._holdTriggered)return void this._resetState();const n=this._detectSwipe(this._startX,this._startY,t.clientX,t.clientY,this._swipeStartTime,t.target);if(n){const e=`swipe_${n}_action`;if(this.config[e]&&"none"!==this.config[e].action)return this._swipeInProgress=!0,t.stopImmediatePropagation(),this._blockClicksTemporarily(300),this._suppressChildCardEvents(300),this._handleAction(`swipe_${n}`),void this._resetState()}const s=o>10;!s||n?s?this._resetState():(this._clickCount++,this._clickCount,this.config.prevent_default_dialog&&this._suppressChildCardEvents(300),this.config.double_tap_action&&"none"!==this.config.double_tap_action.action?1===this._clickCount?this._clickTimeout=window.setTimeout(()=>{1!==this._clickCount||this._holdTriggered||"none"!==this.config.tap_action?.action&&this._handleAction("tap"),this._resetState()},250):2===this._clickCount&&(clearTimeout(this._clickTimeout),this._clickTimeout=null,this._handleAction("double_tap"),this._resetState()):("none"!==this.config.tap_action?.action&&this._handleAction("tap"),this._resetState()),setTimeout(()=>{this._processingPointerUp=!1},10)):this._resetState()}_onPointerMove(t){const e=t.clientX-this._startX,i=t.clientY-this._startY;Math.sqrt(e*e+i*i)>10&&this._holdTimeout&&(clearTimeout(this._holdTimeout),this._holdTimeout=null,this._hideHoldProgress(),this._suppressChildCardEvents(300)),this._holdProgressElement&&this._hasMovedTooFar(t.clientX,t.clientY)&&(clearTimeout(this._holdTimeout),this._holdTimeout=null,this._holdCompleted=!1,this._holdWithProgressCanceled=!0,this._hideHoldProgress(),this._suppressChildCardEvents(300))}_suppressChildCardEvents(t){if(!this._childCard)return;const e=t=>{t.type,t.stopPropagation(),t.preventDefault()},i=["click","tap","hass-more-info"];i.forEach(t=>{this._childCard.addEventListener(t,e,{capture:!0}),this._childCard.shadowRoot&&this._childCard.shadowRoot.addEventListener(t,e,{capture:!0})}),setTimeout(()=>{i.forEach(t=>{this._childCard.removeEventListener(t,e,{capture:!0}),this._childCard.shadowRoot&&this._childCard.shadowRoot.removeEventListener(t,e,{capture:!0})})},t)}_handleEditClick(t){t.stopPropagation(),bt(this,"show-edit-card",{element:this})}_triggerCardModRefresh(){window.cardmod&&window.cardmod.process_card?.(this._childCard),this.dispatchEvent(new CustomEvent("card-mod-refresh",{bubbles:!0,composed:!0}))}_detectSwipe(t,e,i,o,n,s){const r=i-t,a=o-e,c=Math.abs(r),d=Math.abs(a),h=Math.sqrt(r*r+a*a),l=Date.now()-n;if(h<20)return null;if(l>1e3)return null;const p=this._isScrollableElement(s);return c>d?p.horizontal?null:r>0?"right":"left":p.vertical?null:a>0?"down":"up"}_isScrollableElement(t){let e=t;const i={horizontal:!1,vertical:!1};for(;e&&e!==this;){const t=window.getComputedStyle(e),o=t.overflowX,n=t.overflowY;("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth&&(i.horizontal=!0),("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight&&(i.vertical=!0),e=e.parentElement||e.getRootNode()?.host}return i}render(){if(!this.hass)return W``;if(!this.config||!this.config.card)return W`
        <div class="card-config-missing">
          <div class="preview-container">
            <div class="preview-icon">
              <ha-icon icon="mdi:gesture-tap"></ha-icon>
            </div>
            <div class="preview-text">
              <div class="preview-title">Actions Card</div>
              <div class="preview-description">Configure the card to wrap below.</div>
            </div>
            <div class="preview-actions">
              <ha-button raised @click=${this._handleEditClick} aria-label="Edit Card">
                Edit Card
              </ha-button>
            </div>
          </div>
        </div>
      `;this.style.height="100%";const t="none"!==this.config.tap_action?.action||"none"!==this.config.hold_action?.action||"none"!==this.config.double_tap_action?.action||"none"!==this.config.swipe_left_action?.action||"none"!==this.config.swipe_right_action?.action||"none"!==this.config.swipe_up_action?.action||"none"!==this.config.swipe_down_action?.action,e=`cursor: ${t?"pointer":"default"}; display: block; height: 100%;`;return W`
      <div
        class="card-wrapper"
        @pointerdown="${this._onPointerDown}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._resetState}"
        @click="${this._boundPreventClick}"
        @contextmenu="${t=>{this.config.hold_action&&t.preventDefault()}}"
        style="${e}"
        aria-label="${t?"Interactive card with actions":""}"
        role="${t?"button":""}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      ></div>
    `}static get styles(){return function(){const{css:t}=Pt();return t`
    :host {
      display: block;
      box-sizing: border-box;
      overflow: hidden;
      height: 100%;
    }
    .preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      box-sizing: border-box;
      height: 100%;
      background: var(--ha-card-background, var(--card-background-color, white));
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .preview-icon-container {
      margin-bottom: 16px;
    }
    .preview-icon-container ha-icon {
      color: var(--info-color, #4a90e2); /* Blue color */
      font-size: 48px; /* Large icon */
      width: 48px;
      height: 48px;
    }
    .preview-text-container {
      margin-bottom: 16px;
    }
    .preview-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--primary-text-color);
    }
    .preview-description {
      font-size: 14px;
      color: var(--secondary-text-color);
      margin-bottom: 16px;
      max-width: 300px; /* Prevent overly wide text */
      line-height: 1.4;
    }
    .preview-actions ha-button {
      /* Standard HA button styling */
    }
  `}()}}const St="1.5.4";class ActionsCardEditor extends st{static get properties(){return{hass:{type:Object},_config:{type:Object,state:!0},lovelace:{type:Object},_actionsExpanded:{type:Boolean,state:!0},_swipeActionsExpanded:{type:Boolean,state:!0}}}constructor(){super(),this._editorId=`actions-card-editor-${Math.random().toString(36).substring(2,15)}`,this._boundHandleCardPicked=this._handleCardPicked.bind(this),this._inEditorDialog=!1,this._activeChildEditors=new Set,this._showPickerAfterRemoval=!1,this._cardPickerLoadingDebounce=null,this._cardPickerRetryCount=0,this._actionsExpanded=!1,this._swipeActionsExpanded=!1}shouldUpdate(t){return $t(this,t)}async connectedCallback(){super.connectedCallback(),await this._ensureComponentsLoaded(),setTimeout(()=>this._debouncedEnsureCardPickerLoaded(),1e3);let t=this.parentNode;for(;t;){if("hui-dialog-edit-card"===t.localName){this._inEditorDialog=!0,t._hostingActionsCardEditor=!0,at(0);break}t=t.parentNode||t.getRootNode&&t.getRootNode().host}this._setupGlobalHandlers()}async _ensureComponentsLoaded(){let t=0;for(;!customElements.get("hui-card-picker")&&t<10;)await this._loadCustomElements(),customElements.get("hui-card-picker")||(await new Promise(t=>setTimeout(t,200)),t++);customElements.get("hui-card-picker")||await this._tryAlternativeLoading(),customElements.get("hui-card-picker")}async _loadCustomElements(){if(!customElements.get("hui-card-picker"))try{const t=[()=>this._tryLoadViaExistingCards(),()=>this._forceLoadCardPicker()];for(const e of t)try{if(await e(),customElements.get("hui-card-picker"))return void at(0)}catch(t){}}catch(t){}}async _tryLoadViaExistingCards(){const t=["hui-entities-card","hui-conditional-card","hui-vertical-stack-card","hui-horizontal-stack-card","hui-grid-card","hui-map-card"];for(const e of t)try{const t=customElements.get(e);if(t&&t.getConfigElement&&(await t.getConfigElement(),customElements.get("hui-card-picker")))return}catch(t){}}async _tryAlternativeLoading(){try{if(window.loadCardHelpers){if(await window.loadCardHelpers()&&customElements.get("hui-card-picker"))return}const t=document.createElement("div");t.innerHTML="<hui-card-picker></hui-card-picker>",document.body.appendChild(t),await new Promise(t=>setTimeout(t,100)),document.body.removeChild(t)}catch(t){}}async _forceLoadCardPicker(){try{if(!customElements.get("hui-card-picker")){const t=new CustomEvent("hass-refresh",{bubbles:!0,composed:!0});this.dispatchEvent(t),await new Promise(t=>setTimeout(t,500))}}catch(t){}}_debouncedEnsureCardPickerLoaded(){this._showPickerAfterRemoval?this._ensureCardPickerLoaded():(this._cardPickerLoadingDebounce&&clearTimeout(this._cardPickerLoadingDebounce),this._cardPickerLoadingDebounce=setTimeout(()=>{this._ensureCardPickerLoaded()},500))}async _ensureCardPickerLoaded(){if(!this.shadowRoot||this._config?.card)return;const t=this.shadowRoot.querySelector("#card-picker-container");if(!t)return void this.requestUpdate();let e=t.querySelector("hui-card-picker");e||(e=document.createElement("hui-card-picker"),e.hass=this.hass,e.lovelace=this.lovelace,t.appendChild(e))}_setupGlobalHandlers(){this._globalEventHandler=t=>{if(t.target&&this.shadowRoot&&this.shadowRoot.contains(t.target)&&(t.type,t._processedByActionsCardEditor=!0,"keydown"!==t.type&&"input"!==t.type&&"change"!==t.type&&"config-changed"!==t.type||(t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())),"keydown"===t.type||"input"===t.type){"INPUT"===t.target.tagName&&("search"===t.target.type||t.target.placeholder?.includes("Search"))&&(t.type,t._isSearchInput=!0,t._processedByActionsCardEditor=!0,t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())}};["keydown","input","change","click","config-changed"].forEach(t=>{document.addEventListener(t,this._globalEventHandler,{capture:!0})})}disconnectedCallback(){if(super.disconnectedCallback(),this._cardPickerLoadingDebounce&&(clearTimeout(this._cardPickerLoadingDebounce),this._cardPickerLoadingDebounce=null),this._cardPickerRetryCount=0,this._globalEventHandler){["keydown","input","change","click","config-changed"].forEach(t=>{document.removeEventListener(t,this._globalEventHandler,{capture:!0})})}this._activeChildEditors&&(this._activeChildEditors.forEach(t=>{if(t.parentNode)try{t.parentNode.removeChild(t)}catch(t){console.warn("Error removing dialog:",t)}}),this._activeChildEditors.clear())}setConfig(t){if(!t)throw new Error("Invalid configuration");JSON.stringify(t),this._config=JSON.parse(JSON.stringify(t)),this._config.card||setTimeout(()=>this._ensureCardPickerLoaded(),50)}_cleanConfig(t){const e={...t};return["tap_action","hold_action","double_tap_action","swipe_left_action","swipe_right_action","swipe_up_action","swipe_down_action"].forEach(t=>{e[t]&&("none"===e[t].action&&1===Object.keys(e[t]).length||0===Object.keys(e[t]).length)&&delete e[t]}),!1===e.prevent_default_dialog&&delete e.prevent_default_dialog,e}_cleanActionConfig(t,e,i){const o=["action","confirmation"];"hold_action"===i&&o.push("hold_time","show_progress");const n=[...o,...{none:[],navigate:["navigation_path","navigation_replace"],url:["url_path","target"],toggle:["entity"],"more-info":["entity"],"call-service":["service","service_data"],assist:["pipeline_id","start_listening"],"fire-dom-event":["event_type","event_data"]}[e]||[]],s={};return Object.keys(t).forEach(e=>{n.includes(e)&&(s[e]=t[e])}),s}_valueChanged(t){if(t._processedByActionsCardEditor=!0,t.stopPropagation(),!this._config||!t.target)return;const e=t.target,i=e.configValue||e.getAttribute("data-option"),o=e.parentElement?.configValue||e.parentElement?.getAttribute("data-option");if(!(i||o))return;const n=e.configAttribute||e.getAttribute("data-attribute");if(i&&i.includes("_action")){const o={...this._config[i]||{}};if(n)"checkbox"===e.type||"HA-SWITCH"===e.tagName?o[n]=e.checked:o[n]=t.detail?.value??e.value??"",this._config={...this._config,[i]:o};else{const t=e.value,n=this._cleanActionConfig(o,t,i);n.action=t,this._config={...this._config,[i]:n}}}else if(i){let t;t="checkbox"===e.type||"HA-SWITCH"===e.tagName?e.checked:e.value,this._config={...this._config,[i]:t}}this._fireConfigChangedWithFlags()}_fireConfigChangedWithFlags(){if(!this._config)return;const t=this._cleanConfig(this._config);if(bt(this,"config-changed",{config:t,editorId:this._editorId,fromActionCardEditor:!0,preventDialogClose:!0,inEditorDialog:this._inEditorDialog}),this._inEditorDialog){let e=this.parentNode,i=null;for(;e;){if("hui-dialog-edit-card"===e.localName){i=e;break}e=e.parentNode||e.getRootNode&&e.getRootNode().host}if(i&&"function"==typeof i._updateConfig)try{i._updateConfig(t)}catch(t){console.error("Error updating dialog config:",t)}}}_fireConfigChanged(){this._config&&(bt(this,"config-changed",{config:this._config,editorId:this._editorId,fromActionCardEditor:!0,inEditorDialog:this._inEditorDialog,preventDialogClose:!0}),this._config)}_handleCardPicked(t){if(void 0===t._processedByActionsCardEditor&&(t._processedByActionsCardEditor=!0),!t.detail?.editorId||t.detail.editorId===this._editorId){const e=t.detail.config;this._config={...this._config,card:e},this._fireConfigChangedWithFlags(),this.requestUpdate()}t.stopPropagation&&t.stopPropagation()}_handlePanelExpanded(t,e){e.stopPropagation();if(!e.detail.value)return"actions"===t?this._actionsExpanded=!1:"swipe"===t&&(this._swipeActionsExpanded=!1),void(e.target&&e.target.blur&&e.target.blur());this._actionsExpanded=!1,this._swipeActionsExpanded=!1,"actions"===t?this._actionsExpanded=!0:"swipe"===t&&(this._swipeActionsExpanded=!0),this.requestUpdate(),setTimeout(()=>{this.requestUpdate()},10)}async _editWrappedCard(){if(!this._config?.card)return;const t=this._config.card,e=this.hass,i=document.querySelector("home-assistant");if(e&&i)try{await customElements.whenDefined("hui-dialog-edit-card");const o=document.createElement("hui-dialog-edit-card");o.hass=e,this._activeChildEditors.add(o),document.body.appendChild(o);const n=t=>{if(o.removeEventListener("dialog-closed",n),this._activeChildEditors.delete(o),o.parentNode===document.body)try{document.body.removeChild(o)}catch(t){}setTimeout(()=>this._ensureCardPickerLoaded(),100)};o.addEventListener("dialog-closed",n);const s={cardConfig:t,lovelaceConfig:this.lovelace||i.lovelace,saveCardConfig:async t=>{t&&(this._config={...this._config,card:t},this._fireConfigChanged(),this.requestUpdate())}};await o.showDialog(s)}catch(e){bt(this,"ll-show-dialog",{dialogTag:"hui-dialog-edit-card",dialogImport:()=>import("hui-dialog-edit-card"),dialogParams:{cardConfig:t,lovelaceConfig:this.lovelace||i.lovelace,saveCardConfig:t=>{t&&(this._config={...this._config,card:t},this._fireConfigChanged(),this.requestUpdate())}}})}}_removeWrappedCard(){if(!this._config)return;const t={...this._config};delete t.card,this._config=t,this._showPickerAfterRemoval=!0,this._cardPickerLoadingDebounce&&(clearTimeout(this._cardPickerLoadingDebounce),this._cardPickerLoadingDebounce=null),this._cardPickerRetryCount=0,this._fireConfigChangedWithFlags(),this.requestUpdate(),this.updateComplete.then(()=>{setTimeout(()=>{this._ensureCardPickerLoaded()},100)})}_shouldShowCardPicker(){const t=!this._config?.card,e=this._showPickerAfterRemoval,i=this._config&&Object.keys(this._config).length>0&&!this._config.card,o=t&&(e||i||!this._config);return o}_renderActionTypeDropdown(t,e){const i={tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action"}[t]||t.replace(/_/g," ");return W`
      <div class="option-row">
        <div class="option-label">${i}</div>
        <ha-select
          .value=${e.action||"none"}
          data-option="${t}"
          @selected=${this._valueChanged}
          @closed=${t=>{t._processedByActionsCardEditor=!0,t.stopPropagation()}}
        >
          ${ft.map(t=>W`
              <mwc-list-item value="${t.value}">${t.label}</mwc-list-item>
            `)}
        </ha-select>
      </div>
    `}_renderActionDetails(t,e){if(!e||"none"===e.action||!e.action)return W``;switch(e.action){case"navigate":return W`
          <div class="config-row">
            <ha-textfield
              label="Navigation Path"
              .value=${e.navigation_path||""}
              data-option="${t}"
              data-attribute="navigation_path"
              @keydown=${t=>{t._processedByActionsCardEditor=!0}}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Replace history state</div>
            <ha-switch
              .checked=${e.navigation_replace||!1}
              data-option="${t}"
              data-attribute="navigation_replace"
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        `;case"url":return W`
          <div class="config-row">
            <ha-textfield
              label="URL"
              .value=${e.url_path||""}
              data-option="${t}"
              data-attribute="url_path"
              @keydown=${t=>{t._processedByActionsCardEditor=!0}}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-select
              label="Open in"
              .value=${e.target||"_blank"}
              data-option="${t}"
              data-attribute="target"
              @selected=${this._valueChanged}
              @closed=${t=>{t._processedByActionsCardEditor=!0,t.stopPropagation()}}
            >
              <mwc-list-item value="_blank">New tab</mwc-list-item>
              <mwc-list-item value="_self">Same tab</mwc-list-item>
            </ha-select>
          </div>
        `;case"toggle":case"more-info":return W`
          <div class="config-row">
            <ha-entity-picker
              label="Entity"
              .hass=${this.hass}
              .value=${e.entity||""}
              data-option="${t}"
              data-attribute="entity"
              @value-changed=${this._valueChanged}
              allow-custom-entity
            ></ha-entity-picker>
            <div class="help-text">
              Optional: Leave empty to use the entity from the wrapped card
            </div>
          </div>
        `;case"call-service":return W`
          <div class="config-row">
            <ha-textfield
              label="Service"
              .value=${e.service||""}
              data-option="${t}"
              data-attribute="service"
              @keydown=${t=>{t._processedByActionsCardEditor=!0}}
              @change=${this._valueChanged}
              placeholder="domain.service"
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Service Data"
              .value=${e.service_data?JSON.stringify(e.service_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="service_data"
              @value-changed=${e=>{e._processedByActionsCardEditor=!0;try{const i={...this._config};i[t]={...i[t],service_data:JSON.parse(e.detail.value)},this._config=i,this._fireConfigChangedWithFlags()}catch(t){console.error("Invalid service data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;case"assist":return W`
          <div class="config-row">
            <ha-textfield
              label="Pipeline ID (optional)"
              .value=${e.pipeline_id||""}
              data-option="${t}"
              data-attribute="pipeline_id"
              @keydown=${t=>{t._processedByActionsCardEditor=!0}}
              @change=${this._valueChanged}
              placeholder="last_used"
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Start listening immediately</div>
            <ha-switch
              .checked=${e.start_listening||!1}
              data-option="${t}"
              data-attribute="start_listening"
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        `;case"fire-dom-event":return W`
          <div class="config-row">
            <ha-textfield
              label="Event Type"
              .value=${e.event_type||""}
              data-option="${t}"
              data-attribute="event_type"
              @keydown=${t=>{t._processedByActionsCardEditor=!0}}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Event Data (optional)"
              .value=${e.event_data?JSON.stringify(e.event_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="event_data"
              @value-changed=${e=>{e._processedByActionsCardEditor=!0;try{const i={...this._config};i[t]={...i[t],event_data:JSON.parse(e.detail.value)},this._config=i,this._fireConfigChangedWithFlags()}catch(t){console.error("Invalid event data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;default:return W``}}_renderSwipeActionsConfiguration(){const t=this._config.swipe_left_action||{action:"none"},e=this._config.swipe_right_action||{action:"none"},i=this._config.swipe_up_action||{action:"none"},o=this._config.swipe_down_action||{action:"none"};return W`
      <ha-expansion-panel
        .expanded=${this._swipeActionsExpanded}
        @expanded-changed=${t=>{t.stopPropagation(),this._handlePanelExpanded("swipe",t)}}
      >
        <div slot="header" role="heading" aria-level="3">
          <ha-icon icon="mdi:gesture-swipe"></ha-icon>
          Swipe Actions
        </div>

        <div class="section">
          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-left" style="margin-right: 8px;"></ha-icon>
              Swipe Left
            </div>
            ${this._renderActionTypeDropdown("swipe_left_action",t)}
            ${this._renderActionDetails("swipe_left_action",t)}
            ${this._renderConfirmationConfig("swipe_left_action",t)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-right" style="margin-right: 8px;"></ha-icon>
              Swipe Right
            </div>
            ${this._renderActionTypeDropdown("swipe_right_action",e)}
            ${this._renderActionDetails("swipe_right_action",e)}
            ${this._renderConfirmationConfig("swipe_right_action",e)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-up" style="margin-right: 8px;"></ha-icon>
              Swipe Up
            </div>
            ${this._renderActionTypeDropdown("swipe_up_action",i)}
            ${this._renderActionDetails("swipe_up_action",i)}
            ${this._renderConfirmationConfig("swipe_up_action",i)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-down" style="margin-right: 8px;"></ha-icon>
              Swipe Down
            </div>
            ${this._renderActionTypeDropdown("swipe_down_action",o)}
            ${this._renderActionDetails("swipe_down_action",o)}
            ${this._renderConfirmationConfig("swipe_down_action",o)}
          </div>
        </div>
      </ha-expansion-panel>
    `}_renderConfirmationConfig(t,e){if(!e||"none"===e.action||!e.action)return W``;const i=!!e.confirmation,o="object"==typeof e.confirmation?e.confirmation:i?{text:e.confirmation}:{};return W`
      <div class="option-row confirmation-row">
        <div class="option-label">Require confirmation</div>
        <ha-switch
          .checked=${i}
          @change=${e=>{e._processedByActionsCardEditor=!0;const i={...this._config};i[t]={...i[t],confirmation:!!e.target.checked&&{text:"Are you sure?"}},this._config=i,this._fireConfigChangedWithFlags(),this.requestUpdate()}}
        ></ha-switch>
      </div>

      ${i?W`
            <div class="confirmation-config">
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Text"
                  .value=${o.text||"Are you sure?"}
                  @keydown=${t=>{t._processedByActionsCardEditor=!0}}
                  @change=${e=>{e._processedByActionsCardEditor=!0;const i={...this._config},o="object"==typeof i[t].confirmation?{...i[t].confirmation}:{};o.text=e.target.value,i[t].confirmation=o,this._config=i,this._fireConfigChangedWithFlags()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Title (optional)"
                  .value=${o.title||""}
                  @keydown=${t=>{t._processedByActionsCardEditor=!0}}
                  @change=${e=>{e._processedByActionsCardEditor=!0;const i={...this._config},o="object"==typeof i[t].confirmation?{...i[t].confirmation}:{};o.title=e.target.value,i[t].confirmation=o,this._config=i,this._fireConfigChangedWithFlags()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirm Button Text"
                  .value=${o.confirm_text||"Confirm"}
                  @keydown=${t=>{t._processedByActionsCardEditor=!0}}
                  @change=${e=>{e._processedByActionsCardEditor=!0;const i={...this._config},o="object"==typeof i[t].confirmation?{...i[t].confirmation}:{};o.confirm_text=e.target.value,i[t].confirmation=o,this._config=i,this._fireConfigChangedWithFlags()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Cancel Button Text"
                  .value=${o.dismiss_text||"Cancel"}
                  @keydown=${t=>{t._processedByActionsCardEditor=!0}}
                  @change=${e=>{e._processedByActionsCardEditor=!0;const i={...this._config},o="object"==typeof i[t].confirmation?{...i[t].confirmation}:{};o.dismiss_text=e.target.value,i[t].confirmation=o,this._config=i,this._fireConfigChangedWithFlags()}}
                ></ha-textfield>
              </div>
            </div>
          `:""}
    `}_renderHoldTimeConfig(t){return t&&"none"!==t.action?W`
      <div class="config-row">
        <ha-textfield
          label="Hold Time (ms)"
          type="number"
          min="100"
          max="2000"
          step="100"
          .value=${t.hold_time||500}
          data-option="hold_action"
          data-attribute="hold_time"
          @keydown=${t=>{t._processedByActionsCardEditor=!0}}
          @change=${this._valueChanged}
          suffix="ms"
        ></ha-textfield>
        <div class="help-text">
          Time in milliseconds to hold before triggering the action (default: 500ms)
        </div>
      </div>

      <!-- Show Progress Option -->
      <div class="option-row">
        <div class="option-label">
          Show Progress Indicator
          <div class="option-description">
            Display visual feedback during hold and fire action on release
          </div>
        </div>
        <ha-switch
          .checked=${t.show_progress||!1}
          data-option="hold_action"
          data-attribute="show_progress"
          @change=${this._valueChanged}
        ></ha-switch>
      </div>
    `:W``}render(){return this.hass&&this._config?W`
      <div class="card-config" @keydown=${t=>t._processedByActionsCardEditor=!0}>
        ${this._renderInfoPanel()} ${this._renderCardManagement()} ${this._renderCardPicker()}
        ${this._renderGeneralOptions()} ${this._renderActionsConfiguration()}
        ${this._renderSwipeActionsConfiguration()} ${this._renderFooter()}
      </div>
    `:W`<ha-circular-progress active alt="Loading editor"></ha-circular-progress>`}_renderInfoPanel(){return W`
      <div class="info-panel">
        <div class="info-icon">i</div>
        <div class="info-text">
          This card wraps another card to add tap, hold, double-tap actions and/or swipe actions.
          First, select a card to wrap below, then configure the actions you want to enable.
        </div>
      </div>
    `}_renderCardManagement(){const t=!!this._config.card,e=t?function(t){if(!t?.type)return{typeName:"Unknown",name:""};const e=(t.type.startsWith("custom:")?t.type.substring(7):t.type).split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ");return{typeName:e,name:t.title||t.name||""}}(this._config.card):{typeName:"",name:""};return W`
      <div class="section">
        <div class="section-header">Wrapped Card</div>

        ${t?W`
              <div class="card-row">
                <div class="card-info">
                  <span class="card-type">${e.typeName}</span>
                  ${e.name?W`<span class="card-name">(${e.name})</span>`:""}
                </div>
                <div class="card-actions">
                  <ha-icon-button
                    label="Edit Card"
                    path="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                    @click=${()=>this._editWrappedCard()}
                  ></ha-icon-button>
                  <ha-icon-button
                    label="Delete Card"
                    path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    @click=${()=>this._removeWrappedCard()}
                    style="color: var(--error-color);"
                  ></ha-icon-button>
                </div>
              </div>
            `:W`
              <div class="no-card">
                <div class="no-card-message">
                  No card selected. Use the card picker below to choose a card to wrap.
                </div>
              </div>
            `}
      </div>
    `}_renderCardPicker(){return!!this._config.card||!this._shouldShowCardPicker()?W``:W`
      <div id="card-picker-container">
        <hui-card-picker
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          @config-changed=${this._boundHandleCardPicked}
          label="Pick a card to wrap"
        ></hui-card-picker>
      </div>
    `}_renderGeneralOptions(){return W`
      <div class="section">
        <div class="section-header">General Options</div>

        <div class="option-row">
          <div class="option-label">
            Prevent Default Entity Dialog
            <div class="option-description">
              When enabled, prevents the default entity information dialog from opening
            </div>
          </div>
          <ha-switch
            .checked=${this._config.prevent_default_dialog||!1}
            @change=${t=>{t._processedByActionsCardEditor=!0;const e={...this._config};e.prevent_default_dialog=t.target.checked,this._config=e,this._fireConfigChangedWithFlags()}}
          ></ha-switch>
        </div>
      </div>
    `}_renderActionsConfiguration(){const t=this._config.tap_action||{action:"none"},e=this._config.hold_action||{action:"none"},i=this._config.double_tap_action||{action:"none"};return W`
      <ha-expansion-panel
        .expanded=${this._actionsExpanded}
        @expanded-changed=${t=>{t.stopPropagation(),this._handlePanelExpanded("actions",t)}}
      >
        <div slot="header" role="heading" aria-level="3">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
          Actions
        </div>

        <div class="section">
          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap" style="margin-right: 8px;"></ha-icon>
              Tap Action
            </div>
            ${this._renderActionTypeDropdown("tap_action",t)}
            ${this._renderActionDetails("tap_action",t)}
            ${this._renderConfirmationConfig("tap_action",t)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap-hold" style="margin-right: 8px;"></ha-icon>
              Hold Action
            </div>
            ${this._renderActionTypeDropdown("hold_action",e)}
            ${this._renderActionDetails("hold_action",e)}
            ${this._renderHoldTimeConfig(e)}
            ${this._renderConfirmationConfig("hold_action",e)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-double-tap" style="margin-right: 8px;"></ha-icon>
              Double Tap Action
            </div>
            ${this._renderActionTypeDropdown("double_tap_action",i)}
            ${this._renderActionDetails("double_tap_action",i)}
            ${this._renderConfirmationConfig("double_tap_action",i)}
          </div>
        </div>
      </ha-expansion-panel>
    `}_renderFooter(){return W`
      <div class="version-display">
        <div class="version-text">Actions Card</div>
        <div class="version-badges">
          <div class="version-badge">v${St}</div>
          <a
            href="https://github.com/nutteloost/actions-card"
            target="_blank"
            rel="noopener noreferrer"
            class="github-badge"
          >
            <ha-icon icon="mdi:github"></ha-icon>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    `}updated(t){if(super.updated(t),t.has("_actionsExpanded")||t.has("_swipeActionsExpanded")){const t=this.shadowRoot?.querySelector("ha-expansion-panel"),e=this.shadowRoot?.querySelectorAll("ha-expansion-panel")[1];t&&void 0!==this._actionsExpanded&&(t.expanded=this._actionsExpanded),e&&void 0!==this._swipeActionsExpanded&&(e.expanded=this._swipeActionsExpanded)}t.has("_config")&&!this._config?.card&&(this._showPickerAfterRemoval?setTimeout(()=>this._ensureCardPickerLoaded(),50):this._debouncedEnsureCardPickerLoaded())}static get styles(){return function(){const{css:t}=Pt();return t`
    .card-config {
      /* Let HA handle padding */
    }

    .info-panel {
      display: flex;
      align-items: flex-start;
      padding: 12px;
      margin: 8px 0 24px 0;
      background-color: var(--primary-background-color);
      border-radius: 8px;
      border: 1px solid var(--divider-color);
    }

    .info-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: var(--info-color, #4a90e2);
      color: white;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .info-text {
      flex-grow: 1;
      color: var(--primary-text-color);
      font-size: 14px;
    }

    /* MAIN SECTION STYLES */
    .section {
      margin: 16px 0;
      padding: 16px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 8px);
      background-color: var(--card-background-color, var(--primary-background-color));
    }

    .section-header:not(.action-container .section-header) {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      color: var(--primary-text-color);
    }

    .action-container .section-header {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--primary-text-color);
    }

    .action-container .section-header ha-icon {
      margin-right: 8px;
      width: 20px;
      height: 20px;
      color: var(--secondary-text-color);
    }

    .option-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      min-height: 40px;
    }

    .option-label {
      flex: 1;
      margin-right: 12px;
      font-size: 14px;
      color: var(--primary-text-color);
    }

    .option-description {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .help-text {
      color: var(--secondary-text-color);
      font-size: 12px;
      padding: 0 4px;
      margin-top: 4px;
      margin-bottom: 12px;
    }

    .no-card {
      text-align: center;
      color: var(--secondary-text-color);
      padding: 16px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-card-border-radius, 4px);
      margin-bottom: 16px;
    }

    .card-row {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 4px);
      margin-bottom: 8px;
      background: var(--secondary-background-color);
    }

    .card-info {
      flex-grow: 1;
      display: flex;
      align-items: center;
      margin-right: 8px;
      overflow: hidden;
    }

    .card-type {
      font-size: 14px;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-name {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-left: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-actions {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .card-actions ha-icon-button {
      --mdc-icon-button-size: 36px;
      color: var(--secondary-text-color);
    }

    .card-actions ha-icon-button:hover {
      color: var(--primary-text-color);
    }

    #card-picker-container {
      display: block;
      margin-top: 16px;
      margin-bottom: 20px;
      padding-top: 16px;
      border-top: none;
    }

    ha-textfield,
    ha-select,
    ha-entity-picker {
      width: 100%;
      display: block;
      margin-bottom: 8px;
    }

    ha-select {
      --ha-select-height: 40px;
    }

    ha-switch {
      margin-left: 8px;
    }

    .config-row {
      margin-top: 8px;
      margin-bottom: 12px;
    }

    .action-container {
      background-color: var(--secondary-background-color);
      border-radius: var(--ha-card-border-radius, 4px);
      padding: 12px;
      margin-bottom: 16px;
    }

    .confirmation-row {
      margin-top: 8px;
      padding-top: 8px;
      padding-bottom: 0px;
      border-top: 1px dashed var(--divider-color);
    }

    .confirmation-config {
      margin-top: 8px;
      margin-left: 16px;
      padding-left: 8px;
      border-left: 2px solid var(--divider-color);
    }

    .version-display {
      margin-top: 24px;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .version-text {
      color: var(--secondary-text-color);
      font-size: 14px;
      font-weight: 500;
    }

    .version-badges {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .version-badge {
      background-color: var(--primary-color);
      color: var(--text-primary-color);
      border-radius: 16px;
      padding: 4px 12px;
      font-size: 14px;
      font-weight: 500;
    }

    .github-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: #24292e;
      color: white;
      border-radius: 16px;
      padding: 4px 12px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .github-badge:hover {
      background-color: #444d56;
    }

    .github-badge ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ha-expansion-panel {
      margin: 16px 0;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 8px);
      background-color: var(--card-background-color, var(--primary-background-color));
    }

    ha-expansion-panel [slot='header'] {
      display: flex;
      align-items: center;
      padding: 16px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    ha-expansion-panel [slot='header'] ha-icon {
      margin-right: 8px;
    }
  `}()}}customElements.get("actions-card")||customElements.define("actions-card",ActionsCard),customElements.get("actions-card-editor")||customElements.define("actions-card-editor",ActionsCardEditor),ActionsCard.getConfigElement=()=>document.createElement("actions-card-editor"),window.customCards=window.customCards||[],window.customCards.some(t=>"actions-card"===t.type)||window.customCards.push({type:"actions-card",name:"Actions Card",preview:!0,description:"Wraps another card to add tap, hold, and double-tap actions.",documentationURL:"https://github.com/nutteloost/actions-card"}),console.info(`%c ACTIONS-CARD %c v${St} %c`,"color: white; background: #9c27b0; font-weight: 700;","color: #9c27b0; background: white; font-weight: 700;","color: grey; background: white; font-weight: 400;");export{St as CARD_VERSION};
