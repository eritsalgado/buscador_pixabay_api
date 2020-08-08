import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [pagina_actual, guardarPaginaActual] = useState(1)
  const [total_paginas, guardarTotalPaginas] = useState(1)

  useEffect(()=> {
    const consultarAPI = async () => {
      if(busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '17823219-9d3b8b3ca0f5b9078c125fb02'
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${pagina_actual}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      guardarImagenes(resultado.hits)

      //calcular total de paginas 
      //Math.ceil redondea a un numero superior
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas)

      // Mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarAPI()
  },[busqueda, pagina_actual])

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = pagina_actual - 1
    if(nuevaPaginaActual === 0) return
    guardarPaginaActual(nuevaPaginaActual)
  }
  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = pagina_actual + 1
    if(nuevaPaginaActual > total_paginas) return
    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead tect-center">
          Buscador de Imágenes
        </p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {
          (pagina_actual === 1) ? null : (
            <button
              type="button"
              className=" btn-info"
              onClick={paginaAnterior}
            >
              &laquo; Anterior
            </button>
          )
        }

        {
          (pagina_actual === total_paginas ? null : (
            <button
              type="button"
              className=" btn-info"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
