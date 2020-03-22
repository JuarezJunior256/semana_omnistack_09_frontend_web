import React,  {useState, useMemo} from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import style from './styles.css'

export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [empresa, setEmpresa] = useState('');
    const [techs, setTechs] = useState('');
    const [preco, setPreco] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) :  null;
    }, [thumbnail])
    
    async function handleSubmit(event){
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('empresa', empresa);
        data.append('tecnologias', techs);
        data.append('preco', preco);

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
               <input type="file" onChange={event => setThumbnail(event.target.files[0])}/> 
               <img src={camera} alt="Select imagem"/>
            </label>

            <label htmlFor="empresa">EMPRESA</label>
            <input
                id="empresa"
                placeholder="Sua empresa incrível"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS</label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="preco">VALOR DA DIÁRIA <span>(em branco para gratuito)</span></label>
            <input
                id="preco"
                placeholder="Valor cobrado por dia"
                value={preco}
                onChange={event => setPreco(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}