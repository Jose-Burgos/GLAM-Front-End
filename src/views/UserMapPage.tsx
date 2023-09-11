
import './App.css'
import 'react-dom'
export function App() {
  return (
<>
    

<div style={{width: 1440, height: 1024, position: 'relative', background: 'white'}}>
  <h1>¡Hola Marta!</h1>
  <h2>Éstas son las ONGs cerca tuyo que alojan mascotas que buscan hogar.</h2>
  <img style={{width: 505, height: 556, left: 792/2, top: 198, position: 'absolute', border: '0.50px black solid'}} src="https://via.placeholder.com/505x556" />
  <div style={{width: 422, height: 126, left: 792/2, top: 800, position: 'absolute', background: '#B3261E', borderRadius: 100, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
    <div style={{alignSelf: 'stretch', flex: '1 1 0', paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
      <div style={{textAlign: 'center', color: 'white', fontSize: 22, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 28, wordWrap: 'break-word'}}>Reportar una mascota perdida</div>
    </div>
  </div>
  <div>
  <a href="./LostPetReport">
        <button>
          Reportar una mascota perdida
        </button>
  </a>
  
  </div>
</div>
</>
  )
}

export default App
