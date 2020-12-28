import React from 'react';
import { Link } from 'react-router-dom';

function ListCharacter({ character, quotes }) {

    return (
        <div className="container mt-5">
            <Link to={{ pathname: "/" }}>Go back</Link>

            <div className="d-flex mt-3">

                <img src={character.img} alt="character image" className="img-circle" height="500" />
                {/*Listing character details*/}

                <div className="ml-5">

                    <h1>{character.name}</h1>

                    <p>Birthday: <b>{character.birthday}</b></p>

                    <p>Occupation: <b>{character.occupation ? character.occupation[0] : null}</b> </p>

                    <p>Status: <b>{character.status}</b></p>

                    {character.status === "alive" ? <p>{character.nickname}</p> : null}

                    <p>Actor: <b>{character.portrayed}</b></p>

                    <p>Seasons: {character.appearance ? character.appearance.map((season) => (<span> {season} </span>)) : null}</p>

                    <h4>Quotes</h4>

                    <b>{quotes.map((quote) => (quote.author === character.name ? <p>{quote.quote}</p> : null))}</b>
                </div>

            </div>

        </div >
    )
}

export default ListCharacter
