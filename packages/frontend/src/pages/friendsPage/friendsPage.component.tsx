import React, {useEffect} from 'react'
import {Box, Button, Heading, HStack, VStack} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {loggedUserSelectors} from '@/store/loggedUser/loggedUser.selector';
import {useAppDispatch} from '@/store/store.config';
import {friendsActions} from '@/store/friends/friends.action';
import {friendsSelector} from '@/store/friends/friends.selector';

export const FriendsPage = () => {
    const dispatch = useAppDispatch()
    const loggedUser = useSelector(loggedUserSelectors.getLoggedUserInfo)

    const friends = useSelector(friendsSelector.getFriendsList)
    const otherUsers = useSelector(friendsSelector.getUsersWhoAreNotFriends)
    useEffect(() => {
        if(loggedUser?.id) {
            dispatch(friendsActions.fetchFriendsList(loggedUser.id))
        }
    }, [loggedUser?.id])

    const addFriend = (user) => {
        if(loggedUser.id && user._id) {
            dispatch(friendsActions.sendFriendRequest({userId: loggedUser.id, friendId: user._id}))
        }
    }

    if(!friends || !otherUsers) {
        return null;
    }
    return (

        <HStack width={'100%'} alignItems={'start'}>
            <Box width={'50%'} p={10}>
                <Heading as={'h1'}>Friends</Heading>
                <ul>
                    {friends.map((f, key) => (
                        <li key={key}>
                            {f.username}
                        </li>
                    ))}
                </ul>
            </Box>
            <Box width={'50%'} p={10}>
                <Heading as={'h1'}>Users to add as friends</Heading>
                <ul>
                    {otherUsers.map((u, key) => (
                        <HStack key={key}>
                            <li>
                                <div>{u.username}</div>
                            </li>
                            <Button onClick={() => addFriend(u)}>Add</Button>
                        </HStack>

                    ))}
                </ul>
            </Box>
        </HStack>
    )
}
