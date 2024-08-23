export function CustomersList ({customers, selectedCustomerId, handleListClick}) {
    return (
        <div className='customer-list'>
        <h2>CUSTOMERS</h2>
        <table class='customers-list' id='customer-list'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) =>  (
              <tr key={customer.id} onClick={() => handleListClick(customer)} className={(selectedCustomerId === customer.id) ? 'selected': ''}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}