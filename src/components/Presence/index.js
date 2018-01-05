import React, { Component } from 'react';
import autobind from 'class-autobind';
import debounce from 'debounce';
import uuidv4 from 'uuid/v4';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import Pointer from '../Pointer';

import './presence.scss';

firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  apiKey: process.env.FIREBASE_API_KEY,
});

// TODO figure out how to deal with id-less users??

const MOUSE_DEBOUNCE = 0;

const ONE_MINUTE = 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

class Presence extends Component {

  constructor() {
    super();
    autobind(this);
    this.intervalId = undefined;
  }

  componentDidMount() {
    const { auth, setUserId, getUserRef, getConnectionRef, removeUser } = this.props;

    window.addEventListener('mouseenter', debounce(this.handleMouseEvent, MOUSE_DEBOUNCE));
    window.addEventListener('mousemove', debounce(this.handleMouseEvent, MOUSE_DEBOUNCE));

    this.intervalId = setInterval(this.removeIdleUsers, ONE_MINUTE);

    auth().then(() => {
      setUserId();

      const ref = getUserRef();
      ref.onDisconnect().remove();
    });

    getConnectionRef().on('value', snap => {
      if (snap.val() === true) {
        setUserId();
      } else {
        removeUser();
      }
    });
  }

  componentWillUnmount() {
    const { removeUser } = this.props;

    removeUser();

    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }

    window.removeEventListener('mouseenter', debounce(this.handleMouseEvent, MOUSE_DEBOUNCE));
    window.removeEventListener('mousemove', debounce(this.handleMouseEvent, MOUSE_DEBOUNCE));
  }

  handleMouseEvent(event) {
    const { updatePosition, setUserId, users, id } = this.props;

    if (users && id && users[id] && !users[id].id) {
      setUserId();
    }

    updatePosition(event.pageY, event.pageX);
  }

  removeIdleUsers() {
    const { users, removeOtherUser } = this.props;
    const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

    if (users) {
      const arrayOfUsers = Object.keys(users).map(k => (users[k]))

      arrayOfUsers.forEach(user => {
        if (!user.updatedAt || (serverTimestamp - user.updatedAt) > TEN_MINUTES) {
          removeOtherUser(user.id);
        }
      });
    }
  }

  render() {
    const { users } = this.props;

    if (!users || users.length === 0) {
      return null;
    }

    const arrayOfUsers = Object.keys(users).map(k => (users[k])).filter(u => (!u.id || u.id !== this.props.id));

    return (<div className="presence-container">
      {arrayOfUsers.map(({ id, position }) => {
        if (!position || !id) {
          return null;
        }

        return (
          <Pointer
            key={`pointer-${id}`}
            top={position.top}
            left={position.left}
          />
        );
      })}
    </div>);
  }
}

const mapFirebaseToProps = (props, ref, firebaseApp) => ({
  users: 'users',
  auth: () => firebaseApp.auth().signInAnonymously(),
  getUserRef: () => ref(`users/${props.id}`),
  getConnectionRef: () => ref('.info/connected'),
  setUserId: () => ref(`users/${props.id}/id`).set(props.id),
  removeUser: () => ref(`users/${props.id}`).remove(),
  removeOtherUser: id => ref(`users/${id}`).remove(),
  updatePosition: (top, left) => {
    ref(`users/${props.id}/position`).set({ top, left });
    ref(`users/${props.id}/updatedAt`).set(firebase.database.ServerValue.TIMESTAMP);
  }
});

const ConnectedPresence = connect(mapFirebaseToProps)(Presence);

class PresenceWrapper extends Component {
  constructor() {
    super();
    this.id = uuidv4();
  }

  render() {
    return (
      <ConnectedPresence id={this.id} {...this.props} />
    );
  }
}

export default PresenceWrapper;
