(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8774],{21599:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/objects",function(){return a(60356)}])},60356:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return h}});var r=a(52322),n=a(52415),i=a(40214),l=a(13997),o=a(50897),s=a(79562),u=a(1888),c=a(89560),d=a(66788),m=a(82695),p=a(8939),f=a(30195);let z={};var y={objects:{component:e=>{let{pageState:t,initialItems:a,pageSession:u}=e,{replace:y}=(0,m.N)(t);return(0,r.jsx)(i.D,{title:"Objects",pageSession:u,children:(0,r.jsx)(l.V,{integratedChat:!0,rowIcon:d.x,sourceUrl:"/adminapi/v1/objects",initialItems:a,numColumnsForm:1,name:"object",columns:o.Z.columns(o.Z.column("name",e=>e.name,"name",e=>(0,r.jsx)(p.sL,{id:"objects-datatable-"+e.name,children:(0,r.jsx)("span",{className:"  _col-675002279 _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px ",children:e.name})})),o.Z.column("features",e=>e.features,"features",e=>Object.keys(e.features).map(e=>(0,r.jsx)(s.A,{text:e,color:"$gray5"})))),extraFieldsFormsAdd:{api:f.z.boolean().after("keys").label("automatic crud api").defaultValue(!0),adminPage:f.z.boolean().after("keys").label("admin page").defaultValue(!0)},model:n.Wk,pageState:t,icons:z,deleteable:e=>{if(!Array.isArray(e))return 0===Object.keys(e.data.features).length;for(let t of e)if(0!==Object.keys(t.features).length)return!1;return!0},extraMenuActions:[{text:"Edit Object file",icon:c.z,action:e=>{y("editFile",e.getDefaultSchemaFilePath())},isVisible:e=>!0}]})})},getServerSideProps:(0,u.eq)("/adminapi/v1/objects",["admin"],{orderBy:"name"})}};a(9507);var b=a(97729),g=a.n(b);function h(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g(),{children:(0,r.jsx)("title",{children:"Protofy - Objects"})}),(0,r.jsx)(y.objects.component,{...e})]})}},52415:function(e,t,a){"use strict";a.d(t,{Wk:function(){return s}});var r=a(30195),n=a(54283);let i=r.z.object({id:r.z.string().search().id().generate(e=>e.name.charAt(0).toUpperCase()+e.name.slice(1)+"Model").hidden(),name:r.z.string().search().static(),features:r.z.any().generate({},!0).hidden(),keys:r.z.record(r.z.string().optional(),r.z.object({type:r.z.union([r.z.literal("string"),r.z.literal("number"),r.z.literal("boolean"),r.z.literal("array"),r.z.literal("object"),r.z.literal("record"),r.z.literal("union")]),params:r.z.array(r.z.string()).optional(),modifiers:r.z.array(r.z.object({name:r.z.union([r.z.literal("id"),r.z.literal("search"),r.z.literal("generate"),r.z.literal("display"),r.z.literal("optional"),r.z.literal("email"),r.z.literal("label"),r.z.literal("hint"),r.z.literal("static"),r.z.literal("min"),r.z.literal("max"),r.z.literal("secret"),r.z.literal("onCreate"),r.z.literal("onUpdate"),r.z.literal("onRead"),r.z.literal("onDelete"),r.z.literal("onList"),r.z.literal("name"),r.z.literal("location")]),params:r.z.array(r.z.string()).optional()}).name("name")).optional()}).name("name")).generate({})}),l=r.z.object({...i.shape}),o=e=>({...e,keys:Object.keys(e.keys?e.keys:{}).reduce((t,a)=>({...t,[a]:{type:"string",...e.keys[a]}}),{})});class s extends n.J{getDefaultSchemaFilePath(){return s.getDefaultSchemaFilePath(this.data.name)}static getDefaultSchemaFilePath(e){return"/packages/app/bundles/custom/objects/"+e+".ts"}create(e){let t=null!=e?e:this.getData(),a=o(t);return super.create(a)}update(e,t){let a=null!=t?t:e.data,r=o(a);return super.update(e,r)}static _newInstance(e,t){return new s(e,t)}constructor(e,t){super(e,l,t,"Object")}}},1888:function(e,t,a){"use strict";a.d(t,{F7:function(){return l},eq:function(){return o}});var r=a(46149),n=a(6429),i=a(48115);let l=e=>r.l.SSR?e:void 0;function o(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return l(async l=>{var o,s,u,c,d,m;let p={itemsPerPage:parseInt(l.query.itemsPerPage)?parseInt(l.query.itemsPerPage):"",page:parseInt(l.query.page,10)?parseInt(l.query.page,10):"",search:null!==(o=l.query.search)&&void 0!==o?o:"",orderBy:null!==(s=l.query.orderBy)&&void 0!==s?s:"",orderDirection:null!==(u=l.query.orderDirection)&&void 0!==u?u:"",view:null!==(c=l.query.view)&&void 0!==c?c:"",item:null!==(d=l.query.item)&&void 0!==d?d:"",editFile:null!==(m=l.query.editFile)&&void 0!==m?m:"",..."function"==typeof a?await a(l):a},f="function"==typeof e?e(l):e;return(0,n.NA)(l,t,{sourceUrl:f,initialItems:await i.bl.get({url:(0,n.VM)(f,l),...p}),itemData:l.query.item?await i.bl.get((0,n.VM)(f+"/"+l.query.item,l)):"",extraData:{..."function"==typeof r?await r(l):r},pageState:{...p}})})}},9507:function(){}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,6313,3950,397,7412,6163,1241,1004,6076,2029,1698,9774,2888,179],function(){return e(e.s=21599)}),_N_E=e.O()}]);