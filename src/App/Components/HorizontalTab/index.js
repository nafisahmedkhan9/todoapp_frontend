import React from 'react';
import { Card, Nav, Row, Col } from 'react-bootstrap';

class HorizontalTab extends React.Component {

    handleTab(index, tab) {
        this.props.onChange({ index: index, ...tab })
    }

    render() {
        const { title, tabs, navClassName } = this.props
        return (
            <Row>
                <Col md={12}>
                    <Nav className={navClassName} variant="tabs" activeKey={this.props.activeTab}>
                        {/* {title && <Nav.Link style={{ color: "black", boxShadow: "none", fontWeight: "bold" }} eventKey="title" disabled>{title}</Nav.Link>} */}
                        <Row>
                            {
                                tabs && tabs.length > 0 && tabs.map((data, index) => {
                                    return (
                                        <Col md={12}>
                                            <Card className="mb-2" style={{ boxShadow: "0px 2px 3px 1px lightgray" }}>
                                                <Card.Body className="p-4">
                                                    <Nav.Link onClick={this.handleTab.bind(this, index, data)} key={index}
                                                        style={{ background: "white", padding: "0px", boxShadow: "none", border: "none", fontSize: "large" }} eventKey={index}>
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <i style={{fontSize: "50px"}} className={`${data.icon} mr-2`}></i>
                                                            </Col>
                                                            <Col>
                                                                <span>{data.tab}</span>
                                                            </Col>
                                                        </Row>
                                                    </Nav.Link >
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </Nav >
                </Col>
            </Row>

        )
    }
}

export default HorizontalTab