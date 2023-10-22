export interface User {
    id: string,
    _id: string
    username: string,
    email: string,
    totMatches: number,
    totWins: number,
    friends: User[],
    status: string,
    inactive?: boolean,
    matchPlayingId: string
}
