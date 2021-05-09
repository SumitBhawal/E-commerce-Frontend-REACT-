import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch('http://localhost:8000/api/delete/' + id, {
      method: 'DELETE',
    });
    result = await result.json();
    console.warn(result);
    getData();
  }

  async function getData() {
    let result = await fetch('http://localhost:8000/api/list');
    result = await result.json();
    setData(result);
  }

  return (
    <div>
      <Header />
      <div className='col-8 offset-sm-2'>
        <h1>Product List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Operations</th>
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
                <td>
                  <span
                    className='delete'
                    onClick={() => deleteOperation(item.id)}
                  >
                    Delete
                  </span>
                </td>
                <td>
                  <Link to={'update/' + item.id}>
                    <span className='update'>Update</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
