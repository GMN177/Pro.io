import {createReducer} from '@reduxjs/toolkit'
import {gamesActions} from '@/store/games/games.action';
import {GamesState} from '@/store/games/types';

const initialState: GamesState = {
    isError: false,
    isLoading: false
}

export const gamesReducer = {
    games: createReducer(initialState, (builder) => {
        builder.addCase(gamesActions.fetchGamesList.pending, (state): GamesState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(gamesActions.fetchGamesList.fulfilled, (state, action): GamesState => {
            const {matches} = action.payload;

            // Retrieve the matches that have ingame status
            const ingameMatches = matches.filter((match) => {
                return match.status === "INGAME"
            })

            console.log(ingameMatches)

            const {resp} = action.payload;

            const games = resp.map((game) => {
                return {
                    ...game,
                    activePlayers: ingameMatches.filter((match) => {
                        return match.game === game._id
                    }).length
                }
            })

            return {
                ...state,
                games: games,
                isLoading: false,
                isError: false
            }
        });
        builder.addCase(gamesActions.fetchGamesList.rejected, (state): GamesState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
        builder.addCase(gamesActions.filterGamesByNameAsc, (state, action) => {
            const {games} = action.payload;
            // filter games by name asc
            const gamesFiltered = [...games].sort((a, b) => {
                if(a.name > b.name) {
                    return 1
                }
                if(a.name < b.name) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                games: gamesFiltered
            }

        });
        builder.addCase(gamesActions.filterGamesByActivePlayers, (state, action) => {
            const {games} = action.payload;
            // filter games by name asc
            const gamesFiltered = [...games].sort((a, b) => {
                if(a.activePlayers < b.activePlayers) {
                    return 1
                }
                if(a.activePlayers > b.activePlayers) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                games: gamesFiltered
            }

        });
    })
}
