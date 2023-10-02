export interface User {
    id: string,
    username: string,
    email: string,
    totMatches: number,
    totWins: number,
    friends: User[],
    status: string,
    matchPlayingId: string
}
