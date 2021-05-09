import { React, useState } from 'react';
import Header from './Header';
import { Table } from 'react-bootstrap';

function SearchProduct() {
  const [data, setData] = useState([]);
  async function search(key) {
    if (key.length > 1) {
      let result = await fetch('http://localhost:8000/api/search/' + key);
      result = await result.json();
      console.warn(result);
      setData(result);
    }
  }
  return (
    <div>
      <Header />
      <div className='col-sm-6 offset-sm-3'>
        <h1>Search Product</h1>
        <br />
        <input
          type='text'
          onChange={e => search(e.target.value)}
          className='form-control'
          placeholder='Search Products'
        />
        <br />
        {data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {' '}
                    <img
                      style={{ width: 100 }}
                      src={'http://localhost:8000/' + item.file_path}
                      alt='Loading'
                    />{' '}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          'Your results will display here'
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
