const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const EffortForm = React.createClass({
    getInitialState() {
        return {
            name: '',
            organizationID: '',
            desc: '',
            phase: '',
            start: '',
            end: '',
            success: false
        }
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
            xhr.put('http://localhost:4000/efforts/' + this.state.id, {
                json: this.state
            }, (err, response, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({success: true})
                console.log(body)
            })
        } else {
            xhr.post('http://localhost:4000/efforts/', {
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
            xhr.get('http://localhost:4000/efforts/' + this.props.params.id, {
                json: true
            }, (err, response, effort) => {
                if (err)
                    return console.log(err.message)
                this.setState(effort)
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
                    ? <Redirect to={`/efforts/${this.state.id}/show`}/>
                    : null}
                {this.state.success && !this.state.id
                    ? <Redirect to={`/efforts`}/>
                    : null}
                <h2 className="f1 fw1">{formState + ' '}Relief Effort</h2>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className="db pt2">Name</label>
                        <input onChange={this.handleChange('name')} value={this.state.name} type="text" placeholder="Name"/>
                    </div>
                    <div>
                        <label className="db pt2">Organization ID</label>
                        <input onChange={this.handleChange('organizationID')} value={this.state.organizationID} type="text" placeholder="Organization ID"/>
                    </div>
                    <div>
                        <label className="db pt2">Description</label>
                        <input onChange={this.handleChange('desc')} value={this.state.desc} type="text" placeholder="Description"/>
                    </div>
                    <div>
                        <label className="db pt2">Phase</label>
                        <select onChange={this.handleChange('phase')} value={this.state.phase} type="text" placeholder=" ">
                            <option value="in-planning">in-planning</option>
                            <option value="completed">Completed</option>
                            <option value="started">Started</option>
                        </select>
                    </div>
                    <div>
                        <label className="db pt2">Start</label>
                        <input onChange={this.handleChange('start')} value={this.state.start} type="date" placeholder="Date"/>
                    </div>
                    <div>
                        <label className="db pt2">End</label>
                        <input onChange={this.handleChange('end')} value={this.state.end} type="date" placeholder="Date"/>
                    </div>
                    <div>
                        <button className="mt2 mb3 f6 link dim br2 ba ph4 pv2 mb2 dib black ml2">Save Effort</button>
                    </div>
                </form>
                <div className="ml2">
                    <Link className="no-underline black hover-bg-moon-gray mb4" to="/efforts">Return</Link>
                </div>
            </div>
        )
    }
})

module.exports = EffortForm
