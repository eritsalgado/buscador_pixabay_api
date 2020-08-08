import React from 'react'

const Imagen = ({imagen}) => {

    //Extraer variables
    const {
        largeImageURL,
        likes,
        previewURL,
        tags,
        views
    } = imagen
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
            <div className="card">
                <img 
                    src={previewURL} 
                    alt={tags}
                    className="card-img-top"
                />
                <div className="card-body">
                    <p className="card-text">
                        {likes} Me gusta
                    </p>
                    <p className="card-text">
                        {views} Visitas
                    </p>
                </div>
                <div className="card-footer">
                    <a 
                        href={largeImageURL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-primary btn-block'
                    >
                        Ver Imagen
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Imagen
