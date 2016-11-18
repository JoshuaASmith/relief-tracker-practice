const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Persons = React.createClass({
    getInitialState() {
        return {persons: []}
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
        const listPerson = person => {
            return <li key={person.id}>
                <Link to={`/persons/${person.id}/show`}>{person.firstName + ' ' + person.lastName}</Link>
            </li>
        }
        return (
            <div className="avenir fw1 pl3">
                <h3 className="fw1 f2">Persons List Here</h3>
                <Link to="/persons/new">New Person</Link>
                <ul>
                    {this.state.persons.map(listPerson)}
                </ul>
                <Link to="/">Home</Link>
            </div>
        )
    }
})

module.exports = Persons
