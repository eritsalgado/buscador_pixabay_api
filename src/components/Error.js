import React from 'react'

const Error = ({mensaje}) => {
    return (
        <div className="my-3 p-4 text-center text-white alert alert-danger">
            {mensaje}
        </div>
    )
}

export default Error
