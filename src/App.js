import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header"
import Form from "./components/Form"
import schema from "./validation/formSchema"
import styled from "styled-components"
import * as yup from "yup"

const apiLink = "https://reqres.in/";

const initialFormValues = {
  name: "",
  email: "",
  size: "",
  peppers: false,
  onions: false,
  pepperoni: false,
  olives: false,
  specialInstructions: ""
}

const initialErrorValues = {
  name: "",
  email: "",
  size: ""
};

const initialOrders = []

const initialDisabled = true

const HeaderWrapper = styled.header`
text-align: center;
border: 2px solid black;
`


const App = () => {
  const [ formValues, setFormValues ] = useState(initialFormValues)
  const [ errorValues, setErrorValues ] = useState(initialErrorValues)
  const [ disabled, setDisabled ] = useState(initialDisabled)
  const [pizzaOrder, setPizzaOrder] = useState(initialOrders)

  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setErrorValues({
        ...errorValues,
        [name]: "",
      })
    })
    .catch(err => {
      setErrorValues({
        ...errorValues,
        [name]: err.errors[0],
      })
    })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const postPizzaOrder = (newPizza) => {
    axios
    .post(apiLink, newPizza)
    .then((res) => {
      console.log(res.data)
      setPizzaOrder([res.data, ...pizzaOrder])
    }).catch((err) => {
      console.log(err)
    })
    setFormValues(initialFormValues)
  }

  const formSubmit = () => {
    const newPizza={
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      size: formValues.size.trim(),
      toppings: ['peppers', 'onions', 'pepperoni', 'olives', 'anchovies', 'pineapple'].filter((topping) => formValues[topping]
      ),
      specialInstructions: formValues.specialInstructions.trim()
    }
    postPizzaOrder(newPizza)
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled((!valid)))
  }, [formValues])


  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HeaderWrapper>
            <Header />
            <div>
              {pizzaOrder.map((order) => {
                return <p key="order.specialInstructions"> 
                Pizza ordered by {order.name}, confirmation sent to {order.email}. Special instructions: {order.specialInstructions}
                </p>
              })}
            </div>
          </HeaderWrapper>
        </Route>
        <Route exact path="/pizza">
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <Form values={formValues} errors={errorValues} disabled={disabled} change={inputChange} submit={formSubmit}/>
        </Route>
      </Switch>
    </div>
  );
};
export default App;