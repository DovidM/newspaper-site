import React from 'react';
import {Container} from './components/Container';
import Form from './components/Form';
import {Input, Checkbox} from './components/Input';
import Table from './components/Table';
import {jwt} from './components/jwt';


class UserArticleTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: this.props.articles
        }
    }

    render() {

        if (!this.state.articles) {
            return <span />; // random useless thing
        }

        const headings = [
            "Article",
            "Published",
            "Type",
            "Views",
            jwt.email === this.props.user ? <span className="danger">Delete</span> : null
        ];

        const articles = this.state.articles.map(article => [
            <a href={`/issue/${article.issue}/story/${article.url}`}>{decodeURIComponent(article.url)}</a>,
            article.created,
            article.tags,
            article.views,
            jwt.email === this.props.user ? <input type="checkbox" name="delArt[]" value={article.art_id} /> : null
        ]);

        return (
            <Container
                heading="Articles"
                children={
                    <Form
                        method="delete"
                        action="/api/articleGroup"
                        children={
                            <div>
                                <Table
                                    headings={headings}
                                    rows={articles}
                                />

                                <Input
                                    label="Password"
                                    props={{
                                        type: "password",
                                        name: "password",
                                        required: true,
                                    }}
                                />
                                <input type="submit" />
                            </div>
                        }
                    />
                }
            />
        )


    }

}

class ModifiableUserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            info: this.props.info
        }
    }

    render() {

        if (!this.state.info) {
            return <span />;
        }

        const headings = [
            "Email",
            "2FA",
            "Notifications",
            <span className="danger">Delete Account</span>
        ];

        const row = [
            this.state.info.email,
            <Checkbox
                formMethod="put"
                name="2fa"
                data-pass={this.state.info.twoFactor}
                defaultChecked={this.state.info.twoFactor}
            />,
            <Checkbox
                formMethod="put"
                name="notifications"
                data-pass={this.state.info.notificationStatus}
                defaultChecked={this.state.info.notificationStatus}
            />,
            <input formMethod="delete" type="checkbox" name="delAcc" value={this.state.info.id} />
        ];

        return (
            <Container
                heading="Options"
                className="tableContainer"
                children={
                    <Form
                        method={["put", "delete"]}
                        action="/api/user"
                        children={
                            <div>
                                <Table
                                    headings={headings}
                                    rows={[row]}
                                />
                                <Input
                                    label="Password"
                                    props={{
                                        type: "password",
                                        name: "password",
                                        required: true
                                    }}
                                />
                                <input type="submit" />
                            </div>
                        }

                    />
                }
            />
        )

    }

}

function PublicUserInfo(props) {

    return (
        <Container
            className="tableContainer"
            children={<Table
                headings={Object.keys(props.info)}
                rows={[Object.values(props.info)]}
                />
            }
        />
    );
}

class Profile extends React.Component {

    constructor() {
        super();

        this.state = {
            personalInfo: {},
            userInfo: {},
            articleInfo: [],
            user: window.location.pathname.split("/")[2]
        }
    }

    async componentWillMount() {

        const json = await fetch(`/api/user?user=${this.state.user}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => data.json());

        this.setState({
            userInfo: json[0],
            articleInfo: json[1],
            personalInfo: json[2]
        })

    }




    render() {

        return (
            <div>
                <PublicUserInfo
                    key={this.state.userInfo.name}
                    info={this.state.userInfo}
                />
                <ModifiableUserInfo
                    key={this.state.personalInfo.id /*forces update*/}
                    info={this.state.personalInfo}
                />
                <UserArticleTable
                    key={this.state.articleInfo /*forces update*/}
                    user={this.state.user}
                    articles={this.state.articleInfo}
                />
            </div>

        )
    }
}

export default Profile;