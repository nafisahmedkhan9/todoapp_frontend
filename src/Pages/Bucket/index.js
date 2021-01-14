import React from 'react';
import { Form, Card, Row, Col, Table, Container, Button } from "react-bootstrap"
import { useCookies } from "react-cookie"
import * as actions from "../../Store/actions"

function Bucket() {
    const [isFormVisible, setIsFormVisible] = React.useState()
    const [cookie] = useCookies([actions.CONS.COOKIE_NAME])
    const token = cookie[actions.CONS.COOKIE_TOKEN_NAME]
    const [buckets, setBuckets] = React.useState({})
    const [name, setName] = React.useState("")

    React.useEffect(()=> {
        getBucket()
    },[])

    const getBucket = async ()=>{
        const func_response = await actions.UTILS.apiAction(
            actions.CONS.BUCKET_API,
            "get",
            null,
            token,
        )
        console.log(func_response, "respone")
        setBuckets(func_response.response)
    }

    const postBucket = async ()=>{
        if(!name)return alert("Please enter name")
        const func_response = await actions.UTILS.apiAction(
            actions.CONS.BUCKET_API,
            "post",
            {name: name},
            token,
        )

        if(func_response.isSuccess){
            getBucket()
            setIsFormVisible(false)
            alert("Successfully added")
        }
    }

    const bucketList = buckets.results && buckets.results.length > 0 && buckets.results.map((b, index) => {
        return (
            <tr key={index}>
                <td>{b.name}</td>
            </tr>
        )
    })

    return (
        <Container fluid>
            <Container>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={12}>
                                <Card className="mb-2">
                                    <Card.Body>
                                        <Row>
                                            <Col d={6}>
                                                <h3>Bucket</h3>
                                            </Col>
                                            <Col md={6} style={{ textAlign: "end" }}>
                                                <Button size="sm" onClick={()=>setIsFormVisible(true)} variant="primary" type="submit">
                                                    Add New Bucket
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {
                                isFormVisible && (
                                    <Col md={12}>
                                        <Card className="mb-2">
                                            <Card.Body>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Button className="mr-2" onClick={postBucket} variant="primary">
                                                            Submit
                                                </Button>
                                                        <Button onClick={() => setIsFormVisible(false)} variant="primary">
                                                            Cancel
                                                </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bucketList}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row >

                    </Col>
                </Row>
            </Container >
        </Container >
    );
}

export default Bucket;
