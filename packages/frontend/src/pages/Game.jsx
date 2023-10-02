import React from 'react';
import {useParams} from "react-router-dom";

export const Game = () => {

    const {game, matchId} = useParams();

    console.log('game', game)
    console.log('matchId', matchId)
    return (
        <>

        </>
    )
}
