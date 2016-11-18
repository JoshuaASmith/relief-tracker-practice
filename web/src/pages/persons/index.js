const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Persons = React.createClass({
    getInitialState() {
        return {
            persons: [
                {
                    firstName: 'Bob',
                    lastName: 'Marley'
                }
            ]
        }
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/persons', {
            json: true
        }, (err, response, persons) => {
            if (err)
                return console.log(err.message)
            this.setState({persons})
        })
    },
    render() {
        const listPerson = person => <li>{person.firstName + ' ' + person.lastName}</li>
        return (
            <div>
                <h3>Persons List Here</h3>
                <ul>
                    {this.state.persons.map(listPerson)}
                </ul>
                <Link to="/">Home</Link>
            </div>
        )
    }
})

module.exports = Persons