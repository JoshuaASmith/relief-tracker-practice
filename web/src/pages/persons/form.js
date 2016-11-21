const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const PersonForm = React.createClass({
    getInitialState() {
        return {firstName: '', lastName: '', email: '', phone: '', success: false}
    },
    handleChange(field) {
        return e => {
            const newState = {}
            newState[field] = e.target.value
            this.setState(newState)
        }
    },
    handleSubmit(e) {
        e.preventDefault()
        if (this.state.id) {
            xhr.put('http://localhost:4000/persons/' + this.state.id, {
                json: this.state
            }, (err, response, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({success: true})
                console.log(body)
            })
        } else {
            xhr.post('http://localhost:4000/persons', {
                json: this.state
            }, (err, response, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({success: true})
                console.log(body)
            })
        }
    },
    componentDidMount() {
        if (this.props.params.id) {
            xhr.get('http://localhost:4000/persons/' + this.props.params.id, {
                json: true
            }, (err, response, person) => {
                if (err)
                    return console.log(err.message)
                this.setState(person)
            })
        }
    },
    render() {
        const formState = this.state.id
            ? 'Edit'
            : 'New'
        return (
            <div className="avenir fw2 pl3">
                {this.state.success && this.state.id
                    ? <Redirect to={`/persons/${this.state.id}/show`}/>
                    : null}
                {this.state.success && !this.state.id
                    ? <Redirect to={`/persons`}/>
                    : null}
                <h3 className="f1 fw1">{formState + ' '}
                    Person</h3>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className="db">First Name</label>
                        <input onChange={this.handleChange('firstName')} value={this.state.firstName} type="text" placeholder="First Name"/>
                    </div>
                    <div>
                        <label className="db pt2">Last Name</label>
                        <input onChange={this.handleChange('lastName')} value={this.state.lastName} type="text" placeholder="Last Name"/>
                    </div>
                    <div>
                        <label className="db pt2">Email</label>
                        <input onChange={this.handleChange('email')} value={this.state.email} type="email" placeholder="email@email.com"/>
                    </div>
                    <div>
                        <label className="db pt2">Phone</label>
                        <input onChange={this.handleChange('phone')} value={this.state.phone} type="text" placeholder="555-555-5555"/>
                    </div>
                    <div>
                        <button className="mt2 mb3 f6 link dim br2 ba ph4 pv2 mb2 dib black ml2">Save Person</button>
                    </div>
                </form>
                <Link className="no-underline black hover-bg-moon-gray ml4 mb4" to="/persons">Return</Link>
            </div>
        )
    }
})

module.exports = PersonForm
