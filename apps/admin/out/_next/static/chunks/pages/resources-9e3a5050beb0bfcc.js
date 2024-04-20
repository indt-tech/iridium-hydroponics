(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3584],{68918:function(e,t,r){"use strict";r.d(t,{d:function(){return l}});var n=r(78161),s=r(2784),i=r(87656),o=r(52322);let a=e=>{let{color:t="black",size:r=24,...n}=e;return(0,o.jsxs)(i.Svg,{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...n,children:[(0,o.jsx)(i.Path,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",stroke:`${t}`}),(0,o.jsx)(i.Polyline,{points:"15 3 21 3 21 9",stroke:`${t}`}),(0,o.jsx)(i.Line,{x1:"10",x2:"21",y1:"14",y2:"3",stroke:`${t}`})]})};a.displayName="ExternalLink";let l=(0,s.memo)((0,n.H)(a))},34085:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resources",function(){return r(26920)}])},26920:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return P}});var n=r(52322),s=r(30195),i=r(75370),o=r(54283);let a=i.V_.object({name:s.z.string().hint("catalog, tutorial, invoice...").search(),description:s.z.string().search(),url:s.z.string().label("url").hint("http://...").static().search(),type:s.z.union([s.z.literal("text"),s.z.literal("video"),s.z.literal("image"),s.z.literal("code"),s.z.literal("youtube"),s.z.literal("pdf")]).search(),tags:s.z.array(s.z.string()).search()}),l=s.z.object({...i.Pp.shape,...a.shape});class c extends o.J{list(e){if(!e)return this.read();if(e.startsWith("tags:")){let t=e.slice(5).split(",").map(e=>e.trim().toLowerCase());if(t.every(e=>this.data.tags.includes(e.toLowerCase())))return this.read()}else{let r=this.objectSchema.is("search").getFields();for(var t=0;t<r.length;t++)if((this.data[r[t]]+"").toLowerCase().includes(e.toLowerCase()))return this.read()}}static _newInstance(e,t){return new c(e,t)}constructor(e,t){super(e,l,t,"Resource")}}var u=r(99361),d=r(13997),p=r(50897),m=r(79562),h=r(1888),x=r(71932),_=r(68918),f=r(78161),g=r(2784),v=r(87656);let y=e=>{let{color:t="black",size:r=24,...s}=e;return(0,n.jsxs)(v.Svg,{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:`${t}`,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...s,children:[(0,n.jsx)(v.Path,{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",stroke:`${t}`}),(0,n.jsx)(v.Path,{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",stroke:`${t}`})]})};y.displayName="Link";let j=(0,g.memo)((0,f.H)(y)),w={};var b={resources:{component:e=>{var t;let{pageState:r,initialItems:s,pageSession:i}=e;return(0,n.jsx)(u.D,{title:"Resources",pageSession:i,children:(0,n.jsx)(d.V,{integratedChat:!0,rowIcon:j,enableAddToInitialData:!0,sourceUrl:"/adminapi/v1/resources",initialItems:s,numColumnsForm:1,name:"resource",columns:p.Z.columns(p.Z.column("",()=>"",!1,e=>(0,n.jsx)("a",{href:e.url,target:"_blank",children:(0,n.jsx)(x.z,{Icon:_.d})}),!0,"50px"),p.Z.column("name",e=>e.name,"name",void 0,!0,"250px"),p.Z.column("url",e=>e.url,"url",void 0,!0,"400px"),p.Z.column("type",e=>e.type,"type",e=>(0,n.jsx)(m.A,{text:e.type,color:"$gray5"}),!0,"150px"),p.Z.column("tags",e=>e.tags,"tags",e=>Object.keys(null!==(t=null==e?void 0:e.tags)&&void 0!==t?t:[]).length?Object.keys(e.tags).map((t,r)=>(0,n.jsx)(m.A,{ml:r?"$2":"$0",text:e.tags[t],color:"$color5"},t)):(0,n.jsx)(m.A,{text:"empty",color:"$gray5"}),!0,"200px")),model:c,pageState:r,icons:w})})},getServerSideProps:(0,h.eq)("/adminapi/v1/resources",["admin"],{})}},k=r(97729),z=r.n(k);function P(e){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(z(),{children:(0,n.jsx)("title",{children:"Protofy - Resources"})}),(0,n.jsx)(b.resources.component,{...e})]})}},79562:function(e,t,r){"use strict";r.d(t,{A:function(){return l}});var n=r(52322),s=r(2784),i=r(8939),o=r(60545),a=r(70396);let l=e=>{let{loading:t,icon:r,text:l,bold:c,color:u,...d}=e;return(0,n.jsxs)(i.sL,{ai:"center",jc:"center",bc:null!=u?u:"$color5",p:2,px:"$3",br:25,...d,children:[r&&s.cloneElement(r,{size:20,strokeWidth:.7,color:"var(--color)"}),l&&(0,n.jsx)("span",{className:(0,a.concatClassName)("  is_SizableText _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px   _o-0d0t9746  _col-675002279 _ff-299667014 _fow-233016047 _ls-167743966 _fos-229441127 _lh-222976480 font_body  "+(r?" _ml-1481558214":" _ml-1481558400")+" "+(c?" _fow-900":" _fow-400")),children:l}),t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{className:"  is_Spacer _ai-stretch _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-9px _miw-9px _fs-0 _pe-none _w-9px _h-9px "}),(0,n.jsx)(o.$,{color:"var(--color8)",scale:.7,size:"small"})]})]})};r(71619)},1888:function(e,t,r){"use strict";r.d(t,{F7:function(){return o},eq:function(){return a}});var n=r(46149),s=r(6429),i=r(48115);let o=e=>n.l.SSR?e:void 0;function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return o(async o=>{var a,l,c,u,d,p;let m={itemsPerPage:parseInt(o.query.itemsPerPage)?parseInt(o.query.itemsPerPage):"",page:parseInt(o.query.page,10)?parseInt(o.query.page,10):"",search:null!==(a=o.query.search)&&void 0!==a?a:"",orderBy:null!==(l=o.query.orderBy)&&void 0!==l?l:"",orderDirection:null!==(c=o.query.orderDirection)&&void 0!==c?c:"",view:null!==(u=o.query.view)&&void 0!==u?u:"",item:null!==(d=o.query.item)&&void 0!==d?d:"",editFile:null!==(p=o.query.editFile)&&void 0!==p?p:"",..."function"==typeof r?await r(o):r},h="function"==typeof e?e(o):e;return(0,s.NA)(o,t,{sourceUrl:h,initialItems:await i.bl.get({url:(0,s.VM)(h,o),...m}),itemData:o.query.item?await i.bl.get((0,s.VM)(h+"/"+o.query.item,o)):"",extraData:{..."function"==typeof n?await n(o):n},pageState:{...m}})})}},71619:function(){}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,6313,3950,397,776,9191,986,1004,1823,2029,1698,9774,2888,179],function(){return e(e.s=34085)}),_N_E=e.O()}]);