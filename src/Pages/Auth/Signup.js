import React from 'react';
import { Form, Button, Card, Col, Row } from "react-bootstrap"
import { useCookies } from "react-cookie"
import * as actions from "../../Store/actions"
import { useHistory } from "react-router-dom"
import moment from "moment"

function Signup() {
    const [, setCookie] = useCookies([actions.CONS.COOKIE_NAME]);
    var history = useHistory()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password1, setPassword1] = React.useState("")
    const [password2, setPassword2] = React.useState("")

    const onSubmit = async () => {
        if (!name) {

        } else if (!email) {
            return alert("Please enter email")
        } else if (!password1) {
            return alert("Please enter password")
        } else if (!password2) {
            return alert("Please enter confirm password")
        } else if (password1 !== password2) {
            return alert("Password does not matched")
        } else {
            const func_response = await actions.UTILS.apiAction(
                actions.CONS.SIGNUP_API,
                "post",
                { email: email, password: password1, name: name },
            )
            console.log(func_response, "response")
            if (func_response.isSuccess) {
                console.log("in")
                if (func_response.response.success) {
                    saveUserDataInCookies(func_response.response, history)
                } else {
                    alert(func_response.response.status)
                }
            }
        }
    }

    const saveUserDataInCookies = (apiResponse, history) => {
        setCookie(actions.CONS.COOKIE_TOKEN_NAME, apiResponse.data.access_token, { path: "/" });
        setCookie("user", apiResponse.data.user, { path: "/" });
        setCookie("loginTime", moment().format("DD-MM-YYYY H:mm:ss"), { path: "/" });
        history.push(actions.CONS.TASK_LINK);
        return;
    };

    return (
        <Row style={{ justifyContent: "center", marginTop: "30px" }}>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Enter password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Re-enter password" />
                        </Form.Group>

                        <Button onClick={onSubmit} variant="primary" style={{ marginRight: "10px" }} type="submit">
                            Submit
                    </Button>
                        <Button onClick={() => history.push("/login")} variant="primary" type="submit">
                            Login
                    </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Signup;