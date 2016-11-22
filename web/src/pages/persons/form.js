const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')
const TextField = require('../../components/text-field')

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
            <div className="avenir fw2 tc">
                {this.state.success && this.state.id
                    ? <Redirect to={`/persons/${this.state.id}/show`}/>
                    : null}
                {this.state.success && !this.state.id
                    ? <Redirect to={`/persons`}/>
                    : null}
                <h3 className="f1 fw1">{formState + ' '}
                    Person</h3>
                <hr className="b--dark-blue"/>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField label="First Name" value={this.state.firstName} onChange={this.handleChange('firstName')}/>
                        <TextField label="Last Name" value={this.state.lastName} onChange={this.handleChange('lastName')}/>
                        <TextField label="Email" value={this.state.email} onChange={this.handleChange('email')}/>
                        <TextField label="Phone" value={this.state.phone} onChange={this.handleChange('phone')}/>
                    </div>
                    <div>
                        <button className="mt2 mb3 f6 link dim br2 ba ph4 pv2 mb2 dib dark-blue">Save Person</button>
                    </div>
                </form>
                <Link className="no-underline black hover-bg-moon-gray mb4" to="/persons">Return</Link>
            </div>
        )
    }
})

module.exports = PersonForm
