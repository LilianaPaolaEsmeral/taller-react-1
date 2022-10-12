import React from 'react'

const Card = ({ id,nombre, descripcion, foto }) => {
    return (
        <div className="card m-3" style={{ width: "18rem" }}>
            <img src={foto} className="card-img-top" alt={nombre} />
            <div className="card-body">
                <h5 className="card-title">{id}. {nombre}</h5>
                    <ul className="card-text">
                        {
                            descripcion.map((item, index) => <li key={index}>{item}</li>)
                        }
                    </ul>
            </div>
        </div>
    )
}

export default Card;
