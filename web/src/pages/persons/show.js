const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const ShowPerson = React.createClass({
    getInitialState() {
        return {person: {}}
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/persons/' + this.props.params.id, {
            json: true
        }, (err, response, person) => {
            if (err)
                return console.log(err.message)
            this.setState({person})
        })
    },
    render() {
        return (
            <div className="">
                <h4>{this.state.person.firstName + ' ' + this.state.person.lastName}</h4>
                <Link className="db" to={`/persons/${this.state.person.id}/edit`}>Edit Person</Link>
                <Link to="/persons">Return</Link>
            </div>
        )
    }
})

module.exports = ShowPerson
