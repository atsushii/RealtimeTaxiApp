import React, { useState } from 'react';
import { Formik } from 'formik';
import { Breadcrumb, Card, Col, Row, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function SignUp(props) {

    const [isSubmitted, setSubmitted] = useState(false);

    const onSubmit = async (values, actions) => {
        const url = '/api/sign_up';
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('password1', values.password1);
        formData.append('password2', values.password2);
        formData.append('group', values.group);
        formData.append('photo', values.photo);
        try {
            await axios.post(url, formData);
            setSubmitted(true);
        }
        catch (response) {
            const data = response.response.data;
            for (const value in data) {
                actions.setFieldError(value, data[value].join(' '))
            }
        }
    };

    if (isSubmitted) {
        return <Redirect to='/log-in' />
    }

    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header>Sign up</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                username: '',
                                firstName: '',
                                lastName: '',
                                password: '',
                                group: 'rider',
                                photo: []
                            }}
                            onSubmit={onSubmit}
                        >
                            {({
                                handleChange,
                                handleSubmit,
                                values
                            }) =>(
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            name='username'
                                            onChange={handleChange}
                                            values={values.username}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='firstName'>
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            name='firstName'
                                            onChange={handleChange}
                                            values={values.firstName}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='lastName'>
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            name='lastName'
                                            onChange={handleChange}
                                            values={values.lastName}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name='password'
                                            onChange={handleChange}
                                            values={values.password}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='group'>
                                        <Form.Label>Group</Form.Label>
                                        <Form.Control
                                            as='select'
                                            name='group'
                                            onChange={handleChange}
                                            values={values.group}
                                        >
                                            <option value='rider'>Rider</option>
                                            <option value='driver'>Driver</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='photo'>
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control
                                            name='photo'
                                            onChange={handleChange}
                                            type='file'
                                            values={values.photo}
                                        />
                                    </Form.Group>                                
                                    <Button block type='submit' variant='primary'>Sign up</Button>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                    <p className='mt-3 text-center'>
                        Already have an account? <Link to='/log-in'>Log in!</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    );
}

export default SignUp;