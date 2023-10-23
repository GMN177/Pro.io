import React, {useEffect} from 'react'
import {Box, Button, Heading, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, List,
    ListItem,
    ListIcon} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, SpinnerIcon, StarIcon } from '@chakra-ui/icons';
import {useSelector} from 'react-redux';
import {loggedUserSelectors} from '@/store/loggedUser/loggedUser.selector';
import {useAppDispatch} from '@/store/store.config';
import {friendsActions} from '@/store/friends/friends.action';
import {friendsSelector} from '@/store/friends/friends.selector';

export const FriendsPage = () => {
    const dispatch = useAppDispatch()
    const loggedUser = useSelector(loggedUserSelectors.getLoggedUserInfo)

    const friends = useSelector(friendsSelector.getFriendsList)
    const pending = useSelector(friendsSelector.getPendingRequests)
    const sent = useSelector(friendsSelector.getSentRequests)

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

    if(!friends || !otherUsers || !loggedUser?.id) {
        return null;
    }
    return (
        
            <Tabs variant="soft-rounded" p={5} >
                <TabList>
                    <Tab _selected={{color: 'white', bg: 'blue.theme'}} mr={2}>Friends</Tab>
                    <Tab _selected={{color: 'white', bg: 'blue.theme'}} mx={1}>Add Friends</Tab>
                    <Tab _selected={{color: 'white', bg: 'blue.theme'}} mx={1}>Pending Requests</Tab>
                    <Tab _selected={{color: 'white', bg: 'blue.theme'}} ml={2}>Requests Sent</Tab>
                </TabList>
            
            <TabPanels>
                <TabPanel>
                    <Box>
                        <Heading as={'h1'} my={5}>Friends</Heading>
                        <List spacing={5} p={3}>
                            {friends.map((f, key) => (
                                <ListItem key={key} >
                                    <Box  bgGradient='linear(to-l, blue.theme, blue.200)' display="inline-block" width="30%" p={1} borderRadius={10}>
                                    <ListIcon as={StarIcon} color='blue.theme' bg="white" borderRadius={10} p={1}/>
                                    {f.username}
                                    </Box>
                                </ListItem>

                            ))}
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box >
                        <Heading as={'h1'} my={5}>Users to add as friends</Heading>
                        <List spacing={5} p={3}>
                            {otherUsers.map((u, key) => (
                                <ListItem key={key} >
                                    <Box  bgGradient='linear(to-l, green.200, green.400)' display="inline-block" width="30%" p={1} borderRadius={10}>
                                    <ListIcon as={AddIcon} color='green.500' onClick={() => addFriend(u)} bg="white" borderRadius={10} focusable="true" p={1}/>
                                    {u.username}
                                    </Box>
                                </ListItem>

                            ))}
                        </List>
                    </Box>
                </TabPanel>
                            
                <TabPanel>
                    <Box >
                        <Heading as={'h1'} my={5}>Pending requests</Heading>
                        <List spacing={5} p={3}>
                            {pending.map((p, key) => (
                                <ListItem key={key} >
                                    <Box  bgGradient='linear(to-l, purple.200, purple.400)' display="inline-block" width="30%" p={1} borderRadius={10}>
                                    <ListIcon as={CheckIcon} color='green.500' onClick={() => dispatch(friendsActions.acceptOrDeclineFriendRequest({friendId: p._id, accept: true, userId: loggedUser.id}))} bg="white" borderRadius={10} focusable="true" p={1}/>
                                    <ListIcon as={CloseIcon} color='red.500' onClick={() => dispatch(friendsActions.acceptOrDeclineFriendRequest({friendId: p._id, accept: false, userId: loggedUser.id}))} bg="white" borderRadius={10} focusable="true" p={1}/>
                                    {p.username}
                                    </Box>
                                </ListItem>

                            ))}
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box >
                        <Heading as={'h1'} my={5}>Requests sent</Heading>
                        <List spacing={5} p={3}>
                            {sent.map((s, key) => (
                                <ListItem key={key} >
                                    <Box  bgGradient='linear(to-l, yellow.200, yellow.400)' display="inline-block" width="30%" p={1} borderRadius={10}>
                                    <ListIcon as={SpinnerIcon} color='grey.500' bg="white" borderRadius={10} p={1}/>
                                    {s.username}
                                    </Box>
                                </ListItem>

                            ))}
                        </List>
                    </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
    
    )
}
