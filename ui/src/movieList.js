import React, {useEffect, useState} from 'react';

export default function MovieList() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const titles = [
            {title: 'Mean Girls'},
            {title: 'Hackers'},
            {title: 'The Grey'},
            {title: 'Sunshine'},
            {title: 'Ex Machina'},
        ];
        setMovies(titles);
    })


    return(
        <ul>
            {movies.map((e) => {
                return(<li>{e.title}</li>)
            })}
        </ul>
    )
}