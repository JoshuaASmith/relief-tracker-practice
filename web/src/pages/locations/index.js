const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Locations = React.createClass({
    getInitialState() {
        return {locations: []}
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/locations', {
            json: true
        }, (err, response, locations) => {
            if (err)
                return console.log(err.message)
            this.setState({locations})
        })
    },
    render() {
        const listLocations = location => {
            return <li key={location.id}>
                <Link to={`/locations/${location.id}/show`}>{location.name}</Link>
            </li>
        }
        return (
            <div className="pl3">
                <h3>Locations</h3>
                {this.state.locations.map(listLocations)}
                <Link className="db" to="/locations/new">New Location</Link>
                <Link to="/">Home</Link>
            </div>
        )
    }
})

module.exports = Locations
