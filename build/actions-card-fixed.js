/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n=`<${o$1}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

/**
 * Debug Utilities
 * Provides enhanced debugging and logging functionality for Actions Card development.
 * Includes categorized logging and conditional debug output controls.
 */


/**
 * Enhanced debugging function that categorizes log messages
 * @param {string} category - Category of the log message (EDITOR, EVENT, CONFIG, ACTION, ERROR, INIT)
 * @param {...any} args - Arguments to log
 */
const logDebug = (category, ...args) => {

  const categoryColors = {
    EDITOR: 'color: #4caf50; font-weight: bold',
    EVENT: 'color: #2196f3; font-weight: bold',
    CONFIG: 'color: #ff9800; font-weight: bold',
    ACTION: 'color: #9c27b0; font-weight: bold',
    ERROR: 'color: #f44336; font-weight: bold',
    INIT: 'color: #795548; font-weight: bold',
    CARD_MOD: 'color: #9932cc; font-weight: bold',
    DEFAULT: 'color: #607d8b; font-weight: bold'
  };

  const style = categoryColors[category] || categoryColors.DEFAULT;
  console.debug(`%cActionsCard [${category}]:`, style, ...args);
};

/**
 * General Helper Functions
 * Utility functions used across the Actions Card for entity handling,
 * card configuration processing, and Home Assistant integration.
 * Provides consistent interfaces for common operations.
 */


/**
 * Get entity ID from configuration or fallback to wrapped card entity
 * @param {Object} actionConfig - Action configuration
 * @param {Object} cardConfig - Card configuration
 * @param {Object} childCard - Child card element
 * @returns {string|null} Entity ID
 */
function getEntityId(actionConfig, cardConfig, childCard) {
  return (
    actionConfig.entity ||
    actionConfig.entity_id ||
    cardConfig.entity ||
    (childCard && childCard.config ? childCard.config.entity : null)
  );
}

/**
 * Gets a descriptive name for a card configuration
 * @param {Object} cardConfig - The card configuration
 * @returns {Object} An object with type name and card name
 */
function getCardDescriptor(cardConfig) {
  if (!cardConfig?.type) return { typeName: 'Unknown', name: '' };
  const type = cardConfig.type.startsWith('custom:')
    ? cardConfig.type.substring(7)
    : cardConfig.type;
  const typeName = type
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
  const name = cardConfig.title || cardConfig.name || '';
  return { typeName, name };
}

/**
 * Load card helpers asynchronously
 * @returns {Promise<Object|null>} Card helpers or null if failed
 */
async function loadCardHelpers$1() {
  if (!window.loadCardHelpers) {
    return null;
  }

  try {
    return await window.loadCardHelpers();
  } catch (e) {
    logDebug('ERROR', 'Failed to load card helpers:', e);
    return null;
  }
}

/**
 * Supported action types
 */
const ACTION_TYPES = {
  NONE: 'none',
  NAVIGATE: 'navigate',
  URL: 'url',
  TOGGLE: 'toggle',
  CALL_SERVICE: 'call-service',
  MORE_INFO: 'more-info',
  ASSIST: 'assist',
  FIRE_DOM_EVENT: 'fire-dom-event'
};

/**
 * Action type metadata for editor
 */
const ACTION_TYPE_OPTIONS = [
  { value: ACTION_TYPES.NONE, label: 'None' },
  { value: ACTION_TYPES.TOGGLE, label: 'Toggle' },
  { value: ACTION_TYPES.NAVIGATE, label: 'Navigate' },
  { value: ACTION_TYPES.URL, label: 'URL' },
  { value: ACTION_TYPES.CALL_SERVICE, label: 'Call Service' },
  { value: ACTION_TYPES.MORE_INFO, label: 'More Info' },
  { value: ACTION_TYPES.ASSIST, label: 'Assist' },
  { value: ACTION_TYPES.FIRE_DOM_EVENT, label: 'Fire DOM Event' }
];

/**
 * UI and component constants
 */
const UI_CONSTANTS = {
  CARD_PICKER_RETRY_DELAY: 100,
  EVENT_SUPPRESSION_DURATION: 300,
  DIALOG_PREVENTION_DELAY: 50,
  CARD_CREATION_RETRY_DELAY: 100,
  MAX_CARD_CREATION_RETRIES: 10,
  PICKER_UPDATE_DELAY: 50,
  CONFIRMATION_DIALOG_CLEANUP_DELAY: 100,
  PROGRESS_INDICATOR_SIZE: 50,
  PROGRESS_INDICATOR_SIZE_TOUCH: 100
};

/**
 * Template Utilities
 * Provides support for Jinja2 templates and JavaScript templates in action configurations.
 * Enables dynamic values based on Home Assistant state.
 *
 * Jinja2 Templates:
 * - Syntax: {{ }} or {% %}
 * - Rendered via Home Assistant's render_template WebSocket API (async)
 * - Access to HA backend state
 *
 * JavaScript Templates:
 * - Syntax: [[[ ]]]
 * - Evaluated client-side in browser (sync)
 * - Access to frontend state including user info (hass.user)
 */


/**
 * Check if a string contains Jinja2 template syntax
 * @param {string} value - Value to check
 * @returns {boolean} True if contains Jinja2 template syntax
 */
function containsJinjaTemplate(value) {
  if (typeof value !== 'string') return false;
  return value.includes('{{') || value.includes('{%');
}

/**
 * Check if a string contains JavaScript template syntax [[[...]]]
 * @param {string} value - Value to check
 * @returns {boolean} True if contains JS template syntax
 */
function containsJsTemplate(value) {
  if (typeof value !== 'string') return false;
  return /\[{3}[\s\S]*\]{3}/.test(value);
}

/**
 * Check if a string contains any template syntax (Jinja2 or JavaScript)
 * @param {string} value - Value to check
 * @returns {boolean} True if contains template syntax
 */
function containsTemplate(value) {
  if (typeof value !== 'string') return false;
  return containsJinjaTemplate(value) || containsJsTemplate(value);
}

/**
 * Evaluate a JavaScript template [[[ ... ]]]
 * Executes the code inside the brackets with access to HA context
 *
 * Available variables in template:
 * - states: Home Assistant states object
 * - user: Current user info (id, name, is_admin, etc.)
 * - hass: Full Home Assistant object
 * - entity: Entity state object (if provided)
 *
 * @param {Object} hass - Home Assistant object
 * @param {string} template - Template string with [[[ ... ]]] syntax
 * @param {Object|null} entity - Optional entity state object
 * @returns {*} Result of template evaluation
 */
function evalJsTemplate(hass, template, entity = null) {
  if (!containsJsTemplate(template)) {
    return template;
  }

  // Extract code from [[[ ... ]]]
  const trimmed = template.trim();
  const match = trimmed.match(/^\[{3}([\s\S]*)\]{3}$/);

  if (!match) {
    return template;
  }

  const code = match[1];

  try {
    /* eslint-disable no-new-func */
    const result = new Function('states', 'entity', 'user', 'hass', `'use strict'; ${code}`)(
      hass.states,
      entity,
      hass.user,
      hass
    );
    /* eslint-enable no-new-func */

    logDebug('ACTION', 'JS Template evaluated:', template.substring(0, 50) + '...', '->', result);
    return result;
  } catch (e) {
    const templatePreview =
      template.length <= 100 ? template.trim() : `${template.trim().substring(0, 98)}...`;
    logDebug('ERROR', `JS Template error in '${templatePreview}':`, e.message);
    console.error('ActionsCard JS Template Error:', e);
    return template; // Return original on error
  }
}

/**
 * Render a Jinja2 template using Home Assistant's WebSocket API
 * @param {Object} hass - Home Assistant object
 * @param {string} template - Template string to render
 * @param {number} [timeout=5000] - Timeout in milliseconds
 * @returns {Promise<string>} Rendered template result
 */
async function renderTemplate(hass, template, timeout = 5000) {
  if (!containsJinjaTemplate(template)) {
    return template;
  }

  if (!hass || !hass.connection) {
    logDebug('ERROR', 'Cannot render template: no hass connection');
    return template;
  }

  try {
    return await new Promise((resolve, _reject) => {
      let unsubscribe = null;
      let resolved = false;

      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          if (unsubscribe) {
            try {
              unsubscribe();
            } catch (e) {
              // Ignore unsubscribe errors
            }
          }
          logDebug('ERROR', 'Template rendering timed out:', template);
          resolve(template);
        }
      }, timeout);

      hass.connection
        .subscribeMessage(
          (msg) => {
            if (!resolved) {
              resolved = true;
              clearTimeout(timeoutId);
              if (unsubscribe) {
                try {
                  unsubscribe();
                } catch (e) {
                  // Ignore unsubscribe errors
                }
              }
              if (msg.result !== undefined) {
                logDebug('ACTION', 'Template rendered:', template, '->', msg.result);
                resolve(msg.result);
              } else {
                resolve(template);
              }
            }
          },
          {
            type: 'render_template',
            template: template,
            timeout: Math.ceil(timeout / 1000)
          }
        )
        .then((unsub) => {
          unsubscribe = unsub;
          if (resolved && unsubscribe) {
            try {
              unsubscribe();
            } catch (e) {
              // Ignore
            }
          }
        })
        .catch((err) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            logDebug('ERROR', 'Template subscription failed:', err);
            resolve(template);
          }
        });
    });
  } catch (e) {
    logDebug('ERROR', 'Template rendering failed:', e);
    return template;
  }
}

/**
 * Check if an object contains any template strings (recursive)
 * Checks for both Jinja2 and JavaScript templates
 * @param {*} obj - Value to check
 * @returns {boolean} True if templates found
 */
function objectContainsTemplates(obj) {
  if (typeof obj === 'string') {
    return containsTemplate(obj);
  }

  if (Array.isArray(obj)) {
    return obj.some((item) => objectContainsTemplates(item));
  }

  if (obj && typeof obj === 'object') {
    return Object.values(obj).some((value) => objectContainsTemplates(value));
  }

  return false;
}

/**
 * Process all template values in any value recursively
 * Handles strings, arrays, and objects
 * Supports both Jinja2 (async) and JavaScript (sync) templates
 *
 * @param {Object} hass - Home Assistant object
 * @param {*} value - Value to process
 * @param {Object|null} entity - Optional entity state for JS templates
 * @returns {Promise<*>} Value with all templates resolved
 */
async function processTemplates(hass, value, entity = null) {
  // Handle strings - check template type and render appropriately
  if (typeof value === 'string') {
    // Check for JS template first (synchronous evaluation)
    if (containsJsTemplate(value)) {
      return evalJsTemplate(hass, value, entity);
    }
    // Then check for Jinja2 template (async evaluation)
    if (containsJinjaTemplate(value)) {
      return renderTemplate(hass, value);
    }
    return value;
  }

  // Handle arrays - process each item
  if (Array.isArray(value)) {
    const results = await Promise.all(value.map((item) => processTemplates(hass, item, entity)));
    return results;
  }

  // Handle objects - process each property
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = await processTemplates(hass, val, entity);
    }
    return result;
  }

  // Return other types as-is (numbers, booleans, null, undefined)
  return value;
}

/**
 * OFFLINE DEPENDENCY LOADING - BUNDLED APPROACH WITH HA HELPERS
 *
 * When using Rollup with node-resolve, LitElement is bundled directly.
 * This file provides both bundled dependencies and Home Assistant helpers integration.
 */


// Fallback implementations for HA helpers
const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new CustomEvent(type, {
    detail,
    bubbles: options.bubbles !== false,
    cancelable: Boolean(options.cancelable),
    composed: options.composed !== false
  });
  node.dispatchEvent(event);
  return event;
};

const hasConfigOrEntityChanged = (element, changedProps) => {
  if (changedProps.has('config') || changedProps.has('_config')) return true;

  const oldHass = changedProps.get('hass');
  if (!oldHass || oldHass !== element.hass) return true;

  return false;
};

const hasAction = (config) => {
  return config && config.action && config.action !== 'none';
};

const handleAction = (element, hass, config, action) => {
  // Basic action handling fallback
  const actionConfig = config[`${action}_action`];
  if (element._actionExecutor && hasAction(actionConfig)) {
    element._actionExecutor.handleAction(action);
  }
};

const computeCardSize = (element) => {
  if (element && typeof element.getCardSize === 'function') {
    try {
      return element.getCardSize();
    } catch (e) {
      console.warn('Error getting card size:', e);
    }
  }
  return 1;
};

const loadCardHelpers = async () => {
  return window.loadCardHelpers?.() || null;
};

function getDependencies() {
  return {
    LitElement: i,
    html: x,
    css: i$3,
    fireEvent,
    hasConfigOrEntityChanged,
    hasAction,
    handleAction,
    computeCardSize,
    loadCardHelpers
  };
}

/**
 * Individual Action Handlers
 * Contains the implementation for each specific action type supported by Actions Card.
 * Each handler is responsible for executing one type of action (navigate, toggle, etc.)
 * with proper error handling and parameter validation.
 */


/**
 * Executes a navigate action
 * @param {Object} actionConfig - Configuration for the navigate action
 * @param {Object} _hass - Home Assistant object (unused)
 * @param {Object} _config - Card configuration (unused)
 * @param {Object} _childCard - Child card element (unused)
 */
function executeNavigateAction(actionConfig, _hass, _config, _childCard) {
  const { fireEvent } = getDependencies();
  const path = actionConfig.navigation_path || '';
  const replace = actionConfig.navigation_replace === true;
  if (path) {
    // Only navigate if path is defined
    logDebug('ACTION', 'Navigating to:', path, { replace });
    if (replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
    fireEvent(window, 'location-changed', { replace });
  } else {
    logDebug('ACTION', 'Navigate action called without navigation_path');
  }
}

/**
 * Executes a toggle action
 * @param {Object} actionConfig - Configuration for the toggle action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 */
function executeToggleAction(actionConfig, hass, config, childCard) {
  const toggleEntity = getEntityId(actionConfig, config, childCard);
  if (toggleEntity) {
    logDebug('ACTION', 'Toggling entity:', toggleEntity);
    // homeassistant.toggle does not support locks, so use lock/unlock based on state
    if (toggleEntity.startsWith('lock.')) {
      const locked = hass.states?.[toggleEntity]?.state === 'locked';
      hass.callService('lock', locked ? 'unlock' : 'lock', { entity_id: toggleEntity });
      return;
    }
    hass.callService('homeassistant', 'toggle', { entity_id: toggleEntity });
  } else {
    logDebug('ACTION', 'Toggle action called without a valid entity_id');
  }
}

/**
 * Executes a service call action
 * @param {Object} actionConfig - Configuration for the service call action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 */
function executeServiceAction(actionConfig, hass, _config, _childCard) {
  if (!actionConfig.service) {
    logDebug('ACTION', 'Call-service action called without service defined');
    return;
  }
  const [domain, service] = actionConfig.service.split('.', 2);
  if (!domain || !service) {
    logDebug('ACTION', 'Invalid service format:', actionConfig.service);
    return;
  }
  // Use service_data or data for compatibility - CREATE A COPY
  const serviceData = { ...(actionConfig.service_data || actionConfig.data || {}) };
  // Target handling
  const target =
    actionConfig.target || (serviceData.entity_id ? { entity_id: serviceData.entity_id } : {});
  // Remove entity_id from serviceData if it's in target
  if (target.entity_id && serviceData.entity_id) delete serviceData.entity_id;

  logDebug('ACTION', 'Calling service:', `${domain}.${service}`, {
    serviceData,
    target
  });
  hass.callService(domain, service, serviceData, target);
}

/**
 * Executes a more-info action
 * @param {Object} actionConfig - Configuration for the more-info action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
function executeMoreInfoAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  const entityId = getEntityId(actionConfig, config, childCard);
  logDebug('ACTION', 'Executing more-info action for entity:', entityId);
  logDebug('ACTION', 'Action config:', actionConfig);

  if (entityId) {
    logDebug('ACTION', 'Showing more-info for entity:', entityId);
    fireEvent(element, 'hass-more-info', { entityId });
  } else {
    logDebug('ACTION', 'More-info action called without a valid entity_id');
  }
}

/**
 * Executes an assist action
 * @param {Object} actionConfig - Configuration for the assist action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
function executeAssistAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  logDebug('ACTION', 'Executing assist action', {
    pipeline_id: actionConfig.pipeline_id || 'last_used',
    start_listening: actionConfig.start_listening === true
  });
  fireEvent(element, 'assist', {
    pipeline_id: actionConfig.pipeline_id || 'last_used',
    start_listening: actionConfig.start_listening === true
  });
}

/**
 * Executes a DOM event action
 * @param {Object} actionConfig - Configuration for the DOM event action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
function executeDomEventAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  // Special handling for Browser Mod compatibility
  if (actionConfig.event_type === 'browser_mod' && actionConfig.event_data) {
    logDebug('ACTION', 'Firing Browser Mod compatible event:', actionConfig.event_data);
    // Browser Mod expects 'll-custom' events with browser_mod in detail
    fireEvent(element, 'll-custom', { browser_mod: actionConfig.event_data });
    return;
  }

  // Standard fire-dom-event handling
  if (actionConfig.event_type) {
    logDebug(
      'ACTION',
      'Firing DOM event:',
      actionConfig.event_type,
      actionConfig.event_data || null
    );
    fireEvent(element, actionConfig.event_type, actionConfig.event_data || null);
  } else {
    logDebug('ACTION', 'Fire-dom-event action called without event_type');
  }
}

/**
 * Action Execution Logic
 * Handles the orchestration of action execution including confirmation dialogs,
 * action validation, template processing, and integration with Home Assistant services.
 * Provides the main entry point for all action processing.
 *
 * Templates are pre-processed when hass updates to ensure synchronous execution
 * at action time, which is required for iOS popup blocker compatibility.
 */


/**
 * Action Executor Class
 * Manages the execution of different action types with confirmation and template support
 */
class ActionExecutor {
  constructor(element, hass, config, childCard) {
    this.element = element;
    this.config = config;
    this.childCard = childCard;
    this._lastActionTime = 0;

    // Cache for pre-processed action configs (templates already resolved)
    this._processedConfigs = {};
  }

  /**
   * Pre-process all action configs that contain templates
   * Called when hass updates to ensure URLs are ready when user taps
   * @param {Object} hass - Home Assistant object
   */
  async preProcessTemplates(hass) {
    if (!hass || !this.config) return;

    const actionTypes = [
      'tap_action',
      'hold_action',
      'double_tap_action',
      'swipe_left_action',
      'swipe_right_action',
      'swipe_up_action',
      'swipe_down_action'
    ];

    // Process each action config that has templates
    for (const actionType of actionTypes) {
      const actionConfig = this.config[actionType];
      if (actionConfig && objectContainsTemplates(actionConfig)) {
        try {
          this._processedConfigs[actionType] = await processTemplates(hass, actionConfig);
          logDebug(
            'ACTION',
            `Pre-processed templates for ${actionType}:`,
            this._processedConfigs[actionType]
          );
        } catch (e) {
          logDebug('ERROR', `Failed to pre-process ${actionType}:`, e);
          // Keep original config as fallback
          this._processedConfigs[actionType] = actionConfig;
        }
      } else {
        // No templates, use original config
        this._processedConfigs[actionType] = actionConfig;
      }
    }
  }

  /**
   * Handles different action types (tap, hold, double-tap, swipe)
   * Uses pre-processed configs for synchronous execution (iOS compatibility)
   * @param {string} actionType - Type of action to handle
   */
  handleAction(actionType = 'tap') {
    const actionKey = `${actionType}_action`;

    // Use pre-processed config if available, otherwise fall back to original
    const actionConfig = this._processedConfigs[actionKey] || this.config[actionKey];
    if (!actionConfig || actionConfig.action === 'none') return;

    logDebug('ACTION', `Handling ${actionType} action:`, actionConfig);

    if (actionConfig.confirmation) {
      this._showConfirmationDialog(actionConfig, actionKey);
    } else {
      this._executeActionSync(actionConfig);
    }
  }

  /**
   * Shows confirmation dialog for an action
   * @param {Object} actionConfig - Configuration for the action (already processed)
   * @param {string} actionKey - The action key for re-processing if needed
   * @private
   */
  _showConfirmationDialog(actionConfig, actionKey) {
    let confirmationText = 'Are you sure?';
    let confirmationTitle = undefined;
    let confirmText = 'Confirm';
    let dismissText = 'Cancel';

    if (typeof actionConfig.confirmation === 'object') {
      confirmationText = actionConfig.confirmation.text || confirmationText;
      confirmationTitle = actionConfig.confirmation.title;
      confirmText = actionConfig.confirmation.confirm_text || confirmText;
      dismissText = actionConfig.confirmation.dismiss_text || dismissText;
    } else if (typeof actionConfig.confirmation === 'string') {
      confirmationText = actionConfig.confirmation;
    }

    // Native <dialog>: does not depend on Home Assistant's internal components
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-label', confirmationTitle || confirmationText);
    Object.assign(dialog.style, {
      border: 'none',
      borderRadius: 'var(--ha-card-border-radius, 12px)',
      padding: '24px',
      maxWidth: 'min(420px, 90vw)',
      background: 'var(--card-background-color, #fff)',
      color: 'var(--primary-text-color, #000)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      fontFamily: 'var(--paper-font-body1_-_font-family, inherit)'
    });

    if (confirmationTitle) {
      const heading = document.createElement('h2');
      heading.textContent = confirmationTitle;
      heading.style.cssText = 'margin:0 0 12px;font-size:20px;font-weight:500;';
      dialog.appendChild(heading);
    }

    const content = document.createElement('div');
    content.textContent = confirmationText;
    content.style.cssText = 'margin-bottom:24px;white-space:pre-wrap;';
    dialog.appendChild(content);

    const makeButton = (label, primary) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      btn.setAttribute('aria-label', label);
      btn.style.cssText =
        'cursor:pointer;border:none;background:transparent;padding:10px 16px;font:inherit;' +
        'font-weight:500;text-transform:uppercase;border-radius:8px;' +
        `color:${primary ? 'var(--primary-color)' : 'var(--secondary-text-color)'};`;
      return btn;
    };

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;';
    const cancelButton = makeButton(dismissText, false);
    const confirmButton = makeButton(confirmText, true);
    actions.append(cancelButton, confirmButton);
    dialog.appendChild(actions);

    const close = () => {
      dialog.close();
      dialog.remove();
    };
    cancelButton.addEventListener('click', close);
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      close();
    });
    confirmButton.addEventListener('click', () => {
      close();
      // Re-fetch processed config in case it was updated
      const currentConfig = this._processedConfigs[actionKey] || actionConfig;
      this._executeActionSync(currentConfig);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
    confirmButton.focus();
  }

  /**
   * Executes the configured action SYNCHRONOUSLY
   * This is critical for iOS popup blocker compatibility - no async/await here!
   * @param {Object} actionConfig - Pre-processed configuration for the action
   * @private
   */
  _executeActionSync(actionConfig) {
    this._lastActionTime = Date.now();
    const hass = this.element.hass;
    if (!hass || !actionConfig.action) return;

    try {
      if (this.element._suppressChildCardEvents) {
        this.element._suppressChildCardEvents(300);
      }

      logDebug('ACTION', 'Executing action (sync):', actionConfig.action);

      switch (actionConfig.action) {
        case ACTION_TYPES.NAVIGATE:
          executeNavigateAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.URL:
          this._executeUrlAction(actionConfig);
          break;
        case ACTION_TYPES.TOGGLE:
          executeToggleAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.CALL_SERVICE:
          executeServiceAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.MORE_INFO:
          executeMoreInfoAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.ASSIST:
          executeAssistAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.FIRE_DOM_EVENT:
          executeDomEventAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        default:
          logDebug('ACTION', 'Unrecognized action:', actionConfig.action);
      }
    } catch (e) {
      console.error('ActionsCard: Error executing action:', actionConfig.action, e);
    }
  }

  /**
   * Execute URL action
   * @param {Object} actionConfig - Processed action configuration
   * @private
   */
  _executeUrlAction(actionConfig) {
    const url = actionConfig.url_path || '';
    const target = actionConfig.target || '_blank';

    if (!url) {
      logDebug('ACTION', 'URL action called without url_path');
      return;
    }

    // Security: only allow web (http/https), relative and mailto/tel links.
    // Blocks javascript:, data: and similar schemes.
    let parsed;
    try {
      parsed = new URL(url, window.location.href);
    } catch (e) {
      logDebug('ERROR', 'URL action blocked (invalid URL):', url);
      return;
    }
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      console.warn('ActionsCard: URL action blocked (unsupported scheme):', parsed.protocol);
      return;
    }

    logDebug('ACTION', 'Opening URL:', url, { target });

    if (target === '_blank') {
      // noopener/noreferrer stop the new page reaching back into this dashboard
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = parsed.href;
    }
  }

  /**
   * Get the last action execution time
   * @returns {number} Timestamp of last action
   */
  getLastActionTime() {
    return this._lastActionTime;
  }
}

function getCardStyles() {
  const { css } = getDependencies();

  return css`
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
  `;
}

/**
 * Actions Card - Main Component
 * A custom Home Assistant card that wraps another card and adds configurable
 * tap, hold, and double-tap actions. Supports various action types including
 * navigation, service calls, entity toggles, and more.
 *
 * Key Features:
 * - Wraps any existing card while preserving functionality
 * - Configurable tap, hold, and double-tap actions
 * - Action confirmation dialogs
 * - Prevention of default entity dialogs
 * - Robust error handling and fallback support
 */


/**
 * Actions Card - A custom card that wraps another card and adds tap, hold, and double tap actions
 *
 * @class ActionsCard
 * @extends {LitElement}
 */
class ActionsCard extends i {
  /**
   * Define properties for the card
   * @returns {Object} Properties for the component
   */
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _childCard: { type: Object, state: true } // Mark as state so changes trigger render
    };
  }

  /**
   * Return stub configuration for the visual editor preview
   * @returns {Object} Stub configuration
   */
  static getStubConfig() {
    return {
      card: null, // Start with no card defined for the preview state
      tap_action: { action: 'none' },
      hold_action: { action: 'none' },
      double_tap_action: { action: 'none' },
      prevent_default_dialog: false
    };
  }

  /**
   * Constructor for the Actions Card
   */
  constructor() {
    super();
    this._holdTimeout = null;
    this._clickTimeout = null;
    this._holdTriggered = false;
    this._clickCount = 0;
    this._lastActionTime = 0;
    this._childCard = null;
    this.config = {};
    this._childCardClickHandler = null;
    this._cardHelpers = null;
    this._actionExecutor = null;
    this._currentCardConfig = null;
    this._cardModConfig = null;

    // Add swipe tracking
    this._swipeStartTime = 0;
    this._swipeInProgress = false;
    this._isWindowTracked = false;
    this._processingPointerUp = false;
    this._isClickBlocked = false; // Block clicks after swipe
    this._clickBlockTimer = null; // Timer for click blocking

    // Bound handlers for window-level listeners
    this._boundOnPointerMove = this._onPointerMove.bind(this);
    this._boundOnPointerUp = this._onPointerUp.bind(this);
    this._boundPreventClick = this._preventClick.bind(this); // Bound click preventer

    // Progress indicator state
    this._holdProgressElement = null;
    this._holdCompleted = false;
    this._holdStartX = 0;
    this._holdStartY = 0;
    this._cancelDistance = 50; // pixels to move before canceling
    this._holdWithProgressCanceled = false; // Track if hold-with-progress was canceled
  }

  /**
   * Standard HA pattern: Use shouldUpdate to prevent unnecessary re-renders
   */
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  /**
   * Standard HA pattern: Use willUpdate for pre-update calculations
   */
  willUpdate(changedProps) {
    super.willUpdate(changedProps);

    // Update action executor when config or child card changes
    if (changedProps.has('config') || changedProps.has('_childCard')) {
      if (this._actionExecutor) {
        this._actionExecutor.config = this.config;
        this._actionExecutor.childCard = this._childCard;

        // Re-process templates when config changes
        if (this.hass) {
          this._actionExecutor.preProcessTemplates(this.hass);
        }
      }
    }

    // Handle hass changes for child card
    if (changedProps.has('hass') && this._childCard && this._childCard.hass !== this.hass) {
      try {
        this._childCard.hass = this.hass;
      } catch (e) {
        logDebug('ERROR', 'Error setting hass on child card:', e);
        // Recreate card if hass assignment fails
        if (this.config?.card) {
          this._createCardElement(this.config.card);
        }
      }
    }
  }

  /**
   * Load card helpers asynchronously
   * @private
   */
  async _loadCardHelpers() {
    if (!this._cardHelpers) {
      try {
        this._cardHelpers = await loadCardHelpers$1();
        logDebug('INIT', 'Card helpers loaded successfully');
      } catch (e) {
        logDebug('ERROR', 'Failed to load card helpers:', e);
      }
    }
  }

  /**
   * Set configuration for the card
   * @param {Object} config - Configuration object
   */
  setConfig(config) {
    logDebug('CONFIG', 'setConfig received:', JSON.stringify(config));

    this.config = config;

    // ADD THIS: Store card-mod configuration
    if (config.card_mod) {
      logDebug('CARD_MOD', 'Card-mod configuration detected', config.card_mod);
      this._cardModConfig = JSON.parse(JSON.stringify(config.card_mod));
    } else {
      this._cardModConfig = null;
    }

    this._actionExecutor = new ActionExecutor(this, null, this.config, this._childCard);

    // Pre-process templates if hass is already available
    if (this.hass) {
      this._actionExecutor.preProcessTemplates(this.hass);
    }

    if (config && config.card) {
      if (
        !this._childCard ||
        JSON.stringify(this._currentCardConfig) !== JSON.stringify(config.card)
      ) {
        this._currentCardConfig = JSON.parse(JSON.stringify(config.card));
        this._createCardElement(config.card).catch((e) => {
          logDebug('ERROR', 'Error in async card creation:', e);
        });
      }
    } else {
      this._childCard = null;
      this._currentCardConfig = null;
      this.requestUpdate();
    }
  }

  /**
   * Create the child card element based on the provided configuration
   * @param {Object} cardConfig - Configuration for the child card
   * @private
   */
  async _createCardElement(cardConfig) {
    if (!cardConfig) {
      this._childCard = null;
      this.requestUpdate();
      return;
    }

    try {
      const actualCardConfig = Array.isArray(cardConfig) ? cardConfig[0] : cardConfig;
      const cardType = actualCardConfig.type;

      if (!cardType) {
        throw new Error('Card configuration requires a `type`.');
      }

      const isCustomCard = cardType.startsWith('custom:');

      if (isCustomCard) {
        logDebug('INIT', `Creating custom card directly: ${cardType}`);
        await this._createCardElementDirect(actualCardConfig);
        return;
      }

      // Try card helpers first for standard HA cards
      const element = await this._tryCreateWithCardHelpers(actualCardConfig);
      if (element) {
        await this._finalizeCardElement(element, cardType);
      } else {
        await this._createCardElementDirect(actualCardConfig);
      }
    } catch (e) {
      logDebug('ERROR', 'Error creating child card element:', e, cardConfig);
      this._createErrorCard(e.message, cardConfig);
    }

    this.requestUpdate();
  }

  /**
   * Attempt to create card element using card helpers
   * @param {Object} cardConfig - Card configuration
   * @returns {Promise<HTMLElement|null>} Created element or null if failed
   * @private
   */
  async _tryCreateWithCardHelpers(cardConfig) {
    try {
      if (!this._cardHelpers) {
        await this._loadCardHelpers();
      }

      if (this._cardHelpers) {
        logDebug('INIT', `Creating card using helpers: ${cardConfig.type}`);
        return await this._cardHelpers.createCardElement(cardConfig);
      }
    } catch (helperError) {
      logDebug(
        'INIT',
        `Card helpers failed for ${cardConfig.type}, falling back to direct method:`,
        helperError
      );
    }
    return null;
  }

  /**
   * Finalize card element setup after creation
   * @param {HTMLElement} element - Created card element
   * @param {string} cardType - Type of card created
   * @private
   */
  async _finalizeCardElement(element, cardType) {
    if (this.hass) {
      element.hass = this.hass;
    }

    this._childCard = element;
    logDebug('INIT', 'Child card created/updated using card helpers:', cardType);

    if (this._actionExecutor) {
      this._actionExecutor.childCard = this._childCard;
    }

    await this._applyDialogPrevention();

    // Force card_mod re-scan after child card creation
    setTimeout(() => {
      this._triggerCardModRefresh();
    }, 100);
  }

  /**
   * Apply dialog prevention after card is ready
   * @private
   */
  async _applyDialogPrevention() {
    await this.updateComplete;

    setTimeout(() => {
      if (this.config && this.config.prevent_default_dialog) {
        this._preventDefaultDialogs();
      }
    }, UI_CONSTANTS.DIALOG_PREVENTION_DELAY);
  }

  /**
   * Create card element using direct DOM method (for custom cards and fallback)
   * @param {Object} cardConfig - Configuration for the child card
   * @param {number} retryCount - Current retry attempt (for preventing infinite loops)
   * @private
   */
  async _createCardElementDirect(cardConfig, retryCount = 0) {
    const cardType = cardConfig.type;

    // Prevent infinite retries
    if (retryCount > UI_CONSTANTS.MAX_CARD_CREATION_RETRIES) {
      logDebug('ERROR', `Failed to create card element after 10 retries: ${cardType}`);
      this._createErrorCard(`Failed to create card: ${cardType}`, cardConfig);
      return;
    }

    const elementTag = cardType.startsWith('custom:')
      ? cardType.substring(7)
      : `hui-${cardType}-card`;

    // Create the element directly
    const element = document.createElement(elementTag);

    // Check if the element has setConfig before proceeding (with retry logic)
    if (typeof element.setConfig !== 'function') {
      if (retryCount < 5) {
        // Limit retries to 5 for setConfig
        logDebug(
          'INIT',
          `Element ${elementTag} created but setConfig not available, retry ${retryCount + 1}/5`
        );
        setTimeout(
          () => this._createCardElementDirect(cardConfig, retryCount + 1),
          UI_CONSTANTS.CARD_CREATION_RETRY_DELAY
        );
        return;
      } else {
        logDebug('ERROR', `Element ${elementTag} does not have setConfig method after 5 retries`);
        this._createErrorCard(`Card type ${cardType} is not available`, cardConfig);
        return;
      }
    }

    try {
      // Set config and hass
      element.setConfig(cardConfig);
      if (this.hass) {
        element.hass = this.hass;
      }

      // Update the internal state
      this._childCard = element;
      logDebug('INIT', 'Child card created/updated directly:', elementTag);

      // Update action executor with new child card
      if (this._actionExecutor) {
        this._actionExecutor.childCard = this._childCard;
      }

      // Apply dialog prevention AFTER child card is ready
      await this.updateComplete;

      // Add a small delay to ensure child card is fully initialized
      setTimeout(() => {
        if (this.config && this.config.prevent_default_dialog) {
          this._preventDefaultDialogs();
        }

        // Force card_mod re-scan after child card creation
        this._triggerCardModRefresh();
      }, 50);
    } catch (error) {
      logDebug('ERROR', `Error setting up card element: ${cardType}`, error);
      this._createErrorCard(`Error setting up card: ${error.message}`, cardConfig);
    }
  }

  /**
   * Creates an error card
   * @param {string} errorMessage - The error message to display
   * @param {Object} origConfig - The original configuration
   * @private
   */
  _createErrorCard(errorMessage, origConfig) {
    try {
      const errorCard = document.createElement('hui-error-card');
      errorCard.setConfig({
        type: 'error',
        error: errorMessage,
        origConfig: origConfig
      });
      if (this.hass) {
        errorCard.hass = this.hass;
      }
      this._childCard = errorCard;
    } catch (e) {
      // Last resort fallback
      const errorCard = document.createElement('div');
      const alert = document.createElement('ha-alert');
      alert.setAttribute('alert-type', 'error');
      alert.textContent = `Error: ${errorMessage}`;
      errorCard.appendChild(alert);
      this._childCard = errorCard;
    }

    // Update action executor with new child card
    if (this._actionExecutor) {
      this._actionExecutor.childCard = this._childCard;
    }

    this.requestUpdate();
  }

  /**
   * Handle click events (in addition to pointer events)
   * @param {Event} ev - Click event
   * @private
   */
  _onClick(ev) {
    // Only prevent default when explicitly configured to do so
    if (this.config.prevent_default_dialog) {
      logDebug('EVENT', 'Preventing default click behavior');
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  /**
   * Prevents click events from reaching child card after swipe
   * @param {Event} e - Click event to prevent
   * @private
   */
  _preventClick(e) {
    if (this._isClickBlocked || this._swipeInProgress) {
      logDebug('ACTION', 'Click prevented after swipe gesture');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  }

  /**
   * Blocks clicks for a specified duration
   * @param {number} duration - Duration to block clicks in milliseconds
   * @private
   */
  _blockClicksTemporarily(duration = 300) {
    this._isClickBlocked = true;

    if (this._clickBlockTimer) {
      clearTimeout(this._clickBlockTimer);
    }

    this._clickBlockTimer = setTimeout(() => {
      this._isClickBlocked = false;
      this._clickBlockTimer = null;
      logDebug('ACTION', 'Click blocking period ended');
    }, duration);

    logDebug('ACTION', `Blocking clicks for ${duration}ms`);
  }

  /**
   * Enhanced method to prevent default dialogs from the wrapped card
   * Sets up comprehensive event interception to block click, tap, and hass-more-info events
   * that would normally trigger entity information dialogs. Uses capture phase event handling
   * and applies to both the main element and any nested interactive elements.
   * @private
   */
  _preventDefaultDialogs() {
    if (!this._childCard || !this.config.prevent_default_dialog) return;

    // Clean up any existing handler first
    this._cleanupDefaultDialogPrevention();

    // Create a more comprehensive event handler
    this._childCardClickHandler = (ev) => {
      logDebug('EVENT', 'Intercepting child card event:', ev.type);

      // Prevent all default behaviors that might show dialogs
      if (ev.type === 'hass-more-info' || ev.type === 'click' || ev.type === 'tap') {
        logDebug('EVENT', 'Preventing default dialog/action for:', ev.type);
        ev.stopPropagation();
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
    };

    // Apply handlers more comprehensively
    const setupPrevention = () => {
      if (this._childCard) {
        // Handle multiple event types that could trigger dialogs
        const eventTypes = ['hass-more-info', 'click', 'tap'];

        eventTypes.forEach((eventType) => {
          // Add to main element
          this._childCard.addEventListener(eventType, this._childCardClickHandler, {
            capture: true,
            passive: false
          });

          // Add to shadow root if available
          if (this._childCard.shadowRoot) {
            this._childCard.shadowRoot.addEventListener(eventType, this._childCardClickHandler, {
              capture: true,
              passive: false
            });
          }
        });

        // Also handle nested interactive elements
        const interactiveElements = this._childCard.querySelectorAll('*');
        interactiveElements.forEach((element) => {
          eventTypes.forEach((eventType) => {
            element.addEventListener(eventType, this._childCardClickHandler, {
              capture: true,
              passive: false
            });
          });
        });
      }

      logDebug('INIT', 'Enhanced event prevention setup completed');
    };

    // Set up prevention with retries for timing issues
    const trySetup = (attempts = 0) => {
      if (attempts > 5) {
        logDebug('INIT', 'Max attempts reached for dialog prevention setup');
        return;
      }

      try {
        setupPrevention();
      } catch (e) {
        logDebug('INIT', `Dialog prevention setup attempt ${attempts + 1} failed, retrying...`);
        setTimeout(() => trySetup(attempts + 1), 100);
      }
    };

    // Initial setup
    trySetup();

    // Also retry after a longer delay to catch late-loading elements
    setTimeout(() => trySetup(), 500);
  }

  /**
   * Enhanced cleanup for default dialog prevention
   * @private
   */
  _cleanupDefaultDialogPrevention() {
    if (this._childCard && this._childCardClickHandler) {
      const eventTypes = ['hass-more-info', 'click', 'tap'];

      eventTypes.forEach((eventType) => {
        this._childCard.removeEventListener(eventType, this._childCardClickHandler, true);

        if (this._childCard.shadowRoot) {
          this._childCard.shadowRoot.removeEventListener(
            eventType,
            this._childCardClickHandler,
            true
          );
        }
      });

      // Clean up nested elements
      try {
        const interactiveElements = this._childCard.querySelectorAll('*');
        interactiveElements.forEach((element) => {
          eventTypes.forEach((eventType) => {
            element.removeEventListener(eventType, this._childCardClickHandler, true);
          });
        });
      } catch (e) {
        // Ignore cleanup errors
      }

      this._childCardClickHandler = null;
    }
  }

  /**
   * Update hass object and propagate to child card
   * @param {Object} hass - Home Assistant object
   */
  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    if (this._childCard && this._childCard.hass !== hass) {
      try {
        this._childCard.hass = hass;
      } catch (e) {
        logDebug('ERROR', 'Error setting hass on child card:', e);
        // If setting hass fails, might need to recreate the card
        if (this.config && this.config.card) {
          this._createCardElement(this.config.card);
        }
      }
    }

    // Pre-process templates when hass changes
    // This ensures URLs are resolved before user taps (required for iOS)
    if (this._actionExecutor && hass) {
      this._actionExecutor.preProcessTemplates(hass);
    }

    // Request update if hass object itself changed, even if references inside are the same
    if (oldHass !== hass) {
      this.requestUpdate();
    }
  }

  /**
   * Get the hass object
   * @returns {Object} Home Assistant object
   */
  get hass() {
    return this._hass;
  }

  /**
   * Return the card size for proper layout
   * @returns {number} Card size
   */
  getCardSize() {
    // If showing preview, return a moderate size
    if (!this._childCard) {
      return 3;
    }

    // Use HA helper if available
    if (typeof computeCardSize === 'function') {
      return computeCardSize(this._childCard);
    }

    // Otherwise, delegate to the child card if possible
    if (this._childCard && typeof this._childCard.getCardSize === 'function') {
      try {
        return this._childCard.getCardSize();
      } catch (e) {
        logDebug('ACTION', 'Could not get card size from child', e);
        return 1; // Fallback size
      }
    }
    return 1; // Default size
  }

  /**
   * Lifecycle method when component is updated
   * @param {Map} changedProperties - Map of changed properties
   */
  updated(changedProperties) {
    super.updated(changedProperties);

    // Apply card-mod styles when config changes
    if (changedProperties.has('config') && this._cardModConfig) {
      this._applyCardModStyles();
    }

    // Handle child card DOM insertion/removal
    if (changedProperties.has('_childCard')) {
      const wrapper = this.shadowRoot?.querySelector('.card-wrapper');
      if (wrapper) {
        // Remove old child card if it exists
        const oldCard = wrapper.querySelector(':scope > *');
        if (oldCard && oldCard !== this._childCard) {
          wrapper.removeChild(oldCard);
        }

        // Add new child card if it exists and isn't already in the wrapper
        if (this._childCard && !wrapper.contains(this._childCard)) {
          wrapper.appendChild(this._childCard);
        }
      }
    }

    // Only call _preventDefaultDialogs if the child card has actually changed
    if (
      changedProperties.has('_childCard') &&
      this._childCard &&
      this.config &&
      this.config.prevent_default_dialog
    ) {
      // Add a small delay to ensure child card is fully rendered
      setTimeout(() => {
        this._preventDefaultDialogs();
      }, 100);
    }

    // Update action executor when things change
    if (changedProperties.has('config') || changedProperties.has('_childCard')) {
      if (this._actionExecutor) {
        this._actionExecutor.config = this.config;
        this._actionExecutor.childCard = this._childCard;
      }
    }
  }

  /**
   * Lifecycle method when component is connected to DOM
   */
  connectedCallback() {
    super.connectedCallback();

    // Ensure card helpers are loaded when connected
    if (!this._cardHelpers) {
      this._loadCardHelpers();
    }

    // Apply card-mod styles when connected to DOM
    if (this._cardModConfig) {
      this._applyCardModStyles();
    }
  }

  /**
   * Lifecycle method when component is disconnected from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupDefaultDialogPrevention();

    // Clean up progress indicator
    this._hideHoldProgress();

    // Clean up window listeners
    window.removeEventListener('pointermove', this._boundOnPointerMove);
    window.removeEventListener('pointerup', this._boundOnPointerUp);

    // Clean up click block timer
    if (this._clickBlockTimer) {
      clearTimeout(this._clickBlockTimer);
      this._clickBlockTimer = null;
    }
  }

  /**
   * Handles different action types (tap, hold, double-tap)
   * @param {string} actionType - Type of action to handle ('tap', 'hold', 'double_tap')
   * @private
   */
  _handleAction(actionType = 'tap') {
    if (this._actionExecutor) {
      this._actionExecutor.handleAction(actionType);
    }
  }

  /**
   * Reset the internal state for action handling
   * Clears all pending timeouts and resets click/hold tracking variables to prevent
   * stale state from interfering with subsequent interactions. Critical for preventing
   * action conflicts between nested actions-cards.
   * @param {Event} ev - Event that triggered the reset (optional)
   * @private
   */
  _resetState(ev) {
    if (ev) ev.stopPropagation();

    // Clean up window-level listeners
    if (this._isWindowTracked) {
      window.removeEventListener('pointermove', this._boundOnPointerMove);
      window.removeEventListener('pointerup', this._boundOnPointerUp);
      this._isWindowTracked = false;
    }

    clearTimeout(this._holdTimeout);
    clearTimeout(this._clickTimeout);
    this._holdTimeout = null;
    this._clickTimeout = null;
    this._holdTriggered = false;
    this._clickCount = 0;
    this._swipeInProgress = false;
    this._swipeStartTime = 0;
    this._pointerType = null;
    this._processingPointerUp = false;
    // Clean up hold progress
    this._hideHoldProgress();
    this._holdCompleted = false;
    this._holdStartX = 0;
    this._holdStartY = 0;
    this._holdWithProgressCanceled = false;

    // Note: Don't clear _isClickBlocked here - let the timer handle it
  }

  /**
   * Create and show the hold progress indicator with circular ring
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {
   * number} duration - Hold duration in ms
   * @private
   */
  _showHoldProgress(x, y, duration) {
    // Remove any existing indicator
    this._hideHoldProgress();

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const size = isTouchDevice
      ? UI_CONSTANTS.PROGRESS_INDICATOR_SIZE_TOUCH
      : UI_CONSTANTS.PROGRESS_INDICATOR_SIZE;

    // Read CSS variables from the card element
    const computedStyle = getComputedStyle(this);

    // Progress color
    const progressColor =
      computedStyle.getPropertyValue('--actions-card-hold-progress-color').trim() ||
      computedStyle.getPropertyValue('--primary-color').trim() ||
      '#03a9f4';

    // Inactive color (defaults to progress color if not set)
    const inactiveColor =
      computedStyle.getPropertyValue('--actions-card-hold-progress-inactive-color').trim() ||
      progressColor;

    // Opacities
    const inactiveOpacity =
      computedStyle.getPropertyValue('--actions-card-hold-progress-inactive-opacity').trim() ||
      '0.2';
    const progressOpacity =
      computedStyle.getPropertyValue('--actions-card-hold-progress-opacity').trim() || '1';

    // Width
    const progressWidth =
      parseInt(computedStyle.getPropertyValue('--actions-card-hold-progress-width').trim()) || 4;

    const radius = size / 2 - progressWidth / 2;
    const circumference = 2 * Math.PI * radius;

    // Create container element
    this._holdProgressElement = document.createElement('div');
    this._holdProgressElement.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
    `;

    // Create SVG using innerHTML with computed values
    this._holdProgressElement.innerHTML = `
      <svg width="${size}" height="${size}" style="display: block;">
        <!-- Inactive circle -->
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          fill="none"
          stroke="${inactiveColor}"
          stroke-width="${progressWidth}"
          opacity="${inactiveOpacity}"
        />
        <!-- Progress circle -->
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          fill="none"
          stroke="${progressColor}"
          stroke-width="${progressWidth}"
          stroke-linecap="round"
          opacity="${progressOpacity}"
          transform="rotate(-90 ${size / 2} ${size / 2})"
          style="
            stroke-dasharray: ${circumference};
            stroke-dashoffset: ${circumference};
            transition: stroke-dashoffset ${duration}ms linear;
          "
        />
      </svg>
    `;

    document.body.appendChild(this._holdProgressElement);

    // Trigger animation on next frame to ensure CSS transition works
    const progressCircle = this._holdProgressElement.querySelector('circle:last-child');
    requestAnimationFrame(() => {
      progressCircle.style.strokeDashoffset = '0';
    });

    logDebug(
      'ACTION',
      'Hold progress indicator shown - color:',
      progressColor,
      'inactive:',
      inactiveColor,
      'width:',
      progressWidth,
      'inactive opacity:',
      inactiveOpacity,
      'progress opacity:',
      progressOpacity
    );
  }

  /**
   * Apply card-mod styles to the component
   * @private
   */
  _applyCardModStyles() {
    if (!this._cardModConfig || !this._cardModConfig.style) {
      return;
    }

    logDebug('CARD_MOD', 'Applying card-mod styles to actions-card');

    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      logDebug('ERROR', 'No shadow root available for card-mod');
      return;
    }

    // Create or update card-mod style element
    let styleElement = shadowRoot.querySelector('#actions-card-mod-styles');

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'actions-card-mod-styles';
      shadowRoot.appendChild(styleElement);
    }

    styleElement.textContent = this._cardModConfig.style;
    logDebug('CARD_MOD', 'Card-mod styles applied successfully');
  }

  /**
   * Hide and remove the hold progress indicator
   * @private
   */
  _hideHoldProgress() {
    if (this._holdProgressElement) {
      this._holdProgressElement.remove();
      this._holdProgressElement = null;
    }
  }

  /**
   * Check if pointer has moved beyond cancel distance
   * @param {number} currentX - Current X coordinate
   * @param {number} currentY - Current Y coordinate
   * @returns {boolean} True if moved too far
   * @private
   */
  _hasMovedTooFar(currentX, currentY) {
    const deltaX = currentX - this._holdStartX;
    const deltaY = currentY - this._holdStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance > this._cancelDistance;
  }

  /**
   * Handle pointer down event for action handling
   * @param {Event} ev - Pointer down event
   * @private
   */
  _onPointerDown(ev) {
    // Allow interaction with elements inside the child card (e.g., sliders, buttons)
    const interactiveTags = [
      'INPUT',
      'BUTTON',
      'SELECT',
      'TEXTAREA',
      'A',
      'HA-SLIDER',
      'HA-SWITCH',
      'PAPER-SLIDER',
      'PAPER-BUTTON',
      'MWC-BUTTON'
    ];
    let targetElement = ev.target;
    while (targetElement && targetElement !== this) {
      if (
        interactiveTags.includes(targetElement.tagName) ||
        targetElement.hasAttribute('actions-card-interactive')
      ) {
        logDebug('ACTION', 'Pointer down ignored (interactive element):', targetElement.tagName);
        return;
      }
      targetElement = targetElement.parentElement || targetElement.getRootNode().host;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Pointer down ignored (not primary button)');
      return;
    }

    ev.stopPropagation();
    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._swipeStartTime = Date.now();
    this._swipeInProgress = false;
    this._pointerType = ev.pointerType;

    // Track hold start position for progress indicator
    this._holdStartX = ev.clientX;
    this._holdStartY = ev.clientY;
    this._holdCompleted = false;
    this._holdWithProgressCanceled = false; // Reset cancel flag

    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;

    // Attach window-level listeners for mouse to track movement outside element
    if (ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Attaching pointermove/pointerup listeners to window');
      this._isWindowTracked = true;
      window.addEventListener('pointermove', this._boundOnPointerMove);
      window.addEventListener('pointerup', this._boundOnPointerUp);
    } else {
      this._isWindowTracked = false;
    }

    if (this.config.hold_action && this.config.hold_action.action !== 'none') {
      logDebug('ACTION', 'Starting hold timer');
      const holdTime = this.config.hold_action.hold_time || 500;
      const showProgress = this.config.hold_action.show_progress || false;

      // Show progress indicator if enabled
      if (showProgress) {
        this._showHoldProgress(ev.clientX, ev.clientY, holdTime);
      }

      this._holdTimeout = window.setTimeout(() => {
        if (Math.abs(ev.clientX - this._startX) < 10 && Math.abs(ev.clientY - this._startY) < 10) {
          if (showProgress) {
            // Fire on release mode: mark as completed but don't fire yet
            this._holdCompleted = true;
            logDebug('ACTION', 'Hold completed, waiting for release');
          } else {
            // Immediate fire mode: existing behavior
            this._holdTriggered = true;
            this._handleAction('hold');
            this._clickCount = 0;
          }
        } else {
          logDebug('ACTION', 'Hold canceled (moved too much)');
          this._hideHoldProgress();
          this._resetState();
        }
      }, holdTime);
    }
  }

  /**
   * Handle pointer up event for action handling
   * @param {Event} ev - Pointer up event
   * @private
   */
  _onPointerUp(ev) {
    // Prevent double-processing if both window and element handlers fire
    if (this._processingPointerUp) {
      logDebug('ACTION', 'Pointer up already being processed, ignoring duplicate');
      return;
    }

    // If this is element-level pointerup during a window-tracked gesture, ignore it
    if (this._isWindowTracked && ev.currentTarget !== window) {
      logDebug('ACTION', 'Element-level pointer up ignored (window-tracked gesture)');
      return;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Pointer up ignored (not primary button)');
      return;
    }

    // Set processing lock
    this._processingPointerUp = true;

    // Remove window-level listeners if they were added
    if (this._pointerType === 'mouse' && this._isWindowTracked) {
      logDebug('ACTION', 'Removing pointermove/pointerup listeners from window');
      window.removeEventListener('pointermove', this._boundOnPointerMove);
      window.removeEventListener('pointerup', this._boundOnPointerUp);
      this._isWindowTracked = false;
    }

    ev.stopPropagation();

    if (this.config.prevent_default_dialog) {
      ev.preventDefault();
    }

    const deltaX = ev.clientX - this._startX;
    const deltaY = ev.clientY - this._startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Hide progress indicator
    this._hideHoldProgress();

    clearTimeout(this._holdTimeout);

    // If hold-with-progress was in progress (completed or canceled), don't process as tap
    if (
      this.config.hold_action?.show_progress &&
      (this._holdCompleted || this._holdWithProgressCanceled)
    ) {
      if (this._holdCompleted && !this._hasMovedTooFar(ev.clientX, ev.clientY)) {
        logDebug('ACTION', 'Hold action fired on release');
        this._handleAction('hold');
      } else if (this._holdWithProgressCanceled || this._hasMovedTooFar(ev.clientX, ev.clientY)) {
        logDebug('ACTION', 'Hold action canceled - released outside bounds');
        // Suppress child card events when hold is canceled
        this._suppressChildCardEvents(300);
      }
      this._resetState();
      // Clear processing lock after reset
      setTimeout(() => {
        this._processingPointerUp = false;
      }, 10);
      return;
    }

    if (this._holdTriggered) {
      logDebug('ACTION', 'Tap/swipe canceled (hold already triggered)');
      this._resetState();
      return;
    }

    // Check for swipe first (takes precedence over tap if movement is significant)
    const swipeDirection = this._detectSwipe(
      this._startX,
      this._startY,
      ev.clientX,
      ev.clientY,
      this._swipeStartTime,
      ev.target
    );

    if (swipeDirection) {
      const swipeActionKey = `swipe_${swipeDirection}_action`;
      if (this.config[swipeActionKey] && this.config[swipeActionKey].action !== 'none') {
        logDebug('ACTION', `Swipe detected: ${swipeDirection}`);
        this._swipeInProgress = true;

        // Stop event propagation immediately to prevent child card from responding
        ev.stopImmediatePropagation();

        // Block clicks BEFORE handling the action
        this._blockClicksTemporarily(300);

        // Always suppress child card events during swipe, regardless of prevent_default_dialog setting
        // This prevents the child card from opening its own dialogs
        this._suppressChildCardEvents(300);

        // Now execute the configured swipe action
        this._handleAction(`swipe_${swipeDirection}`);

        this._resetState();
        return;
      }
    }

    // If no swipe or swipe not configured, check for tap/double-tap
    const moved = distance > 10;

    if (moved && !swipeDirection) {
      logDebug('ACTION', 'Movement detected but no swipe action configured');
      this._resetState();
      return;
    }

    if (moved) {
      this._resetState();
      return;
    }

    // It's a potential tap or double tap
    this._clickCount++;
    logDebug('ACTION', `Click count: ${this._clickCount}`);

    if (this.config.prevent_default_dialog) {
      this._suppressChildCardEvents(300);
    }

    if (this.config.double_tap_action && this.config.double_tap_action.action !== 'none') {
      if (this._clickCount === 1) {
        logDebug('ACTION', 'Waiting for potential second tap');
        this._clickTimeout = window.setTimeout(() => {
          if (this._clickCount === 1 && !this._holdTriggered) {
            logDebug('ACTION', 'Single tap confirmed (after double-tap timeout)');
            if (this.config.tap_action?.action !== 'none') {
              this._handleAction('tap');
            }
          }
          this._resetState();
        }, 250); // Standard 250ms timeout for double-tap
      } else if (this._clickCount === 2) {
        logDebug('ACTION', 'Double tap detected');
        clearTimeout(this._clickTimeout); // This is the crucial line that was missing/incorrect.
        this._clickTimeout = null;
        this._handleAction('double_tap');
        this._resetState();
      }
    } else {
      // If double-tap is not configured, any click is a single tap
      logDebug('ACTION', 'Single tap (double tap not configured)');
      if (this.config.tap_action?.action !== 'none') {
        this._handleAction('tap');
      }
      this._resetState();
    }

    // Clear the processing lock after a very short delay
    setTimeout(() => {
      this._processingPointerUp = false;
    }, 10);
  }

  /**
   * Handle pointer move event (only called for window-level mouse tracking)
   * @param {Event} ev - Pointer move event
   * @private
   */
  _onPointerMove(ev) {
    // Cancel hold if moved too much
    const deltaX = ev.clientX - this._startX;
    const deltaY = ev.clientY - this._startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 10 && this._holdTimeout) {
      clearTimeout(this._holdTimeout);
      this._holdTimeout = null;
      this._hideHoldProgress();
      // Suppress child card events when hold is canceled
      this._suppressChildCardEvents(300);
      logDebug('ACTION', 'Hold canceled during move');
    }

    // Check if moved outside cancel bounds during hold progress
    if (this._holdProgressElement && this._hasMovedTooFar(ev.clientX, ev.clientY)) {
      clearTimeout(this._holdTimeout);
      this._holdTimeout = null;
      this._holdCompleted = false;
      this._holdWithProgressCanceled = true;
      this._hideHoldProgress();
      // Suppress child card events when hold is canceled
      this._suppressChildCardEvents(300);
      logDebug('ACTION', 'Hold canceled - moved outside bounds');
    }
  }

  /**
   * Temporarily suppresses events on the child card to prevent conflicts during action execution
   * This prevents the child card from responding to events that might interfere with our custom actions.
   * Events are suppressed for a short duration and then automatically restored.
   * @param {number} duration - Duration in milliseconds to suppress events
   * @private
   */
  _suppressChildCardEvents(duration) {
    if (!this._childCard) return;

    const suppressHandler = (e) => {
      logDebug('EVENT', 'Suppressing child card event:', e.type);
      e.stopPropagation();
      e.preventDefault();
    };

    // Add event listeners to suppress various events
    const eventTypes = ['click', 'tap', 'hass-more-info'];
    eventTypes.forEach((eventType) => {
      this._childCard.addEventListener(eventType, suppressHandler, {
        capture: true
      });

      // Also try shadow root if available
      if (this._childCard.shadowRoot) {
        this._childCard.shadowRoot.addEventListener(eventType, suppressHandler, { capture: true });
      }
    });

    // Remove suppression after duration
    setTimeout(() => {
      eventTypes.forEach((eventType) => {
        this._childCard.removeEventListener(eventType, suppressHandler, {
          capture: true
        });

        if (this._childCard.shadowRoot) {
          this._childCard.shadowRoot.removeEventListener(eventType, suppressHandler, {
            capture: true
          });
        }
      });
    }, duration);
  }

  /**
   * Handle edit button click in preview mode
   * @param {Event} e - Click event
   * @private
   */
  _handleEditClick(e) {
    e.stopPropagation();
    logDebug('EDITOR', 'Edit button clicked, firing show-edit-card event');
    fireEvent(this, 'show-edit-card', { element: this });
  }

  /**
   * Trigger card-mod to process the child card
   * @private
   */
  _triggerCardModRefresh() {
    if (window.cardmod) {
      window.cardmod.process_card?.(this._childCard);
    }
    this.dispatchEvent(
      new CustomEvent('card-mod-refresh', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Detect swipe direction from pointer movement
   * @param {number} startX - Starting X coordinate
   * @param {number} startY - Starting Y coordinate
   * @param {number} endX - Ending X coordinate
   * @param {number} endY - Ending Y coordinate
   * @param {number} startTime - Swipe start timestamp
   * @param {HTMLElement} target - Event target for scrollable check
   * @returns {string|null} Swipe direction or null
   * @private
   */
  _detectSwipe(startX, startY, endX, endY, startTime, target) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Date.now() - startTime;

    // Check if swipe meets minimum distance
    if (distance < 20) {
      logDebug('ACTION', 'Movement too short for swipe:', distance);
      return null;
    }

    // Check if swipe completed within maximum duration
    if (duration > 1000) {
      logDebug('ACTION', 'Movement too slow for swipe:', duration);
      return null;
    }

    // Check if target element or ancestor is scrollable
    const scrollableInfo = this._isScrollableElement(target);

    // Determine direction based on dominant axis
    if (absX > absY) {
      // Horizontal swipe
      if (scrollableInfo.horizontal) {
        logDebug('ACTION', 'Horizontal swipe blocked by scrollable element');
        return null;
      }
      return deltaX > 0 ? 'right' : 'left';
    } else {
      // Vertical swipe
      if (scrollableInfo.vertical) {
        logDebug('ACTION', 'Vertical swipe blocked by scrollable element');
        return null;
      }
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  /**
   * Check if element or ancestor is scrollable
   * @param {HTMLElement} element - Element to check
   * @returns {Object} Object with horizontal and vertical scrollable flags
   * @private
   */
  _isScrollableElement(element) {
    let current = element;
    const result = { horizontal: false, vertical: false };

    while (current && current !== this) {
      const style = window.getComputedStyle(current);
      const overflowX = style.overflowX;
      const overflowY = style.overflowY;

      // Check for horizontal scrolling
      if (
        (overflowX === 'scroll' || overflowX === 'auto') &&
        current.scrollWidth > current.clientWidth
      ) {
        result.horizontal = true;
      }

      // Check for vertical scrolling
      if (
        (overflowY === 'scroll' || overflowY === 'auto') &&
        current.scrollHeight > current.clientHeight
      ) {
        result.vertical = true;
      }

      current = current.parentElement || current.getRootNode()?.host;
    }

    return result;
  }

  /**
   * Render the card UI
   * @returns {TemplateResult} HTML template
   */
  render() {
    if (!this.hass) {
      return x``;
    }

    if (!this.config || !this.config.card) {
      return x`
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
      `;
    }

    this.style.height = '100%';

    const hasActions =
      this.config.tap_action?.action !== 'none' ||
      this.config.hold_action?.action !== 'none' ||
      this.config.double_tap_action?.action !== 'none' ||
      this.config.swipe_left_action?.action !== 'none' ||
      this.config.swipe_right_action?.action !== 'none' ||
      this.config.swipe_up_action?.action !== 'none' ||
      this.config.swipe_down_action?.action !== 'none';

    const wrapperStyle = `cursor: ${hasActions ? 'pointer' : 'default'}; display: block; height: 100%;`;

    return x`
      <div
        class="card-wrapper"
        @pointerdown="${this._onPointerDown}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._resetState}"
        @click="${this._boundPreventClick}"
        @contextmenu="${(e) => {
          if (this.config.hold_action) e.preventDefault();
        }}"
        style="${wrapperStyle}"
        aria-label="${hasActions ? 'Interactive card with actions' : ''}"
        role="${hasActions ? 'button' : ''}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      ></div>
    `;
  }

  /**
   * Define CSS styles for the card
   * @returns {CSSResult} CSS styles
   */
  static get styles() {
    return getCardStyles();
  }
}

function getEditorStyles() {
  const { css } = getDependencies();

  return css`
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
  `;
}

/**
 * Constants for Actions Card
 * Shared constants to avoid circular dependencies
 */

const CARD_VERSION = '1.7.0';

/**
 * Actions Card Editor Component
 * Enhanced visual editor for configuring Actions Card instances in Home Assistant.
 * Provides intuitive UI for selecting wrapped cards, configuring actions, and setting up
 * confirmation dialogs. Handles complex card picker integration and configuration management.
 *
 * Key Features:
 * - Interactive card picker for selecting cards to wrap
 * - Configuration UI for all action types and their parameters
 * - Live preview and editing capabilities
 * - Robust event handling to prevent editor conflicts
 * - Support for action confirmation dialogs
 */


/**
 * Enhanced editor for Actions Card
 *
 * @class ActionsCardEditor
 * @extends {LitElement}
 */
class ActionsCardEditor extends i {
  /**
   * Define properties for the editor
   * @returns {Object} Properties for the component
   */
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
      lovelace: { type: Object },
      _actionsExpanded: { type: Boolean, state: true },
      _swipeActionsExpanded: { type: Boolean, state: true }
    };
  }

  /**
   * Constructor for the editor
   */
  constructor() {
    super();
    // Generate a unique ID for this editor instance
    this._editorId = `actions-card-editor-${Math.random().toString(36).substring(2, 15)}`;
    this._boundHandleCardPicked = this._handleCardPicked.bind(this);

    // Track if we're in an editor dialog to prevent premature closure
    this._inEditorDialog = false;

    // Track active child editor dialogs
    this._activeChildEditors = new Set();

    // Track if we should show picker after card removal - CARD PICKER FIX
    this._showPickerAfterRemoval = false;

    // Add debouncing for card picker loading
    this._cardPickerLoadingDebounce = null;
    this._cardPickerRetryCount = 0;

    // Initialize expansion panel states - Actions open by default
    this._actionsExpanded = false;
    this._swipeActionsExpanded = false;
  }

  /**
   * Standard HA pattern: Use shouldUpdate to prevent unnecessary re-renders
   */
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  async connectedCallback() {
    super.connectedCallback();
    logDebug('EDITOR', 'Editor connected to DOM');

    // Ensure card picker is loaded before proceeding
    await this._ensureComponentsLoaded();

    // Call _ensureCardPickerLoaded after a short delay to ensure shadowRoot is ready
    // Use debounced version to prevent multiple calls
    setTimeout(() => this._debouncedEnsureCardPickerLoaded(), 1000);

    // Try to detect if we're in an editor dialog
    let parent = this.parentNode;
    while (parent) {
      if (parent.localName === 'hui-dialog-edit-card') {
        this._inEditorDialog = true;
        parent._hostingActionsCardEditor = true;
        logDebug('EDITOR', "Detected we're inside an editor dialog");
        break;
      }
      parent = parent.parentNode || (parent.getRootNode && parent.getRootNode().host);
    }

    // Setup global handlers to prevent editor dialog closure
    this._setupGlobalHandlers();
  }

  // Add comprehensive component loading
  async _ensureComponentsLoaded() {
    const maxAttempts = 10;
    let attempts = 0;

    // First, try to load via existing cards (more reliable)
    while (!customElements.get('hui-card-picker') && attempts < maxAttempts) {
      await this._loadCustomElements();
      if (!customElements.get('hui-card-picker')) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        attempts++;
      }
    }

    // If still not loaded, try alternative approach
    if (!customElements.get('hui-card-picker')) {
      logDebug('EDITOR', 'Primary loading failed, trying alternative approach');
      await this._tryAlternativeLoading();
    }

    if (!customElements.get('hui-card-picker')) {
      logDebug('EDITOR', 'All loading attempts failed, card picker may not be available');
    } else {
      logDebug('EDITOR', 'Successfully loaded hui-card-picker');
    }
  }

  async _loadCustomElements() {
    if (customElements.get('hui-card-picker')) {
      return; // Already loaded
    }

    try {
      // Try to load through existing Home Assistant mechanisms
      const loadAttempts = [
        () => this._tryLoadViaExistingCards(),
        () => this._forceLoadCardPicker()
      ];

      for (const attempt of loadAttempts) {
        try {
          await attempt();
          if (customElements.get('hui-card-picker')) {
            logDebug('EDITOR', 'Component loaded successfully');
            return;
          }
        } catch (e) {
          // Silent fail and try next method
        }
      }
    } catch (e) {
      logDebug('EDITOR', 'Error in _loadCustomElements:', e);
    }
  }

  async _tryLoadViaExistingCards() {
    const cardTypes = [
      'hui-entities-card',
      'hui-conditional-card',
      'hui-vertical-stack-card',
      'hui-horizontal-stack-card',
      'hui-grid-card',
      'hui-map-card'
    ];

    for (const cardType of cardTypes) {
      try {
        const cardElement = customElements.get(cardType);
        if (cardElement && cardElement.getConfigElement) {
          await cardElement.getConfigElement();
          if (customElements.get('hui-card-picker')) {
            return;
          }
        }
      } catch (e) {
        // Continue to next card type
      }
    }
  }

  async _tryAlternativeLoading() {
    try {
      // Try to access Lovelace directly
      if (window.loadCardHelpers) {
        const helpers = await window.loadCardHelpers();
        if (helpers && customElements.get('hui-card-picker')) {
          return;
        }
      }

      // Try to trigger via temporary element creation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = '<hui-card-picker></hui-card-picker>';
      document.body.appendChild(tempDiv);
      await new Promise((resolve) => setTimeout(resolve, 100));
      document.body.removeChild(tempDiv);
    } catch (e) {
      logDebug('EDITOR', 'Alternative loading failed:', e);
    }
  }

  async _forceLoadCardPicker() {
    try {
      // Last resort: try to manually define if possible
      if (!customElements.get('hui-card-picker')) {
        // Trigger a UI refresh that might load missing components
        const event = new CustomEvent('hass-refresh', {
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (e) {
      // Final fallback failed
    }
  }

  _debouncedEnsureCardPickerLoaded() {
    // If we're showing picker after removal, don't debounce - show immediately
    if (this._showPickerAfterRemoval) {
      this._ensureCardPickerLoaded();
      return;
    }

    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
    }

    this._cardPickerLoadingDebounce = setTimeout(() => {
      this._ensureCardPickerLoaded();
    }, 500); // Increased from 100ms to 500ms
  }

  async _ensureCardPickerLoaded() {
    if (!this.shadowRoot || this._config?.card) return;

    const container = this.shadowRoot.querySelector('#card-picker-container');
    if (!container) {
      this.requestUpdate();
      return;
    }

    // Simplified picker creation without complex retry logic
    let picker = container.querySelector('hui-card-picker');
    if (!picker) {
      picker = document.createElement('hui-card-picker');
      picker.hass = this.hass;
      picker.lovelace = this.lovelace;
      container.appendChild(picker);
    }
  }

  /**
   * Setup global event handlers to prevent dialog closure during editing
   * Creates comprehensive event interception to mark events as processed by this editor,
   * preventing parent dialogs from inappropriately closing during configuration.
   * Handles search inputs, configuration changes, and other editor interactions.
   * @private
   */
  _setupGlobalHandlers() {
    // Create handler to mark our events
    this._globalEventHandler = (e) => {
      // Check if this event is from our editor
      if (e.target && this.shadowRoot && this.shadowRoot.contains(e.target)) {
        // Mark it as processed by actions card editor
        logDebug('EVENT', `Marking ${e.type} event as processed by actions card editor`);
        e._processedByActionsCardEditor = true;

        // For specific events that might cause problems, stop propagation
        if (
          e.type === 'keydown' ||
          e.type === 'input' ||
          e.type === 'change' ||
          e.type === 'config-changed'
        ) {
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
      }

      // Special handling for search input events
      if (e.type === 'keydown' || e.type === 'input') {
        const isSearchInput =
          e.target.tagName === 'INPUT' &&
          (e.target.type === 'search' || e.target.placeholder?.includes('Search'));
        if (isSearchInput) {
          // Mark search events specifically
          logDebug('EVENT', `Marking ${e.type} search input event as processed`);
          e._isSearchInput = true;
          e._processedByActionsCardEditor = true;
          // Prevent these events from bubbling to parent editors
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
      }
    };

    // Add handlers for various event types
    const eventTypes = ['keydown', 'input', 'change', 'click', 'config-changed'];
    eventTypes.forEach((type) => {
      document.addEventListener(type, this._globalEventHandler, {
        capture: true
      });
    });

    logDebug('EDITOR', 'Global event handlers setup completed');
  }

  /**
   * Cleanup when component is disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    // Clear any pending debounced calls
    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
      this._cardPickerLoadingDebounce = null;
    }

    // Reset retry count
    this._cardPickerRetryCount = 0;

    // Clean up global handlers
    if (this._globalEventHandler) {
      const eventTypes = ['keydown', 'input', 'change', 'click', 'config-changed'];
      eventTypes.forEach((type) => {
        document.removeEventListener(type, this._globalEventHandler, {
          capture: true
        });
      });
    }

    // Clean up any open dialogs
    if (this._activeChildEditors) {
      this._activeChildEditors.forEach((dialog) => {
        if (dialog.parentNode) {
          try {
            dialog.parentNode.removeChild(dialog);
          } catch (error) {
            console.warn('Error removing dialog:', error);
          }
        }
      });
      this._activeChildEditors.clear();
    }

    logDebug('EDITOR', 'Editor disconnected from DOM and events cleaned up');
  }

  /**
   * Sets the configuration for the editor
   * @param {Object} config - The configuration object
   */
  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    logDebug('CONFIG', 'Editor setConfig received:', JSON.stringify(config));
    this._config = JSON.parse(JSON.stringify(config));

    if (!this._config.card) {
      setTimeout(() => this._ensureCardPickerLoaded(), 50);
    }
  }

  /**
   * Clean configuration by removing actions with default values
   * @param {Object} config - Configuration to clean
   * @returns {Object} Cleaned configuration
   * @private
   */
  _cleanConfig(config) {
    const cleaned = { ...config };

    // List of action keys to check
    const actionKeys = [
      'tap_action',
      'hold_action',
      'double_tap_action',
      'swipe_left_action',
      'swipe_right_action',
      'swipe_up_action',
      'swipe_down_action'
    ];

    // Remove actions that are set to 'none' or are default values
    actionKeys.forEach((key) => {
      if (cleaned[key]) {
        // Remove if action is 'none' and no other properties
        if (cleaned[key].action === 'none' && Object.keys(cleaned[key]).length === 1) {
          delete cleaned[key];
        }
        // Also remove if it's an empty object
        else if (Object.keys(cleaned[key]).length === 0) {
          delete cleaned[key];
        }
      }
    });

    // Remove prevent_default_dialog if it's false (default value)
    if (cleaned.prevent_default_dialog === false) {
      delete cleaned.prevent_default_dialog;
    }

    return cleaned;
  }

  /**
   * Clean up action configuration by removing properties not relevant to the action type
   * Ensures configuration objects only contain valid properties for their action type,
   * preventing invalid configurations and improving storage efficiency.
   * @param {Object} actionConfig - Current action configuration
   * @param {string} actionType - New action type
   * @param {string} actionOption - The action option being modified (tap_action, hold_action, etc.)
   * @returns {Object} Cleaned action configuration
   * @private
   */
  _cleanActionConfig(actionConfig, actionType, actionOption) {
    // Define which properties are valid for each action type
    const validProperties = {
      none: [],
      navigate: ['navigation_path', 'navigation_replace'],
      url: ['url_path', 'target'],
      toggle: ['entity'],
      'more-info': ['entity'],
      'call-service': ['service', 'service_data'],
      assist: ['pipeline_id', 'start_listening'],
      'fire-dom-event': ['event_type', 'event_data']
    };

    // Properties that are valid for all action types
    const commonProperties = ['action', 'confirmation'];

    // Add hold_time and show_progress for hold actions
    if (actionOption === 'hold_action') {
      commonProperties.push('hold_time', 'show_progress');
    }

    const allowedProperties = [...commonProperties, ...(validProperties[actionType] || [])];

    // Create new config with only allowed properties
    const cleanedConfig = {};
    Object.keys(actionConfig).forEach((key) => {
      if (allowedProperties.includes(key)) {
        cleanedConfig[key] = actionConfig[key];
      }
    });

    return cleanedConfig;
  }

  /**
   * Handles value changes in the editor
   * @param {Event} ev - The change event
   * @private
   */
  _valueChanged(ev) {
    // Mark this event as processed
    ev._processedByActionsCardEditor = true;
    ev.stopPropagation();

    if (!this._config || !ev.target) return;
    const target = ev.target;
    const option = target.configValue || target.getAttribute('data-option');
    const parentOption =
      target.parentElement?.configValue || target.parentElement?.getAttribute('data-option');
    const finalOption = option || parentOption;
    if (!finalOption) return;

    const key = target.configAttribute || target.getAttribute('data-attribute');

    // Handle action updates
    if (option && option.includes('_action')) {
      const actionConfig = { ...(this._config[option] || {}) };

      if (key) {
        // Handle specific property updates
        // Check for ha-switch or checkbox
        if (target.type === 'checkbox' || target.tagName === 'HA-SWITCH') {
          actionConfig[key] = target.checked;
        } else {
          // For entity pickers and other components, prioritize ev.detail.value
          actionConfig[key] =
            ev.detail && 'value' in ev.detail ? (ev.detail.value ?? '') : (target.value ?? '');
        }

        logDebug('CONFIG', `Updating ${option}:`, actionConfig);
        this._config = { ...this._config, [option]: actionConfig };
      } else {
        // Handle action type changes - clean up irrelevant properties
        const newActionType = ev.detail?.value ?? target.value;
        if (newActionType === actionConfig.action) return;
        const cleanedConfig = this._cleanActionConfig(actionConfig, newActionType, option);
        cleanedConfig.action = newActionType;

        logDebug('CONFIG', `Updating ${option} with cleanup:`, cleanedConfig);
        this._config = { ...this._config, [option]: cleanedConfig };
      }
    } else if (option) {
      // Handle regular options
      let value;
      // UPDATED: Check for ha-switch or checkbox
      if (ev.detail && 'value' in ev.detail) {
        value = ev.detail.value;
      } else if (target.type === 'checkbox') {
        value = target.checked;
      } else {
        value = target.value;
      }

      logDebug('CONFIG', `Updating ${option}:`, value);
      this._config = { ...this._config, [option]: value };
    }

    // Fire config changed with special flags to prevent editor closure
    this._fireConfigChangedWithFlags();
  }

  /**
   * Fires the config-changed event with special flags to prevent editor conflicts
   * Uses custom event properties to identify events from this editor and prevent
   * unwanted dialog closure or configuration conflicts with parent editors.
   * Includes direct dialog updating when in editor dialog context.
   * @private
   */
  _fireConfigChangedWithFlags() {
    if (!this._config) return;

    // Clean the config before firing the event
    const cleanedConfig = this._cleanConfig(this._config);

    // Use HA standard event firing
    fireEvent(this, 'config-changed', {
      config: cleanedConfig,
      editorId: this._editorId,
      fromActionCardEditor: true,
      preventDialogClose: true,
      inEditorDialog: this._inEditorDialog
    });

    // If in dialog, dispatch a more controlled event to update the parent config
    if (this._inEditorDialog) {
      let parent = this.parentNode;
      let dialog = null;
      while (parent) {
        if (parent.localName === 'hui-dialog-edit-card') {
          dialog = parent;
          break;
        }
        parent = parent.parentNode || (parent.getRootNode && parent.getRootNode().host);
      }

      if (dialog && typeof dialog._updateConfig === 'function') {
        logDebug('EVENT', 'Directly updating dialog config');
        try {
          dialog._updateConfig(cleanedConfig);
        } catch (e) {
          console.error('Error updating dialog config:', e);
        }
      }
    }
  }

  /**
   * Fires the config-changed event
   * This is the original method, kept for compatibility
   * @private
   */
  _fireConfigChanged() {
    if (!this._config) return;

    // Use HA standard event firing
    fireEvent(this, 'config-changed', {
      config: this._config,
      editorId: this._editorId,
      fromActionCardEditor: true,
      inEditorDialog: this._inEditorDialog,
      preventDialogClose: true
    });

    logDebug('EVENT', 'Firing config-changed event with config:', this._config);
  }

  /**
   * Handles card selection from the picker
   * @param {Event} ev - The selection event
   * @private
   */
  _handleCardPicked(ev) {
    // Mark this event as processed
    if (ev._processedByActionsCardEditor === undefined) {
      ev._processedByActionsCardEditor = true;
    }

    // If this is from our own picker, handle it normally
    if (!ev.detail?.editorId || ev.detail.editorId === this._editorId) {
      const newCardConfig = ev.detail.config;
      logDebug('EDITOR', 'Card picked:', newCardConfig);
      this._config = {
        ...this._config,
        card: newCardConfig
      };

      // Use the safer method to fire config changed
      this._fireConfigChangedWithFlags();
      this.requestUpdate();
    }

    // Stop event propagation to prevent editor issues
    if (ev.stopPropagation) ev.stopPropagation();
  }

  /**
   * Handle expansion panel changes for accordion behavior
   * @param {string} panelName - Name of the panel ('actions' or 'swipe')
   * @param {Event} e - Expanded changed event
   * @private
   */
  _handlePanelExpanded(panelName, e) {
    e.stopPropagation();
    const isExpanded = e.detail.value;

    if (!isExpanded) {
      // Panel is collapsing - just update state
      if (panelName === 'actions') {
        this._actionsExpanded = false;
      } else if (panelName === 'swipe') {
        this._swipeActionsExpanded = false;
      }

      // Remove focus to clear the highlight color
      if (e.target && e.target.blur) {
        e.target.blur();
      }

      return;
    }

    // Panel is expanding - implement accordion behavior
    // Close ALL panels first (like todo-swipe-card does)
    this._actionsExpanded = false;
    this._swipeActionsExpanded = false;

    // Then open the requested one
    if (panelName === 'actions') {
      this._actionsExpanded = true;
    } else if (panelName === 'swipe') {
      this._swipeActionsExpanded = true;
    }

    // Force a complete re-render
    this.requestUpdate();

    // Also schedule another update to ensure panels sync properly
    setTimeout(() => {
      this.requestUpdate();
    }, 10);
  }

  /**
   * Opens the edit dialog for the wrapped card
   * @private
   */
  async _editWrappedCard() {
    if (!this._config?.card) {
      logDebug('ERROR', 'No card to edit');
      return;
    }

    const cardConfig = this._config.card;
    const hass = this.hass;
    const mainApp = document.querySelector('home-assistant');

    if (!hass || !mainApp) {
      logDebug('ERROR', 'Cannot find Home Assistant instance');
      return;
    }

    try {
      await customElements.whenDefined('hui-dialog-edit-card');

      const dialog = document.createElement('hui-dialog-edit-card');
      dialog.hass = hass;

      // Track this dialog for proper lifecycle management
      this._activeChildEditors.add(dialog);

      // Add dialog to body before setting properties
      document.body.appendChild(dialog);

      // Handle dialog cleanup properly
      const handleDialogClose = (_e) => {
        dialog.removeEventListener('dialog-closed', handleDialogClose);

        this._activeChildEditors.delete(dialog);

        if (dialog.parentNode === document.body) {
          try {
            document.body.removeChild(dialog);
          } catch (error) {
            logDebug('EDITOR', 'Dialog already removed or not found:', error);
          }
        }

        // Ensure card picker is visible after edit
        setTimeout(() => this._ensureCardPickerLoaded(), 100);
      };

      dialog.addEventListener('dialog-closed', handleDialogClose);

      // Using saveCardConfig instead of saveConfig
      const dialogParams = {
        cardConfig: cardConfig,
        lovelaceConfig: this.lovelace || mainApp.lovelace,
        saveCardConfig: async (savedCardConfig) => {
          if (!savedCardConfig) return;

          // Update wrapped card
          logDebug('CONFIG', 'Updating wrapped card with saved config:', savedCardConfig);
          this._config = {
            ...this._config,
            card: savedCardConfig
          };

          // Fire regular config changed event
          this._fireConfigChanged();
          this.requestUpdate();
        }
      };

      // Use the dialog.showDialog method
      await dialog.showDialog(dialogParams);
    } catch (err) {
      logDebug('ERROR', 'Error opening edit dialog:', err);

      // Fallback method - IMPORTANT: Also using saveCardConfig here
      fireEvent(this, 'll-show-dialog', {
        dialogTag: 'hui-dialog-edit-card',
        dialogImport: () => import('hui-dialog-edit-card'),
        dialogParams: {
          cardConfig: cardConfig,
          lovelaceConfig: this.lovelace || mainApp.lovelace,
          saveCardConfig: (savedCardConfig) => {
            if (!savedCardConfig) return;

            this._config = {
              ...this._config,
              card: savedCardConfig
            };

            this._fireConfigChanged();
            this.requestUpdate();
          }
        }
      });
    }
  }

  _removeWrappedCard() {
    if (!this._config) return;

    logDebug('EDITOR', 'Removing wrapped card');
    const updatedConfig = { ...this._config };
    delete updatedConfig.card;

    this._config = updatedConfig;

    // Set flag to show picker after removal
    this._showPickerAfterRemoval = true;

    // Clear any pending debounced calls and reset retry count
    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
      this._cardPickerLoadingDebounce = null;
    }
    this._cardPickerRetryCount = 0;

    this._fireConfigChangedWithFlags();

    // Force a full re-render first
    this.requestUpdate();

    // Then ensure card picker is loaded after the render completes
    this.updateComplete.then(() => {
      setTimeout(() => {
        logDebug('EDITOR', 'Forcing card picker load after card removal');
        this._ensureCardPickerLoaded();
      }, 100);
    });
  }

  // Add method to check if picker should be shown
  _shouldShowCardPicker() {
    // Show picker when no card is configured
    const noCard = !this._config?.card;

    // Show if we're explicitly showing after removal
    const showAfterRemoval = this._showPickerAfterRemoval;

    // Show if we have a config but no card
    const hasConfigButNoCard =
      this._config && Object.keys(this._config).length > 0 && !this._config.card;

    const shouldShow = noCard && (showAfterRemoval || hasConfigButNoCard || !this._config);

    logDebug('EDITOR', 'Should show card picker:', {
      noCard,
      showAfterRemoval,
      hasConfigButNoCard,
      shouldShow
    });

    return shouldShow;
  }

  /**
   * Renders the action type selection dropdown
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The dropdown template
   * @private
   */
  _renderActionTypeDropdown(actionType, actionConfig) {
    const title =
      {
        tap_action: 'Tap Action',
        hold_action: 'Hold Action',
        double_tap_action: 'Double Tap Action'
      }[actionType] || actionType.replace(/_/g, ' ');

    return x`
      <div class="option-row">
        <div class="option-label">${title}</div>
        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              mode: 'dropdown',
              options: ACTION_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))
            }
          }}
          .value=${actionConfig.action || 'none'}
          data-option="${actionType}"
          @value-changed=${this._valueChanged}
        ></ha-selector>
      </div>
    `;
  }

  /**
   * Renders the detail configuration for different action types
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The detail configuration template
   * @private
   */
  _renderActionDetails(actionType, actionConfig) {
    if (!actionConfig || actionConfig.action === 'none' || !actionConfig.action) {
      return x``;
    }

    switch (actionConfig.action) {
      case 'navigate':
        return x`
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ text: {} }}
              .label=${'Navigation Path'}
              .value=${actionConfig.navigation_path || ''}
              data-option="${actionType}"
              data-attribute="navigation_path"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
          <div class="option-row">
            <div class="option-label">Replace history state</div>
            <ha-selector
              .hass=${this.hass}
              .selector=${{ boolean: {} }}
              .value=${actionConfig.navigation_replace || false}
              data-option="${actionType}"
              data-attribute="navigation_replace"
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
        `;
      case 'url':
        return x`
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ text: {} }}
              .label=${'URL'}
              .value=${actionConfig.url_path || ''}
              data-option="${actionType}"
              data-attribute="url_path"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .label=${'Open in'}
              .selector=${{
                select: {
                  mode: 'dropdown',
                  options: [
                    { value: '_blank', label: 'New tab' },
                    { value: '_self', label: 'Same tab' }
                  ]
                }
              }}
              .value=${actionConfig.target || '_blank'}
              data-option="${actionType}"
              data-attribute="target"
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
        `;
      case 'toggle':
      case 'more-info':
        return x`
          <div class="config-row">
            <ha-selector
              .selector=${{ entity: {} }}
              .label=${'Entity'}
              .hass=${this.hass}
              .value=${actionConfig.entity || ''}
              data-option="${actionType}"
              data-attribute="entity"
              @value-changed=${this._valueChanged}
            ></ha-selector>
            <div class="help-text">
              Optional: Leave empty to use the entity from the wrapped card
            </div>
          </div>
        `;
      case 'call-service':
        return x`
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ text: {} }}
              .label=${'Service'}
              .value=${actionConfig.service || ''}
              data-option="${actionType}"
              data-attribute="service"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
          <div class="config-row yaml-editor-container" data-action-type="${actionType}">
            <ha-yaml-editor
              .hass=${this.hass}
              label="Service Data"
              .defaultValue=${actionConfig.service_data || {}}
              @value-changed=${(e) => {
                e._processedByActionsCardEditor = true;
                e.stopPropagation();

                if (!e.detail || e.detail.value === undefined) return;
                if (!e.detail.isValid) return;

                const newConfig = { ...this._config };
                newConfig[actionType] = {
                  ...newConfig[actionType],
                  service_data: e.detail.value
                };
                this._config = newConfig;
                this._fireConfigChangedWithFlags();
              }}
            ></ha-yaml-editor>
          </div>
        `;
      case 'assist':
        return x`
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ text: {} }}
              .label=${'Pipeline ID (optional)'}
              .value=${actionConfig.pipeline_id || ''}
              data-option="${actionType}"
              data-attribute="pipeline_id"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
          <div class="option-row">
            <div class="option-label">Start listening immediately</div>
            <ha-selector
              .hass=${this.hass}
              .selector=${{ boolean: {} }}
              .value=${actionConfig.start_listening || false}
              data-option="${actionType}"
              data-attribute="start_listening"
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
        `;
      case 'fire-dom-event':
        return x`
          <div class="config-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ text: {} }}
              .label=${'Event Type'}
              .value=${actionConfig.event_type || ''}
              data-option="${actionType}"
              data-attribute="event_type"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
          <div class="config-row yaml-editor-container" data-action-type="${actionType}">
            <ha-yaml-editor
              .hass=${this.hass}
              label="Event Data (optional)"
              .defaultValue=${actionConfig.event_data || {}}
              @value-changed=${(e) => {
                e._processedByActionsCardEditor = true;
                e.stopPropagation();

                if (!e.detail || e.detail.value === undefined) return;
                if (!e.detail.isValid) return;

                const newConfig = { ...this._config };
                newConfig[actionType] = {
                  ...newConfig[actionType],
                  event_data: e.detail.value
                };
                this._config = newConfig;
                this._fireConfigChangedWithFlags();
              }}
            ></ha-yaml-editor>
          </div>
        `;
      default:
        return x``;
    }
  }

  /**
   * Render the swipe actions configuration section
   * @returns {TemplateResult} Swipe actions configuration template
   * @private
   */
  _renderSwipeActionsConfiguration() {
    // Use || for safe defaults when rendering
    const swipeLeftAction = this._config.swipe_left_action || { action: 'none' };
    const swipeRightAction = this._config.swipe_right_action || { action: 'none' };
    const swipeUpAction = this._config.swipe_up_action || { action: 'none' };
    const swipeDownAction = this._config.swipe_down_action || { action: 'none' };

    return x`
      <ha-expansion-panel
        .expanded=${this._swipeActionsExpanded}
        @expanded-changed=${(e) => {
          e.stopPropagation();
          this._handlePanelExpanded('swipe', e);
        }}
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
            ${this._renderActionTypeDropdown('swipe_left_action', swipeLeftAction)}
            ${this._renderActionDetails('swipe_left_action', swipeLeftAction)}
            ${this._renderConfirmationConfig('swipe_left_action', swipeLeftAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-right" style="margin-right: 8px;"></ha-icon>
              Swipe Right
            </div>
            ${this._renderActionTypeDropdown('swipe_right_action', swipeRightAction)}
            ${this._renderActionDetails('swipe_right_action', swipeRightAction)}
            ${this._renderConfirmationConfig('swipe_right_action', swipeRightAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-up" style="margin-right: 8px;"></ha-icon>
              Swipe Up
            </div>
            ${this._renderActionTypeDropdown('swipe_up_action', swipeUpAction)}
            ${this._renderActionDetails('swipe_up_action', swipeUpAction)}
            ${this._renderConfirmationConfig('swipe_up_action', swipeUpAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-down" style="margin-right: 8px;"></ha-icon>
              Swipe Down
            </div>
            ${this._renderActionTypeDropdown('swipe_down_action', swipeDownAction)}
            ${this._renderActionDetails('swipe_down_action', swipeDownAction)}
            ${this._renderConfirmationConfig('swipe_down_action', swipeDownAction)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  /**
   * Renders the confirmation options for an action
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The confirmation configuration template
   * @private
   */
  _renderConfirmationConfig(actionType, actionConfig) {
    if (!actionConfig || actionConfig.action === 'none' || !actionConfig.action) {
      return x``;
    }

    const hasConfirmation = !!actionConfig.confirmation;
    const confirmationConfig =
      typeof actionConfig.confirmation === 'object'
        ? actionConfig.confirmation
        : hasConfirmation
          ? { text: actionConfig.confirmation }
          : {};

    return x`
      <div class="option-row confirmation-row">
        <div class="option-label">Require confirmation</div>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ boolean: {} }}
          .value=${hasConfirmation}
          @value-changed=${(e) => {
            e._processedByActionsCardEditor = true;
            const newConfig = { ...this._config };
            newConfig[actionType] = {
              ...newConfig[actionType],
              confirmation: e.detail.value ? { text: 'Are you sure?' } : false
            };
            this._config = newConfig;
            this._fireConfigChangedWithFlags();
            this.requestUpdate();
          }}
        ></ha-selector>
      </div>

      ${hasConfirmation
        ? x`
            <div class="confirmation-config">
              <div class="config-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ text: {} }}
                  .label=${'Confirmation Text'}
                  .value=${confirmationConfig.text || 'Are you sure?'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @value-changed=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.text = e.detail.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-selector>
              </div>
              <div class="config-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ text: {} }}
                  .label=${'Confirmation Title (optional)'}
                  .value=${confirmationConfig.title || ''}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @value-changed=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.title = e.detail.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-selector>
              </div>
              <div class="config-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ text: {} }}
                  .label=${'Confirm Button Text'}
                  .value=${confirmationConfig.confirm_text || 'Confirm'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @value-changed=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.confirm_text = e.detail.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-selector>
              </div>
              <div class="config-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ text: {} }}
                  .label=${'Cancel Button Text'}
                  .value=${confirmationConfig.dismiss_text || 'Cancel'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @value-changed=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.dismiss_text = e.detail.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-selector>
              </div>
            </div>
          `
        : ''}
    `;
  }

  /**
   * Renders the hold action timing configuration
   * @param {Object} holdAction - The hold action configuration
   * @returns {TemplateResult} The hold time configuration template
   * @private
   */
  _renderHoldTimeConfig(holdAction) {
    if (!holdAction || holdAction.action === 'none') {
      return x``;
    }

    return x`
      <div class="config-row">
        <ha-selector
          .hass=${this.hass}
          .selector=${{
            number: { mode: 'box', min: 100, max: 2000, step: 100, unit_of_measurement: 'ms' }
          }}
          .label=${'Hold Time (ms)'}
          .value=${holdAction.hold_time || 500}
          data-option="hold_action"
          data-attribute="hold_time"
          @keydown=${(e) => {
            e._processedByActionsCardEditor = true;
          }}
          @value-changed=${this._valueChanged}
        ></ha-selector>
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
        <ha-selector
          .hass=${this.hass}
          .selector=${{ boolean: {} }}
          .value=${holdAction.show_progress || false}
          data-option="hold_action"
          data-attribute="show_progress"
          @value-changed=${this._valueChanged}
        ></ha-selector>
      </div>
    `;
  }

  /**
   * Render the editor UI
   * @returns {TemplateResult} The template to render
   */
  render() {
    if (!this.hass || !this._config) {
      return x`<ha-circular-progress active alt="Loading editor"></ha-circular-progress>`;
    }

    return x`
      <div class="card-config" @keydown=${(e) => (e._processedByActionsCardEditor = true)}>
        ${this._renderInfoPanel()} ${this._renderCardManagement()} ${this._renderCardPicker()}
        ${this._renderGeneralOptions()} ${this._renderActionsConfiguration()}
        ${this._renderSwipeActionsConfiguration()} ${this._renderFooter()}
      </div>
    `;
  }

  /**
   * Render the information panel
   * @returns {TemplateResult} Info panel template
   * @private
   */
  _renderInfoPanel() {
    return x`
      <div class="info-panel">
        <div class="info-icon">i</div>
        <div class="info-text">
          This card wraps another card to add tap, hold, double-tap actions and/or swipe actions.
          First, select a card to wrap below, then configure the actions you want to enable.
        </div>
      </div>
    `;
  }

  /**
   * Render the card management section
   * @returns {TemplateResult} Card management template
   * @private
   */
  _renderCardManagement() {
    const hasCard = !!this._config.card;
    const cardDescriptor = hasCard
      ? getCardDescriptor(this._config.card)
      : { typeName: '', name: '' };

    return x`
      <div class="section">
        <div class="section-header">Wrapped Card</div>

        ${!hasCard
          ? x`
              <div class="no-card">
                <div class="no-card-message">
                  No card selected. Use the card picker below to choose a card to wrap.
                </div>
              </div>
            `
          : x`
              <div class="card-row">
                <div class="card-info">
                  <span class="card-type">${cardDescriptor.typeName}</span>
                  ${cardDescriptor.name
                    ? x`<span class="card-name">(${cardDescriptor.name})</span>`
                    : ''}
                </div>
                <div class="card-actions">
                  <ha-icon-button
                    label="Edit Card"
                    path="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                    @click=${() => this._editWrappedCard()}
                  ></ha-icon-button>
                  <ha-icon-button
                    label="Delete Card"
                    path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    @click=${() => this._removeWrappedCard()}
                    style="color: var(--error-color);"
                  ></ha-icon-button>
                </div>
              </div>
            `}
      </div>
    `;
  }

  /**
   * Render the card picker section
   * @returns {TemplateResult} Card picker template
   * @private
   */
  _renderCardPicker() {
    const hasCard = !!this._config.card;

    if (hasCard || !this._shouldShowCardPicker()) {
      return x``;
    }

    return x`
      <div id="card-picker-container">
        <hui-card-picker
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          @config-changed=${this._boundHandleCardPicked}
          label="Pick a card to wrap"
        ></hui-card-picker>
      </div>
    `;
  }

  /**
   * Render the general options section
   * @returns {TemplateResult} General options template
   * @private
   */
  _renderGeneralOptions() {
    return x`
      <div class="section">
        <div class="section-header">General Options</div>

        <div class="option-row">
          <div class="option-label">
            Prevent Default Entity Dialog
            <div class="option-description">
              When enabled, prevents the default entity information dialog from opening
            </div>
          </div>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ boolean: {} }}
            .value=${this._config.prevent_default_dialog || false}
            @value-changed=${(e) => {
              e._processedByActionsCardEditor = true;
              const newConfig = { ...this._config };
              newConfig.prevent_default_dialog = e.detail.value;
              this._config = newConfig;
              this._fireConfigChangedWithFlags();
            }}
          ></ha-selector>
        </div>
      </div>
    `;
  }

  /**
   * Render the actions configuration section
   * @returns {TemplateResult} Actions configuration template
   * @private
   */
  _renderActionsConfiguration() {
    // Use || for safe defaults when rendering
    const tapAction = this._config.tap_action || { action: 'none' };
    const holdAction = this._config.hold_action || { action: 'none' };
    const doubleTapAction = this._config.double_tap_action || { action: 'none' };

    return x`
      <ha-expansion-panel
        .expanded=${this._actionsExpanded}
        @expanded-changed=${(e) => {
          e.stopPropagation();
          this._handlePanelExpanded('actions', e);
        }}
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
            ${this._renderActionTypeDropdown('tap_action', tapAction)}
            ${this._renderActionDetails('tap_action', tapAction)}
            ${this._renderConfirmationConfig('tap_action', tapAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap-hold" style="margin-right: 8px;"></ha-icon>
              Hold Action
            </div>
            ${this._renderActionTypeDropdown('hold_action', holdAction)}
            ${this._renderActionDetails('hold_action', holdAction)}
            ${this._renderHoldTimeConfig(holdAction)}
            ${this._renderConfirmationConfig('hold_action', holdAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-double-tap" style="margin-right: 8px;"></ha-icon>
              Double Tap Action
            </div>
            ${this._renderActionTypeDropdown('double_tap_action', doubleTapAction)}
            ${this._renderActionDetails('double_tap_action', doubleTapAction)}
            ${this._renderConfirmationConfig('double_tap_action', doubleTapAction)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  /**
   * Render the footer with version and GitHub link
   * @returns {TemplateResult} Footer template
   * @private
   */
  _renderFooter() {
    return x`
      <div class="version-display">
        <div class="version-text">Actions Card</div>
        <div class="version-badges">
          <div class="version-badge">v${CARD_VERSION}</div>
          <a
            href="https://github.com/I-am-Joel/actions-card-fixed"
            target="_blank"
            rel="noopener noreferrer"
            class="github-badge"
          >
            <ha-icon icon="mdi:github"></ha-icon>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Handle expansion state changes
    if (
      changedProperties.has('_actionsExpanded') ||
      changedProperties.has('_swipeActionsExpanded')
    ) {
      // Force the expansion panels to update their state
      const actionPanel = this.shadowRoot?.querySelector('ha-expansion-panel');
      const swipePanel = this.shadowRoot?.querySelectorAll('ha-expansion-panel')[1];

      if (actionPanel && this._actionsExpanded !== undefined) {
        actionPanel.expanded = this._actionsExpanded;
      }
      if (swipePanel && this._swipeActionsExpanded !== undefined) {
        swipePanel.expanded = this._swipeActionsExpanded;
      }
    }

    // Only ensure card picker is loaded when config changes AND no card is configured
    // Use immediate loading if showing picker after removal
    if (changedProperties.has('_config') && !this._config?.card) {
      if (this._showPickerAfterRemoval) {
        // Don't debounce when showing picker after removal
        setTimeout(() => this._ensureCardPickerLoaded(), 50);
      } else {
        this._debouncedEnsureCardPickerLoaded();
      }
    }
  }

  /**
   * Force update all yaml editors by recreating them with current config values
   * @private
   */
  _updateYamlEditors() {
    // Method removed - using defaultValue in template instead
  }

  /**
   * Define CSS styles for the editor
   * @returns {CSSResult} CSS styles
   */
  static get styles() {
    return getEditorStyles();
  }
}

// Standard HA pattern: Define elements immediately at module level
if (!customElements.get('actions-card-fixed')) {
  customElements.define('actions-card-fixed', ActionsCard);
}

if (!customElements.get('actions-card-fixed-editor')) {
  customElements.define('actions-card-fixed-editor', ActionsCardEditor);
}

// Set up the card's config element getter
ActionsCard.getConfigElement = () => document.createElement('actions-card-fixed-editor');

// Register card with Home Assistant
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === 'actions-card-fixed')) {
  window.customCards.push({
    type: 'actions-card-fixed',
    name: 'Actions Card (Fixed)',
    preview: true,
    description: 'Wraps another card to add tap, hold, and double-tap actions.',
    documentationURL: 'https://github.com/I-am-Joel/actions-card-fixed'
  });
}

// Display version information
console.info(
  `%c ACTIONS-CARD-FIXED %c v${CARD_VERSION} %c`,
  'color: white; background: #9c27b0; font-weight: 700;',
  'color: #9c27b0; background: white; font-weight: 700;',
  'color: grey; background: white; font-weight: 400;'
);

export { CARD_VERSION };
//# sourceMappingURL=actions-card-fixed.js.map
