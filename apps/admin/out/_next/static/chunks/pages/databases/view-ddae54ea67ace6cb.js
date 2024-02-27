(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4176],{64848:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/databases/view",function(){return t(51507)}])},51507:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return o}});var s=t(52322),i=t(18038),n=t(97729),r=t.n(n);function o(e){let a=i.Z["databases/view"].component;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r(),{children:(0,s.jsx)("title",{children:"Protofy - View Database"})}),(0,s.jsx)(a,{...e})]})}},43657:function(e,a,t){"use strict";t.d(a,{jb:function(){return s}});let s=(e,a)=>a},18038:function(e,a,t){"use strict";t.d(a,{Z:function(){return N}});var s=t(52322),i=t(30195),n=t(75370),r=t(43657),o=t(54283);let d=n.V_.object({key:i.z.string(),value:i.z.any()}),l=n.V_.object((0,r.jb)("schema",{name:i.z.string().id().search().static(),entries:i.z.array(d).generate(()=>[])}));class c extends o.J{list(e){return e?JSON.stringify(this.data).toLowerCase().includes(e.toLowerCase())?this.read():void 0:this.read()}static _newInstance(e,a){return new c(e,a)}constructor(e,a){super(e,d,a,"Database")}}let u=o.$.createDerived("DatabaseModel",l,"databases","/api/v1/");var b=t(48115),p=t(40214),m=t(51813),h=t(13997),f=t(1888),v=t(5632),w=t(43260),x=t(2784),y=t(1050),_=t(78161),g=t(73675);let j=e=>{let{color:a="black",size:t=24,...i}=e;return(0,s.jsxs)(g.ny,{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:`${a}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...i,children:[(0,s.jsx)(g.Pj,{cx:"12",cy:"5",rx:"9",ry:"3",stroke:`${a}`}),(0,s.jsx)(g.y$,{d:"M3 5v14c0 1.4 3 2.7 7 3",stroke:`${a}`}),(0,s.jsx)(g.y$,{d:"M3 12c0 1.2 2 2.5 5 3",stroke:`${a}`}),(0,s.jsx)(g.y$,{d:"M21 5v4",stroke:`${a}`}),(0,s.jsx)(g.y$,{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",stroke:`${a}`}),(0,s.jsx)(g.y$,{d:"M12 12v4h4",stroke:`${a}`})]})};j.displayName="DatabaseBackup";let k=(0,x.memo)((0,_.H)(j));var S=t(1201);let $={},C="/adminapi/v1/databases",D=async e=>{let a=[];if(Array.isArray(e))a=e.map(e=>e.name);else if("string"==typeof e&&"*"===e)a=["*"];else if("object"==typeof e&&null!==e&&e.data)a=[e.data.name];else throw Error("Invalid input for extractIds");await b.bl.post("/adminapi/v1/backup/databases",a)};var N={databases:{component:e=>{let{workspace:a,pageState:t,initialItems:i,pageSession:n}=e,r=(0,v.useRouter)(),[o,d]=(0,x.useState)(!1),[l,c]=(0,x.useState)("");return(0,S.G)(()=>"At this moment the user is browsing the databases list page. The databases list page allows to list the system databases. Databases are based on leveldb, and stored under /data/databases.\n            The user can use the database management page to view system databases, or can select a specific database from the list, and view the entries for the selected database.\n            The system databases store the information in key->value system, storing JSONs as the value. \n            The databases are used to store users, groups, and as a storage for any CRUD API created for a object.\n            To backup databases, just backup /data/databases folder. To reset a database, simply delete /data/databases/*databasename*.\n            Using a special file called initialData.json at the same directory of your API, automatic crud apis will load initialData.json contents into the database when creating the database the first time. \n            Be careful editing the databases manually, the application may break. \n            "+((null==i?void 0:i.isLoaded)?"Currently the system returned the following information: "+JSON.stringify(i.data):"")),(0,s.jsxs)(p.D,{title:"Databases",workspace:a,pageSession:n,children:[(0,s.jsx)(m.a,{acceptCaption:"Create Backup",setOpen:d,open:o,onAccept:async e=>{await D(l),e(!1)},title:"Create Backup",description:"Are you sure want to backup this item?",w:280,children:(0,s.jsx)("div",{className:"  _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _fg-1 _jc-center _ai-center "})}),(0,s.jsx)(h.V,{integratedChat:!0,rowIcon:y.x,sourceUrl:C,initialItems:i,numColumnsForm:1,name:"database",onSelectItem:e=>{r.push("databases/view?database="+e.getId())},model:u,pageState:t,icons:$,extraMenuActions:[{text:"Backup",icon:k,action:e=>{c(e),d(!0)},isVisible:e=>!0,menus:["item","global","bulk"]}]})]})},getServerSideProps:(0,f.eq)(C)},"databases/view":{component:e=>{var a;let{workspace:t,pageState:i,sourceUrl:n,initialItems:r,pageSession:o,extraData:d}=e,l=(0,v.useRouter)(),[u,m]=(0,x.useState)(null),[f,y]=(0,x.useState)(r),[_,g]=(0,x.useState)(""),[j,k]=(0,x.useState)(1),[S,C]=(0,x.useState)(!1),[D,N]=(0,x.useState)(!1),I=null!==(a=l.query.database)&&void 0!==a?a:"",P=async()=>{y(await b.bl.fetch("/adminapi/v1/databases/"+I))},T=async(e,a)=>{if(a)m(null),f.data.shift();else{let a=await b.bl.get("/adminapi/v1/databases/"+I+"/"+e+"/delete");(null==a?void 0:a.isLoaded)&&"deleted"==a.data.result&&(await P(),k(j+1))}},A=async(e,a)=>{let t=await b.bl.post("/adminapi/v1/databases/"+I+"/"+a,e);return(null==t?void 0:t.isLoaded)&&(await P(),k(j+1)),m(null),t};return(0,s.jsx)(p.D,{title:I,workspace:t,pageSession:o,children:(0,s.jsx)(h.V,{integratedChat:!0,sourceUrl:"/adminapi/v1/databases/"+I,initialItems:f,numColumnsForm:1,name:I,pluralName:I,model:c,pageState:i,icons:$,disableViewSelector:!0,defaultView:"grid",dataTableGridProps:{itemMinWidth:500,overScanBy:1,getCard:(e,a)=>{let{_key:t,...i}=e;return(0,s.jsx)("div",{className:"  _ai-stretch _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _pr-1481558152 _pl-1481558152 _pb-1316330145 _fg-1 ",children:(0,s.jsx)(w.I,{innerContainerProps:{maxWidth:700,$md:{maxWidth:450},$sm:{minWidth:"calc(100vw - 65px)",maxWidth:"calc(100vw - 65px)"},minWidth:300,p:"$3"},onDelete:T,onSave:e=>A(e,t),json:i,name:t,isTemplate:t==u},j)})}}},j)})},getServerSideProps:(0,f.eq)(e=>"/adminapi/v1/databases/"+e.query.database,["admin"])}};t(61394)},61394:function(){}},function(e){e.O(0,[8641,8081,4733,8873,6313,3950,7205,6851,9927,7360,9498,1967,9920,9884,995,1004,4152,8676,6083,1773,3265,4935,9774,2888,179],function(){return e(e.s=64848)}),_N_E=e.O()}]);