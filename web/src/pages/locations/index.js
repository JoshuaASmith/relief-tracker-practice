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
            return <li className="list" key={location.id}>
                <Link className="no-underline black hover-bg-moon-gray " to={`/locations/${location.id}/show`}>{location.name}</Link>
            </li>
        }
        return (
            <div className="avenir fw1 tc">
                <h3 className="fw1 f2">Locations</h3>
                <div className="w-25 center black-90 bl bw2 b--dark-blue mb2">
                    {this.state.locations.map(listLocations)}
                </div>
                <div>
                    <Link className="f3 no-underline black hover-bg-moon-gray mb3" to="/locations/new">New Location</Link>
                </div>
                <div className="mt3">
                    <Link className="no-underline black hover-bg-moon-gray" to="/">Home</Link>
                </div>
            </div>
        )
    }
})

module.exports = Locations
