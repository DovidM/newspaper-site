import * as React from 'react';
import { Redirect } from 'react-router';

import TagSelect from '../';

interface State {
    redirect: string;
}

export default class SelectTagPreview extends React.Component<{}, State> {

    public state: State;

    constructor(props: {}) {
        super(props);

        this.state = {
            redirect: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    shouldComponentUpdate(nextProps: {}, nextState: State) {

        return (nextState.redirect !== this.state.redirect) &&
            window.location.pathname !== `/tag/${nextState.redirect}`;
    }

    /**
     * Redirects to /tag/tag_user_selected
     */
    onChange(event: Event) {

        this.setState({
            redirect: (event.target as HTMLSelectElement).value
        });
    }

    render() {

        return (
            <span key={this.state.redirect}>
                <TagSelect
                    tags={['Current Issue']}
                    props={{
                        defaultValue: this.state.redirect,
                        onInput: this.onChange
                    }}
                />
                {this.state.redirect ? <Redirect key={this.state.redirect} to={`/tag/${this.state.redirect}`} /> : ''}
            </span>
        );
    }
}
