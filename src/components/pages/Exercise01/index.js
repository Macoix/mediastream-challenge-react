/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    } 
  ]

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => {
    let total = 0;
    cart.forEach(item => total+= item.price * item.quantity);
    const arrayIds = cart.map(item => item.id);
    discountRules.forEach( element => {
      if(element.m.sort().toString() === arrayIds.sort().toString()){
        const discount = total * element.discount;
        total = total - discount;
      }
    })
    return total; 
  }

  const addToCart = (movie)  => {
    const findItem = cart.findIndex(item => item.id === movie.id);
    if(findItem >= 0) {
      cart[findItem].quantity += 1;
      setCart([...cart]); 
    } else {
      movie.quantity = 1;
      setCart([...cart, movie]);
    }
  }

  const decrementQuantity = (id) => {
    const findItem = cart.findIndex(item => item.id === id);
    if(cart[findItem].quantity === 1) {
      setCart(cart.filter(element => element.id !== id));
    } else if (cart[findItem].quantity > 1) {
      cart[findItem].quantity -=  1;
      setCart([...cart]); 
    }
  }
  const incrementQuantity = (id) => {
    const findItem = cart.findIndex(item => item.id === id);
    cart[findItem].quantity = cart[findItem].quantity + 1;
    setCart([...cart]);
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={o.id} className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        {
          Boolean(cart.length) ? 
          (
          <>
            <ul>
              {cart.map(x => (
                <li key={x.id} className="movies__cart-card">
                  <ul>
                    <li>
                      ID: {x.id}
                    </li>
                    <li>
                      Name: {x.name}
                    </li>
                    <li>
                      Price: ${x.price}
                    </li>
                  </ul>
                  <div className="movies__cart-card-quantity">
                    <button onClick={() => decrementQuantity(x.id)}>
                      -
                    </button>
                    <span>
                      {x.quantity}
                    </span>
                    <button onClick={() => incrementQuantity(x.id)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="movies__cart-total">
              <p>Total: ${getTotal()}</p>
            </div>
          </>
          ) : (
            <>
              <div className="movies__cart-empty">
              <p>Cart is empty!</p>
            </div>
            </>
          )
        }
      </div>
    </section>
  )
} 