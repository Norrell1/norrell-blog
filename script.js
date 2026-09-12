const owner="Norrell1",repo="norrell-blog",branch="main";
const list=document.querySelector("#posts"),count=document.querySelector("#count");
async function loadPosts(){
  try{
    const r=await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/posts?ref=${branch}`);
    if(!r.ok) throw new Error("GitHub API");
    const files=await r.json();
    const md=files.filter(x=>x.name.toLowerCase().endsWith(".md"));
    const posts=[];
    for(const f of md){
      const raw=await fetch(f.download_url).then(x=>x.text());
      const m=raw.match(/^---\s*([\s\S]*?)\s*---/);
      let meta={}; if(m)m[1].split("\n").forEach(line=>{const i=line.indexOf(":");if(i>0)meta[line.slice(0,i).trim()]=line.slice(i+1).trim().replace(/^["']|["']$/g,"")});
      posts.push({file:f.name,title:meta.title||f.name.replace(/\.md$/i,""),date:meta.date||"",category:meta.category||"随笔",excerpt:meta.excerpt||""});
    }
    posts.sort((a,b)=>b.date.localeCompare(a.date)); count.textContent=`${posts.length} 篇`;
    list.innerHTML=posts.map(p=>`<a class="card" href="posts/${encodeURIComponent(p.file)}"><span class="tag">${p.category}</span><h3>${p.title}</h3><div class="date">${p.date}</div><p class="excerpt">${p.excerpt}</p></a>`).join("")||"<p class='muted'>还没有文章。</p>";
  }catch(e){count.textContent="";list.innerHTML="<p class='muted'>文章列表暂时无法加载，请稍后刷新。</p>"}
}
loadPosts();
const theme=document.querySelector("#theme");if(localStorage.theme==="dark")document.body.classList.add("dark");
theme.onclick=()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light";theme.textContent=document.body.classList.contains("dark")?"☀":"☾"};
