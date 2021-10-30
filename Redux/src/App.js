import React from 'react';
import Header from './components/Header';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddNewProduct from './components/AddNewProduct';
import EditProduct from './components/EditProduct';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/new-product" component={AddNewProduct}></Route>
          <Route path="/edit-product" component={EditProduct}></Route>
          <Route path="/" component={ProductList}></Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
