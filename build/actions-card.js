const t=(t,...i)=>{};let i,e,a,o;function s(){return{LitElement:i,html:e,css:a,fireEvent:o}}function n(t,i,e){return t.entity||t.entity_id||i.entity||(e&&e.config?e.config.entity:null)}const r="navigate",c="url",d="toggle",h="call-service",l="more-info",u="assist",p="fire-dom-event",v=[{value:"none",label:"None"},{value:d,label:"Toggle"},{value:r,label:"Navigate"},{value:c,label:"URL"},{value:h,label:"Call Service"},{value:l,label:"More Info"},{value:u,label:"Assist"},{value:p,label:"Fire DOM Event"}],f=50,m=100,g=10;class w{constructor(t,i,e,a){this.element=t,this.config=e,this.childCard=a,this.t=0}handleAction(t="tap"){const i=this.config[`${t}_action`];i&&"none"!==i.action&&(i.confirmation?this.i(i):this.o(i))}i(t){let i,e="Are you sure?",a="Confirm",o="Cancel";"object"==typeof t.confirmation?(e=t.confirmation.text||e,i=t.confirmation.title,a=t.confirmation.confirm_text||a,o=t.confirmation.dismiss_text||o):"string"==typeof t.confirmation&&(e=t.confirmation);const s=document.createElement("ha-dialog");s.heading=i||"",s.open=!0;const n=document.createElement("div");n.innerText=e,s.appendChild(n);const r=document.createElement("mwc-button");r.slot="primaryAction",r.label=a,r.style.color="var(--primary-color)",r.setAttribute("aria-label",a),r.addEventListener("click",()=>{s.parentNode.removeChild(s),this.o(t)});const c=document.createElement("mwc-button");c.slot="secondaryAction",c.label=o,c.setAttribute("aria-label",o),c.addEventListener("click",()=>{s.parentNode.removeChild(s)}),s.appendChild(r),s.appendChild(c),document.body.appendChild(s)}o(t){this.t=Date.now();const i=this.element.hass;if(i&&t.action)try{switch(t.action,t.action){case r:!function(t){const{fireEvent:i}=s(),e=t.navigation_path||"",a=!0===t.navigation_replace;e&&(a?window.history.replaceState(null,"",e):window.history.pushState(null,"",e),i(window,"location-changed",{replace:a}))}(t,0,this.config,this.childCard);break;case c:!function(t){const i=t.url_path||"";i&&(t.target,window.open(i,t.target||"_blank"))}(t,0,this.config,this.childCard);break;case d:!function(t,i,e,a){const o=n(t,e,a);o&&i.callService("homeassistant","toggle",{entity_id:o})}(t,i,this.config,this.childCard);break;case h:!function(t,i){if(!t.service)return;const[e,a]=t.service.split(".",2);if(!e||!a)return void t.service;const o=t.service_data||t.data||{},s=t.target||(o.entity_id?{entity_id:o.entity_id}:{});s.entity_id&&o.entity_id&&delete o.entity_id,i.callService(e,a,o,s)}(t,i,this.config,this.childCard);break;case l:!function(t,i,e,a,o){const{fireEvent:r}=s(),c=n(t,e,a);c&&r(o,"hass-more-info",{entityId:c})}(t,0,this.config,this.childCard,this.element);break;case u:!function(t,i,e,a,o){const{fireEvent:n}=s();t.pipeline_id,t.start_listening,n(o,"assist",{pipeline_id:t.pipeline_id||"last_used",start_listening:!0===t.start_listening})}(t,0,this.config,this.childCard,this.element);break;case p:!function(t,i,e,a,o){const{fireEvent:n}=s();if("browser_mod"===t.event_type&&t.event_data)return t.event_data,void n(o,"ll-custom",{browser_mod:t.event_data});t.event_type&&(t.event_type,t.event_data,n(o,t.event_type,t.event_data||null))}(t,0,this.config,this.childCard,this.element);break;default:t.action}}catch(i){console.error("ActionsCard: Error executing action:",t.action,i)}}getLastActionTime(){return this.t}}function createActionsCard(){const{LitElement:i,html:e,css:a,fireEvent:o}=s();if(!i)throw new Error("Dependencies not loaded. Call loadDependencies() first.");return class ActionsCard extends i{static get properties(){return{hass:{type:Object},config:{type:Object},h:{type:Object,state:!0}}}static getStubConfig(){return{card:null,tap_action:{action:"none"},hold_action:{action:"none"},double_tap_action:{action:"none"},prevent_default_dialog:!1}}constructor(){super(),this.l=null,this.u=null,this.p=!1,this.v=0,this.t=0,this.h=null,this.config={},this.m=null,this.k=null,this.$=null}async _(){if(!this.k)try{this.k=await async function(){if(!window.loadCardHelpers)return null;try{return await window.loadCardHelpers()}catch(t){return null}}()}catch(t){}}setConfig(t){JSON.stringify(t),this.config=t,void 0===this.config.prevent_default_dialog&&(this.config.prevent_default_dialog=!1),this.$=new w(this,null,this.config,this.h),t&&t.card?this.h&&JSON.stringify(this.C)===JSON.stringify(t.card)||(this.C=JSON.parse(JSON.stringify(t.card)),this.T(t.card).catch(t=>{})):(this.h=null,this.C=null,this.requestUpdate())}async T(t){if(!t)return this.h=null,void this.requestUpdate();try{const i=Array.isArray(t)?t[0]:t,e=i.type;if(!e)throw new Error("Card configuration requires a `type`.");if(e.startsWith("custom:"))return void await this.A(i);const a=await this.S(i);a?await this.D(a,e):await this.A(i)}catch(i){this.O(i.message,t)}this.requestUpdate()}async S(t){try{if(this.k||await this._(),this.k)return t.type,await this.k.createCardElement(t)}catch(i){t.type}return null}async D(t,i){this.hass&&(t.hass=this.hass),this.h=t,this.$&&(this.$.childCard=this.h),await this.L()}async L(){await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.N()},f)}async A(t,i=0){const e=t.type;if(i>g)return void this.O(`Failed to create card: ${e}`,t);const a=e.startsWith("custom:")?e.substring(7):`hui-${e}-card`,o=document.createElement(a);if("function"!=typeof o.setConfig)return i<5?void setTimeout(()=>this.A(t,i+1),m):void this.O(`Card type ${e} is not available`,t);try{o.setConfig(t),this.hass&&(o.hass=this.hass),this.h=o,this.$&&(this.$.childCard=this.h),await this.updateComplete,setTimeout(()=>{this.config&&this.config.prevent_default_dialog&&this.N()},50)}catch(i){this.O(`Error setting up card: ${i.message}`,t)}}O(t,i){try{const e=document.createElement("hui-error-card");e.setConfig({type:"error",error:t,origConfig:i}),this.hass&&(e.hass=this.hass),this.h=e}catch(i){const e=document.createElement("div");e.innerHTML=`<ha-alert alert-type="error">Error: ${t}</ha-alert>`,this.h=e}this.$&&(this.$.childCard=this.h),this.requestUpdate()}P(t){this.config.prevent_default_dialog&&(t.preventDefault(),t.stopPropagation())}N(){if(!this.h||!this.config.prevent_default_dialog)return;this.j(),this.m=t=>{t.type,"hass-more-info"!==t.type&&"click"!==t.type&&"tap"!==t.type||(t.type,t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation())};const t=()=>{if(this.h){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.h.addEventListener(t,this.m,{capture:!0,passive:!1}),this.h.shadowRoot&&this.h.shadowRoot.addEventListener(t,this.m,{capture:!0,passive:!1})});this.h.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.addEventListener(t,this.m,{capture:!0,passive:!1})})})}},i=(e=0)=>{if(!(e>5))try{t()}catch(t){setTimeout(()=>i(e+1),100)}};i(),setTimeout(()=>i(),500)}j(){if(this.h&&this.m){const t=["hass-more-info","click","tap"];t.forEach(t=>{this.h.removeEventListener(t,this.m,!0),this.h.shadowRoot&&this.h.shadowRoot.removeEventListener(t,this.m,!0)});try{this.h.querySelectorAll("*").forEach(i=>{t.forEach(t=>{i.removeEventListener(t,this.m,!0)})})}catch(t){}this.m=null}}set hass(t){const i=this.H;if(this.H=t,this.h&&this.h.hass!==t)try{this.h.hass=t}catch(t){this.config&&this.config.card&&this.T(this.config.card)}i!==t&&this.requestUpdate()}get hass(){return this.H}getCardSize(){if(!this.h)return 3;if(this.h&&"function"==typeof this.h.getCardSize)try{return this.h.getCardSize()}catch(t){return 1}return 1}updated(t){super.updated(t),t.has("_childCard")&&this.h&&this.config&&this.config.prevent_default_dialog&&setTimeout(()=>{this.N()},100),(t.has("config")||t.has("_childCard"))&&this.$&&(this.$.config=this.config,this.$.childCard=this.h)}connectedCallback(){super.connectedCallback(),this.k||this._()}disconnectedCallback(){super.disconnectedCallback(),this.j()}I(t="tap"){this.$&&this.$.handleAction(t)}M(t){t&&t.stopPropagation(),clearTimeout(this.l),clearTimeout(this.u),this.l=null,this.u=null,this.p=!1,this.v=0}J(i){const e=["INPUT","BUTTON","SELECT","TEXTAREA","A","HA-SLIDER","HA-SWITCH","PAPER-SLIDER","PAPER-BUTTON","MWC-BUTTON"];let a=i.target;for(;a&&a!==this;){if(e.includes(a.tagName)||a.hasAttribute("actions-card-interactive"))return void t(0,a.tagName);a=a.parentElement||a.getRootNode().host}0!==i.button&&"mouse"===i.pointerType||(i.stopPropagation(),this.R=i.clientX,this.U=i.clientY,clearTimeout(this.l),this.p=!1,this.config.hold_action&&"none"!==this.config.hold_action.action&&(this.l=window.setTimeout(()=>{Math.abs(i.clientX-this.R)<10&&Math.abs(i.clientY-this.U)<10?(this.p=!0,this.I("hold"),this.v=0):this.M()},this.config.hold_action.hold_time||500)))}W(t){if(0!==t.button&&"mouse"===t.pointerType)return;t.stopPropagation(),this.config.prevent_default_dialog&&t.preventDefault();const i=Math.abs(t.clientX-this.R)>10||Math.abs(t.clientY-this.U)>10;clearTimeout(this.l),this.p||i?this.M():(this.v++,this.v,this.config.prevent_default_dialog&&this.B(300),this.config.double_tap_action&&"none"!==this.config.double_tap_action.action?1===this.v?this.u=window.setTimeout(()=>{1!==this.v||this.p||"none"!==this.config.tap_action?.action&&this.I("tap"),this.M()},250):2===this.v&&(clearTimeout(this.u),this.u=null,this.I("double_tap"),this.M()):("none"!==this.config.tap_action?.action&&this.I("tap"),this.M()))}B(t){if(!this.h)return;const i=t=>{t.type,t.stopPropagation(),t.preventDefault()},e=["click","tap","hass-more-info"];e.forEach(t=>{this.h.addEventListener(t,i,{capture:!0}),this.h.shadowRoot&&this.h.shadowRoot.addEventListener(t,i,{capture:!0})}),setTimeout(()=>{e.forEach(t=>{this.h.removeEventListener(t,i,{capture:!0}),this.h.shadowRoot&&this.h.shadowRoot.removeEventListener(t,i,{capture:!0})})},t)}F(t){t.stopPropagation(),o(this,"show-edit-card",{element:this})}render(){if(!this.h)return e`
          <div class="preview-container">
            <div class="preview-icon-container">
              <ha-icon icon="mdi:gesture-tap-hold"></ha-icon>
            </div>
            <div class="preview-text-container">
              <div class="preview-title">Actions Card</div>
              <div class="preview-description">
                Wrap another card to add tap, hold, or double tap actions.
                Configure the card to wrap below.
              </div>
            </div>
            <div class="preview-actions">
              <ha-button
                raised
                @click=${this.F}
                aria-label="Edit Card"
              >
                Edit Card
              </ha-button>
            </div>
          </div>
        `;const t="none"!==this.config.tap_action?.action||"none"!==this.config.hold_action?.action||"none"!==this.config.double_tap_action?.action;return e`
        <div
          @pointerdown="${this.J}"
          @pointerup="${this.W}"
          @pointercancel="${this.M}"
          @click="${this.P}"
          @contextmenu="${t=>{this.config.hold_action&&t.preventDefault()}}"
          style="cursor: ${t?"pointer":"default"}; display: block; height: 100%;"
          aria-label="${t?"Interactive card with actions":""}"
          role="${t?"button":""}"
          ?prevent-default-dialog="${this.config.prevent_default_dialog}"
        >
          ${this.h}
        </div>
      `}static get styles(){return function(){const{css:t}=s();return t`
    :host {
      display: block;
      height: 100%; /* Ensure host takes up space */
    }
    .preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      box-sizing: border-box;
      height: 100%; /* Make preview fill space */
      background: var(
        --ha-card-background,
        var(--card-background-color, white)
      );
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
  `}()}}}function createActionsCardEditor(){const{LitElement:i,html:e,css:a,fireEvent:o}=s();if(!i)throw new Error("Dependencies not loaded. Call loadDependencies() first.");return class ActionsCardEditor extends i{static get properties(){return{hass:{type:Object},V:{type:Object,state:!0},lovelace:{type:Object}}}constructor(){super(),this.q=`actions-card-editor-${Math.random().toString(36).substring(2,15)}`,this.G=this.Z.bind(this),this.X=!1,this.Y=new Set,this.K=!1,this.tt=null,this.it=0}async connectedCallback(){super.connectedCallback(),await this.et(),setTimeout(()=>this.ot(),1e3);let i=this.parentNode;for(;i;){if("hui-dialog-edit-card"===i.localName){this.X=!0,i.st=!0,t(0);break}i=i.parentNode||i.getRootNode&&i.getRootNode().host}this.nt()}async et(){let t=0;for(;!customElements.get("hui-card-picker")&&t<10;)await this.rt(),customElements.get("hui-card-picker")||(await new Promise(t=>setTimeout(t,200)),t++);customElements.get("hui-card-picker")||await this.ct(),customElements.get("hui-card-picker")}async rt(){if(!customElements.get("hui-card-picker"))try{const i=[()=>this.dt(),()=>this.ht()];for(const e of i)try{if(await e(),customElements.get("hui-card-picker"))return void t(0)}catch(t){}}catch(t){}}async dt(){const t=["hui-entities-card","hui-conditional-card","hui-vertical-stack-card","hui-horizontal-stack-card","hui-grid-card","hui-map-card"];for(const i of t)try{const t=customElements.get(i);if(t&&t.getConfigElement&&(await t.getConfigElement(),customElements.get("hui-card-picker")))return}catch(t){}}async ct(){try{if(window.loadCardHelpers){if(await window.loadCardHelpers()&&customElements.get("hui-card-picker"))return}const t=document.createElement("div");t.innerHTML="<hui-card-picker></hui-card-picker>",document.body.appendChild(t),await new Promise(t=>setTimeout(t,100)),document.body.removeChild(t)}catch(t){}}async ht(){try{if(!customElements.get("hui-card-picker")){const t=new CustomEvent("hass-refresh",{bubbles:!0,composed:!0});this.dispatchEvent(t),await new Promise(t=>setTimeout(t,500))}}catch(t){}}ot(){this.K?this.lt():(this.tt&&clearTimeout(this.tt),this.tt=setTimeout(()=>{this.lt()},500))}async lt(){if(!this.shadowRoot||this.V?.card)return;const t=this.shadowRoot.querySelector("#card-picker-container");if(!t)return void this.requestUpdate();let i=t.querySelector("hui-card-picker");i||(i=document.createElement("hui-card-picker"),i.hass=this.hass,i.lovelace=this.lovelace,t.appendChild(i))}nt(){this.ut=t=>{if(t.target&&this.shadowRoot&&this.shadowRoot.contains(t.target)&&(t.type,t.vt=!0,"keydown"!==t.type&&"input"!==t.type&&"change"!==t.type&&"config-changed"!==t.type||(t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())),"keydown"===t.type||"input"===t.type){"INPUT"===t.target.tagName&&("search"===t.target.type||t.target.placeholder?.includes("Search"))&&(t.type,t.ft=!0,t.vt=!0,t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation())}};["keydown","input","change","click","config-changed"].forEach(t=>{document.addEventListener(t,this.ut,{capture:!0})})}disconnectedCallback(){if(super.disconnectedCallback(),this.tt&&(clearTimeout(this.tt),this.tt=null),this.it=0,this.ut){["keydown","input","change","click","config-changed"].forEach(t=>{document.removeEventListener(t,this.ut,{capture:!0})})}this.Y&&(this.Y.forEach(t=>{if(t.parentNode)try{t.parentNode.removeChild(t)}catch(t){console.warn("Error removing dialog:",t)}}),this.Y.clear())}setConfig(t){if(!t)throw new Error("Invalid configuration");JSON.stringify(t),this.V=JSON.parse(JSON.stringify(t)),this.V.tap_action||(this.V.tap_action={action:"none"}),this.V.hold_action||(this.V.hold_action={action:"none"}),this.V.double_tap_action||(this.V.double_tap_action={action:"none"}),void 0===this.V.prevent_default_dialog&&(this.V.prevent_default_dialog=!1),this.V.card||setTimeout(()=>this.lt(),50)}gt(t,i,e){const a=["action","confirmation"];"hold_action"===e&&a.push("hold_time");const o=[...a,...{none:[],navigate:["navigation_path","navigation_replace"],url:["url_path","target"],toggle:["entity"],"more-info":["entity"],"call-service":["service","service_data"],assist:["pipeline_id","start_listening"],"fire-dom-event":["event_type","event_data"]}[i]||[]],s={};return Object.keys(t).forEach(i=>{o.includes(i)&&(s[i]=t[i])}),s}wt(t){if(t.vt=!0,t.stopPropagation(),!this.V||!t.target)return;const i=t.target,e=i.configValue||i.getAttribute("data-option"),a=i.parentElement?.configValue||i.parentElement?.getAttribute("data-option");if(!(e||a))return;const o=i.configAttribute||i.getAttribute("data-attribute");if(e&&e.includes("_action")){const a={...this.V[e]||{}};if(o)"checkbox"===i.type?a[o]=i.checked:a[o]=t.detail?.value??i.value??"",this.V={...this.V,[e]:a};else{const t=i.value,o=this.gt(a,t,e);o.action=t,this.V={...this.V,[e]:o}}}else if(e){let t;t="checkbox"===i.type?i.checked:i.value,this.V={...this.V,[e]:t}}this.bt()}bt(){if(!this.V)return;const t=new CustomEvent("config-changed",{detail:{config:this.V,editorId:this.q,fromActionCardEditor:!0,preventDialogClose:!0,inEditorDialog:this.X},bubbles:!1});if(t.vt=!0,this.dispatchEvent(t),this.X){let t=this.parentNode,i=null;for(;t;){if("hui-dialog-edit-card"===t.localName){i=t;break}t=t.parentNode||t.getRootNode&&t.getRootNode().host}if(i&&"function"==typeof i.yt)try{i.yt(this.V)}catch(t){console.error("Error updating dialog config:",t)}}}xt(){if(!this.V)return;const t=new CustomEvent("config-changed",{detail:{config:this.V,editorId:this.q,fromActionCardEditor:!0,inEditorDialog:this.X,preventDialogClose:!0},bubbles:!0,composed:!0});t.vt=!0,this.V,this.dispatchEvent(t)}Z(t){if(void 0===t.vt&&(t.vt=!0),!t.detail?.editorId||t.detail.editorId===this.q){const i=t.detail.config;this.V={...this.V,card:i},this.bt(),this.requestUpdate()}t.stopPropagation&&t.stopPropagation()}async kt(){if(!this.V?.card)return;const t=this.V.card,i=this.hass,e=document.querySelector("home-assistant");if(i&&e)try{await customElements.whenDefined("hui-dialog-edit-card");const a=document.createElement("hui-dialog-edit-card");a.hass=i,this.Y.add(a),document.body.appendChild(a);const o=t=>{if(a.removeEventListener("dialog-closed",o),this.Y.delete(a),a.parentNode===document.body)try{document.body.removeChild(a)}catch(t){}setTimeout(()=>this.lt(),100)};a.addEventListener("dialog-closed",o);const s={cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:async t=>{t&&(this.V={...this.V,card:t},this.xt(),this.requestUpdate())}};await a.showDialog(s)}catch(i){o(this,"ll-show-dialog",{dialogTag:"hui-dialog-edit-card",dialogImport:()=>import("hui-dialog-edit-card"),dialogParams:{cardConfig:t,lovelaceConfig:this.lovelace||e.lovelace,saveCardConfig:t=>{t&&(this.V={...this.V,card:t},this.xt(),this.requestUpdate())}}})}}$t(){if(!this.V)return;const t={...this.V};delete t.card,this.V=t,this.K=!0,this.tt&&(clearTimeout(this.tt),this.tt=null),this.it=0,this.bt(),this.requestUpdate(),this.updateComplete.then(()=>{setTimeout(()=>{this.lt()},100)})}_t(){const t=!this.V?.card,i=this.K,e=this.V&&Object.keys(this.V).length>0&&!this.V.card,a=t&&(i||e||!this.V);return a}Ct(t,i){const a={tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action"}[t]||t.replace(/_/g," ");return e`
        <div class="option-row">
          <div class="option-label">${a}</div>
          <ha-select
            label="Action"
            .value=${i.action||"none"}
            data-option="${t}"
            @selected=${this.wt}
            @closed=${t=>{t.vt=!0,t.stopPropagation()}}
          >
            ${v.map(t=>e`
                <mwc-list-item value="${t.value}"
                  >${t.label}</mwc-list-item
                >
              `)}
          </ha-select>
        </div>
      `}Et(t,i){if(!i||"none"===i.action||!i.action)return e``;switch(i.action){case"navigate":return e`
            <div class="config-row">
              <ha-textfield
                label="Navigation Path"
                .value=${i.navigation_path||""}
                data-option="${t}"
                data-attribute="navigation_path"
                @keydown=${t=>{t.vt=!0}}
                @change=${this.wt}
              ></ha-textfield>
            </div>
            <div class="option-row">
              <div class="option-label">Replace history state</div>
              <ha-switch
                .checked=${i.navigation_replace||!1}
                data-option="${t}"
                data-attribute="navigation_replace"
                @change=${this.wt}
              ></ha-switch>
            </div>
          `;case"url":return e`
            <div class="config-row">
              <ha-textfield
                label="URL"
                .value=${i.url_path||""}
                data-option="${t}"
                data-attribute="url_path"
                @keydown=${t=>{t.vt=!0}}
                @change=${this.wt}
              ></ha-textfield>
            </div>
            <div class="config-row">
              <ha-select
                label="Open in"
                .value=${i.target||"_blank"}
                data-option="${t}"
                data-attribute="target"
                @selected=${this.wt}
                @closed=${t=>{t.vt=!0,t.stopPropagation()}}
              >
                <mwc-list-item value="_blank">New tab</mwc-list-item>
                <mwc-list-item value="_self">Same tab</mwc-list-item>
              </ha-select>
            </div>
          `;case"toggle":case"more-info":return e`
            <div class="config-row">
              <ha-entity-picker
                label="Entity"
                .hass=${this.hass}
                .value=${i.entity||""}
                data-option="${t}"
                data-attribute="entity"
                @value-changed=${this.wt}
                allow-custom-entity
              ></ha-entity-picker>
              <div class="help-text">
                Optional: Leave empty to use the entity from the wrapped card
              </div>
            </div>
          `;case"call-service":return e`
            <div class="config-row">
              <ha-textfield
                label="Service"
                .value=${i.service||""}
                data-option="${t}"
                data-attribute="service"
                @keydown=${t=>{t.vt=!0}}
                @change=${this.wt}
                placeholder="domain.service"
              ></ha-textfield>
            </div>
            <div class="config-row">
              <ha-yaml-editor
                label="Service Data"
                .value=${i.service_data?JSON.stringify(i.service_data,null,2):"{}"}
                data-option="${t}"
                data-attribute="service_data"
                @value-changed=${i=>{i.vt=!0;try{const e={...this.V};e[t]={...e[t],service_data:JSON.parse(i.detail.value)},this.V=e,this.bt()}catch(t){console.error("Invalid service data:",t)}}}
              ></ha-yaml-editor>
            </div>
          `;case"assist":return e`
            <div class="config-row">
              <ha-textfield
                label="Pipeline ID (optional)"
                .value=${i.pipeline_id||""}
                data-option="${t}"
                data-attribute="pipeline_id"
                @keydown=${t=>{t.vt=!0}}
                @change=${this.wt}
                placeholder="last_used"
              ></ha-textfield>
            </div>
            <div class="option-row">
              <div class="option-label">Start listening immediately</div>
              <ha-switch
                .checked=${i.start_listening||!1}
                data-option="${t}"
                data-attribute="start_listening"
                @change=${this.wt}
              ></ha-switch>
            </div>
          `;case"fire-dom-event":return e`
            <div class="config-row">
              <ha-textfield
                label="Event Type"
                .value=${i.event_type||""}
                data-option="${t}"
                data-attribute="event_type"
                @keydown=${t=>{t.vt=!0}}
                @change=${this.wt}
              ></ha-textfield>
            </div>
            <div class="config-row">
              <ha-yaml-editor
                label="Event Data (optional)"
                .value=${i.event_data?JSON.stringify(i.event_data,null,2):"{}"}
                data-option="${t}"
                data-attribute="event_data"
                @value-changed=${i=>{i.vt=!0;try{const e={...this.V};e[t]={...e[t],event_data:JSON.parse(i.detail.value)},this.V=e,this.bt()}catch(t){console.error("Invalid event data:",t)}}}
              ></ha-yaml-editor>
            </div>
          `;default:return e``}}Tt(t,i){if(!i||"none"===i.action||!i.action)return e``;const a=!!i.confirmation,o="object"==typeof i.confirmation?i.confirmation:a?{text:i.confirmation}:{};return e`
        <div class="option-row confirmation-row">
          <div class="option-label">Require confirmation</div>
          <ha-switch
            .checked=${a}
            @change=${i=>{i.vt=!0;const e={...this.V};e[t]={...e[t],confirmation:!!i.target.checked&&{text:"Are you sure?"}},this.V=e,this.bt(),this.requestUpdate()}}
          ></ha-switch>
        </div>

        ${a?e`
              <div class="confirmation-config">
                <div class="config-row">
                  <ha-textfield
                    label="Confirmation Text"
                    .value=${o.text||"Are you sure?"}
                    @keydown=${t=>{t.vt=!0}}
                    @change=${i=>{i.vt=!0;const e={...this.V},a="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};a.text=i.target.value,e[t].confirmation=a,this.V=e,this.bt()}}
                  ></ha-textfield>
                </div>
                <div class="config-row">
                  <ha-textfield
                    label="Confirmation Title (optional)"
                    .value=${o.title||""}
                    @keydown=${t=>{t.vt=!0}}
                    @change=${i=>{i.vt=!0;const e={...this.V},a="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};a.title=i.target.value,e[t].confirmation=a,this.V=e,this.bt()}}
                  ></ha-textfield>
                </div>
                <div class="config-row">
                  <ha-textfield
                    label="Confirm Button Text"
                    .value=${o.confirm_text||"Confirm"}
                    @keydown=${t=>{t.vt=!0}}
                    @change=${i=>{i.vt=!0;const e={...this.V},a="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};a.confirm_text=i.target.value,e[t].confirmation=a,this.V=e,this.bt()}}
                  ></ha-textfield>
                </div>
                <div class="config-row">
                  <ha-textfield
                    label="Cancel Button Text"
                    .value=${o.dismiss_text||"Cancel"}
                    @keydown=${t=>{t.vt=!0}}
                    @change=${i=>{i.vt=!0;const e={...this.V},a="object"==typeof e[t].confirmation?{...e[t].confirmation}:{};a.dismiss_text=i.target.value,e[t].confirmation=a,this.V=e,this.bt()}}
                  ></ha-textfield>
                </div>
              </div>
            `:""}
      `}At(t){return t&&"none"!==t.action?e`
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
            @keydown=${t=>{t.vt=!0}}
            @change=${this.wt}
            suffix="ms"
          ></ha-textfield>
          <div class="help-text">
            Time in milliseconds to hold before triggering the action (default:
            500ms)
          </div>
        </div>
      `:e``}render(){return this.hass&&this.V?e`
        <div
          class="card-config"
          @keydown=${t=>t.vt=!0}
        >
          ${this.St()} ${this.Dt()}
          ${this.Ot()} ${this.Lt()}
          ${this.Nt()}
        </div>
      `:e`<ha-circular-progress
          active
          alt="Loading editor"
        ></ha-circular-progress>`}St(){return e`
        <div class="info-panel">
          <div class="info-icon">i</div>
          <div class="info-text">
            This card wraps another card to add tap, hold, and double-tap
            actions. First, select a card to wrap below, then configure the
            actions you want to enable.
          </div>
        </div>
      `}Dt(){const t=!!this.V.card,i=t?(a=this.V.card,a?.type?{typeName:(a.type.startsWith("custom:")?a.type.substring(7):a.type).split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "),name:a.title||a.name||""}:{typeName:"Unknown",name:""}):{typeName:"",name:""};var a;return e`
        <div class="section">
          <div class="section-header">Wrapped Card</div>

          ${t?e`
                <div class="card-row">
                  <div class="card-info">
                    <span class="card-type">${i.typeName}</span>
                    ${i.name?e`<span class="card-name"
                          >(${i.name})</span
                        >`:""}
                  </div>
                  <div class="card-actions">
                    <ha-icon-button
                      label="Edit Card"
                      path="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                      @click=${()=>this.kt()}
                    ></ha-icon-button>
                    <ha-icon-button
                      label="Delete Card"
                      path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                      @click=${()=>this.$t()}
                      style="color: var(--error-color);"
                    ></ha-icon-button>
                  </div>
                </div>
              `:e`
                <div class="no-card">
                  <div class="no-card-message">
                    No card selected. Use the card picker below to choose a card
                    to wrap.
                  </div>
                </div>
              `}
        </div>
      `}Ot(){return!!this.V.card||!this._t()?e``:e`
        <div id="card-picker-container">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this.G}
            label="Pick a card to wrap"
          ></hui-card-picker>
        </div>
      `}Lt(){return e`
        <div class="section">
          <div class="section-header">General Options</div>

          <div class="option-row">
            <div class="option-label">
              Prevent Default Entity Dialog
              <div class="option-description">
                When enabled, prevents the default entity information dialog
                from opening
              </div>
            </div>
            <ha-switch
              .checked=${this.V.prevent_default_dialog||!1}
              @change=${t=>{t.vt=!0;const i={...this.V};i.prevent_default_dialog=t.target.checked,this.V=i,this.bt()}}
            ></ha-switch>
          </div>
        </div>
      `}Nt(){const t=this.V.tap_action||{action:"none"},i=this.V.hold_action||{action:"none"},a=this.V.double_tap_action||{action:"none"};return e`
        <div class="section">
          <div class="section-header">Actions</div>

          <div class="action-container">
            ${this.Ct("tap_action",t)}
            ${this.Et("tap_action",t)}
            ${this.Tt("tap_action",t)}
          </div>

          <div class="action-container">
            ${this.Ct("hold_action",i)}
            ${this.Et("hold_action",i)}
            ${this.At(i)}
            ${this.Tt("hold_action",i)}
          </div>

          <div class="action-container">
            ${this.Ct("double_tap_action",a)}
            ${this.Et("double_tap_action",a)}
            ${this.Tt("double_tap_action",a)}
          </div>
        </div>
      `}updated(t){super.updated(t),t.has("_config")&&!this.V?.card&&(this.K?setTimeout(()=>this.lt(),50):this.ot())}static get styles(){return function(){const{css:t}=s();return t`
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
      background-color: var(
        --card-background-color,
        var(--primary-background-color)
      );
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
  `}()}}}(async function(){if(!await async function(){try{const s=["https://cdn.jsdelivr.net/npm/lit-element@2.4.0/+esm","https://unpkg.com/lit-element@2.4.0/lit-element.js?module","https://cdn.skypack.dev/lit-element@2.4.0"],n=["https://cdn.jsdelivr.net/npm/custom-card-helpers@^1/+esm","https://unpkg.com/custom-card-helpers@^1?module"];let r=!1;for(const o of s)try{const t=await import(o);i=t.LitElement,e=t.html,a=t.css,r=!0;break}catch(i){t()}if(!r)throw new Error("Could not load lit-element from any CDN source");let c=!1;for(const i of n)try{const t=await import(i);o=t.fireEvent,c=!0;break}catch(i){t()}return c||(o=function(t,i,e,a){a=a||{},e=null==e?{}:e;const o=new Event(i,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return o.detail=e,t.dispatchEvent(o),o}),!0}catch(t){return!1}}())return void customElements.define("actions-card",class extends HTMLElement{setConfig(){throw new Error("Actions Card: Failed to load required dependencies. Please check your internet connection or consider using a bundled version for offline support.")}});const ActionsCard=createActionsCard(),ActionsCardEditor=createActionsCardEditor();customElements.define("actions-card",ActionsCard),customElements.define("actions-card-editor",ActionsCardEditor),ActionsCard.getConfigElement=()=>document.createElement("actions-card-editor"),window.customCards=window.customCards||[],window.customCards.some(t=>"actions-card"===t.type)||window.customCards.push({type:"actions-card",name:"Actions Card",preview:!0,description:"Wraps another card to add tap, hold, and double-tap actions."}),console.info("%c ACTIONS-CARD %c v1.4.0 %c","color: white; background: #9c27b0; font-weight: 700;","color: #9c27b0; background: white; font-weight: 700;","color: grey; background: white; font-weight: 400;")})().catch(t=>{});
