import React from 'react';

const CustomerAddUpdateForm = ({
  formObject,
  handleInputChange,
  handleDeleteClick,
  handleSaveClick,
  handleCancelClick,
}) => {
  const mode = formObject.id >= 0 ? 'Update' : 'Add';

  return (
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form>
        <table id="customer-add-update">
          <tbody>
            <tr>
              <td className="label">Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formObject.name}
                  onChange={handleInputChange}
                  placeholder="Customer Name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formObject.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                />
              </td>
            </tr>
            <tr>
              <td className="label">Password:</td>
              <td>
                <input
                  type="text"
                  name="password"
                  value={formObject.password}
                  onChange={handleInputChange}
                  placeholder="password"
                />
              </td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={handleDeleteClick} disabled={formObject.id === -1} />
                <input type="button" value="Save" onClick={handleSaveClick} />
                <input type="button" value="Cancel" onClick={handleCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CustomerAddUpdateForm;
