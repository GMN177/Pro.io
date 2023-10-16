export interface FriendsState {
    isLoading: boolean
    isError: boolean
    usersWhoAreNotFriends?: any[]
    friends?: any[]
    pending?: any[]
    sent?: any[]
}
