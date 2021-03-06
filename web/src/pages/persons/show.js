const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const ShowPerson = React.createClass({
    getInitialState() {
        return {person: {}, removed: false}
    },
    componentDidMount() {
        // this.props.get(this.props.params.id, (err, person) => {
        //     if (err)
        //         return console.log(err.message)
        //     this.setState({person})
        // })
        xhr.get('http://localhost:4000/persons/' + this.props.params.id, {
            json: true
        }, (err, response, person) => {
            if (err)
                return console.log(err.message)
            this.setState({person})
        })
    },
    handleRemove(e) {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            this.props.remove(this.props.params.id, this.state.person, (err, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({removed: true})
            })
            // xhr.del('http://localhost:4000/persons/' + this.state.person.id, {
            //     json: this.state.person
            // }, (err, res, body) => {
            //     if (err)
            //         return console.log(err.message)
            //     this.setState({removed: true})
            // })
        }
    },
    render() {
        return (
            <div className="avenir fw1 tc">
                {this.state.removed
                    ? <Redirect to="/persons"/>
                    : null}
                <h3 className="fw1 f2 tc">Person</h3>
                <hr className="w-50 tl b--dark-blue"/>
                <div>
                    <h3 className="fw1 f3">{this.state.person.firstName + ' ' + this.state.person.lastName}</h3>
                    <h5 className="fw1">Email: {this.state.person.email}</h5>
                    <h5 className="fw1">Phone: {this.state.person.phone}</h5>
                </div>
                <hr className="w-10"/>
                <button className="f6 fw1 link dim br2 ba ph3 pv2 mt3 mb2 db black center">
                    <Link className="no-underline black hover-bg-moon-gray mb2" to={`/persons/${this.state.person.id}/edit`}>Edit Person</Link>
                </button>
                <button className="f6 fw1 link dim br2 ba ph3 pv2 mt2 mb2 db black center" onClick={this.handleRemove}>Remove Person</button>
                <Link className="no-underline black hover-bg-moon-gray" to="/persons">Return</Link>
            </div>
        )
    }
})

module.exports = ShowPerson
