import React from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
text-align: center;
background-color: grey;
border: 2px solid black;
`

export default function Form(props) {
    const {
        values,
        submit,
        change,
        errors,
        disabled
    } = props

    const onSubmit = event => {
        event.preventDefault()
        submit()
    }

    const onChange = event => {
        const { name, value, type, checked } = event.target
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse)
    }

    return (
        <FormWrapper>
        <div className="form">
            <form onSubmit={onSubmit} id="pizza-form">
                <h1> Create Your Pizza! </h1>


                <div className="errors">
                    <div className="error">{errors.name}</div>
                    <div className="error">{errors.size}</div>
                    <div className="error">{errors.email}</div>
                </div>

                <h2> Your Order Details </h2>

                <label className="label"> Name:
                    <input
                    type="text"
                    onChange={onChange}
                    name="name"
                    value={values.name}
                    />
                </label>
                <label className="label"> Email:
                    <input
                    type="email"
                    onChange={onChange}
                    name="email"
                    value={values.email}
                    />
                </label>

                <h4> Choice of Size (required) </h4>

                <label> Pick Size:
                    <select onChange={onChange}
                    value={values.size}
                    name="size"
                    id="size-dropdown"
                    >
                        <option value=""> -------------SIZE------------- </option>
                        <option value="small"> Snack (6" Diameter)</option>
                        <option value="medium"> Hungry (9" Diameter)</option>
                        <option value="large"> Starving (12" Diameter)</option>
                        <option value="extralarge"> Famished (18" Diameter)</option>
                    </select>
                </label>

                <h4> Any Toppings? (optional) </h4>
                <label> Peppers
                    <input 
                    type="checkbox"
                    onChange={onChange}
                    name="peppers"
                    checked={values.peppers}
                    />
                </label>

                <label> Onions
                    <input 
                    type="checkbox"
                    onChange={onChange}
                    name="onions"
                    checked={values.onions}
                    />
                </label>

                <label> Pepperoni
                    <input 
                    type="checkbox"
                    onChange={onChange}
                    name="pepperoni"
                    checked={values.pepperoni}
                    />
                </label>

                <label> Olives
                    <input 
                    type="checkbox"
                    onChange={onChange}
                    name="olives"
                    checked={values.olives}
                    />
                </label>

                <label> Anchovies
                    <input 
                    type="checkbox"
                    onChange={onChange}
                    name="anchovies"
                    checked={values.anchovies}
                    />
                </label>

                <label> Pineapple
                    <input 
                    id="special-instructions"
                    type="checkbox"
                    onChange={onChange}
                    name="pineapple"
                    checked={values.pineapple}
                    />
                </label>

                <h4> Anything Else? </h4>
                <p> We will do our best to accommodate any special requests. </p>
                <label className="label"> Special Instructions:
                    <input
                    type="text"
                    onChange={onChange}
                    name="specialInstructions"
                    value={values.specialInstructions}
                    />
                </label>
                
                <h4> </h4>

                <button id= "order-button" disabled={disabled}> Submit Your Order </button>

            </form>
        </div>
        </FormWrapper>
    )
}