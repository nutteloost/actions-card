const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new WeakMap;let o=class t{constructor(t,i,s){if(this.i=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...i)=>{const s=1===t.length?t[0]:i.reduce((i,e,s)=>i+(t=>{if(!0===t.i)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1],t[0]);return new o(s,t,e)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,e))(i)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:l,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,v=f?f.emptyScript:"",g=p.reactiveElementPolyfillSupport,m=(t,i)=>t,b={toAttribute(t,i){switch(i){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},w=(t,i)=>!r(t,i),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let x=class e extends HTMLElement{static addInitializer(t){this.v(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.m&&[...this.m.keys()]}static createProperty(t,i=y){if(i.state&&(i.attribute=!1),this.v(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const e=Symbol(),s=this.getPropertyDescriptor(t,e,i);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get:s,set(i){const n=s?.call(this);o?.call(this,i),this.requestUpdate(t,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static v(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this.v(),this.hasOwnProperty(m("properties"))){const t=this.properties,i=[...d(t),...l(t)];for(const e of i)this.createProperty(e,t[e])}const t=this[Symbol.metadata];if(null!==t){const i=litPropertyMetadata.get(t);if(void 0!==i)for(const[t,e]of i)this.elementProperties.set(t,e)}this.m=new Map;for(const[t,i]of this.elementProperties){const e=this._(t,i);void 0!==e&&this.m.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(a(t))}else void 0!==t&&i.push(a(t));return i}static _(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this.S=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.A=null,this.P()}P(){this.N=new Promise(t=>this.enableUpdating=t),this.D=new Map,this.M(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.L??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this.L?.delete(t)}M(){const t=new Map,i=this.constructor.elementProperties;for(const e of i.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this.S=t)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.L?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.L?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,e){this.I(t,e)}U(t,i){const e=this.constructor.elementProperties.get(t),s=this.constructor._(t,e);if(void 0!==s&&!0===e.reflect){const o=(void 0!==e.converter?.toAttribute?e.converter:b).toAttribute(i,e.type);this.A=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this.A=null}}I(t,i){const e=this.constructor,s=e.m.get(t);if(void 0!==s&&this.A!==s){const t=e.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this.A=s;const n=o.fromAttribute(i,t.type);this[s]=n??this.H?.get(s)??n,this.A=null}}requestUpdate(t,i,e){if(void 0!==t){const s=this.constructor,o=this[t];if(e??=s.getPropertyOptions(t),!((e.hasChanged??w)(o,i)||e.useDefault&&e.reflect&&o===this.H?.get(t)&&!this.hasAttribute(s._(t,e))))return;this.C(t,i,e)}!1===this.isUpdatePending&&(this.N=this.R())}C(t,i,{useDefault:e,reflect:s,wrapped:o},n){e&&!(this.H??=new Map).has(t)&&(this.H.set(t,n??i??this[t]),!0!==o||void 0!==n)||(this.D.has(t)||(this.hasUpdated||e||(i=void 0),this.D.set(t,i)),!0===s&&this.A!==t&&(this.J??=new Set).add(t))}async R(){this.isUpdatePending=!0;try{await this.N}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.S){for(const[t,i]of this.S)this[t]=i;this.S=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[i,e]of t){const{wrapped:t}=e,s=this[i];!0!==t||this.D.has(i)||void 0===s||this.C(i,void 0,e,s)}}let t=!1;const i=this.D;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this.L?.forEach(t=>t.hostUpdate?.()),this.update(i)):this.W()}catch(i){throw t=!1,this.W(),i}t&&this.B(i)}willUpdate(t){}B(t){this.L?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}W(){this.D=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.N}shouldUpdate(t){return!0}update(t){this.J&&=this.J.forEach(t=>this.U(t,this[t])),this.W()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,g?.({ReactiveElement:x}),(p.reactiveElementVersions??=[]).push("2.1.1");const $=globalThis,_=$.trustedTypes,k=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,T=`<${S}>`,A=document,O=()=>A.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,D="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,z=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,R=(t=>(i,...e)=>({V:t,strings:i,values:e}))(1),J=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),B=new WeakMap,V=A.createTreeWalker(A,129);function F(t,i){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(i):i}const G=(t,i)=>{const e=t.length-1,s=[];let o,n=2===i?"<svg>":3===i?"<math>":"",a=M;for(let i=0;i<e;i++){const e=t[i];let r,c,h=-1,d=0;for(;d<e.length&&(a.lastIndex=d,c=a.exec(e),null!==c);)d=a.lastIndex,a===M?"!--"===c[1]?a=L:void 0!==c[1]?a=j:void 0!==c[2]?(H.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=z):void 0!==c[3]&&(a=z):a===z?">"===c[0]?(a=o??M,h=-1):void 0===c[1]?h=-2:(h=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?z:'"'===c[3]?U:I):a===U||a===I?a=z:a===L||a===j?a=M:(a=z,o=void 0);const l=a===z&&t[i+1].startsWith("/>")?" ":"";n+=a===M?e+T:h>=0?(s.push(r),e.slice(0,h)+C+e.slice(h)+E+l):e+E+(-2===h?i:l)}return[F(t,n+(t[e]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),s]};class Z{constructor({strings:t,V:i},e){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[c,h]=G(t,i);if(this.el=Z.createElement(c,e),V.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const i=h[n++],e=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:a[2],strings:e,ctor:"."===a[1]?Q:"?"===a[1]?tt:"@"===a[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(E),i=t.length-1;if(i>0){s.textContent=_?_.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],O()),V.nextNode(),r.push({type:2,index:++o});s.append(t[i],O())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,i){const e=A.createElement("template");return e.innerHTML=t,e}}function q(t,i,e=t,s){if(i===J)return i;let o=void 0!==s?e.F?.[s]:e.G;const n=P(i)?void 0:i.Z;return o?.constructor!==n&&(o?.q?.(!1),void 0===n?o=void 0:(o=new n(t),o.K(t,e,s)),void 0!==s?(e.F??=[])[s]=o:e.G=o),void 0!==o&&(i=q(t,o.X(t,i.values),o,s)),i}class K{constructor(t,i){this.Y=[],this.tt=void 0,this.it=t,this.et=i}get parentNode(){return this.et.parentNode}get st(){return this.et.st}u(t){const{el:{content:i},parts:e}=this.it,s=(t?.creationScope??A).importNode(i,!0);V.currentNode=s;let o=V.nextNode(),n=0,a=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new X(o,o.nextSibling,this,t):1===r.type?i=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(i=new et(o,this,t)),this.Y.push(i),r=e[++a]}n!==r?.index&&(o=V.nextNode(),n++)}return V.currentNode=A,s}p(t){let i=0;for(const e of this.Y)void 0!==e&&(void 0!==e.strings?(e.ot(t,e,i),i+=e.strings.length-2):e.ot(t[i])),i++}}class X{get st(){return this.et?.st??this.nt}constructor(t,i,e,s){this.type=2,this.rt=W,this.tt=void 0,this.ct=t,this.ht=i,this.et=e,this.options=s,this.nt=s?.isConnected??!0}get parentNode(){let t=this.ct.parentNode;const i=this.et;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this.ct}get endNode(){return this.ht}ot(t,i=this){t=q(this,t,i),P(t)?t===W||null==t||""===t?(this.rt!==W&&this.dt(),this.rt=W):t!==this.rt&&t!==J&&this.lt(t):void 0!==t.V?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this.lt(t)}O(t){return this.ct.parentNode.insertBefore(t,this.ht)}T(t){this.rt!==t&&(this.dt(),this.rt=this.O(t))}lt(t){this.rt!==W&&P(this.rt)?this.ct.nextSibling.data=t:this.T(A.createTextNode(t)),this.rt=t}$(t){const{values:i,V:e}=t,s="number"==typeof e?this.ut(t):(void 0===e.el&&(e.el=Z.createElement(F(e.h,e.h[0]),this.options)),e);if(this.rt?.it===s)this.rt.p(i);else{const t=new K(s,this),e=t.u(this.options);t.p(i),this.T(e),this.rt=t}}ut(t){let i=B.get(t.strings);return void 0===i&&B.set(t.strings,i=new Z(t)),i}k(t){N(this.rt)||(this.rt=[],this.dt());const i=this.rt;let e,s=0;for(const o of t)s===i.length?i.push(e=new X(this.O(O()),this.O(O()),this,this.options)):e=i[s],e.ot(o),s++;s<i.length&&(this.dt(e&&e.ht.nextSibling,s),i.length=s)}dt(t=this.ct.nextSibling,i){for(this.ft?.(!1,!0,i);t!==this.ht;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this.et&&(this.nt=t,this.ft?.(t))}}class Y{get tagName(){return this.element.tagName}get st(){return this.et.st}constructor(t,i,e,s,o){this.type=1,this.rt=W,this.tt=void 0,this.element=t,this.name=i,this.et=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this.rt=Array(e.length-1).fill(new String),this.strings=e):this.rt=W}ot(t,i=this,e,s){const o=this.strings;let n=!1;if(void 0===o)t=q(this,t,i,0),n=!P(t)||t!==this.rt&&t!==J,n&&(this.rt=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=q(this,s[e+a],i,a),r===J&&(r=this.rt[a]),n||=!P(r)||r!==this.rt[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this.rt[a]=r}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class tt extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}ot(t,i=this){if((t=q(this,t,i,0)??W)===J)return;const e=this.rt,s=t===W&&e!==W||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==W&&(e===W||s);s&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this.rt=t}handleEvent(t){"function"==typeof this.rt?this.rt.call(this.options?.host??this.element,t):this.rt.handleEvent(t)}}class et{constructor(t,i,e){this.element=t,this.type=6,this.tt=void 0,this.et=i,this.options=e}get st(){return this.et.st}ot(t){q(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(Z,X),($.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this.vt=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.vt=((t,i,e)=>{const s=e?.renderBefore??i;let o=s.gt;if(void 0===o){const t=e?.renderBefore??null;s.gt=o=new X(i.insertBefore(O(),t),t,void 0,e??{})}return o.ot(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.vt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.vt?.setConnected(!1)}render(){return J}}nt.bt=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");const rt=(t,...i)=>{};function ct(t,i,e){return t.entity||t.entity_id||i.entity||(e&&e.config?e.config.entity:null)}const ht="navigate",dt="url",lt="toggle",ut="call-service",pt="more-info",ft="assist",vt="fire-dom-event",gt=[{value:"none",label:"None"},{value:lt,label:"Toggle"},{value:ht,label:"Navigate"},{value:dt,label:"URL"},{value:ut,label:"Call Service"},{value:pt,label:"More Info"},{value:ft,label:"Assist"},{value:vt,label:"Fire DOM Event"}],mt=50,bt=100,wt=10,yt=(t,i,e={},s={})=>{const o=new CustomEvent(i,{detail:e,bubbles:!1!==s.bubbles,cancelable:Boolean(s.cancelable),composed:!1!==s.composed});return t.dispatchEvent(o),o};function xt(){return{LitElement:nt,html:R,css:n,fireEvent:yt}}class $t{constructor(t,i,e,s){this.element=t,this.config=e,this.childCard=s,this.wt=0}handleAction(t="tap"){const i=this.config[`${t}_action`];i&&"none"!==i.action&&(i.confirmation?this.yt(i):this.xt(i))}yt(t){let i,e="Are you sure?",s="Confirm",o="Cancel";"object"==typeof t.confirmation?(e=t.confirmation.text||e,i=t.confirmation.title,s=t.confirmation.confirm_text||s,o=t.confirmation.dismiss_text||o):"string"==typeof t.confirmation&&(e=t.confirmation);const n=document.createElement("ha-dialog");n.heading=i||"",n.open=!0;const a=document.createElement("div");a.innerText=e,n.appendChild(a);const r=document.createElement("mwc-button");r.slot="primaryAction",r.label=s,r.style.color="var(--primary-color)",r.setAttribute("aria-label",s),r.addEventListener("click",()=>{n.parentNode.removeChild(n),this.xt(t)});const c=document.createElement("mwc-button");c.slot="secondaryAction",c.label=o,c.setAttribute("aria-label",o),c.addEventListener("click",()=>{n.parentNode.removeChild(n)}),n.appendChild(r),n.appendChild(c),document.body.appendChild(n)}xt(t){this.wt=Date.now();const i=this.element.hass;if(i&&t.action)try{switch(t.action,t.action){case ht:!function(t){const{fireEvent:i}=xt(),e=t.navigation_path||"",s=!0===t.navigation_replace;e&&(s?window.history.replaceState(null,"",e):window.history.pushState(null,"",e),i(window,"location-changed",{replace:s}))}(t,0,this.config,this.childCard);break;case dt:!function(t){const i=t.url_path||"";i&&(t.target,window.open(i,t.target||"_blank"))}(t,0,this.config,this.childCard);break;case lt:!function(t,i,e,s){const o=ct(t,e,s);o&&i.callService("homeassistant","toggle",{entity_id:o})}(t,i,this.config,this.childCard);break;case ut:!function(t,i){if(!t.service)return;const[e,s]=t.service.split(".",2);if(!e||!s)return void t.service;const o=t.service_data||t.data||{},n=t.target||(o.entity_id?{entity_id:o.entity_id}:{});n.entity_id&&o.entity_id&&delete o.entity_id,i.callService(e,s,o,n)}(t,i,this.config,this.childCard);break;case pt:!function(t,i,e,s,o){const{fireEvent:n}=xt(),a=ct(t,e,s);a&&n(o,"hass-more-info",{entityId:a})}(t,0,this.config,this.childCard,this.element);break;case ft:!function(t,i,e,s,o){const{fireEvent:n}=xt();t.pipeline_id,t.start_listening,n(o,"assist",{pipeline_id:t.pipeline_id||"last_used",start_listening:!0===t.start_listening})}(t,0,this.config,this.childCard,this.element);break;case vt:!function(t,i,e,s,o){const{fireEvent:n}=xt();if("browser_mod"===t.event_type&&t.event_data)return t.event_data,void n(o,"ll-custom",{browser_mod:t.event_data});t.event_type&&(t.event_type,t.event_data,n(o,t.event_type,t.event_data||null))}(t,0,this.config,this.childCard,this.element);break;default:t.action}}catch(i){console.error("ActionsCard: Error executing action:",t.action,i)}}getLastActionTime(){return this.wt}}class ActionsCard extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},$t:{type:Object,state:!0}}}static getStubConfig(){return{card:null,tap_action:{action:"none"},hold_action:{action:"none"},double_tap_action:{action:"none"},prevent_default_dialog:!1}}constructor(){super(),this._t=null,this.kt=null,this.Ct=!1,this.Et=0,this.wt=0,this.$t=null,this.config={},this.St=null,this.Tt=null,this.At=null}async Ot(){if(!this.Tt)try{this.Tt=await async function(){if(!window.loadCardHelpers)return null;try{return await window.loadCardHelpers()}catch(t){return null}}()}catch(t){}}setConfig(t){JSON.stringify(t),this.config=t,void 0===this.config.prevent_default_dialog&&(this.config.prevent_default_dialog=!1),this.At=new $t(this,null,this.config,this.$t),t&&t.card?this.$t&&JSON.stringify(this.Pt)===JSON.stringify(t.card)||(this.Pt=JSON.parse(JSON.stringify(t.card)),this.Nt(t.card).catch(t=>{})):(this.$t=null,this.Pt=null,this.requestUpdate())}async Nt(t){if(!t)return this.$t=null,void this.requestUpdate();try{const i=Array.isArray(t)?t[0]:t,e=i.type;if(!e)throw new Error("Card configuration requires a `type`.");this.Dt=this.Mt(i);if(e.startsWith("custom:"))return void await this.Lt(i);const s=await this.jt(i);s?await this.zt(s,e):await this.Lt(i)}catch(i){this.It(i.message,t)}this.requestUpdate()}Mt(t){if(!t.card_mod?.style)return null;const i={},e=t.card_mod.style.match(/height:\s*([^;!]+)/i);return e&&(i.height=e[1].trim()),Object.keys(i).length>0?i:null}async jt(t){try{if(this.Tt||await this.Ot(),this.Tt)return t.type,await this.Tt.createCardElement(t)}catch(i){t.type}return null}async zt(t,i){this.hass&&(t.hass=this.hass),this.$t=t,this.At&&(this.At.childCard=this.$t),await this.Ut(),setTimeout(()=>{window.cardmod&&window.cardmod.process_card?.(this.$t),this.dispatchEvent(new CustomEvent("card-mod-refresh",{bubbles:!0,composed:!0}))},100)}async Ut(){await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.Ht()},mt)}async Lt(t,i=0){const e=t.type;if(i>wt)return void this.It(`Failed to create card: ${e}`,t);const s=e.startsWith("custom:")?e.substring(7):`hui-${e}-card`,o=document.createElement(s);if("function"!=typeof o.setConfig)return i<5?void setTimeout(()=>this.Lt(t,i+1),bt):void this.It(`Card type ${e} is not available`,t);try{o.setConfig(t),this.hass&&(o.hass=this.hass),this.$t=o,this.At&&(this.At.childCard=this.$t),await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.Ht(),window.cardmod&&window.cardmod.process_card?.(this.$t),this.dispatchEvent(new CustomEvent("card-mod-refresh",{bubbles:!0,composed:!0}))},50)}catch(i){this.It(`Error setting up card: ${i.message}`,t)}}It(t,i){try{const e=document.createElement("hui-error-card");e.setConfig({type:"error",error:t,origConfig:i}),this.hass&&(e.hass=this.hass),this.$t=e}catch(i){const e=document.createElement("div");e.innerHTML=`<ha-alert alert-type="error">Error: ${t}</ha-alert>`,this.$t=e}this.At&&(this.At.childCard=this.$t),this.requestUpdate()}Rt(t){this.config.prevent_default_dialog&&(t.preventDefault(),t.stopPropagation())}Ht(){if(!this.$t||!this.config.prevent_default_dialog)return;this.Jt(),this.St=t=>{t.type,"hass-more-info"!==t.type&&"click"!==t.type&&"tap"!==t.type||(t.type,t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation())};const t=()=>{if(this.$t){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.$t.addEventListener(t,this.St,{capture:!0,passive:!1}),this.$t.shadowRoot&&this.$t.shadowRoot.addEventListener(t,this.St,{capture:!0,passive:!1})});this.$t.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.addEventListener(t,this.St,{capture:!0,passive:!1})})})}},i=(e=0)=>{if(!(e>5))try{t()}catch(t){setTimeout(()=>i(e+1),100)}};i(),setTimeout(()=>i(),500)}Jt(){if(this.$t&&this.St){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.$t.removeEventListener(t,this.St,!0),this.$t.shadowRoot&&this.$t.shadowRoot.removeEventListener(t,this.St,!0)});try{this.$t.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.removeEventListener(t,this.St,!0)})})}catch(t){}this.St=null}}set hass(t){const i=this.Wt;if(this.Wt=t,this.$t&&this.$t.hass!==t)try{this.$t.hass=t}catch(t){this.config&&this.config.card&&this.Nt(this.config.card)}i!==t&&this.requestUpdate()}get hass(){return this.Wt}getCardSize(){if(!this.$t)return 3;if(this.$t&&"function"==typeof this.$t.getCardSize)try{return this.$t.getCardSize()}catch(t){return 1}return 1}updated(t){super.updated(t),t.has("_childCard")&&this.$t&&this.config&&this.config.prevent_default_dialog&&setTimeout(()=>{this.Ht()},100),(t.has("config")||t.has("_childCard"))&&this.At&&(this.At.config=this.config,this.At.childCard=this.$t)}connectedCallback(){super.connectedCallback(),this.Tt||this.Ot()}disconnectedCallback(){super.disconnectedCallback(),this.Jt()}Bt(t="tap"){this.At&&this.At.handleAction(t)}Vt(t){t&&t.stopPropagation(),clearTimeout(this._t),clearTimeout(this.kt),this._t=null,this.kt=null,this.Ct=!1,this.Et=0}Ft(t){const i=["INPUT","BUTTON","SELECT","TEXTAREA","A","HA-SLIDER","HA-SWITCH","PAPER-SLIDER","PAPER-BUTTON","MWC-BUTTON"];let e=t.target;for(;e&&e!==this;){if(i.includes(e.tagName)||e.hasAttribute("actions-card-interactive"))return void rt(0,e.tagName);e=e.parentElement||e.getRootNode().host}0!==t.button&&"mouse"===t.pointerType||(t.stopPropagation(),this.Gt=t.clientX,this.Zt=t.clientY,clearTimeout(this._t),this.Ct=!1,this.config.hold_action&&"none"!==this.config.hold_action.action&&(this._t=window.setTimeout(()=>{Math.abs(t.clientX-this.Gt)<10&&Math.abs(t.clientY-this.Zt)<10?(this.Ct=!0,this.Bt("hold"),this.Et=0):this.Vt()},this.config.hold_action.hold_time||500)))}qt(t){if(0!==t.button&&"mouse"===t.pointerType)return;t.stopPropagation(),this.config.prevent_default_dialog&&t.preventDefault();const i=Math.abs(t.clientX-this.Gt)>10||Math.abs(t.clientY-this.Zt)>10;clearTimeout(this._t),this.Ct||i?this.Vt():(this.Et++,this.Et,this.config.prevent_default_dialog&&this.Kt(300),this.config.double_tap_action&&"none"!==this.config.double_tap_action.action?1===this.Et?this.kt=window.setTimeout(()=>{1!==this.Et||this.Ct||"none"!==this.config.tap_action?.action&&this.Bt("tap"),this.Vt()},250):2===this.Et&&(clearTimeout(this.kt),this.kt=null,this.Bt("double_tap"),this.Vt()):("none"!==this.config.tap_action?.action&&this.Bt("tap"),this.Vt()))}Kt(t){if(!this.$t)return;const i=t=>{t.type,t.stopPropagation(),t.preventDefault()},e=["click","tap","hass-more-info"];e.forEach(t=>{this.$t.addEventListener(t,i,{capture:!0}),this.$t.shadowRoot&&this.$t.shadowRoot.addEventListener(t,i,{capture:!0})}),setTimeout(()=>{e.forEach(t=>{this.$t.removeEventListener(t,i,{capture:!0}),this.$t.shadowRoot&&this.$t.shadowRoot.removeEventListener(t,i,{capture:!0})})},t)}Xt(t){t.stopPropagation(),((t,i,e={})=>{const s=new CustomEvent(i,{detail:e,bubbles:!0,composed:!0});t.dispatchEvent(s)})(this,"show-edit-card",{element:this})}render(){if(!this.$t)return R`
        <div class="preview-container">
          <div class="preview-icon-container">
            <ha-icon icon="mdi:gesture-tap-hold"></ha-icon>
          </div>
          <div class="preview-text-container">
            <div class="preview-title">Actions Card</div>
            <div class="preview-description">
              Wrap another card to add tap, hold, or double tap actions. Configure the card to wrap
              below.
            </div>
          </div>
          <div class="preview-actions">
            <ha-button raised @click=${this.Xt} aria-label="Edit Card">
              Edit Card
            </ha-button>
          </div>
        </div>
      `;const t="none"!==this.config.tap_action?.action||"none"!==this.config.hold_action?.action||"none"!==this.config.double_tap_action?.action;let i=`cursor: ${t?"pointer":"default"}; display: block;`;return this.Dt?.height?i+=` height: ${this.Dt.height};`:this.config.card?.card_mod||(i+=" height: 100%;"),R`
      <div
        @pointerdown="${this.Ft}"
        @pointerup="${this.qt}"
        @pointercancel="${this.Vt}"
        @click="${this.Rt}"
        @contextmenu="${t=>{this.config.hold_action&&t.preventDefault()}}"
        style="${i}"
        aria-label="${t?"Interactive card with actions":""}"
        role="${t?"button":""}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      >
        ${this.$t}
      </div>
    `}static get styles(){return function(){const{css:t}=xt();return t`
    :host {
      display: block;
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
  `}()}}class ActionsCardEditor extends nt{static get properties(){return{hass:{type:Object},Yt:{type:Object,state:!0},lovelace:{type:Object}}}constructor(){super(),this.Qt=`actions-card-editor-${Math.random().toString(36).substring(2,15)}`,this.ti=this.ii.bind(this),this.ei=!1,this.si=new Set,this.oi=!1,this.ni=null,this.ai=0}async connectedCallback(){super.connectedCallback(),await this.ri(),setTimeout(()=>this.ci(),1e3);let t=this.parentNode;for(;t;){if("hui-dialog-edit-card"===t.localName){this.ei=!0,t.hi=!0,rt(0);break}t=t.parentNode||t.getRootNode&&t.getRootNode().host}this.di()}async ri(){let t=0;for(;!customElements.get("hui-card-picker")&&t<10;)await this.li(),customElements.get("hui-card-picker")||(await new Promise(t=>setTimeout(t,200)),t++);customElements.get("hui-card-picker")||await this.ui(),customElements.get("hui-card-picker")}async li(){if(!customElements.get("hui-card-picker"))try{const t=[()=>this.pi(),()=>this.fi()];for(const i of t)try{if(await i(),customElements.get("hui-card-picker"))return void rt(0)}catch(t){}}catch(t){}}async pi(){const t=["hui-entities-card","hui-conditional-card","hui-vertical-stack-card","hui-horizontal-stack-card","hui-grid-card","hui-map-card"];for(const i of t)try{const t=customElements.get(i);if(t&&t.getConfigElement&&(await t.getConfigElement(),customElements.get("hui-card-picker")))return}catch(t){}}async ui(){try{if(window.loadCardHelpers){if(await window.loadCardHelpers()&&customElements.get("hui-card-picker"))return}const t=document.createElement("div");t.innerHTML="<hui-card-picker></hui-card-picker>",document.body.appendChild(t),await new Promise(t=>setTimeout(t,100)),document.body.removeChild(t)}catch(t){}}async fi(){try{if(!customElements.get("hui-card-picker")){const t=new CustomEvent("hass-refresh",{bubbles:!0,composed:!0});this.dispatchEvent(t),await new Promise(t=>setTimeout(t,500))}}catch(t){}}ci(){this.oi?this.gi():(this.ni&&clearTimeout(this.ni),this.ni=setTimeout(()=>{this.gi()},500))}async gi(){if(!this.shadowRoot||this.Yt?.card)return;const t=this.shadowRoot.querySelector("#card-picker-container");if(!t)return void this.requestUpdate();let i=t.querySelector("hui-card-picker");i||(i=document.createElement("hui-card-picker"),i.hass=this.hass,i.lovelace=this.lovelace,t.appendChild(i))}di(){this.mi=t=>{if(t.target&&this.shadowRoot&&this.shadowRoot.contains(t.target)&&(t.type,t.bi=!0,"keydown"!==t.type&&"input"!==t.type&&"change"!==t.type&&"config-changed"!==t.type||(t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())),"keydown"===t.type||"input"===t.type){"INPUT"===t.target.tagName&&("search"===t.target.type||t.target.placeholder?.includes("Search"))&&(t.type,t.wi=!0,t.bi=!0,t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())}};["keydown","input","change","click","config-changed"].forEach(t=>{document.addEventListener(t,this.mi,{capture:!0})})}disconnectedCallback(){if(super.disconnectedCallback(),this.ni&&(clearTimeout(this.ni),this.ni=null),this.ai=0,this.mi){["keydown","input","change","click","config-changed"].forEach(t=>{document.removeEventListener(t,this.mi,{capture:!0})})}this.si&&(this.si.forEach(t=>{if(t.parentNode)try{t.parentNode.removeChild(t)}catch(t){console.warn("Error removing dialog:",t)}}),this.si.clear())}setConfig(t){if(!t)throw new Error("Invalid configuration");JSON.stringify(t),this.Yt=JSON.parse(JSON.stringify(t)),this.Yt.tap_action||(this.Yt.tap_action={action:"none"}),this.Yt.hold_action||(this.Yt.hold_action={action:"none"}),this.Yt.double_tap_action||(this.Yt.double_tap_action={action:"none"}),void 0===this.Yt.prevent_default_dialog&&(this.Yt.prevent_default_dialog=!1),this.Yt.card||setTimeout(()=>this.gi(),50)}yi(t,i,e){const s=["action","confirmation"];"hold_action"===e&&s.push("hold_time");const o=[...s,...{none:[],navigate:["navigation_path","navigation_replace"],url:["url_path","target"],toggle:["entity"],"more-info":["entity"],"call-service":["service","service_data"],assist:["pipeline_id","start_listening"],"fire-dom-event":["event_type","event_data"]}[i]||[]],n={};return Object.keys(t).forEach(i=>{o.includes(i)&&(n[i]=t[i])}),n}xi(t){if(t.bi=!0,t.stopPropagation(),!this.Yt||!t.target)return;const i=t.target,e=i.configValue||i.getAttribute("data-option"),s=i.parentElement?.configValue||i.parentElement?.getAttribute("data-option");if(!(e||s))return;const o=i.configAttribute||i.getAttribute("data-attribute");if(e&&e.includes("_action")){const s={...this.Yt[e]||{}};if(o)"checkbox"===i.type?s[o]=i.checked:s[o]=t.detail?.value??i.value??"",this.Yt={...this.Yt,[e]:s};else{const t=i.value,o=this.yi(s,t,e);o.action=t,this.Yt={...this.Yt,[e]:o}}}else if(e){let t;t="checkbox"===i.type?i.checked:i.value,this.Yt={...this.Yt,[e]:t}}this.$i()}$i(){if(!this.Yt)return;const t=new CustomEvent("config-changed",{detail:{config:this.Yt,editorId:this.Qt,fromActionCardEditor:!0,preventDialogClose:!0,inEditorDialog:this.ei},bubbles:!1});if(t.bi=!0,this.dispatchEvent(t),this.ei){let t=this.parentNode,i=null;for(;t;){if("hui-dialog-edit-card"===t.localName){i=t;break}t=t.parentNode||t.getRootNode&&t.getRootNode().host}if(i&&"function"==typeof i._i)try{i._i(this.Yt)}catch(t){console.error("Error updating dialog config:",t)}}}ki(){if(!this.Yt)return;const t=new CustomEvent("config-changed",{detail:{config:this.Yt,editorId:this.Qt,fromActionCardEditor:!0,inEditorDialog:this.ei,preventDialogClose:!0},bubbles:!0,composed:!0});t.bi=!0,this.Yt,this.dispatchEvent(t)}ii(t){if(void 0===t.bi&&(t.bi=!0),!t.detail?.editorId||t.detail.editorId===this.Qt){const i=t.detail.config;this.Yt={...this.Yt,card:i},this.$i(),this.requestUpdate()}t.stopPropagation&&t.stopPropagation()}async Ci(){if(!this.Yt?.card)return;const t=this.Yt.card,i=this.hass,e=document.querySelector("home-assistant");if(i&&e)try{await customElements.whenDefined("hui-dialog-edit-card");const s=document.createElement("hui-dialog-edit-card");s.hass=i,this.si.add(s),document.body.appendChild(s);const o=t=>{if(s.removeEventListener("dialog-closed",o),this.si.delete(s),s.parentNode===document.body)try{document.body.removeChild(s)}catch(t){}setTimeout(()=>this.gi(),100)};s.addEventListener("dialog-closed",o);const n={cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:async t=>{t&&(this.Yt={...this.Yt,card:t},this.ki(),this.requestUpdate())}};await s.showDialog(n)}catch(i){((t,i,e={})=>{const s=new CustomEvent(i,{detail:e,bubbles:!0,composed:!0});t.dispatchEvent(s)})(this,"ll-show-dialog",{dialogTag:"hui-dialog-edit-card",dialogImport:()=>import("hui-dialog-edit-card"),dialogParams:{cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:t=>{t&&(this.Yt={...this.Yt,card:t},this.ki(),this.requestUpdate())}}})}}Ei(){if(!this.Yt)return;const t={...this.Yt};delete t.card,this.Yt=t,this.oi=!0,this.ni&&(clearTimeout(this.ni),this.ni=null),this.ai=0,this.$i(),this.requestUpdate(),this.updateComplete.then(()=>{setTimeout(()=>{this.gi()},100)})}Si(){const t=!this.Yt?.card,i=this.oi,e=this.Yt&&Object.keys(this.Yt).length>0&&!this.Yt.card,s=t&&(i||e||!this.Yt);return s}Ti(t,i){const e={tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action"}[t]||t.replace(/_/g," ");return R`
      <div class="option-row">
        <div class="option-label">${e}</div>
        <ha-select
          label="Action"
          .value=${i.action||"none"}
          data-option="${t}"
          @selected=${this.xi}
          @closed=${t=>{t.bi=!0,t.stopPropagation()}}
        >
          ${gt.map(t=>R`
              <mwc-list-item value="${t.value}">${t.label}</mwc-list-item>
            `)}
        </ha-select>
      </div>
    `}Ai(t,i){if(!i||"none"===i.action||!i.action)return R``;switch(i.action){case"navigate":return R`
          <div class="config-row">
            <ha-textfield
              label="Navigation Path"
              .value=${i.navigation_path||""}
              data-option="${t}"
              data-attribute="navigation_path"
              @keydown=${t=>{t.bi=!0}}
              @change=${this.xi}
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Replace history state</div>
            <ha-switch
              .checked=${i.navigation_replace||!1}
              data-option="${t}"
              data-attribute="navigation_replace"
              @change=${this.xi}
            ></ha-switch>
          </div>
        `;case"url":return R`
          <div class="config-row">
            <ha-textfield
              label="URL"
              .value=${i.url_path||""}
              data-option="${t}"
              data-attribute="url_path"
              @keydown=${t=>{t.bi=!0}}
              @change=${this.xi}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-select
              label="Open in"
              .value=${i.target||"_blank"}
              data-option="${t}"
              data-attribute="target"
              @selected=${this.xi}
              @closed=${t=>{t.bi=!0,t.stopPropagation()}}
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
              @value-changed=${this.xi}
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
              @keydown=${t=>{t.bi=!0}}
              @change=${this.xi}
              placeholder="domain.service"
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Service Data"
              .value=${i.service_data?JSON.stringify(i.service_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="service_data"
              @value-changed=${i=>{i.bi=!0;try{const e={...this.Yt};e[t]={...e[t],service_data:JSON.parse(i.detail.value)},this.Yt=e,this.$i()}catch(t){console.error("Invalid service data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;case"assist":return R`
          <div class="config-row">
            <ha-textfield
              label="Pipeline ID (optional)"
              .value=${i.pipeline_id||""}
              data-option="${t}"
              data-attribute="pipeline_id"
              @keydown=${t=>{t.bi=!0}}
              @change=${this.xi}
              placeholder="last_used"
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Start listening immediately</div>
            <ha-switch
              .checked=${i.start_listening||!1}
              data-option="${t}"
              data-attribute="start_listening"
              @change=${this.xi}
            ></ha-switch>
          </div>
        `;case"fire-dom-event":return R`
          <div class="config-row">
            <ha-textfield
              label="Event Type"
              .value=${i.event_type||""}
              data-option="${t}"
              data-attribute="event_type"
              @keydown=${t=>{t.bi=!0}}
              @change=${this.xi}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Event Data (optional)"
              .value=${i.event_data?JSON.stringify(i.event_data,null,2):"{}"}
              data-option="${t}"
              data-attribute="event_data"
              @value-changed=${i=>{i.bi=!0;try{const e={...this.Yt};e[t]={...e[t],event_data:JSON.parse(i.detail.value)},this.Yt=e,this.$i()}catch(t){console.error("Invalid event data:",t)}}}
            ></ha-yaml-editor>
          </div>
        `;default:return R``}}Oi(t,i){if(!i||"none"===i.action||!i.action)return R``;const e=!!i.confirmation,s="object"==typeof i.confirmation?i.confirmation:e?{text:i.confirmation}:{};return R`
      <div class="option-row confirmation-row">
        <div class="option-label">Require confirmation</div>
        <ha-switch
          .checked=${e}
          @change=${i=>{i.bi=!0;const e={...this.Yt};e[t]={...e[t],confirmation:!!i.target.checked&&{text:"Are you sure?"}},this.Yt=e,this.$i(),this.requestUpdate()}}
        ></ha-switch>
      </div>

      ${e?R`
            <div class="confirmation-config">
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Text"
                  .value=${s.text||"Are you sure?"}
                  @keydown=${t=>{t.bi=!0}}
                  @change=${i=>{i.bi=!0;const e={...this.Yt},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.text=i.target.value,e[t].confirmation=s,this.Yt=e,this.$i()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Title (optional)"
                  .value=${s.title||""}
                  @keydown=${t=>{t.bi=!0}}
                  @change=${i=>{i.bi=!0;const e={...this.Yt},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.title=i.target.value,e[t].confirmation=s,this.Yt=e,this.$i()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirm Button Text"
                  .value=${s.confirm_text||"Confirm"}
                  @keydown=${t=>{t.bi=!0}}
                  @change=${i=>{i.bi=!0;const e={...this.Yt},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.confirm_text=i.target.value,e[t].confirmation=s,this.Yt=e,this.$i()}}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Cancel Button Text"
                  .value=${s.dismiss_text||"Cancel"}
                  @keydown=${t=>{t.bi=!0}}
                  @change=${i=>{i.bi=!0;const e={...this.Yt},s="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};s.dismiss_text=i.target.value,e[t].confirmation=s,this.Yt=e,this.$i()}}
                ></ha-textfield>
              </div>
            </div>
          `:""}
    `}Pi(t){return t&&"none"!==t.action?R`
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
          @keydown=${t=>{t.bi=!0}}
          @change=${this.xi}
          suffix="ms"
        ></ha-textfield>
        <div class="help-text">
          Time in milliseconds to hold before triggering the action (default: 500ms)
        </div>
      </div>
    `:R``}render(){return this.hass&&this.Yt?R`
      <div class="card-config" @keydown=${t=>t.bi=!0}>
        ${this.Ni()} ${this.Di()} ${this.Mi()}
        ${this.Li()} ${this.ji()}
        ${this.zi()}
      </div>
    `:R`<ha-circular-progress active alt="Loading editor"></ha-circular-progress>`}Ni(){return R`
      <div class="info-panel">
        <div class="info-icon">i</div>
        <div class="info-text">
          This card wraps another card to add tap, hold, and double-tap actions. First, select a
          card to wrap below, then configure the actions you want to enable.
        </div>
      </div>
    `}Di(){const t=!!this.Yt.card,i=t?function(t){if(!t?.type)return{typeName:"Unknown",name:""};const i=(t.type.startsWith("custom:")?t.type.substring(7):t.type).split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ");return{typeName:i,name:t.title||t.name||""}}(this.Yt.card):{typeName:"",name:""};return R`
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
                    @click=${()=>this.Ci()}
                  ></ha-icon-button>
                  <ha-icon-button
                    label="Delete Card"
                    path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    @click=${()=>this.Ei()}
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
    `}Mi(){return!!this.Yt.card||!this.Si()?R``:R`
      <div id="card-picker-container">
        <hui-card-picker
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          @config-changed=${this.ti}
          label="Pick a card to wrap"
        ></hui-card-picker>
      </div>
    `}Li(){return R`
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
            .checked=${this.Yt.prevent_default_dialog||!1}
            @change=${t=>{t.bi=!0;const i={...this.Yt};i.prevent_default_dialog=t.target.checked,this.Yt=i,this.$i()}}
          ></ha-switch>
        </div>
      </div>
    `}ji(){const t=this.Yt.tap_action||{action:"none"},i=this.Yt.hold_action||{action:"none"},e=this.Yt.double_tap_action||{action:"none"};return R`
      <div class="section">
        <div class="section-header">Actions</div>

        <div class="action-container">
          ${this.Ti("tap_action",t)}
          ${this.Ai("tap_action",t)}
          ${this.Oi("tap_action",t)}
        </div>

        <div class="action-container">
          ${this.Ti("hold_action",i)}
          ${this.Ai("hold_action",i)}
          ${this.Pi(i)}
          ${this.Oi("hold_action",i)}
        </div>

        <div class="action-container">
          ${this.Ti("double_tap_action",e)}
          ${this.Ai("double_tap_action",e)}
          ${this.Oi("double_tap_action",e)}
        </div>
      </div>
    `}zi(){return R`
      <div class="version-display">
        <div class="version-text">Actions Card</div>
        <div class="version-badges">
          <div class="version-badge">v${_t}</div>
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
    `}updated(t){super.updated(t),t.has("_config")&&!this.Yt?.card&&(this.oi?setTimeout(()=>this.gi(),50):this.ci())}static get styles(){return function(){const{css:t}=xt();return t`
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

    .section-header {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      color: var(--primary-text-color);
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
  `}()}}const _t="1.4.3";customElements.get("actions-card")||customElements.define("actions-card",ActionsCard),customElements.get("actions-card-editor")||customElements.define("actions-card-editor",ActionsCardEditor),ActionsCard.getConfigElement=()=>document.createElement("actions-card-editor"),window.customCards=window.customCards||[],window.customCards.some(t=>"actions-card"===t.type)||window.customCards.push({type:"actions-card",name:"Actions Card",preview:!0,description:"Wraps another card to add tap, hold, and double-tap actions."}),console.info(`%c ACTIONS-CARD %c v${_t} %c`,"color: white; background: #9c27b0; font-weight: 700;","color: #9c27b0; background: white; font-weight: 700;","color: grey; background: white; font-weight: 400;");export{_t as CARD_VERSION};
