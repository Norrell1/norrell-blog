const posts=[
 {title:"我的第一个 GitHub Pages 网站",date:"2026.09.12",category:"技术",file:"github-pages.html",excerpt:"从零开始，把一个静态博客部署到互联网。"},
 {title:"最近听到的一些声音",date:"2026.09.10",category:"音乐",file:"music-notes.html",excerpt:"随手记录最近喜欢的歌、声音和一些听歌时的想法。"},
 {title:"慢一点，也没关系",date:"2026.09.08",category:"随笔",file:"slowly.html",excerpt:"关于学习、生活，以及给自己留一点探索时间。"}
];

const list=document.querySelector("#posts");
document.querySelector("#count").textContent=`${posts.length} 篇`;
list.innerHTML=posts.map(p=>`
<a class="card" href="posts/${p.file}">
  <span class="tag">${p.category}</span>
  <h3>${p.title}</h3>
  <div class="date">${p.date}</div>
  <p class="excerpt">${p.excerpt}</p>
</a>`).join("");

const theme=document.querySelector("#theme");
if(localStorage.theme==="dark") document.body.classList.add("dark");
function sync(){theme.textContent=document.body.classList.contains("dark")?"☀":"☾"}
theme.onclick=()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light";sync()};
sync();
