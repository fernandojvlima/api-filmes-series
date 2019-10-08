import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState('open');
  const toggle = () => { setOpen(!open) };
  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/generos">Gêneros</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/series">Séries</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>)
}

export default Header;