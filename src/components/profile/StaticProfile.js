import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
});


const StaticProfile = (props) => {

    const { classes, profile: { handle, createdAt, imageUrl, website, bio, location } } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={imageUrl} alt='profile' className='profile-image' />
                </div>
                <hr />
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio &&
                        <Fragment>
                            <Typography color='primary' /> <span>{bio}</span>
                        </Fragment>
                    }
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOnIcon color='primary' /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color='primary' />
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarTodayIcon color='primary' />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )

}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(StaticProfile);