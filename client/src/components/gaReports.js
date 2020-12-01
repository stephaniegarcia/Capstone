import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper'
import { ResponsiveContainer } from 'recharts';
import {
    useAnalyticsApi,
    useAuthorize,
    useDataChart,
    useSignOut,
    useViewSelector,
  } from 'react-use-analytics-api'
import '../index.css';
//import apiService from "./mockApiService";
import apiService from "./apiService";
//The chart type. Possible options are: LINE, COLUMN, BAR, TABLE, and GEO.


function GAReports() {
    //Constants
    const viewSelectorContainerId = 'view-selector-container';
    const clientId = "250457166472-n7pvo2gl7ucn8brpa2jic8o5abilnne8.apps.googleusercontent.com";

    //State Variables getters & setters
    const { ready, gapi, authorized, error } = useAnalyticsApi();
    const [viewId, setViewId] = React.useState();
    const [authorizeCalled, setAuthorizeCalled] = React.useState(false);

    //Prepare View
    useViewSelector(authorized ? gapi : undefined, viewSelectorContainerId, viewId => setViewId(viewId));
    const authDiv = React.useRef(null);
    const hasAuthElements = authDiv.current && authDiv?.current?.children?.length > 0;
    const authorize = useAuthorize(gapi, {
        clientId,
        container: 'authorize-container-id',
    });
    const signOut = useSignOut(gapi);

    //Prepare Queries & Charts
    const deviceQuery = {
        ids: viewId,
        'start-date': '7daysAgo',
        'end-date': 'today',
        metrics: 'ga:users',
        dimensions: 'ga:deviceCategory'
    };
    const deviceChart = {
        container: 'user-device-chart-container',
        type: 'PIE',
        options: {
            title: 'User Devices (7 Days)',
        }
    };
    useDataChart(authorized ? gapi : undefined, deviceQuery, deviceChart);

    const sessionDurationQuery = {
        ids: viewId,
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        metrics: 'ga:avgSessionDuration',
        dimensions: 'ga:day'
    };
    const sessionDurationChart = {
        container: 'session-duration-chart-container',
        type: 'LINE',
        options: {
            title: 'Average Session Duration (30 Days)',
        }
    };
    useDataChart(authorized ? gapi : undefined, sessionDurationQuery, sessionDurationChart);

    const bounceQuery = {
        ids: viewId,
        'start-date': '1daysAgo',
        'end-date': 'yesterday',
        metrics: 'ga:bounceRate',
        dimensions: 'ga:deviceCategory'
    };
    const bounceChart = {
        container: 'bounce-chart-container',
        type: 'BAR',
        options: {
            title: 'Bounce Rate by Device(30 Days)',
        }
    };
    useDataChart(authorized ? gapi : undefined, bounceQuery, bounceChart);

    const locationQuery = {
        ids: viewId,
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        metrics: 'ga:users',
        dimensions: 'ga:country'
    };
    const locationChart = {
        container: 'user-loc-chart-container',
        type: 'GEO',
        options: {
            title: 'User Locations (30 Days)',
        }
    };
    useDataChart(authorized ? gapi : undefined, locationQuery, locationChart);


    const sessionChannelQuery = {
        ids: viewId,
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        metrics: 'ga:sessions',
        dimensions: 'ga:channelGRouping'
    };
    const sessionChannelChart = {
        container: 'sessions-chart-container',
        type: 'BAR',
        options: {
            title: 'Sessions by Channel (30 Days)',
        }
    };
    useDataChart(authorized ? gapi : undefined, sessionChannelQuery, sessionChannelChart);

    React.useEffect(() => {
        if (ready && !error && !authorizeCalled) {
        authorize();
        setAuthorizeCalled(true);
        }
    }, [ready, error, authorizeCalled, authorize]);

    return(
        !apiService.isAdminAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/admin" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h1>Google Analytics</h1>
                {!ready && <div>Loading...</div>}
                {ready && (
                    <div>
                    {authorized && (
                        <div>
                            <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <div>
                                        <div id={viewSelectorContainerId} />
                                        <button onClick={() => signOut()}>Sign Out</button>
                                    </div>
                                </Card>
                            </Grid>
                                <Grid item xs={6}>
                                    <Card variant="outlined">
                                        <div>
                                            <h3>
                                                Session Duration
                                            </h3>
                                            <ResponsiveContainer>
                                                <div className="data-chart" id="session-duration-chart-container" />
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card variant="outlined">
                                        <div>
                                            <h3>
                                                Bounce Rate
                                            </h3>
                                            <div className="data-chart" id="bounce-chart-container" />
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <div>
                                            <h3>
                                                Users By Location
                                            </h3>
                                            <div className="data-chart" id="user-loc-chart-container" />
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <div>
                                            <h3>
                                                Users By Device
                                            </h3>
                                            <div className="data-chart" id="user-device-chart-container" />
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <div>
                                            <h3>
                                                Sessions By Channel
                                            </h3>
                                            <div className="data-chart" id="sessions-chart-container" />
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {!authorized && (
                        <div>
                        <div ref={authDiv} id="authorize-container-id"></div>
                        {!hasAuthElements && <div>🔄 Refresh the page to sign in.</div>}
                        </div>
                    )}
                    </div>
                )}
                {error && <div>{error.toString()}</div>}
            </Paper>
        </div>
    );
}
export default GAReports;