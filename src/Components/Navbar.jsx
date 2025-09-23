import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { BsGlobe2, BsBuildingFillCheck } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineFlight } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const myColor = useColorModeValue("light", "dark");
  const navigate = useNavigate();

  // ✅ check if user is signed in
  const isAuth = localStorage.getItem("MkisAuth") === "true";

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("MkisAuth");
    localStorage.removeItem("MkuserData");
    navigate("/login"); // redirect to login page
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        justifyContent={"space-between"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        pr={{ sm: "80px" }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        {/* Logo */}
        <Flex flex={{ base: 100 }} justify={{ base: "space-between", md: "start" }}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Image
              src={
                myColor === "light"
                  ? "https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg"
                  : "https://i.postimg.cc/fRx4D7QH/logo3.png"
              }
              alt="logo"
              width={{ base: "350px", sm: "18%" }}
            />
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={6}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* Right side controls */}
        <Stack
          flex={{ base: 1, sm: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={{ base: 3, sm: 6 }}
        >
          <Box fontWeight={"500"} fontSize={{ base: "12px", sm: "16px" }} display={"flex"}>
            <Icon mt={1} mr={1} as={BsGlobe2} />
            English
          </Box>

          <Link as={RouterLink} to="/support" fontWeight={"500"} fontSize={{ base: "12px", sm: "16px" }}>
            Support
          </Link>

          <Link as={RouterLink} to="/trip" fontWeight={"500"} fontSize={{ base: "12px", sm: "16px" }}>
            Trip
          </Link>

          <Box fontWeight={"500"} fontSize={{ base: "16px", sm: "23px" }} display={"flex"}>
            <Icon mt={0.5} mr={1} as={IoIosNotifications} />
          </Box>

          {/* ✅ If logged in → show Logout, else show Sign In */}
          {isAuth ? (
            <Button onClick={handleLogout} colorScheme="red" size="sm" mr={9}>
              Logout
            </Button>
          ) : (
            <Link
              as={RouterLink}
              to="/login"
              fontWeight={"500"}
              fontSize={{ base: "12px", sm: "16px" }}
              mr={9}
            >
              Sign In
            </Link>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} mt={"12px"} zIndex={5}>
          <Link
            as={RouterLink}
            to={navItem.href ?? "#"}
            p={2}
            fontSize={13}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex py={2} justify={"space-between"} align={"center"}>
        <Link
          as={RouterLink}
          to={href ?? "#"}
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          _hover={{ textDecoration: "none" }}
        >
          {label}
        </Link>

        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link as={RouterLink} key={child.label} py={2} to={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "More Travels",
    children: [
      { label: "Stays", href: "/stays", icon: BsBuildingFillCheck },
      { label: "Flight", href: "/flights", icon: MdOutlineFlight },
      { label: "Car", href: "/cars", icon: AiFillCar },
    ],
  },
];