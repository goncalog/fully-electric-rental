import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {

    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            let url = (process.env.NODE_ENV === 'production') 
                    ? '/content/owner/checkAuth' 
                    : `${process.env.REACT_APP_SERVER_URL}/content/owner/checkAuth`;

            fetch(url, { credentials: 'include' })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/owner/login" />;
            }
            return <ComponentToProtect {...this.props} />;
        } 
    }
}
