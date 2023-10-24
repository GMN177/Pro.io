import React, {useCallback} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {TicTacToe} from "@/components/games/TicTacToe";
import {WhoGetsFirst} from "@/components/games/WhoGetsFirst";

export const Game = () => {

    const {game, matchId} = useParams();
    const {firstPlayer} = useLocation().state
    const renderGame = useCallback(() => {
        if(!game) {
            return null
        }
        switch(game) {
            case 'TicTacToe': {
                return <TicTacToe isFirstPlayer={firstPlayer}/>
            }
            case 'WhoGetsFirst': {
                return <WhoGetsFirst />
            }
            default: {
                return <>Game not supported</>
            }
        }
    }, [game, matchId])
    return (
        <>
            {renderGame()}
        </>
    )
}
