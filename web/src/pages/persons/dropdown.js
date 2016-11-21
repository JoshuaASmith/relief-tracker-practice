const React = require('react')
const xhr = require('xhr')

const Dropdown = React.createClass({
    displayName: 'Dropdown',
    getInitialState: function() {
        return {persons: []}
    },
    componentDidMount: function() {
        xhr.get('http://localhost:4000/persons', {
            json: true
        }, (err, response, persons) => {
            if (err)
                return console.log(err.message)
            this.setState({persons})
        })
    },
    handleClick(e) {
        e.preventDefault()
        console.log('the link was clicked')
    },
    render() {
        var i = 0;
        var persons = this.state.persons.map(function(person) {
            return React.createElement('person', {
                value: person,
                key: i++
            }, person);
        });
        return (
            <div>
                <select onClick={this.handleClick}>{persons}</select>
            </div>
        )
    }
})

module.exports = Dropdown
