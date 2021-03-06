import React, { useEffect, useState } from 'react';
import {
    Breadcrumb, Card, Col, Row
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import TripCard from './TripCard';
import { isRider } from '../services/AuthService';
import { getTrips } from '../services/TripService';


const getCurrentTrips = () => {
    return trips.filter(trip => {
        return (
            trip.driver !== null &&
            trip.status !== 'REQUESTED' &&
            trip.status !== 'COMPLETED'
        );
    });
};

const getCompletedTrips = () => {
    return trips.filter(trip => {
        return trip.status === 'COMPLETED';
    });
};

function Rider (props) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const loadTrips = async () => {
            const { response, isError } = await getTrips();
            if (isError) {
                setTrips([]);
            } else {
                setTrips([response.data]);
            }
        }
        loadTrips();
    }, [])

    if (!isRider()) {
        return <Redirect to='/' />
    }
    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Card className='mb-3'>
                    <Card.Header>Current Trip</Card.Header>
                    <Card.Body>
                        No trips.
                    </Card.Body>
                </Card>
                <Card className='mb-3'>
                    <Card.Header>Recent Trips</Card.Header>
                    <Card.Body>
                        No trips
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Rider;