const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Efforts = React.createClass({
    getInitialState() {
        return {efforts: []}
    },
    componentDidMount() {
        xhr.get('http://localhost:4000/efforts', {
            json: true
        }, (err, response, efforts) => {
            if (err)
                return console.log(err.message)
            this.setState({efforts})
        })
    },
    render() {
        const listEffort = effort => {
            return <li key={effort.id}>
                <Link className="no-underline black hover-bg-moon-gray" to={`/efforts/${effort.id}/show`}>{effort.name}</Link>
            </li>
        }
        return (
            <div className="avenir fw1 pl3">
                <h3 className=" f2 fw1">Efforts</h3>
                <blockquote className="ml0 mt0 pl4 black-90 bl bw2 b--dark-blue">
                    <ul>
                        {this.state.efforts.map(listEffort)}
                    </ul>
                </blockquote>
                <div>
                    <Link className="f3 no-underline black hover-bg-moon-gray mb3 mv2" to="/efforts/new">New Effort</Link>
                </div>
                <div className="mt3">
                    <Link className="no-underline black hover-bg-moon-gray" to="/">Home</Link>
                </div>
            </div>
        )
    }
})

module.exports = Efforts
