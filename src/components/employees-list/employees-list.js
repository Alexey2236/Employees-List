import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onTogleBoost, onTogleIncrease}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item
        return (
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            onTogleBoost={() => onTogleBoost(id)}
            onTogleIncrease={() => onTogleIncrease(id)}/>
        )
    })
    return (
        <ul className="app-list list-group">
           {elements}
        </ul>
    )
}

export default EmployeesList;