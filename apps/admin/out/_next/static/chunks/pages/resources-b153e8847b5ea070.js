(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3584],{68918:function(e,t,r){"use strict";r.d(t,{d:function(){return l}});var s=r(78161),n=r(2784),o=r(73675),i=r(52322);let a=e=>{let{color:t="black",size:r=24,...s}=e;return(0,i.jsxs)(o.ny,{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...s,children:[(0,i.jsx)(o.y$,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",stroke:`${t}`}),(0,i.jsx)(o.aH,{points:"15 3 21 3 21 9",stroke:`${t}`}),(0,i.jsx)(o.x1,{x1:"10",x2:"21",y1:"14",y2:"3",stroke:`${t}`})]})};a.displayName="ExternalLink";let l=(0,n.memo)((0,s.H)(a))},34085:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resources",function(){return r(26920)}])},26920:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var s=r(52322),n=r(30195),o=r(75370),i=r(54283);let a=o.V_.object({name:n.z.string().hint("catalog, tutorial, invoice...").search(),description:n.z.string().search(),url:n.z.string().label("url").hint("http://...").static().search(),type:n.z.union([n.z.literal("text"),n.z.literal("video"),n.z.literal("image"),n.z.literal("code"),n.z.literal("youtube"),n.z.literal("pdf")]).search(),tags:n.z.array(n.z.string()).search()}),l=n.z.object({...o.Pp.shape,...a.shape});class c extends i.J{list(e){if(!e)return this.read();if(e.startsWith("tags:")){let t=e.slice(5).split(",").map(e=>e.trim().toLowerCase());if(t.every(e=>this.data.tags.includes(e.toLowerCase())))return this.read()}else{let r=this.objectSchema.is("search").getFields();for(var t=0;t<r.length;t++)if((this.data[r[t]]+"").toLowerCase().includes(e.toLowerCase()))return this.read()}}static _newInstance(e,t){return new c(e,t)}constructor(e,t){super(e,l,t)}}var u=r(40214),d=r(85077),h=r(50897),p=r(79562),m=r(1888),x=r(71932),g=r(68918),j=r(78161),k=r(2784),f=r(73675);let y=e=>{let{color:t="black",size:r=24,...n}=e;return(0,s.jsxs)(f.ny,{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...n,children:[(0,s.jsx)(f.y$,{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",stroke:`${t}`}),(0,s.jsx)(f.y$,{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",stroke:`${t}`})]})};y.displayName="Link";let v=(0,k.memo)((0,j.H)(y)),w={};var $={resources:{component:e=>{var t;let{pageState:r,initialItems:n,pageSession:o}=e;return(0,s.jsx)(u.D,{title:"Resources",pageSession:o,children:(0,s.jsx)(d.V,{integratedChat:!0,rowIcon:v,enableAddToInitialData:!0,sourceUrl:"/adminapi/v1/resources",initialItems:n,numColumnsForm:1,name:"resource",columns:h.Z.columns(h.Z.column("","lol",!0,e=>(0,s.jsx)("a",{href:e.url,target:"_blank",children:(0,s.jsx)(x.z,{Icon:g.d})}),!0,"50px"),h.Z.column("name","name",!0,void 0,!0,"250px"),h.Z.column("url","url",!0,void 0,!0,"400px"),h.Z.column("type","type",!0,e=>(0,s.jsx)(p.A,{text:e.type,color:"$gray5"}),!0,"150px"),h.Z.column("tags","tags",!1,e=>Object.keys(null!==(t=null==e?void 0:e.tags)&&void 0!==t?t:[]).length?Object.keys(e.tags).map((t,r)=>(0,s.jsx)(p.A,{ml:r?"$2":"$0",text:e.tags[t],color:"$color5"},t)):(0,s.jsx)(p.A,{text:"empty",color:"$gray5"}),!0,"200px")),model:c,pageState:r,icons:w})})},getServerSideProps:(0,m.eq)("/adminapi/v1/resources",["admin"],{})}},_=r(97729),z=r.n(_);function b(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(z(),{children:(0,s.jsx)("title",{children:"Protofy - Resources"})}),(0,s.jsx)($.resources.component,{...e})]})}}},function(e){e.O(0,[3950,7205,6851,9927,8594,2029,6282,9884,8164,1004,5552,5762,1773,3265,9401,9774,2888,179],function(){return e(e.s=34085)}),_N_E=e.O()}]);