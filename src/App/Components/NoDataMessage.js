import React from 'react';
import { Link } from "react-router-dom"
import { Button, Card } from 'react-bootstrap';

export default class NoDataMessage extends React.Component {
    render() {
        return (
            <Card.Body>
                <div className="card-block text-center">
                    <h3>{this.props.title}</h3>
                    
                    {
                        this.props.subtitle ? (
                            <p>{this.props.subtitle}</p>
                        ) : ""
                    } 

                    {
                        this.props.buttonTitle ? (
                            <Link to={this.props.addPath}><Button>{this.props.buttonTitle}</Button></Link>
                        ) : ""
                    }
                </div>
            </Card.Body>
        )
    }
}