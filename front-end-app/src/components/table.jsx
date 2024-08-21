import { useState, useEffect } from "react";
import { getAll, get, post, put, deleteById } from '../restdb';
import { Form } from "./form";

// Sample Data for demonstration purposes
let customers = [
    {name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj', id: 1},
    {name: 'Katie Kates', email: 'katiek@abc.com', password: 'katiek', id: 2},
    {name: 'Glen Glenns', email: 'gleng@abc.com', password: 'gleng', id: 3}
]

const newCustomer = {
    name: "",
    email: "",
    password: "",
    id: -1
}

export const Table = () => {

    // To manage new customer entry
    const [cust, setCust] = useState(newCustomer);

    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        console.log('in getCustomers()')
        getAll(setCustomers);
    }

    useEffect(() => {
        getCustomers();
    }, [cust])

    const handleChange = (e) => {
        setCust({
            ...cust,
            [e.target.id]: e.target.value
        })
    }

    const onSaveClick = () => {
        console.log('in onSaveClick()')
        let callback = () => setCust(newCustomer)
        if(cust.id === -1) {
            post(cust, callback)
        } else {
            put(cust.id, cust, callback)
        }
        onCancelClick()
    }

    const onDeleteClick = () => {
        console.log('in onDeleteClick()')
        let callback = () => setCust(newCustomer)
        if(cust.id !== -1) {
            deleteById(cust.id, callback)
        }
    }

    const onCancelClick = () => {
        console.log('in onCancelClick()')
        setCust(newCustomer)
    }

    const handleListClick = (index) => {
        console.log('in handleListClick()')
        if(customers[index].id === cust.id) {
            setCust(newCustomer)
        } else {
            setCust(customers[index])
        }
    }

    return (
        <div>
            <div className="boxed">
                <h4>Customer List</h4>
                    <table id="customer-list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Pass</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((entry, index) => (
                                <tr key={index} onClick={() => handleListClick(index)}>
                                    {cust.id === entry.id?(
                                        <>
                                            <td><strong>{entry.name}</strong></td>
                                            <td><strong>{entry.email}</strong></td>
                                            <td><strong>{entry.password}</strong></td>
                                        </>
                                    ):(
                                        <>
                                            <td>{entry.name}</td>
                                            <td>{entry.email}</td>
                                            <td>{entry.password}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Form cust={cust} onDeleteClick={onDeleteClick} onSaveClick={onSaveClick} onCancelClick={onCancelClick} handleChange={handleChange}/>
            </div>
    )
}