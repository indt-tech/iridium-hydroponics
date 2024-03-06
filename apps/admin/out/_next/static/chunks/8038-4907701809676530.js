(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8038],{54283:function(e,t,a){"use strict";a.d(t,{$:function(){return l},J:function(){return o}});var s=a(94801),i=a(55858),r=a(53596);let n=(0,r.j)();class o{get(e,t){var a;return null!==(a=this.data[e])&&void 0!==a?a:t}getObjectSchema(){return this.objectSchema}getModelName(){return this.modelName}getLocation(){let e=this.objectSchema.is("location").getFields();if(!e.length)throw"Model error: "+this.getModelName()+" doesn't have location information";let t=e[0],a=this.objectSchema.getFieldKeyDefinition(t,"latKey"),s=this.objectSchema.getFieldKeyDefinition(t,"lonKey");if(this.data[t])return{lat:this.data[t][a],lon:this.data[t][s]}}getId(){return this.data[this.idField]}getNotificationsTopic(e){return"notifications/".concat(this.getModelName(),"/").concat(e,"/").concat(this.getId())}getNotificationsPayload(){return this.serialize()}setId(e,t){return new this.constructor({...t||this.data,[this.idField]:e},this.session,this.modelName)}isVisible(){return!this.isDeleted()}isDeleted(){return!!this.data._deleted}list(e,t,a){if(!e)return this.read();{let{parsed:t,searchWithoutTags:a}=function(e){let t;let a=/(\w+):("[^"]+"|\S+)/g,s={},i=e;for(;null!==(t=a.exec(e));){let e=t[1].toLowerCase(),a=t[2].replace(/"/g,"").toLowerCase();s[e]=a,i=i.replace(t[0],"")}return{parsed:s,searchWithoutTags:i=i.trim()}}(e);for(let[e,a]of Object.entries(t))if(!this.data.hasOwnProperty(e)||this.data[e]!=a){n.debug({data:this.data[e]},"discarded: ".concat(JSON.stringify(this.data[e])));return}let i=this.objectSchema.is("search").getFields();for(var s=0;s<i.length;s++)if((this.data[i[s]]+"").toLowerCase().includes(a.toLowerCase()))return this.read()}}async listTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0,s=arguments.length>3?arguments[3]:void 0,i=this.list(e,a,s);if(i)return await this.getObjectSchema().apply("list",i,t)}create(e){let t=this.getData(e);return n.debug({transformed:t},"Creating object: ".concat(JSON.stringify(t))),new this.constructor(t,this.session,this.modelName).validate()}async createTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("create",{...this.data},e);return this.create(t)}read(e){return{...this.data}}async readTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,a=await this.getObjectSchema().apply("read",this.read(t),e);return a}update(e,t){return e.setId(this.getId(),{...t||e.data})}async updateTransformed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=await this.getObjectSchema().apply("update",{...e.data},t,{...this.data});return this.update(e,a)}delete(e){return new this.constructor({_deleted:!0,...e||this.data},this.session,this.modelName)}async deleteTransformed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=await this.getObjectSchema().apply("delete",{...this.data},e);return this.delete(t)}validate(){return this.schema.parse(this.data),this}serialize(){return JSON.stringify(this.data)}static getApiOptions(){throw Error("Derived class must implement getApiOptions")}static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static unserialize(e,t){return this._newInstance(JSON.parse(e),t)}static load(e,t){return this._newInstance(e,t)}static sort(e,t,a){return e.sort((e,s)=>e[t]>s[t]?"asc"===a?1:-1:e[t]<s[t]?"asc"===a?-1:1:0)}getData(e){return{...this.getObjectSchema().applyGenerators(null!=e?e:this.data)}}constructor(e,t,a,r){var n,o;this.data=e,this.session=null!=a?a:(0,s.ed)(),this.schema=t,this.objectSchema=i.U.load(this.schema),this.modelName=null!==(n=null==r?void 0:r.toLowerCase())&&void 0!==n?n:"unknown";let l=this.objectSchema.is("id");l.getFields().length>1&&(l=l.isNot("fallbackId")),this.idField=null!==(o=l.getFirst("id"))&&void 0!==o?o:"id"}}class l extends o{static _newInstance(e,t){throw Error("Derived class must implement _newInstance.")}static createDerived(e,t,a,s){class i extends l{static _newInstance(e,t){return new i(e,t)}static getApiOptions(){return{name:a,prefix:s}}constructor(a,s){super(a,t,s,e.substring(0,e.length-5).toLowerCase())}}return i.schemaInstance=t,Object.defineProperty(i,"name",{value:e,writable:!1}),i}constructor(e,t,a,s){super(e,t,a,s)}}},43657:function(e,t,a){"use strict";a.d(t,{jb:function(){return s}});let s=(e,t)=>t},18038:function(e,t,a){"use strict";a.d(t,{Z:function(){return N}});var s=a(52322),i=a(30195),r=a(75370),n=a(43657),o=a(54283);let l=r.V_.object({key:i.z.string(),value:i.z.any()}),d=r.V_.object((0,n.jb)("schema",{name:i.z.string().id().search().static(),entries:i.z.array(l).generate(()=>[])}));class c extends o.J{list(e){return e?JSON.stringify(this.data).toLowerCase().includes(e.toLowerCase())?this.read():void 0:this.read()}static _newInstance(e,t){return new c(e,t)}constructor(e,t){super(e,l,t,"Database")}}let u=o.$.createDerived("DatabaseModel",d,"databases","/api/v1/");var h=a(48115),p=a(40214),m=a(51813),b=a(13997),g=a(1888),v=a(5632),f=a(43260),y=a(2784),w=a(1050),S=a(78161),j=a(87656);let x=e=>{let{color:t="black",size:a=24,...i}=e;return(0,s.jsxs)(j.Svg,{width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...i,children:[(0,s.jsx)(j.Ellipse,{cx:"12",cy:"5",rx:"9",ry:"3",stroke:`${t}`}),(0,s.jsx)(j.Path,{d:"M3 5v14c0 1.4 3 2.7 7 3",stroke:`${t}`}),(0,s.jsx)(j.Path,{d:"M3 12c0 1.2 2 2.5 5 3",stroke:`${t}`}),(0,s.jsx)(j.Path,{d:"M21 5v4",stroke:`${t}`}),(0,s.jsx)(j.Path,{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",stroke:`${t}`}),(0,s.jsx)(j.Path,{d:"M12 12v4h4",stroke:`${t}`})]})};x.displayName="DatabaseBackup";let _=(0,y.memo)((0,S.H)(x));var k=a(1201);let I={},C="/adminapi/v1/databases",D=async e=>{let t=[];if(Array.isArray(e))t=e.map(e=>e.name);else if("string"==typeof e&&"*"===e)t=["*"];else if("object"==typeof e&&null!==e&&e.data)t=[e.data.name];else throw Error("Invalid input for extractIds");await h.bl.post("/adminapi/v1/backup/databases",t)};var N={databases:{component:e=>{var t,a;let{workspace:i,pageState:r,initialItems:n,pageSession:o}=e,l=(0,v.useRouter)(),[d,c]=(0,y.useState)(!1),[h,g]=(0,y.useState)(""),[f,S]=(0,y.useState)(""),[j,x]=(0,y.useState)(0),N={item:{buttonCaption:"Backup",title:"Create Backup",description:"Are you sure want to backup this database?"},bulk:{buttonCaption:"Backup",title:"Create Backups",description:"Are you sure want to backup "+j+" databases?"},global:{buttonCaption:"Backup all databases",title:"Create Backups",description:"Are you sure want to backup all databases?"}};return(0,k.G)(()=>"At this moment the user is browsing the databases list page. The databases list page allows to list the system databases. Databases are based on leveldb, and stored under /data/databases.\n            The user can use the database management page to view system databases, or can select a specific database from the list, and view the entries for the selected database.\n            The system databases store the information in key->value system, storing JSONs as the value. \n            The databases are used to store users, groups, and as a storage for any CRUD API created for a object.\n            To backup databases, just backup /data/databases folder. To reset a database, simply delete /data/databases/*databasename*.\n            Using a special file called initialData.json at the same directory of your API, automatic crud apis will load initialData.json contents into the database when creating the database the first time. \n            Be careful editing the databases manually, the application may break. \n            "+((null==n?void 0:n.isLoaded)?"Currently the system returned the following information: "+JSON.stringify(n.data):"")),(0,s.jsxs)(p.D,{title:"Databases",workspace:i,pageSession:o,children:[(0,s.jsx)(m.a,{acceptCaption:"Create Backup",setOpen:c,open:d,onAccept:async e=>{await D(h),e(!1)},title:null===(t=N[f])||void 0===t?void 0:t.title,description:null===(a=N[f])||void 0===a?void 0:a.description,w:400,children:(0,s.jsx)("div",{className:"  _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _fg-1 _jc-center _ai-center "})}),(0,s.jsx)(b.V,{integratedChat:!0,rowIcon:w.x,sourceUrl:C,initialItems:n,numColumnsForm:1,name:"database",onSelectItem:e=>{l.push("databases/view?database="+e.getId())},model:u,pageState:r,icons:I,extraMenuActions:[{text:e=>N[e].buttonCaption,icon:_,action:e=>{let t="item";"*"==e?t="global":Array.isArray(e)&&(t="bulk",x(e.length)),S(t),g(e),c(!0)},isVisible:e=>!0,menus:["item","global","bulk"]}]})]})},getServerSideProps:(0,g.eq)(C)},"databases/view":{component:e=>{var t;let{workspace:a,pageState:i,sourceUrl:r,initialItems:n,pageSession:o,extraData:l}=e,d=(0,v.useRouter)(),[u,m]=(0,y.useState)(null),[g,w]=(0,y.useState)(n),[S,j]=(0,y.useState)(""),[x,_]=(0,y.useState)(1),[k,C]=(0,y.useState)(!1),[D,N]=(0,y.useState)(!1),O=null!==(t=d.query.database)&&void 0!==t?t:"",P=async()=>{w(await h.bl.fetch("/adminapi/v1/databases/"+O))},q=async(e,t)=>{if(t)m(null),g.data.shift();else{let t=await h.bl.get("/adminapi/v1/databases/"+O+"/"+e+"/delete");(null==t?void 0:t.isLoaded)&&"deleted"==t.data.result&&(await P(),_(x+1))}},A=async(e,t)=>{let a=await h.bl.post("/adminapi/v1/databases/"+O+"/"+t,e);return(null==a?void 0:a.isLoaded)&&(await P(),_(x+1)),m(null),a};return(0,s.jsx)(p.D,{title:O,workspace:a,pageSession:o,children:(0,s.jsx)(b.V,{integratedChat:!0,sourceUrl:"/adminapi/v1/databases/"+O,initialItems:g,numColumnsForm:1,name:O,pluralName:O,model:c,pageState:i,icons:I,disableViewSelector:!0,defaultView:"grid",dataTableGridProps:{itemMinWidth:500,overScanBy:1,getCard:(e,t)=>{let{_key:a,...i}=e;return(0,s.jsx)("div",{className:"  _ai-stretch _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _pr-1481558152 _pl-1481558152 _pb-1316330145 _fg-1 ",children:(0,s.jsx)(f.I,{innerContainerProps:{maxWidth:700,$md:{maxWidth:450},$sm:{minWidth:"calc(100vw - 65px)",maxWidth:"calc(100vw - 65px)"},minWidth:300,p:"$3"},onDelete:q,onSave:e=>A(e,a),json:i,name:a,isTemplate:a==u},x)})}}},x)})},getServerSideProps:(0,g.eq)(e=>"/adminapi/v1/databases/"+e.query.database,["admin"])}};a(61394)},1888:function(e,t,a){"use strict";a.d(t,{F7:function(){return n},eq:function(){return o}});var s=a(44499),i=a(6429),r=a(48115);let n=e=>s.l.SSR?e:void 0;function o(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return n(async n=>{var o,l,d,c,u,h;let p={itemsPerPage:parseInt(n.query.itemsPerPage)?parseInt(n.query.itemsPerPage):"",page:parseInt(n.query.page,10)?parseInt(n.query.page,10):"",search:null!==(o=n.query.search)&&void 0!==o?o:"",orderBy:null!==(l=n.query.orderBy)&&void 0!==l?l:"",orderDirection:null!==(d=n.query.orderDirection)&&void 0!==d?d:"",view:null!==(c=n.query.view)&&void 0!==c?c:"",item:null!==(u=n.query.item)&&void 0!==u?u:"",editFile:null!==(h=n.query.editFile)&&void 0!==h?h:"",..."function"==typeof a?await a(n):a},m="function"==typeof e?e(n):e;return(0,i.NA)(n,t,{sourceUrl:m,initialItems:await r.bl.get({url:(0,i.VM)(m,n),...p}),itemData:n.query.item?await r.bl.get((0,i.VM)(m+"/"+n.query.item,n)):"",extraData:{..."function"==typeof s?await s(n):s},pageState:{...p}})})}},61394:function(){}}]);