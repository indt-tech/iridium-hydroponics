(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8774],{21599:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/objects",function(){return a(60356)}])},60356:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return z}});var i=a(52322),r=a(52415),n=a(40214),s=a(13997),l=a(50897),o=a(79562),c=a(1888),d=a(89560),u=a(66788),h=a(82695),m=a(8939),g=a(30195);let p={};var f={objects:{component:e=>{let{pageState:t,initialItems:a,pageSession:c}=e,{replace:f}=(0,h.N)(t);return(0,i.jsx)(n.D,{title:"Objects",pageSession:c,children:(0,i.jsx)(s.V,{integratedChat:!0,rowIcon:u.x,sourceUrl:"/adminapi/v1/objects",initialItems:a,numColumnsForm:1,name:"object",columns:l.Z.columns(l.Z.column("name","name",!0,e=>(0,i.jsx)(m.sL,{id:"objects-datatable-"+e.name,children:e.name})),l.Z.column("features","features",!0,e=>Object.keys(e.features).map(e=>(0,i.jsx)(o.A,{text:e,color:"$gray5"})))),extraFieldsFormsAdd:{api:g.z.boolean().after("keys").label("automatic crud api").defaultValue(!0),adminPage:g.z.boolean().after("keys").label("admin page").defaultValue(!0)},model:r.Wk,pageState:t,icons:p,deleteable:e=>{if(!Array.isArray(e))return 0===Object.keys(e.data.features).length;for(let t of e)if(0!==Object.keys(t.features).length)return!1;return!0},extraMenuActions:[{text:"Edit Object file",icon:d.z,action:e=>{f("editFile",e.getDefaultSchemaFilePath())},isVisible:e=>!0}]})})},getServerSideProps:(0,c.eq)("/adminapi/v1/objects",["admin"],{orderBy:"name"})}},y=a(97729),b=a.n(y);function z(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(b(),{children:(0,i.jsx)("title",{children:"Protofy - Objects"})}),(0,i.jsx)(f.objects.component,{...e})]})}},54283:function(e,t,a){"use strict";a.d(t,{$:function(){return o},J:function(){return l}});var i=a(94801),r=a(55858),n=a(53596);let s=(0,n.j)();class l{get(e,t){var a;return null!==(a=this.data[e])&&void 0!==a?a:t}getObjectSchema(){return this.objectSchema}getModelName(){return this.modelName}getLocation(){let e=this.objectSchema.is("location").getFields();if(!e.length)throw"Model error: "+this.getModelName()+" doesn't have location information";let t=e[0],a=this.objectSchema.getFieldKeyDefinition(t,"latKey"),i=this.objectSchema.getFieldKeyDefinition(t,"lonKey");if(this.data[t])return{lat:this.data[t][a],lon:this.data[t][i]}}getId(){return this.data[this.idField]}getNotificationsTopic(e){return"notifications/".concat(this.getModelName(),"/").concat(e,"/").concat(this.getId())}getNotificationsPayload(){return this.serialize()}setId(e,t){return new this.constructor({...t||this.data,[this.idField]:e},this.session,this.modelName)}isVisible(){return!this.isDeleted()}isDeleted(){return!!this.data._deleted}list(e,t,a){if(!e)return this.read();{let{parsed:t,searchWithoutTags:a}=function(e){let t;let a=/(\w+):("[^"]+"|\S+)/g,i={},r=e;for(;null!==(t=a.exec(e));){let e=t[1].toLowerCase(),a=t[2].replace(/"/g,"").toLowerCase();i[e]=a,r=r.replace(t[0],"")}return{parsed:i,searchWithoutTags:r=r.trim()}}(e);for(let[e,a]of Object.entries(t))if(!this.data.hasOwnProperty(e)||this.data[e]!=a){s.debug({data:this.data[e]},"discarded: ".concat(JSON.stringify(this.data[e])));return}let r=this.objectSchema.is("search").getFields();for(var i=0;i<r.length;i++)if((this.data[r[i]]+"").toLowerCase().includes(a.toLowerCase()))return this.read()}}async listTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,r=this.list(e,a,i);if(r)return await this.getObjectSchema().apply("list",r,t)}create(e){let t=this.getData(e);return s.debug({transformed:t},"Creating object: ".concat(JSON.stringify(t))),new this.constructor(t,this.session,this.modelName).validate()}async createTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("create",{...this.data},e);return this.create(t)}read(e){return{...this.data}}async readTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,a=await this.getObjectSchema().apply("read",this.read(t),e);return a}update(e,t){return e.setId(this.getId(),{...t||e.data})}async updateTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=await this.getObjectSchema().apply("update",{...e.data},t,{...this.data});return this.update(e,a)}delete(e){return new this.constructor({_deleted:!0,...e||this.data},this.session,this.modelName)}async deleteTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("delete",{...this.data},e);return this.delete(t)}validate(){return this.schema.parse(this.data),this}serialize(){return JSON.stringify(this.data)}static getApiOptions(){throw Error("Derived class must implement getApiOptions")}static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static unserialize(e,t){return this._newInstance(JSON.parse(e),t)}static load(e,t){return this._newInstance(e,t)}static sort(e,t,a){return e.sort((e,i)=>e[t]>i[t]?"asc"===a?1:-1:e[t]<i[t]?"asc"===a?-1:1:0)}getData(e){return{...this.getObjectSchema().applyGenerators(null!=e?e:this.data)}}constructor(e,t,a,n){var s,l;this.data=e,this.session=null!=a?a:(0,i.ed)(),this.schema=t,this.objectSchema=r.U.load(this.schema),this.modelName=null!==(s=null==n?void 0:n.toLowerCase())&&void 0!==s?s:"unknown";let o=this.objectSchema.is("id");o.getFields().length>1&&(o=o.isNot("fallbackId")),this.idField=null!==(l=o.getFirst("id"))&&void 0!==l?l:"id"}}class o extends l{static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static createDerived(e,t,a,i){class r extends o{static _newInstance(e,t){return new r(e,t)}static getApiOptions(){return{name:a,prefix:i}}constructor(a,i){super(a,t,i,e.substring(0,e.length-5).toLowerCase())}}return r.schemaInstance=t,Object.defineProperty(r,"name",{value:e,writable:!1}),r}constructor(e,t,a,i){super(e,t,a,i)}}},52415:function(e,t,a){"use strict";a.d(t,{Wk:function(){return o}});var i=a(30195),r=a(54283);let n=i.z.object({id:i.z.string().search().id().generate(e=>e.name.charAt(0).toUpperCase()+e.name.slice(1)+"Model").hidden(),name:i.z.string().search().static(),features:i.z.any().generate({},!0).hidden(),keys:i.z.record(i.z.string().optional(),i.z.object({type:i.z.union([i.z.literal("string"),i.z.literal("number"),i.z.literal("boolean"),i.z.literal("array"),i.z.literal("object"),i.z.literal("record"),i.z.literal("union")]),params:i.z.array(i.z.string()).optional(),modifiers:i.z.array(i.z.object({name:i.z.union([i.z.literal("id"),i.z.literal("search"),i.z.literal("generate"),i.z.literal("display"),i.z.literal("optional"),i.z.literal("email"),i.z.literal("label"),i.z.literal("hint"),i.z.literal("static"),i.z.literal("min"),i.z.literal("max"),i.z.literal("secret"),i.z.literal("onCreate"),i.z.literal("onUpdate"),i.z.literal("onRead"),i.z.literal("onDelete"),i.z.literal("onList"),i.z.literal("name"),i.z.literal("location")]),params:i.z.array(i.z.string()).optional()}).name("name")).optional()}).name("name")).generate({})}),s=i.z.object({...n.shape}),l=e=>({...e,keys:Object.keys(e.keys?e.keys:{}).reduce((t,a)=>({...t,[a]:{type:"string",...e.keys[a]}}),{})});class o extends r.J{getDefaultSchemaFilePath(){return o.getDefaultSchemaFilePath(this.data.name)}static getDefaultSchemaFilePath(e){return"/packages/app/bundles/custom/objects/"+e+".ts"}create(e){let t=null!=e?e:this.getData(),a=l(t);return super.create(a)}update(e,t){let a=null!=t?t:e.data,i=l(a);return super.update(e,i)}static _newInstance(e,t){return new o(e,t)}constructor(e,t){super(e,s,t,"Object")}}},1888:function(e,t,a){"use strict";a.d(t,{F7:function(){return s},eq:function(){return l}});var i=a(44499),r=a(6429),n=a(48115);let s=e=>i.l.SSR?e:void 0;function l(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return s(async s=>{var l,o,c,d,u,h;let m={itemsPerPage:parseInt(s.query.itemsPerPage)?parseInt(s.query.itemsPerPage):"",page:parseInt(s.query.page,10)?parseInt(s.query.page,10):"",search:null!==(l=s.query.search)&&void 0!==l?l:"",orderBy:null!==(o=s.query.orderBy)&&void 0!==o?o:"",orderDirection:null!==(c=s.query.orderDirection)&&void 0!==c?c:"",view:null!==(d=s.query.view)&&void 0!==d?d:"",item:null!==(u=s.query.item)&&void 0!==u?u:"",editFile:null!==(h=s.query.editFile)&&void 0!==h?h:"",..."function"==typeof a?await a(s):a},g="function"==typeof e?e(s):e;return(0,r.NA)(s,t,{sourceUrl:g,initialItems:await n.bl.get({url:(0,r.VM)(g,s),...m}),itemData:s.query.item?await n.bl.get((0,r.VM)(g+"/"+s.query.item,s)):"",extraData:{..."function"==typeof i?await i(s):i},pageState:{...m}})})}}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,6313,3950,9331,9613,7369,2905,1004,9097,8404,4608,9774,2888,179],function(){return e(e.s=21599)}),_N_E=e.O()}]);