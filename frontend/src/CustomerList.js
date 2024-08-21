import React from 'react';

const CustomerList = ({ customers, selectedCustomerId, handleListClick }) => (
  <div className="boxed">
    <h4><b>Mihir Dholakia's:-  Customer List</b></h4>
    <table id="customer-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((item) => (
          <tr
            key={item.id}
            onClick={() => handleListClick(item)}
            style={selectedCustomerId === item.id ? { fontWeight: 'bold', backgroundColor: '#d1ecf1' } : {}}
          >
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerList;
