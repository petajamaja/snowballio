(function(t){function e(e){for(var a,o,l=e[0],r=e[1],c=e[2],m=0,b=[];m<l.length;m++)o=l[m],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&b.push(i[o][0]),i[o]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);d&&d(e);while(b.length)b.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,l=1;l<n.length;l++){var r=n[l];0!==i[r]&&(a=!1)}a&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},i={app:0},s=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/snowballio/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=r;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"04b1":function(t,e,n){},"0f23":function(t,e,n){"use strict";n("10ec")},"10ec":function(t,e,n){},"20a2":function(t,e,n){},"287c":function(t,e,n){},"2d99":function(t,e,n){"use strict";n("99c1")},"355b":function(t,e,n){},"44a9":function(t,e,n){"use strict";n("355b")},"4af6":function(t,e,n){"use strict";n("7b5b")},"56d7":function(t,e,n){"use strict";n.r(e);var a=n("7a23");function i(t,e,n,i,s,o){const l=Object(a["m"])("Header"),r=Object(a["m"])("MainScreen"),c=Object(a["m"])("Footer");return Object(a["h"])(),Object(a["d"])(a["a"],null,[Object(a["g"])(l),Object(a["g"])(r),Object(a["g"])(c)],64)}const s=Object(a["g"])("h1",null,"SNOWBALL.IO",-1);function o(t,e,n,i,o,l){return Object(a["h"])(),Object(a["d"])("header",null,[s])}var l={name:"Header"};n("4af6");l.render=o;var r=l;const c={id:"main",class:"scroll-hide"},d={id:"action-buttons",class:"flex-row"};function m(t,e,n,i,s,o){const l=Object(a["m"])("PaymentActionCall"),r=Object(a["m"])("AddNewDebtButton"),m=Object(a["m"])("DownloadUploadButtons"),b=Object(a["m"])("AllDebtsScreen"),u=Object(a["m"])("CalculatedTotals");return Object(a["h"])(),Object(a["d"])("main",c,[Object(a["g"])("div",d,[Object(a["g"])(l,{minimum:o.totalMinimumMonthlyPayment,carryOverMoney:s.remainingMoneyToCarryOver,allInputsCorrect:o.allInputsCorrect,allDebtIsPaidOff:o.allDebtIsPaidOff,monthlyMinimumPaid:s.monthlyMinimumPaid},null,8,["minimum","carryOverMoney","allInputsCorrect","allDebtIsPaidOff","monthlyMinimumPaid"]),Object(a["g"])(r),Object(a["g"])(m)]),Object(a["g"])(b,{itemDebts:s.activeDebts,today:s.today,paidOffDebts:s.paidOffDebts},null,8,["itemDebts","today","paidOffDebts"]),Object(a["g"])(u,{totalDebtSum:o.totalDebtSum,paidOff:o.totalPaidOff,monthsTillSmallestDebtOut:o.monthsTillSmallestDebtOutIfNoExtraMoney,monthsTillAllDebtOut:o.monthsTillAllDebtOutIfNoExtraMoney,allInputsCorrect:o.allInputsCorrect},null,8,["totalDebtSum","paidOff","monthsTillSmallestDebtOut","monthsTillAllDebtOut","allInputsCorrect"])])}const b=Object(a["g"])("label",{for:"upload"},"Upload data",-1),u=Object(a["g"])("div",{class:"output"},null,-1);function h(t,e,n,i,s,o){return Object(a["h"])(),Object(a["d"])("div",null,[Object(a["g"])("button",{onClick:e[1]||(e[1]=t=>this.emitter.emit("save-state-to-local-machine")),class:"download"}," Download data "),b,Object(a["g"])("input",{type:"file",id:"upload",class:"upload",onChange:e[2]||(e[2]=(...t)=>o.emitUploadStateFromLocalMachineEvent&&o.emitUploadStateFromLocalMachineEvent(...t))},null,32),u])}var f={name:"DownloadUploadButtons",methods:{emitUploadStateFromLocalMachineEvent:function(t){this.emitter.emit("upload-state-from-local-machine",t.target.files[0])}}};f.render=h;var O=f;const p=Object(a["r"])("data-v-2b2fe525");Object(a["j"])("data-v-2b2fe525");const y={class:"snowballs"},j=Object(a["g"])("p",null,"====================================",-1),g={class:"snowballs"};Object(a["i"])();const I=p((t,e,n,i,s,o)=>{const l=Object(a["m"])("ItemDebt");return Object(a["h"])(),Object(a["d"])(a["a"],null,[Object(a["g"])("div",y,[(Object(a["h"])(!0),Object(a["d"])(a["a"],null,Object(a["k"])(n.itemDebts,(t,e)=>(Object(a["h"])(),Object(a["d"])(l,{index:e,today:n.today,key:t.id,itemDebt:t,thisIsTheMinimalDebt:0===e},null,8,["index","today","itemDebt","thisIsTheMinimalDebt"]))),128))]),j,Object(a["g"])("div",g,[(Object(a["h"])(!0),Object(a["d"])(a["a"],null,Object(a["k"])(n.paidOffDebts,(t,e)=>(Object(a["h"])(),Object(a["d"])(l,{index:e,today:n.today,key:t.id,itemDebt:t,debtIsPaidOff:!0,thisIsTheMinimalDebt:!1},null,8,["index","today","itemDebt"]))),128))])],64)}),v=Object(a["r"])("data-v-70f12ce3");Object(a["j"])("data-v-70f12ce3");const D={id:"snowball-item",class:"flex-column snowball-item"},P={class:"description-area"},M={key:0,class:"fields"},T=Object(a["g"])("label",{for:"amount-input"},"Total amount",-1),S={key:0,class:"error"},C=Object(a["g"])("label",{for:"installment-input"},"Montly minimum payment",-1),A={key:1,class:"error"},L={key:2,class:"error"},x=Object(a["g"])("label",{for:"annual-interest-input"},"Annual interest:",-1),w={key:0,class:"error"},k=Object(a["g"])("label",{for:"fixed-fees-input"},"Fixed fees: ",-1),F=Object(a["g"])("label",{for:"due-date-input"},"Charged on: ",-1),E={key:1,class:"error"},N=Object(a["g"])("p",null,"Already paid off:",-1),R={key:3},H=Object(a["g"])("p",null,"Total interest paid:",-1),_={key:4},U=Object(a["g"])("p",null,"Total fees paid:",-1),B={key:1},J=Object(a["g"])("p",null,"You paid this debt off completely!",-1);Object(a["i"])();const Z=v((t,e,n,i,s,o)=>{const l=Object(a["m"])("InterestAccordion");return Object(a["h"])(),Object(a["d"])("div",D,[Object(a["g"])("div",P,[Object(a["q"])(Object(a["g"])("h2",{onClick:e[1]||(e[1]=t=>o.toggleDescriptionEdit())},Object(a["n"])(s.debtItem.description),513),[[a["p"],!s.descriptionEditInputOpen]]),Object(a["q"])(Object(a["g"])("input",{id:"name-input",class:"name-input","onUpdate:modelValue":e[2]||(e[2]=t=>s.debtItem.description=t),onChange:e[3]||(e[3]=t=>o.toggleDescriptionEdit())},null,544),[[a["p"],s.descriptionEditInputOpen],[a["o"],s.debtItem.description]]),Object(a["g"])("button",{class:"edit-icon",onClick:e[4]||(e[4]=t=>o.toggleDescriptionEdit())})]),s.debtItem.totalPaid!==s.debtItem.amount||0===s.debtItem.amount?(Object(a["h"])(),Object(a["d"])("div",M,[Object(a["g"])("form",{id:"item-debt-fill-form",onChange:e[11]||(e[11]=t=>o.sendModifiedObjectUp())},[T,Object(a["g"])("input",{type:"number",id:"amount-input",class:"amount-input",value:t.from100(s.debtItem.amount),onInput:e[5]||(e[5]=t=>o.setAmount(t))},null,40,["value"]),o.amountIsZeroOrLess?(Object(a["h"])(),Object(a["d"])("p",S," Debt amount must be positive ")):Object(a["e"])("",!0),C,Object(a["g"])("input",{type:"number",id:"installment-input",class:"installment-input",value:t.from100(s.debtItem.installment),onInput:e[6]||(e[6]=t=>o.setInstallment(t))},null,40,["value"]),o.installmentIsZeroOrLess&&n.thisIsTheMinimalDebt?(Object(a["h"])(),Object(a["d"])("p",A," First debt payment must be positive! ")):Object(a["e"])("",!0),!o.installmentIsEmpty&&!o.installmentIsLessThanZero||n.thisIsTheMinimalDebt?Object(a["e"])("",!0):(Object(a["h"])(),Object(a["d"])("p",L," Payment must be zero or more! ")),Object(a["g"])(l,null,{default:v(()=>[Object(a["g"])("form",{onChange:e[10]||(e[10]=t=>o.sendModifiedObjectUp())},[x,Object(a["q"])(Object(a["g"])("input",{type:"number",id:"annual-interest-input",class:"annual-interest-input","onUpdate:modelValue":e[7]||(e[7]=t=>s.debtItem.annualInterestRate=t)},null,512),[[a["o"],s.debtItem.annualInterestRate,void 0,{number:!0}]]),o.annualInterestIsWithinLimits?Object(a["e"])("",!0):(Object(a["h"])(),Object(a["d"])("p",w," Interest should be between 0 and 99%! ")),k,Object(a["g"])("input",{type:"number",id:"fixed-fees-input",class:"fixed-fees-input",value:t.from100(s.debtItem.fixedMonthlyFees),onInput:e[8]||(e[8]=t=>o.setFees(t))},null,40,["value"]),F,Object(a["q"])(Object(a["g"])("input",{type:"number",id:"due-date-input",class:"due-date-input","onUpdate:modelValue":e[9]||(e[9]=t=>s.debtItem.monthlyDueDate=t)},null,512),[[a["o"],s.debtItem.monthlyDueDate,void 0,{number:!0}]]),o.dateIsWithinLimits?Object(a["e"])("",!0):(Object(a["h"])(),Object(a["d"])("p",E," There are only 28 to 31 days in each month, you know..? "))],32)]),_:1}),Object(a["g"])("div",null,[N,Object(a["g"])("p",null,Object(a["n"])(t.from100(s.debtItem.totalPaid)),1)]),0!==s.debtItem.annualInterestRate?(Object(a["h"])(),Object(a["d"])("div",R,[H,Object(a["g"])("p",null,Object(a["n"])(t.from100(s.debtItem.totalInterestPaid)),1)])):Object(a["e"])("",!0),0!==s.debtItem.annualInterestRate?(Object(a["h"])(),Object(a["d"])("div",_,[U,Object(a["g"])("p",null,Object(a["n"])(t.from100(s.debtItem.totalFeesPaid)),1)])):Object(a["e"])("",!0)],32)])):(Object(a["h"])(),Object(a["d"])("div",B,[J,Object(a["g"])("p",null," Total money paid : "+Object(a["n"])(t.from100(s.debtItem.totalPaid+s.debtItem.totalFeesPaid+s.debtItem.totalInterestPaid)),1)])),n.debtIsPaidOff?Object(a["e"])("",!0):(Object(a["h"])(),Object(a["d"])("button",{key:2,class:"delete",onClick:e[12]||(e[12]=t=>o.deleteItemDebt())}," ✖ "))])}),V=Object(a["r"])("data-v-eb54adb8");Object(a["j"])("data-v-eb54adb8");const Y={class:"accordion"},W=Object(a["g"])("p",null,"INTEREST SETTINGS",-1),q={key:0,class:"arrow arrow-up"},z={key:1,class:"arrow arrow-down"},G={class:"content"};Object(a["i"])();const K=V((t,e,n,i,s,o)=>(Object(a["h"])(),Object(a["d"])("div",Y,[Object(a["g"])("div",{class:"title",onClick:e[1]||(e[1]=t=>s.open=!s.open)},[W,s.open?(Object(a["h"])(),Object(a["d"])("div",q,"˄")):Object(a["e"])("",!0),s.open?Object(a["e"])("",!0):(Object(a["h"])(),Object(a["d"])("div",z,"˅"))]),Object(a["g"])(a["b"],{name:"accordion"},{default:V(()=>[Object(a["q"])(Object(a["g"])("div",G,[Object(a["l"])(t.$slots,"default",{},void 0,!0)],512),[[a["p"],s.open]])]),_:3})])));var X={name:"InterestAccordion",data(){return{open:!1}}};n("85fd");X.render=K,X.__scopeId="data-v-eb54adb8";var $=X;class Q{constructor(t){this.debtItem=t,this.calendar=this.generateCalendar()}generateCalendar(){let t=this.debtItem.amount-this.debtItem.totalPaid+this.debtItem.totalInterestPaid+this.debtItem.totalFeesPaid,e=this.debtItem.annualInterestRate/100/12,n=Math.round(1e3*(e+Number.EPSILON))/1e3,a=[],i=0;if(0===this.debtItem.installment)return a;if(t<=0)return a=[{installment:0,carryOver:-t}],a;while(t>0){if(a[i]={installment:this.debtItem.installment},t<=this.debtItem.installment){a[i].installment=t,a[i].carryOver=this.debtItem.installment-t;break}if(0!==this.debtItem.annualInterestRate){let e=Math.floor(t*n);a[i].interest=e,a[i].fees=this.debtItem.fixedMonthlyFees,t=t-this.debtItem.installment+e+this.debtItem.fixedMonthlyFees}else t-=this.debtItem.installment;i++}return a}getCalendar(){return this.calendar}getRemainingTime(){return 0===this.calendar.length?1/0:0!==this.calendar[this.calendar.length-1].installment?this.calendar.length:this.calendar.length-1}getCarryOver(){return 0===this.calendar.length?0:this.calendar[this.calendar.length-1].carryOver}getAmountPaidByMonth(t){return 0===this.calendar.length?0:this.calendar.reduce((e,n,a)=>(a<t&&(e+=n.installment,n.fees&&n.interest&&(e=e+n.fees+n.interest)),e),0)}hasOnlyCarryOver(){return 0!==this.calendar.length&&(0===this.calendar[this.calendar.length-1].installment&&0!==this.calendar[this.calendar.length-1].carryOver)}}var tt={getFromLocalStorage(t){return localStorage.getItem(t)},saveToLocalStorage(t,e){Array.isArray(e)&&(e=JSON.stringify(e)),localStorage.setItem(t,e)},getFromLocalMachine(t,e){var n=new FileReader;n.onload=e,n.readAsText(t)},saveToLocalMachine(t,e){let n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.target="_blank",a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(n)},replaceLocalStorageWith(t){Object.keys(t).forEach(function(e){this.saveToLocalStorage(e,t[e])}.bind(this))},deepCopy(t){return JSON.parse(JSON.stringify(t))},to100(t){return Math.floor(100*t)},from100(t){return Math.floor(t/100)}},et={name:"ItemDebt",props:["index","today","itemDebt","thisIsTheMinimalDebt","debtIsPaidOff"],data(){return{debtItem:tt.deepCopy(this.itemDebt),descriptionEditInputOpen:!1,lastInterestChargeDate:null}},created(){let t=tt.getFromLocalStorage("lastInterestChargeDateForDebt"+this.debtItem.id);null!==t&&(this.lastInterestChargeDate=new Date(t)),this.shouldChargeInterest(this.today)&&this.emitter.emit("charge-interest-for-debt",{debtIndex:this.index,chargeDate:this.today,sum:this.monthlyInterest})},watch:{thisIsTheMinimalDebt:function(){this.allFieldsPassValidation||this.emitter.emit("there-is-error-in-debt",this.debtItem.id)}},methods:{...tt,setInstallment(t){this.debtItem.installment=tt.to100(t.target.value)},setFees(t){this.debtItem.fixedMonthlyFees=tt.to100(t.target.value)},setAmount(t){this.debtItem.amount=tt.to100(t.target.value)},sendModifiedObjectUp:function(){this.allFieldsPassValidation?(this.emitter.emit("update-item-debt",{index:this.index,updatedItem:this.debtItem}),this.emitter.emit("removed-error-in-debt",this.debtItem.id)):this.emitter.emit("there-is-error-in-debt",this.debtItem.id)},deleteItemDebt:function(){this.emitter.emit("delete-item-debt",{debtIndex:this.index,debtId:this.debtItem.id})},toggleDescriptionEdit:function(){this.descriptionEditInputOpen=!this.descriptionEditInputOpen},shouldChargeInterest:function(t){return(null===this.lastInterestChargeDate||t.getMonth()>this.lastInterestChargeDate.getMonth()||t.getYear()>this.lastInterestChargeDate.getYear())&&t.getDate()>=this.debtItem.monthlyDueDate},amountPaidByMonth:function(t){if(!this.amountIsZeroOrLess)return this.paymentCalendar.getAmountPaidByMonth(t)}},computed:{amountIsZeroOrLess:function(){return this.debtItem.amount<=0},amountIsEmpty:function(){return""===this.debtItem.amount},installmentIsZeroOrLess:function(){return this.debtItem.installment<=0},installmentIsEmpty:function(){return""===this.debtItem.installment},installmentIsLessThanZero:function(){return this.debtItem.installment<0},annualInterestIsWithinLimits:function(){return this.debtItem.annualInterestRate>=0&&this.debtItem.annualInterestRate<100},dateIsWithinLimits:function(){return this.debtItem.monthlyDueDate>=1&&this.debtItem.monthlyDueDate<=28},allFieldsPassValidation:function(){return!this.amountIsZeroOrLess&&!this.amountIsEmpty&&!this.installmentIsEmpty&&!this.installmentIsLessThanZero&&!(this.installmentIsZeroOrLess&&this.thisIsTheMinimalDebt)&&this.annualInterestIsWithinLimits&&this.dateIsWithinLimits},monthlyInterestRate:function(){let t=this.debtItem.annualInterestRate/100/12;return Math.round(1e3*(t+Number.EPSILON))/1e3},balance:function(){return this.debtItem.amount-this.debtItem.totalPaid+this.debtItem.totalInterestPaid+this.debtItem.totalFeesPaid},monthlyInterest:function(){return this.monthlyInterestRate*this.balance},timeTillPaidOff:function(){if(!this.amountIsZeroOrLess)return this.paymentCalendar.getRemainingTime()},paymentCalendar:function(){return this.amountIsZeroOrLess?{}:new Q(this.debtItem)}},components:{InterestAccordion:$}};n("0f23");et.render=Z,et.__scopeId="data-v-70f12ce3";var nt=et,at={name:"AllDebtsScreen",props:["itemDebts","paidOffDebts","today"],components:{ItemDebt:nt}};n("f790");at.render=I,at.__scopeId="data-v-2b2fe525";var it=at;function st(t,e,n,i,s,o){return Object(a["h"])(),Object(a["d"])("button",{onClick:e[1]||(e[1]=t=>this.emitter.emit("add-item-debt"))},"ADD DEBT")}var ot={name:"AddNewDebtButton"};ot.render=st;var lt=ot;const rt=Object(a["r"])("data-v-4dad5f67");Object(a["j"])("data-v-4dad5f67");const ct={key:0,class:"calculated-totals"},dt={key:1},mt=Object(a["g"])("p",null," To see the statistics, please make sure all amounts are set correctly! ",-1);Object(a["i"])();const bt=rt((t,e,n,i,s,o)=>n.allInputsCorrect?(Object(a["h"])(),Object(a["d"])("div",ct,[Object(a["g"])("p",null,"Total debt: "+Object(a["n"])(t.from100(n.totalDebtSum)),1),Object(a["g"])("p",null,"Total paid off: "+Object(a["n"])(t.from100(n.paidOff)),1),Object(a["g"])("p",null,"Months till smallest debt paid off: "+Object(a["n"])(n.monthsTillSmallestDebtOut),1),Object(a["g"])("p",null,"Months till all debt paid off: "+Object(a["n"])(n.monthsTillAllDebtOut),1)])):(Object(a["h"])(),Object(a["d"])("div",dt,[mt])));var ut={name:"CalculatedTotals",props:["totalDebtSum","paidOff","monthsTillSmallestDebtOut","monthsTillAllDebtOut","allInputsCorrect"],methods:{...tt}};n("b8ce");ut.render=bt,ut.__scopeId="data-v-4dad5f67";var ht=ut;const ft=Object(a["r"])("data-v-3724067d");Object(a["j"])("data-v-3724067d");const Ot={key:0},pt=Object(a["g"])("p",null," To start paying debt off, please make sure all amounts are set correctly! ",-1),yt={key:1,class:"payment-actions"},jt={key:0,class:"minimum-payment"},gt=Object(a["f"])(" Minimum payment: "),It={class:"number"},vt={key:1},Dt=Object(a["g"])("p",null,"This month minimum payments made!",-1),Pt=Object(a["g"])("p",null,"OR",-1),Mt={class:"extra-payment"},Tt={class:"error"},St={key:2};Object(a["i"])();const Ct=ft((t,e,n,i,s,o)=>n.allInputsCorrect?n.allDebtIsPaidOff?(Object(a["h"])(),Object(a["d"])("p",St,' "Congratulations! You paid off all your debt! You have '+Object(a["n"])(n.carryOverMoney)+' remaining money!" ',1)):(Object(a["h"])(),Object(a["d"])("div",yt,[n.monthlyMinimumPaid?(Object(a["h"])(),Object(a["d"])("div",vt,[Dt])):(Object(a["h"])(),Object(a["d"])("div",jt,[Object(a["g"])("p",null,[gt,Object(a["g"])("span",It,Object(a["n"])(t.from100(n.minimum)),1)]),Object(a["g"])("button",{onClick:e[1]||(e[1]=t=>o.payOffAllMinimumAmounts())},"PAY IT OFF!")])),Pt,Object(a["g"])("div",Mt,[Object(a["q"])(Object(a["g"])("input",{type:"number",id:"extra-amount","onUpdate:modelValue":e[2]||(e[2]=t=>s.extraPayment=t)},null,512),[[a["o"],s.extraPayment,void 0,{number:!0}]]),Object(a["q"])(Object(a["g"])("p",Tt,"Amount must be positive!",512),[[a["p"],s.extraPayment<=0]]),Object(a["g"])("button",{onClick:e[3]||(e[3]=t=>o.makeExtraPayment())},"MAKE EXTRA PAYMENT")])])):(Object(a["h"])(),Object(a["d"])("div",Ot,[pt])));var At={name:"PaymentActionCall",props:["minimum","allDebtIsPaidOff","carryOverMoney","allInputsCorrect","monthlyMinimumPaid"],data(){return{extraPayment:0}},methods:{...tt,payOffAllMinimumAmounts:function(){this.emitter.emit("pay-off-all-minimum-amounts")},makeExtraPayment:function(){this.extraPayment>0&&this.emitter.emit("make-extra-payment",tt.to100(this.extraPayment))}}};n("8ba3");At.render=Ct,At.__scopeId="data-v-3724067d";var Lt=At,xt={name:"MainScreen",data(){return{activeDebts:[],paidOffDebts:[],today:null,paymentHistory:[],monthlyMinimumPaid:!1,lastMinimumPaymentDate:null,remainingMoneyToCarryOver:0,validationErrors:[]}},created(){this.today=new Date,this.lastMinimumPaymentDate=new Date(tt.getFromLocalStorage("lastMinPaymentDate")),this.monthlyMinimumPaid=this.minimumPaymentDoneThisMonth(this.today),this.paidOffDebts=this.loadPaidOffDebts(),this.activeDebts=this.loadActiveDebts(),this.emitter.on("there-is-error-in-debt",t=>{let e=this.validationErrors.indexOf(t);-1===e&&this.validationErrors.push(t)}),this.emitter.on("removed-error-in-debt",t=>{this.removeValidationErrors(t)}),this.emitter.on("pay-off-all-minimum-amounts",()=>{this.payOffMinimumMonthlyInstallments()}),this.emitter.on("make-extra-payment",t=>{this.makeExtraPayment(t)}),this.emitter.on("charge-interest-for-debt",({debtIndex:t,chargeDate:e,sum:n})=>{this.chargeInterestForDebt(t,e,n)}),this.emitter.on("add-item-debt",()=>{this.addItemDebt()}),this.emitter.on("delete-item-debt",({debtIndex:t,debtId:e})=>{this.deleteItemDebt(t,e)}),this.emitter.on("update-item-debt",t=>{this.updateItemDebt(t)}),this.emitter.on("save-state-to-local-machine",()=>{this.saveStateToLocalMachine()}),this.emitter.on("upload-state-from-local-machine",t=>{this.loadStateFromLocalMachine(t)})},methods:{loadActiveDebts:function(){let t=tt.getFromLocalStorage("activeDebts");return null!==t?JSON.parse(t):0===this.paidOffDebts.length?[{id:0,description:"Placeholder debt",amount:tt.to100(8e3),annualInterestRate:0,installment:tt.to100(5e3),monthlyDueDate:26,fixedMonthlyFees:0,totalPaid:0,totalFeesPaid:0,totalInterestPaid:0}]:void 0},loadPaidOffDebts:function(){let t=tt.getFromLocalStorage("paidOffDebts");return null===t?[]:JSON.parse(t)},saveActiveDebtsToLocalStorage:function(){tt.saveToLocalStorage("activeDebts",this.activeDebts)},savePaidOffDebtsToLocalStorage:function(){tt.saveToLocalStorage("paidOffDebts",this.paidOffDebts)},saveStateToLocalMachine:function(){const t="snowballio-save-"+this.today.toJSON().slice(0,10)+".json",e={...localStorage},n=new Blob([JSON.stringify(e)],{type:"application/json"});tt.saveToLocalMachine(t,n)},loadStateFromLocalMachine:function(t){let e=function(t){const e=JSON.parse(t.target.result);"activeDebts"in e&&(this.activeDebts=JSON.parse(e.activeDebts)),"paidOffDebts"in e&&(this.paidOffDebts=JSON.parse(e.paidOffDebts)),"paymentHistory"in e&&(this.paymentHistory=JSON.parse(e.paymentHistory)),"lastMinPaymentDate"in e&&(this.lastMinimumPaymentDate=new Date(e.lastMinPaymentDate)),tt.replaceLocalStorageWith(e)}.bind(this);tt.getFromLocalMachine(t,e)},sortDebtsBasedOnAmount:function(t,e){return t.amount-e.amount},deleteItemDebt:function(t,e){this.removeValidationErrors(e),0!==this.activeDebts[t].totalPaid&&(this.removeAllRelatedPaymentHistoryForDebt(e),this.remainingMoneyToCarryOver+=this.activeDebts[t].totalPaid),this.activeDebts.splice(t,1),this.saveActiveDebtsToLocalStorage()},addItemDebt:function(){this.activeDebts.push({id:this.activeDebts.length,description:"New debt",amount:tt.to100(8e3),annualInterestRate:0,installment:tt.to100(5e3),monthlyDueDate:26,fixedMonthlyFees:tt.to100(30),totalPaid:0,totalFeesPaid:0,totalInterestPaid:0}),this.activeDebts.sort(this.sortDebtsBasedOnAmount),this.saveActiveDebtsToLocalStorage()},updateItemDebt:function(t){this.activeDebts[t.index]=tt.deepCopy(t.updatedItem),this.activeDebts.sort(this.sortDebtsBasedOnAmount),this.saveActiveDebtsToLocalStorage()},payOffDebtAtIndex:function(t){let e=this.activeDebts[t];this.remainingMoneyToCarryOver+=e.totalPaid-e.amount,e.totalPaid=e.amount,this.paidOffDebts.push(e),this.activeDebts.splice(t,1);let n=this.activeDebts.length>0;n&&this.reallocateCarryOverMoneyToFirstDebt(),this.saveActiveDebtsToLocalStorage(),this.savePaidOffDebtsToLocalStorage()},makePaymentOfType:function(t,e){let n=this.activeDebts[0];n.totalPaid+=e,this.saveToPaymentHistory(e,n.id,t),this.remainingMoneyToCarryOver=0,n.totalPaid>=n.amount&&this.payOffDebtAtIndex(0),this.saveActiveDebtsToLocalStorage()},reallocateCarryOverMoneyToFirstDebt:function(){this.makePaymentOfType("carry",this.remainingMoneyToCarryOver)},makeExtraPayment:function(t){this.makePaymentOfType("extra",t)},payOffMinimumDebtInstallment:function(t,e){t.totalPaid+=t.installment,this.saveToPaymentHistory(t.installment,t.id,"minimum"),t.totalPaid>=t.amount&&this.payOffDebtAtIndex(e)},payOffMinimumMonthlyInstallments:function(){this.activeDebts.forEach(this.payOffMinimumDebtInstallment,this),this.lastMinimumPaymentDate=new Date,this.monthlyMinimumPaid=!0,tt.saveToLocalStorage("lastMinPaymentDate",this.lastMinimumPaymentDate),this.saveActiveDebtsToLocalStorage()},minimumPaymentDoneThisMonth:function(t){if(!this.lastMinimumPaymentDate)return!0;let e=t.getMonth(),n=t.getFullYear();return n===this.lastMinimumPaymentDate.getFullYear()&&e===this.lastMinimumPaymentDate.getMonth()},chargeInterestForDebt:function(t,e,n){let a=this.activeDebts[t];a.totalInterestPaid+=n,a.totalFeesPaid+=a.fixedMonthlyFees,tt.saveToLocalStorage("lastInterestChargeDateForDebt"+t,e),this.saveActiveDebtsToLocalStorage()},saveToPaymentHistory:function(t,e,n){if("interest"===n&&0===t)return;let a=this.today.getMonth(),i=this.today.getFullYear(),s=this.paymentHistory.find(t=>t.year===i);if(void 0!==s&&null!==s){let i=s.paymentsMonthly.find(t=>t.month===a);void 0!==i&&null!==s?i.payments.push({debtId:e,amount:t,type:n}):s.paymentsMonthly.push({month:a,payments:[{debtId:e,amount:t,type:n}]})}else this.paymentHistory.push({year:i,paymentsMonthly:[{month:a,payments:[{debtId:e,amount:t,type:n}]}]});tt.saveToLocalStorage("paymentHistory",this.paymentHistory)},removeAllRelatedPaymentHistoryForDebt:function(t){this.paymentHistory=this.paymentHistory.filter(e=>(e.paymentsMonthly=e.paymentsMonthly.filter(e=>(e.payments=e.payments.filter(e=>e.debtId!==t),0!==e.payments.length)),0!==e.paymentsMonthly.length)),tt.saveToLocalStorage("paymentHistory",this.paymentHistory)},removeValidationErrors:function(t){let e=this.validationErrors.indexOf(t);-1!==e&&this.validationErrors.splice(e,1)}},computed:{totalMinimumMonthlyPayment:function(){return this.allDebtsAreDeletedOrPaidOff||this.validationErrors.length?0:this.activeDebts.reduce((function(t,e){return t+e.installment}),0)},totalPaidOff:function(){let t=this.allDebtIsPaidOff?this.paidOffDebts:this.activeDebts.concat(this.paidOffDebts);return t.reduce((function(t,e){return t+e.totalPaid}),0)},totalDebtSum:function(){return this.allDebtsAreDeletedOrPaidOff||this.validationErrors.length?0:this.activeDebts.reduce((function(t,e){return t+e.amount-e.totalPaid}),0)},monthsTillSmallestDebtOutIfNoExtraMoney:function(){if(this.allDebtsAreDeletedOrPaidOff||this.validationErrors.length)return 0;let t=this.activeDebts[0];return Math.ceil((t.amount-t.totalPaid)/t.installment)},monthsTillAllDebtOutIfNoExtraMoney:function(){if(this.allDebtsAreDeletedOrPaidOff||this.totalMinimumMonthlyPayment<=0)return 0;let t=tt.deepCopy(this.activeDebts),e=0;for(let n=0;n<t.length;n++){let a=t[n],i=a.installment,s=new Q(a);if(s.hasOnlyCarryOver()||(e+=s.getRemainingTime()),n!=t.length-1){let a=t[n+1],o=new Q(a);a.totalPaid+=o.getAmountPaidByMonth(e),a.totalPaid+=s.getCarryOver(),a.installment+=i}}return e},allDebtIsPaidOff:function(){return 0===this.activeDebts.length&&this.paidOffDebts.length>0},allDebtsAreDeletedOrPaidOff:function(){return 0===this.activeDebts.length},allInputsCorrect:function(){return this.allDebtsAreDeletedOrPaidOff||0==this.validationErrors.length}},components:{AllDebtsScreen:it,AddNewDebtButton:lt,PaymentActionCall:Lt,CalculatedTotals:ht,DownloadUploadButtons:O}};n("44a9");xt.render=m;var wt=xt;const kt=Object(a["g"])("div",{class:"snowball"},[Object(a["f"])(" Read more about snowball method  "),Object(a["g"])("a",{href:"https://www.daveramsey.com/blog/how-the-debt-snowball-method-works"},"here")],-1),Ft=Object(a["g"])("div",{class:"contact"},[Object(a["f"])(" Created with debt anxiety by  "),Object(a["g"])("a",{href:"https://github.com/petajamaja/"},"@petajamaja")],-1);function Et(t,e,n,i,s,o){return Object(a["h"])(),Object(a["d"])("footer",null,[kt,Ft])}var Nt={name:"Footer"};n("2d99");Nt.render=Et;var Rt=Nt,Ht={name:"App",components:{Header:r,MainScreen:wt,Footer:Rt}};n("78f0");Ht.render=i;var _t=Ht,Ut=n("14b7");const Bt=Object(Ut["a"])(),Jt=Object(a["c"])(_t);Jt.config.globalProperties.emitter=Bt,Jt.mount("#app")},"78f0":function(t,e,n){"use strict";n("287c")},"7b5b":function(t,e,n){},"85fd":function(t,e,n){"use strict";n("a918")},"8ba3":function(t,e,n){"use strict";n("20a2")},"99c1":function(t,e,n){},a918:function(t,e,n){},aa38:function(t,e,n){},b8ce:function(t,e,n){"use strict";n("aa38")},f790:function(t,e,n){"use strict";n("04b1")}});
//# sourceMappingURL=app.28a05f09.js.map