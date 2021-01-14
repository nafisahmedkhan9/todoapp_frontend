import React from 'react';
import { Navbar, Nav } from "react-bootstrap"
import * as actions from "../../../Store/actions"
import { useCookies } from "react-cookie"
import { useHistory } from "react-router-dom"

function App() {
    const history = useHistory()
    const [cookie, , removeCookie] = useCookies([actions.CONS.COOKIE_NAME])
    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg']
    return (
        <header className={headerClass.join(" ")}>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">{actions.CONS.FULL_TITLE}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href={actions.initialState.basename + actions.CONS.TASK_LINK}>TASK</Nav.Link>
                        <Nav.Link href={actions.initialState.basename + actions.CONS.BUCKET_LINK}>BUCKET</Nav.Link>
                        <Nav.Link onClick={() => {
                            removeCookie(actions.CONS.COOKIE_TOKEN_NAME, { path: "/" })
                            removeCookie("user", { path: "/" })
                            removeCookie("loginTime", { path: "/" })
                            history.push(actions.CONS.LOGIN_LINK)

                        }}>LOGOUT</Nav.Link>
                        <div style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "10px",
                            background: "red",
                            padding: "5px",
                        }}>{cookie.user.name}</div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default App;
