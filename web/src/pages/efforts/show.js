const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const ShowEffort = React.createClass({
    getInitialState() {
        return {effort: {}, removed: false}
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/efforts/' + this.props.params.id, {
            json: true
        }, (err, response, effort) => {
            if (err)
                return console.log(err.message)
            this.setState({effort})
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
    render() {
        return (
            <div className="avenir fw1 tc">
                {this.state.removed
                    ? <Redirect to="/efforts"/>
                    : null}
                <h3 className="fw1 f2 tc">Effort</h3>
                <hr className="w-50 tl"/>
                <div>
                    <h5 className="fw1 f3">{this.state.effort.name}</h5>
                    <h5 className="fw1">{this.state.effort.organizationID}</h5>
                    <h5 className="fw1">{this.state.effort.desc}</h5>
                </div>
                <hr className="w-10"/>
                <Link className="no-underline black hover-bg-moon-gray" to={`/efforts/${this.state.effort.id}/edit`}>Edit Effort</Link>
                <button className="f6 fw1 link dim br2 ba ph3 pv2 mt2 mb2 db black center" onClick={this.handleRemove}>Remove Effort</button>
                <Link className="no-underline black hover-bg-moon-gray" to="/efforts">Return</Link>
            </div>
        )
    }
})

module.exports = ShowEffort
