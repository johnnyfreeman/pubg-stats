import { Component } from 'react';
import Link from 'next/link';

export default class extends Component {
    state = {
        query: ''
    }

    render() {
        return (
            <form>
                <p>Enter your PUGB username <em>exactly</em>.</p>
                <input autoFocus onChange={e => this.setState({query: e.target.value})} type="text" value={this.state.query} />
                <Link href={`/players?name=${this.state.query}`}>
                    <button>Find</button>
                </Link>
            </form>
        )
    }
};
