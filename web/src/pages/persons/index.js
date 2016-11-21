const React = require('react')
const {Link} = require('react-router')

const Persons = React.createClass({
    getInitialState() {
        return {persons: []}
    },
    componentDidMount() {
        this.props.allDocs((err, persons) => {
            if (err)
                return console.log(err.message)
            this.setState({persons})
        })
        // xhr.get('http://localhost:4000/persons', {
        //     json: true
        // }, (err, response, persons) => {
        //     if (err)
        //         return console.log(err.message)
        //     this.setState({persons})
        // })
    },
    render() {
        const listPerson = person => {
            return <li key={person.id}>
                <Link className="no-underline black hover-bg-moon-gray" to={`/persons/${person.id}/show`}>{person.firstName + ' ' + person.lastName}</Link>
            </li>
        }
        return (
            <div className="avenir fw1 pl3">
                <h3 className="fw1 f2">Persons List</h3>

                <ul>
                    {this.state.persons.map(listPerson)}
                </ul>
                <div>
                    <Link className="f3 no-underline black hover-bg-moon-gray mb3" to="/persons/new">New Person</Link>
                </div>
                <div className="mt3">
                    <Link className="no-underline black hover-bg-moon-gray" to="/">Home</Link>
                </div>
            </div>
        )
    }
})

module.exports = Persons
