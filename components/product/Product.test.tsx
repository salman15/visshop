// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Product from './Product'
import { productProps } from '../../interface'

const item: productProps = {
    id: 1,
    attributes: {
        price: 10.50,
        qty: 10,
        title: 'Shrimp',
        description: 'Fresh shrimp',
        details: 'New product',
    }
}

test('Renders', async () => {
    const { container, getByRole } = render(<Product item={item} />)
    expect(getByRole('add-to-cart')).toBeTruthy()
    expect(container).toMatchSnapshot()

})