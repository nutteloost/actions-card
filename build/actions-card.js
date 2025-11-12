const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new WeakMap;let o=class t{constructor(t,i,s){if(this.i=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...i)=>{const s=1===t.length?t[0]:i.reduce((i,e,s)=>i+(t=>{if(!0===t.i)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1],t[0]);return new o(s,t,e)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,e))(i)})(t):t,{is:r,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:l,getPrototypeOf:p}=Object,u=globalThis,v=u.trustedTypes,f=v?v.emptyScript:"",g=u.reactiveElementPolyfillSupport,m=(t,i)=>t,w={toAttribute(t,i){switch(i){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},b=(t,i)=>!r(t,i),y={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class e extends HTMLElement{static addInitializer(t){this.v(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.m&&[...this.m.keys()]}static createProperty(t,i=y){if(i.state&&(i.attribute=!1),this.v(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const e=Symbol(),s=this.getPropertyDescriptor(t,e,i);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get:s,set(i){const n=s?.call(this);o?.call(this,i),this.requestUpdate(t,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static v(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this.v(),this.hasOwnProperty(m("properties"))){const t=this.properties,i=[...d(t),...l(t)];for(const e of i)this.createProperty(e,t[e])}const t=this[Symbol.metadata];if(null!==t){const i=litPropertyMetadata.get(t);if(void 0!==i)for(const[t,e]of i)this.elementProperties.set(t,e)}this.m=new Map;for(const[t,i]of this.elementProperties){const e=this._(t,i);void 0!==e&&this.m.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(a(t))}else void 0!==t&&i.push(a(t));return i}static _(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this.S=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.A=null,this.P()}P(){this.N=new Promise(t=>this.enableUpdating=t),this.M=new Map,this.D(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.L??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this.L?.delete(t)}D(){const t=new Map,i=this.constructor.elementProperties;for(const e of i.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this.S=t)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.L?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.L?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,e){this.H(t,e)}I(t,i){const e=this.constructor.elementProperties.get(t),s=this.constructor._(t,e);if(void 0!==s&&!0===e.reflect){const o=(void 0!==e.converter?.toAttribute?e.converter:w).toAttribute(i,e.type);this.A=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this.A=null}}H(t,i){const e=this.constructor,s=e.m.get(t);if(void 0!==s&&this.A!==s){const t=e.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this.A=s;const n=o.fromAttribute(i,t.type);this[s]=n??this.U?.get(s)??n,this.A=null}}requestUpdate(t,i,e){if(void 0!==t){const s=this.constructor,o=this[t];if(e??=s.getPropertyOptions(t),!((e.hasChanged??b)(o,i)||e.useDefault&&e.reflect&&o===this.U?.get(t)&&!this.hasAttribute(s._(t,e))))return;this.C(t,i,e)}!1===this.isUpdatePending&&(this.N=this.R())}C(t,i,{useDefault:e,reflect:s,wrapped:o},n){e&&!(this.U??=new Map).has(t)&&(this.U.set(t,n??i??this[t]),!0!==o||void 0!==n)||(this.M.has(t)||(this.hasUpdated||e||(i=void 0),this.M.set(t,i)),!0===s&&this.A!==t&&(this.J??=new Set).add(t))}async R(){this.isUpdatePending=!0;try{await this.N}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.S){for(const[t,i]of this.S)this[t]=i;this.S=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[i,e]of t){const{wrapped:t}=e,s=this[i];!0!==t||this.M.has(i)||void 0===s||this.C(i,void 0,e,s)}}let t=!1;const i=this.M;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this.L?.forEach(t=>t.hostUpdate?.()),this.update(i)):this.W()}catch(i){throw t=!1,this.W(),i}t&&this.B(i)}willUpdate(t){}B(t){this.L?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}W(){this.M=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.N}shouldUpdate(t){return!0}update(t){this.J&&=this.J.forEach(t=>this.I(t,this[t])),this.W()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,g?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.1");const _=globalThis,$=_.trustedTypes,k=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,T=`<${E}>`,A=document,O=()=>A.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,M="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,L=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,U=/^(?:script|style|textarea|title)$/i,R=(t=>(i,...e)=>({F:t,strings:i,values:e}))(1),J=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),B=new WeakMap,F=A.createTreeWalker(A,129);function V(t,i){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(i):i}const q=(t,i)=>{const e=t.length-1,s=[];let o,n=2===i?"<svg>":3===i?"<math>":"",a=D;for(let i=0;i<e;i++){const e=t[i];let r,h,c=-1,d=0;for(;d<e.length&&(a.lastIndex=d,h=a.exec(e),null!==h);)d=a.lastIndex,a===D?"!--"===h[1]?a=z:void 0!==h[1]?a=L:void 0!==h[2]?(U.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=j):void 0!==h[3]&&(a=j):a===j?">"===h[0]?(a=o??D,c=-1):void 0===h[1]?c=-2:(c=a.lastIndex-h[2].length,r=h[1],a=void 0===h[3]?j:'"'===h[3]?I:H):a===I||a===H?a=j:a===z||a===L?a=D:(a=j,o=void 0);const l=a===j&&t[i+1].startsWith("/>")?" ":"";n+=a===D?e+T:c>=0?(s.push(r),e.slice(0,c)+C+e.slice(c)+S+l):e+S+(-2===c?i:l)}return[V(t,n+(t[e]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),s]};class G{constructor({strings:t,F:i},e){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[h,c]=q(t,i);if(this.el=G.createElement(h,e),F.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const i=c[n++],e=s.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:a[2],strings:e,ctor:"."===a[1]?Q:"?"===a[1]?tt:"@"===a[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(S)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(U.test(s.tagName)){const t=s.textContent.split(S),i=t.length-1;if(i>0){s.textContent=$?$.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],O()),F.nextNode(),r.push({type:2,index:++o});s.append(t[i],O())}}}else if(8===s.nodeType)if(s.data===E)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)r.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,i){const e=A.createElement("template");return e.innerHTML=t,e}}function Z(t,i,e=t,s){if(i===J)return i;let o=void 0!==s?e.V?.[s]:e.q;const n=P(i)?void 0:i.G;return o?.constructor!==n&&(o?.Z?.(!1),void 0===n?o=void 0:(o=new n(t),o.K(t,e,s)),void 0!==s?(e.V??=[])[s]=o:e.q=o),void 0!==o&&(i=Z(t,o.X(t,i.values),o,s)),i}class K{constructor(t,i){this.Y=[],this.tt=void 0,this.it=t,this.et=i}get parentNode(){return this.et.parentNode}get st(){return this.et.st}u(t){const{el:{content:i},parts:e}=this.it,s=(t?.creationScope??A).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new X(o,o.nextSibling,this,t):1===r.type?i=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(i=new et(o,this,t)),this.Y.push(i),r=e[++a]}n!==r?.index&&(o=F.nextNode(),n++)}return F.currentNode=A,s}p(t){let i=0;for(const e of this.Y)void 0!==e&&(void 0!==e.strings?(e.ot(t,e,i),i+=e.strings.length-2):e.ot(t[i])),i++}}class X{get st(){return this.et?.st??this.nt}constructor(t,i,e,s){this.type=2,this.rt=W,this.tt=void 0,this.ht=t,this.ct=i,this.et=e,this.options=s,this.nt=s?.isConnected??!0}get parentNode(){let t=this.ht.parentNode;const i=this.et;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this.ht}get endNode(){return this.ct}ot(t,i=this){t=Z(this,t,i),P(t)?t===W||null==t||""===t?(this.rt!==W&&this.dt(),this.rt=W):t!==this.rt&&t!==J&&this.lt(t):void 0!==t.F?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this.lt(t)}O(t){return this.ht.parentNode.insertBefore(t,this.ct)}T(t){this.rt!==t&&(this.dt(),this.rt=this.O(t))}lt(t){this.rt!==W&&P(this.rt)?this.ht.nextSibling.data=t:this.T(A.createTextNode(t)),this.rt=t}$(t){const{values:i,F:e}=t,s="number"==typeof e?this.ut(t):(void 0===e.el&&(e.el=G.createElement(V(e.h,e.h[0]),this.options)),e);if(this.rt?.it===s)this.rt.p(i);else{const t=new K(s,this),e=t.u(this.options);t.p(i),this.T(e),this.rt=t}}ut(t){let i=B.get(t.strings);return void 0===i&&B.set(t.strings,i=new G(t)),i}k(t){N(this.rt)||(this.rt=[],this.dt());const i=this.rt;let e,s=0;for(const o of t)s===i.length?i.push(e=new X(this.O(O()),this.O(O()),this,this.options)):e=i[s],e.ot(o),s++;s<i.length&&(this.dt(e&&e.ct.nextSibling,s),i.length=s)}dt(t=this.ht.nextSibling,i){for(this.vt?.(!1,!0,i);t!==this.ct;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this.et&&(this.nt=t,this.vt?.(t))}}class Y{get tagName(){return this.element.tagName}get st(){return this.et.st}constructor(t,i,e,s,o){this.type=1,this.rt=W,this.tt=void 0,this.element=t,this.name=i,this.et=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this.rt=Array(e.length-1).fill(new String),this.strings=e):this.rt=W}ot(t,i=this,e,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,i,0),n=!P(t)||t!==this.rt&&t!==J,n&&(this.rt=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Z(this,s[e+a],i,a),r===J&&(r=this.rt[a]),n||=!P(r)||r!==this.rt[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this.rt[a]=r}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class tt extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}ot(t,i=this){if((t=Z(this,t,i,0)??W)===J)return;const e=this.rt,s=t===W&&e!==W||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==W&&(e===W||s);s&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this.rt=t}handleEvent(t){"function"==typeof this.rt?this.rt.call(this.options?.host??this.element,t):this.rt.handleEvent(t)}}class et{constructor(t,i,e){this.element=t,this.type=6,this.tt=void 0,this.et=i,this.options=e}get st(){return this.et.st}ot(t){Z(this,t)}}const st=_.litHtmlPolyfillSupport;st?.(G,X),(_.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this.ft=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ft=((t,i,e)=>{const s=e?.renderBefore??i;let o=s.gt;if(void 0===o){const t=e?.renderBefore??null;s.gt=o=new X(i.insertBefore(O(),t),t,void 0,e??{})}return o.ot(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ft?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ft?.setConnected(!1)}render(){return J}}nt.wt=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");const rt=(t,...i)=>{};function ht(t,i,e){return t.entity||t.entity_id||i.entity||(e&&e.config?e.config.entity:null)}const ct="navigate",dt="url",lt="toggle",pt="call-service",ut="more-info",vt="assist",ft="fire-dom-event",gt=[{value:"none",label:"None"},{value:lt,label:"Toggle"},{value:ct,label:"Navigate"},{value:dt,label:"URL"},{value:pt,label:"Call Service"},{value:ut,label:"More Info"},{value:vt,label:"Assist"},{value:ft,label:"Fire DOM Event"}],mt=50,wt=100,bt=10,yt=50,xt=100,_t=(t,i,e={},s={})=>{const o=new CustomEvent(i,{detail:e,bubbles:!1!==s.bubbles,cancelable:Boolean(s.cancelable),composed:!1!==s.composed});return t.dispatchEvent(o),o},$t=(t,i)=>{if(i.has("config")||i.has("_config"))return!0;const e=i.get("hass");return!e||e!==t.hass},kt=t=>t&&t.action&&"none"!==t.action,Ct=(t,i,e,s)=>{const o=e[`${s}_action`];t.bt&&kt(o)&&t.bt.handleAction(s)},St=t=>{if(t&&"function"==typeof t.getCardSize)try{return t.getCardSize()}catch(t){console.warn("Error getting card size:",t)}return 1},Et=async()=>window.loadCardHelpers?.()||null;function Tt(){return{LitElement:nt,html:R,css:n,fireEvent:_t,hasConfigOrEntityChanged:$t,hasAction:kt,handleAction:Ct,computeCardSize:St,loadCardHelpers:Et}}class At{constructor(t,i,e,s){this.element=t,this.config=e,this.childCard=s,this.yt=0}handleAction(t="tap"){const i=this.config[`${t}_action`];i&&"none"!==i.action&&(i.confirmation?this.xt(i):this._t(i))}xt(t){let i,e="Are you sure?",s="Confirm",o="Cancel";"object"==typeof t.confirmation?(e=t.confirmation.text||e,i=t.confirmation.title,s=t.confirmation.confirm_text||s,o=t.confirmation.dismiss_text||o):"string"==typeof t.confirmation&&(e=t.confirmation);const n=document.createElement("ha-dialog");n.heading=i||"",n.open=!0;const a=document.createElement("div");a.innerText=e,n.appendChild(a);const r=document.createElement("mwc-button");r.slot="primaryAction",r.label=s,r.style.color="var(--primary-color)",r.setAttribute("aria-label",s),r.addEventListener("click",()=>{n.parentNode.removeChild(n),this._t(t)});const h=document.createElement("mwc-button");h.slot="secondaryAction",h.label=o,h.setAttribute("aria-label",o),h.addEventListener("click",()=>{n.parentNode.removeChild(n)}),n.appendChild(r),n.appendChild(h),document.body.appendChild(n)}_t(t){this.yt=Date.now();const i=this.element.hass;if(i&&t.action)try{switch(t.action,this.element.$t&&this.element.$t(300),t.action){case ct:!function(t){const{fireEvent:i}=Tt(),e=t.navigation_path||"",s=!0===t.navigation_replace;e&&(s?window.history.replaceState(null,"",e):window.history.pushState(null,"",e),i(window,"location-changed",{replace:s}))}(t,0,this.config,this.childCard);break;case dt:!function(t){const i=t.url_path||"";i&&(t.target,window.open(i,t.target||"_blank"))}(t,0,this.config,this.childCard);break;case lt:!function(t,i,e,s){const o=ht(t,e,s);o&&i.callService("homeassistant","toggle",{entity_id:o})}(t,i,this.config,this.childCard);break;case pt:!function(t,i){if(!t.service)return;const[e,s]=t.service.split(".",2);if(!e||!s)return void t.service;const o={...t.service_data||t.data||{}},n=t.target||(o.entity_id?{entity_id:o.entity_id}:{});n.entity_id&&o.entity_id&&delete o.entity_id,i.callService(e,s,o,n)}(t,i,this.config,this.childCard);break;case ut:!function(t,i,e,s,o){const{fireEvent:n}=Tt(),a=ht(t,e,s);a&&n(o,"hass-more-info",{entityId:a})}(t,0,this.config,this.childCard,this.element);break;case vt:!function(t,i,e,s,o){const{fireEvent:n}=Tt();t.pipeline_id,t.start_listening,n(o,"assist",{pipeline_id:t.pipeline_id||"last_used",start_listening:!0===t.start_listening})}(t,0,this.config,this.childCard,this.element);break;case ft:!function(t,i,e,s,o){const{fireEvent:n}=Tt();if("browser_mod"===t.event_type&&t.event_data)return t.event_data,void n(o,"ll-custom",{browser_mod:t.event_data});t.event_type&&(t.event_type,t.event_data,n(o,t.event_type,t.event_data||null))}(t,0,this.config,this.childCard,this.element);break;default:t.action}}catch(i){console.error("ActionsCard: Error executing action:",t.action,i)}}getLastActionTime(){return this.yt}}class ActionsCard extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},kt:{type:Object,state:!0}}}static getStubConfig(){return{card:null,tap_action:{action:"none"},hold_action:{action:"none"},double_tap_action:{action:"none"},prevent_default_dialog:!1}}constructor(){super(),this.Ct=null,this.St=null,this.Et=!1,this.Tt=0,this.yt=0,this.kt=null,this.config={},this.At=null,this.Ot=null,this.bt=null,this.Pt=null,this.Nt=null,this.Mt=0,this.Dt=!1,this.zt=!1,this.Lt=!1,this.jt=!1,this.Ht=null,this.It=this.Ut.bind(this),this.Rt=this.Jt.bind(this),this.Wt=this.Bt.bind(this),this.Ft=null,this.Vt=!1,this.qt=0,this.Gt=0,this.Zt=50,this.Kt=!1}shouldUpdate(t){return $t(this,t)}willUpdate(t){if(super.willUpdate(t),(t.has("config")||t.has("_childCard"))&&this.bt&&(this.bt.config=this.config,this.bt.childCard=this.kt),t.has("hass")&&this.kt&&this.kt.hass!==this.hass)try{this.kt.hass=this.hass}catch(t){this.config?.card&&this.Xt(this.config.card)}}async Yt(){if(!this.Ot)try{this.Ot=await async function(){if(!window.loadCardHelpers)return null;try{return await window.loadCardHelpers()}catch(t){return null}}()}catch(t){}}setConfig(t){JSON.stringify(t),this.config=t,t.card_mod?(t.card_mod,this.Nt=JSON.parse(JSON.stringify(t.card_mod))):this.Nt=null,this.bt=new At(this,null,this.config,this.kt),t&&t.card?this.kt&&JSON.stringify(this.Pt)===JSON.stringify(t.card)||(this.Pt=JSON.parse(JSON.stringify(t.card)),this.Xt(t.card).catch(t=>{})):(this.kt=null,this.Pt=null,this.requestUpdate())}async Xt(t){if(!t)return this.kt=null,void this.requestUpdate();try{const i=Array.isArray(t)?t[0]:t,e=i.type;if(!e)throw new Error("Card configuration requires a `type`.");if(e.startsWith("custom:"))return void await this.Qt(i);const s=await this.ti(i);s?await this.ii(s,e):await this.Qt(i)}catch(i){this.ei(i.message,t)}this.requestUpdate()}async ti(t){try{if(this.Ot||await this.Yt(),this.Ot)return t.type,await this.Ot.createCardElement(t)}catch(i){t.type}return null}async ii(t,i){this.hass&&(t.hass=this.hass),this.kt=t,this.bt&&(this.bt.childCard=this.kt),await this.si(),setTimeout(()=>{this.oi()},100)}async si(){await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.ni()},mt)}async Qt(t,i=0){const e=t.type;if(i>bt)return void this.ei(`Failed to create card: ${e}`,t);const s=e.startsWith("custom:")?e.substring(7):`hui-${e}-card`,o=document.createElement(s);if("function"!=typeof o.setConfig)return i<5?void setTimeout(()=>this.Qt(t,i+1),wt):void this.ei(`Card type ${e} is not available`,t);try{o.setConfig(t),this.hass&&(o.hass=this.hass),this.kt=o,this.bt&&(this.bt.childCard=this.kt),await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.ni(),this.oi()},50)}catch(i){this.ei(`Error setting up card: ${i.message}`,t)}}ei(t,i){try{const e=document.createElement("hui-error-card");e.setConfig({type:"error",error:t,origConfig:i}),this.hass&&(e.hass=this.hass),this.kt=e}catch(i){const e=document.createElement("div");e.innerHTML=`<ha-alert alert-type="error">Error: ${t}</ha-alert>`,this.kt=e}this.bt&&(this.bt.childCard=this.kt),this.requestUpdate()}ai(t){this.config.prevent_default_dialog&&(t.preventDefault(),t.stopPropagation())}Bt(t){if(this.jt||this.Dt)return t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),!1}ri(t=300){this.jt=!0,this.Ht&&clearTimeout(this.Ht),this.Ht=setTimeout(()=>{this.jt=!1,this.Ht=null},t)}ni(){if(!this.kt||!this.config.prevent_default_dialog)return;this.hi(),this.At=t=>{t.type,"hass-more-info"!==t.type&&"click"!==t.type&&"tap"!==t.type||(t.type,t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation())};const t=()=>{if(this.kt){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.kt.addEventListener(t,this.At,{capture:!0,passive:!1}),this.kt.shadowRoot&&this.kt.shadowRoot.addEventListener(t,this.At,{capture:!0,passive:!1})});this.kt.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.addEventListener(t,this.At,{capture:!0,passive:!1})})})}},i=(e=0)=>{if(!(e>5))try{t()}catch(t){setTimeout(()=>i(e+1),100)}};i(),setTimeout(()=>i(),500)}hi(){if(this.kt&&this.At){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.kt.removeEventListener(t,this.At,!0),this.kt.shadowRoot&&this.kt.shadowRoot.removeEventListener(t,this.At,!0)});try{this.kt.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.removeEventListener(t,this.At,!0)})})}catch(t){}this.At=null}}set hass(t){const i=this.ci;if(this.ci=t,this.kt&&this.kt.hass!==t)try{this.kt.hass=t}catch(t){this.config&&this.config.card&&this.Xt(this.config.card)}i!==t&&this.requestUpdate()}get hass(){return this.ci}getCardSize(){return this.kt?St(this.kt):3}updated(t){if(super.updated(t),t.has("config")&&this.Nt&&this.di(),t.has("_childCard")){const t=this.shadowRoot?.querySelector(".card-wrapper");if(t){const i=t.querySelector(":scope > *");i&&i!==this.kt&&t.removeChild(i),this.kt&&!t.contains(this.kt)&&t.appendChild(this.kt)}}t.has("_childCard")&&this.kt&&this.config&&this.config.prevent_default_dialog&&setTimeout(()=>{this.ni()},100),(t.has("config")||t.has("_childCard"))&&this.bt&&(this.bt.config=this.config,this.bt.childCard=this.kt)}connectedCallback(){super.connectedCallback(),this.Ot||this.Yt(),this.Nt&&this.di()}disconnectedCallback(){super.disconnectedCallback(),this.hi(),this.li(),window.removeEventListener("pointermove",this.It),window.removeEventListener("pointerup",this.Rt),this.Ht&&(clearTimeout(this.Ht),this.Ht=null)}pi(t="tap"){this.bt&&this.bt.handleAction(t)}ui(t){t&&t.stopPropagation(),this.zt&&(window.removeEventListener("pointermove",this.It),window.removeEventListener("pointerup",this.Rt),this.zt=!1),clearTimeout(this.Ct),clearTimeout(this.St),this.Ct=null,this.St=null,this.Et=!1,this.Tt=0,this.Dt=!1,this.Mt=0,this.fi=null,this.Lt=!1,this.li(),this.Vt=!1,this.qt=0,this.Gt=0,this.Kt=!1}gi(t,i,e){this.li();const s="ontouchstart"in window||navigator.maxTouchPoints>0?xt:yt,o=getComputedStyle(this),n=o.getPropertyValue("--actions-card-hold-progress-color").trim()||o.getPropertyValue("--primary-color").trim()||"#03a9f4",a=o.getPropertyValue("--actions-card-hold-progress-inactive-color").trim()||n,r=o.getPropertyValue("--actions-card-hold-progress-inactive-opacity").trim()||"0.2",h=o.getPropertyValue("--actions-card-hold-progress-opacity").trim()||"1",c=parseInt(o.getPropertyValue("--actions-card-hold-progress-width").trim())||4,d=s/2-c/2,l=2*Math.PI*d;this.Ft=document.createElement("div"),this.Ft.style.cssText=`\n      position: fixed;\n      left: ${t}px;\n      top: ${i}px;\n      width: ${s}px;\n      height: ${s}px;\n      transform: translate(-50%, -50%);\n      pointer-events: none;\n      z-index: 99999;\n    `,this.Ft.innerHTML=`\n      <svg width="${s}" height="${s}" style="display: block;">\n        \x3c!-- Inactive circle --\x3e\n        <circle\n          cx="${s/2}"\n          cy="${s/2}"\n          r="${d}"\n          fill="none"\n          stroke="${a}"\n          stroke-width="${c}"\n          opacity="${r}"\n        />\n        \x3c!-- Progress circle --\x3e\n        <circle\n          cx="${s/2}"\n          cy="${s/2}"\n          r="${d}"\n          fill="none"\n          stroke="${n}"\n          stroke-width="${c}"\n          stroke-linecap="round"\n          opacity="${h}"\n          transform="rotate(-90 ${s/2} ${s/2})"\n          style="\n            stroke-dasharray: ${l};\n            stroke-dashoffset: ${l};\n            transition: stroke-dashoffset ${e}ms linear;\n          "\n        />\n      </svg>\n    `,document.body.appendChild(this.Ft);const p=this.Ft.querySelector("circle:last-child");requestAnimationFrame(()=>{p.style.strokeDashoffset="0"})}di(){if(!this.Nt||!this.Nt.style)return;const t=this.shadowRoot;if(!t)return;let i=t.querySelector("#actions-card-mod-styles");i||(i=document.createElement("style"),i.id="actions-card-mod-styles",t.appendChild(i)),i.textContent=this.Nt.style}li(){this.Ft&&(this.Ft.remove(),this.Ft=null)}mi(t,i){const e=t-this.qt,s=i-this.Gt;return Math.sqrt(e*e+s*s)>this.Zt}wi(t){const i=["INPUT","BUTTON","SELECT","TEXTAREA","A","HA-SLIDER","HA-SWITCH","PAPER-SLIDER","PAPER-BUTTON","MWC-BUTTON"];let e=t.target;for(;e&&e!==this;){if(i.includes(e.tagName)||e.hasAttribute("actions-card-interactive"))return void rt(0,e.tagName);e=e.parentElement||e.getRootNode().host}if((0===t.button||"mouse"!==t.pointerType)&&(t.stopPropagation(),this.bi=t.clientX,this.yi=t.clientY,this.Mt=Date.now(),this.Dt=!1,this.fi=t.pointerType,this.qt=t.clientX,this.Gt=t.clientY,this.Vt=!1,this.Kt=!1,clearTimeout(this.Ct),this.Et=!1,"mouse"===t.pointerType?(this.zt=!0,window.addEventListener("pointermove",this.It),window.addEventListener("pointerup",this.Rt)):this.zt=!1,this.config.hold_action&&"none"!==this.config.hold_action.action)){const i=this.config.hold_action.hold_time||500,e=this.config.hold_action.show_progress||!1;e&&this.gi(t.clientX,t.clientY,i),this.Ct=window.setTimeout(()=>{Math.abs(t.clientX-this.bi)<10&&Math.abs(t.clientY-this.yi)<10?e?this.Vt=!0:(this.Et=!0,this.pi("hold"),this.Tt=0):(this.li(),this.ui())},i)}}Jt(t){if(this.Lt)return;if(this.zt&&t.currentTarget!==window)return;if(0!==t.button&&"mouse"===t.pointerType)return;this.Lt=!0,"mouse"===this.fi&&this.zt&&(window.removeEventListener("pointermove",this.It),window.removeEventListener("pointerup",this.Rt),this.zt=!1),t.stopPropagation(),this.config.prevent_default_dialog&&t.preventDefault();const i=t.clientX-this.bi,e=t.clientY-this.yi,s=Math.sqrt(i*i+e*e);if(this.li(),clearTimeout(this.Ct),this.config.hold_action?.show_progress&&(this.Vt||this.Kt))return this.Vt&&!this.mi(t.clientX,t.clientY)?this.pi("hold"):(this.Kt||this.mi(t.clientX,t.clientY))&&this.$t(300),this.ui(),void setTimeout(()=>{this.Lt=!1},10);if(this.Et)return void this.ui();const o=this.xi(this.bi,this.yi,t.clientX,t.clientY,this.Mt,t.target);if(o){const i=`swipe_${o}_action`;if(this.config[i]&&"none"!==this.config[i].action)return this.Dt=!0,t.stopImmediatePropagation(),this.ri(300),this.$t(300),this.pi(`swipe_${o}`),void this.ui()}const n=s>10;!n||o?n?this.ui():(this.Tt++,this.Tt,this.config.prevent_default_dialog&&this.$t(300),this.config.double_tap_action&&"none"!==this.config.double_tap_action.action?1===this.Tt?this.St=window.setTimeout(()=>{1!==this.Tt||this.Et||"none"!==this.config.tap_action?.action&&this.pi("tap"),this.ui()},250):2===this.Tt&&(clearTimeout(this.St),this.St=null,this.pi("double_tap"),this.ui()):("none"!==this.config.tap_action?.action&&this.pi("tap"),this.ui()),setTimeout(()=>{this.Lt=!1},10)):this.ui()}Ut(t){const i=t.clientX-this.bi,e=t.clientY-this.yi;Math.sqrt(i*i+e*e)>10&&this.Ct&&(clearTimeout(this.Ct),this.Ct=null,this.li(),this.$t(300)),this.Ft&&this.mi(t.clientX,t.clientY)&&(clearTimeout(this.Ct),this.Ct=null,this.Vt=!1,this.Kt=!0,this.li(),this.$t(300))}$t(t){if(!this.kt)return;const i=t=>{t.type,t.stopPropagation(),t.preventDefault()},e=["click","tap","hass-more-info"];e.forEach(t=>{this.kt.addEventListener(t,i,{capture:!0}),this.kt.shadowRoot&&this.kt.shadowRoot.addEventListener(t,i,{capture:!0})}),setTimeout(()=>{e.forEach(t=>{this.kt.removeEventListener(t,i,{capture:!0}),this.kt.shadowRoot&&this.kt.shadowRoot.removeEventListener(t,i,{capture:!0})})},t)}_i(t){t.stopPropagation(),_t(this,"show-edit-card",{element:this})}oi(){window.cardmod&&window.cardmod.process_card?.(this.kt),this.dispatchEvent(new CustomEvent("card-mod-refresh",{bubbles:!0,composed:!0}))}xi(t,i,e,s,o,n){const a=e-t,r=s-i,h=Math.abs(a),c=Math.abs(r),d=Math.sqrt(a*a+r*r),l=Date.now()-o;if(d<20)return null;if(l>1e3)return null;const p=this.$i(n);return h>c?p.horizontal?null:a>0?"right":"left":p.vertical?null:r>0?"down":"up"}$i(t){let i=t;const e={horizontal:!1,vertical:!1};for(;i&&i!==this;){const t=window.getComputedStyle(i),s=t.overflowX,o=t.overflowY;("scroll"===s||"auto"===s)&&i.scrollWidth>i.clientWidth&&(e.horizontal=!0),("scroll"===o||"auto"===o)&&i.scrollHeight>i.clientHeight&&(e.vertical=!0),i=i.parentElement||i.getRootNode()?.host}return e}render(){if(!this.hass)return R``;if(!this.config||!this.config.card)return R`
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
              <ha-button raised @click=${this._i} aria-label="Edit Card">
                Edit Card
              </ha-button>
            </div>
          </div>
        </div>
      `;this.style.height="100%";const t="none"!==this.config.tap_action?.action||"none"!==this.config.hold_action?.action||"none"!==this.config.double_tap_action?.action||"none"!==this.config.swipe_left_action?.action||"none"!==this.config.swipe_right_action?.action||"none"!==this.config.swipe_up_action?.action||"none"!==this.config.swipe_down_action?.action,i=`cursor: ${t?"pointer":"default"}; display: block; height: 100%;`;return R`
      <div
        class="card-wrapper"
        @pointerdown="${this.wi}"
        @pointerup="${this.Jt}"
        @pointercancel="${this.ui}"
        @click="${this.Wt}"
        @contextmenu="${t=>{this.config.hold_action&&t.preventDefault()}}"
        style="${i}"
        aria-label="${t?"Interactive card with actions":""}"
        role="${t?"button":""}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      ></div>
    `}static get styles(){return function(){const{css:t}=Tt();return t`
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
  `}()}}const Ot="1.5.3";class ActionsCardEditor extends nt{static get properties(){return{hass:{type:Object},ki:{type:Object,state:!0},lovelace:{type:Object},Ci:{type:Boolean,state:!0},Si:{type:Boolean,state:!0}}}constructor(){super(),this.Ei=`actions-card-editor-${Math.random().toString(36).substring(2,15)}`,this.Ti=this.Ai.bind(this),this.Oi=!1,this.Pi=new Set,this.Ni=!1,this.Mi=null,this.Di=0,this.Ci=!1,this.Si=!1}shouldUpdate(t){return $t(this,t)}async connectedCallback(){super.connectedCallback(),await this.zi(),setTimeout(()=>this.Li(),1e3);let t=this.parentNode;for(;t;){if("hui-dialog-edit-card"===t.localName){this.Oi=!0,t.ji=!0,rt(0);break}t=t.parentNode||t.getRootNode&&t.getRootNode().host}this.Hi()}async zi(){let t=0;for(;!customElements.get("hui-card-picker")&&t<10;)await this.Ii(),customElements.get("hui-card-picker")||(await new Promise(t=>setTimeout(t,200)),t++);customElements.get("hui-card-picker")||await this.Ui(),customElements.get("hui-card-picker")}async Ii(){if(!customElements.get("hui-card-picker"))try{const t=[()=>this.Ri(),()=>this.Ji()];for(const i of t)try{if(await i(),customElements.get("hui-card-picker"))return void rt(0)}catch(t){}}catch(t){}}async Ri(){const t=["hui-entities-card","hui-conditional-card","hui-vertical-stack-card","hui-horizontal-stack-card","hui-grid-card","hui-map-card"];for(const i of t)try{const t=customElements.get(i);if(t&&t.getConfigElement&&(await t.getConfigElement(),customElements.get("hui-card-picker")))return}catch(t){}}async Ui(){try{if(window.loadCardHelpers){if(await window.loadCardHelpers()&&customElements.get("hui-card-picker"))return}const t=document.createElement("div");t.innerHTML="<hui-card-picker></hui-card-picker>",document.body.appendChild(t),await new Promise(t=>setTimeout(t,100)),document.body.removeChild(t)}catch(t){}}async Ji(){try{if(!customElements.get("hui-card-picker")){const t=new CustomEvent("hass-refresh",{bubbles:!0,composed:!0});this.dispatchEvent(t),await new Promise(t=>setTimeout(t,500))}}catch(t){}}Li(){this.Ni?this.Wi():(this.Mi&&clearTimeout(this.Mi),this.Mi=setTimeout(()=>{this.Wi()},500))}async Wi(){if(!this.shadowRoot||this.ki?.card)return;const t=this.shadowRoot.querySelector("#card-picker-container");if(!t)return void this.requestUpdate();let i=t.querySelector("hui-card-picker");i||(i=document.createElement("hui-card-picker"),i.hass=this.hass,i.lovelace=this.lovelace,t.appendChild(i))}Hi(){this.Bi=t=>{if(t.target&&this.shadowRoot&&this.shadowRoot.contains(t.target)&&(t.type,t.Fi=!0,"keydown"!==t.type&&"input"!==t.type&&"change"!==t.type&&"config-changed"!==t.type||(t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())),"keydown"===t.type||"input"===t.type){"INPUT"===t.target.tagName&&("search"===t.target.type||t.target.placeholder?.includes("Search"))&&(t.type,t.Vi=!0,t.Fi=!0,t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())}};["keydown","input","change","click","config-changed"].forEach(t=>{document.addEventListener(t,this.Bi,{capture:!0})})}disconnectedCallback(){if(super.disconnectedCallback(),this.Mi&&(clearTimeout(this.Mi),this.Mi=null),this.Di=0,this.Bi){["keydown","input","change","click","config-changed"].forEach(t=>{document.removeEventListener(t,this.Bi,{capture:!0})})}this.Pi&&(this.Pi.forEach(t=>{if(t.parentNode)try{t.parentNode.removeChild(t)}catch(t){console.warn("Error removing dialog:",t)}}),this.Pi.clear())}setConfig(t){if(!t)throw new Error("Invalid configuration");JSON.stringify(t),this.ki=JSON.parse(JSON.stringify(t)),this.ki.card||setTimeout(()=>this.Wi(),50)}qi(t){const i={...t};return["tap_action","hold_action","double_tap_action","swipe_left_action","swipe_right_action","swipe_up_action","swipe_down_action"].forEach(t=>{i[t]&&("none"===i[t].action&&1===Object.keys(i[t]).length||0===Object.keys(i[t]).length)&&delete i[t]}),!1===i.prevent_default_dialog&&delete i.prevent_default_dialog,i}Gi(t,i,e){const s=["action","confirmation"];"hold_action"===e&&s.push("hold_time","show_progress");const o=[...s,...{none:[],navigate:["navigation_path","navigation_replace"],url:["url_path","target"],toggle:["entity"],"more-info":["entity"],"call-service":["service","service_data"],assist:["pipeline_id","start_listening"],"fire-dom-event":["event_type","event_data"]}[i]||[]],n={};return Object.keys(t).forEach(i=>{o.includes(i)&&(n[i]=t[i])}),n}Zi(t){if(t.Fi=!0,t.stopPropagation(),!this.ki||!t.target)return;const i=t.target,e=i.configValue||i.getAttribute("data-option"),s=i.parentElement?.configValue||i.parentElement?.getAttribute("data-option");if(!(e||s))return;const o=i.configAttribute||i.getAttribute("data-attribute");if(e&&e.includes("_action")){const s={...this.ki[e]||{}};if(o)"checkbox"===i.type||"HA-SWITCH"===i.tagName?s[o]=i.checked:s[o]=t.detail?.value??i.value??"",this.ki={...this.ki,[e]:s};else{const t=i.value,o=this.Gi(s,t,e);o.action=t,this.ki={...this.ki,[e]:o}}}else if(e){let t;t="checkbox"===i.type||"HA-SWITCH"===i.tagName?i.checked:i.value,this.ki={...this.ki,[e]:t}}this.Ki()}Ki(){if(!this.ki)return;const t=this.qi(this.ki);if(_t(this,"config-changed",{config:t,editorId:this.Ei,fromActionCardEditor:!0,preventDialogClose:!0,inEditorDialog:this.Oi}),this.Oi){let i=this.parentNode,e=null;for(;i;){if("hui-dialog-edit-card"===i.localName){e=i;break}i=i.parentNode||i.getRootNode&&i.getRootNode().host}if(e&&"function"==typeof e.Xi)try{e.Xi(t)}catch(t){console.error("Error updating dialog config:",t)}}}Yi(){this.ki&&(_t(this,"config-changed",{config:this.ki,editorId:this.Ei,fromActionCardEditor:!0,inEditorDialog:this.Oi,preventDialogClose:!0}),this.ki)}Ai(t){if(void 0===t.Fi&&(t.Fi=!0),!t.detail?.editorId||t.detail.editorId===this.Ei){const i=t.detail.config;this.ki={...this.ki,card:i},this.Ki(),this.requestUpdate()}t.stopPropagation&&t.stopPropagation()}Qi(t,i){i.stopPropagation();if(!i.detail.value)return"actions"===t?this.Ci=!1:"swipe"===t&&(this.Si=!1),void(i.target&&i.target.blur&&i.target.blur());this.Ci=!1,this.Si=!1,"actions"===t?this.Ci=!0:"swipe"===t&&(this.Si=!0),this.requestUpdate(),setTimeout(()=>{this.requestUpdate()},10)}async te(){if(!this.ki?.card)return;const t=this.ki.card,i=this.hass,e=document.querySelector("home-assistant");if(i&&e)try{await customElements.whenDefined("hui-dialog-edit-card");const s=document.createElement("hui-dialog-edit-card");s.hass=i,this.Pi.add(s),document.body.appendChild(s);const o=t=>{if(s.removeEventListener("dialog-closed",o),this.Pi.delete(s),s.parentNode===document.body)try{document.body.removeChild(s)}catch(t){}setTimeout(()=>this.Wi(),100)};s.addEventListener("dialog-closed",o);const n={cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:async t=>{t&&(this.ki={...this.ki,card:t},this.Yi(),this.requestUpdate())}};await s.showDialog(n)}catch(i){_t(this,"ll-show-dialog",{dialogTag:"hui-dialog-edit-card",dialogImport:()=>import("hui-dialog-edit-card"),dialogParams:{cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:t=>{t&&(this.ki={...this.ki,card:t},this.Yi(),this.requestUpdate())}}})}}ie(){if(!this.ki)return;const t={...this.ki};delete t.card,this.ki=t,this.Ni=!0,this.Mi&&(clearTimeout(this.Mi),this.Mi=null),this.Di=0,this.Ki(),this.requestUpdate(),this.updateComplete.then(()=>{setTimeout(()=>{this.Wi()},100)})}ee(){const t=!this.ki?.card,i=this.Ni,e=this.ki&&Object.keys(this.ki).length>0&&!this.ki.card,s=t&&(i||e||!this.ki);return s}se(t,i){const e={tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action"}[t]||t.replace(/_/g," ");return R`
      <div class="option-row">
        <div class="option-label">${e}</div>
        <ha-select
          .value=${i.action||"none"}
          data-option="${t}"
          @selected=${this.Zi}
          @closed=${t=>{t.Fi=!0,t.stopPropagation()}}
        >
          ${gt.map(t=>R`
              <mwc-list-item value="${t.value}">${t.label}</mwc-list-item>
            `)}
        </ha-select>
      </div>
    `}oe(t,i){if(!i||"none"===i.action||!i.action)return R``;switch(i.action){case"navigate":return R`
          <div class="config-row">
            <ha-textfield
              label="Navigation Path"
              .value=${i.navigation_path||""}
              data-option="${t}"
              data-attribute="navigation_path"
              @keydown=${t=>{t.Fi=!0}}
              @change=${this.Zi}
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Replace history state</div>
            <ha-switch
              .checked=${i.navigation_replace||!1}
              data-option="${t}"
              data-attribute="navigation_replace"
              @change=${this.Zi}
            ></ha-switch>
          </div>
        `;case"url":return R`
          <div class="config-row">
            <ha-textfield
              label="URL"
              .value=${i.url_path||""}
              data-option="${t}"
              data-attribute="url_path"
              @keydown=${t=>{t.Fi=!0}}
              @change=${this.Zi}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-select
              label="Open in"
              .value=${i.target||"_blank"}
              data-option="${t}"
              data-attribute="target"
              @selected=${this.Zi}
              @closed=${t=>{t.Fi=!0,t.stopPropagation()}}
            >
              <mwc-list-item value="_blank">New tab</mwc-list-item>
              <mwc-list-item value="_self">Same tab</mwc-list-item>
            </ha-select>
          </div>
        `;case"toggle":case"more-info":return R`
          <div class="config-row">
            <ha-entity-picker
              label="Entity"
              .hass=${this.hass}
              .value=${i.entity||""}
              data-option="${t}"
              data-attribute="entity"
              @value-changed=${this.Zi}
              allow-custom-entity
            ></ha-entity-picker>
            <div class="help-text">
              Optional: Leave empty to use the entity from the wrapped card
            </div>
          </div>
        `;case"call-service":return R`
          <div class="config-row">
            <ha-textfield
              label="Service"
              .value=${i.service||""}
              data-option="${t}"
              data-attribute="service"
              @keydown=${t=>{t.Fi=!0}}
              @change=${this.Zi}
              placeholder="domain.service"
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Service Data"
              .value=${i.service_data?JSON.stringify(i.service_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="service_data"
              @value-changed=${i=>{i.Fi=!0;try{const e={...this.ki};e[t]={...e[t],service_data:JSON.parse(i.detail.value)},this.ki=e,this.Ki()}catch(t){console.error("Invalid service data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;case"assist":return R`
          <div class="config-row">
            <ha-textfield
              label="Pipeline ID (optional)"
              .value=${i.pipeline_id||""}
              data-option="${t}"
              data-attribute="pipeline_id"
              @keydown=${t=>{t.Fi=!0}}
              @change=${this.Zi}
              placeholder="last_used"
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Start listening immediately</div>
            <ha-switch
              .checked=${i.start_listening||!1}
              data-option="${t}"
              data-attribute="start_listening"
              @change=${this.Zi}
            ></ha-switch>
          </div>
        `;case"fire-dom-event":return R`
          <div class="config-row">
            <ha-textfield
              label="Event Type"
              .value=${i.event_type||""}
              data-option="${t}"
              data-attribute="event_type"
              @keydown=${t=>{t.Fi=!0}}
              @change=${this.Zi}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Event Data (optional)"
              .value=${i.event_data?JSON.stringify(i.event_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="event_data"
              @value-changed=${i=>{i.Fi=!0;try{const e={...this.ki};e[t]={...e[t],event_data:JSON.parse(i.detail.value)},this.ki=e,this.Ki()}catch(t){console.error("Invalid event data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;default:return R``}}ne(){const t=this.ki.swipe_left_action||{action:"none"},i=this.ki.swipe_right_action||{action:"none"},e=this.ki.swipe_up_action||{action:"none"},s=this.ki.swipe_down_action||{action:"none"};return R`
      <ha-expansion-panel
        .expanded=${this.Si}
        @expanded-changed=${t=>{t.stopPropagation(),this.Qi("swipe",t)}}
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
            ${this.se("swipe_left_action",t)}
            ${this.oe("swipe_left_action",t)}
            ${this.ae("swipe_left_action",t)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-right" style="margin-right: 8px;"></ha-icon>
              Swipe Right
            </div>
            ${this.se("swipe_right_action",i)}
            ${this.oe("swipe_right_action",i)}
            ${this.ae("swipe_right_action",i)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-up" style="margin-right: 8px;"></ha-icon>
              Swipe Up
            </div>
            ${this.se("swipe_up_action",e)}
            ${this.oe("swipe_up_action",e)}
            ${this.ae("swipe_up_action",e)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-down" style="margin-right: 8px;"></ha-icon>
              Swipe Down
            </div>
            ${this.se("swipe_down_action",s)}
            ${this.oe("swipe_down_action",s)}
            ${this.ae("swipe_down_action",s)}
          </div>
        </div>
      </ha-expansion-panel>
    `}ae(t,i){if(!i||"none"===i.action||!i.action)return R``;const e=!!i.confirmation,s="object"==typeof i.confirmation?i.confirmation:e?{text:i.confirmation}:{};return R`
      <div class="option-row confirmation-row">
        <div class="option-label">Require confirmation</div>
        <ha-switch
          .checked=${e}
          @change=${i=>{i.Fi=!0;const e={...this.ki};e[t]={...e[t],confirmation:!!i.target.checked&&{text:"Are you sure?"}},this.ki=e,this.Ki(),this.requestUpdate()}}
        ></ha-switch>
      </div>

      ${e?R`
            <div class="confirmation-config">
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Text"
                  .value=${s.text||"Are you sure?"}
                  @keydown=${t=>{t.Fi=!0}}
                  @change=${i=>{i.Fi=!0;const e={...this.ki},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.text=i.target.value,e[t].confirmation=s,this.ki=e,this.Ki()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Title (optional)"
                  .value=${s.title||""}
                  @keydown=${t=>{t.Fi=!0}}
                  @change=${i=>{i.Fi=!0;const e={...this.ki},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.title=i.target.value,e[t].confirmation=s,this.ki=e,this.Ki()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirm Button Text"
                  .value=${s.confirm_text||"Confirm"}
                  @keydown=${t=>{t.Fi=!0}}
                  @change=${i=>{i.Fi=!0;const e={...this.ki},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.confirm_text=i.target.value,e[t].confirmation=s,this.ki=e,this.Ki()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Cancel Button Text"
                  .value=${s.dismiss_text||"Cancel"}
                  @keydown=${t=>{t.Fi=!0}}
                  @change=${i=>{i.Fi=!0;const e={...this.ki},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.dismiss_text=i.target.value,e[t].confirmation=s,this.ki=e,this.Ki()}}
                ></ha-textfield>
              </div>
            </div>
          `:""}
    `}re(t){return t&&"none"!==t.action?R`
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
          @keydown=${t=>{t.Fi=!0}}
          @change=${this.Zi}
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
          @change=${this.Zi}
        ></ha-switch>
      </div>
    `:R``}render(){return this.hass&&this.ki?R`
      <div class="card-config" @keydown=${t=>t.Fi=!0}>
        ${this.he()} ${this.ce()} ${this.de()}
        ${this.le()} ${this.pe()}
        ${this.ne()} ${this.ue()}
      </div>
    `:R`<ha-circular-progress active alt="Loading editor"></ha-circular-progress>`}he(){return R`
      <div class="info-panel">
        <div class="info-icon">i</div>
        <div class="info-text">
          This card wraps another card to add tap, hold, double-tap actions and/or swipe actions.
          First, select a card to wrap below, then configure the actions you want to enable.
        </div>
      </div>
    `}ce(){const t=!!this.ki.card,i=t?function(t){if(!t?.type)return{typeName:"Unknown",name:""};const i=(t.type.startsWith("custom:")?t.type.substring(7):t.type).split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ");return{typeName:i,name:t.title||t.name||""}}(this.ki.card):{typeName:"",name:""};return R`
      <div class="section">
        <div class="section-header">Wrapped Card</div>

        ${t?R`
              <div class="card-row">
                <div class="card-info">
                  <span class="card-type">${i.typeName}</span>
                  ${i.name?R`<span class="card-name">(${i.name})</span>`:""}
                </div>
                <div class="card-actions">
                  <ha-icon-button
                    label="Edit Card"
                    path="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                    @click=${()=>this.te()}
                  ></ha-icon-button>
                  <ha-icon-button
                    label="Delete Card"
                    path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    @click=${()=>this.ie()}
                    style="color: var(--error-color);"
                  ></ha-icon-button>
                </div>
              </div>
            `:R`
              <div class="no-card">
                <div class="no-card-message">
                  No card selected. Use the card picker below to choose a card to wrap.
                </div>
              </div>
            `}
      </div>
    `}de(){return!!this.ki.card||!this.ee()?R``:R`
      <div id="card-picker-container">
        <hui-card-picker
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          @config-changed=${this.Ti}
          label="Pick a card to wrap"
        ></hui-card-picker>
      </div>
    `}le(){return R`
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
            .checked=${this.ki.prevent_default_dialog||!1}
            @change=${t=>{t.Fi=!0;const i={...this.ki};i.prevent_default_dialog=t.target.checked,this.ki=i,this.Ki()}}
          ></ha-switch>
        </div>
      </div>
    `}pe(){const t=this.ki.tap_action||{action:"none"},i=this.ki.hold_action||{action:"none"},e=this.ki.double_tap_action||{action:"none"};return R`
      <ha-expansion-panel
        .expanded=${this.Ci}
        @expanded-changed=${t=>{t.stopPropagation(),this.Qi("actions",t)}}
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
            ${this.se("tap_action",t)}
            ${this.oe("tap_action",t)}
            ${this.ae("tap_action",t)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap-hold" style="margin-right: 8px;"></ha-icon>
              Hold Action
            </div>
            ${this.se("hold_action",i)}
            ${this.oe("hold_action",i)}
            ${this.re(i)}
            ${this.ae("hold_action",i)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-double-tap" style="margin-right: 8px;"></ha-icon>
              Double Tap Action
            </div>
            ${this.se("double_tap_action",e)}
            ${this.oe("double_tap_action",e)}
            ${this.ae("double_tap_action",e)}
          </div>
        </div>
      </ha-expansion-panel>
    `}ue(){return R`
      <div class="version-display">
        <div class="version-text">Actions Card</div>
        <div class="version-badges">
          <div class="version-badge">v${Ot}</div>
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
    `}updated(t){if(super.updated(t),t.has("_actionsExpanded")||t.has("_swipeActionsExpanded")){const t=this.shadowRoot?.querySelector("ha-expansion-panel"),i=this.shadowRoot?.querySelectorAll("ha-expansion-panel")[1];t&&void 0!==this.Ci&&(t.expanded=this.Ci),i&&void 0!==this.Si&&(i.expanded=this.Si)}t.has("_config")&&!this.ki?.card&&(this.Ni?setTimeout(()=>this.Wi(),50):this.Li())}static get styles(){return function(){const{css:t}=Tt();return t`
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
  `}()}}customElements.get("actions-card")||customElements.define("actions-card",ActionsCard),customElements.get("actions-card-editor")||customElements.define("actions-card-editor",ActionsCardEditor),ActionsCard.getConfigElement=()=>document.createElement("actions-card-editor"),window.customCards=window.customCards||[],window.customCards.some(t=>"actions-card"===t.type)||window.customCards.push({type:"actions-card",name:"Actions Card",preview:!0,description:"Wraps another card to add tap, hold, and double-tap actions.",documentationURL:"https://github.com/nutteloost/actions-card"}),console.info(`%c ACTIONS-CARD %c v${Ot} %c`,"color: white; background: #9c27b0; font-weight: 700;","color: #9c27b0; background: white; font-weight: 700;","color: grey; background: white; font-weight: 400;");export{Ot as CARD_VERSION};
