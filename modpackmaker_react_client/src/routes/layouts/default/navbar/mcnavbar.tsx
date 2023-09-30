import { Link } from "react-router-dom";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button,
  Link as NextuiLink,
} from "@nextui-org/react";
import Logo from "./logo/Logo";

export default function MCNavbar(){
    return(
        <Navbar>
            <NavbarBrand>
                <Logo/>
                <p className="font-bold text-inherit">Modpack Maker</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NextuiLink>
                        <Link to="/">Home</Link>
                    </NextuiLink>
                </NavbarItem>
                <NavbarItem isActive>
                    <NextuiLink>
                        <Link to="/about">About</Link>
                    </NextuiLink>
                </NavbarItem>
                <NavbarItem>
                    <NextuiLink>
                        <Link to="/dashboard">Dashboard</Link>
                    </NextuiLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <NextuiLink>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </NextuiLink>
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}