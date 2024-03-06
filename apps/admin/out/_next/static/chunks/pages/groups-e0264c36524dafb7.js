(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6736],{6984:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/groups",function(){return a(31237)}])},31237:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return k}});var i=a(52322),r=a(3559),s=a(30195),n=a(40214),o=a(13997),l=a(50897),d=a(79562),c=a(1888),u=a(42783),h=a(48115),m=a(1201),p=a(2784),g=a(6289),w=a(26887);let f={},v="/adminapi/v1/groups",y="/adminapi/v1/workspaces";var b={groups:{component:e=>{var t,a;let{pageState:c,initialItems:b,pageSession:j,extraData:S}=e;(0,m.G)(()=>"At this moment the user is browsing the group management page. The group management page allows to list, create, read, update and delete groups, groups contain privileges (admin true/false) and are associated to users when creating users, in the field 'type'.\n      A group has a name, the privilege level (admin true/false), and a 0 or more workspaces associated. A workspace is a menu for the admin panel. If the user has more than one workspace, the admin panel will show a select list in the topbar to switch between workspaces.\n      "+((null==b?void 0:b.isLoaded)?"Currently the system returned the following information: "+JSON.stringify(b.data):""));let[k,I]=(0,p.useState)(null!==(t=null==S?void 0:S.workspaces)&&void 0!==t?t:(0,g.E)("pending"));return(0,w.a)(e=>{h.bl.get(y,e)},I,null==S?void 0:S.workspaces),(0,i.jsx)(n.D,{title:"Groups",pageSession:j,children:(0,i.jsx)(o.V,{integratedChat:!0,enableAddToInitialData:!0,disableViewSelector:!0,defaultView:"list",rowIcon:u.Q,sourceUrl:v,initialItems:b,numColumnsForm:1,name:"group",extraFieldsForms:{workspaces:s.z.array(s.z.union([s.z.literal(""),s.z.literal("")])).generateOptions(()=>{var e;return null===(e=k.data)||void 0===e?void 0:e.items.map(e=>e.name)}).after("name")},columns:l.Z.columns(l.Z.column("name","name",!0,void 0,!0,"250px"),l.Z.column("workspaces","workspaces",!1,e=>Object.keys(null!==(a=null==e?void 0:e.workspaces)&&void 0!==a?a:[]).length?Object.keys(e.workspaces).map((t,a)=>(0,i.jsx)(d.A,{ml:a?"$2":"$0",text:e.workspaces[t],color:"$color5"},t)):(0,i.jsx)(d.A,{text:"empty",color:"$gray5"}),!0,"200px")),model:r.d,pageState:c,icons:f,dataTableCardProps:{itemMinWidth:300}})})},getServerSideProps:(0,c.eq)(v,["admin"],{},async()=>({workspaces:await h.bl.get(y)}))}},j=a(97729),S=a.n(j);function k(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(S(),{children:(0,i.jsx)("title",{children:"Protofy - Groups"})}),(0,i.jsx)(b.groups.component,{...e})]})}},54283:function(e,t,a){"use strict";a.d(t,{$:function(){return l},J:function(){return o}});var i=a(94801),r=a(55858),s=a(53596);let n=(0,s.j)();class o{get(e,t){var a;return null!==(a=this.data[e])&&void 0!==a?a:t}getObjectSchema(){return this.objectSchema}getModelName(){return this.modelName}getLocation(){let e=this.objectSchema.is("location").getFields();if(!e.length)throw"Model error: "+this.getModelName()+" doesn't have location information";let t=e[0],a=this.objectSchema.getFieldKeyDefinition(t,"latKey"),i=this.objectSchema.getFieldKeyDefinition(t,"lonKey");if(this.data[t])return{lat:this.data[t][a],lon:this.data[t][i]}}getId(){return this.data[this.idField]}getNotificationsTopic(e){return"notifications/".concat(this.getModelName(),"/").concat(e,"/").concat(this.getId())}getNotificationsPayload(){return this.serialize()}setId(e,t){return new this.constructor({...t||this.data,[this.idField]:e},this.session,this.modelName)}isVisible(){return!this.isDeleted()}isDeleted(){return!!this.data._deleted}list(e,t,a){if(!e)return this.read();{let{parsed:t,searchWithoutTags:a}=function(e){let t;let a=/(\w+):("[^"]+"|\S+)/g,i={},r=e;for(;null!==(t=a.exec(e));){let e=t[1].toLowerCase(),a=t[2].replace(/"/g,"").toLowerCase();i[e]=a,r=r.replace(t[0],"")}return{parsed:i,searchWithoutTags:r=r.trim()}}(e);for(let[e,a]of Object.entries(t))if(!this.data.hasOwnProperty(e)||this.data[e]!=a){n.debug({data:this.data[e]},"discarded: ".concat(JSON.stringify(this.data[e])));return}let r=this.objectSchema.is("search").getFields();for(var i=0;i<r.length;i++)if((this.data[r[i]]+"").toLowerCase().includes(a.toLowerCase()))return this.read()}}async listTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,r=this.list(e,a,i);if(r)return await this.getObjectSchema().apply("list",r,t)}create(e){let t=this.getData(e);return n.debug({transformed:t},"Creating object: ".concat(JSON.stringify(t))),new this.constructor(t,this.session,this.modelName).validate()}async createTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("create",{...this.data},e);return this.create(t)}read(e){return{...this.data}}async readTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,a=await this.getObjectSchema().apply("read",this.read(t),e);return a}update(e,t){return e.setId(this.getId(),{...t||e.data})}async updateTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=await this.getObjectSchema().apply("update",{...e.data},t,{...this.data});return this.update(e,a)}delete(e){return new this.constructor({_deleted:!0,...e||this.data},this.session,this.modelName)}async deleteTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("delete",{...this.data},e);return this.delete(t)}validate(){return this.schema.parse(this.data),this}serialize(){return JSON.stringify(this.data)}static getApiOptions(){throw Error("Derived class must implement getApiOptions")}static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static unserialize(e,t){return this._newInstance(JSON.parse(e),t)}static load(e,t){return this._newInstance(e,t)}static sort(e,t,a){return e.sort((e,i)=>e[t]>i[t]?"asc"===a?1:-1:e[t]<i[t]?"asc"===a?-1:1:0)}getData(e){return{...this.getObjectSchema().applyGenerators(null!=e?e:this.data)}}constructor(e,t,a,s){var n,o;this.data=e,this.session=null!=a?a:(0,i.ed)(),this.schema=t,this.objectSchema=r.U.load(this.schema),this.modelName=null!==(n=null==s?void 0:s.toLowerCase())&&void 0!==n?n:"unknown";let l=this.objectSchema.is("id");l.getFields().length>1&&(l=l.isNot("fallbackId")),this.idField=null!==(o=l.getFirst("id"))&&void 0!==o?o:"id"}}class l extends o{static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static createDerived(e,t,a,i){class r extends l{static _newInstance(e,t){return new r(e,t)}static getApiOptions(){return{name:a,prefix:i}}constructor(a,i){super(a,t,i,e.substring(0,e.length-5).toLowerCase())}}return r.schemaInstance=t,Object.defineProperty(r,"name",{value:e,writable:!1}),r}constructor(e,t,a,i){super(e,t,a,i)}}},3559:function(e,t,a){"use strict";a.d(t,{d:function(){return o}});var i=a(30195),r=a(75370),s=a(54283);let n=r.V_.object({name:i.z.string().label("name").hint("user, admin, ...").static().id().search(),workspaces:i.z.array(i.z.string()).hidden(),permissions:i.z.array(i.z.string()).optional(),admin:i.z.boolean().optional()}),o=s.$.createDerived("GroupModel",n)},1888:function(e,t,a){"use strict";a.d(t,{F7:function(){return n},eq:function(){return o}});var i=a(44499),r=a(6429),s=a(48115);let n=e=>i.l.SSR?e:void 0;function o(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return n(async n=>{var o,l,d,c,u,h;let m={itemsPerPage:parseInt(n.query.itemsPerPage)?parseInt(n.query.itemsPerPage):"",page:parseInt(n.query.page,10)?parseInt(n.query.page,10):"",search:null!==(o=n.query.search)&&void 0!==o?o:"",orderBy:null!==(l=n.query.orderBy)&&void 0!==l?l:"",orderDirection:null!==(d=n.query.orderDirection)&&void 0!==d?d:"",view:null!==(c=n.query.view)&&void 0!==c?c:"",item:null!==(u=n.query.item)&&void 0!==u?u:"",editFile:null!==(h=n.query.editFile)&&void 0!==h?h:"",..."function"==typeof a?await a(n):a},p="function"==typeof e?e(n):e;return(0,r.NA)(n,t,{sourceUrl:p,initialItems:await s.bl.get({url:(0,r.VM)(p,n),...m}),itemData:n.query.item?await s.bl.get((0,r.VM)(p+"/"+n.query.item,n)):"",extraData:{..."function"==typeof i?await i(n):i},pageState:{...m}})})}}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,6313,3950,9331,9613,7369,2905,1004,9097,8404,4608,9774,2888,179],function(){return e(e.s=6984)}),_N_E=e.O()}]);