(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3584],{68918:function(e,t,i){"use strict";i.d(t,{d:function(){return l}});var r=i(78161),a=i(2784),s=i(87656),n=i(52322);let o=e=>{let{color:t="black",size:i=24,...r}=e;return(0,n.jsxs)(s.Svg,{width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...r,children:[(0,n.jsx)(s.Path,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",stroke:`${t}`}),(0,n.jsx)(s.Polyline,{points:"15 3 21 3 21 9",stroke:`${t}`}),(0,n.jsx)(s.Line,{x1:"10",x2:"21",y1:"14",y2:"3",stroke:`${t}`})]})};o.displayName="ExternalLink";let l=(0,a.memo)((0,r.H)(o))},34085:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resources",function(){return i(26920)}])},26920:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return _}});var r=i(52322),a=i(30195),s=i(75370),n=i(54283);let o=s.V_.object({name:a.z.string().hint("catalog, tutorial, invoice...").search(),description:a.z.string().search(),url:a.z.string().label("url").hint("http://...").static().search(),type:a.z.union([a.z.literal("text"),a.z.literal("video"),a.z.literal("image"),a.z.literal("code"),a.z.literal("youtube"),a.z.literal("pdf")]).search(),tags:a.z.array(a.z.string()).search()}),l=a.z.object({...s.Pp.shape,...o.shape});class c extends n.J{list(e){if(!e)return this.read();if(e.startsWith("tags:")){let t=e.slice(5).split(",").map(e=>e.trim().toLowerCase());if(t.every(e=>this.data.tags.includes(e.toLowerCase())))return this.read()}else{let i=this.objectSchema.is("search").getFields();for(var t=0;t<i.length;t++)if((this.data[i[t]]+"").toLowerCase().includes(e.toLowerCase()))return this.read()}}static _newInstance(e,t){return new c(e,t)}constructor(e,t){super(e,l,t,"Resource")}}var d=i(40214),u=i(13997),h=i(50897),m=i(79562),g=i(1888),p=i(71932),f=i(68918),v=i(78161),y=i(2784),w=i(87656);let j=e=>{let{color:t="black",size:i=24,...a}=e;return(0,r.jsxs)(w.Svg,{width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...a,children:[(0,r.jsx)(w.Path,{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",stroke:`${t}`}),(0,r.jsx)(w.Path,{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",stroke:`${t}`})]})};j.displayName="Link";let b=(0,y.memo)((0,v.H)(j)),x={};var S={resources:{component:e=>{var t;let{pageState:i,initialItems:a,pageSession:s}=e;return(0,r.jsx)(d.D,{title:"Resources",pageSession:s,children:(0,r.jsx)(u.V,{integratedChat:!0,rowIcon:b,enableAddToInitialData:!0,sourceUrl:"/adminapi/v1/resources",initialItems:a,numColumnsForm:1,name:"resource",columns:h.Z.columns(h.Z.column("","lol",!0,e=>(0,r.jsx)("a",{href:e.url,target:"_blank",children:(0,r.jsx)(p.z,{Icon:f.d})}),!0,"50px"),h.Z.column("name","name",!0,void 0,!0,"250px"),h.Z.column("url","url",!0,void 0,!0,"400px"),h.Z.column("type","type",!0,e=>(0,r.jsx)(m.A,{text:e.type,color:"$gray5"}),!0,"150px"),h.Z.column("tags","tags",!1,e=>Object.keys(null!==(t=null==e?void 0:e.tags)&&void 0!==t?t:[]).length?Object.keys(e.tags).map((t,i)=>(0,r.jsx)(m.A,{ml:i?"$2":"$0",text:e.tags[t],color:"$color5"},t)):(0,r.jsx)(m.A,{text:"empty",color:"$gray5"}),!0,"200px")),model:c,pageState:i,icons:x})})},getServerSideProps:(0,g.eq)("/adminapi/v1/resources",["admin"],{})}},k=i(97729),I=i.n(k);function _(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(I(),{children:(0,r.jsx)("title",{children:"Protofy - Resources"})}),(0,r.jsx)(S.resources.component,{...e})]})}},54283:function(e,t,i){"use strict";i.d(t,{$:function(){return l},J:function(){return o}});var r=i(94801),a=i(55858),s=i(53596);let n=(0,s.j)();class o{get(e,t){var i;return null!==(i=this.data[e])&&void 0!==i?i:t}getObjectSchema(){return this.objectSchema}getModelName(){return this.modelName}getLocation(){let e=this.objectSchema.is("location").getFields();if(!e.length)throw"Model error: "+this.getModelName()+" doesn't have location information";let t=e[0],i=this.objectSchema.getFieldKeyDefinition(t,"latKey"),r=this.objectSchema.getFieldKeyDefinition(t,"lonKey");if(this.data[t])return{lat:this.data[t][i],lon:this.data[t][r]}}getId(){return this.data[this.idField]}getNotificationsTopic(e){return"notifications/".concat(this.getModelName(),"/").concat(e,"/").concat(this.getId())}getNotificationsPayload(){return this.serialize()}setId(e,t){return new this.constructor({...t||this.data,[this.idField]:e},this.session,this.modelName)}isVisible(){return!this.isDeleted()}isDeleted(){return!!this.data._deleted}list(e,t,i){if(!e)return this.read();{let{parsed:t,searchWithoutTags:i}=function(e){let t;let i=/(\w+):("[^"]+"|\S+)/g,r={},a=e;for(;null!==(t=i.exec(e));){let e=t[1].toLowerCase(),i=t[2].replace(/"/g,"").toLowerCase();r[e]=i,a=a.replace(t[0],"")}return{parsed:r,searchWithoutTags:a=a.trim()}}(e);for(let[e,i]of Object.entries(t))if(!this.data.hasOwnProperty(e)||this.data[e]!=i){n.debug({data:this.data[e]},"discarded: ".concat(JSON.stringify(this.data[e])));return}let a=this.objectSchema.is("search").getFields();for(var r=0;r<a.length;r++)if((this.data[a[r]]+"").toLowerCase().includes(i.toLowerCase()))return this.read()}}async listTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,a=this.list(e,i,r);if(a)return await this.getObjectSchema().apply("list",a,t)}create(e){let t=this.getData(e);return n.debug({transformed:t},"Creating object: ".concat(JSON.stringify(t))),new this.constructor(t,this.session,this.modelName).validate()}async createTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("create",{...this.data},e);return this.create(t)}read(e){return{...this.data}}async readTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,i=await this.getObjectSchema().apply("read",this.read(t),e);return i}update(e,t){return e.setId(this.getId(),{...t||e.data})}async updateTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=await this.getObjectSchema().apply("update",{...e.data},t,{...this.data});return this.update(e,i)}delete(e){return new this.constructor({_deleted:!0,...e||this.data},this.session,this.modelName)}async deleteTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("delete",{...this.data},e);return this.delete(t)}validate(){return this.schema.parse(this.data),this}serialize(){return JSON.stringify(this.data)}static getApiOptions(){throw Error("Derived class must implement getApiOptions")}static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static unserialize(e,t){return this._newInstance(JSON.parse(e),t)}static load(e,t){return this._newInstance(e,t)}static sort(e,t,i){return e.sort((e,r)=>e[t]>r[t]?"asc"===i?1:-1:e[t]<r[t]?"asc"===i?-1:1:0)}getData(e){return{...this.getObjectSchema().applyGenerators(null!=e?e:this.data)}}constructor(e,t,i,s){var n,o;this.data=e,this.session=null!=i?i:(0,r.ed)(),this.schema=t,this.objectSchema=a.U.load(this.schema),this.modelName=null!==(n=null==s?void 0:s.toLowerCase())&&void 0!==n?n:"unknown";let l=this.objectSchema.is("id");l.getFields().length>1&&(l=l.isNot("fallbackId")),this.idField=null!==(o=l.getFirst("id"))&&void 0!==o?o:"id"}}class l extends o{static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static createDerived(e,t,i,r){class a extends l{static _newInstance(e,t){return new a(e,t)}static getApiOptions(){return{name:i,prefix:r}}constructor(i,r){super(i,t,r,e.substring(0,e.length-5).toLowerCase())}}return a.schemaInstance=t,Object.defineProperty(a,"name",{value:e,writable:!1}),a}constructor(e,t,i,r){super(e,t,i,r)}}},1888:function(e,t,i){"use strict";i.d(t,{F7:function(){return n},eq:function(){return o}});var r=i(44499),a=i(6429),s=i(48115);let n=e=>r.l.SSR?e:void 0;function o(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return n(async n=>{var o,l,c,d,u,h;let m={itemsPerPage:parseInt(n.query.itemsPerPage)?parseInt(n.query.itemsPerPage):"",page:parseInt(n.query.page,10)?parseInt(n.query.page,10):"",search:null!==(o=n.query.search)&&void 0!==o?o:"",orderBy:null!==(l=n.query.orderBy)&&void 0!==l?l:"",orderDirection:null!==(c=n.query.orderDirection)&&void 0!==c?c:"",view:null!==(d=n.query.view)&&void 0!==d?d:"",item:null!==(u=n.query.item)&&void 0!==u?u:"",editFile:null!==(h=n.query.editFile)&&void 0!==h?h:"",..."function"==typeof i?await i(n):i},g="function"==typeof e?e(n):e;return(0,a.NA)(n,t,{sourceUrl:g,initialItems:await s.bl.get({url:(0,a.VM)(g,n),...m}),itemData:n.query.item?await s.bl.get((0,a.VM)(g+"/"+n.query.item,n)):"",extraData:{..."function"==typeof r?await r(n):r},pageState:{...m}})})}}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,6313,3950,9331,9613,7369,2905,1004,9097,8404,4608,9774,2888,179],function(){return e(e.s=34085)}),_N_E=e.O()}]);