import http from 'http';
import express from 'express';
import cors from 'cors';
import webpack from 'webpack';
import webpackConfig from './../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";
import open from 'open';
import socketIO from 'socket.io';

import { handleRender } from './serverRenderMiddleware';
import { getDefaultState } from './getDefaultState';
import { channels } from './db/Channel';
import { users } from './db/User';

/* eslint-disable no-console */
const compiler = webpack(webpackConfig);

let app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(cors());
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler, {
    'log': false,
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000,
}));

import { initializeDB } from './db/initializeDB';

initializeDB();
const currentUser = users[0];

app.use((req, res, next) => {
    const delay = 1000;
    setTimeout(next, delay);
});

app.use('/channel/create/:channelID/:name/:participants', ({ params: { channelID, name, participants } }, res) => {
    const channel = {
        id: channelID,
        name,
        participants: JSON.parse(participants),
        messages: [],
    };
    channels.push(channel);
    res.status(300).json(channel);
});

app.use('/channel/:id', (req, res) => {
    res.json(channels.find((channel) => channel.id === req.params.id));
});

app.use('/user/activeChannel/:userID/:channelID', ({ params: { userID, channelID } }, res) => {
    users.find((user) => user.id === userID).activeChannel = channelID;
    res.status(200).send(true);
});

app.use('/user/:id', (req, res) => {
    res.json(users
        .map(({ name, id }) => ({ name, id }))
        .find((user) => user.id === req.params.id));
});

app.use('/status/:id/:status', ({ params: { id, status } }, res) => {
    if (!['ONLINE', 'OFFLINE', 'AWAY'].includes(status)) {
        return res.status(403).send();
    }
    const user = users
        .find((user) => user.id === id);
    if (user) {
        user.status = status;
        res.status(200).send();
    } else {
        res.status(404).send();
    }
});

export const createMessage = ({ userID, channelID, messageID, input }) => {
    const channel = channels.find((channel) => channel.id === channelID);

    const message = {
        id: messageID,
        content: {
            text: input,
        },
        owner: userID,
    };

    channel.messages.push(message);
    io.emit("NEW_MESSAGE", { channelID: channel.id, ...message });
};

app.use('/input/submit/:userID/:channelID/:messageID/:input', ({ params: { userID, channelID, messageID, input } }, res) => {
    const user = users.find((user) => user.id === userID);

    if (!user) {
        return res.status(404).send();
    }

    createMessage({ userID, channelID, messageID, input });
    res.status(300).send();
});

app.use(express.static('public/css'));
// app.use(express.static('public')); // Useless when server-side rendering
app.use('/', handleRender( () => {
    return getDefaultState(currentUser);
})); // We use this line instead

const port = 9000;
server.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.info(`Redux Messenger is listening on port ${port}.`);
        open(`http://localhost:${port}`);
    }
});

import { simulateActivity } from './simulateActivity';
simulateActivity(currentUser.id);
