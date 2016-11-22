const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const ShowLocation = React.createClass({
    getInitialState() {
        return {location: {}, removed: false}
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/locations/' + this.props.params.id, {
            json: true
        }, (e, r, location) => {
            if (e)
                return console.log(e.message)
            this.setState({location})
        })
    },
    handleRemove(e) {
        e.preventDefault()
        if (confirm('Are you sure you wish to delete this location?')) {
            // this.props.remove(this.props.params.id, this.state.person, (err, body) => {
            //     if (err)
            //         return console.log(err.message)
            //     this.setState({removed: true})
            // })
            xhr.del('http://localhost:4000/locations/' + this.state.location.id, {
                json: this.state.location
            }, (err, res, location) => {
                if (err)
                    return console.log(err.message)
                this.setState({removed: true})
            })
        }
    },
    render() {
        return (
            <div className="avenir fw1">
                {this.state.removed
                    ? <Redirect to="/locations"/>
                    : null}
                <h3 className="fw1 f2 tc">Location</h3>
                <hr className="w-50 tl b--dark-blue"/>
                <div className="tc">
                    <h4 className="fw1 f3">{this.state.location.name}</h4>
                    <h5 className="fw1">{this.state.location.lat}</h5>
                    <h5 className="fw1">{this.state.location.lng}</h5>
                </div>
                <hr className="w-10"/>
                <div className="tc">
                    <button className="f6 fw1 link dim br2 ba ph3 pv2 mt3 mb2 db black center">
                        <Link className="no-underline black hover-bg-moon-gray mb2" to={`/locations/${this.state.location.id}/edit`}>Edit Location</Link>
                    </button>

                    <button className="f6 fw1 link dim br2 ba ph3 pv2 mt2 mb2 db black center" onClick={this.handleRemove}>Remove Location</button>
                    <Link className="no-underline black hover-bg-moon-gray" to="/locations">Return</Link>
                </div>
            </div>
        )
    }
})

module.exports = ShowLocation
