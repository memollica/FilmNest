import{_ as f,r as v,b as y,g as S,c as d,d as s,F as m,e as w,f as k,h as b,u as M,i as x,j as N,k as C,l as F,o as u,m as h,t as O,p as P,n as U}from"./index-CzWQvNiB.js";const D={name:"Movies",setup(){const t=v("https://image.tmdb.org/t/p/w500"),c=v(null),a=v([]),r=async o=>{try{console.log("Fetching movies with ids:",o);const e=o.map(i=>b.get(`https://api.themoviedb.org/3/movie/${i}?language=en-US&api_key=5121c69959e2b598070cef210e2509c5`)),n=await Promise.all(e);a.value=n.map(i=>i.data),console.log("Fetched movies:",a.value)}catch(e){console.error("Error fetching movie data:",e)}};return y(()=>{S.onAuthStateChanged(e=>{c.value=e});const o=localStorage.getItem("user");if(o){const e=JSON.parse(o);console.log("Parsed user:",e),e.movies&&e.movies.length>0&&r(e.movies)}}),{movies:a,baseUrlPoster:t,removeMovie:async o=>{const e=a.value.findIndex(n=>n.id===o);if(e!==-1){M().error("Movie Deleted!!",{position:"top-right",timeout:2e3,closeOnClick:!0,pauseOnHover:!0}),a.value.splice(e,1),console.log("kullanıcı bilgileri",c.value.uid);const i=x(N,"users",c.value.uid);console.log(i),await C(i,{movies:F(o)}),console.log("Firestore'dan silindi: ",o);const l=JSON.parse(localStorage.getItem("user"))||[];console.log("stored user is: ",l),l.movies=l.movies.filter(_=>_!==o),localStorage.setItem("user",JSON.stringify(l)),console.log("Movie removed from localStorage:",o)}}}}},g=t=>(P("data-v-ea56c970"),t=t(),U(),t),V=g(()=>s("div",{class:"container profileDescription"},[s("div",{class:"row"},[s("h4",null,"My Movies List"),s("h5",null,"This list shows yours favorite movies that you have watched or want to watch. You can add or remove movies from this list by just clicking on the movie.")])],-1)),B={class:"container",style:{color:"white"}},I=["onClick"],J=["src"],T=g(()=>s("br",null,null,-1)),j={key:0};function A(t,c,a,r,p,o){return u(),d(m,null,[V,s("div",B,[(u(!0),d(m,null,w(r.movies,e=>(u(),d("li",{key:e.id,onClick:n=>r.removeMovie(e.id)},[s("img",{src:r.baseUrlPoster+e.poster_path},null,8,J),h(),T,h(O(e.title),1)],8,I))),128))]),r.movies.length===0?(u(),d("div",j,"No movies found.")):k("",!0)],64)}const L=f(D,[["render",A],["__scopeId","data-v-ea56c970"]]);export{L as default};
