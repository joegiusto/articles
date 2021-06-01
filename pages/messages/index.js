import React, { Component, useState, useEffect } from 'react';

import { useSelector } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import TextareaAutosize from 'react-textarea-autosize';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import moment from 'moment'

import axios from 'axios'

import ROUTES from '../../components/constants/routes'
import SocketContext from '../../components/context/socket'

function Messages(props) {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [generalNewsletterList, setGeneralNewsletterList] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inboxFilter, setInboxFilter] = useState('people');
    const [focusedChat, setFocusedChat] = useState('');
    const [createChatOverlay, setCreateChatOverlay] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [startChatMessage, setStartChatMessage] = useState('');
    const [startChatUser, setStartChatUser] = useState('');
    const [startChatError, setStartChatError] = useState('');
    const [chatMessage, setChatMessage] = useState('');

    const [theme, setTheme] = useState('Default');

    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxFocus, setLightboxFocus] = useState('');
    const [colorOption, setColorOption] = useState('');
    const [showMessagePreview, setShowMessagePreview] = useState(true);
    const [showOnlineActivity, setShowOnlineActivity] = useState(true);
    const [publicPgpKeyModal, setPublicPgpKeyModal] = useState(false);
    const [publicPgpKey, setPublicPgpKey] = useState(userReduxState.public_pgp_block);

    const [focused, setFocused] = useState({});
    
    const myScrollRef = React.useRef();
    const socket = props.socket;

    useEffect(() => {

        // if (!props.auth) {
        //     props.history.push(ROUTES.SIGN_IN);
        // }
    
        // var query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
        if ( param?.startMsg !== '' && param?.startMsg !== undefined && param?.startMsg !== null ) {
            console.log("Has content")
            console.log(param.startMsg)
            // self.setState({
            //     createChatOverlay: true,
            //     startChatUser: param.startMsg
            // })
            setCreateChatOverlay(true);
            setStartChatUser(param?.startMsg)
        } else {
            console.log("Has no content")
        }
    
        // window.addEventListener('scroll', this.listenToScroll)
        // socket = io(ENDPOINT);
    
        // self.setState({
        //   messagesLoading: true
        // })

        setMessagesLoading(true)
    
        socket.on('connect', () => {
          console.log("Connected to server!"); // true
        });
    
        socket.emit( 'online', props.user_id )
    
        // axios.post('/api/getUserMessages', {
        //     _id: props.user_id
        // })
        axios.get('/api/user/messages')
        .then(function (response) {
            
            console.log(response)
            setMessages(response.data)
            setMessagesLoading(false)
    
        })
        .catch(function (error) {
            console.log(error);
        });
    
        socket.on('message', function(msg){
      
            console.log(`Just received this message from server`);
            console.log(msg);
            console.log(`Will be adding message to ${msg.chat_id}`);
        
            let willScroll = false;
        
            if ( scrollPosition === 1 ) {
                willScroll = true
            }
        
            const messages = [...messages];
            const index = messages.findIndex(m => m._id === msg.chat_id);
            messages[index].messages.push(msg);

            setMessages(messages)

            if ( willScroll === true ) {
                scrollToBottom();
            }
    
        });
	}, []);

    useEffect(() => {
        setFocused( messages?.find(m => m._id === focusedChat) );
    }, [focusedChat]);

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    // function handleChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    
    //     this.setState({
    //         [name]: value
    //     });
    // }

    // const handleChange = e => {
    //     const {name , value} = e.target
    //     setState( prevState => ({
    //         ...prevState,
    //         [name] : value
    //     }))
    // }
    
    function handleTextareaChange(e) {
        
        if ( e.key === "Enter" && !e.shiftKey ) {
        e.preventDefault();
    
        if (chatMessage !== '') {
            sendMessage();
        }
        }
    
    }
    
    function onImageUpload(e) {
        // const self = this;
        console.log(e.target.files);

        setImageFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    
        // self.setState({
        //     imageFile: e.target.files[0],
        //     image: URL.createObjectURL(e.target.files[0])
        // });
    }
    
    function scrollToBottom() {
        // const self = this;
        // console.log(myScrollRef)
        myScrollRef.current.scrollTop = myScrollRef.current.scrollHeight;
    }
    
    function listenToScroll(e) {
    
        const winScroll =
        e.currentTarget.scrollTop
    
        const height =
        e.currentTarget.scrollHeight -
        e.currentTarget.clientHeight
    
        const scrolled = winScroll / height

        setScrollPosition(scrolled);
    
        // this.setState({
        //     scrollPosition: scrolled,
        // })
    
    }
    
    function focusChat(chat_id) {
        // const self = this;

        setFocusedChat(chat_id)
        setSidebarVisible(false)
        setTimeout( function(){ scrollToBottom(); }, 100 );
        socket.emit( 'join-room', focusedChat )
    }
    
    function messagesSort( a, b ) {
        console.log(b.messages[b.messages.length - 1].date);
        return ( moment(b.messages[b.messages.length - 1].date) - moment(a.messages[a.messages.length - 1].date) )
    }
    
    function renderMessageContacts() {
    
        if (inboxFilter === 'people') {
        return (
            messagesLoading ?
            <div className="loading-conversations">
                {/* <img src={loadingGif} alt="Loading Icon"/> */}
                <div className="alert alert-articles mt-3">
                    <span className="alert-heading">Loading Chat</span>
                </div>
            </div>
            :
            messages.length > 0 ?
            messages.sort( messagesSort ).map(message => 
            <div onClick={() => focusChat(message._id)} className={"chat-contact inbox-message " + (message.promotional ? 'ad ' : '') + (message._id === focusedChat ? 'active ' : '')} >
    
                <div className="contact-photo">

                    <div className="status-container">
                        <div className="status"></div>
                    </div>
        
                    <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${ message.fetchedUsers?.filter(user => user.id !== userReduxState._id).map(user => user.id) }.jpg`} alt=""/>

                </div>
    
                <div className="contact-body message-content">
    
                    <div className="message-sender">
        
                        <div>
        
                        <div className="contact-name d-flex justify-content-between w-100"> 
                            <span>{message.fetchedUsers?.filter(user => user.id !== userReduxState._id).map(user => user.name)}</span>
                            <span style={{fontSize: '0.7rem', fontFamily: 'montserrat, sans-serif', fontWeight: '400'}} className="mute">{ moment( message.messages[message.messages.length - 1].date ).format("MMM Do | h:mm a") }</span>
                        </div>
        
                            <small>
        
                                {message.encryption === true ?
                                <span><i className="fas fa-lock"></i>Encrypted</span>
                                :
                                (showMessagePreview &&
                                    <span>
                                        {message.messages[message.messages.length - 1].message !== '' ? 
        
                                            <span>
                                            {message.messages[message.messages.length - 1].message.substring(0,35)}
                                            {message.messages[message.messages.length - 1].message.length > 35 ? 
                                            <><span>...</span></>
                                            : 
                                            ''}
                                            </span>
                                            : 
                                            <span><i className="far fa-file-image mr-2"></i>Image</span>
        
                                        }
                                    </span>
                                )    
                                }
        
                            </small>
                        </div> 
        
                    </div>
    
                </div>
            </div>
            )
            :
            <div>
    
            <div className="loading-conversations">
                <div className="alert alert-articles mt-3">
    
                <div className="alert-heading">No Messages</div>
                <small>Start one by clicking below</small>
    
                </div>
            </div>
    
            </div>
        ) 
        } 
    
        if (inboxFilter === 'newsletters') {
        return (
            <div className="newsletters">
            <div className="newsletters-card">
                You have not subscribed to any newsletters yet.
            </div>
            </div>
        ) 
        } 
    
        if (inboxFilter === 'rooms') {
        return (
            <div className="rooms">
            <div className="rooms-card">
                You are not a part of any rooms yet.
            </div>
            {/* <h5>Your Rooms</h5>
            <div className="badge badge-primary">Real ID</div>
            <div className="badge badge-primary ml-1">Developers</div>
            <div className="badge badge-primary ml-1">Writers</div>
            <div className="badge badge-primary ml-1">Designers</div> */}
            </div>
        ) 
        } 
    
        else {
        return(
            <div className="rooms">
            <div className="rooms-card">
                You are not a part of any rooms yet.
            </div>
            {/* <h5>Your Rooms</h5>
            <div className="badge badge-primary">Real ID</div>
            <div className="badge badge-primary ml-1">Developers</div>
            <div className="badge badge-primary ml-1">Writers</div>
            <div className="badge badge-primary ml-1">Designers</div> */}
            </div>
        )
        }
    }
    
    function sendSocketImage() {
        // const self = this;
        // console.log("Socket")
        socket.emit('5f208af919d23fbf84c7a6aa', {
            type: 'image',
            url: 'https://articles-website.s3.amazonaws.com/chat/5f208af919d23fbf84c7a6aa/b2cca4cd-37ff-490e-a804-a309f49e2e9d'
        });
    }
    
    function sendSocketText() {
        // const self = this;
        // console.log("Socket")
        socket.emit('5f208af919d23fbf84c7a6aa', {
            type: 'text',
            text: 'Hello there!'
        });
    }
    
    function logRooms() {
        socket.emit('log-rooms');
    }
    
    function sendMessage() {
        // const self = this;
        const data = new FormData();
    
        let focused = messages?.find(m => m._id === focusedChat);
    
        data.append('file', imageFile);
        data.append('chat_id', focusedChat);
        data.append('message', chatMessage);
    
        // {
        //   chat_id: self.state.focus._id,
        //   message: self.state.chatMessage,
        //   imageFile: data
        // }
    
        if ( focused?._id === undefined ) {
            console.log("This should not happen");
        } else {
    
        axios.post('/api/messages/send', data)
        .then(function (response) {
            console.log(response.data);
    
            // socket.to(self.state.focus._id).emit(self.state.chatMessage);
    
            socket.emit(focused?._id, chatMessage);
    
            let willScroll = false;
    
            if ( scrollPosition === 1 ) {
                willScroll = true
            }

            setChatMessage('')
            setImage('')
            setImageFile('')
    
        })
        .catch(function (error) {
            console.log(error);
        });
    
        }
    
    }
    
    function startChat(user, message) {
        // const self = this;
    
        axios.post('/api/startChat', {
            user, message
        })
        .then(function (response) {
            console.log(response.data);

            // TODO OLD - Has to be redone with userReduxState._id
            // setMessages([
            //     ...messages,
            //     {
            //         _id: response.data.insertedId,
            //         users: [
            //         user, props.user_id
            //         ],
            //         fetchecUsers: [
            //         {
            //             id: props.user_id
            //         },
            //         {
            //             id: user
            //         }
            //         ],
            //         messages: [
            //         {
            //             _id: 'will-fill',
            //             date: moment()._d,
            //             message: message,
            //             sender: props.user_id
            //         }
            //         ]
            //     }
            // ])
        
            // TODO - Not how I want this but has to be for now, fix the setState call, reload messages or anything else!
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error.response);
            setStartChatError(error.response.data)
        });
    
    }
    
    function deleteMessage(chat_id, message_id) {
        // const self = this;
    
        // let focused = this.state.messages?.find(m => m._id === this.state.focusedChat);
        const index = messages.findIndex(m => m._id === chat_id);
    
        console.log(`Chat Id: ${chat_id}, Message Id: ${message_id}`);
    
        axios.post('/api/deleteChatMessage', {
            chat_id, message_id
        })
        .then(function (response) {
            console.log(response.data);
        
            console.log( index );
        
            let tempMessages = [...messages];
            tempMessages[index].messages = messages[index].messages.filter((message) => {return message._id !== message_id});

            setMessages(tempMessages)
    
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    function deleteConversation(chat_id) {
        // const self = this;
    
        console.log(`Chat Id: ${chat_id}`);
    
        axios.post('/api/deleteChatConversation', {
            chat_id
        })
        .then(function (response) {
            console.log(response.data);
            setFocusedChat('')
            setMessages( messages.filter((message) => {return message._id !== chat_id}) )
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    function fakeDeleteConversation(chat_id) {
        setFocusedChat('')
        setMessages( messages.filter((message) => {return message._id !== chat_id}) )
    } 

    function handleClose() {
        setPublicPgpKeyModal(false)
    }

    return (
        <div className={`messages-page ${sidebarVisible != '' && 'chat-view'} theme-${theme} ${ (theme == 'Neon' || theme == 'City') && 'dark-mode'}`}>

            <Head>
                <title>Messages - Articles</title>
            </Head>

            <Modal show={publicPgpKeyModal} className="pgp-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Public PGP Key</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/* <div className="label"></div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <TextareaAutosize
                        className="pgp-public mr-1" 
                        name="pgpPublic"
                        value={userReduxState.public_pgp_block}
                        onKeyPress={(e) => { handleTextareaChange(e) }}
                        // onChange={(e) => handleChange(e)}
                        onChange={e => setPublicPgpKey(e.target.value)}
                        placeholder="Paste your PGP public key here">
                    </TextareaAutosize>
                    {/* <p style={{fontSize: '0.8rem', whiteSpace: 'break-spaces'}}>{props.user_details.public_pgp_block}</p> */}

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="articles-light" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>

            </Modal>

            {lightboxOpen && (
                <Lightbox
                    mainSrc={lightboxFocus}
                    // nextSrc={images[(photoIndex + 1) % images.length]}
                    // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setLightboxOpen(false)}

                    // onMovePrevRequest={() =>
                    //   this.setState({
                    //     photoIndex: (photoIndex + images.length - 1) % images.length,
                    //   })
                    // }

                    // onMoveNextRequest={() =>
                    //   this.setState({
                    //     photoIndex: (photoIndex + 1) % images.length,
                    //   })
                    // }

                />
            )}

            <div className={"start-chat-container " + (createChatOverlay ? 'visible' : '')}>

                <div onClick={() => setCreateChatOverlay(false)} className="start-chat-background"></div>

                <div className="start-chat card">

                    <div className="card-header">
                    Start Chat
                    </div>

                    <div className="card-body">

                    <div className="form-group articles">
                        <label for="new-chat-user-id">User's ID or Email Address</label>
                        <input 
                        className="form-control with-label" 
                        name="startChatUser" 
                        id="startChatUser" 
                        value={startChatUser}
                        // onChange={(e) => handleChange(e)}
                        onChange={e => setStartChatUser(e.target.value)}
                        type="text"/>
                    </div>

                    <div className="form-group articles">

                        <label for="startChatMessage">Message</label>

                        <TextareaAutosize
                            className="form-control with-label"
                            name="startChatMessage"
                            value={startChatMessage}
                            // onChange={(e) => handleChange(e)}
                            onChange={e => setStartChatMessage(e.target.value)}
                            placeholder="Type your message">
                        </TextareaAutosize>
                        
                    </div>

                    {startChatError !== '' &&
                        <div className="alert alert-danger">
                        {startChatError}
                        </div>
                    }

                    <button onClick={() => startChat(startChatUser, startChatMessage)} disabled={startChatUser === '' || startChatMessage === ''} className="btn btn-lg w-100 btn-articles-light">Start Chat</button>

                    </div>

                    <div className="card-footer">
                        <small>Your User ID is <b>{userReduxState._id}</b> provide this to a friend to start a conversation.</small>
                    </div>

                </div>

            </div>

            {/* <div className="container-fluid"> */}

            <div className="chat-card card my-0 mx-0 border-0">

                <div className="card-body d-flex p-0">

                    <div className={"chat-sidebar card rounded-0 " + (sidebarVisible ? 'expand' : '')}>

                        {theme == 'Default' && null}
                        {theme == 'Neon' && <img src="https://media0.giphy.com/media/cOzK12kNVHoiOLYX6P/giphy.gif" alt="" className="background" />}
                        {theme == 'City' && <img src="https://i.pinimg.com/originals/91/22/e8/9122e8553143325ab503ff95e208f2f9.gif" alt="" className="background" />}
                        {theme == 'Sky' && <img src="https://i.pinimg.com/originals/3b/8e/b7/3b8eb7b301f7bb6301ec1a8ff8e609c1.gif" alt="" className="background" />}
                        {/* <img src="https://media0.giphy.com/media/cOzK12kNVHoiOLYX6P/giphy.gif" alt="" className="background" />
                        <img src="https://media0.giphy.com/media/cOzK12kNVHoiOLYX6P/giphy.gif" alt="" className="background" />
                        <img src="https://media0.giphy.com/media/cOzK12kNVHoiOLYX6P/giphy.gif" alt="" className="background" /> */}

                        {/* <div className="alert alert-warning mb-0 p-1" style={{fontSize: '0.8rem'}}>Chat is in development! Articles staff will <span className="badge badge-danger">NEVER</span> ask you for your email or personal info via messages!</div>\ */}

                        {/* <div className="d-flex justify-content-center align-self-center"> */}

                        <div className={`home-button p-2 ${focusedChat != '' ? 'visible' : 'd-none'}`}>
                            <button onClick={() => focusChat('')} className="btn d-flex btn-articles-light w-100 align-items-center justify-content-center">
                                <i className="fas fa-home"></i>
                                <div>Messages Home</div>
                            </button>
                        </div>

                        {/* </div> */}

                        <div className="contacts-list">{renderMessageContacts()}</div>

                        <div className="start-chat">
                            <button onClick={() => setCreateChatOverlay(true)} className="btn btn-articles-light">Start Chat</button>
                        </div>

                    </div>

                    <div className={"chat-content" + (sidebarVisible ? '' : ' expand') + (Object.keys( focused || {} ).length === 0 ? ' empty' : '')}>

                        <div onClick={() => setSidebarVisible(false)}  className={"content-darken " + (sidebarVisible ? 'visible ' : '')}></div>

                        <div className="content-header d-none">
                            <div className="row justify-content-center justify-content-lg-between align-items-center">

                                <div className="col-8 col-sm-8 d-flex justify-content-center align-items-center">

                                    <button id="conversations-menu-button" onClick={() => setSidebarVisible(true)} className="btn btn-articles-light d-lg-none mr-3">
                                        <i className="fas fa-comment mr-2"></i>
                                        <span>Messages</span>
                                    </button>

                                    {focusedChat !== '' &&
                                    <div className="d-flex align-items-center">
                                        <div className="badge badge-dark mr-2">Offline</div>
                                        <div>{focused?.fetchedUsers?.filter(user => user.id !== props.user_id).map(user => user.name)}</div>
                                    </div>
                                    }

                                </div>

                                {focusedChat !== '' &&
                                <div className="col-auto">

                                    <OverlayTrigger 
                                        trigger='click' 
                                        rootClose 
                                        placement="bottom" 
                                        overlay={ 
                                            <Popover id="popover-basic">

                                                <Popover.Title as="h3">Settings</Popover.Title>

                                                <Popover.Content>

                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <div className="mr-3">Encrypt Chat</div>
                                                        <div>
                                                        <button className="btn btn-sm btn-articles-light">
                                                            Encrypt
                                                        </button>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <div className="mr-3">Mute Chat</div>
                                                        <div>
                                                        <button className="btn btn-radio active btn-sm btn-articles-light">
                                                            No
                                                        </button>
                                                        <button className="btn btn-radio btn-sm btn-articles-light">
                                                            Yes
                                                        </button>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="mr-3">Delete Chat</div>
                                                        <div>
                                                        <button onClick={() => deleteConversation(focused?._id)} className="btn btn-sm btn-danger">
                                                            Delete
                                                        </button>
                                                        </div>
                                                    </div>

                                                    <div className={"justify-content-between align-items-center mt-3 " + (props.user_id === '5e90cc96579a17440c5d7d52' ? 'd-flex' : 'd-none')}>
                                                        <div className="mr-3">Fake Delete Chat</div>
                                                        <div>
                                                        <button onClick={() => fakeDeleteConversation(focused?._id)} className="btn btn-sm btn-danger">
                                                            Delete
                                                        </button>
                                                        </div>
                                                    </div>

                                                </Popover.Content>
                                            
                                            </Popover>
                                        }
                                    >
                                        <button className="btn btn-articles-light">
                                            <i className="fas fa-cog mr-0"></i>  
                                        </button>
                                    </OverlayTrigger>

                                </div>
                                }

                            </div>
                        </div>

                        <div className="content-home">

                            <div style={{maxWidth: 1200}} className="container-fluid py-3 py-lg-5">

                                <div className="row justify-content-center">
                                    
                                    <div className="col-lg-8 mb-3 mb-lg-5">
                                        <h2 className="text-center" onClick={() => setSidebarVisible(true) }>Hello {userReduxState.first_name}!</h2>
                                        <div className="text-center mb-4" style={{fontSize: '1rem'}}>
                                            <span style={{fontSize: '0.8em', verticalAlign: 'text-top'}} className="badge badge-dark mr-1">Articles Staff</span>
                                            <span>will </span>
                                            <span style={{fontSize: '0.8em', verticalAlign: 'text-top'}} className="badge badge-danger mr-1">NEVER</span>
                                            <span>ask for personal info such as your email, address, password, etc via messages!</span>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-6">
                                        <div className="theme-picker mb-4">

                                            <h2 className={''}>Chat Theme</h2>
        
                                            <div className="themes">
        
                                                <div className="card shadow-sm mx-1">
                                                    <div className="card-header">Default</div>
                                                    <div className="card-body"><button disabled={theme == 'Default' && 'off'} onClick={() => setTheme('Default')} className="btn btn-articles-light">{ theme == 'Default' ? 'Selected' : 'Select' }</button></div>
                                                </div>

                                                <div className="card shadow-sm mx-1">
                                                    <div className="card-header">Sky</div>
                                                    <div className="card-body"><button disabled={theme == 'Sky' && 'off'} onClick={() => setTheme('Sky')} className={`btn btn-articles-light`}>{ theme == 'Sky' ? 'Selected' : 'Select' }</button></div>
                                                </div>
            
                                                <div className="card shadow-sm mx-1">
                                                    <div className="card-header d-flex justify-content-between align-items-center">Neon<span className="badge badge-articles">Dark Mode</span></div>
                                                    <div className="card-body"><button disabled={theme == 'Neon' && 'off'} onClick={() => setTheme('Neon')} className={`btn btn-articles-light`}>{ theme == 'Neon' ? 'Selected' : 'Select' }</button></div>
                                                </div>
                                                
                                                <div className="card shadow-sm mx-1">
                                                    <div className="card-header d-flex justify-content-between align-items-center">City<span className="badge badge-articles">Dark Mode</span></div>
                                                    <div className="card-body"><button disabled={theme == 'City' && 'off'} onClick={() => setTheme('City')} className={`btn btn-articles-light`}>{ theme == 'City' ? 'Selected' : 'Select' }</button></div>
                                                </div>
        
                                            </div>
        
                                        </div>
                                    </div>
    
                                    <div className="col-lg-6">
                                        <div className="mb-4">

                                            <h2 className={''}>Message Options</h2>

                                            <div className="message-settings-cards">
            
                                                {/* Message Previews */}
                                                <div className="card p-3 d-flex">
            
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>Message Preview</div>
            
                                                        <label 
                                                            className="articles-switch mb-0" 
                                                            
                                                        >
                                                            <input type="checkbox" checked={showMessagePreview}/>
                                                            <span onClick={ () => setShowMessagePreview(!showMessagePreview) } className="slider"></span>
                                                        </label>
                                                    </div>
            
                                                    <hr/>
            
                                                    <div className="mt-2 d-flex">
                                                        <div className="fake-profile-photo mr-2"></div>
                                                        <div>
                                                            <div><b>Sender</b></div>
                                                            {showMessagePreview && <div className="message-preview">A short preview of the message</div> }
                                                        </div>
                                                    </div>
            
                                                </div>
            
                                                {/* Online Status */}
                                                <div className="card p-3 d-flex">
            
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>Online Activity</div>
            
                                                        <label className="articles-switch mb-0" onClick={ () => setShowOnlineActivity(!showOnlineActivity) }>
                                                            <input type="checkbox" checked={showOnlineActivity}/>
                                                            <span className="slider" onClick={ () => setShowOnlineActivity(!showOnlineActivity) }></span>
                                                        </label>
                                                    </div>
            
                                                    <hr/>
            
                                                    <div className="mt-2">
                                                        {showOnlineActivity ? <div className="badge badge-success mr-2">Online</div> : <div className="badge badge-dark mr-2">Offline</div>}  
                                                        <div>Displays whether you are online or not</div>
                                                    </div>
            
                                                </div>
            
                                                {/* Encrypted Chats */}
                                                <div className="card p-3 d-flex">
            
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>Encrypted Chats</div>
            
                                                        <label className="articles-switch mb-0" onClick={ () => setPublicPgpKeyModal(true) }>
                                                            <input type="checkbox" checked={publicPgpKeyModal}/>
                                                            <span className="slider" onClick={ () => setPublicPgpKeyModal(true) }></span>
                                                        </label>
                                                    </div>
            
                                                    <hr/>
            
                                                    <div className="mt-2">
                                                        <div className="badge badge-primary">Beta</div>
                                                        <div>Enter a PGP Public Block for users to encrypt messages with.</div>
                                                    </div>
            
                                                </div>

                                                {/* Messages Badge */}
                                                <div className="card p-3 d-flex">
            
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>Messages Badge</div>
            
                                                        <label className="articles-switch mb-0" onClick={ () => setPublicPgpKeyModal(true) }>
                                                            <input type="checkbox" checked={publicPgpKeyModal}/>
                                                            <span className="slider" onClick={ () => setPublicPgpKeyModal(true) }></span>
                                                        </label>
                                                    </div>
            
                                                    <hr/>
            
                                                    <div className="mt-2">
                                                        <div>Display messages button in top right of site.</div>
                                                    </div>
            
                                                </div>
                                            

                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-6">
                                        <div className="theme-picker mb-4">
                                            <h2>Encryption Tips</h2>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        
                        </div>

                        <div ref={myScrollRef} onScroll={(e) => listenToScroll(e)} className="content-body">
                        
                        {focused?.encryption === true ? 

                        <div className="chat-encryption-warning card">

                            <div className="card-header">
                            Chat Encrypted
                            </div>

                            <div className="card-body">
                            <div>The user who started this chat set a password that you will need to decrypt the messages. For best security obtain this password from the user in person.</div>
        
                            <div style={{width: '100%'}} className="form-group d-inline-block articles mt-3">
                                <label for="password">Password</label>
                                <input className="form-control with-label" name="password" id="password" type="text" value=""/>
                            </div>
        
                            <button className="btn btn-articles-light w-100">Enter</button>
                            </div>

                        </div>

                        :

                        focused?.messages?.map((message) => (

                            <div className={"chat-message p-3 " + ( message.sender === userReduxState._id ? 'personal' : '' )}>

                                <div className={"message-photo " + ( message.sender === userReduxState._id ? 'd-none' : '' )}>
                                    <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
                                </div>

                                <div className="message-details">

                                <div className={"message " + (message.media === 'photo' ? 'photo' : '')}>
                                    {
                                    message.media !== 'photo' ? 
                                    <span>{message.message}</span>
                                    :
                                    <img style={{cursor: 'pointer'}} onClick={() => setState({lightboxFocus: message.url, lightboxOpen: true})} className="img-fluid" src={message.url} alt=""/>
                                    }

                                    <div className="message-extras">
                                        <i onClick={() => deleteMessage(focused?._id, message._id)} className="fas fa-trash-alt mr-0"></i>
                                    </div>

                                </div>

                                <div className="date">{moment(message.date).format("LLL")}</div>
                                </div>

                            </div>

                        ))}

                        </div>

                        <div className={"content-send " + (focused?.encryption ? 'd-none' : '')}>

                        <div onClick={() => scrollToBottom()} className={"scroll-lock " + (scrollPosition === 1 ? 'active' : '')}>
                            <span>Auto Scroll</span>
                            <span className={(props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>&nbsp;{scrollPosition}</span>
                        </div> 

                        <div className={"thumbnail-container " + (image === '' ? 'd-none' : '')}>

                            <button onClick={() => setState({image: '', imageFile: ''})} className="btn btn-sm btn-danger remove">
                            <span><i className="far fa-window-close"></i>Remove</span>
                            </button>

                            <img id="thumbnail" src={image}/>

                        </div>

                        {image === '' ? 
                        <TextareaAutosize
                            className="chat-message mr-1" 
                            name="chatMessage"
                            value={chatMessage}
                            onKeyPress={(e) => { handleTextareaChange(e) }}
                            // onChange={(e) => handleChange(e)}
                            onChange={e => setChatMessage(e.target.value)}
                            placeholder="Type your message">
                        </TextareaAutosize>
                        : 
                        ''}                  

                        <div className="align-items-start">
                            <input className="d-none" onFocus={() => (props.changeFocus('photo'))} id="file-upload" onChange={onImageUpload} accept="image/x-png,image/gif,image/jpeg" type="file" name="myfile" />
                            <label for="file-upload" className="btn btn-sm btn-articles-light mb-0"><i className="fas fa-paperclip mr-0 mr-m-1"></i><span className="d-none d-md-inline">Attach</span></label>
        
                            <button disabled={chatMessage === '' && image === ''} className="btn btn-sm btn-articles-light" onClick={() => sendMessage()}><i className="far fa-paper-plane mr-0 mr-m-1"></i><span className="d-none d-md-inline">Send</span></button>
                            
                            <button onClick={() => sendSocketText()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Txt</button>
                            <button onClick={() => sendSocketImage()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Img</button>
                            <button onClick={() => logRooms()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Room</button>
                        </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* </div> */}

        </div>
    )
}

const MessagesWithSocket = props => (
<SocketContext.Consumer>
    { socket => <Messages {...props} socket={socket}/> }
</SocketContext.Consumer>
)
  
export default MessagesWithSocket;