import React from 'react'
import "../index.css"

const Card = ({ id,nombre, descripcion, foto }) => {
    return (
        <div className="card m-3">
            <img src={foto} className="card-img-top" alt={nombre} />
            <div className="card-body">
                <h4 className="card-title">{id}. {nombre}</h4>
                    <ul className="card-text list-group list-group-numbered">
                        {
                            descripcion.map((item, index) => <li key={index} className="list-group-item">{item}</li>)
                        }
                    </ul>
            </div>
        </div>
    )
}

export default Card;
