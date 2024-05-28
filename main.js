(()=>{"use strict";function t(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function e(e){return t(e,Date.now())}function n(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function a(t){const e=n(t);return e.setHours(0,0,0,0),e}function r(t){return n=t,r=e(t),+a(n)==+a(r);var n,r}let o={};function i(){return o}function s(t,e){const a=i(),r=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,o=n(t),s=o.getDay(),c=(s<r?7:0)+s-r;return o.setDate(o.getDate()-c),o.setHours(0,0,0,0),o}function c(t,n){return function(t,e,n){return+s(t,n)==+s(e,n)}(t,e(t),n)}class u{constructor(t,e=[]){this._name=t,this._list=e}get name(){return this._name}get list(){return this._list}set name(t){this._name=t}set list(t){this._list=t}getTaskByName(t){for(const e of this._list)if(e.name===t)return e;return null}contains(t){for(const e of this._list)if(e.name===t)return!0;return!1}addTask(t){return!this.contains(t.name)&&(this._list.push(t),!0)}deleteTask(t){this._list=this._list.filter((e=>e.name!==t))}getTodaysTasks(){return this._list.filter((t=>r(n(new Date(t.getFormattedDate())))))}getThisWeeksTasks(){return this._list.filter((t=>c(n(new Date(t.getFormattedDate())))))}}function d(t){return t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}Math.pow(10,8);const l=6048e5,m=864e5,h=36e5;const f={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},g=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,w=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,y=/^([+-])(\d{2})(?::?(\d{2}))?$/;function p(t){return t?parseInt(t):1}function b(t){return t&&parseFloat(t.replace(",","."))||0}const T=[31,null,31,30,31,30,31,31,30,31,30,31];function k(t){return t%400==0||t%4==0&&t%100!=0}const v={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function M(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const D={date:M({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:M({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:M({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},P={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function j(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function N(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let u;return u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:e.slice(i.length)}}}var x;const S={code:"en-US",formatDistance:(t,e,n)=>{let a;const r=v[t];return a="string"==typeof r?r:1===e?r.one:r.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:D,formatRelative:(t,e,n,a)=>P[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:j({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:j({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:j({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:j({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:j({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(x={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(x.matchPattern);if(!n)return null;const a=n[0],r=t.match(x.parsePattern);if(!r)return null;let o=x.valueCallback?x.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:N({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:N({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:N({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:N({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:N({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function W(t){const e=n(t),a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return a.setUTCFullYear(e.getFullYear()),+t-+a}function E(e){const r=n(e);return function(t,e){const n=a(t),r=a(e),o=+n-W(n),i=+r-W(r);return Math.round((o-i)/m)}(r,function(e){const a=n(e),r=t(e,0);return r.setFullYear(a.getFullYear(),0,1),r.setHours(0,0,0,0),r}(r))+1}function C(t){return s(t,{weekStartsOn:1})}function B(e){const a=n(e),r=a.getFullYear(),o=t(e,0);o.setFullYear(r+1,0,4),o.setHours(0,0,0,0);const i=C(o),s=t(e,0);s.setFullYear(r,0,4),s.setHours(0,0,0,0);const c=C(s);return a.getTime()>=i.getTime()?r+1:a.getTime()>=c.getTime()?r:r-1}function L(e){const a=n(e),r=+C(a)-+function(e){const n=B(e),a=t(e,0);return a.setFullYear(n,0,4),a.setHours(0,0,0,0),C(a)}(a);return Math.round(r/l)+1}function Y(e,a){const r=n(e),o=r.getFullYear(),c=i(),u=a?.firstWeekContainsDate??a?.locale?.options?.firstWeekContainsDate??c.firstWeekContainsDate??c.locale?.options?.firstWeekContainsDate??1,d=t(e,0);d.setFullYear(o+1,0,u),d.setHours(0,0,0,0);const l=s(d,a),m=t(e,0);m.setFullYear(o,0,u),m.setHours(0,0,0,0);const h=s(m,a);return r.getTime()>=l.getTime()?o+1:r.getTime()>=h.getTime()?o:o-1}function O(e,a){const r=n(e),o=+s(r,a)-+function(e,n){const a=i(),r=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,o=Y(e,n),c=t(e,0);return c.setFullYear(o,0,r),c.setHours(0,0,0,0),s(c,n)}(r,a);return Math.round(o/l)+1}function F(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const _={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return F("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):F(n+1,2)},d:(t,e)=>F(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>F(t.getHours()%12||12,e.length),H:(t,e)=>F(t.getHours(),e.length),m:(t,e)=>F(t.getMinutes(),e.length),s:(t,e)=>F(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return F(Math.trunc(a*Math.pow(10,n-3)),e.length)}},H={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return _.y(t,e)},Y:function(t,e,n,a){const r=Y(t,a),o=r>0?r:1-r;return"YY"===e?F(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):F(o,e.length)},R:function(t,e){return F(B(t),e.length)},u:function(t,e){return F(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return F(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return F(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return _.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return F(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=O(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):F(r,e.length)},I:function(t,e,n){const a=L(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):F(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):_.d(t,e)},D:function(t,e,n){const a=E(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):F(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return F(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return F(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return F(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return _.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):_.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):F(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):F(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):_.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):_.s(t,e)},S:function(t,e){return _.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return q(a);case"XXXX":case"XX":return z(a);default:return z(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return q(a);case"xxxx":case"xx":return z(a);default:return z(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+I(a,":");default:return"GMT"+z(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+I(a,":");default:return"GMT"+z(a,":")}},t:function(t,e,n){return F(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return F(t.getTime(),e.length)}};function I(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+F(o,2)}function q(t,e){return t%60==0?(t>0?"-":"+")+F(Math.abs(t)/60,2):z(t,e)}function z(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+F(Math.trunc(a/60),2)+e+F(a%60,2)}const $=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},Q=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},U={p:Q,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return $(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",$(a,e)).replace("{{time}}",Q(r,e))}},A=/^D+$/,G=/^Y+$/,X=["D","DD","YY","YYYY"];const J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,R=/^'([^]*?)'?$/,V=/''/g,K=/[a-zA-Z]/;function tt(t,e,a){const r=i(),o=a?.locale??r.locale??S,s=a?.firstWeekContainsDate??a?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,c=a?.weekStartsOn??a?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,u=n(t);if(!function(t){if(!d(t)&&"number"!=typeof t)return!1;const e=n(t);return!isNaN(Number(e))}(u))throw new RangeError("Invalid time value");let l=e.match(Z).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,U[e])(t,o.formatLong):t})).join("").match(J).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:et(t)};if(H[e])return{isToken:!0,value:t};if(e.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));o.localize.preprocessor&&(l=o.localize.preprocessor(u,l));const m={firstWeekContainsDate:s,weekStartsOn:c,locale:o};return l.map((n=>{if(!n.isToken)return n.value;const r=n.value;return(!a?.useAdditionalWeekYearTokens&&function(t){return G.test(t)}(r)||!a?.useAdditionalDayOfYearTokens&&function(t){return A.test(t)}(r))&&function(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(a),X.includes(t))throw new RangeError(a)}(r,e,String(t)),(0,H[r[0]])(u,r,o.localize,m)})).join("")}function et(t){const e=t.match(R);return e?e[1].replace(V,"'"):t}class nt{constructor(t,e,n,a=!1){this._name=t,this._description=e,this._date=this.parseDate(n),this._status=a}get name(){return this._name}get description(){return this._description}get date(){return this._date}get status(){return this._status}set name(t){this._name=t}set description(t){this._description=t}set date(t){this._date=this.parseDate(t)}set status(t){this._status=t}parseDate(t){if(d(t))return t;try{return function(t,e){const n=e?.additionalDigits??2,a=function(t){const e={},n=t.split(f.dateTimeDelimiter);let a;if(n.length>2)return e;if(/:/.test(n[0])?a=n[0]:(e.date=n[0],a=n[1],f.timeZoneDelimiter.test(e.date)&&(e.date=t.split(f.timeZoneDelimiter)[0],a=t.substr(e.date.length,t.length))),a){const t=f.timezone.exec(a);t?(e.time=a.replace(t[1],""),e.timezone=t[1]):e.time=a}return e}(t);let r;if(a.date){const t=function(t,e){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),a=t.match(n);if(!a)return{year:NaN,restDateString:""};const r=a[1]?parseInt(a[1]):null,o=a[2]?parseInt(a[2]):null;return{year:null===o?r:100*o,restDateString:t.slice((a[1]||a[2]).length)}}(a.date,n);r=function(t,e){if(null===e)return new Date(NaN);const n=t.match(g);if(!n)return new Date(NaN);const a=!!n[4],r=p(n[1]),o=p(n[2])-1,i=p(n[3]),s=p(n[4]),c=p(n[5])-1;if(a)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,s,c)?function(t,e,n){const a=new Date(0);a.setUTCFullYear(t,0,4);const r=7*(e-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(e,s,c):new Date(NaN);{const t=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(T[e]||(k(t)?29:28))}(e,o,i)&&function(t,e){return e>=1&&e<=(k(t)?366:365)}(e,r)?(t.setUTCFullYear(e,o,Math.max(r,i)),t):new Date(NaN)}}(t.restDateString,t.year)}if(!r||isNaN(r.getTime()))return new Date(NaN);const o=r.getTime();let i,s=0;if(a.time&&(s=function(t){const e=t.match(w);if(!e)return NaN;const n=b(e[1]),a=b(e[2]),r=b(e[3]);return function(t,e,n){return 24===t?0===e&&0===n:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,a,r)?n*h+6e4*a+1e3*r:NaN}(a.time),isNaN(s)))return new Date(NaN);if(!a.timezone){const t=new Date(o+s),e=new Date(0);return e.setFullYear(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()),e.setHours(t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCMilliseconds()),e}return i=function(t){if("Z"===t)return 0;const e=t.match(y);if(!e)return 0;const n="+"===e[1]?-1:1,a=parseInt(e[2]),r=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,r)?n*(a*h+6e4*r):NaN}(a.timezone),isNaN(i)?new Date(NaN):new Date(o+s+i)}(t)}catch(t){return new Date}}getFormattedDate(){return tt(this._date,"MMM d, yyyy")}}class at{constructor(){this._projects=[],this._projects.push(new u("inbox")),this._projects.push(new u("today")),this._projects.push(new u("this week"))}get projects(){return this._projects}set projects(t){this._projects=t}getProjectByName(t){for(const e of this._projects)if(e.name===t)return e;return null}contains(t){for(const e of this._projects)if(e.name===t)return!0;return!1}addProject(t){return!this.contains(t.name)&&(this._projects.push(t),!0)}deleteProject(t){const e=this._projects.findIndex((e=>e.name===t));return-1!==e&&(this._projects.splice(e,1),!0)}updateTodayProject(){this.getProjectByName("Today").list=[],this.projects.forEach((t=>{"Today"!==t.name&&"This Week"!==t.name&&t.getTodaysTasks().forEach((e=>{const n=`${e.name} (${t.name})`;this.getProjectByName("Today").addTask(new nt(n,e.description,e.date,e.status))}))}))}updateWeekProject(){this.getProjectByName("This Week").list=[],this.projects.forEach((t=>{"Today"!==t.name&&"This Week"!==t.name&&t.getThisWeeksTasks().forEach((e=>{const n=`${e.name} (${t.name})`;this.getProjectByName("This Week").addTask(new nt(n,e.description,e.date,e.status))}))})),this.getProjectByName("This Week").list=this.getProjectByName("This Week").list.sort(((t,e)=>{!function(t,e){const a=n(t),r=n(e),o=a.getTime()-r.getTime()}(n(new Date(t.date)),n(new Date(e.date)))}))}}class rt{static saveTodo(t){localStorage.setItem("todo",JSON.stringify(t))}static getTodo(){const t=JSON.parse(localStorage.getItem("todo")),e=Object.assign(new at,t);return e.projects&&(e.projects=e.projects.map((t=>{const e=Object.assign(new u,t);return e.list=e.list.map((t=>Object.assign(new nt,t))),e}))),e}static addProject(t){const e=rt.getTodo();e.addProject(t),rt.saveTodo(e)}static deleteProject(t){const e=rt.getTodo();e.deleteProject(t),rt.saveTodo(e)}static addTask(t,e){const n=rt.getTodo();n.getProjectByName(t).addTask(e),rt.saveTodo(n)}static deleteTask(t,e){const n=rt.getTodo();n.getProjectByName(t).deleteTask(e),rt.saveTodo(n)}static renameTask(t,e,n){const a=rt.getTodo();a.getProjectByName(t).getTaskByName(e).name=n,rt.saveTodo(a)}static setTaskDate(t,e,n){const a=rt.getTodo();a.getProjectByName(t).getTaskByName(e).date=n,rt.saveTodo(a)}static updateTodayProject(){const t=rt.getTodo();t.updateTodayProject(),rt.saveTodo(t)}static updateWeekProject(){const t=rt.getTodo();t.updateWeekProject(),rt.saveTodo(t)}}class ot{static loadPage(){ot.eventListeners(),ot.generateProjects(),console.log(rt.getTodo())}static generateProjects(){rt.getTodo().projects.forEach((t=>{"inbox"!==t.name&&"today"!==t.name&&"this week"!==t.name&&ot.createProject(t.name)}))}static eventListeners(){ot.projectForm(),ot.taskForm(),ot.taskDescriptionToggle()}static projectForm(){const t=document.getElementById("project-section"),e=document.getElementById("main"),n=document.getElementById("add-project-btn"),a=document.getElementById("project-cancel-btn"),r=document.getElementById("project-add-btn"),o=document.getElementById("project-form-error");n.addEventListener("click",(function(n){n.preventDefault(),t.style.display="flex",e.style.filter="blur(1px)"})),a.addEventListener("click",(function(n){n.preventDefault(),t.style.display="none",e.style.filter="blur(0px)",o.innerHTML=""})),r.addEventListener("click",(function(n){n.preventDefault();let a=document.getElementById("project-name"),r=a.value.toLowerCase().trim();if(rt.getTodo().contains(r))o.innerHTML=`${r} already exists`;else{let n=new u(r);rt.addProject(n),ot.createProject(r),t.style.display="none",e.style.filter="blur(0px)",a.value="",o.innerHTML="",console.log(rt.getTodo().projects)}}))}static taskForm(){const t=document.getElementById("task-section"),e=document.getElementById("main"),n=document.getElementById("add-list-btn"),a=document.getElementById("task-add-btn"),r=document.getElementById("task-cancel-btn"),o=document.getElementById("task-form-error");n.addEventListener("click",(function(n){n.preventDefault(),t.style.display="flex",e.style.filter="blur(1px)"})),r.addEventListener("click",(function(n){n.preventDefault(),t.style.display="none",e.style.filter="blur(0px)"})),a.addEventListener("click",(function(n){n.preventDefault();let a=document.getElementById("header-title").innerHTML.toLowerCase().trim(),r=document.getElementById("task-title"),i=r.value.toLowerCase().trim(),s=document.getElementById("task-date"),c=s.value,u=document.getElementById("task-description"),d=u.value;if(rt.getTodo().getProjectByName(a).contains(i))o.innerHTML=`${i} already exists in ${a}`;else{let n=new nt(i,d,c);rt.addTask(a,n),t.style.display="none",e.style.filter="blur(0px)",r.value="",s.value="",u.value="",o.innerHTML="",console.log(rt.getTodo().projects)}}))}static taskDescriptionToggle(){document.getElementById("task-list").addEventListener("click",(t=>{if(t.target&&"BUTTON"===t.target.tagName&&"button"===t.target.type){t.preventDefault();const e=t.target.closest(".task").querySelector("#task-description-div");"none"!==e.style.display&&e.style.display?(e.style.display="none",t.target.classList.remove("toggled")):(e.style.display="block",t.target.classList.add("toggled"))}}))}static createProject(t){const e=document.getElementById("project-list");let n=document.createElement("div");n.classList.add("project");let a=document.createElement("p");a.innerHTML=t,n.appendChild(a),e.appendChild(n)}}new at,console.log("i"),document.addEventListener("DOMContentLoaded",ot.loadPage)})();