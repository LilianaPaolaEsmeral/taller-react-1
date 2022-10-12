import React from 'react'

const PeticionApi = () => {
    const obtenerPersonajes = async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const { results, next, previous } = await res.json();
        // const listaPokemones = results
    }
    return (
        <div>

        </div>
    )
}

export default PeticionApi
