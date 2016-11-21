const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const LocationForm = React.createClass({
    getInitialState() {
        return {name: '', lat: '', lng: '', success: false}
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
            xhr.put('http://localhost:4000/locations/' + this.state.id, {
                json: this.state
            }, (err, response, body) => {
                if (err)
                    return console.log(err.message)
                this.setState({success: true})
                console.log(body)
            })
        } else {
            xhr.post('http://localhost:4000/locations', {
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
            xhr.get('http://localhost:4000/locations/' + this.props.params.id, {
                json: true
            }, (err, response, location) => {
                if (err)
                    return console.log(err.message)
                this.setState(location)
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
                    ? <Redirect to={`/locations/${this.state.id}/show`}/>
                    : null}
                {this.state.success && !this.state.id
                    ? <Redirect to={`/locations`}/>
                    : null}
                <h3 className="f1 fw1">{formState + ' '}
                    Location</h3>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className="db">Location Name</label>
                        <input onChange={this.handleChange('name')} value={this.state.name} type="text" placeholder="Location Name"/>
                    </div>
                    <div>
                        <label className="db pt2">Latitude</label>
                        <input onChange={this.handleChange('lat')} value={this.state.lat} type="text" placeholder="Latitude"/>
                    </div>
                    <div>
                        <label className="db pt2">Longitude</label>
                        <input onChange={this.handleChange('lng')} value={this.state.lng} type="text" placeholder="Longitude"/>
                    </div>
                    <div>
                        <button className="mt2 mb3 f6 link dim br2 ba ph4 pv2 mb2 dib black ml2">Save Location</button>
                    </div>
                </form>
                <Link className="no-underline black hover-bg-moon-gray mb4" to="/locations">Return</Link>
            </div>
        )
    }
})

module.exports = LocationForm
