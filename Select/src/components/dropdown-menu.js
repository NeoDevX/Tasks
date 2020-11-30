import React, { Component } from "react";
import SearchItem from "./search-item";

export default class DropDownMenu extends Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'inactive', label: 'Inactive'}
    ];

    onOptionClick = (e) => {
        this.props.onOptionClick(e);
    }
    
    render() {
        const { options, onToggleActive, onSearchChange, 
            onFilterChange, filter, onMultiple, isMultiple } = this.props;
        const multipleClass = (isMultiple === false) ? "btn multiple btn-danger" :
            "btn multiple btn-success";
        const optionElems = options.map((item) => {
            const { id, text, isActive } = item;
            let classNames = "options dropdown-item";
    
            if (isActive)
                classNames += " isActive";
    
            return (
                <option className={ classNames } 
                        key={ id }
                        onClick={ () => onToggleActive(id) }>
                    { text }
                </option>
            );
        });

        const buttons = this.buttons.map(({ name, label }) => {
            const isTurnOn = filter === name;
            const classNames = isTurnOn ? 'btn btn-filter btn-info' : 
                'btn btn-filter btn-danger';
            return (
                <button 
                    className={ classNames }
                    key={ name }
                    onClick={ (e) => onFilterChange(name, e) }>
                    {label}
                </button>  
            );
        });
    
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                </button>
                <div className="dropdown-menu"
                    onClick={ this.onOptionClick }>
                    <SearchItem onSearchChange={ onSearchChange }/>
                    <div className="btn-group filter-btns">
                        { buttons }
                        <button 
                            className={ multipleClass }
                            onClick={ (e) => onMultiple(e) }>
                            Myltiple
                        </button>
                    </div>
                    { optionElems }
                </div>
            </div>
        );
    }
}
