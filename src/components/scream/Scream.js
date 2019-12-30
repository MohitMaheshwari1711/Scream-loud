import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import withStyles from '@material-ui/core/styles/withStyles';
import ChatIcon from '@material-ui/icons/Chat';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions } from '@material-ui/core';

import ScreamDialog from './ScreamDialog';
import DeleteScream from './DeleteScream';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {

    render() {

        dayjs.extend(relativeTime)

        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user: { authenticated, credentials: { handle } } } = this.props;


        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} tile="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} color='primary' to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}


Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}


const mapStateToProps = (state) => ({
    user: state.user
});




export default connect(mapStateToProps)(withStyles(styles)(Scream));
