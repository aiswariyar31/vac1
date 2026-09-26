const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const roleData = {
  analyst:{title:"Data Analyst",goal:"Turn data into understandable findings that support decisions.",skills:["SQL","Excel","Statistics","Python/Pandas","Visualization","Communication"],tools:["Excel","SQL","Python","Pandas","Power BI","Tableau"],tasks:"Clean data, query databases, calculate metrics, investigate patterns, build dashboards and explain results.",output:"Reports, dashboards, analysis and recommendations."},
  scientist:{title:"Data Scientist",goal:"Use statistics, programming and modeling to solve complex data problems.",skills:["Python/R","Statistics","Machine Learning","Experimentation","Modeling","Communication"],tools:["Python","R","SQL","Jupyter","ML libraries"],tasks:"Explore data, design experiments, build statistical/ML models and evaluate predictions.",output:"Models, experiments, predictions and analytical solutions."},
  engineer:{title:"Data Engineer",goal:"Build reliable systems that collect, store, transform and deliver usable data.",skills:["SQL","Programming","Databases","ETL/ELT","Cloud/Data Platforms","Data Quality"],tools:["SQL","Python","Cloud platforms","Orchestration tools","Data warehouses"],tasks:"Build pipelines, integrate sources, manage storage and make data available reliably.",output:"Pipelines, datasets, data stores and infrastructure."}
};

function renderRole(role){
  const d=roleData[role], panel=$("#rolePanel");
  panel.innerHTML=`<h3>${d.title}</h3><p>${d.goal}</p><div class="two-col"><div><b>Responsibilities</b><p>${d.tasks}</p></div><div><b>Skills & tools</b><p>${d.skills.join(" · ")}</p><p><b>Tools:</b> ${d.tools.join(" · ")}</p></div></div><b>Typical output:</b> ${d.output}`;
}
$$(".role-tab").forEach(b=>b.addEventListener("click",()=>{$$(".role-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderRole(b.dataset.role)}));
renderRole("analyst");

const workflowData={
 problem:["Understand the question","Example: Why did sales decrease?","Typical tools: interviews, requirements notes","Output: clear analytical question"],
 collect:["Obtain relevant data","Example: sales database, CSV files, APIs","Typical tools: SQL, files, APIs","Output: source datasets"],
 clean:["Improve data quality","Example: handle missing values, duplicates and errors","Typical tools: Excel, SQL, Python/Pandas","Output: analysis-ready data"],
 analyze:["Examine and summarize","Example: compare sales by month and product","Typical tools: SQL, Python, statistics","Output: findings and measures"],
 visualize:["Communicate patterns","Example: line chart of monthly sales","Typical tools: Power BI, Tableau, Python","Output: charts/dashboard"],
 insight:["Interpret the evidence","Example: identify which product groups changed","Typical tools: statistics, domain knowledge","Output: meaningful explanation with limitations"],
 decision:["Support action","Example: review inventory or campaign strategy","Typical tools: report, dashboard, meeting","Output: informed next step"]
};
function renderWorkflow(stage){
 const d=workflowData[stage]; $("#workflowDetail").innerHTML=`<h3>${d[0]}</h3><p><b>Example:</b> ${d[1]}</p><p><b>Typical tools:</b> ${d[2]}</p><p><b>Output:</b> ${d[3]}</p>`;
}
$$(".workflow button").forEach(b=>b.addEventListener("click",()=>{$$(".workflow button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderWorkflow(b.dataset.stage)}));
renderWorkflow("problem");

function calculateStats(){
 const values=$("#statsInput").value.split(",").map(value=>Number(value.trim())).filter(value=>Number.isFinite(value));
 const results=$("#statsResults");
 if(!values.length){results.innerHTML='<div class="metric"><span>Enter at least one valid number.</span></div>';return}
 const sorted=[...values].sort((a,b)=>a-b), mean=values.reduce((sum,value)=>sum+value,0)/values.length;
 const middle=Math.floor(sorted.length/2), median=sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2;
 results.innerHTML=[
  ["Count",values.length],
  ["Mean",mean.toFixed(2)],
  ["Median",median.toFixed(2)],
  ["Lowest",sorted[0]],
  ["Highest",sorted[sorted.length-1]],
  ["Range",(sorted[sorted.length-1]-sorted[0]).toFixed(2)]
 ].map(item=>`<div class="metric"><span>${item[0]}</span><strong>${item[1]}</strong></div>`).join("");
}
$("#statsCalculate").addEventListener("click",calculateStats);
calculateStats();

const glossary=[
["Data","Raw facts or observations collected for a purpose.","Example: marks such as 78, 85 and 91."],
["Dataset","A structured collection of related data records or observations.","Example: a CSV containing student records."],
["Database","An organized system for storing and managing data.","Example: a college student database."],
["Information","Processed or organized data that conveys useful meaning.","Example: class average mark = 76."],
["Insight","A meaningful interpretation discovered from data.","Example: attendance is low in one section."],
["Analytics","Systematic examination of data to answer questions and support decisions.","Example: analyzing sales by month."],
["Data Analysis","The process of examining, cleaning, transforming and interpreting data.","Example: calculating averages and comparing groups."],
["Data Analyst","A professional who analyzes data and communicates findings.","Example: building a performance dashboard."],
["Data Scientist","A professional who may combine statistics, programming and machine learning.","Example: developing a predictive model."],
["Data Engineer","A professional focused on data pipelines, storage and infrastructure.","Example: building an ETL pipeline."],
["Business Analytics","Analytics applied to business questions and decisions.","Example: studying sales and customer behavior."],
["Data Science","A broad field combining data, statistics, computing and often ML/modeling.","Example: developing a predictive system."],
["Dashboard","A visual interface that displays important measures and charts.","Example: sales dashboard showing revenue and targets."],
["KPI","Key Performance Indicator: a metric used to monitor an important objective.","Example: monthly customer retention rate."],
["Visualization","Graphical representation of data.","Example: a bar chart of subject marks."],
["Pattern","A repeated or meaningful structure in data.","Example: higher demand every weekend."],
["Trend","A general direction of change over time.","Example: gradually increasing monthly sales."],
["Outlier","An observation unusually far from other observations.","Example: one value far above the typical range."],
["Variable","A characteristic that can take different values.","Example: age, attendance or exam mark."],
["Observation","One recorded unit, case or row of data.","Example: one student's record."]
,["Statistics","The study of collecting, organizing, analyzing and interpreting data.","Example: calculating the average mark of a class."]
,["Population","The complete set of individuals, objects or observations of interest.","Example: all students in a college."]
,["Sample","A smaller group selected from a population for analysis.","Example: 200 students selected from 5,000."]
,["Descriptive Statistics","Methods that summarize and describe collected data.","Example: mean, median and range."]
,["Inferential Statistics","Methods that use a sample to draw conclusions about a population.","Example: estimating satisfaction across a college."]
,["EDA","Exploratory Data Analysis: examining data to discover patterns, errors and relationships.","Example: checking missing values before modeling."]
,["Mean","The arithmetic average of a set of values.","Example: sum of marks divided by the number of marks."]
,["Median","The middle value after data is ordered.","Example: the third value in an ordered set of five."]
,["Range","The difference between the highest and lowest values.","Example: 80 minus 40 equals a range of 40."]
];
function renderGlossary(q=""){
 const grid=$("#glossaryGrid");grid.innerHTML="";
 glossary.filter(x=>x[0].toLowerCase().includes(q.toLowerCase())||x[1].toLowerCase().includes(q.toLowerCase())).forEach(x=>{
  const c=document.createElement("div");c.className="glossary-card";c.innerHTML=`<h3>${x[0]}</h3><p>${x[1]}</p><div class="tech"><b>Example:</b> ${x[2]}</div>`;c.addEventListener("click",()=>c.classList.toggle("open"));grid.appendChild(c);
 });
}
renderGlossary();$("#glossarySearch").addEventListener("input",e=>renderGlossary(e.target.value));

const cards=[
["What is data?","Raw facts or observations collected for a purpose."],["What is information?","Processed data that conveys useful meaning."],["Define data analytics.","Examining data to discover useful information and support decisions."],["What is business analytics?","Analytics applied specifically to business questions."],["What does a data analyst do?","Cleans, analyzes, visualizes and communicates data findings."],["What does a data engineer do?","Builds systems and pipelines that make data reliable and usable."],["What is an insight?","A meaningful interpretation discovered from data."],["What is a dashboard?","A visual interface showing important measures and charts."],["What is data science?","A broader field including analytics, statistics, programming and often ML."],["Why clean data?","Poor-quality data can distort analysis and conclusions."],["What is a KPI?","A key metric used to monitor an important objective."],["Is analytics only numbers?","No. It can use text, categories, images, time data and more."],["What is an outlier?","A value unusually far from other observations."],["What is a trend?","A general direction of change over time."],["Why define the problem first?","Because analysis should answer a meaningful question."]
];
$("#flashGrid").innerHTML=cards.map(c=>`<div class="flashcard"><div class="flash-inner"><div class="flash-face">${c[0]}</div><div class="flash-face flash-back">${c[1]}</div></div></div>`).join("");
$$(".flashcard").forEach(c=>c.addEventListener("click",()=>c.classList.toggle("flipped")));

const quiz=[
["What is data analytics?",["A method for storing files only","A process of examining data for useful findings","Only machine learning","Only making charts"],1,"Analytics examines data to discover useful information and support decisions."],
["Which role primarily focuses on data pipelines and infrastructure?",["Data Analyst","Data Scientist","Data Engineer","Marketing Manager"],2,"Data engineers commonly focus on pipelines, storage and data infrastructure."],
["Which task is central to a Data Analyst?",["Designing CPUs","Analyzing and communicating data findings","Manufacturing hardware","Writing operating systems"],1,"Analysis, visualization and communication are central analyst activities."],
["What is Business Analytics?",["Analytics applied to business questions","Only financial accounting","A programming language","A database engine"],0,"Business analytics applies analytical methods to business problems."],
["Which field commonly includes machine learning as a major component?",["Data Science","Word processing","HTML","File management"],0,"Data science commonly includes machine learning along with statistics and programming."],
["What is a useful purpose of data visualization?",["Hide data","Make patterns easier to communicate","Delete missing values automatically","Guarantee causation"],1,"Visualizations help people see and communicate patterns and comparisons."],
["Which is an example of education analytics?",["Analyzing student attendance and marks","Changing a laptop battery","Designing a keyboard","Formatting a document"],0,"Attendance and academic performance are common education analytics data."],
["What is a typical Data Engineer output?",["A reliable data pipeline","A student essay","A poster","A classroom timetable only"],0,"Pipelines and usable data infrastructure are typical engineering outputs."],
["Which skill is important for a Data Analyst?",["Critical thinking","Only typing speed","Only drawing","Only hardware repair"],0,"Analysts need critical thinking and problem-solving alongside technical skills."],
["What is an insight?",["A random number","A meaningful interpretation discovered from data","A database password","A file extension"],1,"An insight is a useful interpretation derived from analyzed data."]
];
$("#quizForm").innerHTML=quiz.map((q,i)=>`<div class="question"><h3>${i+1}. ${q[0]}</h3>${q[1].map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}<div class="quiz-explain" hidden></div></div>`).join("");
$("#submitQuiz").addEventListener("click",()=>{
 let score=0,answered=0;const items=[];
 quiz.forEach((q,i)=>{const chosen=document.querySelector(`input[name="q${i}"]:checked`),box=$$(".question")[i],ex=box.querySelector(".quiz-explain");if(chosen){answered++;if(+chosen.value===q[2])score++;items.push(`<div class="result-item ${+chosen.value===q[2]?"correct":"wrong"}"><b>Q${i+1}:</b> ${+chosen.value===q[2]?"Correct":"Incorrect"} — ${q[3]}</div>`)}else items.push(`<div class="result-item wrong"><b>Q${i+1}:</b> Not answered — ${q[3]}</div>`);ex.hidden=false;ex.textContent=q[3]});
 const pct=Math.round(score/quiz.length*100);$("#quizResult").hidden=false;$("#quizResult").innerHTML=`<h3>Score: ${score}/${quiz.length} (${pct}%)</h3><p>You answered ${answered} of ${quiz.length} questions. Review the explanations below.</p>${items.join("")}`;$("#quizResult").scrollIntoView({behavior:"smooth",block:"center"});
});
$("#resetQuiz").addEventListener("click",()=>{$("#quizForm").reset();$("#quizResult").hidden=true;$$(".quiz-explain").forEach(x=>x.hidden=true);window.scrollTo({top:$("#quiz").offsetTop-70,behavior:"smooth"})});

const scenario=[
["A. Build a machine learning model","Not first. Modeling should follow a clear problem and suitable data.","wrong"],
["B. Understand and define the problem","Correct. First clarify what decreased, when, for which products/customers, and what decision is needed.","correct"],
["C. Create a dashboard immediately","Not first. A dashboard should be designed after the question and data needs are understood.","wrong"],
["D. Delete unusual data","Not first. Unusual values must be investigated and validated; they should not be removed automatically.","wrong"]
];
$("#scenarioOptions").innerHTML=scenario.map((x,i)=>`<button class="scenario-option" data-i="${i}">${x[0]}</button>`).join("");
$$(".scenario-option").forEach(b=>b.addEventListener("click",()=>{const x=scenario[+b.dataset.i];$("#scenarioFeedback").className=x[2];$("#scenarioFeedback").textContent=x[1]}));

$$(".reveal-btn").forEach(b=>b.addEventListener("click",()=>{b.nextElementSibling.textContent=b.dataset.answer;b.disabled=true}));

const topicSections=$$(".topic-card, #mindmaps, #case-study, #glossary, #roadmap, #revision, #quiz, #scenario, #module-summary");
const viewed=new Set();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){viewed.add(e.target.id);updateProgress();}})},{threshold:.18});
topicSections.forEach(x=>observer.observe(x));
function updateProgress(){const pct=Math.min(100,Math.round(viewed.size/topicSections.length*100));$("#progressBar").style.width=pct+"%";$("#progressText").textContent=pct+"%";$("#scrollProgress").style.width=(window.scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%";}
window.addEventListener("scroll",()=>{$("#scrollProgress").style.width=(window.scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%";});
const navLinks=$$("#sideNav a"), navObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-30% 0px -55% 0px"});
topicSections.forEach(x=>navObserver.observe(x));

const menuButton=$("#menuBtn"), sidebar=$("#sidebar"), sidebarBackdrop=$("#sidebarBackdrop");
function setNavigationOpen(isOpen){
 sidebar.classList.toggle("open",isOpen);
 sidebarBackdrop.hidden=!isOpen;
 menuButton.setAttribute("aria-expanded",String(isOpen));
 menuButton.setAttribute("aria-label",isOpen?"Close navigation":"Open navigation");
}
menuButton.addEventListener("click",()=>setNavigationOpen(!sidebar.classList.contains("open")));
sidebarBackdrop.addEventListener("click",()=>setNavigationOpen(false));
navLinks.forEach(a=>a.addEventListener("click",()=>setNavigationOpen(false)));
document.addEventListener("keydown",event=>{if(event.key==="Escape")setNavigationOpen(false)});

const revealTargets=$$(".topic-card, #mindmaps, #case-study, #glossary, #roadmap, #flashcards, #revision, #quiz, #scenario, #module-summary");
if("IntersectionObserver" in window){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}
 }),{threshold:.08});
 revealTargets.forEach(target=>{target.classList.add("reveal-item");revealObserver.observe(target)});
 document.documentElement.classList.add("motion-ready");
}
$("#themeBtn").addEventListener("click",()=>{const dark=document.documentElement.dataset.theme==="dark";document.documentElement.dataset.theme=dark?"":"dark";localStorage.setItem("da-theme",dark?"light":"dark");$("#themeBtn").textContent=dark?"☾":"☀"});
if(localStorage.getItem("da-theme")==="dark"){document.documentElement.dataset.theme="dark";$("#themeBtn").textContent="☀"}

const searchable=[...$$(".searchable")];
$("#searchBox").addEventListener("input",e=>{
 const q=e.target.value.trim().toLowerCase(), box=$("#searchResults");if(!q){box.hidden=true;searchable.forEach(x=>x.style.display="");return}
 const hits=searchable.filter(x=>x.innerText.toLowerCase().includes(q));box.hidden=false;
 box.innerHTML=`<div class="result"><b>${hits.length}</b> matching section(s). Click a result to jump.</div>`+hits.slice(0,12).map(x=>`<div class="result"><a href="#${x.id}">${x.dataset.title||x.querySelector("h2")?.textContent}</a></div>`).join("");
 searchable.forEach(x=>x.style.display=hits.includes(x)?"":"none");
});
