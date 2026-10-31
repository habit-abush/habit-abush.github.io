const KEY='habit_final_v6';

const defaultState={
theme:'dark',
lang:'ru',
name:'',
xp:0,
joinedAt:'',
recovery:2,
recoveryMonth:'',
recoveredDates:{},
recoveryDismissed:{},
tasks:[],
goals:[],
habits:[
{id:1,name:'Читать 20 минут',icon:'📚',color:'#9a7cff',done:{},days:[0,1,2,3,4,5,6]},
{id:2,name:'Тренировка',icon:'🏋️',color:'#55e89a',done:{},days:[0,1,2,3,4,5,6]},
{id:3,name:'Вода',icon:'💧',color:'#38bdf8',done:{},days:[0,1,2,3,4,5,6]}
]
};

let state=loadState();
let editingId=null,currentFilter='all',statsRange=30,selectedIcon='📚',selectedColor='#9a7cff',activityMode='all',selectedDays=[0,1,2,3,4,5,6];
let selectedDate=key(new Date());

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const icons=[
'📚','📖','✍️','📝','💻','⌨️','📱','🎧','🎵','🎸','🎹',
'🎨','📷','🎯','🧠','💡','🧘','🏃','🚶','🏋️','🚴','⚽',
'🏀','🏊','🧗','🧹','🛏️','😴','☀️','🌙','🕌','🤲','🕋',
'📿','🧎','💊','💉','🍎','🥗','🥦','💧','☕','🥤','🚭',
'🧴','🪥','🧼','🧘‍♂️','🌿','🐕','🌱','🪴','💰','💳',
'📈','💼','🎓','🗣️','❤️','👨‍👩‍👧','🤝','🧺','🛒',
'🚗','✈️','🌍','🏠','🔒','🔔','⏰','📅','⏱️','🍋',
'⭐','🔥','💎','🏆'
];

const colors=[
'#8b5cf6','#9a7cff','#6d5dfc','#4f46e5','#3b82f6','#38bdf8',
'#06b6d4','#14b8a6','#2dd4bf','#55e89a','#22c55e','#84cc16',
'#facc15','#f5c451','#f59e0b','#ff9b5c','#f97316','#ef4444',
'#ff6d88','#f43f5e','#ec4899','#f472b6','#b78cff','#d5d8df',
'#94a3b8','#64748b','#334155','#ffffff'
];

const tr={
ru:{
home:'Главная',
stats:'Статистика',
achievements:'Достижения',
settings:'Настройки',
habits:'Привычки',
allFocusesEyebrow:'МОИ ФОКУСЫ',
habitsPageHint:'Здесь собраны все фокусы — даже те, которые не запланированы на выбранный день. Нажми на ⋯, чтобы изменить фокус.',
level:'Уровень',
days:'дней',
active:'Серия активна',
record:'рекорд',
completed:'отметок',
success:'успешность',
chain:'ЦЕПОЧКА',
keepFire:'Не дай огню погаснуть',
today:'СЕГОДНЯ',
focus:'Твои фокусы',
add:'Добавить фокус',
all:'Все',
open:'Нужно сделать',
done:'Готово',
activity:'АКТИВНОСТЬ',
activityTitle:'Вся история в одном ритме',
successPeriod:'выполнено',
less:'меньше',
more:'больше',
overview:'ОБЗОР',
days30:'30 дней',
days90:'90 дней',
days180:'180 дней',
year:'Год',
current:'Текущая серия',
period:'за период',
pace:'РИТМ',
chart:'Твой темп',
weekly:'ПО НЕДЕЛЯМ',
weeklyTitle:'Где был лучший ритм',
rewards:'НАГРАДЫ',
control:'CONTROL',
profile:'Профиль',
profileHint:'Имя появится в приветствии и на аватаре.',
appearance:'Внешний вид',
appearanceHint:'Основной переключатель темы также находится сверху.',
language:'Язык',
languageHint:'Русский или English.',
light:'Светлая',
dark:'Тёмная',
reset:'Сбросить прогресс',
resetHint:'Удалит данные только на этом устройстве.',
resetBtn:'Сбросить',
new:'ФОКУС',
name:'Название',
icon:'Значок',
color:'Цвет',
delete:'Удалить',
save:'Сохранить',
infoText:'Твоё пространство для фокуса, дисциплины и маленьких побед каждый день.',
aboutEyebrow:'СОЗДАНО ДЛЯ ТВОЕГО РИТМА',
aboutTitle:'О программе',
aboutDescription:'Личное пространство для привычек, фокуса и ежедневного прогресса.',
creatorLabel:'Создатель',
creatorChip:'Автор',
createdLabel:'Дата создания',
createdDate:'4 октября 2026',
updatedLabel:'Последнее обновление',
updatedDate:'31 октября 2026',
aboutFooter:'Создано для маленьких шагов и больших целей',
dataPrivacy:'Данные и приватность',dataSub:'Твои данные остаются в этом браузере.',exportData:'Экспортировать данные',importData:'Импортировать копию',dataHelp:'Регулярно сохраняй резервную копию, чтобы не потерять прогресс.',stableHabits:'Самые стабильные',
plans:'Планы',plansEyebrow:'МОИ ПЛАНЫ',tasks:'Задачи',goals:'Цели',addTask:'Добавить задачу',addGoal:'Добавить цель',goalActive:'В процессе',goalDone:'Достигнуто',goalFailed:'Провалено',planLeft:'Осталось',planDoneLabel:'Выполнено',planTotal:'Всего',planDeadline:'Выполнить до',planDeadlineHint:'Отметь цель галочкой до этой даты включительно — иначе она автоматически станет крестиком.',
newTitle:'Что нового в v1.6',new1:'Новая вкладка «Планы» — задачи и цели в одном месте.',new2:'У каждой задачи и цели свой значок и цвет.',new3:'Цели со сроком: отметь до даты, иначе цель станет крестиком.',new4:'Исправлено много мелких недоработок и улучшен внешний вид.'
},

en:{
home:'Home',
stats:'Statistics',
achievements:'Achievements',
settings:'Settings',
habits:'Habits',
allFocusesEyebrow:'MY FOCUSES',
habitsPageHint:'All focuses are listed here — including ones not scheduled for the selected day. Tap ⋯ to edit a focus.',
level:'Level',
days:'days',
active:'Streak active',
record:'record',
completed:'marks',
success:'success',
chain:'CHAIN',
keepFire:'Keep the fire alive',
today:'TODAY',
focus:'Your focuses',
add:'Add focus',
all:'All',
open:'To do',
done:'Done',
activity:'ACTIVITY',
activityTitle:'Your whole history in one rhythm',
successPeriod:'completed',
less:'less',
more:'more',
overview:'OVERVIEW',
days30:'30 days',
days90:'90 days',
days180:'180 days',
year:'Year',
current:'Current streak',
period:'for period',
pace:'RHYTHM',
chart:'Your pace',
weekly:'BY WEEKS',
weeklyTitle:'Where your rhythm was strongest',
rewards:'REWARDS',
control:'CONTROL',
profile:'Profile',
profileHint:'Your name appears in the greeting and avatar.',
appearance:'Appearance',
appearanceHint:'The main theme switch is also at the top.',
language:'Language',
languageHint:'Russian or English.',
light:'Light',
dark:'Dark',
reset:'Reset progress',
resetHint:'Deletes data only on this device.',
resetBtn:'Reset',
new:'FOCUS',
name:'Name',
icon:'Icon',
color:'Color',
delete:'Delete',
save:'Save',
infoText:'Your space for focus, discipline and small wins every day.',
aboutEyebrow:'MADE FOR YOUR RHYTHM',
aboutTitle:'About',
aboutDescription:'Your personal space for habits, focus, and daily progress.',
creatorLabel:'Creator',
creatorChip:'Author',
createdLabel:'Created on',
createdDate:'October 4, 2026',
updatedLabel:'Last updated',
updatedDate:'October 31, 2026',
aboutFooter:'Built for small steps and big goals',
dataPrivacy:'Data & privacy',dataSub:'Your data stays in this browser.',exportData:'Export data',importData:'Import backup',dataHelp:'Export a backup regularly to keep your progress safe.',stableHabits:'Most consistent',
plans:'Plans',plansEyebrow:'MY PLANS',tasks:'Tasks',goals:'Goals',addTask:'Add task',addGoal:'Add goal',goalActive:'In progress',goalDone:'Achieved',goalFailed:'Failed',planLeft:'Left',planDoneLabel:'Completed',planTotal:'Total',planDeadline:'Complete by',planDeadlineHint:'Tick the goal on or before this date — otherwise it automatically turns into a cross.',
newTitle:'What\'s new in v1.6',new1:'New “Plans” tab — tasks and goals in one place.',new2:'Every task and goal has its own icon and color.',new3:'Goals with a deadline: tick it by the date or it turns into a cross.',new4:'Lots of small issues fixed and a more polished look.'
}
};

function loadState(){

try{

const saved=JSON.parse(
localStorage.getItem(KEY)||'{}'
);

const base=structuredClone(defaultState);

const loaded={
...base,
...saved
};

if(!loaded.joinedAt){
loaded.joinedAt=key(new Date());
}

if(typeof loaded.recovery!=='number') loaded.recovery=2;
if(!loaded.recoveryMonth) loaded.recoveryMonth=key(new Date()).slice(0,7);
if(!loaded.recoveredDates || typeof loaded.recoveredDates!=='object') loaded.recoveredDates={};
if(!loaded.recoveryDismissed || typeof loaded.recoveryDismissed!=='object') loaded.recoveryDismissed={};
loaded.habits=(loaded.habits||[]).map(h=>({
  ...h,
  days:Array.isArray(h.days)&&h.days.length ? [...new Set(h.days.map(Number).filter(x=>x>=0&&x<=6))].sort((a,b)=>a-b) : [0,1,2,3,4,5,6]
}));

loaded.tasks=normalizeTasks(loaded.tasks);
loaded.goals=normalizeGoals(loaded.goals);

return loaded;

}catch{

const fresh=structuredClone(
defaultState
);

fresh.joinedAt=key(new Date());

return fresh;

}

}

function save(){

localStorage.setItem(
KEY,
JSON.stringify(state)
);

}

function t(k){

return tr[state.lang]?.[k]||
tr.ru[k]||
k;

}

function key(d=new Date()){

return `${d.getFullYear()}-${String(
d.getMonth()+1
).padStart(2,'0')}-${String(
d.getDate()
).padStart(2,'0')}`;

}

function dateShift(n){

const d=new Date();

d.setHours(
12,
0,
0,
0
);

d.setDate(
d.getDate()+n
);

return d;

}

function esc(x){

return String(x).replace(
/[&<>"']/g,
c=>({
'&':'&amp;',
'<':'&lt;',
'>':'&gt;',
'"':'&quot;',
"'":'&#039;'
}[c])
);

}

function updateSegmentSliders(){
  const update=container=>{
    if(!container) return;
    const active=container.querySelector('button.active');
    if(!active){container.classList.remove('has-slider');return;}
    container.classList.add('has-slider');
    container.style.setProperty('--slider-left',`${active.offsetLeft}px`);
    container.style.setProperty('--slider-width',`${active.offsetWidth}px`);
    container.style.setProperty('--slider-height',`${active.offsetHeight}px`);
  };
  const updateNav=()=>{
    const nav=$('#mobileNav');
    if(!nav) return;
    const active=nav.querySelector('button.active');
    if(!active){nav.classList.remove('has-nav-slider');return;}
    nav.classList.add('has-nav-slider');
    nav.style.setProperty('--nav-slider-left',`${active.offsetLeft}px`);
    nav.style.setProperty('--nav-slider-width',`${active.offsetWidth}px`);
    nav.style.setProperty('--nav-slider-top',`${active.offsetTop}px`);
    nav.style.setProperty('--nav-slider-height',`${active.offsetHeight}px`);
  };
  const measure=()=>{
    $$('.segmented, .stats-switch').forEach(update);
    updateNav();
  };
  requestAnimationFrame(()=>requestAnimationFrame(measure));
}

window.addEventListener('resize',updateSegmentSliders,{passive:true});
window.addEventListener('load',updateSegmentSliders,{once:true});

function applyTheme(){

document.documentElement.dataset.theme=
state.theme;

const button=$('#themeToggle');

if(button){

const light=
state.theme==='light';

button.classList.toggle(
'light',
light
);

button.classList.toggle(
'dark',
!light
);

button.setAttribute(
'aria-label',
state.lang==='ru'
?
(
light
?'Переключить на тёмную тему'
:'Переключить на светлую тему'
)
:
(
light
?'Switch to dark theme'
:'Switch to light theme'
)
);

if($('#themeIcon')){
$('#themeIcon').textContent=
light?'☀':'☾';
}

if($('#themeLabel')){
$('#themeLabel').textContent=
state.lang==='ru'
?
(
light
?'Светлая'
:'Тёмная'
)
:
(
light
?'Light'
:'Dark'
);
}

}

$$('[data-theme]').forEach(
b=>
b.classList.toggle(
'active',
b.dataset.theme===state.theme
)
);

updateSegmentSliders();
}

function applyLang(){

document.documentElement.lang=
state.lang;

$$('[data-i18n]').forEach(
e=>
e.textContent=
t(e.dataset.i18n)
);

$$('[data-theme]').forEach(
b=>
b.classList.toggle(
'active',
b.dataset.theme===state.theme
)
);

$$('[data-lang]').forEach(
b=>
b.classList.toggle(
'active',
b.dataset.lang===state.lang
)
);

if($('#nameInput')){

$('#nameInput').placeholder=
state.lang==='ru'
?
'Твоё имя'
:
'Your name';

}

updateSegmentSliders();
}

function streak(h){

let n=0;

let d=new Date();

d.setHours(
12,
0,
0,
0
);

while(
h.done?.[key(d)]
){

n++;

d.setDate(
d.getDate()-1
);

}

return n;

}

function habitActiveOn(h, dateKey){
const d=new Date(dateKey+'T12:00:00');
const days=Array.isArray(h.days)&&h.days.length?h.days:[0,1,2,3,4,5,6];
return days.includes(d.getDay());
}

function scheduledDays(h){
return Array.isArray(h.days)&&h.days.length?h.days:[0,1,2,3,4,5,6];
}

function streakForDate(h, dateKey){
// Today's streak stays visible while the user has not completed today's task yet.
// For historical dates, calculate strictly as of the selected date.
let d=new Date(dateKey+'T12:00:00');
const todayKey=key(new Date());
if(dateKey===todayKey && habitActiveOn(h,dateKey) && !h.done?.[dateKey]){
  d.setDate(d.getDate()-1);
}
let n=0;
for(let i=0;i<366;i++){
  const k=key(d);
  if(habitActiveOn(h,k)){
    if(h.done?.[k]) n++;
    else break;
  }
  d.setDate(d.getDate()-1);
}
return n;
}

function best(h){

const ds=
Object.keys(
h.done||{}
)
.filter(
k=>h.done[k]
)
.sort();

let b=0;
let c=0;

for(
let i=0;
i<ds.length;
i++
){

if(
i &&
Math.round(
(
new Date(ds[i])-
new Date(ds[i-1])
)/
86400000
)===1
){

c++;

}else{

c=1;

}

b=Math.max(
b,
c
);

}

return b;

}

function isDayComplete(dateKey){
const active=state.habits.filter(h=>habitActiveOn(h,dateKey));
// A day with no scheduled habits is a rest day, not a broken streak.
return active.every(h=>!!h.done?.[dateKey]);
}

function overallStreak(asOf=key()){
if(!state.habits.length) return 0;
let d=new Date(asOf+'T12:00:00');
const todayKey=key(new Date());
// Until today's tasks are due/completed, preserve the streak earned through yesterday.
if(asOf===todayKey && !isDayComplete(todayKey)) d.setDate(d.getDate()-1);
let n=0;
for(let i=0;i<366;i++){
  const k=key(d);
  const active=state.habits.some(h=>habitActiveOn(h,k));
  if(!active){ d.setDate(d.getDate()-1); continue; }
  if(!isDayComplete(k)) break;
  n++;
  d.setDate(d.getDate()-1);
}
return n;
}

function overallBest(){
if(!state.habits.length) return 0;
const marked=[];
state.habits.forEach(h=>Object.keys(h.done||{}).forEach(k=>{if(h.done[k]) marked.push(k);}));
if(!marked.length) return 0;
marked.sort();
let d=new Date(marked[0]+'T12:00:00');
const end=new Date(key(new Date())+'T12:00:00');
let bestAll=0,cur=0;
for(let i=0;i<5000 && d<=end;i++){
  const k=key(d);
  const active=state.habits.some(h=>habitActiveOn(h,k));
  if(active){
    if(isDayComplete(k)){ cur++; bestAll=Math.max(bestAll,cur); }
    else cur=0;
  }
  d.setDate(d.getDate()+1);
}
return bestAll;
}

function overall(){

let total=0;
let active=new Set();

state.habits.forEach(h=>{

Object.keys(h.done||{}).forEach(k=>{
if(h.done[k]){ total++; active.add(k); }
});

});

return{
cur:overallStreak(),
best:overallBest(),
total,
active:active.size
};

}

function monthDiff(a,b){

const [ay,am]=a.split('-').map(Number);
const [by,bm]=b.split('-').map(Number);
return (by-ay)*12+(bm-am);

}

function syncRecovery(){

const month=key(new Date()).slice(0,7);

if(!state.recoveryMonth){
state.recoveryMonth=month;
if(typeof state.recovery!=='number') state.recovery=2;
save();
return;
}

const diff=monthDiff(state.recoveryMonth,month);

if(diff>0){
state.recovery+=diff*2;
state.recoveryMonth=month;
save();
}

}

function recoveryTarget(){

if(!state.habits.length || !state.recovery)
return null;

const today=new Date();
today.setHours(12,0,0,0);
const yesterday=new Date(today);
yesterday.setDate(yesterday.getDate()-1);

if(isDayComplete(key(yesterday)))
return null;

let d=new Date(yesterday);
let firstMissing=null;

for(let i=0;i<366;i++){
const k=key(d);
if(isDayComplete(k)) break;
firstMissing=k;
d.setDate(d.getDate()-1);
}

if(!firstMissing || state.recoveredDates?.[firstMissing] || state.recoveryDismissed?.[firstMissing])
return null;

let probe=new Date(firstMissing+'T12:00:00');
probe.setDate(probe.getDate()-1);
if(!isDayComplete(key(probe)))
return null;

return firstMissing;

}

function recoverStreak(){

syncRecovery();
const target=recoveryTarget();
if(!target || state.recovery<=0) return;

state.habits.forEach(h=>{ if(habitActiveOn(h,target)) h.done[target]=true; });
state.recovery--;
state.recoveredDates[target]=true;
state.recoveryDismissed[target]=true;
save();
render();
setTimeout(maybeShowRecovery,80);
toast(state.lang==='ru'?`Серия восстановлена • осталось ${state.recovery}`:`Streak restored • ${state.recovery} left`);

}

function maybeShowRecovery(){

syncRecovery();
const target=recoveryTarget();
if(!target || $('#recoveryDialog')) return;

const d=new Date(target+'T12:00:00');
const label=d.toLocaleDateString(state.lang==='ru'?'ru-RU':'en-US',{day:'numeric',month:'long'});

const box=document.createElement('div');
box.id='recoveryDialog';
box.className='recovery-dialog';
box.innerHTML=`
<div class="recovery-card">
<div class="recovery-fire">🔥</div>
<h3>${state.lang==='ru'?'Серия прервалась':'Your streak was broken'}</h3>
<p>${state.lang==='ru'?`Можно восстановить ${label} и вернуть общий огонёк.`:`You can restore ${label} and bring back your overall streak.`}</p>
<div class="recovery-left">${state.lang==='ru'?'Осталось восстановлений':'Restores left'}: <b>${state.recovery}</b></div>
<div class="recovery-actions">
<button type="button" class="recovery-cancel">${state.lang==='ru'?'Не сейчас':'Not now'}</button>
<button type="button" class="recovery-ok">${state.lang==='ru'?'Восстановить':'Restore'}</button>
</div>
</div>`;

document.body.appendChild(box);
box.querySelector('.recovery-cancel').onclick=()=>{state.recoveryDismissed[target]=true;save();box.remove();};
box.querySelector('.recovery-ok').onclick=()=>{box.remove();recoverStreak();};

}

function rate(days){

if(!state.habits.length)
return 0;

let done=0;

const total=
days*
state.habits.length;

for(
let i=days-1;
i>=0;
i--
){

const d=dateShift(-i);

state.habits.forEach(
h=>{

if(
h.done?.[key(d)]
){

done++;

}

}
);

}

return total
?
Math.round(
done/total*100
)
:
0;

}

function level(){

return Math.floor(
state.xp/100
)+1;

}

/* =========================
   STREAK LEVEL SYSTEM
========================= */

function getStreakTier(days){

if(days>=365){

return{
key:'year',
label:
state.lang==='ru'
?
'Год'
:
'One year',
flame:'🔥',
level:6
};

}

if(days>=120){

return{
key:'120',
label:'120',
flame:'🔥',
level:5
};

}

if(days>=90){

return{
key:'90',
label:'90',
flame:'🔥',
level:4
};

}

if(days>=60){

return{
key:'60',
label:'60',
flame:'🔥',
level:3
};

}

if(days>=30){

return{
key:'30',
label:'30',
flame:'🔥',
level:2
};

}

if(days>=7){

return{
key:'7',
label:'7',
flame:'🔥',
level:1
};

}

return{
key:'base',
label:'',
flame:'🔥',
level:0
};

}

function updateStreakVisual(days){

const hero=
$('.streak-hero');

const flame=
$('.flame-orbit');

if(!hero)
return;

const tier=
getStreakTier(days);

hero.dataset.streakTier=
tier.key;

hero.classList.remove(
'milestone-enter'
);

if(flame){

flame.textContent=
tier.flame;

flame.dataset.level=
String(tier.level);

flame.setAttribute(
'aria-label',
tier.label||'Streak'
);

}

if(days>0){

const seenKey=
'habit_seen_streak_tier_'+
tier.key;

try{

if(
!sessionStorage.getItem(
seenKey
)
){

requestAnimationFrame(
()=>
hero.classList.add(
'milestone-enter'
)
);

sessionStorage.setItem(
seenKey,
'1'
);

}

}catch(e){

requestAnimationFrame(
()=>
hero.classList.add(
'milestone-enter'
)
);

}

}

}

function render(){

applyTheme();

applyLang();

const o=
overall();

updateStreakVisual(
o.cur
);

const lvl=
level();

const prog=
state.xp%100;

const ids={

bigStreak:o.cur,

bestStreak:o.best,

totalDone:o.total,

completionRate:
rate(30)+'%',

statStreak:o.cur,

statBest:o.best,

statDone:o.total,

statXp:state.xp,

statRate:
rate(
statsRange===365
?365
:statsRange
)+'%',

topLevel:lvl,

sideLevel:lvl,

sideXpText:
`${prog} / 100 XP`

};

Object.entries(ids).forEach(
([id,v])=>{

const e=
$('#'+id);

if(e)
e.textContent=v;

}
);

if($('#sideXp')){

$('#sideXp').style.width=
prog+'%';

}

const name=
state.name.trim();

if($('#nameInput') && document.activeElement !== $('#nameInput')) $('#nameInput').value = state.name || '';

if($('#avatarButton')){

$('#avatarButton').textContent=
name
?
name[0].toUpperCase()
:
'';

}

if($('#welcomeText')){

$('#welcomeText').textContent=
name
?
(
state.lang==='ru'
?
`С возвращением, ${name}.`
:
`Welcome back, ${name}.`
)
:
(
state.lang==='ru'
?
'Добро пожаловать в Habit.'
:
'Welcome to Habit.'
);

}

if($('#streakTitle')){

$('#streakTitle').textContent=
o.cur
?
(
state.lang==='ru'
?
'Не сбивай этот ритм.'
:
'Keep this rhythm alive.'
)
:
(
state.lang==='ru'
?
'Сегодня — ещё один шаг.'
:
'Today is another step.'
);

}

if($('#streakHint')){

$('#streakHint').textContent=
o.cur
?
(
state.lang==='ru'
?
`Общая серия горит ${o.cur} ${plural(o.cur)}. Выполни все задания сегодня.`
:
`The fire has burned for ${o.cur} days. Complete a focus today.`
)
:
(
state.lang==='ru'
?
'Отметь все запланированные задания сегодня, чтобы зажечь общую серию.'
:
'Complete all scheduled focuses today to start the chain.'
);

}

updateDayPicker();

if($('#recoveryCount')) $('#recoveryCount').textContent=state.recovery;
if(document.querySelector('[data-recovery-label]')) document.querySelector('[data-recovery-label]').textContent=state.lang==='ru'?'восст.':'restores';

renderHabits();

renderAllHabits();

renderActivity();

renderStats();

renderAchievements();

renderPlans();

}

function plural(n){

if(state.lang!=='ru')
return n===1
?
'день'
:
'дней';

const a=
Math.abs(n)%100;

const b=
a%10;

return a>10&&a<20
?
'дней'
:
b===1
?
'день'
:
b>=2&&b<=4
?
'дня'
:
'дней';

}

function selectDate(value){

const today=key(new Date());
if(!/^\d{4}-\d{2}-\d{2}$/.test(value) || value>today)
return;

selectedDate=value;
currentFilter='all';
$$('[data-filter]').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));
updateDayPicker();
renderHabits();

}

function updateDayPicker(){

const label=$('#selectedDayLabel');
if(!label) return;

const d=new Date(selectedDate+'T12:00:00');
const today=key(new Date());
const yesterday=new Date();
yesterday.setDate(yesterday.getDate()-1);
const yesterdayKey=key(yesterday);

let text=d.toLocaleDateString(state.lang==='ru'?'ru-RU':'en-US',{day:'numeric',month:'short'});
if(selectedDate===today) text=state.lang==='ru'?'Сегодня': 'Today';
else if(selectedDate===yesterdayKey) text=state.lang==='ru'?'Вчера':'Yesterday';

label.textContent=text;

if($('#dayInput')) $('#dayInput').value=selectedDate;
if($('#dayNext')) $('#dayNext').disabled=selectedDate>=today;
if($('#dayEyebrow')) $('#dayEyebrow').textContent=(selectedDate===today ? (state.lang==='ru'?'СЕГОДНЯ':'TODAY') : text.toUpperCase());

}

function renderHabits(){

const list=
$('#habitList');

if(!list)
return;

const today=selectedDate;

const hs=
state.habits.filter(h=>{
  const active=habitActiveOn(h,today);
  if(!active) return false;
  if(currentFilter==='all') return true;
  return currentFilter==='done' ? !!h.done?.[today] : !h.done?.[today];
});

if(!hs.length){

list.innerHTML=`

<div class="empty-focus">

<div class="empty-icon">
✨
</div>

<h3>

${
state.habits.length
?
(
state.lang==='ru'
?
'Здесь пока пусто'
:
'Nothing here'
)
:
''
}

</h3>

<p>

${
state.habits.length
?
''
:
(
state.lang==='ru'
?
'Добавь первый фокус и начни свой ритм.'
:
'Add your first focus and start your rhythm.'
)
}

</p>

</div>

`;

return;

}

list.innerHTML=
hs.map(
h=>{

const active=habitActiveOn(h,today);
const done=
active && !!h.done?.[today];

const s=streakForDate(h, selectedDate);

return `

<article
class="focus-card ${done?'completed':''}"
style="--focus-color:${h.color}"
>

<button
class="focus-icon"
data-action="toggle"
data-id="${h.id}"
type="button"
>
${h.icon}
</button>

<div class="focus-info">

<h3>
${esc(h.name)}
</h3>

<p>

${
done
?
(
state.lang==='ru'
?
'Сегодня выполнено ✓'
:
'Completed today ✓'
)
:
(
state.lang==='ru'
?
'Нажми справа, когда сделаешь'
:
'Tap the circle when done'
)
}

</p>

</div>

<div class="focus-streak">

<b>
🔥 ${s}
</b>

<span>
${t('days')}
</span>

</div>

<button
class="check"
data-action="toggle"
data-id="${h.id}"
type="button"
>
${done?'✓':'○'}
</button>

<button
class="more"
data-action="edit"
data-id="${h.id}"
type="button"
>
•••
</button>

</article>

`;

}
).join('');

}

function renderAllHabits(){
  const list=$('#allHabitsList');
  if(!list) return;
  if(!state.habits.length){
    list.innerHTML=`<div class="empty-focus"><div class="empty-icon">✨</div><h3>${state.lang==='ru'?'Пока нет фокусов':'No focuses yet'}</h3><p>${state.lang==='ru'?'Добавь первый фокус, чтобы он появился здесь.':'Add your first focus and it will appear here.'}</p></div>`;
    return;
  }
  const dayNames=state.lang==='ru'
    ? ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  list.innerHTML=state.habits.map(h=>{
    const days=scheduledDays(h);
    const schedule=days.length===7
      ? (state.lang==='ru'?'Каждый день':'Every day')
      : days.map(d=>dayNames[d]).join(' · ');
    return `<article class="manage-habit-card" data-habit-card data-id="${Number(h.id)}" draggable="false" style="--focus-color:${esc(h.color)}" aria-label="${state.lang==='ru'?'Зажми фокус и перетащи, чтобы изменить порядок':'Long-press and drag the focus to reorder'}">
      <span class="manage-habit-icon" aria-hidden="true">${esc(h.icon)}</span>
      <div class="manage-habit-info"><h3>${esc(h.name)}</h3><p><span class="manage-schedule-dot"></span>${esc(schedule)}</p></div>
      <div class="manage-habit-order" aria-label="${state.lang==='ru'?'Действия с фокусом':'Focus actions'}">
        <button class="manage-habit-more" type="button" data-manage-action="edit" data-id="${Number(h.id)}" aria-label="${state.lang==='ru'?'Изменить':'Edit'}: ${esc(h.name)}" title="${state.lang==='ru'?'Изменить фокус':'Edit focus'}">⋯</button>
      </div>
    </article>`
  }).join('');
}

function daysSinceStart(){

const start=
new Date(
(state.joinedAt||key(new Date()))+
'T12:00:00'
);

const now=
new Date();

now.setHours(
12,
0,
0,
0
);

return Math.max(
1,
Math.floor(
(now-start)/86400000
)+1
);

}

function journeyMeta(){

const day=
daysSinceStart();

return{

day,

month:
Math.floor(
(day-1)/30
)+1,

week:
Math.floor(
(day-1)/7
)+1

};

}

function activityCount(d){

const k=
key(d);

if(
activityMode==='all'
){

return state.habits.reduce(
(n,h)=>
n+(h.done?.[k]?1:0),
0
);

}

const h=
state.habits.find(
x=>
String(x.id)===
String(activityMode)
);

return h?.done?.[k]
?
1
:
0;

}

function renderActivityControls(){

const box=
$('#activityModes');

if(!box)
return;

const buttons=[

[
'all',
state.lang==='ru'
?
'Все задания'
:
'All tasks'
],

...state.habits.map(
h=>
[
String(h.id),
`${h.icon} ${h.name}`
]
)

];

box.innerHTML=
buttons.map(
([id,label])=>
`
<button
type="button"
class="activity-mode ${
String(activityMode)===id
?
'active'
:
''
}"
data-activity-mode="${esc(id)}"
>
${esc(label)}
</button>
`
).join('');

}

function renderActivity(){

const grid=
$('#activityGrid');

const months=
$('#monthLabels');

const labels=
$('#weekdayLabels');

if(!grid)
return;

const names=
state.lang==='ru'
?
[
'Пн',
'Вт',
'Ср',
'Чт',
'Пт',
'Сб',
'Вс'
]
:
[
'Mon',
'Tue',
'Wed',
'Thu',
'Fri',
'Sat',
'Sun'
];

if(labels){

labels.innerHTML=
names.map(
x=>
`<span>${x}</span>`
).join('');

}

renderActivityControls();

const end=
new Date();

end.setHours(
12,
0,
0,
0
);

const joined=
new Date(
(state.joinedAt||key(end))+
'T12:00:00'
);

const safeJoined=
joined>end
?
new Date(end)
:
joined;

const start=
new Date(
safeJoined.getFullYear(),
safeJoined.getMonth(),
1,
12,
0,
0,
0
);

const firstDay=
(start.getDay()+6)%7;

const cells=[];

for(
let i=0;
i<firstDay;
i++
){

cells.push(null);

}

const minimumEnd=
new Date(start);

minimumEnd.setDate(
minimumEnd.getDate()+20
);

const displayEnd=
end<minimumEnd
?
minimumEnd
:
end;

for(
let d=new Date(start);
d<=displayEnd;
d.setDate(
d.getDate()+1
)
){

cells.push(
new Date(d)
);

}

while(
cells.length%7
){

cells.push(null);

}

grid.innerHTML=
cells.map(
d=>{

if(!d){

return `
<i
class="activity-cell blank"
aria-hidden="true"
></i>
`;

}

const n=
activityCount(d);

const max=
activityMode==='all'
?
Math.max(
1,
state.habits.length
)
:
1;

const ratio=
n/max;

const level=
n===0
?
0
:
ratio<.34
?
1
:
ratio<.67
?
2
:
ratio<1
?
3
:
4;

return `
<i
class="activity-cell l${level}"
title="${key(d)} • ${n}"
aria-label="${key(d)} • ${n}"
></i>
`;

}
).join('');

if(months){

months.innerHTML='';

let last='';

cells.forEach(
(d,i)=>{

if(!d)
return;

const label=
new Intl.DateTimeFormat(
state.lang==='ru'
?
'ru-RU'
:
'en-US',
{
month:'long'
}
).format(d);

const token=
`${d.getFullYear()}-${d.getMonth()}`;

if(token!==last){

const x=
document.createElement(
'span'
);

x.className=
'month-label';

x.style.setProperty(
'--month-col',
String(
Math.floor(i/7)
)
);

x.textContent=
label;

months.appendChild(x);

last=token;

}

}
);

}

if($('#activityPercent')){

const startDays=
Math.max(
1,
daysSinceStart()
);

let done=0;

const total=
startDays*
state.habits.length;

for(
let i=0;
i<startDays;
i++
){

const d=
new Date(joined);

d.setDate(
d.getDate()+i
);

state.habits.forEach(
h=>{

if(
h.done?.[key(d)]
){

done++;

}

}
);

}

$('#activityPercent').textContent=
(
total
?
Math.round(
done/total*100
)
:
0
)+'%';

}

}

function renderStats(){
  const data=Array.from({length:statsRange===365?52:statsRange},(_,i)=>rateForDay(dateShift(-(statsRange===365?(51-i)*7:(statsRange-1-i)))));
  const chart=$('#barChart');
  if(chart) chart.innerHTML=data.map(v=>`<i class="bar" style="height:${Math.max(4,v)}%" title="${v}%"></i>`).join('');
  const avg=Math.round(data.reduce((a,b)=>a+b,0)/(data.length||1));
  if($('#chartValue')) $('#chartValue').textContent=avg+'%';
  $$('.stats-tab[data-range]').forEach(b=>b.classList.toggle('active',+b.dataset.range===statsRange));
  if($('#stableHabitsList')){
    const stable=state.habits.map(h=>{let done=0,scheduled=0;for(let i=0;i<statsRange;i++){const d=dateShift(-i),k=key(d);if(habitActiveOn(h,k)){scheduled++;if(h.done?.[k])done++;}}return {h,rate:scheduled?Math.round(done/scheduled*100):0,done};}).sort((a,b)=>b.rate-a.rate||b.done-a.done).slice(0,5);
    $('#stableHabitsList').innerHTML=stable.length?stable.map(x=>`<div class="stable-habit"><span class="stable-icon" style="--focus-color:${esc(x.h.color||'#9275ff')}">${esc(x.h.icon||'✦')}</span><div class="stable-info"><strong>${esc(x.h.name)}</strong><div class="stable-track"><i style="width:${x.rate}%;--focus-color:${esc(x.h.color||'#9275ff')}"></i></div></div><b>${x.rate}%</b></div>`).join(''):`<p class="stable-empty">${state.lang==='ru'?'Добавь фокус, чтобы увидеть статистику.':'Add a focus to see your statistics.'}</p>`;
  }
  updateSegmentSliders();
}

function rateForDay(d){

if(!state.habits.length)
return 0;

return Math.round(
state.habits.filter(
h=>
h.done?.[key(d)]
).length
/
state.habits.length
*100
);

}

function renderWeeks(){}

function renderAchievements(
returnPercent=false
){

const o=
overall();

const lvl=
level();

const a=[

[
'✦',

state.lang==='ru'
?
'Первый шаг'
:
'First step',

state.lang==='ru'
?
'Первая отметка — начало системы.'
:
'Your first completion starts the system.',

o.total>=1
],

[
'🔟',
state.lang==='ru'?'Первые десять':'First Ten',
state.lang==='ru'?'Выполни фокусы 10 раз.':'Complete focuses 10 times.',
o.total>=10
],

[
'🎯',
state.lang==='ru'?'Точная цель':'On Target',
state.lang==='ru'?'Выполни фокусы 50 раз.':'Complete focuses 50 times.',
o.total>=50
],

[
'🧩',
state.lang==='ru'?'Своя система':'Your Own System',
state.lang==='ru'?'Создай 5 разных фокусов.':'Create 5 different focuses.',
state.habits.length>=5
],

[
'🔥',

state.lang==='ru'
?
'Пульс недели'
:
'Weekly Pulse',

state.lang==='ru'
?
'7 дней подряд.'
:
'7 days in a row.',

o.best>=7
],

[
'💎',

state.lang==='ru'
?
'Тридцать дней'
:
'Thirty Days',

state.lang==='ru'
?
'30 дней дисциплины.'
:
'30 days of discipline.',

o.best>=30
],

[
'💯',

state.lang==='ru'
?
'Сто фокусов'
:
'One Hundred Focuses',

state.lang==='ru'
?
'Выполни фокусы 100 раз.'
:
'Complete focuses 100 times.',

o.total>=100
],

[
'🚀',
state.lang==='ru'?'Большой разгон':'Momentum Builder',
state.lang==='ru'?'Выполни фокусы 500 раз.':'Complete focuses 500 times.',
o.total>=500
],

[
'🏆',

state.lang==='ru'
?
'Десятый уровень'
:
'Level Ten',

state.lang==='ru'
?
'Достигни 10 уровня.'
:
'Reach level 10.',

lvl>=10
],

[
'🎵',

state.lang==='ru'
?
'Стабильный ритм'
:
'Steady Rhythm',

state.lang==='ru'
?
'60 дней устойчивого ритма.'
:
'60 days of steady rhythm.',

o.best>=60
]

];
const allRegularUnlocked=a.every(x=>x[3]);
a.push(['👑',state.lang==='ru'?'Коллекционер':'Collector',state.lang==='ru'?'Открой все остальные достижения.':'Unlock every other achievement.',allRegularUnlocked]);

// Keep earned achievements in the order they were earned; locked ones stay in difficulty order.
const achievementKeys=['first-step','first-ten','on-target','five-focuses','weekly-pulse','thirty-days','hundred-focuses','momentum-builder','level-ten','steady-rhythm','collector'];
const difficultyRank={'first-step':0,'five-focuses':1,'first-ten':2,'on-target':3,'weekly-pulse':4,'hundred-focuses':5,'thirty-days':6,'momentum-builder':7,'level-ten':8,'steady-rhythm':9,'collector':10};
if(!state.achievementUnlocks || typeof state.achievementUnlocks!=='object') state.achievementUnlocks={};
let unlocksChanged=false;
a.forEach((item,index)=>{
  const id=achievementKeys[index];
  if(item[3] && !Number.isFinite(state.achievementUnlocks[id])){
    state.achievementUnlocks[id]=Date.now()+index;
    unlocksChanged=true;
  }
});
if(unlocksChanged) save();
const rankedAchievements=a.map((item,index)=>({item,id:achievementKeys[index]}));
rankedAchievements.sort((left,right)=>{
  const leftEarned=Number.isFinite(state.achievementUnlocks[left.id]);
  const rightEarned=Number.isFinite(state.achievementUnlocks[right.id]);
  if(leftEarned && rightEarned) return state.achievementUnlocks[left.id]-state.achievementUnlocks[right.id];
  if(leftEarned!==rightEarned) return leftEarned ? -1 : 1;
  return (difficultyRank[left.id]??99)-(difficultyRank[right.id]??99);
});
a.splice(0,a.length,...rankedAchievements.map(entry=>entry.item));

if($('#achievementGrid')){

$('#achievementGrid').innerHTML=
a.map(
x=>
`

<article
class="achievement ${x[3]?'':'locked'}"
>

<div class="achievement-icon">
${x[0]}
</div>

<h3>
${x[1]}
</h3>

<p>
${x[2]}
</p>

</article>

`
).join('');

}

if(returnPercent){

const unlocked=
a.filter(
x=>x[3]
).length;

return Math.round(
unlocked/a.length*100
);

}

}

function openEditor(id=null){

editingId=id;

const h=
id
?
state.habits.find(
x=>x.id===id
)
:
null;

selectedIcon=
h?.icon||
icons[0];

selectedColor=
h?.color||
colors[0];

selectedDays=scheduledDays(h||{days:[0,1,2,3,4,5,6]});

if($('#habitName')){

$('#habitName').value=
h?.name||'';

}

if($('#modalTitle')){

$('#modalTitle').textContent=
id
?
(
state.lang==='ru'
?
'Изменить фокус'
:
'Edit focus'
)
:
(
state.lang==='ru'
?
'Добавить фокус'
:
'Add focus'
);

}

if($('#deleteHabit')){

$('#deleteHabit').classList.toggle(
'show',
!!id
);

}

if($('#habitModal')){

$('#habitModal').classList.add('open');
document.body.classList.add('habit-modal-open');
$('#habitModal').setAttribute('aria-hidden','false');

}

renderPicker();

setTimeout(
()=>
$('#habitName')?.focus(),
80
);

}

function renderPicker(){

if($('#iconPicker')){

$('#iconPicker').innerHTML=
icons.map(
i=>
`

<button
type="button"
class="icon-choice ${
i===selectedIcon
?
'selected'
:
''
}"
data-icon="${i}"
>
${i}
</button>

`
).join('');

}

if($('#colorPicker')){

$('#colorPicker').innerHTML=
colors.map(
c=>
`

<button
type="button"
class="color-choice ${
c===selectedColor
?
'selected'
:
''
}"
data-color="${c}"
style="--option-color:${c}"
></button>

`
).join('');

}

if($('#dayPickerModal')){
  const names=state.lang==='ru'?['Пн','Вт','Ср','Чт','Пт','Сб','Вс']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  $('#dayPickerModal').innerHTML=names.map((name,i)=>`<button type="button" class="schedule-day ${selectedDays.includes(i+1===7?0:i+1)?'selected':''}" data-schedule-day="${i+1===7?0:i+1}">${name}</button>`).join('');
}

}

function closeModal(){

if($('#habitModal')){

$('#habitModal').classList.remove('open');
document.body.classList.remove('habit-modal-open');
$('#habitModal').setAttribute('aria-hidden','true');

}

editingId=null;

}

function saveHabit(){

const input=
$('#habitName');

if(!input)
return;

const name=
input.value.trim();

const finalName=name || (state.lang==='ru' ? 'Новый фокус' : 'New focus');

if(editingId){

const h=
state.habits.find(
x=>x.id===editingId
);

if(h){

h.name=finalName;
h.icon=selectedIcon;
h.color=selectedColor;
h.days=[...selectedDays].sort((a,b)=>a-b);

}

}else{

state.habits.push({

id:Date.now(),

name:finalName,

icon:selectedIcon,

color:selectedColor,
days:[...selectedDays].sort((a,b)=>a-b),

done:{}

});

}

save();

closeModal();

render();

toast(
t('save')
);

}

function deleteHabit(){

if(!editingId)
return;

const id=
editingId;

const habit=
state.habits.find(
h=>h.id===id
);

if(!habit)
return;

showConfirm(

state.lang==='ru'
?
'Удалить фокус?'
:
'Delete focus?',

state.lang==='ru'
?
`«${habit.name}» будет удалён без возможности восстановления.`
:
`“${habit.name}” will be deleted and cannot be restored.`,

()=>{

state.habits=
state.habits.filter(
h=>h.id!==id
);

if(
activityMode===String(id)
){

activityMode='all';

}

save();

closeModal();

render();

toast(
state.lang==='ru'
?
'Фокус удалён'
:
'Focus deleted'
);

}

);

}

function toggleHabit(id){

const h=
state.habits.find(
x=>x.id===id
);

if(!h)
return;

const k=
selectedDate;

if(!habitActiveOn(h,k)){
  toast(state.lang==='ru'?'В этот день фокус не запланирован':'This focus is not scheduled for this day');
  return;
}

if(h.done?.[k]){

delete h.done[k];

state.xp=
Math.max(
0,
state.xp-10
);

toast(
state.lang==='ru'
?
'Отметка снята'
:
'Completion undone'
);

}else{

h.done[k]=true;

state.xp+=10;

burst();

toast(
'+10 XP • '+
(
state.lang==='ru'
?
'серия продолжается'
:
'streak continues'
)
);

}

save();

render();

}

function showPage(page){

if(page==='settings' && $('#nameInput')) $('#nameInput').value=state.name || '';

$$('.page').forEach(
p=>
p.classList.toggle(
'active',
p.id===page
)
);

$$('.nav-link').forEach(
b=>
b.classList.toggle(
'active',
b.dataset.page===page
)
);

$$('.mobile-nav button').forEach(
b=>
b.classList.toggle(
'active',
b.dataset.mobilePage===page
)
);

updateSegmentSliders();

if($('#pageTitle')){

$('#pageTitle').textContent=
t(page);

}

const pageEyebrows={
  home:'YOUR RHYTHM',
  habits:'YOUR COLLECTION',
  stats:'YOUR PROGRESS',
  achievements:'YOUR MILESTONES',
  plans:'YOUR PLANS',
  settings:'YOUR SPACE'
};
if($('#pageEyebrow')) $('#pageEyebrow').textContent=pageEyebrows[page] || 'YOUR SPACE';

$('#sidebar')?.classList.remove(
'open'
);

window.scrollTo({
top:0,
behavior:'smooth'
});

}

function toast(msg){

const x=
$('#toast');

if(!x)
return;

x.textContent=
msg;

x.classList.add(
'show'
);

clearTimeout(
window.__toast
);

window.__toast=
setTimeout(
()=>
x.classList.remove(
'show'
),
1900
);

}

function burst(){

const layer=
$('#confetti');

if(!layer)
return;

for(
let i=0;
i<18;
i++
){

const p=
document.createElement(
'i'
);

p.className=
'confetti';

p.style.left='50%';

p.style.top='42%';

p.style.background=
colors[
i%colors.length
];

p.style.width=
`${5+Math.random()*3}px`;

p.style.height=
`${7+Math.random()*5}px`;

p.style.setProperty(
'--x',
`${Math.random()*280-140}px`
);

p.style.setProperty(
'--y',
`${Math.random()*230-60}px`
);

p.style.setProperty(
'--r',
`${Math.random()*700-350}deg`
);

p.style.animationDuration=
`${.72+Math.random()*.25}s`;

layer.appendChild(p);

setTimeout(
()=>
p.remove(),
1100
);

}

}

function showInfo(){

const p=
$('#infoPop');

if(!p)
return;

p.classList.add(
'show'
);

clearTimeout(
window.__info
);

window.__info=
setTimeout(
()=>
p.classList.remove(
'show'
),
4500
);

}

function ensureConfirmUI(){

if($('#confirmDialog'))
return;

const style=
document.createElement(
'style'
);

style.id=
'confirm-dialog-style';

style.textContent=`

.confirm-dialog{
position:fixed;
inset:0;
z-index:20000;
display:none;
place-items:center;
padding:20px;
background:rgba(3,4,7,.62);
backdrop-filter:blur(9px);
}

.confirm-dialog.open{
display:grid;
}

.confirm-card{
width:min(430px,100%);
padding:24px;
border:1px solid var(--line);
border-radius:23px;
background:var(--surface);
box-shadow:0 30px 90px rgba(0,0,0,.3);
}

.confirm-card h3{
margin:0 0 8px;
font-size:20px;
}

.confirm-card p{
margin:0;
color:var(--muted);
font-size:13px;
line-height:1.55;
}

.confirm-actions{
display:flex;
justify-content:flex-end;
gap:9px;
margin-top:21px;
}

.confirm-actions button{
min-height:40px;
padding:0 16px;
border-radius:11px;
border:1px solid var(--line);
font-weight:850;
cursor:pointer;
}

.confirm-cancel{
background:var(--surface2);
color:var(--text);
}

.confirm-ok{
background:var(--accent);
border-color:var(--accent)!important;
color:#fff;
}

.confirm-ok.danger{
background:#ef5b6b;
border-color:#ef5b6b!important;
}

.streak-core strong{
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:92px;
line-height:1;
font-variant-numeric:tabular-nums;
letter-spacing:-3px;
padding:0 4px;
box-sizing:border-box;
}

.streak-core small{
line-height:1.2;
white-space:nowrap;
}

.activity-card{
overflow:hidden;
}

.heatmap-wrap{
grid-template-columns:34px minmax(0,1fr);
gap:10px;
}

.weekday-labels{
height:auto;
min-height:126px;
grid-template-rows:repeat(7,15px);
gap:4px;
align-content:start;
padding-top:19px;
box-sizing:border-box;
}

.weekday-labels span{
text-align:left;
line-height:15px;
font-size:9px;
}

.heatmap-scroll{
overflow-x:auto;
overflow-y:hidden;
padding:0 0 9px;
}

.month-labels{
height:24px;
min-width:max-content;
position:relative;
}

.month-label{
position:absolute;
font-weight:800;
text-transform:capitalize;
white-space:nowrap;
}

.activity-grid{
grid-template-rows:repeat(7,15px);
grid-auto-columns:15px;
gap:4px;
min-width:max-content;
align-items:start;
}

.activity-cell{
width:15px;
height:15px;
border-radius:3px;
background:#767982;
box-shadow:none;
border:0;
opacity:.72;
}

.activity-cell.l0{
background:#767982;
opacity:.72;
}

.activity-cell.l1{
background:#c0aaff;
opacity:1;
}

.activity-cell.l2{
background:#a88dff;
opacity:1;
}

.activity-cell.l3{
background:#9678ff;
opacity:1;
}

.activity-cell.l4{
background:#795cff;
opacity:1;
box-shadow:0 0 7px rgba(121,92,255,.22);
}

.activity-cell.blank{
visibility:hidden;
background:transparent;
}

@media(min-width:761px){
  /* Desktop activity heatmap: weekday labels align with the first square row. */
  .heatmap-wrap{align-items:start !important;}
  .weekday-labels{
    padding-top:24px !important;
    margin-top:0 !important;
    grid-template-rows:repeat(7,15px) !important;
    row-gap:4px !important;
    align-content:start !important;
    box-sizing:border-box !important;
  }
  .weekday-labels span{
    height:15px !important;
    line-height:15px !important;
    margin:0 !important;
    padding:0 !important;
    transform:none !important;
  }
  .heatmap-scroll{padding-top:0 !important; margin-top:0 !important;}
  .month-labels{height:24px !important; margin:0 !important; padding:0 !important;}
  .activity-grid{
    grid-template-rows:repeat(7,15px) !important;
    grid-auto-rows:15px !important;
    grid-auto-columns:15px !important;
    gap:4px !important;
    margin:0 !important;
    padding:0 !important;
    align-content:start !important;
  }
  .activity-cell{width:15px !important;height:15px !important;margin:0 !important;}
}

@media(max-width:760px){

.weekday-labels{
grid-template-rows:repeat(7,13px);
gap:3px;
padding-top:19px;
}

.weekday-labels span{
line-height:13px;
}

.activity-grid{
grid-template-rows:repeat(7,13px);
grid-auto-columns:13px;
gap:3px;
}

.activity-cell{
width:13px;
height:13px;
}

.heatmap-wrap{
grid-template-columns:34px minmax(0,1fr);
}

}

`;

document.head.appendChild(
style
);

document.body.insertAdjacentHTML(
'beforeend',

`

<div
class="confirm-dialog"
id="confirmDialog"
aria-hidden="true"
>

<div
class="confirm-card"
role="dialog"
aria-modal="true"
aria-labelledby="confirmTitle"
>

<h3 id="confirmTitle"></h3>

<p id="confirmText"></p>

<div class="confirm-actions">

<button
type="button"
class="confirm-cancel"
id="confirmCancel"
>
${state.lang==='ru'?'Отмена':'Cancel'}
</button>

<button
type="button"
class="confirm-ok danger"
id="confirmOk"
>
${state.lang==='ru'?'Удалить':'Delete'}
</button>

</div>

</div>

</div>

`
);

$('#confirmCancel').addEventListener(
'click',
closeConfirm
);

$('#confirmOk').addEventListener(
'click',
acceptConfirm
);

$('#confirmDialog').addEventListener(
'click',
e=>{

if(
e.target===
$('#confirmDialog')
){

closeConfirm();

}

}
);

}

let confirmCallback=null;

function showConfirm(
title,
text,
callback
){

ensureConfirmUI();

confirmCallback=
callback;

$('#confirmTitle').textContent=
title;

$('#confirmText').textContent=
text;

$('#confirmOk').textContent=
state.lang==='ru'
?
'Подтвердить'
:
'Confirm';

$('#confirmCancel').textContent=
state.lang==='ru'
?
'Отмена'
:
'Cancel';

$('#confirmDialog').classList.add(
'open'
);

$('#confirmDialog').setAttribute(
'aria-hidden',
'false'
);

setTimeout(
()=>
$('#confirmOk')?.focus(),
40
);

}

function closeConfirm(){

const d=
$('#confirmDialog');

if(!d)
return;

confirmCallback=null;

d.classList.remove(
'open'
);

d.setAttribute(
'aria-hidden',
'true'
);

}

function acceptConfirm(){

const cb=
confirmCallback;

closeConfirm();

if(
typeof cb==='function'
){

cb();

}

}

function resetProgress(){

showConfirm(

state.lang==='ru'
?
'Сбросить прогресс?'
:
'Reset progress?',

state.lang==='ru'
?
'Все отметки, XP и добавленные фокусы будут сброшены. Вернутся стартовые фокусы.'
:
'All marks, XP and added focuses will be reset. Starter focuses will be restored.',

()=>{

state=
structuredClone(
defaultState
);

state.joinedAt=
key(new Date());

activityMode='all';

currentFilter='all';

selectedDate=key(new Date());

selectedIcon='📚';

selectedColor='#9a7cff';

save();

render();

toast(
state.lang==='ru'
?
'Прогресс сброшен'
:
'Progress reset'
);

}

);

}

function bind(){

const on=(
selector,
event,
handler,
parent=document
)=>{

const root=
parent.querySelector(
selector
);

if(root){

root.addEventListener(
event,
handler
);

}

};

on(
'#themeToggle',
'click',
()=>{

state.theme=
state.theme==='dark'
?
'light'
:
'dark';

save();

applyTheme();

}
);

on(
'#avatarButton',
'click',
()=>{

showPage(
'settings'
);

setTimeout(
()=>
$('#nameInput')?.focus(),
80
);

}
);

on(
'#addHabitBtn',
'click',
()=>openEditor()
);

on(
'#addHabitFromHabitsBtn',
'click',
()=>openEditor()
);

on(
'#saveHabit',
'click',
saveHabit
);

on(
'#deleteHabit',
'click',
deleteHabit
);

on(
'#closeModal',
'click',
closeModal
);

on(
'#infoClose',
'click',
()=>
$('#infoPop')?.classList.remove(
'show'
)
);

on('#exportData','click',()=>{try{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`habit-backup-${key(new Date())}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(state.lang==='ru'?'Резервная копия сохранена':'Backup exported');}catch(e){toast(state.lang==='ru'?'Не удалось экспортировать данные':'Could not export data');}});
on('#importData','change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const parsed=JSON.parse(await file.text());const candidate=parsed?.habits&&Array.isArray(parsed.habits)?parsed:parsed?.state?.habits&&Array.isArray(parsed.state.habits)?parsed.state:null;if(!candidate)throw new Error('invalid backup');const ok=confirm(state.lang==='ru'?'Импорт заменит текущие данные. Продолжить?':'Import will replace current data. Continue?');if(!ok){e.target.value='';return;}state={...structuredClone(defaultState),...candidate,habits:candidate.habits,tasks:normalizeTasks(candidate.tasks),goals:normalizeGoals(candidate.goals)};save();render();toast(state.lang==='ru'?'Данные импортированы':'Data imported');}catch(err){toast(state.lang==='ru'?'Файл резервной копии не распознан':'Backup file is not valid');}finally{e.target.value='';}});

on(
'#resetBtn',
'click',
resetProgress
);

on('#menuBtn','click',()=>{
  const nav=$('#mobileNav'), btn=$('#menuBtn');
  if(nav){const opened=nav.classList.toggle('is-open');document.body.classList.toggle('mobile-menu-open',opened);btn.classList.toggle('is-open',opened);btn.setAttribute('aria-expanded',String(opened));btn.setAttribute('aria-label',opened?(state.lang==='ru'?'Закрыть меню':'Close menu'):(state.lang==='ru'?'Открыть меню':'Open menu'));}
});
on('#mobileBrand','click',()=>showPage('home'));


$$('.nav-link').forEach(
b=>
b.addEventListener(
'click',
()=>
showPage(
b.dataset.page
)
)
);

$$('[data-theme]').forEach(
b=>
b.addEventListener(
'click',
()=>{

state.theme=
b.dataset.theme;

save();

applyTheme();

}
)
);

$$('[data-lang]').forEach(
b=>
b.addEventListener(
'click',
()=>{

state.lang=
b.dataset.lang;

save();

render();

}
)
);

$$('[data-range]').forEach(
b=>
b.addEventListener(
'click',
()=>{

statsRange=
Number(
b.dataset.range
);

renderStats();

if($('#statRate')){

$('#statRate').textContent=
rate(
statsRange===365
?
365
:
statsRange
)+'%';

}

}
)
);

$$('[data-filter]').forEach(
b=>
b.addEventListener(
'click',
()=>{

currentFilter=
b.dataset.filter;

$$('[data-filter]').forEach(
x=>
x.classList.toggle(
'active',
x===b
)
);

renderHabits();

}
)
);

const list=
$('#habitList');

if(list){

list.addEventListener(
'click',
e=>{

const button=
e.target.closest(
'[data-action]'
);

if(
!button||
!list.contains(button)
)
return;

const id=
Number(
button.dataset.id
);

if(
button.dataset.action===
'toggle'
){

toggleHabit(id);

}

if(
button.dataset.action===
'edit'
){

openEditor(id);

}

}
);

}

const allHabitsList=$('#allHabitsList');
if(allHabitsList){
  allHabitsList.addEventListener('click',e=>{
    const button=e.target.closest('[data-manage-action]');
    if(!button || !allHabitsList.contains(button)) return;
    if(button.dataset.manageAction==='edit') openEditor(Number(button.dataset.id));
  });

  let dragCard=null, pendingCard=null, dragGhost=null, dragPointerId=null, touchId=null, dragMode='', finishingDrag=false;
  let startX=0,startY=0,lastX=0,lastY=0,holdTimer=0,dragStarted=false,touchScrolling=false,autoScrollFrame=0;
  const cards=()=>[...allHabitsList.querySelectorAll('[data-habit-card]')];
  const cardAtPoint=(x,y)=>{
    const el=document.elementFromPoint(x,y);
    const card=el?.closest('[data-habit-card]');
    return card && allHabitsList.contains(card) ? card : null;
  };
  const moveGhost=(x,y)=>{
    if(!dragGhost)return;
    dragGhost.style.left=`${x}px`; dragGhost.style.top=`${y}px`;
  };
  const animateReorder=(target,y)=>{
    if(!dragCard||!target||target===dragCard)return;
    const r=target.getBoundingClientRect();
    const after=y>r.top+r.height/2;
    const insertBefore=after?target.nextElementSibling:target;
    if(insertBefore===dragCard || dragCard.nextElementSibling===insertBefore)return;
    const before=new Map(cards().map(c=>[c,c.getBoundingClientRect()]));
    allHabitsList.insertBefore(dragCard,insertBefore);
    cards().forEach(c=>{
      if(c===dragCard)return;
      const a=before.get(c),b=c.getBoundingClientRect();
      if(!a)return;
      const dy=a.top-b.top;
      if(Math.abs(dy)<1)return;
      c.style.transition='none'; c.style.transform=`translateY(${dy}px)`;
      requestAnimationFrame(()=>{
        c.style.transition='transform 260ms cubic-bezier(.22,.8,.25,1), border-color .18s, box-shadow .18s';
        c.style.transform='';
      });
    });
    cards().forEach(c=>c.classList.toggle('drag-over',c===dragCard));
  };
  const autoScroll=()=>{
    if(!dragStarted){autoScrollFrame=0;return;}
    const edge=78,maxSpeed=15;
    if(lastY<edge)window.scrollBy(0,-Math.max(2,Math.round((edge-lastY)/edge*maxSpeed)));
    else if(lastY>window.innerHeight-edge)window.scrollBy(0,Math.max(2,Math.round((lastY-(window.innerHeight-edge))/edge*maxSpeed)));
    const target=cardAtPoint(lastX,lastY); if(target)animateReorder(target,lastY);
    autoScrollFrame=requestAnimationFrame(autoScroll);
  };
  const beginDrag=()=>{
    if(!pendingCard||dragCard||touchScrolling)return;
    dragCard=pendingCard; pendingCard=null; dragStarted=true; finishingDrag=false;
    dragCard.classList.add('is-dragging');
    dragGhost=dragCard.cloneNode(true);
    dragGhost.classList.remove('is-dragging','drag-over');
    dragGhost.classList.add('manage-habit-drag-ghost');
    dragGhost.setAttribute('aria-hidden','true');
    dragGhost.style.width=`${dragCard.getBoundingClientRect().width}px`;
    document.body.appendChild(dragGhost); moveGhost(lastX,lastY);
    requestAnimationFrame(()=>{if(dragGhost)dragGhost.classList.add('is-picked-up');});
    if(dragMode==='mouse' && dragPointerId!==null){try{allHabitsList.setPointerCapture(dragPointerId);}catch{}}
    if(navigator.vibrate){try{navigator.vibrate(12);}catch{}}
    autoScrollFrame=requestAnimationFrame(autoScroll);
  };
  const clearPending=()=>{
    clearTimeout(holdTimer);holdTimer=0;pendingCard=null;dragPointerId=null;touchId=null;touchScrolling=false;dragMode='';
  };
  const finishDrag=()=>{
    clearTimeout(holdTimer);holdTimer=0;
    if(!dragCard){clearPending();return;}
    if(finishingDrag)return;
    finishingDrag=true;
    const moved=dragStarted, finishedCard=dragCard, finishedGhost=dragGhost, finishedPointer=dragPointerId, finishedMode=dragMode;
    if(autoScrollFrame)cancelAnimationFrame(autoScrollFrame);autoScrollFrame=0;
    cards().forEach(c=>{c.classList.remove('is-dragging','drag-over');c.style.transform='';c.style.transition='';});
    const destination=finishedCard.getBoundingClientRect();
    const complete=()=>{
      if(finishedGhost){finishedGhost.remove();if(dragGhost===finishedGhost)dragGhost=null;}
      if(moved){
        const ids=cards().map(c=>Number(c.dataset.id));
        const byId=new Map(state.habits.map(h=>[Number(h.id),h]));
        state.habits=ids.map(id=>byId.get(id)).filter(Boolean);
        save();render();
      }
      if(dragCard===finishedCard){dragCard=null;pendingCard=null;dragPointerId=null;touchId=null;dragStarted=false;touchScrolling=false;dragMode='';finishingDrag=false;}
      try{if(finishedMode==='mouse' && finishedPointer!==null && allHabitsList.hasPointerCapture?.(finishedPointer))allHabitsList.releasePointerCapture(finishedPointer);}catch{}
    };
    if(finishedGhost&&moved){
      const x=destination.left+destination.width/2,y=destination.top+destination.height/2;
      try{
        const animation=finishedGhost.animate([
          {left:`${lastX}px`,top:`${lastY}px`,transform:'translate(-50%,-50%) scale(.90)',opacity:.98},
          {left:`${x}px`,top:`${y}px`,transform:'translate(-50%,-50%) scale(1)',opacity:.15}
        ],{duration:240,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
        animation.onfinish=complete; animation.oncancel=complete;
      }catch{complete();}
    }else complete();
  };
  const ignoredTarget=t=>!!t.closest('button,a,input,select,textarea,[data-manage-action]');

  // Mouse/trackpad drag starts as soon as the pointer moves.
  allHabitsList.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse'||e.button!==0)return;
    const card=e.target.closest('[data-habit-card]');
    if(!card||!allHabitsList.contains(card)||ignoredTarget(e.target)||dragPointerId!==null||touchId!==null)return;
    pendingCard=card;dragPointerId=e.pointerId;dragMode='mouse';
    startX=lastX=e.clientX;startY=lastY=e.clientY;dragStarted=false;touchScrolling=false;
  });
  allHabitsList.addEventListener('pointermove',e=>{
    if(dragMode!=='mouse'||e.pointerId!==dragPointerId)return;
    lastX=e.clientX;lastY=e.clientY;
    if(pendingCard&&!dragStarted&&Math.hypot(e.clientX-startX,e.clientY-startY)>4)beginDrag();
    if(!dragStarted||!dragCard)return;
    moveGhost(e.clientX,e.clientY);
    const target=cardAtPoint(e.clientX,e.clientY);if(target)animateReorder(target,e.clientY);
    e.preventDefault();
  },{passive:false});
  allHabitsList.addEventListener('pointerup',e=>{
    if(dragMode!=='mouse'||e.pointerId!==dragPointerId)return;
    if(dragStarted)finishDrag();else clearPending();
  });
  allHabitsList.addEventListener('pointercancel',e=>{
    if(dragMode!=='mouse'||e.pointerId!==dragPointerId)return;
    if(dragStarted)finishDrag();else clearPending();
  });
  allHabitsList.addEventListener('lostpointercapture',()=>{if(dragMode==='mouse'&&dragStarted)finishDrag();});
  allHabitsList.addEventListener('dragstart',e=>e.preventDefault());

  // Touch: let normal scrolling win if the finger moves before the long-press delay.
  // After the long press activates, prevent touch scrolling and move the whole card.
  allHabitsList.addEventListener('touchstart',e=>{
    if(dragCard||pendingCard||e.touches.length!==1)return;
    const touch=e.changedTouches[0], target=e.target;
    const card=target.closest('[data-habit-card]');
    if(!card||!allHabitsList.contains(card)||ignoredTarget(target))return;
    pendingCard=card;touchId=touch.identifier;dragMode='touch';
    startX=lastX=touch.clientX;startY=lastY=touch.clientY;dragStarted=false;touchScrolling=false;
    holdTimer=setTimeout(()=>{if(dragMode==='touch'&&pendingCard&&!touchScrolling)beginDrag();},380);
  },{passive:true});
  allHabitsList.addEventListener('touchmove',e=>{
    if(dragMode!=='touch'||touchId===null)return;
    const touch=[...e.changedTouches].find(t=>t.identifier===touchId);
    if(!touch)return;
    lastX=touch.clientX;lastY=touch.clientY;
    if(pendingCard&&!dragStarted&&Math.hypot(touch.clientX-startX,touch.clientY-startY)>10){
      clearTimeout(holdTimer);holdTimer=0;touchScrolling=true;pendingCard=null;return;
    }
    if(!dragStarted||!dragCard)return;
    if(e.cancelable)e.preventDefault();
    moveGhost(touch.clientX,touch.clientY);
    const target=cardAtPoint(touch.clientX,touch.clientY);if(target)animateReorder(target,touch.clientY);
  },{passive:false});
  allHabitsList.addEventListener('touchend',e=>{
    if(dragMode!=='touch'||touchId===null)return;
    if(![...e.changedTouches].some(t=>t.identifier===touchId))return;
    if(dragStarted)finishDrag();else clearPending();
  },{passive:true});
  allHabitsList.addEventListener('touchcancel',e=>{
    if(dragMode!=='touch'||touchId===null)return;
    if(![...e.changedTouches].some(t=>t.identifier===touchId))return;
    if(dragStarted)finishDrag();else clearPending();
  },{passive:true});
}
const activity=
$('#activityModes');

if(activity){

activity.addEventListener(
'click',
e=>{

const button=
e.target.closest(
'[data-activity-mode]'
);

if(!button)
return;

activityMode=
button.dataset.activityMode;

renderActivity();

}
);

}

const iconPicker=$('#iconPicker');
if(iconPicker){
  let iconPress=null;
  iconPicker.addEventListener('pointerdown', e=>{
    const b=e.target.closest('[data-icon]');
    if(!b || !iconPicker.contains(b)) { iconPress=null; return; }
    iconPress={button:b,x:e.clientX,y:e.clientY,pointerId:e.pointerId};
  }, {passive:true});
  iconPicker.addEventListener('pointerup', e=>{
    if(!iconPress || iconPress.pointerId!==e.pointerId) return;
    const press=iconPress; iconPress=null;
    if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>9) return;
    const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-icon]');
    if(b!==press.button || !iconPicker.contains(b)) return;
    e.preventDefault(); e.stopPropagation();
    selectedIcon=b.dataset.icon;
    iconPicker.querySelectorAll('[data-icon]').forEach(x=>x.classList.toggle('selected',x===b));
  }, {passive:false});
  iconPicker.addEventListener('click', e=>{
    if(e.target.closest('[data-icon]')) { e.preventDefault(); e.stopPropagation(); }
  });
}

const colorPicker=$('#colorPicker');
if(colorPicker){
  let colorPress=null;
  colorPicker.addEventListener('pointerdown', e=>{
    const b=e.target.closest('[data-color]');
    if(!b || !colorPicker.contains(b)) { colorPress=null; return; }
    colorPress={button:b,x:e.clientX,y:e.clientY,pointerId:e.pointerId};
  }, {passive:true});
  colorPicker.addEventListener('pointerup', e=>{
    if(!colorPress || colorPress.pointerId!==e.pointerId) return;
    const press=colorPress; colorPress=null;
    if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>9) return;
    const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-color]');
    if(b!==press.button || !colorPicker.contains(b)) return;
    e.preventDefault(); e.stopPropagation();
    selectedColor=b.dataset.color;
    colorPicker.querySelectorAll('[data-color]').forEach(x=>x.classList.toggle('selected',x===b));
  }, {passive:false});
  colorPicker.addEventListener('click', e=>{
    if(e.target.closest('[data-color]')) { e.preventDefault(); e.stopPropagation(); }
  });
}

if(!$('#mobileNav')){
const nav=document.createElement('nav');
nav.id='mobileNav';
nav.className='mobile-nav bottom-nav';
nav.innerHTML=`
<div class="mobile-nav-heading"><strong>${state.lang==='ru'?'Навигация':'Navigation'}</strong><span>${state.lang==='ru'?'Разделы приложения':'App sections'}</div>
<button data-mobile-page="home" type="button"><span>⌂</span><b data-i18n="home">Главная</b></button>
<button data-mobile-page="habits" type="button"><span>☷</span><b data-i18n="habits">Привычки</b></button>
<button data-mobile-page="plans" type="button"><span>◎</span><b data-i18n="plans">Планы</b></button>
<button data-mobile-page="stats" type="button"><span>◒</span><b data-i18n="stats">Статистика</b></button>
<button data-mobile-page="achievements" type="button"><span>✦</span><b data-i18n="achievements">Достижения</b></button>
<button data-mobile-page="settings" type="button"><span>⚙</span><b data-i18n="settings">Настройки</b></button>`;
document.body.appendChild(nav);
updateSegmentSliders();
$('#menuBtn')?.setAttribute('aria-label',state.lang==='ru'?'Открыть меню':'Open menu');
$('#menuBtn')?.setAttribute('aria-expanded','false');
nav.addEventListener('click',e=>{
const b=e.target.closest('[data-mobile-page]');
if(b){showPage(b.dataset.mobilePage);nav.classList.remove('is-open');document.body.classList.remove('mobile-menu-open');const toggle=$('#menuBtn');toggle?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.setAttribute('aria-label',state.lang==='ru'?'Открыть меню':'Open menu');}
});
document.addEventListener('pointerdown',e=>{if(!nav.classList.contains('is-open'))return;if(!nav.contains(e.target)&&!e.target.closest('#menuBtn')){nav.classList.remove('is-open');document.body.classList.remove('mobile-menu-open');const toggle=$('#menuBtn');toggle?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.setAttribute('aria-label',state.lang==='ru'?'Открыть меню':'Open menu');}});
}

const dayPicker=$('#dayPicker');
if(dayPicker){
 dayPicker.addEventListener('click',e=>{
  const b=e.target.closest('[data-day-step]');
  if(!b)return;
  const d=new Date(selectedDate+'T12:00:00');
  d.setDate(d.getDate()+Number(b.dataset.dayStep));
  selectDate(key(d));
 });
 dayPicker.addEventListener('change',e=>{
  if(e.target.id==='dayInput') selectDate(e.target.value);
 });
}

const dayPickerModal=$('#dayPickerModal');
if(dayPickerModal){
  let dayPress=null;
  dayPickerModal.addEventListener('pointerdown',e=>{
    const b=e.target.closest('[data-schedule-day]');
    if(!b || !dayPickerModal.contains(b)) { dayPress=null; return; }
    dayPress={button:b,x:e.clientX,y:e.clientY,pointerId:e.pointerId};
  },{passive:true});
  dayPickerModal.addEventListener('pointerup',e=>{
    if(!dayPress || dayPress.pointerId!==e.pointerId) return;
    const press=dayPress; dayPress=null;
    if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>9) return;
    const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-schedule-day]');
    if(b!==press.button || !dayPickerModal.contains(b)) return;
    e.preventDefault(); e.stopPropagation();
    const day=Number(b.dataset.scheduleDay);
    if(selectedDays.includes(day)){
      if(selectedDays.length===1) return;
      selectedDays=selectedDays.filter(x=>x!==day);
    }else{
      selectedDays=[...selectedDays,day].sort((a,b)=>a-b);
    }
    dayPickerModal.querySelectorAll('[data-schedule-day]').forEach(x=>x.classList.toggle('selected',selectedDays.includes(Number(x.dataset.scheduleDay))));
  },{passive:false});
  dayPickerModal.addEventListener('click',e=>{
    if(e.target.closest('[data-schedule-day]')) { e.preventDefault(); e.stopPropagation(); }
  });
}

const nameInput=
$('#nameInput');

if(nameInput){

nameInput.addEventListener(
'input',
e=>{

state.name=
e.target.value;

save();

const name=
state.name.trim();

if($('#avatarButton')){

$('#avatarButton').textContent=
name
?
name[0].toUpperCase()
:
'';

}

if($('#welcomeText')){

$('#welcomeText').textContent=
name
?
(
state.lang==='ru'
?
`С возвращением, ${name}.`
:
`Welcome back, ${name}.`
)
:
(
state.lang==='ru'
?
'Добро пожаловать в Habit.'
:
'Welcome to Habit.'
);

}

}
);

}

const modal=
$('#habitModal');

if(modal){

modal.addEventListener(
'click',
e=>{

if(
e.target===modal
){

closeModal();

}

}
);

}

document.addEventListener(
'keydown',
e=>{

if(
e.key==='Escape'
){

closeConfirm();

closeModal();

$('#infoPop')?.classList.remove(
'show'
);

}

}
);

}

document.addEventListener(
'DOMContentLoaded',
()=>{

bind();

ensureConfirmUI();

render();

showPage(
'home'
);

maybeShowRecovery();

}
);


/* =========================
   PLANS: TASKS & GOALS (v1.6)
========================= */

let plansTab='tasks',taskFilter='all',goalFilter='all',planEdit=null,planIcon='📝',planColor='#9a7cff';

function cleanPlanColor(v){
return typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v.trim())?v.trim():'#9a7cff';
}

function cleanPlanIcon(v,fallback){
const s=typeof v==='string'?v.trim():'';
return s?s.slice(0,16):fallback;
}

function isDateKey(v){
return typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v);
}

function normalizeTasks(list){
if(!Array.isArray(list)) return [];
return list
.filter(x=>x&&typeof x==='object'&&String(x.name||'').trim())
.map((x,i)=>({
id:Number.isFinite(Number(x.id))?Number(x.id):Date.now()+i,
name:String(x.name).trim().slice(0,60),
icon:cleanPlanIcon(x.icon,'📝'),
color:cleanPlanColor(x.color),
done:!!x.done,
doneAt:x.done&&isDateKey(x.doneAt)?x.doneAt:'',
created:isDateKey(x.created)?x.created:key(new Date())
}));
}

function normalizeGoals(list){
if(!Array.isArray(list)) return [];
return list
.filter(x=>x&&typeof x==='object'&&String(x.name||'').trim()&&isDateKey(x.deadline))
.map((x,i)=>{
const status=['active','done','failed'].includes(x.status)?x.status:'active';
return{
id:Number.isFinite(Number(x.id))?Number(x.id):Date.now()+i,
name:String(x.name).trim().slice(0,60),
icon:cleanPlanIcon(x.icon,'🎯'),
color:cleanPlanColor(x.color),
deadline:x.deadline,
status,
doneAt:status==='done'&&isDateKey(x.doneAt)?x.doneAt:'',
created:isDateKey(x.created)?x.created:key(new Date())
};
});
}

// A goal can be ticked up to and including its deadline day.
// Once that day has passed without a tick, it turns into a cross automatically.
function syncGoals(){
const today=key(new Date());
let changed=false;
state.goals.forEach(g=>{
if(g.status==='active'&&g.deadline<today){
g.status='failed';
changed=true;
}
});
if(changed) save();
return changed;
}

function planDate(k,full){
const d=new Date(k+'T12:00:00');
const opts={day:'numeric',month:full?'long':'short'};
if(d.getFullYear()!==new Date().getFullYear()) opts.year='numeric';
return d.toLocaleDateString(state.lang==='ru'?'ru-RU':'en-US',opts);
}

function planDaysLeft(k){
const a=new Date(k+'T12:00:00');
const b=new Date(key(new Date())+'T12:00:00');
return Math.round((a-b)/86400000);
}

function planDayWord(n){
if(state.lang!=='ru') return n===1?'day':'days';
const a=Math.abs(n)%100;
const b=a%10;
return a>10&&a<20?'дней':b===1?'день':b>=2&&b<=4?'дня':'дней';
}

function planStat(label,value,cls){
return `<article class="${cls||''}"><span>${esc(label)}</span><strong>${value}</strong></article>`;
}

function planEmpty(title,text){
return `<div class="empty-focus"><div class="empty-icon">✨</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
}

function renderTasks(){
const list=$('#taskList');
if(!list) return;
const ru=state.lang==='ru';
const all=state.tasks;
const left=all.filter(x=>!x.done).length;

if($('#taskStats')){
$('#taskStats').innerHTML=
planStat(t('planLeft'),left)+
planStat(t('planDoneLabel'),all.length-left,'good')+
planStat(t('planTotal'),all.length);
}

$$('#taskFilters .filter').forEach(b=>b.classList.toggle('active',b.dataset.planFilter===taskFilter));

const sorted=[...all].sort((a,b)=>{
if(a.done!==b.done) return a.done?1:-1;
if(a.done){
const c=String(b.doneAt).localeCompare(String(a.doneAt));
if(c) return c;
}
return b.id-a.id;
});

const shown=sorted.filter(x=>taskFilter==='all'?true:taskFilter==='done'?x.done:!x.done);

if(!shown.length){
list.innerHTML=all.length
?planEmpty(ru?'Здесь пока пусто':'Nothing here','')
:planEmpty(ru?'Задач пока нет':'No tasks yet',ru?'Добавь первую задачу — её нужно выполнить всего один раз.':'Add your first task — you only need to complete it once.');
return;
}

list.innerHTML=shown.map(x=>{
const doneLabel=x.doneAt?planDate(x.doneAt):'';
return `
<article class="focus-card plan-card plan-task ${x.done?'completed':''}" style="--focus-color:${x.done?'var(--green)':esc(x.color)}">
<button class="focus-icon" data-plan-action="toggle" data-plan-type="task" data-id="${x.id}" type="button" aria-label="${ru?'Отметить':'Toggle'}: ${esc(x.name)}">${esc(x.icon)}</button>
<div class="focus-info">
<h3>${esc(x.name)}</h3>
<p>${x.done?(ru?'Выполнено ✓':'Completed ✓'):(ru?'Нажми справа, когда сделаешь':'Tap the circle when done')}</p>
</div>
<div class="focus-streak">
<b>${x.done?'✓ '+esc(doneLabel):'🗓 '+esc(planDate(x.created))}</b>
<span>${x.done?(ru?'выполнена':'done'):(ru?'добавлена':'added')}</span>
</div>
<button class="check" data-plan-action="toggle" data-plan-type="task" data-id="${x.id}" type="button" aria-label="${ru?'Отметить':'Toggle'}: ${esc(x.name)}">${x.done?'✓':'○'}</button>
<button class="more" data-plan-action="edit" data-plan-type="task" data-id="${x.id}" type="button" aria-label="${ru?'Изменить':'Edit'}: ${esc(x.name)}">•••</button>
</article>`;
}).join('');
}

function goalProgress(g){
if(g.status==='done'||g.status==='failed') return 100;
const day=86400000;
const a=new Date(g.created+'T12:00:00');
const d=new Date(g.deadline+'T12:00:00');
const n=new Date(key(new Date())+'T12:00:00');
const total=Math.max(1,Math.round((d-a)/day));
const passed=Math.round((n-a)/day);
return Math.max(0,Math.min(100,Math.round(passed/total*100)));
}

function renderPlanIconPicker(){
const box=$('#planIconPicker');
if(!box) return;
box.innerHTML=icons.map(i=>`<button type="button" class="icon-choice ${i===planIcon?'selected':''}" data-icon="${i}">${i}</button>`).join('');
const cb=$('#planColorPicker');
if(cb) cb.innerHTML=colors.map(c=>`<button type="button" class="color-choice ${c===planColor?'selected':''}" data-color="${c}" style="--option-color:${c}"></button>`).join('');
}

function renderGoals(){
const list=$('#goalList');
if(!list) return;
const ru=state.lang==='ru';
const all=state.goals;
const count=s=>all.filter(g=>g.status===s).length;

if($('#goalStats')){
$('#goalStats').innerHTML=
planStat(t('goalActive'),count('active'))+
planStat(t('goalDone'),count('done'),'good')+
planStat(t('goalFailed'),count('failed'),'bad');
}

$$('#goalFilters .filter').forEach(b=>b.classList.toggle('active',b.dataset.planFilter===goalFilter));

const rank={active:0,done:1,failed:2};
const sorted=[...all].sort((a,b)=>{
if(a.status!==b.status) return rank[a.status]-rank[b.status];
if(a.status==='active') return a.deadline.localeCompare(b.deadline)||a.id-b.id;
if(a.status==='done') return String(b.doneAt).localeCompare(String(a.doneAt))||b.id-a.id;
return b.deadline.localeCompare(a.deadline)||b.id-a.id;
});

const shown=sorted.filter(g=>goalFilter==='all'?true:g.status===goalFilter);

if(!shown.length){
list.innerHTML=all.length
?planEmpty(ru?'Здесь пока пусто':'Nothing here','')
:planEmpty(ru?'Целей пока нет':'No goals yet',ru?'Поставь цель и дату: отметь её галочкой до этого дня, иначе она станет крестиком.':'Set a goal and a date: tick it by that day, otherwise it turns into a cross.');
return;
}

list.innerHTML=shown.map(g=>{
const done=g.status==='done';
const failed=g.status==='failed';
const left=planDaysLeft(g.deadline);
const pct=goalProgress(g);

let badge,count,footL,footR;
if(done){
badge=t('goalDone');
count=`<b>✓</b><span>${ru?'готово':'done'}</span>`;
footL=(ru?'Выполнена ':'Completed ')+(g.doneAt?planDate(g.doneAt):'');
footR=(ru?'срок: ':'due: ')+planDate(g.deadline);
}else if(failed){
badge=t('goalFailed');
count=`<b>✕</b><span>${ru?'срок истёк':'expired'}</span>`;
footL=ru?'Срок истёк':'Deadline passed';
footR=planDate(g.deadline,true);
}else{
badge=t('goalActive');
count=left<=0
?`<b class="today">${ru?'Сегодня':'Today'}</b><span>${ru?'последний день':'last day'}</span>`
:`<b>${left}</b><span>${planDayWord(left)}</span>`;
footL=ru?`${pct}% срока прошло`:`${pct}% of the time passed`;
footR=(ru?'до ':'until ')+planDate(g.deadline,true);
}

const status=done?'done':failed?'failed':'active';

return `
<article class="goal-card plan-card plan-goal ${status}" style="--goal-color:${failed?'var(--danger)':done?'var(--green)':esc(g.color)}">
<button class="goal-icon" data-plan-action="toggle" data-plan-type="goal" data-id="${g.id}" type="button" aria-label="${ru?'Отметить':'Toggle'}: ${esc(g.name)}">${esc(g.icon)}</button>
<div class="goal-main">
<div class="goal-top"><span class="goal-badge">${esc(badge)}</span></div>
<h3>${esc(g.name)}</h3>
<div class="goal-track"><i style="width:${pct}%"></i></div>
<div class="goal-foot"><span>${esc(footL)}</span><span>${esc(footR)}</span></div>
</div>
<div class="goal-side">
<div class="goal-count">${count}</div>
<div class="goal-btns">
<button class="check" data-plan-action="toggle" data-plan-type="goal" data-id="${g.id}" type="button" aria-label="${ru?'Отметить':'Toggle'}: ${esc(g.name)}">${done?'✓':failed?'✕':'○'}</button>
<button class="more" data-plan-action="edit" data-plan-type="goal" data-id="${g.id}" type="button" aria-label="${ru?'Изменить':'Edit'}: ${esc(g.name)}">•••</button>
</div>
</div>
</article>`;
}).join('');
}

function renderPlans(){
if(!$('#plans')) return;
state.tasks=normalizeTasks(state.tasks);
state.goals=normalizeGoals(state.goals);
syncGoals();

$$('.plans-tab').forEach(b=>b.classList.toggle('active',b.dataset.plansTab===plansTab));
$('#tasksPane')?.classList.toggle('active',plansTab==='tasks');
$('#goalsPane')?.classList.toggle('active',plansTab==='goals');

if($('#addPlanLabel')){
$('#addPlanLabel').textContent=plansTab==='goals'?t('addGoal'):t('addTask');
}

renderTasks();
renderGoals();
}

function toggleTask(id){
const x=state.tasks.find(v=>v.id===id);
if(!x) return;
const ru=state.lang==='ru';

if(x.done){
x.done=false;
x.doneAt='';
toast(ru?'Отметка снята':'Completion undone');
}else{
x.done=true;
x.doneAt=key(new Date());
burst();
toast(ru?'Задача выполнена':'Task completed');
}

save();
renderPlans();
}

function toggleGoal(id){
syncGoals();
const g=state.goals.find(v=>v.id===id);
if(!g) return;
const ru=state.lang==='ru';
const today=key(new Date());

if(g.status==='failed'){
toast(ru?'Срок истёк — цель уже не выполнить':'The deadline has passed');
renderPlans();
return;
}

if(g.status==='done'){
if(g.deadline<today){
toast(ru?'Срок уже прошёл — отметку не снять':'The deadline has passed — can\'t undo');
return;
}
g.status='active';
g.doneAt='';
toast(ru?'Отметка снята':'Completion undone');
}else{
g.status='done';
g.doneAt=today;
burst();
toast(ru?'Цель достигнута 🏆':'Goal achieved 🏆');
}

save();
renderPlans();
}

function openPlanEditor(type,id=null){
const ru=state.lang==='ru';
const goal=type==='goal';
const item=id?(goal?state.goals:state.tasks).find(x=>x.id===id):null;
if(id&&!item) return;

planEdit={type,id:item?item.id:null};
planIcon=cleanPlanIcon(item?.icon,goal?'🎯':'📝');
planColor=cleanPlanColor(item?.color);
renderPlanIconPicker();

if($('#planModalEyebrow')) $('#planModalEyebrow').textContent=goal?(ru?'ЦЕЛЬ':'GOAL'):(ru?'ЗАДАЧА':'TASK');
if($('#planModalTitle')){
$('#planModalTitle').textContent=item
?(goal?(ru?'Изменить цель':'Edit goal'):(ru?'Изменить задачу':'Edit task'))
:(goal?(ru?'Добавить цель':'Add goal'):(ru?'Добавить задачу':'Add task'));
}

const nameInput=$('#planName');
if(nameInput){
nameInput.value=item?.name||'';
nameInput.placeholder=goal
?(ru?'Например, прочитать книгу':'e.g. finish a book')
:(ru?'Например, оплатить интернет':'e.g. pay the internet bill');
}

const row=$('#planDateRow');
if(row) row.style.display=goal?'':'none';

const dateInput=$('#planDate');
if(dateInput&&goal){
const today=key(new Date());
if(item&&item.status==='done') dateInput.removeAttribute('min');
else dateInput.min=today;
// A goal completed and past its deadline is final: its date can't be moved to bring back the undo.
dateInput.disabled=!!(item&&item.status==='done'&&item.deadline<today);
if(item){
dateInput.value=item.deadline;
}else{
const d=new Date();
d.setHours(12,0,0,0);
d.setDate(d.getDate()+7);
dateInput.value=key(d);
}
}

$('#deletePlan')?.classList.toggle('show',!!item);

const modal=$('#planModal');
if(modal){
modal.classList.add('open');
modal.setAttribute('aria-hidden','false');
document.body.classList.add('habit-modal-open');
}

setTimeout(()=>$('#planName')?.focus(),80);
}

function closePlanModal(){
const modal=$('#planModal');
if(modal){
modal.classList.remove('open');
modal.setAttribute('aria-hidden','true');
}
document.body.classList.remove('habit-modal-open');
planEdit=null;
}

function savePlan(){
if(!planEdit) return;
const ru=state.lang==='ru';
const input=$('#planName');
const name=(input?.value||'').trim();

if(!name){
toast(ru?'Введи название':'Enter a name');
input?.focus();
return;
}

const today=key(new Date());

if(planEdit.type==='task'){
if(planEdit.id){
const x=state.tasks.find(v=>v.id===planEdit.id);
if(!x){closePlanModal();renderPlans();return;}
x.name=name;
x.icon=planIcon;
x.color=planColor;
}else{
state.tasks.unshift({id:Date.now(),name,icon:planIcon,color:planColor,done:false,doneAt:'',created:today});
}
}else{
const date=$('#planDate')?.value||'';

if(!isDateKey(date)){
toast(ru?'Выбери дату':'Pick a date');
return;
}

const g=planEdit.id?state.goals.find(v=>v.id===planEdit.id):null;
if(planEdit.id&&!g){closePlanModal();renderPlans();return;}

const changed=!g||g.deadline!==date;

if(g&&g.status==='done'&&g.deadline<today&&changed){
toast(ru?'Срок уже прошёл — дату не изменить':'The deadline has passed — can\'t change the date');
return;
}

if(changed&&date<today&&!(g&&g.status==='done')){
toast(ru?'Дата не может быть в прошлом':'The date can\'t be in the past');
return;
}

if(g){
g.name=name;
g.icon=planIcon;
g.color=planColor;
if(changed){
g.deadline=date;
if(g.status==='failed'&&date>=today) g.status='active';
}
}else{
state.goals.push({id:Date.now(),name,icon:planIcon,color:planColor,deadline:date,status:'active',doneAt:'',created:today});
}
}

save();
closePlanModal();
renderPlans();
toast(t('save'));
}

function deletePlan(){
if(!planEdit||!planEdit.id) return;
askDeletePlan(planEdit.type,planEdit.id);
}

function askDeletePlan(type,id){
const ru=state.lang==='ru';
const item=(type==='goal'?state.goals:state.tasks).find(x=>x.id===id);
if(!item) return;
const doneGoal=type==='goal'&&item.status==='done';

showConfirm(
type==='goal'?(doneGoal?(ru?'Удалить выполненную цель?':'Delete completed goal?'):(ru?'Удалить цель?':'Delete goal?')):(ru?'Удалить задачу?':'Delete task?'),
ru?`«${item.name}» будет удалена без возможности восстановления.`:`“${item.name}” will be deleted and cannot be restored.`,
()=>{
if(type==='goal') state.goals=state.goals.filter(x=>x.id!==id);
else state.tasks=state.tasks.filter(x=>x.id!==id);
save();
closePlanModal();
renderPlans();
toast(type==='goal'?(ru?'Цель удалена':'Goal deleted'):(ru?'Задача удалена':'Task deleted'));
}
);
}

/* A completed goal whose deadline has passed is final: the ••• button offers only "Delete". */
let planDelPop=null,planDelFor=null;

function closePlanDelPop(){
if(planDelPop) planDelPop.classList.remove('open');
planDelFor=null;
}

function openPlanDelPop(btn,id){
const ru=state.lang==='ru';
if(!planDelPop){
planDelPop=document.createElement('div');
planDelPop.className='plan-del-pop';
planDelPop.innerHTML='<button type="button" class="plan-del-btn"></button>';
document.body.appendChild(planDelPop);
planDelPop.addEventListener('click',e=>e.stopPropagation());
planDelPop.querySelector('button').addEventListener('click',()=>{
const goalId=planDelFor;
closePlanDelPop();
if(goalId!=null) askDeletePlan('goal',goalId);
});
document.addEventListener('click',closePlanDelPop);
document.addEventListener('keydown',e=>{if(e.key==='Escape') closePlanDelPop();});
window.addEventListener('scroll',closePlanDelPop,{passive:true});
window.addEventListener('resize',closePlanDelPop);
}
planDelPop.querySelector('button').textContent='🗑 '+(ru?'Удалить':'Delete');
planDelFor=id;
const r=btn.getBoundingClientRect();
const w=128;
planDelPop.style.left=Math.max(10,Math.min(r.right-w,window.innerWidth-w-10))+'px';
planDelPop.style.top=(r.bottom+8)+'px';
planDelPop.classList.add('open');
}

function bindPlans(){
$$('.plans-tab').forEach(b=>b.addEventListener('click',()=>{
plansTab=b.dataset.plansTab;
renderPlans();
updateSegmentSliders();
}));

$('#addPlanBtn')?.addEventListener('click',()=>openPlanEditor(plansTab==='goals'?'goal':'task'));

$('#taskFilters')?.addEventListener('click',e=>{
const b=e.target.closest('[data-plan-filter]');
if(!b) return;
taskFilter=b.dataset.planFilter;
renderTasks();
});

$('#goalFilters')?.addEventListener('click',e=>{
const b=e.target.closest('[data-plan-filter]');
if(!b) return;
goalFilter=b.dataset.planFilter;
renderGoals();
});

['#taskList','#goalList'].forEach(sel=>{
const list=$(sel);
if(!list) return;
list.addEventListener('click',e=>{
const b=e.target.closest('[data-plan-action]');
if(!b||!list.contains(b)) return;
const id=Number(b.dataset.id);
const type=b.dataset.planType;
if(b.dataset.planAction==='toggle'){
if(type==='goal') toggleGoal(id);
else toggleTask(id);
}
if(b.dataset.planAction==='edit'){
if(type==='goal'){
const g=state.goals.find(v=>v.id===id);
if(g&&g.status==='done'&&g.deadline<key(new Date())){
e.stopPropagation();
if(planDelPop&&planDelPop.classList.contains('open')&&planDelFor===id){closePlanDelPop();return;}
openPlanDelPop(b,id);
return;
}
}
openPlanEditor(type,id);
}
});
});

$('#planIconPicker')?.addEventListener('click',e=>{
const b=e.target.closest('[data-icon]');
if(!b) return;
e.preventDefault();
e.stopPropagation();
planIcon=b.dataset.icon;
$$('#planIconPicker [data-icon]').forEach(x=>x.classList.toggle('selected',x===b));
});
$('#planColorPicker')?.addEventListener('click',e=>{
const b=e.target.closest('[data-color]');
if(!b) return;
e.preventDefault();
e.stopPropagation();
planColor=b.dataset.color;
$$('#planColorPicker [data-color]').forEach(x=>x.classList.toggle('selected',x===b));
});
$('#planDate')?.addEventListener('click',e=>{
const el=e.currentTarget;
if(el.disabled) return;
try{ if(typeof el.showPicker==='function') el.showPicker(); }catch(err){}
});
$('#savePlan')?.addEventListener('click',savePlan);
$('#deletePlan')?.addEventListener('click',deletePlan);
$('#closePlanModal')?.addEventListener('click',closePlanModal);

const modal=$('#planModal');
if(modal){
modal.addEventListener('click',e=>{
if(e.target===modal) closePlanModal();
});
}

$('#planName')?.addEventListener('keydown',e=>{
if(e.key==='Enter'){
e.preventDefault();
savePlan();
}
});

document.addEventListener('keydown',e=>{
if(e.key==='Escape') closePlanModal();
});

// Keep goal statuses fresh while the app stays open (e.g. after midnight).
const refreshGoals=()=>{
if(syncGoals()){
renderPlans();
toast(state.lang==='ru'?'Срок одной из целей истёк':'A goal deadline has passed');
}
};
setInterval(refreshGoals,30000);
document.addEventListener('visibilitychange',()=>{
if(!document.hidden) refreshGoals();
});
window.addEventListener('focus',refreshGoals);
}

document.addEventListener('DOMContentLoaded',bindPlans);


/* =========================
   v1.6 "what's new" mini card (Settings)
========================= */
(function(){
function init(){
const btn=$('#aboutVersion'),pop=$('#versionPop');
if(!btn||!pop) return;
const place=()=>{
const r=btn.getBoundingClientRect();
const w=Math.min(300,window.innerWidth-24);
pop.style.width=w+'px';
let left=r.right-w;
left=Math.max(12,Math.min(left,window.innerWidth-w-12));
pop.style.left=left+'px';
pop.style.top=(r.bottom+10)+'px';
const arrow=Math.max(14,Math.min(w-30,r.left+r.width/2-left-6));
pop.style.setProperty('--arrow-left',arrow+'px');
};
const close=()=>{pop.classList.remove('open');btn.setAttribute('aria-expanded','false');};
const open=()=>{place();pop.classList.add('open');btn.setAttribute('aria-expanded','true');};
btn.addEventListener('click',e=>{e.stopPropagation();pop.classList.contains('open')?close():open();});
pop.addEventListener('click',e=>e.stopPropagation());
$('#versionClose')?.addEventListener('click',close);
document.addEventListener('click',close);
document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
window.addEventListener('resize',()=>{if(pop.classList.contains('open')) place();});
window.addEventListener('scroll',()=>{if(pop.classList.contains('open')) place();},{passive:true});
$$('.nav-link,[data-mobile-page]').forEach(b=>b.addEventListener('click',close));
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
