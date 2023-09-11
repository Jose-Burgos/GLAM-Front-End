


function LostPetReportView(){
    return(
        <div>
            <h1>Pagina de mascotas perdidas.</h1>
            <form>
                <label>Tipo de animal 
                    <input></input>
                </label>
                <div>
                    <label>Ubicacion
                        <input></input>
                    </label>
                </div>
                <div>
                    <label>Descripcion del animal
                        <input></input>
                    </label>
                </div>
                <div>
                    <label>Mas detalles
                        <input></input>
                    </label>
                </div>
            </form>
            <button>Reportar</button>
            <h2>Recuerda que las ONGs no pueden confiscar mascotas.</h2>
            <h3>Si presencias un caso de abuso animal, llama al 911.</h3>
        </div>
        
        
        
    );
}

export default LostPetReportView
