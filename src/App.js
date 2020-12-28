import React, { useEffect, useState } from 'react';
import ListCharacters from './components/ListCharacters';
import ListCharacter from './components/ListCharacter';
import Pagination from './components/Pagination';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false)
    const [quotes, setQuotes] = useState([]);
    const [character, setCharacter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 10;

    //url for fetching characters
    const URL = 'https://www.breakingbadapi.com/api/characters?';


    //url for fetching quotes
    const QUOTES = 'https://www.breakingbadapi.com/api/quotes';

    //for selecting a character by clikcing the link in ListCharacters
    const setCharacterFn = (char) => {
        setCharacter(char)
    }

    //fetching all characters
    useEffect(() => {

        async function fetchData() {

            setLoading(true);

            fetch(URL)
                .then(res => res.json())
                .then((data) => {
                    setCharacters(data);
                    setLoading(false);
                })
        }

        fetchData();

    }, []);


    //fetching all quotes
    useEffect(() => {

        async function fetchQuotes() {

            fetch(QUOTES)
                .then(res => res.json())
                .then((data) => {
                    setQuotes(data);
                })
        }
        fetchQuotes();

    }, [])

    //storing and retreiving character details from localstorage
    useEffect(() => {
        if (localStorage.getItem('character')) {
            setCharacter(JSON.parse(localStorage.getItem('character')))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('character', JSON.stringify(character))
    }, [character])


    useEffect(() => {
        if (localStorage.getItem('quotes')) {
            setQuotes(JSON.parse(localStorage.getItem('quotes')))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('quotes', JSON.stringify(quotes))
    }, [quotes])

    //pagination requirements

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    //for paginating between pages
    const paginate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber)
    }

    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <h2 className="mt-5">Breaking Bad Characters</h2>
                        {loading ? <p>Loading</p> : null}


                        {
                            !loading &&
                            <Pagination
                                charactersPerPage={charactersPerPage}
                                totalCharacters={characters.length}
                                paginate={paginate}
                            />
                        }


                        <ListCharacters characters={currentCharacters} quotes={quotes} setCharacterFn={setCharacterFn} />
                        {
                            !loading &&
                            <Pagination
                                charactersPerPage={charactersPerPage}
                                totalCharacters={characters.length}
                                paginate={paginate}
                            />
                        }


                    </Route>

                    <Route exact path="/character/:char">
                        <ListCharacter character={character} quotes={quotes} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App

