import React, {useEffect, useState} from 'react'
import axios from "axios";
import {baseURL} from "@/api/axiosConfig";
import {usersEndpoints} from "@/api/users.service";

export const Leaderboard = () => {
    const [topTenUsers, setTopTenUsers] = useState([])
    useEffect(() => {
        const getLeaderboard = async () => {
            const leaderboard = (await (axios.get(baseURL + usersEndpoints.leaderboard))).data.data
            setTopTenUsers(leaderboard)
        }
        getLeaderboard()
    }, [])
    return (
        <>
        </>
    )
}
