import React from 'react';

export default class PostStatusFilter extends React.Component {
    constructor(props) {
        super(props);
        this.btns = [{ name: 'all', lable: 'All' },
            {name:'like',lable:'Liked'}
        ]
    }

    render() {
        const btns = this.btns.map(({ name, lable }) => {
            const active = this.props.filter === name;
            const clasz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button key={name} type="button" className={`btn ${clasz}`}
                    onClick={() => this.props.onFilterSelect(name)}>{lable}</button>
            )
        });

        return (
            <div className="btn-group">
                {btns}
            </div>
        )
    }
}

