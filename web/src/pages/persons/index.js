const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

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
        const listPersons = persons => {
            return <li className="list mv2" key={persons.id}>
                <Link className="no-underline black hover-bg-moon-gray" to={`/persons/${persons.id}/show`}>{persons.firstName + ' ' + persons.lastName}</Link>
            </li>
        }
        return (
            <div className="avenir fw1 tc">
                <h3 className="fw1 f2">Persons List</h3>
                <hr className="b--dark-blue"/>
                <div className="pt3">
                    <blockquote className="w-40 center black-90 bl bw2 b--dark-blue mb2">
                        {this.state.persons.map(listPersons)}
                    </blockquote>
                </div>
                <div className="mt3">
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
