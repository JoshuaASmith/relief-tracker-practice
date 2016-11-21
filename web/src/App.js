const React = require('react')
const {BrowserRouter, Match, Miss, Link} = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons/')
const ShowPerson = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const Efforts = require('./pages/efforts/')
const ShowEffort = require('./pages/efforts/show')
const EffortForm = require('./pages/efforts/form')
const Locations = require('./pages/locations/')
const ShowLocation = require('./pages/locations/show')
const LocationForm = require('./pages/locations/form')
const Service = require('./components/service')

const NoMatch = () => (
    <div>
        <h3>Page Not Found</h3>
        <Link to="/">Home</Link>
    </div>
)

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="avenir">
                        <header>
                            <nav className="pa3 pa4-ns bb bg-light-gray tc">
                                <Link className="link dim black b f4 f5-ns dib mr3" to="/" title="Home-Relief Tracker">Relief Tracker</Link>
                                <Link className="link dim gray    f6 f5-ns dib mr3" to="/about" title="About">About</Link>
                                <Link className="link dim gray    f6 f5-ns dib mr3" to="/persons" title="Persons">Persons</Link>
                                <Link className="link dim gray    f6 f5-ns dib mr3" to="/efforts" title="Efforts">Efforts</Link>
                                <Link className="link dim gray    f6 f5-ns dib" to="/locations" title="Locations">Locations</Link>
                            </nav>
                        </header>
                    </div>
                    <div>
                        <Match exactly pattern="/" component={Home}/>
                        <Match pattern="/about" component={About}/>
                        <Match exactly pattern="/persons" component={Service(Persons)}/>
                        <Match pattern="/persons/:id/show" component={Service(ShowPerson)}/>
                        <Match exactly pattern="/persons/new" component={PersonForm}/>
                        <Match pattern="/persons/:id/edit" component={PersonForm}/>
                        <Match exactly pattern="/efforts" component={Efforts}/>
                        <Match pattern="/efforts/:id/show" component={ShowEffort}/>
                        <Match exactly pattern="/efforts/new" component={EffortForm}/>
                        <Match pattern="/efforts/:id/edit" component={EffortForm}/>
                        <Match exactly pattern="/locations" component={Locations}/>
                        <Match pattern="/locations/:id/show" component={ShowLocation}/>
                        <Match exactly pattern="/locations/new" component={LocationForm}/>
                        <Match pattern="/locations/:id/edit" component={LocationForm}/>
                        <Miss component={NoMatch}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
})
module.exports = App
