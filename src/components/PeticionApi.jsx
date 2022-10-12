import React from 'react'

const PeticionApi = () => {
    const [siguiente, setSiguiente] = React.useState("https://pokeapi.co/api/v2/pokemon/");
    const [previous, setPrevius] = React.useState("");
    const [listaPokemones, setListaPokemones] = React.useState([]);

    const obtenerPersonajes = async (url) => {
        const res = await fetch(url);
        const { results, next, previous } = await res.json();

        const lista = await Promise.all(
            results.map(async ({ name, url }) => {
                const res2 = await obtenerDetalle(url);
                const { abilities, sprites } = res2;
                const urlFoto = sprites.front_default;
                const habilidades = abilities.map(({ ability }) => ability.name);
                const pokemon = {
                    nombre: name,
                    foto: urlFoto,
                    habilidades
                }
                return pokemon
            }));
        await setSiguiente(next);
        await setPrevius(previous);
        await setListaPokemones(lista);
    }
    React.useEffect(() => {
        obtenerPersonajes(siguiente);
    }, []);

    const obtenerDetalle = async (url) => {
        const res = await fetch(url);
        return await res.json();
    }

    return (
        <div>
            
        </div>
    )
}

export default PeticionApi
