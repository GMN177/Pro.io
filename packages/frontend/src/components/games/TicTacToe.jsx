import React, {useEffect, useState} from 'react'
import {getSocketInstance} from "@/api/socket";

const socket = getSocketInstance()
let test = 0

const getScreenValue = (value) => {
    if(value === null) {
        return <></>
    }
    if(value === 0) {
        return 'O'
    }
    return 'X'
}
export const TicTacToe = () => {

    const [context, setContext] = useState([0,0,0,0,0,0,0,0,0])
    useEffect(() => {
        if(socket) {
            socket.on('newState', (state) => {
                // todo change state
            })
        }
    }, [])

    return (
        context.map((value, i) => {
            if(i > 2 && i%3 === 0) {
                return (<span key={i}>
                        <br />
                        {getScreenValue(value)}
                    </span>
                )
            }
            return (
                <span key={i}>
                    {getScreenValue(value)}
                </span>
            )
        })
    )
}
