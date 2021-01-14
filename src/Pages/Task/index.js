import React from 'react';
import { Card, Row, Col, Table, Container, Button, Form } from "react-bootstrap"
import { useCookies } from "react-cookie"
import * as actions from "../../Store/actions"

function Bucket() {
    const [isFormVisible, setIsFormVisible] = React.useState()
    const [cookie] = useCookies([actions.CONS.COOKIE_NAME])
    const token = cookie[actions.CONS.COOKIE_TOKEN_NAME]
    const [tasks, setTasks] = React.useState({})
    const [buckets, setBuckets] = React.useState({})
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [priority, setPriority] = React.useState("")
    const [bucket, setBucket] = React.useState("")
    const [id, setId] = React.useState("")

    React.useEffect(async () => {
        getBucket()
        getTask()
    }, [])

    const getTask = async () => {
        const func_response = await actions.UTILS.apiAction(
            actions.CONS.TASK_API,
            "get",
            null,
            token,
        )
        console.log(func_response, "taks")
        setTasks(func_response.response)
    }

    const getBucket = async () => {
        const func_response = await actions.UTILS.apiAction(
            actions.CONS.BUCKET_API,
            "get",
            null,
            token,
        )
        console.log(func_response, "bucket")
        setBuckets(func_response.response)
    }

    const submitForm = async () => {
        if (!title) {
            return alert("Please enter name")
        } else if (!description) {
            return alert("Please enter description")
        } else if (!priority) {
            return alert("Please select prirority")
        } else if (!status) {
            return alert("Please select status")
        } else if (!bucket) {
            return alert("Please select bucket")
        } else {
            var url = id ? actions.CONS.TASK_API + id + "/" : actions.CONS.TASK_API
            var method = id ? "PUT" : "POST"
            postOrPutTask(url, method, { title: title, description: description, priority: priority, status: status, bucket: bucket, user: cookie.user.id })
        }
    }

    const postOrPutTask = async (url, method, body) => {
        const func_response = await actions.UTILS.apiAction(
            url,
            method,
            body,
            token,
        )

        if (func_response.isSuccess) {
            getTask()
            resetFields()
            method.toLowerCase() === "post" ? alert("Successfully added") : alert("Successfully updated")
        }
    }

    const deleteTask = async (id) => {
        var url = actions.CONS.TASK_API + id + "/"
        await actions.UTILS.apiAction(
            url,
            "delete",
            null,
            token,
        )
        getTask()
        alert("Successfully deleted")
    }

    const statusChange = (status, data) => {
        var url = actions.CONS.TASK_API + data.id + "/"
        data.status = status
        data.bucket = data.bucket.id
        data.user = cookie.user.id

        postOrPutTask(url, "PUT", data)
    }

    const mapFieldValue = (data => {
        setTitle(data.title)
        setDescription(data.description)
        setPriority(data.priority)
        setStatus(data.status)
        setBucket(data.bucket.id)
        setId(data.id)
        setIsFormVisible(true)
    })

    const resetFields = (data => {
        setTitle("")
        setDescription("")
        setPriority("")
        setStatus("")
        setBucket("")
        setId("")
        setIsFormVisible(false)
    })

    const taksList = tasks.results && tasks.results.length > 0 && tasks.results.map(t => {
        return (
            <tr>
                <td>
                    <Button size="sm" variant="primary" onClick={() => mapFieldValue(t)} className="mr-1 mb-1">Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => deleteTask(t.id)} className="mr-1 mb-1">Delete</Button>
                </td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.priority}</td>
                <td>
                    <Button size="sm" onClick={() => statusChange("Pending", t)} disabled={t.status === "Pending"} variant={t.status === "Pending" ? "success" : "light"} className="mr-1 mb-1">Pending</Button>
                    <Button size="sm" onClick={() => statusChange("Progress", t)} disabled={t.status === "Progress"} variant={t.status === "Progress" ? "success" : "light"} className="mr-1 mb-1">Progress</Button>
                    <Button size="sm" onClick={() => statusChange("Completed", t)} disabled={t.status === "Completed"} variant={t.status === "Completed" ? "success" : "light"} className="mr-1 mb-1">Completed</Button>
                </td>
                <td>{t.bucket.name}</td>
            </tr>
        )
    })

    const bucketOptions = buckets.results && buckets.results.length > 0 && buckets.results.map((b, index) => {
        if (index === 0) return (<><option value={""}>Select</option><option value={b.id}>{b.name}</option></>)
        return (
            <option value={b.id}>{b.name}</option>
        )
    })

    console.log("p", priority, "s", status, "b", bucket)
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
                                                <h3>Tasks</h3>
                                            </Col>
                                            <Col md={6} style={{ textAlign: "end" }}>
                                                <Button size="sm" onClick={() => setIsFormVisible(true)} variant="primary" >
                                                    Add New Tasks
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
                                                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter name" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter name" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form>
                                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                                <Form.Label>Priority</Form.Label>
                                                                <Form.Control value={priority} onChange={(e) => { setPriority(e.target.value) }} as="select" custom>
                                                                    <option value={''}>Select</option>
                                                                    <option>Normal</option>
                                                                    <option>Important</option>
                                                                    <option>Urgent</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form>
                                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                                <Form.Label>Status</Form.Label>
                                                                <Form.Control value={status} onChange={(e) => { setStatus(e.target.value) }} as="select" custom>
                                                                    <option value={""}>Select</option>
                                                                    <option>Pending</option>
                                                                    <option>Progress</option>
                                                                    <option>Completed</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form>
                                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                                <Form.Label>Bucket</Form.Label>
                                                                <Form.Control value={bucket} onChange={(e) => { setBucket(e.target.value) }} as="select" custom>
                                                                    {bucketOptions}
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Button className="mr-2" onClick={submitForm} variant="primary">
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
                                                    <th>Actions</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Priority</th>
                                                    <th>Status</th>
                                                    <th>Bucket</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {taksList}
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
