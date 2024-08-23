export function CustomerAddUpdateForm ({formData, handleInputChange, onSaveClick, onDeleteClick, onCancelClick}) {
    return (
        <div className='customer-form'>
        <h2>{formData.id ? 'UPDATE' : 'ADD'}</h2>
        <form onSubmit={onSaveClick}>
          <table>
            <tbody>
              <tr>
                <td><label>Name : </label></td>
                <td><input
                 type='text'
                 name='name'
                 id='name'
                 value={formData.name}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr>
                <td><label>Email : </label></td>
                <td><input
                 type='email'
                 name='email'
                 id='email'
                 value={formData.email}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr>
                <td><label>Password : </label></td>
                <td><input
                 type='text'
                 name='password'
                 id='password'
                 value={formData.password}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr className="button-bar">
                <td colSpan="2">
                  <button type="button" onClick={onDeleteClick} class="style-button">Delete</button>
                  <button type="submit" class="style-button">Save</button>
                  <button type="button" onClick={onCancelClick} class="style-button">Cancel</button>
                </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
}