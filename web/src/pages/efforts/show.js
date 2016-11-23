const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const ShowEffort = React.createClass({
    getInitialState: function() {
        return {
            effort: {
                members: []
            },
            persons: []
        };
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/efforts/' + this.props.params.id, {
            json: true
        }, (err, response, effort) => {
            if (err)
                return console.log(err.message)
            if (!effort.members)
                effort.members = []
            this.setState({effort})
        })
        xhr.get('http://localhost:4000/persons', {
            json: true
        }, (err, response, persons) => {
            if (err)
                return console.log(err.message)
            this.setState({persons})
        })
    },
    handleRemove(e) {
        e.preventDefault()
        if (confirm('Are you sure you wish to delete this effort?')) {
            // this.props.remove(this.props.params.id, this.state.person, (err, body) => {
            //     if (err)
            //         return console.log(err.message)
            //     this.setState({removed: true})
            // })
            xhr.del('http://localhost:4000/efforts/' + this.state.effort.id, {
                json: this.state.effort
            }, (err, res, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({removed: true})
            })
        }
    },
    addMember(person) {
        return (e) => {
            let members = this.state.effort.members.filter(member => member.id !== person.id)
            let effort = {
                ...this.state.effort
            }
            effort.members = [
                person, ...members
            ]
            this.setState({effort})

        }
    },
    removeMember(m) {
        return (e) => {
            let members = this.state.effort.members.filter(member => member.id !== m.id)
            let effort = {
                ...this.state.effort
            }
            effort.members = members
            this.setState({effort})

        }
    },
    updateTeam(e) {
        e.preventDefault()
        // this.props.put('efforts', this.state.effort.id, this.state.effort, (err, res) => {
        //     if (err)
        //         return console.log(err.message)
        //     alert('Successfully updated team!')
        // })
        xhr.put('http://localhost:4000/efforts/' + this.state.effort.id, {
            json: this.state.effort
        }, (err, response, body) => {
            if (err)
                return console.log(err.message)
            this.setState({success: true})
            console.log(body)
        })
    },
    render() {
        return (
            <div className="avenir fw1 tc">
                {this.state.removed
                    ? <Redirect to="/efforts"/>
                    : null}
                <h3 className="fw1 f2 tc">Effort</h3>
                <hr className="w-50 tl b--dark-blue"/>
                <div className="">
                    <h3 className="fw1 f3">{this.state.effort.name}</h3>
                    <h5 className="fw1">{this.state.effort.organizationID}</h5>
                    <h5 className="fw1">{this.state.effort.desc}</h5>
                    <h5 className="fw1">{this.state.effort.start + ' - '}{this.state.effort.end}</h5>
                    <h5 className="fw1">Team Lead: {this.state.effort.teamLead}</h5>
                    <div>
                        <div className="">
                            <h3 className="fw1 f4">Available Persons</h3>
                            <div>
                                <ul>
                                    {this.state.persons.map(p => <li key={p.id}>
                                        {p.firstName + ' ' + p.lastName}
                                        <button onClick={this.addMember(p)}>Add Member</button>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="fw1 f4">This Effort's Team</h3>
                            <div>
                                <ul>
                                    {this.state.effort.members.map(m => <li key={m.id}>
                                        {m.firstName + ' ' + m.lastName}
                                        <button onClick={this.removeMember(m)}>Remove</button>
                                    </li>)}
                                </ul>
                                <button onClick={this.updateTeam}>Save Updated Team</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="db">
                    <hr className="w-10"/>
                    <button className="f6 fw1 link dim br2 ba ph3 pv2 mt3 mb2 db black center">
                        <Link className="no-underline black hover-bg-moon-gray mb2" to={`/efforts/${this.state.effort.id}/edit`}>Edit Effort</Link>
                    </button>
                    <button className="f6 fw1 link dim br2 ba ph3 pv2 mt2 mb2 db black center" onClick={this.handleRemove}>Remove Effort</button>
                    <Link className="no-underline black hover-bg-moon-gray" to="/efforts">Return</Link>
                </div>
            </div>
        )
    }
})

module.exports = ShowEffort
