import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';

export default class UserOptions extends Component {
    
    render() {
        const { userOptionsData, onDelete } = this.props;
        let chips = [];
        if (userOptionsData) {
            chips = userOptionsData.map((item) => {
                const { id, text } = item;

                return (
                    <li key={id}>
                        <Chip
                            label={ text }
                            color="primary"
                            variant='outlined'
                            onDelete={ () => onDelete(id) }
                        />
                    </li>
                );    
            });
        }

        return (
            <ul className="userOptions">
                { chips }
            </ul>
        );
    }
}