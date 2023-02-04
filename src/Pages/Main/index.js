import { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import { Container, Form, SubmitButton, List, DeleteButton } from './styles'

import api from '../../services/API';
import { Link } from 'react-router-dom';

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);


    useEffect(() => {
        const reposStorage = localStorage.getItem('repos');

        if (reposStorage){
            setRepositorios(JSON.parse(reposStorage));
        }

    }, []);


    function storageControl(repos){
        localStorage.setItem('repos', JSON.stringify(repos));
    }

    const handleSubmit = useCallback((e)=>{

        e.preventDefault();   
        
        async function submit(){
            setLoading(true);
            setAlert(null);
            try{
                if (newRepo === ''){
                    throw new Error('Voce precisa indicar um repositorio!');
                }

                

                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);
                if (hasRepo){
                    throw new Error('Repositório duplicado');
                }

                const data = {  
                    name: response.data.full_name,
                }

                storageControl([...repositorios, data]);
                setRepositorios([...repositorios, data]);
                console.log(repositorios);
                setNewRepo('');
            
            }
            catch(error){
                setAlert(true);
                console.log(error);
            }
            finally{
                setLoading(false);
            }


            
        }

        submit();
        
    }, [newRepo, repositorios]);


    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        storageControl(find);
        setRepositorios(find);
    }, [repositorios]);

    function handleInputChange(e){
        setNewRepo(e.target.value)
        setAlert(false);
    }


    return(
        <Container>
            <h1>
                <FaGithub size={25}/>    
                Meus repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                   type="text" 
                   placeholder="Adicionar Repositorios"
                   value={newRepo}   
                   onChange={(e) => handleInputChange(e)}
                />
                
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color='#fff' size={14}/>
                    ) : (
                        <FaPlus color="#fff" size={14}/>
                    )}
                    
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>        
    );
}