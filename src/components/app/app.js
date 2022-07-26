import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import { Component } from 'react/cjs/react.production.min';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [
        {name: 'Alex', salary: 900, increase: false, id: 1, booster: false}, 
        {name: 'Oleg', salary: 5000, increase: true, id: 2, booster: true}, 
        {name: 'Anna', salary: 7000, increase: false, id: 3, booster: true}, 
      ], 
      term: '', 
      filter: 'all' ,
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
   this.setState(({data}) => {
      return {data: data.filter(item => item.id !== id)}
    })
  }

  onAddItem = (name, salary) => {
    if(name.length < 3 || salary.length === 0){
      return
    }

    const newItem = {
      name, 
      salary, 
      increase: false, 
      booster: false, 
      id: this.maxId++, 
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];

      return{
        data: newArr, 
      }
    })
  }

  onTogleIncrease = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id){
          return {...item, increase: !item.increase}
        }
        return item;
      })
    }))
  }

  onTogleBoost = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id){
          return {...item, booster: !item.booster}
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }
  onUpdataSearch = (term) => {
    this.setState({
      term, 
    })
  }

  filterPost = (items, filter) => {
    if (filter === 'booster') {
      return items.filter(item => item.booster);
    } else if (filter === '1000') {
      return items.filter(item => item.salary > 1000);
    } else{
      return items;
    }

  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  
  render() {
    const {data, term, filter} = this.state;
    const dataIncreace = data.filter(item => item.increase);
    const visibleData = this.filterPost( this.searchEmp(data, term), filter);


    return (
      <div className="app">
          <AppInfo length={data.length}
          increase={dataIncreace.length}/>
  
          <div className="search-panel">
              <SearchPanel onUpdataSearch={this.onUpdataSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onTogleIncrease={this.onTogleIncrease}
          onTogleBoost={this.onTogleBoost}/>
          <EmployeesAddForm addItem={this.onAddItem}/>
      </div>
    );
  }
}

export default App;
