/** @format */

import React from "react";
import { Layout } from "../component/Layout";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BankBni from "../images/bni.png";
import BankBri from "../images/bri.png";
import BankBCA from "../images/bca.jpg";
import BankMandiri from "../images/mandiri.png";
import OVO from "../images/OVO.png";
import Gopay from "../images/gopay.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const Checkout = () => {
  const history = useHistory();
  const productState = useSelector((state) => state.productReducer);

  const [checkoutData, setCheckoutData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    province: "",
    city: "",
    postal_code: "",
    phone_number: "",
    product_id: ""
  });

  const onChangeField = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(checkoutData, productState);

    try {
      const request = await axios.post(
        `http://localhost:8000/checkout`,
        { ...checkoutData, product_id: productState.cartItem[0].id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (request.data.code === 201) {
        alert("succes to checkout");
        history.push("/status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="payment">
        <Card>
          <Card.Header>Checkout</Card.Header>
          <Card.Body>
            <Form>
              <div className="double-input">
                <Form.Group className="mb-3 half-input">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your first name"
                    name="first_name"
                    onChange={onChangeField}
                    value={checkoutData.first_name}
                  />
                </Form.Group>
                <Form.Group className="mb-3 half-input">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Last name"
                    name="last_name"
                    onChange={onChangeField}
                    value={checkoutData.last_name}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-3 first-name">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  placeholder="Your Address"
                  name="address"
                  onChange={onChangeField}
                  value={checkoutData.address}
                />
              </Form.Group>
              <div className="double-input">
                <Form.Group className="mb-3 half-input">
                  <Form.Label>State/Province</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State or Province"
                    name="province"
                    onChange={onChangeField}
                    value={checkoutData.province}
                  />
                </Form.Group>
                <Form.Group className="mb-3 half-input">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your City"
                    name="city"
                    onChange={onChangeField}
                    value={checkoutData.city}
                  />
                </Form.Group>
              </div>

              <div className="double-input">
                <Form.Group className="mb-3 half-input">
                  <Form.Label>Zip/Postal Code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Zip or Postal Code"
                    name="postal_code"
                    onChange={onChangeField}
                    value={checkoutData.postal_code}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-3 half-input">
                <Form.Label>phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="phone"
                  name="phone_number"
                  value={checkoutData.phone_number}
                  onChange={onChangeField}
                />
              </Form.Group>
              <div className="payment-method">
                <div className="payment-source">
                  <p>Payments</p>
                  <Form.Check type="radio" name="payment-method" label="bni" />
                  <img src={BankBni} style={{ width: "100px" }} />
                  <Form.Check type="radio" name="payment-method" label="bri" />
                  <img src={BankBri} style={{ width: "80px" }} />
                  <Form.Check type="radio" name="payment-method" label="bca" />
                  <img src={BankBCA} style={{ width: "80px" }} />
                  <Form.Check
                    type="radio"
                    name="payment-method"
                    label="Mandiri"
                  />
                  <img src={BankMandiri} style={{ width: "100px" }} />
                  <Form.Check type="radio" name="payment-method" label="OVO" />
                  <img src={OVO} style={{ width: "100px" }} />
                  <Form.Check
                    type="radio"
                    name="payment-method"
                    label="Gopay"
                  />
                  <img src={Gopay} style={{ width: "100px" }} />
                </div>
              </div>
            </Form>
            <div className="payment-btn">
              <Button variant="primary" onClick={onSubmit}>
                Proceed
              </Button>
              <Link to="/cart">
                <Button variant="danger">Go Back</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};
