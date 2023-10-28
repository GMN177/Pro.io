import React, {useCallback, useEffect, useMemo} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {TicTacToe} from "@/components/games/TicTacToe";
import {WhoGetsFirst} from "@/components/games/WhoGetsFirst";
import {getTicTacToeSocketInstance, getWhoGetsFirstSocketInstance} from "@/api/socket";

export const Game = () => {

    const {game, matchId} = useParams();
    const {firstPlayer, firstX, firstY, enemyId} = useLocation().state || {}
    const socket = useMemo(() => getWhoGetsFirstSocketInstance() || getTicTacToeSocketInstance(), [])
    const navigate = useNavigate()

    useEffect(() => {
        if(!socket) {
            navigate('/')
        }
    }, [socket])
    const renderGame = useCallback(() => {
        if(!game || !socket) {
            return null
        }
        switch(game) {
            case 'TicTacToe': {
                return <TicTacToe isFirstPlayer={firstPlayer}/>
            }
            case 'WhoGetsFirst': {
                return <WhoGetsFirst firstX={firstX} firstY={firstY} enemyId={enemyId}/>
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
