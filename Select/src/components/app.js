import React, {Component} from "react";
import DropDownMenu from "./dropdown-menu";
import UserOptions from "./user-options";
import "./style.css";

export default class App extends Component {
    newId = 0;

    state = {
        optionData: [
            this.createOption("option1"),
            this.createOption("option2"),
            this.createOption("option3"),
            this.createOption("option4"),
            this.createOption("option5"),
            this.createOption("option6"),
            this.createOption("option7"),
            this.createOption("option8"),
        ],
        searchWord: "",
        filter: "all",
        isMultiple: false
    }

    createOption(text) {
        return {
            id: this.newId++,
            text,
            isActive: false
        }; 
    }

    toggleProperty(id, dataArr, prop) {
        const index = dataArr.findIndex((el) => el.id === id);

        const oldItem = dataArr[index];
        const newItem = {...oldItem, [prop]: !oldItem[prop]};
        return [
            ...dataArr.slice(0, index),
            newItem,
            ...dataArr.slice(index+1)
        ];
    }

    onToggleActive = (id) => {
        this.setState(({ optionData }) => {
            return {
                optionData: this.toggleProperty(id, optionData, "isActive"),
            }
        });
    }

    onDelete = (id) => {
        this.onToggleActive(id);
    }

    onSearchChange = (searchWord) => {
        this.setState({ searchWord });
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => item.isActive);
            case 'inactive':
                return items.filter((item) => !item.isActive);
            default:
                return items;
        }
    } 

    onFilterChange = (filter, e) => {
        e.stopPropagation();
        return this.setState({ filter })
    }

    search(items, searchWord) {
        if (searchWord.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.text.toLowerCase().includes(searchWord.toLowerCase());
        })
    }

    onOptionClick = (e) => {
        if (this.state.isMultiple) {
            const targetOption = e.target; 
            e.stopPropagation();
            if (targetOption.classList.contains('.option') )
                targetOption.classList.toggle('isActive');
        }
    }

    onMultiple = (e) => {
        e.stopPropagation();
        this.setState(({ isMultiple }) => {
            return {
                isMultiple: !isMultiple
            }
        });
    } 

    render() {
        const { optionData, searchWord, filter, isMultiple } = this.state;
        const userOptionsData = optionData.filter((item) => item.isActive);
        const filterItems = this.filter(this.search(optionData, searchWord), filter)

        return (
            <div className="container content">
                <DropDownMenu 
                    options={ filterItems }
                    filter={ filter }
                    isMultiple={ isMultiple }
                    onMultiple={ this.onMultiple }
                    onToggleActive={ this.onToggleActive }
                    onSearchChange={ this.onSearchChange }
                    onOptionClick={ this.onOptionClick }
                    onFilterChange={ this.onFilterChange }
                />
                <UserOptions
                    userOptionsData={ userOptionsData }
                    onDelete={ this.onDelete }
                />
            </div>
        );
    }
}