import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddFrom from '../post-add-form';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.newId = 4;
    }

    state = {
        data: [{ label: 'Learning React', important: true, like: false, id: 1 },
        { label: 'That is so good', important: false, like: false, id: 2 },
        { label: 'I need a break...', important: false, like: true, id: 3 }
        ],
        term: '',
        filter:'all'
    }

    filterPost(items, filter){
        if (filter === 'like')
            return items.filter(item => item.like)
        else
            return items;
    }

    SearchPost(items, term){
        if (term.length === 0)
            return items;
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    DeleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    AddItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: this.newId++
        }
        this.setState(({ data }) => {
            return {
                data: [...data, newItem],
            }
        })
    }

    OnToggleImportant = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex((it) => it.id === id);
            return {
                data: [...data.slice(0, index), { ...data[index], important: !data[index].important }, ...data.slice(index + 1)]
            }
        })
    }

    OnToggleLiked = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex((it) => it.id === id);
            return {
                data: [...data.slice(0, index), { ...data[index], like: !data[index].like }, ...data.slice(index + 1)]
            }
        })
    }
    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    onFilterSelect = (filter) => {
        this.setState({ filter});
    }

    render() {
        const { data, term, filter } = this.state;
        const visibilePosts = this.filterPost(this.SearchPost(data, term),filter);
        return (
            <div className="app">
                <AppHeader liked={this.state.data.filter((elem) => elem.like).length}
                    allPosts={this.state.data.length} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visibilePosts}
                    onDelete={this.DeleteItem}
                    onToggleImportant={this.OnToggleImportant}
                    onToggleLiked={this.OnToggleLiked}/>
                <PostAddFrom onAdd={this.AddItem}/>
            </div>
        )
    }
}
