import {
  Flex,
  Image,
  Spacer,
  Text,
  Link,
  Box,
  Icon,
  Circle, Divider,
} from "@chakra-ui/react";
import proLogo from "/logo.svg";
import React from "react";
import { Button } from "@chakra-ui/button";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store.config";
import { loginActions } from "@/store/login/login.action";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";
import { loggedUserSelectors } from "@/store/loggedUser/loggedUser.selector";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshToken = useSelector(loginSelectors.getRefreshToken)
  const user = useSelector(loggedUserSelectors.getLoggedUserInfo);

  return (
      <Flex
          as="nav"
          bg="#F2F2F2"
          justify="space-between"
          padding="1.5rem"
          align="center"
          color="blue.theme"
          boxShadow="lg"
          gap={2}
      >
        <Image alt="Logo" src={proLogo} onClick={() => navigate('/')} cursor='pointer'/>
        <Text ml={5} color="blue.theme" fontWeight={700}>
          Pro.io
        </Text>
        <Spacer />
        {props.isLogged && user ? (
            <>
              <Link href="#" w="120px" fontWeight={700} as={ReachLink} to={"/leaderboard"}>
                LeaderBoard
              </Link>

              <Popover>
                <PopoverTrigger>
                  {/* profile icon */}
                  <Button>
                    <Circle bg="blue.theme" size="40px">
                      <Text color="white">{user.username.substring(0, 2).toLocaleUpperCase()}</Text>
                    </Circle>
                  </Button>
                  {/* profile icon */}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader> {user.username}</PopoverHeader>
                  <PopoverBody>
                    <div>

                      <Link  as={ReachLink} to={"/settings"} style={{ textDecoration: "none" }}>
                        <Button color="blue.theme" bg="none" fontWeight={200} p={0} _hover={{}}>
                          Settings
                        </Button>
                      </Link>
                    </div>
                    <div>

                      <Link  as={ReachLink} to={"/friends"} style={{ textDecoration: "none" }}>
                        <Button color="blue.theme" bg="none" fontWeight={200} p={0} _hover={{}}>
                          Friends
                        </Button>
                      </Link>
                    </div>

                  </PopoverBody>
                  <PopoverFooter>

                    <Link
                        fontWeight={700}
                        to={"#"}
                        onClick={() =>
                            dispatch(
                                loginActions.userLogout({ refreshToken, navigate })
                            )
                        }
                    >
                      Log out
                    </Link>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </>
        ) : (
            <Link as={ReachLink} to={"/login"} fontWeight={700}>
              Log in
            </Link>
        )}
      </Flex>
  );
};

export default Navbar;
