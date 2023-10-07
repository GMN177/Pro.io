import React from 'react';
import {useParams} from "react-router-dom";
import {TicTacToe} from "@/components/games/TicTacToe";

export const Game = () => {

    const {game, matchId} = useParams();

    console.log('game', game)
    console.log('matchId', matchId)

    const renderGame = () => {
        if(!game) {
            return null
        }
        switch(game) {
            case 'TicTacToe': {
                return <TicTacToe />
            }
            default: {
                return <>Game not supported</>
            }
        }
    }
    return (
        <>
            {renderGame()}
        </>
    )
}
