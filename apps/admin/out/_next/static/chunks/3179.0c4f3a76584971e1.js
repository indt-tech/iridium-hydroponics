"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3179],{43179:function(e,t,c){c.r(t),c.d(t,{default:function(){return p}});var i=c(52322),n=c(2784),s=c(90530),r=c(67237),a=c(34406);let o=a.env.NEXT_PUBLIC_PROJECT_NAME;var l=e=>{let{componentName:t,type:c}=e,s=(0,r.J)(e=>e.electronicDevice),[a,o]=n.useState(!1);return n.useEffect(()=>{if(console.log("NODEBUS: subscribe attempt: ",a,s,c,t),!s||!c||!t)return;let e=d(s,c,t);e&&console.log("Subs NODEBUS topic: ",e)},[t,c,s]),(0,i.jsx)(i.Fragment,{})};let u=e=>null!=e?e:"",d=(e,t,c)=>e&&t&&c?"".concat(o,"/").concat(e,"/").concat(t,"/").concat(c,"/state"):null;var p=e=>{let{node:t={},nodeData:c={},children:r,color:a}=e,[o,d]=n.useState(u(c["param-1"])),p=[{label:"Name",static:!0,field:"param-1",type:"input",onBlur:()=>{d(u(c["param-1"]))}}];return(0,i.jsxs)(s.Node,{node:t,isPreview:!t.id,title:"Switch",color:a,id:t.id,skipCustom:!0,children:[(0,i.jsx)(s.NodeParams,{id:t.id,params:p}),(0,i.jsx)(l,{componentName:o,type:"binary_sensor"})]})}},67237:function(e,t,c){c.d(t,{J:function(){return s}});var i=c(92467),n=c(15729);let s=(0,i.Z)((e,t)=>({devicesList:{},electronicDevice:"mydevice",setElectronicDevice:t=>e((0,n.ZP)(e=>{e.electronicDevice=t})),setDevicesList:t=>e((0,n.ZP)(e=>{e.devicesList=t}))}))}}]);