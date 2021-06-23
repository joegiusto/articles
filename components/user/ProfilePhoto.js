import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

export default class UserProfilePhoto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fakeImageHash: 0,
            newProfilePhotoLoading: false,
            cacheBust: moment()
        }

        this.onChangeProfile = this.onChangeProfile.bind(this);
    }

    onChangeProfile(e) {
        console.log(e.target.files);
        const data = new FormData();

        this.setState({
        file: e.target.files[0],
        newProfilePhotoLoading: true,
        }, 
        () => {
            data.append('file', this.state.file);
            data.append('user', this.props.user_id);
            
            axios.post("/api/addProfilePhoto", data, { // receive two parameter endpoint url ,form data 
            
            })
            .then(res => { // then print response status
            console.log(res.statusText)
            this.setState({
                newProfilePhotoLoading: false,
                // photos: [...this.state.photos, 'profile_photos/' + this.props.user_id + '.' + this.state.file.name.split('.')[1]],
                fakeImageHash: this.state.fakeImageHash + 1
            })
            })
        }
        )

    }

    render() {
        return (
        <div className="aws-profile-photo-edit">

            <div className="upload-photo-wrap mr-1">

                {this.state.newProfilePhotoLoading ? <div className="upload-notifiction">Uploading</div> : ''}
                
                <div className="upload-photo-button noselect">
                <i className="fas fa-plus mr-0"></i>
                </div>

                <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.user_id}.jpg?h=${this.state.fakeImageHash}&b=${this.state.cacheBust}`} height="150" width="150" alt=""/>
                
                <input onFocus={() => (this.props.changeFocus('photo'))} onChange={this.onChangeProfile} accept=".jpg" type="file" name="myfile" />

            </div>

            <div className="provided-profile-photos">

                {/* USA Flag */}
                <img src="https://images.fineartamerica.com/images-medium-5/american-flag--square-wingsdomain-art-and-photography.jpg" alt="" />

                {/* Rosie the Riveter */}
                <img src="https://img.apmcdn.org/c3c693ee0ffd35412b67a18db7601e9d4784f8fc/square/cd924f-20140328-rosie.jpg" alt="" />

                {/* Uncle Sam */}
                <img src="https://legacy.lessonstream.com/wp-content/uploads/2012/10/Uncle-Sam-square.jpg" alt="" />

                {/* Rainbow */}
                <img src="https://elmersflag.com/wp-content/uploads/2016/11/Rainbow.png" alt="" />

                {/* BLM */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7em8bJvxuKUAGKE7xq0rRjnnQvA6GNW_w4w&usqp=CAU" alt="" />

                {/* Human Rights */}
                <img src="data:image/png;base64,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" alt="" />

                {/* Alien */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHc7fwKtjdAJaKuUekSzK-_B-A3d4qVJd7imwAZNZ-obe2RCsPuLRZO9zayA&usqp=CAc" alt="" />

                {/* Peace Sign */}
                <img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/psychedelic-peace-sign-hippie-sticker-30365-300x300.png" alt="" />

                {/* Weed */}
                <img src="https://png.pngtree.com/png-vector/20191206/ourmid/pngtree-weed-vector-or-color-illustration-png-image_2043101.jpg" alt="" />

            </div>

        </div>
        )
    }
}