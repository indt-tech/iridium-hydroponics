(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6736],{6984:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/groups",function(){return r(31237)}])},31237:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return x}});var n=r(52322),a=r(3559),i=r(30195),o=r(40214),s=r(13997),l=r(50897),u=r(79562),d=r(1888),c=r(17450),p=r(48115),m=r(1201),g=r(2784),w=r(6289),h=r(26887);let v={},f="/adminapi/v1/groups",y="/adminapi/v1/workspaces";var k={groups:{component:e=>{var t,r;let{pageState:d,initialItems:k,pageSession:b,extraData:q}=e;(0,m.G)(()=>"At this moment the user is browsing the group management page. The group management page allows to list, create, read, update and delete groups, groups contain privileges (admin true/false) and are associated to users when creating users, in the field 'type'.\n      A group has a name, the privilege level (admin true/false), and a 0 or more workspaces associated. A workspace is a menu for the admin panel. If the user has more than one workspace, the admin panel will show a select list in the topbar to switch between workspaces.\n      "+((null==k?void 0:k.isLoaded)?"Currently the system returned the following information: "+JSON.stringify(k.data):""));let[x,_]=(0,g.useState)(null!==(t=null==q?void 0:q.workspaces)&&void 0!==t?t:(0,w.E)("pending"));return(0,h.a)(e=>{p.bl.get(y,e)},_,null==q?void 0:q.workspaces),(0,n.jsx)(o.D,{title:"Groups",pageSession:b,children:(0,n.jsx)(s.V,{integratedChat:!0,enableAddToInitialData:!0,disableViewSelector:!0,defaultView:"list",rowIcon:c.Q,sourceUrl:f,initialItems:k,numColumnsForm:1,name:"group",extraFieldsForms:{workspaces:i.z.array(i.z.union([i.z.literal(""),i.z.literal("")])).generateOptions(()=>{var e;return null===(e=x.data)||void 0===e?void 0:e.items.map(e=>e.name)}).after("name")},columns:l.Z.columns(l.Z.column("name",e=>e.name,!0,void 0,!0,"250px"),l.Z.column("workspaces",e=>e.workspaces,!1,e=>Object.keys(null!==(r=null==e?void 0:e.workspaces)&&void 0!==r?r:[]).length?Object.keys(e.workspaces).map((t,r)=>(0,n.jsx)(u.A,{ml:r?"$2":"$0",text:e.workspaces[t],color:"$color5"},t)):(0,n.jsx)(u.A,{text:"empty",color:"$gray5"}),!0,"200px")),model:a.d,pageState:d,icons:v,dataTableCardProps:{itemMinWidth:300}})})},getServerSideProps:(0,d.eq)(f,["admin"],{},async()=>({workspaces:await p.bl.get(y)}))}},b=r(97729),q=r.n(b);function x(e){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(q(),{children:(0,n.jsx)("title",{children:"Protofy - Groups"})}),(0,n.jsx)(k.groups.component,{...e})]})}},3559:function(e,t,r){"use strict";r.d(t,{d:function(){return s}});var n=r(30195),a=r(75370),i=r(54283);let o=a.V_.object({name:n.z.string().label("name").hint("user, admin, ...").static().id().search(),workspaces:n.z.array(n.z.string()).hidden(),permissions:n.z.array(n.z.string()).optional(),admin:n.z.boolean().optional()}),s=i.$.createDerived("GroupModel",o)},1888:function(e,t,r){"use strict";r.d(t,{F7:function(){return o},eq:function(){return s}});var n=r(46149),a=r(6429),i=r(48115);let o=e=>n.l.SSR?e:void 0;function s(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return o(async o=>{var s,l,u,d,c,p;let m={itemsPerPage:parseInt(o.query.itemsPerPage)?parseInt(o.query.itemsPerPage):"",page:parseInt(o.query.page,10)?parseInt(o.query.page,10):"",search:null!==(s=o.query.search)&&void 0!==s?s:"",orderBy:null!==(l=o.query.orderBy)&&void 0!==l?l:"",orderDirection:null!==(u=o.query.orderDirection)&&void 0!==u?u:"",view:null!==(d=o.query.view)&&void 0!==d?d:"",item:null!==(c=o.query.item)&&void 0!==c?c:"",editFile:null!==(p=o.query.editFile)&&void 0!==p?p:"",..."function"==typeof r?await r(o):r},g="function"==typeof e?e(o):e;return(0,a.NA)(o,t,{sourceUrl:g,initialItems:await i.bl.get({url:(0,a.VM)(g,o),...m}),itemData:o.query.item?await i.bl.get((0,a.VM)(g+"/"+o.query.item,o)):"",extraData:{..."function"==typeof n?await n(o):n},pageState:{...m}})})}}},function(e){e.O(0,[8641,8081,4733,1335,8873,2859,9795,3950,2700,756,1494,1241,1004,6076,2029,1698,9774,2888,179],function(){return e(e.s=6984)}),_N_E=e.O()}]);