import React, { useEffect, useState } from "react";
import api from '../../services/API'
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, IssuesList, PagesActions, Filter } from "./styles";
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { act } from "react-dom/test-utils";

export default function Repositorio(){

    const { repositorio } = useParams();

    const [repositorios, setRepositorios] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        async function load(){
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),       
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: filter,
                        per_page: 5,
                    }
                })       
            ])

            setRepositorios(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();

    }, []);

    useEffect(() => {
        async function loadIssue(){
            const response = await api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state: filter,
                    page,
                    per_page: 5,
                },
            });

            setIssues(response.data);
        }

        loadIssue();

    }, [page, filter]);

    function handlePage(action){
        
        if (action === 'back' && page === 1)
            return;

        setPage( action === 'next' ? page + 1 : page - 1);
    }


    if (loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }
    
    return(
        <Container>
            <Link to="/">
                <FaArrowLeft color="#000" size={30}/>
            </Link>
            <Owner>
                <img src={repositorios.owner.avatar_url} alt={repositorios.owner.login}/>
                <h1>{repositorios.name}</h1>
                <p>{repositorios.description}</p>
            </Owner>
            <Filter>
                <span>Filter:</span>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='open'>Open</option>
                    <option value='closed'>Closed</option>
                </select>
            </Filter>
            <IssuesList>
                {issues.map((issue) => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>


                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                            
                        </div>

                    </li>
                ))}
            </IssuesList>

            <PagesActions>
                    <button type="button" onClick={() => handlePage('back')}>
                        Voltar
                    </button>
                    <button type="button" onClick={() => handlePage('next')}>
                        Próxima
                    </button>
            </PagesActions>
            
        </Container>
    );
}