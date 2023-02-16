import{r as p,a as Ne,d as Me,e as ie,_ as Fe,L as Le,N as ae,O as X,P as je,Q as ze,S as He,T as qe}from"./index.fd8f1dd6.js";const We=p.exports.forwardRef(({bsPrefix:e,className:t,striped:n,bordered:r,borderless:s,hover:o,size:i,variant:l,responsive:a,...c},u)=>{const h=Ne(e,"table"),d=Me(t,h,l&&`${h}-${l}`,i&&`${h}-${i}`,n&&`${h}-${typeof n=="string"?`striped-${n}`:"striped"}`,r&&`${h}-bordered`,s&&`${h}-borderless`,o&&`${h}-hover`),m=ie("table",{...c,className:d,ref:u});if(a){let w=`${h}-responsive`;return typeof a=="string"&&(w=`${w}-${a}`),ie("div",{className:w,children:m})}return m}),zn=We;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="firebasestorage.googleapis.com",_e="storageBucket",Xe=2*60*1e3,Ke=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f extends qe{constructor(t,n){super(V(t),`Firebase Storage: ${n} (${V(t)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,f.prototype)}_codeEquals(t){return V(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function V(e){return"storage/"+e}function re(){const e="An unknown error occurred, please check the error payload for server response.";return new f("unknown",e)}function Ye(e){return new f("quota-exceeded","Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Ge(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new f("unauthenticated",e)}function Ve(){return new f("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function Je(e){return new f("unauthorized","User does not have permission to access '"+e+"'.")}function Qe(){return new f("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function Ze(){return new f("canceled","User canceled the upload/download.")}function et(e){return new f("invalid-url","Invalid URL '"+e+"'.")}function tt(e){return new f("invalid-default-bucket","Invalid default bucket '"+e+"'.")}function nt(){return new f("no-default-bucket","No default bucket found. Did you set the '"+_e+"' property when initializing the app?")}function rt(){return new f("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function Q(e){return new f("invalid-argument",e)}function be(){return new f("app-deleted","The Firebase app was deleted.")}function st(e){return new f("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function D(e,t){return new f("invalid-format","String does not match format '"+e+"': "+t)}function B(e){throw new f("internal-error","Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=_.makeFromUrl(t,n)}catch{return new _(t,"")}if(r.path==="")return r;throw tt(t)}static makeFromUrl(t,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function o(y){y.path.charAt(y.path.length-1)==="/"&&(y.path_=y.path_.slice(0,-1))}const i="(/(.*))?$",l=new RegExp("^gs://"+s+i,"i"),a={bucket:1,path:3};function c(y){y.path_=decodeURIComponent(y.path)}const u="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",m=new RegExp(`^https?://${h}/${u}/b/${s}/o${d}`,"i"),w={bucket:1,path:3},I=n===ge?"(?:storage.googleapis.com|storage.cloud.google.com)":n,b="([^?#]*)",U=new RegExp(`^https?://${I}/${s}/${b}`,"i"),R=[{regex:l,indices:a,postModify:o},{regex:m,indices:w,postModify:c},{regex:U,indices:{bucket:1,path:2},postModify:c}];for(let y=0;y<R.length;y++){const M=R[y],Y=M.regex.exec(t);if(Y){const De=Y[M.indices.bucket];let G=Y[M.indices.path];G||(G=""),r=new _(De,G),M.postModify(r);break}}if(r==null)throw et(t);return r}}class ot{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(e,t,n){let r=1,s=null,o=null,i=!1,l=0;function a(){return l===2}let c=!1;function u(...b){c||(c=!0,t.apply(null,b))}function h(b){s=setTimeout(()=>{s=null,e(m,a())},b)}function d(){o&&clearTimeout(o)}function m(b,...U){if(c){d();return}if(b){d(),u.call(null,b,...U);return}if(a()||i){d(),u.call(null,b,...U);return}r<64&&(r*=2);let R;l===1?(l=2,R=0):R=(r+Math.random())*1e3,h(R)}let w=!1;function I(b){w||(w=!0,d(),!c&&(s!==null?(b||(l=2),clearTimeout(s),h(0)):b||(l=1)))}return h(0),o=setTimeout(()=>{i=!0,I(!0)},n),I}function at(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(e){return e!==void 0}function ct(e){return typeof e=="object"&&!Array.isArray(e)}function ye(e){return typeof e=="string"||e instanceof String}function le(e){return se()&&e instanceof Blob}function se(){return typeof Blob<"u"}function Z(e,t,n,r){if(r<t)throw Q(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Q(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function ut(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const s=t(r)+"="+t(e[r]);n=n+s+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var A;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(A||(A={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t,n,r,s,o,i,l,a,c,u,h){this.url_=t,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=l,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((d,m)=>{this.resolve_=d,this.reject_=m,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new F(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const i=l=>{const a=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(a,c)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;const l=o.getErrorCode()===A.NO_ERROR,a=o.getStatus();if(!l||this.isRetryStatusCode_(a)){const u=o.getErrorCode()===A.ABORT;r(!1,new F(!1,null,u));return}const c=this.successCodes_.indexOf(a)!==-1;r(!0,new F(c,o))})},n=(r,s)=>{const o=this.resolve_,i=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const a=this.callback_(l,l.getResponse());lt(a)?o(a):o()}catch(a){i(a)}else if(l!==null){const a=re();a.serverResponse=l.getErrorText(),this.errorCallback_?i(this.errorCallback_(l,a)):i(a)}else if(s.canceled){const a=this.appDelete_?be():Ze();i(a)}else{const a=Qe();i(a)}};this.canceled_?n(!1,new F(!1,null,!0)):this.backoffId_=it(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&at(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}isRetryStatusCode_(t){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,o=this.additionalRetryCodes_.indexOf(t)!==-1;return n||s||o}}class F{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function ht(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function pt(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t!=null?t:"AppManager")}function ft(e,t){t&&(e["X-Firebase-GMPID"]=t)}function mt(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function gt(e,t,n,r,s,o){const i=ut(e.urlParams),l=e.url+i,a=Object.assign({},e.headers);return ft(a,t),ht(a,n),pt(a,o),mt(a,r),new dt(l,e.method,a,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function bt(...e){const t=_t();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(se())return new Blob(e);throw new f("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function yt(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(e){return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class J{constructor(t,n){this.data=t,this.contentType=n||null}}function wt(e,t){switch(e){case k.RAW:return new J(we(t));case k.BASE64:case k.BASE64URL:return new J(Re(e,t));case k.DATA_URL:return new J(kt(t),vt(t))}throw re()}function we(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const o=r,i=e.charCodeAt(++n);r=65536|(o&1023)<<10|i&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function Rt(e){let t;try{t=decodeURIComponent(e)}catch{throw D(k.DATA_URL,"Malformed data URL.")}return we(t)}function Re(e,t){switch(e){case k.BASE64:{const s=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(s||o)throw D(e,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case k.BASE64URL:{const s=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(s||o)throw D(e,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=xt(t)}catch{throw D(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class ke{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw D(k.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Tt(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function kt(e){const t=new ke(e);return t.base64?Re(k.BASE64,t.rest):Rt(t.rest)}function vt(e){return new ke(e).contentType}function Tt(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(t,n){let r=0,s="";le(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,n){if(le(this.data_)){const r=this.data_,s=yt(r,t,n);return s===null?null:new E(s)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new E(r,!0)}}static getBlob(...t){if(se()){const n=t.map(r=>r instanceof E?r.data_:r);return new E(bt.apply(null,n))}else{const n=t.map(i=>ye(i)?wt(k.RAW,i).data:i.data_);let r=0;n.forEach(i=>{r+=i.byteLength});const s=new Uint8Array(r);let o=0;return n.forEach(i=>{for(let l=0;l<i.length;l++)s[o++]=i[l]}),new E(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(e){let t;try{t=JSON.parse(e)}catch{return null}return ct(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Ct(e,t){const n=t.split("/").filter(r=>r.length>0).join("/");return e.length===0?n:e+"/"+n}function Te(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(e,t){return t}class g{constructor(t,n,r,s){this.server=t,this.local=n||t,this.writable=!!r,this.xform=s||St}}let L=null;function Pt(e){return!ye(e)||e.length<2?e:Te(e)}function At(){if(L)return L;const e=[];e.push(new g("bucket")),e.push(new g("generation")),e.push(new g("metageneration")),e.push(new g("name","fullPath",!0));function t(o,i){return Pt(i)}const n=new g("name");n.xform=t,e.push(n);function r(o,i){return i!==void 0?Number(i):i}const s=new g("size");return s.xform=r,e.push(s),e.push(new g("timeCreated")),e.push(new g("updated")),e.push(new g("md5Hash",null,!0)),e.push(new g("cacheControl",null,!0)),e.push(new g("contentDisposition",null,!0)),e.push(new g("contentEncoding",null,!0)),e.push(new g("contentLanguage",null,!0)),e.push(new g("contentType",null,!0)),e.push(new g("metadata","customMetadata",!0)),L=e,L}function Ot(e,t){function n(){const r=e.bucket,s=e.fullPath,o=new _(r,s);return t._makeStorageReference(o)}Object.defineProperty(e,"ref",{get:n})}function $t(e,t,n){const r={};r.type="file";const s=n.length;for(let o=0;o<s;o++){const i=n[o];r[i.local]=i.xform(r,t[i.server])}return Ot(r,e),r}function It(e,t,n){const r=ve(t);return r===null?null:$t(e,r,n)}function Ut(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const o=t[s];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="prefixes",ue="items";function Bt(e,t,n){const r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[ce])for(const s of n[ce]){const o=s.replace(/\/$/,""),i=e._makeStorageReference(new _(t,o));r.prefixes.push(i)}if(n[ue])for(const s of n[ue]){const o=e._makeStorageReference(new _(t,s.name));r.items.push(o)}return r}function Dt(e,t,n){const r=ve(n);return r===null?null:Bt(e,t,r)}class Ee{constructor(t,n,r,s){this.url=t,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(e){if(!e)throw re()}function Nt(e,t){function n(r,s){const o=It(e,s,t);return Ce(o!==null),o}return n}function Mt(e,t){function n(r,s){const o=Dt(e,t,s);return Ce(o!==null),o}return n}function Se(e){function t(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=Ve():s=Ge():n.getStatus()===402?s=Ye(e.bucket):n.getStatus()===403?s=Je(e.path):s=r,s.serverResponse=r.serverResponse,s}return t}function Ft(e,t,n,r,s){const o={};t.isRoot?o.prefix="":o.prefix=t.path+"/",n&&n.length>0&&(o.delimiter=n),r&&(o.pageToken=r),s&&(o.maxResults=s);const i=t.bucketOnlyServerUrl(),l=xe(i,e.host,e._protocol),a="GET",c=e.maxOperationRetryTime,u=new Ee(l,a,Mt(e,t.bucket),c);return u.urlParams=o,u.errorHandler=Se(t),u}function Lt(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function jt(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=Lt(null,t)),r}function zt(e,t,n,r,s){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function l(){let R="";for(let y=0;y<2;y++)R=R+Math.random().toString().slice(2);return R}const a=l();i["Content-Type"]="multipart/related; boundary="+a;const c=jt(t,r,s),u=Ut(c,n),h="--"+a+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+u+`\r
--`+a+`\r
Content-Type: `+c.contentType+`\r
\r
`,d=`\r
--`+a+"--",m=E.getBlob(h,r,d);if(m===null)throw rt();const w={name:c.fullPath},I=xe(o,e.host,e._protocol),b="POST",U=e.maxUploadRetryTime,P=new Ee(I,b,Nt(e,n),U);return P.urlParams=w,P.headers=i,P.body=m.uploadData(),P.errorHandler=Se(t),P}class Ht{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=A.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=A.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=A.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,s){if(this.sent_)throw B("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw B("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw B("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw B("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw B("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class qt extends Ht{initXhr(){this.xhr_.responseType="text"}}function Pe(){return new qt}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(t,n){this._service=t,n instanceof _?this._location=n:this._location=_.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new $(t,n)}get root(){const t=new _(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Te(this._location.path)}get storage(){return this._service}get parent(){const t=Et(this._location.path);if(t===null)return null;const n=new _(this._location.bucket,t);return new $(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw st(t)}}function Wt(e,t,n){e._throwIfRoot("uploadBytes");const r=zt(e.storage,e._location,At(),new E(t,!0),n);return e.storage.makeRequestWithTokens(r,Pe).then(s=>({metadata:s,ref:e}))}function Xt(e){const t={prefixes:[],items:[]};return Ae(e,t).then(()=>t)}async function Ae(e,t,n){const s=await Kt(e,{pageToken:n});t.prefixes.push(...s.prefixes),t.items.push(...s.items),s.nextPageToken!=null&&await Ae(e,t,s.nextPageToken)}function Kt(e,t){t!=null&&typeof t.maxResults=="number"&&Z("options.maxResults",1,1e3,t.maxResults);const n=t||{},r=Ft(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(r,Pe)}function Yt(e,t){const n=Ct(e._location.path,t),r=new _(e._location.bucket,n);return new $(e.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(e){return/^[A-Za-z]+:\/\//.test(e)}function Vt(e,t){return new $(e,t)}function Oe(e,t){if(e instanceof oe){const n=e;if(n._bucket==null)throw nt();const r=new $(n,n._bucket);return t!=null?Oe(r,t):r}else return t!==void 0?Yt(e,t):e}function Jt(e,t){if(t&&Gt(t)){if(e instanceof oe)return Vt(e,t);throw Q("To use ref(service, url), the first argument must be a Storage instance.")}else return Oe(e,t)}function de(e,t){const n=t==null?void 0:t[_e];return n==null?null:_.makeFromBucketSpec(n,e)}class oe{constructor(t,n,r,s,o){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=o,this._bucket=null,this._host=ge,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Xe,this._maxUploadRetryTime=Ke,this._requests=new Set,s!=null?this._bucket=_.makeFromBucketSpec(s,this._host):this._bucket=de(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=_.makeFromBucketSpec(this._url,t):this._bucket=de(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Z("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Z("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new $(this,t)}_makeRequest(t,n,r,s){if(this._deleted)return new ot(be());{const o=gt(t,this._appId,r,s,n,this._firebaseVersion);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,s).getPromise()}}const he="@firebase/storage",pe="0.9.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="storage";function Hn(e,t,n){return e=X(e),Wt(e,t,n)}function qn(e){return e=X(e),Xt(e)}function Wn(e,t){return e=X(e),Jt(e,t)}function Xn(e=ze(),t){return e=X(e),je(e,$e).getImmediate({identifier:t})}function Qt(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new oe(n,r,s,t,He)}function Zt(){Fe(new Le($e,Qt,"PUBLIC").setMultipleInstances(!0)),ae(he,pe,""),ae(he,pe,"esm2017")}Zt();let en={data:""},tn=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||en,nn=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,rn=/\/\*[^]*?\*\/|  +/g,fe=/\n+/g,C=(e,t)=>{let n="",r="",s="";for(let o in e){let i=e[o];o[0]=="@"?o[1]=="i"?n=o+" "+i+";":r+=o[1]=="f"?C(i,o):o+"{"+C(i,o[1]=="k"?"":t)+"}":typeof i=="object"?r+=C(i,t?t.replace(/([^,])+/g,l=>o.replace(/(^:.*)|([^,])+/g,a=>/&/.test(a)?a.replace(/&/g,l):l?l+" "+a:a)):o):i!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=C.p?C.p(o,i):o+":"+i+";")}return n+(t&&s?t+"{"+s+"}":s)+r},v={},Ie=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Ie(e[n]);return t}return e},sn=(e,t,n,r,s)=>{let o=Ie(e),i=v[o]||(v[o]=(a=>{let c=0,u=11;for(;c<a.length;)u=101*u+a.charCodeAt(c++)>>>0;return"go"+u})(o));if(!v[i]){let a=o!==e?e:(c=>{let u,h,d=[{}];for(;u=nn.exec(c.replace(rn,""));)u[4]?d.shift():u[3]?(h=u[3].replace(fe," ").trim(),d.unshift(d[0][h]=d[0][h]||{})):d[0][u[1]]=u[2].replace(fe," ").trim();return d[0]})(e);v[i]=C(s?{["@keyframes "+i]:a}:a,n?"":"."+i)}let l=n&&v.g?v.g:null;return n&&(v.g=v[i]),((a,c,u,h)=>{h?c.data=c.data.replace(h,a):c.data.indexOf(a)===-1&&(c.data=u?a+c.data:c.data+a)})(v[i],t,r,l),i},on=(e,t,n)=>e.reduce((r,s,o)=>{let i=t[o];if(i&&i.call){let l=i(n),a=l&&l.props&&l.props.className||/^go/.test(l)&&l;i=a?"."+a:l&&typeof l=="object"?l.props?"":C(l,""):l===!1?"":l}return r+s+(i==null?"":i)},"");function K(e){let t=this||{},n=e.call?e(t.p):e;return sn(n.unshift?n.raw?on(n,[].slice.call(arguments,1),t.p):n.reduce((r,s)=>Object.assign(r,s&&s.call?s(t.p):s),{}):n,tn(t.target),t.g,t.o,t.k)}let Ue,ee,te;K.bind({g:1});let T=K.bind({k:1});function an(e,t,n,r){C.p=t,Ue=e,ee=n,te=r}function S(e,t){let n=this||{};return function(){let r=arguments;function s(o,i){let l=Object.assign({},o),a=l.className||s.className;n.p=Object.assign({theme:ee&&ee()},l),n.o=/ *go\d+/.test(a),l.className=K.apply(n,r)+(a?" "+a:""),t&&(l.ref=i);let c=e;return e[0]&&(c=l.as||e,delete l.as),te&&c[0]&&te(l),Ue(c,l)}return t?t(s):s}}var ln=e=>typeof e=="function",W=(e,t)=>ln(e)?e(t):e,cn=(()=>{let e=0;return()=>(++e).toString()})(),un=e=>t=>{t&&setTimeout(()=>{let n=t.getBoundingClientRect();e(n)})},Be=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),dn=20,z=new Map,me=e=>{if(z.has(e))return;let t=setTimeout(()=>{z.delete(e),O({type:4,toastId:e})},1e3);z.set(e,t)},hn=e=>{let t=z.get(e);t&&clearTimeout(t)},ne=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,dn)};case 1:return t.toast.id&&hn(t.toast.id),{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:n}=t;return e.toasts.find(o=>o.id===n.id)?ne(e,{type:1,toast:n}):ne(e,{type:0,toast:n});case 3:let{toastId:r}=t;return r?me(r):e.toasts.forEach(o=>{me(o.id)}),{...e,toasts:e.toasts.map(o=>o.id===r||r===void 0?{...o,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+s}))}}},H=[],q={toasts:[],pausedAt:void 0},O=e=>{q=ne(q,e),H.forEach(t=>{t(q)})},pn={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},fn=(e={})=>{let[t,n]=p.exports.useState(q);p.exports.useEffect(()=>(H.push(n),()=>{let s=H.indexOf(n);s>-1&&H.splice(s,1)}),[t]);let r=t.toasts.map(s=>{var o,i;return{...e,...e[s.type],...s,duration:s.duration||((o=e[s.type])==null?void 0:o.duration)||(e==null?void 0:e.duration)||pn[s.type],style:{...e.style,...(i=e[s.type])==null?void 0:i.style,...s.style}}});return{...t,toasts:r}},mn=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||cn()}),N=e=>(t,n)=>{let r=mn(t,e,n);return O({type:2,toast:r}),r.id},x=(e,t)=>N("blank")(e,t);x.error=N("error");x.success=N("success");x.loading=N("loading");x.custom=N("custom");x.dismiss=e=>{O({type:3,toastId:e})};x.remove=e=>O({type:4,toastId:e});x.promise=(e,t,n)=>{let r=x.loading(t.loading,{...n,...n==null?void 0:n.loading});return e.then(s=>(x.success(W(t.success,s),{id:r,...n,...n==null?void 0:n.success}),s)).catch(s=>{x.error(W(t.error,s),{id:r,...n,...n==null?void 0:n.error})}),e};var gn=e=>{let{toasts:t,pausedAt:n}=fn(e);p.exports.useEffect(()=>{if(n)return;let s=Date.now(),o=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(s-i.createdAt);if(l<0){i.visible&&x.dismiss(i.id);return}return setTimeout(()=>x.dismiss(i.id),l)});return()=>{o.forEach(i=>i&&clearTimeout(i))}},[t,n]);let r=p.exports.useMemo(()=>({startPause:()=>{O({type:5,time:Date.now()})},endPause:()=>{n&&O({type:6,time:Date.now()})},updateHeight:(s,o)=>O({type:1,toast:{id:s,height:o}}),calculateOffset:(s,o)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:a}=o||{},c=t.filter(d=>(d.position||a)===(s.position||a)&&d.height),u=c.findIndex(d=>d.id===s.id),h=c.filter((d,m)=>m<u&&d.visible).length;return c.filter(d=>d.visible).slice(...i?[h+1]:[0,h]).reduce((d,m)=>d+(m.height||0)+l,0)}}),[t,n]);return{toasts:t,handlers:r}},_n=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,bn=T`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,yn=T`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,xn=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_n} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${bn} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${yn} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,wn=T`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Rn=S("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${wn} 1s linear infinite;
`,kn=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,vn=T`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Tn=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${kn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${vn} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,En=S("div")`
  position: absolute;
`,Cn=S("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Sn=T`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Pn=S("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Sn} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,An=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?p.exports.createElement(Pn,null,t):t:n==="blank"?null:p.exports.createElement(Cn,null,p.exports.createElement(Rn,{...r}),n!=="loading"&&p.exports.createElement(En,null,n==="error"?p.exports.createElement(xn,{...r}):p.exports.createElement(Tn,{...r})))},On=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,$n=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,In="0%{opacity:0;} 100%{opacity:1;}",Un="0%{opacity:1;} 100%{opacity:0;}",Bn=S("div",p.exports.forwardRef)`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Dn=S("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Nn=(e,t)=>{let n=e.includes("top")?1:-1,[r,s]=Be()?[In,Un]:[On(n),$n(n)];return{animation:t?`${T(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${T(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Mn=p.exports.memo(({toast:e,position:t,style:n,children:r})=>{let s=e!=null&&e.height?Nn(e.position||t||"top-center",e.visible):{opacity:0},o=p.exports.createElement(An,{toast:e}),i=p.exports.createElement(Dn,{...e.ariaProps},W(e.message,e));return p.exports.createElement(Bn,{className:e.className,style:{...s,...n,...e.style}},typeof r=="function"?r({icon:o,message:i}):p.exports.createElement(p.exports.Fragment,null,o,i))});an(p.exports.createElement);var Fn=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Be()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...s}},Ln=K`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,j=16,Kn=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:s,containerStyle:o,containerClassName:i})=>{let{toasts:l,handlers:a}=gn(n);return p.exports.createElement("div",{style:{position:"fixed",zIndex:9999,top:j,left:j,right:j,bottom:j,pointerEvents:"none",...o},className:i,onMouseEnter:a.startPause,onMouseLeave:a.endPause},l.map(c=>{let u=c.position||t,h=a.calculateOffset(c,{reverseOrder:e,gutter:r,defaultPosition:t}),d=Fn(u,h),m=c.height?void 0:un(w=>{a.updateHeight(c.id,w.height)});return p.exports.createElement("div",{ref:m,className:c.visible?Ln:"",key:c.id,style:d},c.type==="custom"?W(c.message,c):s?s(c):p.exports.createElement(Mn,{toast:c,position:u}))}))},Yn=x;export{Yn as E,Kn as O,zn as T,Xn as g,qn as l,x as n,Wn as r,Hn as u};
