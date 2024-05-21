import SearchBoardHero from'./SearchBoardHero';
import SearchBoardSection from'./SearchBoardSection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function SearchBoard(){
    return(
        <>
            <SearchBoardHero/>
            <SearchBoardSection/>
        </>
    )
}

export default SearchBoard;