import React, { useEffect, useState } from 'react'

function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

const card = { background:'#fff', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,.08)' }
const btn = { padding:'.4rem .9rem', borderRadius:'6px', border:'none', cursor:'pointer', fontWeight:600 }

export default function App() {
  const path = usePath()
  const [props, setProps] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ propertyType:'', city:'', bedrooms:'' })
  const [applied, setApplied] = useState({ propertyType:'', city:'', bedrooms:'' })
  const op = path === '/comprar' ? 'VENTA' : path === '/alquilar' ? 'ALQUILER' : null
  const [tipoSel, setTipoSel] = useState([])
  const [zonaSel, setZonaSel] = useState([])
const [bedMin, setBedMin] = useState(1)
const [bedMax, setBedMax] = useState(20)
const [priceMin, setPriceMin] = useState('')
const [priceMax, setPriceMax] = useState('')

  function MultiSelect({label,options,value,onChange}){
    const [open,setOpen]=useState(false)
    return React.createElement('div',{style:{position:'relative',minWidth:'160px'}},
      React.createElement('button',{style:{width:'100%',padding:'.7rem 1rem',borderRadius:'6px',border:'1px solid #d1d5db',textAlign:'left',background:'#fff',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',color:'#111'},onClick:()=>setOpen(!open)}, value.length? value.join(', '):label, open?' ▲':' ▼'),
      open && React.createElement('div',{style:{position:'absolute',top:'100%',left:0,right:0,background:'#fff',border:'1px solid #d1d5db',borderRadius:'6px',boxShadow:'0 4px 12px rgba(0,0,0,.15)',zIndex:10,maxHeight:'220px',overflowY:'auto'}},
        options.map(o=>React.createElement('label',{key:o,style:{display:'flex',alignItems:'center',padding:'.4rem .8rem',cursor:'pointer',color:'#111'}},
          React.createElement('input',{type:'checkbox',checked:value.includes(o),onChange:()=>onChange(value.includes(o)?value.filter(x=>x!==o):[...value,o]),style:{marginRight:'.5rem'}}),o))
      )
    )
  }

  useEffect(() => {
    setPage(0)
  }, [path])

  useEffect(() => {
    const params = new URLSearchParams({ page, size:16 })
    if (op) params.set('operationType', op)
    if (tipoSel.length) params.set('propertyType', tipoSel[0])
    if (zonaSel.length) params.set('city', zonaSel[0])
    if (bedMin>1) params.set('bedrooms', bedMin)
    if (priceMin) params.set('minPrice', priceMin)
if (priceMax) params.set('maxPrice', priceMax)
    const url = `http://localhost:8080/api/properties?${params.toString()}`
    fetch(url).then(r=>r.json()).then(d=>{setProps(Array.isArray(d)?d:(d.content||[]));setTotalPages(d.totalPages||1)}).catch(()=>setProps([]))
  }, [page, op, applied, bedMin, priceMin, priceMax])

  useEffect(() => {
    const m = path.match(/^\/propiedad\/(\d+)$/)
    if (m) {
      fetch(`http://localhost:8080/api/properties/${m[1]}`).then(r=>r.json()).then(setSelected).catch(()=>setSelected(null))
    } else setSelected(null)
  }, [path])

  const nav = (to) => { window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')) }

  const header = (
<header style={{background:'#ffffff',color:'#111827',padding:'1rem 2rem',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 2px 10px rgba(0,0,0,.08)',borderBottom:'1px solid #e5e7eb'}}>
      <a href="/" onClick={(e)=>{e.preventDefault();nav('/')}} style={{display:'flex',alignItems:'center',background:'#fff',padding:'.3rem .6rem',borderRadius:'8px'}}>
        <img src="/logo.png" alt="CazaCasas" style={{height:'4.5rem',borderRadius:'6px'}} />
      </a>
        <nav style={{display:'flex',gap:'1rem',fontSize:'1rem',alignItems:'center'}}>
{['/','/comprar','/alquilar'].map((p,i)=>(
<a key={p} href={p} onClick={(e)=>{e.preventDefault();nav(p)}} style={{color:'#111827',textDecoration:'none',padding:'.4rem .8rem',borderRadius:'6px',background: path===p|| (p==='/'&&path==='/') ? '#f3f4f6' : 'transparent'}}>{['Inicio','Comprar','Alquilar'][i]}</a>
))}
        <a href="#como-trabajamos" onClick={(e)=>{e.preventDefault();nav('/');setTimeout(()=>{const el=document.getElementById('como-trabajamos');if(el)el.scrollIntoView({behavior:'smooth'})},100)}} style={{color:'#111827',textDecoration:'none'}}>Cómo trabajamos</a>
        <a href="#contacto" style={{color:'#111827',textDecoration:'none'}}>Contacto</a>
        <a href="#" style={{color:'#111827',textDecoration:'none',background:'#f3f4f6',padding:'.4rem .8rem',borderRadius:'6px'}}>Ingresar</a>
      </nav>
    </header>
  )

  const footer = (
    <footer id="contacto" style={{background:'#111827',color:'#fff',padding:'2rem',marginTop:'3rem'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'2rem'}}>
        <div><img src="/logo.png" alt="CazaCasas" style={{height:'3rem'}} /><p style={{marginTop:'.5rem',color:'#9ca3af'}}>Inmobiliaria. Compra, venta y alquiler de propiedades.</p></div>
        <div><h4>Propiedades</h4><p>Comprar</p><p>Alquilar</p><p>Emprendimientos</p></div>
        <div><h4>Empresa</h4><p>Nosotros</p><p>Tasaciones</p><p>Trabajá con nosotros</p><p>Contacto</p></div>
        <div><h4>Contacto</h4><p>[TELÉFONO]</p><p>[EMAIL]</p><p>[DIRECCIÓN DE LA OFICINA]</p></div>
      </div>
      <p style={{textAlign:'center',color:'#6b7280',marginTop:'2rem',borderTop:'1px solid #374151',paddingTop:'1rem'}}>© 2026 Cazacasas. Todos los derechos reservados.</p>
    </footer>
  )

  if (selected) {
    return (
      <div style={{minHeight:'100vh',background:'#f3f4f6',fontFamily:'sans-serif'}}>
        {header}
        <main style={{maxWidth:'1100px',margin:'2rem auto',padding:'0 1rem'}}>
          <p style={{color:'#6b7280',marginBottom:'1rem'}}>Inicio / {selected.operationType==='VENTA'?'Comprar':'Alquilar'} / {selected.city}</p>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'2rem'}}>
            <div>
              <div style={{...card,marginBottom:'1rem'}}>
                <img src={(selected.images&&selected.images[0])||'/casa1.jpg'} alt={selected.title} style={{width:'100%',height:'400px',objectFit:'cover'}} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.5rem',marginBottom:'1rem'}}>
                {(selected.images||[]).slice(1,4).map((im,i)=>(<img key={i} src={im} alt="" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'8px'}} />))}
              </div>
              <div style={{textAlign:'right',marginBottom:'.5rem'}}>
                <a href="#" style={{color:'#008bb6',textDecoration:'none',fontSize:'.85rem'}}>Ver todas las fotos</a>
              </div>
              <h1 style={{margin:'0 0 .5rem'}}>{selected.title}</h1>
              <p style={{color:'#6b7280',margin:'0 0 1rem'}}>{selected.neighborhood? selected.neighborhood+', ':''}{selected.city}, {selected.province}</p>
              <p style={{fontSize:'1.8rem',fontWeight:'bold',color:'#059669',margin:'0 0 1rem'}}>U$S {Number(selected.price).toLocaleString()}</p>
              <p style={{color:'#6b7280',margin:'0 0 1rem'}}>Expensas: ARS [MONTO]</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',margin:'1rem 0'}}>
                {[['Ambientes',selected.rooms],['Dormitorios',selected.bedrooms],['Baños',selected.bathrooms],['Superficie',selected.coveredArea+' m²'],['Cochera',selected.parkingSpaces],['Antigüedad','8 años']].map(([k,v])=>(
                  <div key={k} style={{background:'#f9fafb',padding:'1rem',borderRadius:'8px',textAlign:'center'}}>
                    <div style={{fontSize:'1.2rem',fontWeight:'bold'}}>{v}</div>
                    <div style={{color:'#6b7280',fontSize:'.85rem'}}>{k}</div>
                  </div>
                ))}
              </div>
              <h3>Descripción</h3>
              <p style={{color:'#374151',lineHeight:1.6}}>{selected.description} [Completar con la descripción real de la propiedad.]</p>
              <h3>Comodidades</h3>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem'}}>
                {['Balcón','Aire acondicionado','Cochera cubierta','Seguridad 24 hs','SUM y parrilla','Lavadero'].map(c=>(
                  <span key={c} style={{background:'#e5e7eb',padding:'.3rem .7rem',borderRadius:'999px',fontSize:'.85rem'}}>{c}</span>
                ))}
              </div>
              <h3 style={{marginTop:'1rem'}}>Ubicación</h3>
              <div style={{background:'#e5e7eb',height:'200px',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#6b7280'}}>Mapa de la zona</div>
            </div>
            <div>
              <div style={{...card,padding:'1.5rem',marginBottom:'1rem'}}>
                <h3 style={{marginTop:0}}>[NOMBRE DEL ASESOR]</h3>
                <p style={{color:'#6b7280',margin:'0 0 1rem'}}>Asesor inmobiliario</p>
                <input placeholder="Nombre" style={{width:'100%',padding:'.6rem',marginBottom:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
                <input placeholder="Email" style={{width:'100%',padding:'.6rem',marginBottom:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
                <input placeholder="Teléfono" style={{width:'100%',padding:'.6rem',marginBottom:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
                <textarea placeholder="Mensaje" rows={4} style={{width:'100%',padding:'.6rem',marginBottom:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
                <button style={{...btn,background:'#008bb6',color:'#fff',width:'100%',marginBottom:'.5rem'}}>Enviar consulta</button>
                <button style={{...btn,background:'#25d366',color:'#fff',width:'100%'}}>Escribir por WhatsApp</button>
              </div>
            </div>
          </div>
          <h3 style={{marginTop:'2rem'}}>Propiedades similares</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1rem'}}>
            {props.slice(0,3).map(p=>(
              <div key={p.id} style={card}>
                <img src={(p.images&&p.images[0])||'/casa1.jpg'} alt={p.title} style={{width:'100%',height:'150px',objectFit:'cover'}} />
                <div style={{padding:'.8rem'}}>
                  <span style={{display:'inline-block',padding:'.15rem .5rem',borderRadius:'4px',fontSize:'.7rem',fontWeight:'bold',color:'#fff',background:p.operationType==='VENTA'?'#2563eb':'#059669',marginBottom:'.4rem'}}>{p.operationType==='VENTA'?'Venta':'Alquiler'}</span>
                  <h4 style={{margin:'0 0 .3rem'}}>{p.title}</h4>
                  <p style={{color:'#6b7280',fontSize:'.85rem',margin:'0 0 .4rem'}}>{p.city}, CABA</p>
                  <p style={{color:'#059669',fontWeight:'bold',margin:0}}>U$S {Number(p.price).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        {footer}
      </div>
    )
  }

  if (path === '/' ) {
    return (
      <div style={{minHeight:'100vh',background:'#f3f4f6',fontFamily:'sans-serif'}}>
        {header}
        <section style={{background:'linear-gradient(180deg,#008bb6,#005f7a)',color:'#fff',padding:'4rem 2rem',textAlign:'center'}}>
          <h1 style={{fontSize:'2.5rem',margin:'0 0 1rem'}}>Cazamos la casa ideal para vos.</h1>
          <p style={{maxWidth:'700px',margin:'0 auto 2rem',fontSize:'1.1rem'}}>Comprá, alquilá o vendé tu propiedad con una inmobiliaria que te acompaña en cada paso.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>nav('/comprar')} style={{...btn,background:'#ff4928',color:'#fff'}}>Comprar</button>
            <button onClick={()=>nav('/alquilar')} style={{...btn,background:'#fff',color:'#008bb6'}}>Alquilar</button>
          </div>
<div style={{background:'#fff',borderRadius:'12px',padding:'1.5rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',maxWidth:'900px',margin:'2rem auto 0',boxShadow:'0 4px 12px rgba(0,0,0,.15)',flexDirection:'column',alignItems:'center'}}>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
            <MultiSelect label="Tipo de propiedad" options={['Casa','Departamento']} value={tipoSel} onChange={setTipoSel} />
            <MultiSelect label="Zona" options={['Palermo','Recoleta','Belgrano','Puerto Madero','Caballito','Villa Crespo','Colegiales','San Telmo','Microcentro','Retiro','San Nicolás','Monserrat','Constitución','San Cristóbal','Balvanera','Abasto','Once','Congreso','Almagro','Boedo','Flores','Parque Chacabuco','Liniers','Mataderos','Villa Luro','Vélez Sársfield','Floresta','Villa del Parque','Parque Avellaneda','Villa Soldati','Nueva Pompeya','Barracas','La Boca']} value={zonaSel} onChange={setZonaSel} />
            </div>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'.4rem',minWidth:'200px'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.75rem',color:'#6b7280'}}><span>Dormitorios</span><span>{bedMin} - {bedMax}</span></div>
              <div style={{position:'relative',height:'24px'}} className="dual-range">
                <style>{`.dual-range input[type=range]{-webkit-appearance:none;appearance:none;height:24px;background:transparent;margin:0;} .dual-range input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:50%;background:#008bb6;cursor:pointer;pointer-events:auto;border:2px solid #fff;box-shadow:0 0 0 1px #008bb6,0 2px 4px rgba(0,0,0,.2);} .dual-range input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#008bb6;cursor:pointer;pointer-events:auto;border:2px solid #fff;box-shadow:0 0 0 1px #008bb6,0 2px 4px rgba(0,0,0,.2);}`}</style>
                <div style={{position:'absolute',top:'50%',left:0,right:0,height:'4px',background:'#d1d5db',transform:'translateY(-50%)',borderRadius:'2px',pointerEvents:'none'}} />
                <div style={{position:'absolute',top:'50%',left:`${(bedMin-1)/19*100}%`,width:`${(bedMax-bedMin)/19*100}%`,height:'4px',background:'#008bb6',transform:'translateY(-50%)',borderRadius:'2px',pointerEvents:'none'}} />
                <input type="range" min="1" max="20" value={bedMin} onChange={e=>setBedMin(Math.min(Number(e.target.value),bedMax))} style={{position:'absolute',top:0,left:0,width:'100%',pointerEvents:'none',background:'transparent',zIndex: bedMin>=bedMax?5:3}} />
                <input type="range" min="1" max="20" value={bedMax} onChange={e=>setBedMax(Math.max(Number(e.target.value),bedMin))} style={{position:'absolute',top:0,left:0,width:'100%',pointerEvents:'none',background:'transparent',zIndex:4}} />
              </div>
            </div>
            <input placeholder="Precio mín (USD)" value={priceMin} onChange={e=>setPriceMin(e.target.value)} style={{padding:'.7rem 1rem',borderRadius:'6px',border:'1px solid #d1d5db',minWidth:'120px'}} />
            <input placeholder="Precio máx (USD)" value={priceMax} onChange={e=>setPriceMax(e.target.value)} style={{padding:'.7rem 1rem',borderRadius:'6px',border:'1px solid #d1d5db',minWidth:'120px'}} />
            <button onClick={()=>{setTipoSel([]);setZonaSel([]);setBedMin(1);setBedMax(20);setPriceMin('');setPriceMax('')}} style={{...btn,background:'#f3f4f6',color:'#374151',padding:'.7rem 1.2rem'}}>Limpiar</button>
            <button style={{...btn,background:'#ff4928',color:'#fff',padding:'.7rem 2rem'}}>Buscar</button>
            </div>
</div>
        </section>
        <main style={{maxWidth:'1200px',margin:'2rem auto',padding:'0 1rem'}}>
          <h2 style={{marginBottom:'1rem'}}>Propiedades destacadas</h2>
          <p style={{color:'#6b7280',marginBottom:'1.5rem'}}>Una selección de lo que está disponible ahora.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
            {props.slice(0,8).map(p=>(
              <div key={p.id} style={card} onClick={()=>nav('/propiedad/'+p.id)}>
                <img src={(p.images&&p.images[0])||'/casa1.jpg'} alt={p.title} style={{width:'100%',height:'180px',objectFit:'cover'}} />
                <div style={{padding:'1rem'}}>
                  <span style={{display:'inline-block',padding:'.15rem .5rem',borderRadius:'4px',fontSize:'.7rem',fontWeight:'bold',color:'#fff',background:p.operationType==='VENTA'?'#2563eb':'#059669',marginBottom:'.4rem'}}>{p.operationType==='VENTA'?'Venta':'Alquiler'}</span>
                  <h3 style={{margin:'0 0 .3rem'}}>{p.title}</h3>
                  <p style={{color:'#6b7280',fontSize:'.9rem',margin:'0 0 .4rem'}}>{p.city}, CABA</p>
                  <p style={{color:'#059669',fontWeight:'bold',margin:0}}>U$S {Number(p.price).toLocaleString()}</p>
                  <p style={{color:'#6b7280',fontSize:'.85rem',margin:'.4rem 0 0'}}>{p.bedrooms} amb. · {p.bathrooms} baños · {p.coveredArea} m²</p>
                </div>
              </div>
            ))}
          </div>
            <div style={{textAlign:'center',marginTop:'1.5rem'}}>
              <button onClick={()=>nav('/comprar')} style={{...btn,background:'#008bb6',color:'#fff'}}>Ver todas</button>
            </div>
          <section style={{background:'#fff',borderRadius:'12px',padding:'2rem',marginTop:'3rem',boxShadow:'0 2px 10px rgba(0,0,0,.08)'}}>
            <h2 style={{marginTop:0}}>¿Querés vender o alquilar tu propiedad?</h2>
            <p style={{color:'#6b7280'}}>Pedí una tasación y publicamos tu propiedad en nuestra web para que llegue a quienes la están buscando.</p>
            <button style={{...btn,background:'#ff4928',color:'#fff'}}>Pedir tasación</button>
          </section>
          <section id="como-trabajamos" style={{marginTop:'3rem'}}>
            <h2 style={{textAlign:'center',marginBottom:'2rem'}}>Cómo trabajamos</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'2rem'}}>
              {[['1','Contanos qué buscás','Zona, presupuesto y las características que no pueden faltar.'],['2','Visitamos juntos','Coordinamos las visitas y te ayudamos a comparar las opciones.'],['3','Cerramos la operación','Te acompañamos con la documentación hasta que tengas las llaves.']].map(([n,t,d])=>(
                <div key={n} style={{textAlign:'center'}}>
                  <div style={{width:'3rem',height:'3rem',borderRadius:'50%',background:'#008bb6',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',fontSize:'1.2rem',fontWeight:'bold'}}>{n}</div>
                  <h3>{t}</h3>
                  <p style={{color:'#6b7280'}}>{d}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        {footer}
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f3f4f6',fontFamily:'sans-serif'}}>
      {header}
      <main style={{maxWidth:'1200px',margin:'2rem auto',padding:'0 1rem'}}>
        <h2 style={{marginBottom:'.5rem'}}>{op==='VENTA'?'Comprar':'Alquilar'}</h2>
        <p style={{color:'#6b7280',marginBottom:'1.5rem'}}>{props.length} propiedades encontradas</p>
        <div style={{display:'grid',gridTemplateColumns:'240px 1fr',gap:'2rem'}}>
            <aside style={{...card,padding:'1.5rem',height:'fit-content'}}>
            <h3 style={{marginTop:0}}>Filtros</h3>
            <button onClick={()=>{setTipoSel([]);setZonaSel([]);setBedMin(1);setBedMax(20);setPriceMin('');setPriceMax('');setFilters({propertyType:'',city:'',bedrooms:'',price:''});setApplied({propertyType:'',city:'',bedrooms:'',price:''})}} style={{...btn,background:'#f3f4f6',color:'#374151',width:'100%',marginBottom:'1rem'}}>Limpiar</button>
            <MultiSelect label="Tipo de propiedad" options={['Casa','Departamento']} value={tipoSel} onChange={setTipoSel} />
            <div style={{marginTop:'.8rem'}}><MultiSelect label="Zona" options={['Palermo','Recoleta','Belgrano','Puerto Madero','Caballito','Villa Crespo','Colegiales','San Telmo','Microcentro','Retiro','San Nicolás','Monserrat','Constitución','San Cristóbal','Balvanera','Abasto','Once','Congreso','Almagro','Boedo','Flores','Parque Chacabuco','Liniers','Mataderos','Villa Luro','Vélez Sársfield','Floresta','Villa del Parque','Parque Avellaneda','Villa Soldati','Nueva Pompeya','Barracas','La Boca']} value={zonaSel} onChange={setZonaSel} /></div>
            <p style={{fontWeight:600,margin:'.8rem 0 .3rem'}}>Dormitorios</p>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.75rem',color:'#6b7280'}}><span>Mín-Máx</span><span>{bedMin} - {bedMax}</span></div>
            <div style={{position:'relative',height:'24px',marginBottom:'.8rem'}} className="dual-range">
              <div style={{position:'absolute',top:'50%',left:0,right:0,height:'4px',background:'#d1d5db',transform:'translateY(-50%)',borderRadius:'2px',pointerEvents:'none'}} />
              <div style={{position:'absolute',top:'50%',left:`${(bedMin-1)/19*100}%`,width:`${(bedMax-bedMin)/19*100}%`,height:'4px',background:'#008bb6',transform:'translateY(-50%)',borderRadius:'2px',pointerEvents:'none'}} />
              <input type="range" min="1" max="20" value={bedMin} onChange={e=>setBedMin(Math.min(Number(e.target.value),bedMax))} style={{position:'absolute',top:0,left:0,width:'100%',pointerEvents:'none',background:'transparent',zIndex: bedMin>=bedMax?5:3}} />
              <input type="range" min="1" max="20" value={bedMax} onChange={e=>setBedMax(Math.max(Number(e.target.value),bedMin))} style={{position:'absolute',top:0,left:0,width:'100%',pointerEvents:'none',background:'transparent',zIndex:4}} />
            </div>
<p style={{fontWeight:600,margin:'.8rem 0 .3rem'}}>Precio (USD)</p>
<div style={{display:'flex',gap:'.5rem',marginBottom:'.8rem'}}>
<input placeholder="Mín" value={priceMin} onChange={e=>setPriceMin(e.target.value)} style={{width:'100%',padding:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
<input placeholder="Máx" value={priceMax} onChange={e=>setPriceMax(e.target.value)} style={{width:'100%',padding:'.5rem',border:'1px solid #d1d5db',borderRadius:'6px'}} />
</div>
            <button onClick={()=>setApplied({...filters})} style={{...btn,background:'#008bb6',color:'#fff',width:'100%',marginTop:'1rem'}}>Aplicar filtros</button>
            </aside>
          <div>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'1rem'}}>
              <button style={{...btn,background:'#f3f4f6',color:'#374151'}}>Ver en mapa</button>
              <select style={{marginLeft:'.5rem',padding:'.4rem .8rem',borderRadius:'6px',border:'1px solid #d1d5db'}}><option>Ordenar por</option></select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
              {props.map(p=>(
                <div key={p.id} style={card} onClick={()=>nav('/propiedad/'+p.id)}>
                  <img src={(p.images&&p.images[0])||'/casa1.jpg'} alt={p.title} style={{width:'100%',height:'180px',objectFit:'cover'}} />
                  <div style={{padding:'1rem'}}>
                    <span style={{display:'inline-block',padding:'.15rem .5rem',borderRadius:'4px',fontSize:'.7rem',fontWeight:'bold',color:'#fff',background:p.operationType==='VENTA'?'#2563eb':'#059669',marginBottom:'.4rem'}}>{p.operationType==='VENTA'?'Venta':'Alquiler'}</span>
                    <h3 style={{margin:'0 0 .3rem'}}>{p.title}</h3>
                    <p style={{color:'#6b7280',fontSize:'.9rem',margin:'0 0 .4rem'}}>{p.city}, CABA</p>
                    <p style={{color:'#6b7280',fontSize:'.85rem',margin:'0 0 .4rem'}}>Expensas: ARS [MONTO]</p>
                    <p style={{color:'#059669',fontWeight:'bold',margin:0}}>U$S {Number(p.price).toLocaleString()}</p>
                    <p style={{color:'#6b7280',fontSize:'.85rem',margin:'.4rem 0 0'}}>{p.bedrooms} amb. · {p.bathrooms} baños · {p.coveredArea} m² · {p.parkingSpaces} cochera</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:'.5rem',padding:'1.5rem'}}>
              <button onClick={() => setPage(0)} disabled={page===0} style={{padding:'.4rem .8rem'}}>«</button>
              <button onClick={() => setPage(p => Math.max(0,p-1))} disabled={page===0} style={{padding:'.4rem .8rem'}}>‹</button>
              {Array.from({length:totalPages},(_,i)=>(
                <button key={i} onClick={() => setPage(i)} style={{padding:'.4rem .8rem',background: i===page ? '#1e3a8a' : '#fff',color: i===page ? '#fff' : '#000',border:'1px solid #ccc',borderRadius:'4px'}}>{i+1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages-1,p+1))} disabled={page===totalPages-1} style={{padding:'.4rem .8rem'}}>›</button>
              <button onClick={() => setPage(totalPages-1)} disabled={page===totalPages-1} style={{padding:'.4rem .8rem'}}>»</button>
            </div>
          </div>
        </div>
      </main>
      {footer}
    </div>
  )
}