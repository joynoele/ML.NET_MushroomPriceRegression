import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// Stolen from: https://stackoverflow.com/questions/50537866/invoke-componentdidupdate-on-form-submit

export class MyInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataitem: '',
            year: '',
            region: '',
            price: '',
            queryHistory: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    translateRegionToModelInput(item) {
        let ret = null;
        switch (item) {
            case 'EASTERN':
                ret = 'EASTERN STATES';
                break;
            case 'EASTERN+':
                ret = 'EASTERN STATES, OTHER';
                break;
            case 'CENTRAL':
                ret = 'CENTRAL STATES';
                break;
            case 'WESTERN':
                ret = 'WESTERN STATES';
                break;
            case 'WESTERN+':
                ret = 'WESTERN STATES, OTHER';
                break;
            default:
                ret = null;
        }
        return ret;
    }

    translateDataItemToModelInput(item) {
        let ret = null;
        switch (item) {
            case 'AGARICUS':
                ret = 'MUSHROOMS, AGARICUS - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'AGARICUS, FRESH':
                ret = 'MUSHROOMS, AGARICUS, FRESH MARKET - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'AGARICUS, PROCESSED':
                ret = 'MUSHROOMS, AGARICUS, PROCESSING - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'SPECIALTY':
                ret = 'MUSHROOMS, SPECIALTY - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'SPECIALTY, OYSTER':
                ret = 'MUSHROOMS, SPECIALTY, OYSTER - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'SPECIALTY, SHIITAKE':
                ret = 'MUSHROOMS, SPECIALTY, SHIITAKE - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            case 'SPECIALTY, OTHER':
                ret = 'MUSHROOMS, SPECIALTY, OTHER - PRICE RECEIVED, MEASURED IN $ / LB';
                break;
            default:
                ret = 'MUSHROOMS - PRICE RECEIVED, MEASURED IN $ / LB';
        }
        return ret;
    }

    GetPricePrediction(d) {
        let modelinput = { Data_Item: this.translateDataItemToModelInput(d.dataitem), Year: d.year, Region: this.translateRegionToModelInput(d.region) };
        fetch('api/ML', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modelinput)
        })
            .then(result => {
                return result.json();
            }).then(data => {
                let price = data.score;
                console.log("Price estimate: " + data.score);

                const query = { dataitem:d.dataitem, year:d.year, region:d.region, price: price }
                const queryHist = [query, ...this.state.queryHistory];
                console.log(queryHist);
                this.setState({
                    price: price,
                    queryHistory: queryHist
                });
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        const dataitem = this.dataitem.value;
        const year = this.year.value;
        const region = this.region.value;

        this.setState({
            dataitem: dataitem,
            year: year,
            region: region,
            price: '', 
        });

        let testData = { dataitem: dataitem, year: year, region: region }
        this.GetPricePrediction(testData);
    }

    render() {
        return (
            <Container>
                <Row>
                    <form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Data Item: </Form.Label>
                            <Form.Control as="select" name="dataItemSelect" ref={input => this.dataitem = input} >
                                <option defaultValue value="MUSHROOM">MUSHROOM</option>
                                <option value="AGARICUS">AGARICUS</option>
                                <option value="AGARICUS, FRESH">AGARICUS, FRESH</option>
                                <option value="AGARICUS, PROCESSED">AGARICUS, PROCESSED</option>
                                <option value="SPECIALTY">SPECIALTY</option>
                                <option value="SPECIALTY, OYSTER">SPECIALTY, OYSTER</option>
                                <option value="SPECIALTY, SHIITAKE">SPECIALTY, SHIITAKE</option>
                                <option value="SPECIALTY, OTHER">SPECIALTY, OTHER</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select" name="yearSelect" ref={input => this.year = input} >
                                <option defaultValue value="2020">2020 (future)</option>
                                <option value="2019">2019 (future)</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                                <option value="2010">2010</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Region</Form.Label>
                            <Form.Control as="select" name="regionSelect" ref={input => this.region = input} >
                                <option value=""></option>
                                <option value="EASTERN">EASTERN</option>
                                <option value="EASTERN+">EASTERN+</option>
                                <option defaultValue value="CENTRAL">CENTRAL</option>
                                <option value="WESTERN">WESTERN</option>
                                <option value="WESTERN+">WESTERN+</option>
                            </Form.Control>
                        </Form.Group>


                        <Button type="submit" >Submit</Button>
                    </form>
                </Row>
                <hr />

                <Form.Group >
                    <Row>
                        <Form.Label>Data Item: </Form.Label>
                        <Col>{this.state.dataitem}</Col>
                    </Row>
                    <Row >
                        <Form.Label>Year: </Form.Label>
                        <Col>{this.state.year}</Col>
                    </Row>
                    <Row >
                        <Form.Label>Region: </Form.Label>
                        <Col>{this.state.region}</Col>
                    </Row>
                    <Row >
                        <Form.Label>Estimated Price ($/lb): </Form.Label>
                        <Col>{this.state.price}</Col>
                    </Row>
                </Form.Group>
                <hr />
                {this.state.queryHistory.map((info, index) => <Card key={index} info={info} />)}

            </Container>
        )
    }
}

const Card = props =>
    <div className="col-md-6 col-lg-3">
        <div className="card mb-3">
            <div className="card-body">
                <p className="card-title"><span>Data Item: </span>{props.info.dataitem}</p>
                <p className="card-title"><span>Year: </span>{props.info.year}</p>
                <p className="card-title"><span>Region: </span>{props.info.region}</p>
                <p className="card-title"><span>Predicted Price($/lb): </span>{props.info.price}</p>
            </div>
        </div>
    </div>;

