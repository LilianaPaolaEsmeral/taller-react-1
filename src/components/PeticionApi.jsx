import React from 'react'
import Card from './Card';
import "../index.css"

const PeticionApi = () => {
    const [siguiente, setSiguiente] = React.useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    const [previous, setPrevius] = React.useState("");
    const [listaPokemones, setListaPokemones] = React.useState([]);
    const [page,setPage] = React.useState(1);

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
    const atras = async () => {
        if (previous.length !== "") {
            
            await obtenerPersonajes(previous);
            await setPage(page-1);
        }
    }

    const sigiente = async () => {
        await obtenerPersonajes(siguiente);
        await setPage(page+1);
    }

    return (
        <div className='container'>
            <h1 className='title text-center shadow-lg rounded-5 my-2'>
                Peticion a PokeApi
            </h1>
            <div className='col-12 d-flex justify-content-between'>
                <button onClick={atras} type="button" className="btn btn-primary" disabled={page===1}>Atrás</button>
                <div className='rounded-circle border border-primary p-2 px-3 page'>
                    {
                        page
                    }
                </div>
                <button onClick={sigiente} type="button" className="btn btn-primary">Siguiente</button>
            </div>
            <div className="row justify-content-center">
                {
                    listaPokemones.map(({ id, nombre, foto, habilidades }) => (
                        <Card key={id} id={id} nombre={nombre} foto={foto} descripcion={habilidades}/>
                    ))
                }
            </div>
        </div>
    )
}

export default PeticionApi
