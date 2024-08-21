export const Form = ({ cust, onDeleteClick, onCancelClick, onSaveClick, handleChange }) => {
    return (
                <div className="boxed">
                    <h4>{cust.id === -1?'Add':'Update'}</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="#name">Name:</label></td>
                                <td><input id="name" type="text" value={cust.name} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="#email">Email:</label></td>
                                <td><input id="email" type="email" value={cust.email} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="#password">Pass:</label></td>
                                <td><input id="password" type="password" value={cust.password} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type="button" onClick={onDeleteClick}>Delete</button>
                                    <button type="button" onClick={onSaveClick}>Save</button>
                                    <button type="button" onClick={onCancelClick}>Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    )
}