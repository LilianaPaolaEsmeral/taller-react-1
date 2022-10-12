import React from 'react'

const PeticionApi = () => {
    const [siguiente, setSiguiente] = React.useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    const [previous, setPrevius] = React.useState("");
    const [listaPokemones, setListaPokemones] = React.useState([]);

    const obtenerPersonajes = async (url) => {
        const res = await fetch(url);
        const { results, next, previous } = await res.json();

        const lista = await Promise.all(
            results.map(async ({ name, url }) => {
                const res2 = await obtenerDetalle(url);
                const { abilities, sprites, id } = res2;
                const urlFoto = sprites.front_default;
                const habilidades = abilities.map(({ ability }) => ability.name);
                const pokemon = {
                    nombre: name,
                    foto: urlFoto,
                    habilidades,
                    id
                }
                return pokemon
            }));
        await setSiguiente(next);
        await setPrevius(previous);
        await setListaPokemones(lista);
    }
    React.useEffect(() => {
        obtenerPersonajes(siguiente);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const obtenerDetalle = async (url) => {
        const res = await fetch(url);
        return await res.json();
    }
    const atras = () => {
        if (previous.length !== "") {
            obtenerPersonajes(previous);
        }
    }

    const sigiente = () => {
        obtenerPersonajes(siguiente);
    }
    return (
        <div>
            <h1>
                Peticion a PokeApi
            </h1>
            <button onClick={atras}>Atrás</button>
            <button onClick={sigiente}>Siguiente</button>
            {
                listaPokemones.map(({id,nombre,foto,habilidades})=> (
                    <div key={id}>
                        <h4>{id}. {nombre}</h4>
                        <img src={foto} alt={nombre} />
                        <ul>
                            {
                                habilidades.map((item,index) => <li key={index}>{item}</li>)
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default PeticionApi
