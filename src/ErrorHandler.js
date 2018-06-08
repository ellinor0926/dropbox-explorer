import { Component } from 'react';

class ErrorHandler extends Component {
    state = { error: null };

    componentDidCatch(error, info) {
        console.log(error, info);

        this.setState({
            error
        });
    }

    render() {
        const { error } = this.state;

        return this.props.render(error);
    }
}

export default ErrorHandler;