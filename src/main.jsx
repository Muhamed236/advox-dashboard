import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BarChart3, Brain, Calendar, ChevronRight, CircleDollarSign, Gauge, LayoutDashboard, LogOut, Megaphone, PauseCircle, RefreshCw, Search, Settings, ShieldCheck, Sparkles, TrendingUp, Users, Wallet, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './style.css';

const demoClients = [
  { id: 'cl_001', name: 'Elite Home Real Estate', email: 'client@elitehome.demo', adAccount: 'act_982734651', status: 'Active', health: 86, lastSync: 'Today 11:40 AM' },
  { id: 'cl_002', name: 'Gyro Restaurant', email: 'client@gyro.demo', adAccount: 'act_223451984', status: 'Active', health: 72, lastSync: 'Today 10:15 AM' },
  { id: 'cl_003', name: 'Windsor Academy', email: 'client@windsor.demo', adAccount: 'act_774419030', status: 'Paused', health: 58, lastSync: 'Yesterday 08:31 PM' }
];

const campaigns = [
  { name: 'Lead Gen - Sharjah Investors', objective: 'Leads', status: 'Active', spend: 1434, results: 54, cpl: 26.55, ctr: 2.8, cpm: 31.2, cpc: 1.12, freq: 2.1, ai: 'Scale' },
  { name: 'Retargeting - Website Visitors', objective: 'Messages', status: 'Active', spend: 486, results: 32, cpl: 15.18, ctr: 3.9, cpm: 24.8, cpc: 0.64, freq: 3.4, ai: 'Winner' },
  { name: 'Awareness - Luxury Branding', objective: 'Reach', status: 'Active', spend: 760, results: 0, cpl: 0, ctr: 0.9, cpm: 18.6, cpc: 2.07, freq: 4.2, ai: 'Refresh' },
  { name: 'Test - New Creative Hooks', objective: 'Leads', status: 'Learning', spend: 280, results: 7, cpl: 40, ctr: 1.5, cpm: 29.7, cpc: 1.98, freq: 1.2, ai: 'Watch' }
];

const adsets = [
  { name: 'Compound Owners - UAE', budget: '75 AED/day', spend: 650, results: 29, cpl: 22.4, ctr: 3.1, cpm: 27.2, freq: 2.4, reco: 'Audience is healthy. Increase budget gradually.' },
  { name: 'Lookalike Leads 2%', budget: '50 AED/day', spend: 430, results: 12, cpl: 35.8, ctr: 1.6, cpm: 32.9, freq: 3.9, reco: 'Refresh creative and narrow placements.' },
  { name: 'Retargeting 30 Days', budget: '35 AED/day', spend: 210, results: 18, cpl: 11.7, ctr: 4.6, cpm: 21.4, freq: 4.8, reco: 'Winner, but watch frequency closely.' }
];

const creatives = [
  { name: 'Hook: Stop wasting leads', ad: 'Video Ad 01', type: 'Video', spend: 520, results: 27, cpl: 19.2, ctr: 4.1, freq: 2.8, status: 'Winner', note: 'Strong hook. Scale budget 20% while keeping audience stable.' },
  { name: 'Carousel: ROI Framework', ad: 'Carousel 03', type: 'Carousel', spend: 370, results: 8, cpl: 46.2, ctr: 1.2, freq: 3.7, status: 'Refresh', note: 'CTR is weak. Change headline and first visual.' },
  { name: 'Founder Direct Talk', ad: 'Reel 02', type: 'Reel', spend: 260, results: 14, cpl: 18.5, ctr: 3.2, freq: 1.9, status: 'Scale', note: 'Good quality leads. Test similar script variations.' }
];

const chartData = [
  { day: 'Mon', spend: 240, leads: 7 },
  { day: 'Tue', spend: 310, leads: 11 },
  { day: 'Wed', spend: 290, leads: 9 },
  { day: 'Thu', spend: 420, leads: 17 },
  { day: 'Fri', spend: 380, leads: 15 },
  { day: 'Sat', spend: 510, leads: 21 },
  { day: 'Sun', spend: 470, leads: 19 }
];

function formatMoney(n) { return `${Number(n).toLocaleString()} AED`; }
function aiClass(status) { return `pill ${status.toLowerCase()}`; }

function Login({ onLogin }) {
  return <div className="login-page">
    <div className="login-card">
      <div className="brand-mark">A</div>
      <h1>ADVOX OS</h1>
      <p>Meta Ads Analytics + AI Recommendations</p>
      <div className="field"><label>Email</label><input placeholder="admin@advoxcrew.site" /></div>
      <div className="field"><label>Password</label><input type="password" placeholder="••••••••" /></div>
      <button onClick={onLogin}>Login Demo</button>
      <small>MVP demo only. Supabase Auth will be connected in the next step.</small>
    </div>
  </div>
}

function Sidebar({ page, setPage, role, setRole }) {
  const items = [
    ['overview', LayoutDashboard, 'Overview'], ['campaigns', Megaphone, 'Campaigns'], ['adsets', Users, 'Ad Sets'], ['creatives', Sparkles, 'Creatives'], ['ai', Brain, 'AI Insights'], ['reports', BarChart3, 'Reports'], ['admin', ShieldCheck, 'Admin']
  ];
  return <aside className="sidebar">
    <div className="side-logo"><div>A</div><span>ADVOX<br/><b>DASHBOARD</b></span></div>
    <nav>{items.map(([key, Icon, label]) => <button key={key} className={page===key?'active':''} onClick={()=>setPage(key)}><Icon size={18}/>{label}</button>)}</nav>
    <div className="role-box"><small>Current mode</small><select value={role} onChange={e=>setRole(e.target.value)}><option>admin</option><option>client</option></select></div>
  </aside>
}

function Topbar({ client, onLogout }) {
  return <header className="dash-topbar"><div><h2>{client.name}</h2><p>Ad Account: {client.adAccount} · Last sync: {client.lastSync}</p></div><div className="top-actions"><button><Search size={17}/> Search</button><button onClick={onLogout}><LogOut size={17}/> Logout</button></div></header>
}

function Kpis() {
  const kpis = [
    ['Total Spend', '2,960 AED', Wallet, '+12%'], ['Results', '112', Zap, '+18%'], ['CPL / CPA', '26.42 AED', CircleDollarSign, '-9%'], ['CTR', '2.86%', TrendingUp, '+0.7%'], ['CPM', '27.9 AED', Gauge, 'Stable'], ['ROAS', '3.1x', RefreshCw, 'Demo']
  ];
  return <div className="kpi-grid">{kpis.map(([label, value, Icon, trend]) => <div className="kpi" key={label}><div><span>{label}</span><h3>{value}</h3><small>{trend}</small></div><Icon size={24}/></div>)}</div>
}

function Overview() {
  return <div className="page"><Kpis/><section className="panel chart-panel"><div className="panel-head"><h3>Spend vs Leads</h3><p>Last 7 days demo trend</p></div><ResponsiveContainer width="100%" height={300}><AreaChart data={chartData}><defs><linearGradient id="spend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#39c3f2" stopOpacity={0.65}/><stop offset="95%" stopColor="#39c3f2" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis dataKey="day" stroke="#8da2c0"/><YAxis stroke="#8da2c0"/><Tooltip contentStyle={{background:'#0f172a',border:'1px solid rgba(255,255,255,.12)',borderRadius:14,color:'#fff'}}/><Area type="monotone" dataKey="spend" stroke="#39c3f2" fill="url(#spend)"/></AreaChart></ResponsiveContainer></section><AiPanel/></div>
}

function Campaigns() { return <TablePage title="Campaigns" desc="Read-only Meta campaign performance with AI labels." rows={campaigns} type="campaign" /> }
function Adsets() { return <TablePage title="Ad Sets" desc="Audience and budget-level performance analysis." rows={adsets} type="adset" /> }
function TablePage({title, desc, rows, type}) { return <div className="page"><div className="page-title"><h1>{title}</h1><p>{desc}</p></div><div className="table-wrap"><table><thead><tr>{type==='campaign'? <><th>Campaign</th><th>Objective</th><th>Status</th></> : <><th>Audience</th><th>Budget</th></>}<th>Spend</th><th>Results</th><th>CPL</th><th>CTR</th><th>CPM</th><th>Frequency</th><th>AI</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{type==='campaign'? <><td>{r.name}</td><td>{r.objective}</td><td>{r.status}</td></> : <><td>{r.name}</td><td>{r.budget}</td></>}<td>{formatMoney(r.spend)}</td><td>{r.results}</td><td>{r.cpl}</td><td>{r.ctr}%</td><td>{r.cpm}</td><td>{r.freq}</td><td>{r.ai ? <span className={aiClass(r.ai)}>{r.ai}</span> : r.reco}</td></tr>)}</tbody></table></div></div> }

function Creatives() { return <div className="page"><div className="page-title"><h1>Creative Performance</h1><p>Visual cards for every creative with AI notes.</p></div><div className="creative-grid">{creatives.map((c,i)=><div className="creative-card" key={i}><div className="thumb"><Sparkles/></div><div className="creative-body"><span className={aiClass(c.status)}>{c.status}</span><h3>{c.name}</h3><p>{c.ad} · {c.type}</p><div className="mini-stats"><b>{formatMoney(c.spend)}</b><b>{c.results} results</b><b>{c.ctr}% CTR</b><b>{c.freq} Freq</b></div><div className="ai-note"><Brain size={16}/>{c.note}</div></div></div>)}</div></div> }

function AiPanel() { return <section className="panel ai-panel"><div className="panel-head"><h3>AI Insights</h3><p>Daily recommendations generated from performance signals.</p></div><div className="insights"><div><span>Best Campaign</span><b>Retargeting - Website Visitors</b><p>High CTR and low CPL. Keep scaling slowly.</p></div><div><span>Worst Campaign</span><b>Awareness - Luxury Branding</b><p>Frequency is rising with weak CTR. Refresh creative.</p></div><div><span>Main Problem</span><b>Creative Fatigue</b><p>Some creatives crossed frequency 3.5. Launch new hooks.</p></div></div></section> }
function AI() { return <div className="page"><div className="page-title"><h1>AI Insights</h1><p>Winner, scale, watch, refresh and pause recommendations.</p></div><AiPanel/></div> }
function Reports() { return <div className="page"><div className="page-title"><h1>Reports</h1><p>Generate daily, weekly and manual reports.</p></div><section className="panel report-card"><h3>Weekly AI Report</h3><p>Performance improved this week by 18% in results. Retargeting is the strongest segment. Creative fatigue started in Awareness campaign. Recommended action: launch two new video hooks and increase budget on Retargeting by 15%.</p><button><Calendar size={17}/> Generate AI Report</button><button><Megaphone size={17}/> Send to Telegram</button></section></div> }
function Admin({clients,setClient}) { return <div className="page"><div className="page-title"><h1>Admin Clients</h1><p>Add clients, connect Ad Account IDs, Telegram IDs and manage access.</p></div><div className="client-grid">{clients.map(c=><div className="client-card" key={c.id}><div><h3>{c.name}</h3><p>{c.email}</p><small>{c.adAccount}</small></div><span className={c.status==='Active'?'pill winner':'pill pause'}>{c.status}</span><div className="health"><b>{c.health}/100</b><small>AI Account Health</small></div><button onClick={()=>setClient(c)}>Open Client <ChevronRight size={16}/></button></div>)}</div></div> }

function App() {
  const [logged,setLogged] = useState(false); const [page,setPage] = useState('overview'); const [role,setRole] = useState('admin'); const [client,setClient] = useState(demoClients[0]);
  const content = useMemo(()=>({overview:<Overview/>,campaigns:<Campaigns/>,adsets:<Adsets/>,creatives:<Creatives/>,ai:<AI/>,reports:<Reports/>,admin:<Admin clients={demoClients} setClient={setClient}/>})[page],[page]);
  if(!logged) return <Login onLogin={()=>setLogged(true)}/>;
  return <div className="dashboard"><Sidebar page={page} setPage={setPage} role={role} setRole={setRole}/><main className="main"><Topbar client={client} onLogout={()=>setLogged(false)}/>{content}</main></div>
}

createRoot(document.getElementById('root')).render(<App />);
