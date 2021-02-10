import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class BillPres extends Component{
    constructor(props){
        super();
        this.state = {
            bgCol: 'black',
            fgCol: 'white'
        }
    }

    render(){
        return(
            <div>
                <Card id = "test" className = 'text-left'>
                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            <em>{this.props.sum}</em>
                        </Card.Text>
                        <hr />
                        <Card.Text>{this.props.auth}</Card.Text>
                        <Button variant="primary" href={this.props.link}>Link to Original</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}