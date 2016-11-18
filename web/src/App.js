const React = require('react')
const {BrowserRouter, Match, Miss, Link} = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons/')
const Efforts = require('./pages/efforts/')
const Locations = require('./pages/locations/')
const ShowPerson = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const ShowEffort = require('./pages/efforts/show')

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
                    <Match exactly pattern="/" component={Home}/>
                    <Match pattern="/about" component={About}/>
                    <Match exactly pattern="/persons" component={Persons}/>
                    <Match pattern="/persons/:id/show" component={ShowPerson}/>
                    <Match exactly pattern="/persons/new" component={PersonForm}/>
                    <Match pattern="/persons/:id/edit" component={PersonForm}/>
                    <Match pattern="/efforts" component={Efforts}/>
                    <Match pattern="/efforts/:id/show" component={ShowEffort}/>
                    <Match pattern="/locations" component={Locations}/>
                    <Miss component={NoMatch}/>
                </div>
            </BrowserRouter>
        )
    }
})
module.exports = App
