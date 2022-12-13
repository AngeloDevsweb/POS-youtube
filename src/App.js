
import { useContext } from 'react';
import './App.css';
import data from './data';
import { Store } from './utils/Store';
import appFirebase from './credenciales'

import {getFirestore, collection, addDoc} from 'firebase/firestore'

const db = getFirestore(appFirebase)

function App() {

  const {state, dispatch} = useContext(Store)
  const {
    cart: { cartItems },
  } = state;

  const addToCart = (id)=>{

    const product = data.products.find(x => x.id === id)
    const existItem = state.cart.cartItems.find(x => x.id === product.id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    dispatch({type: 'ADD_TO_CART', payload: { ...product, quantity}})
  }

  const delToCart = (id)=>{
    dispatch({type: 'CART_REMOVE_ITEM', payload: id})
  }

  //esta funcion es para guardar la venta en la api o base de datos
  const saveInfo = async()=>{
    try { 
      await addDoc(collection(db, 'ventas'),{
        ...arreglo, subtotal
      })
      
    } catch (error) {
      alert('ocurrio un error')
      console.log(error);
    }
    dispatch({type: 'REMOVE_CART'})
    alert('guardado con exito')
  }

  const subtotal = cartItems.reduce((a,c)=> a+c.quantity*c.precio,0);
  const arreglo = cartItems;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {/* esta seccion es para la parte de los productos */}
            <h1 className="text-center mt-4 mb-5">lista de comidas</h1>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {data.products.map((product) => (
                <div key={product.id}>
                  <img
                    src={product.image}
                    alt="esta es una imagen del producto"
                    height={250}
                    width="100%"
                  />
                  <h3>{product.name}</h3>
                  <h5>{product.precio}$</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            {/* esta seccion es para la orden de compra */}
            <div className="card card-body mt-5">
              <h3 className="text-center">Orden de compra</h3>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>
                    <button
                      className="btn btn-danger"
                      onClick={() => delToCart(item)}
                    >
                      X
                    </button>
                    <strong>{item.name}</strong>
                  </p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              ))}

              <div>
                Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                {cartItems.reduce((a, c) => a + c.quantity * c.precio, 0)}
              </div>

              {cartItems.length ? (
                <button className="btn btn-success" onClick={saveInfo}>
                  Guardar Venta
                </button>
              ) : (
                <button className="btn btn-secondary">Guardar Venta</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* esta seccion es para el pie de pagina */}

      <footer className="bg-dark p-3 mt-5">
        <p className="text-center text-white">todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;
