import React from 'react';
import { Link } from 'react-router-dom';

function ListCharacters({ characters, quotes, setCharacterFn }) {

    return (

        <div className=" mb-5">
            {
                characters.map((character) => (

                    <ul className="list-group">

                        <Link
                            className="text-decoration-none"
                            to={{
                                pathname: `character/${character.name}`,
                            }}
                            onClick={() => setCharacterFn(character)}>

                            <li className="list-group-item mt-3" key={character.char_id}>
                                <div>
                                    <h4><b>{character.name}</b></h4>
                                    {character.occupation.map((job) => (<p >{job}</p>))}
                                    <p><b>Birthday:  </b>{character.birthday}</p>
                                    <b>{character.status}</b>

                                </div>
                            </li>

                        </Link>

                    </ul>


                ))
            }
        </div>
    )
}

export default ListCharacters
