import React, { useState, useEffect } from 'react';

const G = {
  orange:'#E8621A', orangeLt:'#F4914A', brown:'#5C3317', cream:'#FDF6EC',
  tan:'#D4A96A', dark:'#2B1A0E', white:'#FFFFFF', green:'#2d7a4f', red:'#c0392b'
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@300;400;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Nunito',sans-serif;background:#FDF6EC;color:#2B1A0E;overflow-x:hidden;}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:#f5e8d0;}
  ::-webkit-scrollbar-thumb{background:#E8621A;border-radius:3px;}
  input,textarea,select{font-family:'Nunito',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
  .fade-in{animation:fadeUp .6s ease both;}
  .float{animation:float 3s ease-in-out infinite;}
  .pulse{animation:pulse 2s ease-in-out infinite;}
`;

const HERO_IMGS = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1534773728080-33d31da27ae5?w=300&h=300&fit=crop',
];

const ANIMAL_BLOCKS = [
  {
    id:'dogs', label:'🐶 Dogs', emoji:'🐶', color:'#E8621A',
    desc:'Loyal, loving companions rescued from the streets — ready for forever homes.',
    animals:[
      {name:'Buddy',breed:'Golden Retriever Mix',age:'2 yrs',gender:'Male',status:'Available',tags:['Playful','Kid-Friendly','Vaccinated'],weight:'28 kg',img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&h=450&fit=crop'},
      {name:'Max',breed:'German Shepherd',age:'3 yrs',gender:'Male',status:'Pending',tags:['Energetic','Loyal','Trained'],weight:'35 kg',img:'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=700&h=450&fit=crop'},
      {name:'Rocky',breed:'Labrador Mix',age:'1 yr',gender:'Male',status:'Available',tags:['Energetic','Friendly','Vaccinated'],weight:'22 kg',img:'https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&h=450&fit=crop'},
      {name:'Daisy',breed:'Beagle',age:'4 yrs',gender:'Female',status:'Available',tags:['Calm','Kid-Safe','Neutered'],weight:'12 kg',img:'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=700&h=450&fit=crop'},
    ]
  },
  {
    id:'cats', label:'🐱 Cats', emoji:'🐱', color:'#8e44ad',
    desc:'Independent, affectionate felines looking for a cozy place to call home.',
    animals:[
      {name:'Luna',   breed:'Tabby Cat',    age:'1 yr',   gender:'Female',status:'Available',tags:['Calm','Indoor','Neutered'],        weight:'3.5 kg',img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&h=450&fit=crop'},
      {name:'Mochi',  breed:'Persian Mix',  age:'4 yrs',  gender:'Female',status:'Available',tags:['Gentle','Quiet','Vaccinated'],      weight:'4 kg',  img:'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=700&h=450&fit=crop'},
      {name:'Shadow', breed:'Black Cat',    age:'2 yrs',  gender:'Male',  status:'Available',tags:['Playful','Curious','Vaccinated'],   weight:'4.2 kg',img:'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=700&h=450&fit=crop'},
      {name:'Nala',   breed:'Calico',       age:'3 yrs',  gender:'Female',status:'Pending',  tags:['Affectionate','Lap Cat','Neutered'],weight:'3.8 kg',img:'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=700&h=450&fit=crop'},
      {name:'Leo',    breed:'Orange Tabby', age:'1.5 yrs',gender:'Male',  status:'Available',tags:['Playful','Social','Vaccinated'],    weight:'4.5 kg',img:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=700&h=450&fit=crop'},
      {name:'Cleo',   breed:'Siamese Mix',  age:'2 yrs',  gender:'Female',status:'Available',tags:['Vocal','Smart','Indoor'],           weight:'3.2 kg',img:'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=700&h=450&fit=crop'},
    ]
  },
  {
    id:'horses', label:'🐎 Horses', emoji:'🐎', color:'#c0392b',
    desc:'Majestic horses rehabilitated from neglect — strong, beautiful, and gentle.',
    animals:[
      {name:'Storm',breed:'Brown Horse',age:'6 yrs',gender:'Male',status:'Available',tags:['Majestic','Trained','Strong'],weight:'500 kg',img:'https://images.unsplash.com/photo-1534773728080-33d31da27ae5?w=700&h=450&fit=crop'},
      {name:'Blaze',breed:'Black Horse',age:'4 yrs',gender:'Male',status:'Available',tags:['Fast','Trained','Vaccinated'],weight:'480 kg',img:'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=700&h=450&fit=crop'},
    ]
  },
  {
    id:'parrots', label:'🦜 Parrots', emoji:'🦜', color:'#27ae60',
    desc:'Colourful, intelligent birds who love to talk and bond deeply with their owners.',
    animals:[
      // Using Pexels direct CDN link — reliable parrot image
      {name:'Rio',breed:'Australian Rainbow Lorikeet',age:'1.5 yrs',gender:'Female',status:'Available',tags:['Australian','Colorful','Playful'],weight:'0.13 kg',
       img:'https://images.pexels.com/photos/1599452/pexels-photo-1599452.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&fit=crop'},
    ]
  },
  {
    id:'rabbits', label:'🐰 Rabbits', emoji:'🐰', color:'#e91e8c',
    desc:'Fluffy, gentle bunnies perfect for families and quiet homes alike.',
    animals:[
      {name:'Coco',breed:'Holland Lop',age:'1 yr',gender:'Female',status:'Available',tags:['Fluffy','Social','Easy Care'],weight:'1.8 kg',img:'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=700&h=450&fit=crop'},
    ]
  },
];

// Smart image component — tries multiple parrot URLs if one fails
function SmartImg({ srcs, alt, style, onMouseEnter, onMouseLeave }) {
  const [idx, setIdx] = useState(0);
  const list = Array.isArray(srcs) ? srcs : [srcs];
  return (
    <img
      src={list[idx]}
      alt={alt}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onError={() => { if (idx < list.length - 1) setIdx(i => i + 1); }}
    />
  );
}

// Parrot fallback chain
const PARROT_SRCS = [
  'https://images.pexels.com/photos/1599452/pexels-photo-1599452.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&fit=crop',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Rainbow_lorikeet_ed.jpg/640px-Rainbow_lorikeet_ed.jpg',
  'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=700&h=450&fit=crop',
];

function getImgSrcs(animal) {
  if (animal.name === 'Rio') return PARROT_SRCS;
  return [animal.img];
}

function Toast({msg,show,type='success'}){
  return(
    <div style={{position:'fixed',bottom:28,right:28,zIndex:9999,
      background:type==='error'?G.red:G.brown,color:G.cream,
      padding:'14px 22px',borderRadius:14,fontWeight:700,fontSize:'0.93rem',
      boxShadow:'0 8px 32px rgba(0,0,0,.3)',maxWidth:340,
      transform:show?'translateY(0)':'translateY(120px)',
      opacity:show?1:0,transition:'all .4s cubic-bezier(.34,1.56,.64,1)'}}>
      {msg}
    </div>
  );
}

const PAGES=['home','report','adopt','donate','awareness','volunteer','contact'];
const PAGE_LABELS={home:'🏠 Home',report:'🚨 Report',adopt:'🐾 Adopt',donate:'💛 Donate',awareness:'📚 Awareness',volunteer:'🤝 Volunteer',contact:'📞 Contact'};

function Navbar({page,setPage}){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);
  },[]);
  return(
    <nav style={{position:'sticky',top:0,zIndex:200,background:scrolled?'rgba(43,26,14,.97)':G.dark,backdropFilter:'blur(12px)',boxShadow:scrolled?'0 4px 24px rgba(0,0,0,.35)':'none',transition:'all .3s'}}>
      <div style={{maxWidth:1400,margin:'0 auto',padding:'0 28px',display:'flex',justifyContent:'space-between',alignItems:'center',height:70,flexWrap:'nowrap'}}>
        {/* Logo — nowrap so it stays one line */}
        <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',fontFamily:"'Playfair Display',serif",fontSize:'1.5rem',color:G.tan,fontWeight:700,whiteSpace:'nowrap',flexShrink:0,marginRight:24}}>
          🐾 PawCrest <span style={{color:G.orangeLt}}>Network</span>
        </button>
        {/* Nav links — all on one line, no wrap */}
        <div style={{display:'flex',gap:2,alignItems:'center',flexWrap:'nowrap',overflow:'visible'}}>
          {PAGES.map(p=>(
            <button key={p} onClick={()=>{setPage(p);window.scrollTo(0,0);}}
              style={{background:page===p?G.orange:'none',color:page===p?'#fff':G.tan,border:'none',padding:'8px 14px',borderRadius:8,fontWeight:700,fontSize:'0.95rem',cursor:'pointer',transition:'all .2s',whiteSpace:'nowrap'}}>
              {PAGE_LABELS[p]}
            </button>
          ))}
          <button onClick={()=>setPage('report')} className="pulse"
            style={{background:'linear-gradient(135deg,#c0392b,#e74c3c)',color:'#fff',border:'none',padding:'9px 18px',borderRadius:50,fontWeight:800,fontSize:'0.95rem',cursor:'pointer',boxShadow:'0 4px 16px rgba(192,57,43,.5)',marginLeft:10,whiteSpace:'nowrap',flexShrink:0}}>
            🚨 Emergency
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({setPage}){
  const stats=[['1,200+','Animals Rescued'],['950+','Adopted'],['50+','Volunteers'],['₨2.4M','Donated']];
  const features=[
    {icon:'🚨',title:'Report an Animal',desc:'Found an injured or lost animal? Report it instantly and our team responds within the hour.',page:'report'},
    {icon:'🐾',title:'Adopt a Pet',desc:'Give a rescued animal their forever home. Browse dogs, cats, horses, parrots & rabbits.',page:'adopt'},
    {icon:'💛',title:'Donate',desc:'Your donation feeds, heals, and shelters animals in need every single day.',page:'donate'},
    {icon:'📚',title:'Awareness',desc:'Learn first aid tips, animal care guides, and how to be a responsible rescuer.',page:'awareness'},
    {icon:'🤝',title:'Volunteer',desc:'Join our rescue team and make a hands-on difference in your community.',page:'volunteer'},
    {icon:'🩺',title:'Vet Appointment',desc:'Book an online vet consultation for your pet anytime, anywhere.',page:'contact'},
  ];
  return(
    <div>
      <section style={{minHeight:'100vh',background:'linear-gradient(135deg,#1a0e06 0%,#3d1f08 40%,#5C3317 70%,#E8621A 100%)',display:'flex',alignItems:'center',position:'relative',overflow:'hidden'}}>
        {['12rem','8rem','6rem'].map((s,i)=>(
          <div key={i} style={{position:'absolute',fontSize:s,opacity:.04,top:i===0?'10%':i===1?'60%':'30%',left:i===0?'70%':i===1?'80%':'85%',transform:`rotate(${i*30}deg)`,pointerEvents:'none'}}>🐾</div>
        ))}
        <div style={{maxWidth:1200,margin:'0 auto',padding:'100px 20px 60px',width:'100%'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center'}}>
            <div className="fade-in">
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(232,98,26,.2)',border:'1px solid rgba(232,98,26,.4)',color:G.orangeLt,padding:'6px 16px',borderRadius:50,fontSize:'0.8rem',fontWeight:800,letterSpacing:1.5,textTransform:'uppercase',marginBottom:24}}>
                🐶 Animal Rescue & Awareness Platform
              </div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.6rem,5vw,4.2rem)',color:'#fff',lineHeight:1.1,marginBottom:24}}>
                Every Animal<br/>Deserves a<br/><span style={{color:G.tan}}>Second Chance</span>
              </h1>
              <p style={{color:'#e8d5bb',fontSize:'1.1rem',fontWeight:300,lineHeight:1.7,marginBottom:40,maxWidth:480}}>
                PawCrest Network is Pakistan's dedicated platform for rescuing injured animals, facilitating adoptions, raising awareness, and connecting compassionate people with animals in need.
              </p>
              <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:48}}>
                <button onClick={()=>setPage('adopt')} style={{background:'transparent',color:G.tan,border:`2px solid ${G.tan}`,padding:'15px 32px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>🐾 Meet Animals</button>
                <button onClick={()=>setPage('donate')} style={{background:G.orange,color:'#fff',border:'none',padding:'15px 32px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer',boxShadow:'0 8px 24px rgba(232,98,26,.4)'}}>💛 Donate Now</button>
              </div>
              <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
                {stats.map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',color:G.tan,fontWeight:900}}>{n}</div>
                    <div style={{color:'#c8b090',fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:1}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,position:'relative'}}>
              {HERO_IMGS.map((src,i)=>(
                <div key={i} style={{borderRadius:i===0?'20px 20px 8px 8px':i===3?'8px 8px 20px 20px':'12px',overflow:'hidden',aspectRatio:'1',marginTop:i===1||i===3?28:0,boxShadow:'0 8px 32px rgba(0,0,0,.4)',border:'3px solid rgba(255,255,255,.1)',background:'rgba(232,98,26,.15)'}}>
                  <img src={src} alt="rescue animal" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>{e.target.style.display='none';}}/>
                </div>
              ))}
              <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:G.orange,borderRadius:'50%',width:56,height:56,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',boxShadow:'0 0 0 6px rgba(232,98,26,.3)'}}>🐾</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{padding:'90px 20px',background:G.cream}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:60}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.6rem',color:G.brown}}>What We Do</h2>
            <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
            <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:540,margin:'0 auto'}}>From emergency rescue to adoption — we cover every step of an animal's journey to safety.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24}}>
            {features.map(f=>(
              <button key={f.page} onClick={()=>setPage(f.page)}
                style={{background:'#fff',border:'none',borderRadius:20,padding:32,textAlign:'left',cursor:'pointer',boxShadow:'0 4px 20px rgba(92,51,23,.08)',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(232,98,26,.2)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(92,51,23,.08)';}}>
                <div style={{fontSize:'2.5rem',marginBottom:16}}>{f.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:G.brown,marginBottom:10}}>{f.title}</h3>
                <p style={{color:'#7a5c3a',fontSize:'0.93rem',lineHeight:1.6,marginBottom:20}}>{f.desc}</p>
                <span style={{color:G.orange,fontWeight:800,fontSize:'0.88rem'}}>Learn More →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:`linear-gradient(135deg,${G.brown},${G.orange})`,padding:'70px 20px',textAlign:'center'}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.4rem',color:'#fff',marginBottom:16}}>Spotted an Injured Animal?</h2>
        <p style={{color:'#fde0c8',fontSize:'1.1rem',maxWidth:500,margin:'0 auto 32px'}}>Don't wait. Use the Emergency button in the header or call us directly at <strong>+92 348 4522665</strong></p>
        <div style={{display:'inline-flex',alignItems:'center',gap:12,background:'rgba(255,255,255,.15)',padding:'16px 32px',borderRadius:50,border:'2px solid rgba(255,255,255,.3)'}}>
          <span style={{fontSize:'1.5rem'}}>📞</span>
          <span style={{color:'#fff',fontWeight:800,fontSize:'1.2rem'}}>+92 348 4522665</span>
        </div>
      </section>
    </div>
  );
}

function ReportPage({showToast}){
  const [form,setForm]=useState({type:'',location:'',condition:'',name:'',phone:'',notes:'',photo:null});
  const [submitted,setSubmitted]=useState(false);
  const [photoPreview,setPhotoPreview]=useState(null);
  const handlePhoto=e=>{const file=e.target.files[0];if(file){setForm({...form,photo:file});setPhotoPreview(URL.createObjectURL(file));}};
  const submit=()=>{
    if(!form.type||!form.location||!form.condition){showToast('Please fill required fields!','error');return;}
    setSubmitted(true);showToast('🚨 Report submitted! Our team is on the way.');
  };
  if(submitted) return(
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20,padding:40}}>
      <div style={{fontSize:'5rem'}}>✅</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.2rem',color:G.brown,textAlign:'center'}}>Report Submitted!</h2>
      <p style={{color:'#7a5c3a',fontSize:'1.1rem',textAlign:'center',maxWidth:440}}>Our rescue team has been notified. Response within <strong>60 minutes</strong>.</p>
      <div style={{background:'#fff',borderRadius:16,padding:'24px 32px',textAlign:'center',boxShadow:'0 4px 20px rgba(92,51,23,.1)'}}>
        <div style={{color:G.orange,fontWeight:800,fontSize:'1.1rem'}}>Your Report ID</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',color:G.brown,fontWeight:900}}>#RES-{Math.floor(Math.random()*9000)+1000}</div>
      </div>
      <button onClick={()=>setSubmitted(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'1rem'}}>Submit Another Report</button>
    </div>
  );
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.95rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:760,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#c0392b,#e74c3c)',borderRadius:20,padding:'32px',marginBottom:36,color:'#fff',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:8}}>🚨</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.2rem',marginBottom:8}}>Report an Animal</h1>
          <p style={{opacity:.9,fontSize:'1.05rem'}}>Found an injured, lost, or stray animal? Fill this form — our team responds within 60 minutes.</p>
          <div style={{marginTop:16,fontWeight:800,fontSize:'1.1rem'}}>📞 +92 348 4522665</div>
        </div>
        <div style={{background:'#fff',borderRadius:20,padding:36,boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
            <div><label style={lbl}>Animal Type *</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={inp}>
                <option value="">Select type...</option>
                <option>Dog</option><option>Cat</option><option>Bird</option><option>Horse</option><option>Parrot</option><option>Rabbit</option><option>Other</option>
              </select>
            </div>
            <div><label style={lbl}>Condition *</label>
              <select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} style={inp}>
                <option value="">Select condition...</option>
                <option value="injured">🩸 Injured</option><option value="lost">❓ Lost / Missing</option>
                <option value="stray">🏚️ Stray</option><option value="sick">🤒 Sick</option><option value="trapped">🪤 Trapped</option>
              </select>
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={lbl}>Location / Address *</label>
            <input type="text" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="e.g. Near Anarkali Bazaar, Lahore" style={inp}/>
            <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
              {['DHA Lahore','Gulberg','Model Town','Johar Town'].map(loc=>(
                <button key={loc} onClick={()=>setForm({...form,location:loc})} style={{background:'#f5e8d0',color:G.brown,border:'none',padding:'5px 12px',borderRadius:50,fontSize:'0.78rem',fontWeight:700,cursor:'pointer'}}>📍 {loc}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={lbl}>Upload Photo</label>
            <label style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'2px dashed #e0c9a8',borderRadius:12,padding:28,cursor:'pointer',background:photoPreview?'#fff8f0':'#fdf6ec'}}>
              {photoPreview?(<img src={photoPreview} alt="preview" style={{maxHeight:180,borderRadius:10,objectFit:'cover'}}/>):(
                <><div style={{fontSize:'2.5rem',marginBottom:8}}>📸</div><div style={{color:G.brown,fontWeight:700}}>Click to upload a photo</div><div style={{color:'#a07040',fontSize:'0.83rem'}}>JPG, PNG up to 10MB</div></>
              )}
              <input type="file" accept="image/*" onChange={handlePhoto} style={{display:'none'}}/>
            </label>
          </div>
          <div style={{marginBottom:20}}>
            <label style={lbl}>Additional Notes</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3} placeholder="Describe the animal's situation..." style={{...inp,resize:'none'}}/>
          </div>
          <div style={{background:'#f5e8d0',borderRadius:14,padding:20,marginBottom:24}}>
            <div style={{fontWeight:800,color:G.brown,marginBottom:14}}>📞 Your Contact Information</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div><label style={lbl}>Your Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={inp}/></div>
              <div><label style={lbl}>Phone Number</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+92 348 4522665" style={inp}/></div>
            </div>
          </div>
          <button onClick={submit} style={{width:'100%',background:'linear-gradient(135deg,#c0392b,#e74c3c)',color:'#fff',border:'none',padding:'15px',borderRadius:50,fontWeight:800,fontSize:'1.1rem',cursor:'pointer',boxShadow:'0 8px 24px rgba(192,57,43,.35)'}}>🚨 Submit Emergency Report</button>
        </div>
      </div>
    </div>
  );
}

function AdoptModal({animal,onClose,showToast}){
  const [form,setForm]=useState({name:'',email:'',phone:'',reason:''});
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const submit=()=>{
    if(!form.name||!form.email){showToast('Please fill in name and email!','error');return;}
    showToast(`🐾 Application for ${animal.name} submitted! We'll contact you soon.`);
    onClose();
  };
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.65)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:460,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,.4)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{background:G.brown,padding:'20px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.2rem',fontWeight:700}}>🐾 Adopt {animal.name}</span>
          <button onClick={onClose} style={{background:'none',border:'none',color:G.tan,fontSize:'1.5rem',cursor:'pointer'}}>✕</button>
        </div>
        <div style={{padding:28}}>
          <SmartImg srcs={getImgSrcs(animal)} alt={animal.name} style={{width:'100%',height:160,objectFit:'cover',borderRadius:12,marginBottom:20}}/>
          <div style={{marginBottom:16,background:'#f5e8d0',borderRadius:12,padding:'12px 16px'}}>
            <div style={{fontWeight:800,color:G.brown,fontSize:'0.95rem'}}>{animal.name} · {animal.breed}</div>
            <div style={{color:'#a07040',fontSize:'0.83rem'}}>{animal.age} · {animal.gender} · {animal.weight}</div>
          </div>
          {[['Full Name *','text','name','Your full name'],['Email *','email','email','your@email.com'],['Phone','tel','phone','+92 300 0000000']].map(([l,t,k,ph])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={{display:'block',fontWeight:700,color:G.brown,marginBottom:5,fontSize:'0.88rem'}}>{l}</label>
              <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={ph} style={inp}/>
            </div>
          ))}
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontWeight:700,color:G.brown,marginBottom:5,fontSize:'0.88rem'}}>Why do you want to adopt?</label>
            <textarea value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} rows={3} placeholder="Tell us about your home and lifestyle..." style={{...inp,resize:'none'}}/>
          </div>
          <button onClick={submit} style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'13px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>Submit Application 🐾</button>
        </div>
      </div>
    </div>
  );
}

function AnimalBlock({block,showToast}){
  const [modal,setModal]=useState(null);
  return(
    <section style={{marginBottom:64}}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:28,paddingBottom:16,borderBottom:`3px solid ${block.color}33`}}>
        <div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${block.color},${block.color}bb)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.9rem',boxShadow:`0 6px 18px ${block.color}44`,flexShrink:0}}>{block.emoji}</div>
        <div style={{flex:1}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',color:G.brown,marginBottom:3}}>{block.label}</h2>
          <p style={{color:'#a07040',fontSize:'0.93rem'}}>{block.desc}</p>
        </div>
        <div style={{background:`${block.color}18`,border:`1.5px solid ${block.color}44`,borderRadius:50,padding:'6px 18px',color:block.color,fontWeight:800,fontSize:'0.82rem',whiteSpace:'nowrap',flexShrink:0}}>
          {block.animals.length} Available
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(255px,1fr))',gap:20}}>
        {block.animals.map((animal,i)=>(
          <div key={i}
            style={{background:'#fff',borderRadius:18,overflow:'hidden',boxShadow:'0 4px 16px rgba(92,51,23,.09)',transition:'all .3s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 14px 36px ${block.color}2e`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(92,51,23,.09)';}}>
            <div style={{position:'relative',height:195,overflow:'hidden'}}>
              <SmartImg
                srcs={getImgSrcs(animal)}
                alt={animal.name}
                style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .4s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.07)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              />
              <div style={{position:'absolute',top:10,right:10,background:animal.status==='Available'?'#d4edda':'#fff3cd',color:animal.status==='Available'?'#155724':'#856404',padding:'3px 10px',borderRadius:50,fontSize:'0.7rem',fontWeight:800}}>
                {animal.status==='Available'?'✅ Available':'⏳ Pending'}
              </div>
            </div>
            <div style={{padding:18}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',color:G.brown,marginBottom:3}}>{animal.name}</h3>
              <p style={{color:'#a07040',fontSize:'0.82rem',marginBottom:10}}>{animal.breed} · {animal.age} · {animal.gender} · {animal.weight}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:14}}>
                {animal.tags.map(t=>(
                  <span key={t} style={{background:`${block.color}15`,color:block.color,fontSize:'0.7rem',fontWeight:700,padding:'3px 9px',borderRadius:50,border:`1px solid ${block.color}30`}}>{t}</span>
                ))}
              </div>
              <button onClick={()=>setModal(animal)} style={{width:'100%',background:`linear-gradient(135deg,${block.color},${block.color}cc)`,color:'#fff',border:'none',padding:'10px',borderRadius:50,fontWeight:700,fontSize:'0.88rem',cursor:'pointer',boxShadow:`0 4px 12px ${block.color}44`}}>
                🐾 Adopt {animal.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal&&<AdoptModal animal={modal} onClose={()=>setModal(null)} showToast={showToast}/>}
    </section>
  );
}

function AdoptPage({showToast}){
  const [activeFilter,setActiveFilter]=useState('all');
  const filters=[{id:'all',label:'🐾 All'},...ANIMAL_BLOCKS.map(b=>({id:b.id,label:b.label}))];
  const visibleBlocks=activeFilter==='all'?ANIMAL_BLOCKS:ANIMAL_BLOCKS.filter(b=>b.id===activeFilter);
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.8rem',color:G.brown}}>Animals for Adoption</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
          <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:580,margin:'0 auto'}}>Browse our animal families — 🐶 dogs, 🐱 cats, 🐎 horses, 🦜 parrots & 🐰 rabbits. Each one is vaccinated, vet-checked, and ready for a loving home.</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap',marginBottom:52}}>
          {filters.map(f=>(
            <button key={f.id} onClick={()=>setActiveFilter(f.id)}
              style={{background:activeFilter===f.id?G.orange:'#fff',color:activeFilter===f.id?'#fff':G.brown,border:activeFilter===f.id?`2px solid ${G.orange}`:'2px solid #e0c9a8',padding:'13px 28px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'1.05rem',transition:'all .2s'}}>
              {f.label}
            </button>
          ))}
        </div>
        {visibleBlocks.map(block=>(
          <AnimalBlock key={block.id} block={block} showToast={showToast}/>
        ))}
      </div>
    </div>
  );
}

function DonatePage({showToast}){
  const [selAmt,setSelAmt]=useState('₨500');
  const [custom,setCustom]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [donated,setDonated]=useState(false);
  const campaigns=[
    {title:'Emergency Medical Fund',collected:72000,target:100000,icon:'🩺',color:'#e74c3c'},
    {title:'Shelter & Food Program',collected:145000,target:200000,icon:'🏠',color:G.orange},
    {title:'Vaccination Drive',collected:38000,target:50000,icon:'💉',color:G.green},
  ];
  const submit=()=>{
    if(!name){showToast('Please enter your name!','error');return;}
    showToast(`💛 Thank you ${name}! Donated ${custom||selAmt} successfully.`);
    setDonated(true);
  };
  const impacts=[
    {amt:'₨100',desc:'Feeds one animal for a week'},{amt:'₨500',desc:'Covers basic vet checkup'},
    {amt:'₨1000',desc:'Vaccination for one animal'},{amt:'₨5000',desc:'Emergency surgery support'},
  ];
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.8rem',color:G.brown}}>Support Our Mission</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
          <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:540,margin:'0 auto'}}>Every rupee goes directly toward rescuing, healing, and rehoming animals in need across Pakistan.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:48}}>
          {impacts.map(i=>(
            <div key={i.amt} style={{background:'#fff',borderRadius:16,padding:20,textAlign:'center',boxShadow:'0 4px 16px rgba(92,51,23,.08)',border:`2px solid ${G.orange}22`}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',color:G.orange,fontWeight:900}}>{i.amt}</div>
              <div style={{color:'#7a5c3a',fontSize:'0.9rem',marginTop:6}}>{i.desc}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:48}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',color:G.brown,marginBottom:28,textAlign:'center'}}>Active Campaigns</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:20}}>
            {campaigns.map(c=>{
              const pct=Math.round((c.collected/c.target)*100);
              return(
                <div key={c.title} style={{background:'#fff',borderRadius:18,padding:28,boxShadow:'0 4px 20px rgba(92,51,23,.08)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                    <div style={{width:48,height:48,background:`${c.color}22`,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem'}}>{c.icon}</div>
                    <div><div style={{fontWeight:800,color:G.brown,fontSize:'1rem'}}>{c.title}</div><div style={{color:'#a07040',fontSize:'0.82rem'}}>{pct}% funded</div></div>
                  </div>
                  <div style={{background:'#f5e8d0',borderRadius:50,height:12,marginBottom:10,overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${c.color},${c.color}cc)`,borderRadius:50}}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',fontWeight:700}}>
                    <span style={{color:c.color}}>₨{c.collected.toLocaleString()} raised</span>
                    <span style={{color:'#a07040'}}>Goal: ₨{c.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!donated?(
          <div style={{background:`linear-gradient(135deg,${G.brown},${G.dark})`,borderRadius:24,padding:40,color:'#fff',maxWidth:600,margin:'0 auto'}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',color:G.tan,marginBottom:8,textAlign:'center'}}>Make a Donation</h3>
            <p style={{color:'#c8a87a',textAlign:'center',marginBottom:28}}>Choose an amount or enter your own</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
              {['₨100','₨500','₨1000','₨5000'].map(a=>(
                <button key={a} onClick={()=>{setSelAmt(a);setCustom('');}} style={{background:selAmt===a&&!custom?G.orange:'rgba(255,255,255,.1)',color:'#fff',border:'2px solid rgba(255,255,255,.2)',padding:'11px 6px',borderRadius:12,fontWeight:700,cursor:'pointer',fontSize:'0.9rem'}}>{a}</button>
              ))}
            </div>
            <input type="text" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Custom amount (₨)" style={{width:'100%',padding:'12px 16px',borderRadius:50,border:'none',textAlign:'center',fontWeight:700,marginBottom:16,fontSize:'1rem',outline:'none',background:'rgba(255,255,255,.12)',color:'#fff'}}/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{padding:'12px',borderRadius:12,border:'none',background:'rgba(255,255,255,.12)',color:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"}}/>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{padding:'12px',borderRadius:12,border:'none',background:'rgba(255,255,255,.12)',color:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"}}/>
            </div>
            <button onClick={submit} style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'15px',borderRadius:50,fontWeight:800,fontSize:'1.05rem',cursor:'pointer',boxShadow:'0 8px 24px rgba(232,98,26,.4)'}}>💛 Donate {custom||selAmt} Now</button>
          </div>
        ):(
          <div style={{textAlign:'center',padding:48}}>
            <div style={{fontSize:'4rem',marginBottom:16}}>💛</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.2rem',color:G.brown,marginBottom:12}}>Thank You, {name}!</h2>
            <p style={{color:'#7a5c3a',fontSize:'1.1rem',maxWidth:400,margin:'0 auto 24px'}}>Your donation is already making a difference.</p>
            <button onClick={()=>setDonated(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'1rem'}}>Donate Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AwarenessPage(){
  const [activeTab,setActiveTab]=useState('firstaid');
  const tabs=[{id:'firstaid',label:'🩺 First Aid Tips'},{id:'care',label:'🐾 Animal Care'},{id:'rescue',label:'🚨 How to Help'}];
  const firstaid=[
    {icon:'🩸',title:'For Bleeding Animals',steps:["Stay calm — don't panic","Gently restrain the animal","Apply clean cloth and gentle pressure","Do NOT remove embedded objects","Get to a vet immediately"]},
    {icon:'🦴',title:'Suspected Fracture',steps:["Do not move the animal unnecessarily","Support the injured limb gently","Use a flat surface as a stretcher","Keep the animal warm and quiet","Call emergency vet line"]},
    {icon:'🌡️',title:'Heatstroke',steps:["Move animal to shade/cool area","Apply cool (not cold) water to body","Offer small sips of water","Fan gently to aid cooling","Seek vet care immediately"]},
    {icon:'🐕',title:'Hit by Vehicle',steps:["Approach slowly and calmly","Do not muzzle if breathing issues","Slide onto a flat board carefully","Keep head slightly elevated","Rush to nearest emergency vet"]},
  ];
  const care=[
    {icon:'💧',title:'Hydration',desc:"Always ensure fresh, clean water is available. Animals dehydrate much faster than humans, especially in Pakistan's summer heat."},
    {icon:'🥩',title:'Nutrition',desc:"Feed age-appropriate, balanced meals. Avoid onions, grapes, chocolate — these are toxic to dogs and cats."},
    {icon:'🏃',title:'Exercise',desc:"Dogs need daily walks and mental stimulation. Even indoor cats benefit from interactive play for 20–30 mins daily."},
    {icon:'🩺',title:'Regular Vet Visits',desc:"Annual checkups and vaccinations protect against rabies, parvovirus, and other common diseases in Pakistan."},
    {icon:'🛁',title:'Grooming',desc:"Regular brushing prevents matting and skin issues. Check ears weekly for infection signs."},
    {icon:'❤️',title:'Love & Socialization',desc:"Animals need daily interaction and affection. Lonely animals develop anxiety and behavioral problems."},
  ];
  const rescue=[
    {step:'1',title:'Stay Calm',desc:'Approach slowly. Speak softly. Sudden movements scare injured animals.'},
    {step:'2',title:'Assess Safety',desc:'Check for traffic and other hazards before approaching. Your safety comes first.'},
    {step:'3',title:'Call PawCrest Network',desc:'Call +92 348 4522665 or use our emergency report button for immediate help.'},
    {step:'4',title:'Contain the Animal',desc:'Use a box, bag, or towel to gently contain small animals. For large animals, keep them still.'},
    {step:'5',title:'Keep Warm',desc:'Cover with a light cloth to reduce shock. Avoid excessive handling.'},
    {step:'6',title:'Do Not Feed',desc:'Do not give food or water to injured animals — it can interfere with emergency treatment.'},
  ];
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.8rem',color:G.brown}}>Awareness Hub</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
          <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:520,margin:'0 auto'}}>Knowledge saves lives. Learn how to help, care for, and protect animals in your community.</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:12,marginBottom:40,flexWrap:'wrap'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{background:activeTab===t.id?G.brown:'#fff',color:activeTab===t.id?'#fff':G.brown,border:`2px solid ${activeTab===t.id?G.brown:'#e0c9a8'}`,padding:'10px 24px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'0.95rem',transition:'all .2s'}}>{t.label}</button>
          ))}
        </div>
        {activeTab==='firstaid'&&(<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>{firstaid.map(f=>(<div key={f.title} style={{background:'#fff',borderRadius:18,padding:28,boxShadow:'0 4px 20px rgba(92,51,23,.08)'}}><div style={{fontSize:'2.2rem',marginBottom:12}}>{f.icon}</div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',color:G.brown,marginBottom:14}}>{f.title}</h3><ol style={{paddingLeft:18,color:'#7a5c3a',fontSize:'0.9rem',lineHeight:2}}>{f.steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>))}</div>)}
        {activeTab==='care'&&(<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>{care.map(c=>(<div key={c.title} style={{background:'#fff',borderRadius:18,padding:28,boxShadow:'0 4px 20px rgba(92,51,23,.08)'}}><div style={{fontSize:'2.2rem',marginBottom:12}}>{c.icon}</div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',color:G.brown,marginBottom:10}}>{c.title}</h3><p style={{color:'#7a5c3a',fontSize:'0.9rem',lineHeight:1.7}}>{c.desc}</p></div>))}</div>)}
        {activeTab==='rescue'&&(<div style={{display:'flex',flexDirection:'column',gap:16}}>{rescue.map(r=>(<div key={r.step} style={{background:'#fff',borderRadius:16,padding:24,display:'flex',gap:20,alignItems:'flex-start',boxShadow:'0 4px 16px rgba(92,51,23,.08)'}}><div style={{width:48,height:48,background:`linear-gradient(135deg,${G.orange},${G.orangeLt})`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:'1.2rem',flexShrink:0}}>{r.step}</div><div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',color:G.brown,marginBottom:6}}>{r.title}</h3><p style={{color:'#7a5c3a',fontSize:'0.93rem',lineHeight:1.6}}>{r.desc}</p></div></div>))}</div>)}
      </div>
    </div>
  );
}

function VolunteerPage({showToast}){
  const [form,setForm]=useState({name:'',email:'',phone:'',city:'',role:'',experience:'',availability:''});
  const [done,setDone]=useState(false);
  const roles=[
    {icon:'🚑',title:'Rescue Responder',desc:'Be first on scene for emergency animal rescues. Requires physical fitness.'},
    {icon:'🏠',title:'Foster Parent',desc:'Provide temporary home and care for rescued animals awaiting adoption.'},
    {icon:'📱',title:'Social Media Volunteer',desc:'Help spread awareness and manage our online presence and campaigns.'},
    {icon:'🩺',title:'Vet Assistant',desc:'Support our medical team during checkups and procedures (vet students welcome).'},
    {icon:'🚗',title:'Transport Volunteer',desc:'Drive rescued animals to vets, shelters, or foster homes across the city.'},
    {icon:'📚',title:'Awareness Educator',desc:'Visit schools and communities to spread animal welfare education.'},
  ];
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};
  const submit=()=>{
    if(!form.name||!form.email||!form.role){showToast('Please fill required fields!','error');return;}
    setDone(true);showToast('🤝 Welcome to the PawCrest Network team!');
  };
  if(done) return(
    <div style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,padding:40,textAlign:'center'}}>
      <div style={{fontSize:'5rem'}}>🤝</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.2rem',color:G.brown}}>Welcome, {form.name}!</h2>
      <p style={{color:'#7a5c3a',fontSize:'1.1rem',maxWidth:440}}>You're now part of PawCrest Network's rescue family. We'll reach out within 48 hours.</p>
      <button onClick={()=>setDone(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'1rem'}}>Back</button>
    </div>
  );
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.8rem',color:G.brown}}>Join the Rescue Team</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
          <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:520,margin:'0 auto'}}>Be the reason an animal survives. Join PawCrest Network's growing volunteer family across Pakistan.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20,marginBottom:56}}>
          {roles.map(r=>(
            <div key={r.title} style={{background:'#fff',borderRadius:18,padding:24,boxShadow:'0 4px 16px rgba(92,51,23,.08)',cursor:'pointer',transition:'all .3s',border:'2px solid transparent'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=G.orange;e.currentTarget.style.transform='translateY(-4px)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent';e.currentTarget.style.transform='none';}}>
              <div style={{fontSize:'2.2rem',marginBottom:10}}>{r.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:G.brown,fontSize:'1.1rem',marginBottom:8}}>{r.title}</h3>
              <p style={{color:'#7a5c3a',fontSize:'0.88rem',lineHeight:1.6}}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={{background:G.brown,borderRadius:24,padding:40,color:'#fff',maxWidth:720,margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.9rem',marginBottom:24,textAlign:'center'}}>Volunteer Registration</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            {[['Full Name *','text','name','Your name'],['Email *','email','email','your@email.com'],['Phone','tel','phone','+92 348 4522665'],['City','text','city','Lahore, Karachi...']].map(([l,t,k,ph])=>(
              <div key={k}><label style={{...lbl,color:G.tan}}>{l}</label><input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={ph} style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:'#fff'}}/></div>
            ))}
          </div>
          <div style={{marginBottom:16}}><label style={{...lbl,color:G.tan}}>Preferred Role *</label>
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:form.role?'#fff':'#c8a87a'}}>
              <option value="">Choose a role...</option>{roles.map(r=><option key={r.title} value={r.title}>{r.icon} {r.title}</option>)}
            </select>
          </div>
          <div style={{marginBottom:16}}><label style={{...lbl,color:G.tan}}>Availability</label>
            <select value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})} style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:form.availability?'#fff':'#c8a87a'}}>
              <option value="">Select availability...</option><option>Weekdays only</option><option>Weekends only</option><option>Evenings only</option><option>Flexible / Anytime</option>
            </select>
          </div>
          <div style={{marginBottom:24}}><label style={{...lbl,color:G.tan}}>Experience with Animals</label>
            <textarea value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} rows={3} placeholder="Any previous experience with animals or volunteering..." style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:'#fff',resize:'none'}}/>
          </div>
          <button onClick={submit} style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'15px',borderRadius:50,fontWeight:800,fontSize:'1.05rem',cursor:'pointer',boxShadow:'0 8px 24px rgba(232,98,26,.4)'}}>🤝 Join PawCrest Network Rescue Team</button>
        </div>
      </div>
    </div>
  );
}

function ContactPage({showToast}){
  const [tab,setTab]=useState('contact');
  const [cf,setCf]=useState({name:'',email:'',phone:'',msg:''});
  const [vf,setVf]=useState({petName:'',petType:'',ownerName:'',email:'',phone:'',date:'',time:'',issue:''});
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};
  const submitContact=()=>{if(!cf.name||!cf.email||!cf.msg){showToast('Please fill all fields!','error');return;}showToast("💌 Message sent! We'll reply within 24 hours.");setCf({name:'',email:'',phone:'',msg:''});};
  const submitVet=()=>{if(!vf.petName||!vf.ownerName||!vf.email||!vf.date){showToast('Please fill required fields!','error');return;}showToast(`🩺 Vet appointment booked for ${vf.petName} on ${vf.date}!`);setVf({petName:'',petType:'',ownerName:'',email:'',phone:'',date:'',time:'',issue:''});};
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.8rem',color:G.brown}}>Contact & Vet Booking</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:12,marginBottom:40}}>
          {[['contact','📞 Contact Us'],['vet','🩺 Book Vet Appointment']].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)} style={{background:tab===v?G.orange:'#fff',color:tab===v?'#fff':G.brown,border:`2px solid ${tab===v?G.orange:'#e0c9a8'}`,padding:'11px 28px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'0.95rem',transition:'all .2s'}}>{l}</button>
          ))}
        </div>
        {tab==='contact'&&(
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:32,alignItems:'start'}}>
            <div>
              <div style={{background:G.brown,borderRadius:20,padding:32,marginBottom:20}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.4rem',marginBottom:24}}>Get in Touch</h3>
                {[['📍','Address','123 Rescue Lane, DHA Phase 5, Lahore, Pakistan'],['📞','Emergency Hotline','+92 348 4522665'],['✉️','Email','hello@pawcrestnetwork.org'],['🕐','Office Hours','Mon–Sat: 9am–7pm | Emergency: 24/7']].map(([icon,title,val])=>(
                  <div key={title} style={{display:'flex',gap:14,marginBottom:20}}>
                    <div style={{width:44,height:44,background:G.orange,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{icon}</div>
                    <div><div style={{color:G.tan,fontWeight:700,fontSize:'0.88rem'}}>{title}</div><div style={{color:'#c8a87a',fontSize:'0.9rem',marginTop:2}}>{val}</div></div>
                  </div>
                ))}
              </div>
              <div style={{borderRadius:20,overflow:'hidden',boxShadow:'0 4px 20px rgba(92,51,23,.15)'}}>
                <div style={{background:'#e8d5bb',padding:'12px 16px'}}><span style={{fontWeight:700,color:G.brown,fontSize:'0.88rem'}}>📍 Our Location — Lahore, Pakistan</span></div>
                <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=74.28,31.45,74.42,31.55&layer=mapnik&marker=31.5,74.35" width="100%" height="220" style={{border:'none',display:'block'}} loading="lazy"/>
                <div style={{background:'#f5e8d0',padding:'8px 16px',textAlign:'center'}}><a href="https://www.openstreetmap.org/?mlat=31.5&mlon=74.35#map=13/31.5/74.35" target="_blank" rel="noreferrer" style={{color:G.orange,fontWeight:700,fontSize:'0.82rem',textDecoration:'none'}}>🗺️ Open in Full Map →</a></div>
              </div>
            </div>
            <div style={{background:'#fff',borderRadius:20,padding:36,boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:G.brown,fontSize:'1.5rem',marginBottom:24}}>Send Us a Message</h3>
              {[['Full Name *','text','name','Your name'],['Email Address *','email','email','your@email.com'],['Phone','tel','phone','+92 348 4522665']].map(([l,t,k,ph])=>(
                <div key={k} style={{marginBottom:16}}><label style={lbl}>{l}</label><input type={t} value={cf[k]} onChange={e=>setCf({...cf,[k]:e.target.value})} placeholder={ph} style={inp}/></div>
              ))}
              <div style={{marginBottom:20}}><label style={lbl}>Message *</label><textarea value={cf.msg} onChange={e=>setCf({...cf,msg:e.target.value})} rows={5} placeholder="How can we help you?" style={{...inp,resize:'none'}}/></div>
              <button onClick={submitContact} style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'14px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>Send Message 💌</button>
            </div>
          </div>
        )}
        {tab==='vet'&&(
          <div style={{maxWidth:700,margin:'0 auto'}}>
            <div style={{background:`linear-gradient(135deg,${G.green},#1a5c35)`,borderRadius:20,padding:32,color:'#fff',marginBottom:28,textAlign:'center'}}>
              <div style={{fontSize:'3rem',marginBottom:12}}>🩺</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',marginBottom:8}}>Online Vet Consultation</h2>
              <p style={{opacity:.85}}>Book a video or chat consultation with our certified veterinarians — available 7 days a week.</p>
              <div style={{marginTop:16,fontWeight:800,fontSize:'1.1rem'}}>📞 +92 348 4522665</div>
            </div>
            <div style={{background:'#fff',borderRadius:20,padding:36,boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                <div><label style={lbl}>Pet Name *</label><input value={vf.petName} onChange={e=>setVf({...vf,petName:e.target.value})} placeholder="e.g. Buddy" style={inp}/></div>
                <div><label style={lbl}>Pet Type</label><select value={vf.petType} onChange={e=>setVf({...vf,petType:e.target.value})} style={inp}><option value="">Select...</option><option>Dog</option><option>Cat</option><option>Horse</option><option>Parrot</option><option>Rabbit</option><option>Other</option></select></div>
                <div><label style={lbl}>Your Name *</label><input value={vf.ownerName} onChange={e=>setVf({...vf,ownerName:e.target.value})} placeholder="Owner name" style={inp}/></div>
                <div><label style={lbl}>Email *</label><input type="email" value={vf.email} onChange={e=>setVf({...vf,email:e.target.value})} placeholder="your@email.com" style={inp}/></div>
                <div><label style={lbl}>Preferred Date *</label><input type="date" value={vf.date} onChange={e=>setVf({...vf,date:e.target.value})} style={inp}/></div>
                <div><label style={lbl}>Preferred Time</label><select value={vf.time} onChange={e=>setVf({...vf,time:e.target.value})} style={inp}><option value="">Select time...</option>{['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t=><option key={t}>{t}</option>)}</select></div>
              </div>
              <div style={{marginBottom:24}}><label style={lbl}>Describe the Issue</label><textarea value={vf.issue} onChange={e=>setVf({...vf,issue:e.target.value})} rows={4} placeholder="Describe your pet's symptoms or concern in detail..." style={{...inp,resize:'none'}}/></div>
              <button onClick={submitVet} style={{width:'100%',background:`linear-gradient(135deg,${G.green},#1a5c35)`,color:'#fff',border:'none',padding:'15px',borderRadius:50,fontWeight:800,fontSize:'1.05rem',cursor:'pointer',boxShadow:'0 8px 24px rgba(45,122,79,.4)'}}>🩺 Book Vet Appointment</button>
              <p style={{textAlign:'center',color:'#a07040',fontSize:'0.82rem',marginTop:14}}>⚡ Confirmation sent via email within 30 minutes · Fee: ₨500–₨1500</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({setPage}){
  return(
    <footer style={{background:G.dark,color:'#a07040',padding:'48px 20px 24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:40,marginBottom:40}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',color:G.tan,marginBottom:12}}>🐾 PawCrest <span style={{color:G.orangeLt}}>Network</span></div>
            <p style={{fontSize:'0.9rem',lineHeight:1.7,maxWidth:320}}>Pakistan's dedicated animal rescue, adoption, and awareness platform. Every street animal deserves a safe, loving home.</p>
          </div>
          <div>
            <div style={{color:G.tan,fontWeight:800,marginBottom:14,fontSize:'0.9rem',letterSpacing:1,textTransform:'uppercase'}}>Quick Links</div>
            {PAGES.map(p=>(<div key={p} style={{marginBottom:8}}><button onClick={()=>{setPage(p);window.scrollTo(0,0);}} style={{background:'none',border:'none',color:'#a07040',cursor:'pointer',fontSize:'0.9rem',padding:0}} onMouseEnter={e=>e.currentTarget.style.color=G.orangeLt} onMouseLeave={e=>e.currentTarget.style.color='#a07040'}>{PAGE_LABELS[p]}</button></div>))}
          </div>
          <div>
            <div style={{color:G.tan,fontWeight:800,marginBottom:14,fontSize:'0.9rem',letterSpacing:1,textTransform:'uppercase'}}>Emergency</div>
            <div style={{background:`${G.red}22`,border:`1px solid ${G.red}44`,borderRadius:12,padding:16}}>
              <div style={{color:'#e74c3c',fontWeight:800,fontSize:'0.95rem',marginBottom:4}}>🚨 24/7 Hotline</div>
              <div style={{color:'#f5a08a',fontWeight:700}}>+92 348 4522665</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:20,textAlign:'center',fontSize:'0.85rem'}}>
          Made with <span style={{color:G.orange}}>❤️</span> for street animals everywhere &nbsp;·&nbsp; © 2024 PawCrest Network · Pakistan
        </div>
      </div>
    </footer>
  );
}

export default function App(){
  const [page,setPage]=useState('home');
  const [toast,setToast]=useState({show:false,msg:'',type:'success'});
  const showToast=(msg,type='success')=>{setToast({show:true,msg,type});setTimeout(()=>setToast({show:false,msg:'',type:'success'}),4500);};
  const pages={
    home:<HomePage setPage={setPage}/>,report:<ReportPage showToast={showToast}/>,adopt:<AdoptPage showToast={showToast}/>,
    donate:<DonatePage showToast={showToast}/>,awareness:<AwarenessPage/>,volunteer:<VolunteerPage showToast={showToast}/>,contact:<ContactPage showToast={showToast}/>,
  };
  return(<div><style>{globalStyle}</style><Navbar page={page} setPage={setPage}/>{pages[page]}<Footer setPage={setPage}/><Toast msg={toast.msg} show={toast.show} type={toast.type}/></div>);
}
