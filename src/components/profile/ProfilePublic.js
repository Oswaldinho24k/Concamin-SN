import React, {Component} from 'react';
import {ProfileDisplay} from "./ProfileDisplay";
import {CircularProgress, RaisedButton} from 'material-ui';
import toastr from 'toastr';
import {MainLoader} from '../loader/MainLoader';
//redux
import {connect} from 'react-redux';
import {getUser} from "../../redux/actions/usuariosActions";
import {bindActionCreators} from 'redux';
//actions
import {toggleFollow} from "../../redux/actions/usuarioActions";

const defaultImg = "https://fthmb.tqn.com/cD0PNhMM0BxevlBvAgD1ntpQLac=/3558x2363/filters:fill(auto,1)/Cat-rolling-GettyImages-165893132-58ac5ef05f9b58a3c90a144f.jpg";
const Dportada = "https://wallpaperclicker.com/storage/wallpaper/hd-wallpaper-beautiful-art-full-hd-89223888.jpg";


const ProfilePublicDisplay = ({loading, onChange, fetched, changePic, changeCover, onSubmit, photoURL, title, displayName, fullName, email, age, sex, facebook, twitter, github, linkedIn, bio, portada}) => {
    if(!portada) portada = Dportada;
    return(<div>

        <div className="profile-portada-publica" style={{backgroundImage:`url('${portada}')`}}>
            <figure>
                <img src={photoURL ? photoURL:defaultImg} alt="user"/>
                <h3 style={{position:"absolute", bottom:-25, left:10}}>{fullName}</h3>
            </figure>
            <div className="profile-follow-data">
                <span>Seguidores <br/> 25 </span>  
                <span>Siguiendo <br/> 30 </span>  
                <span>Posts <br/> 25 </span>    
            </div>
        </div>

    </div>);
};

class ProfilePublic extends Component{

    state = {
        loading:false
    };

    follow = () => {
        const userId = this.props.match.params.userId;
        this.props.toggleFollow(userId)
            .then(mensaje=>toastr.info(mensaje + this.props.profile.fullName));
    };

    render(){
        const {loading} = this.state;
        const {fetched, profile, following, isSelf} = this.props;
        if(!fetched) return <MainLoader/>
        return(
            <div style={{backgroundColor:"lightgrey", height:"calc(100vh - 64px)"}}>
                <ProfilePublicDisplay
                    loading={loading}
                    fetched={fetched}
                    {...profile}/>
                <RaisedButton
                    disabled={isSelf}
                    style={{position:"fixed", top:370, right:20, zIndex:2}}
                    onClick={this.follow}
                     primary={true}
                    label={following ? "Dejar de seguir":"Seguir"}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    const userId = ownProps.match.params.userId;
    //let following = state.usuario.following[userId];
    let following = false;
    if (state.usuario.following !== undefined){
        following = state.usuario.following[userId];
    }
    //if(following===undefined) following = false;
    //else following = true;
    console.log(following);
    return{
        isSelf:userId === state.usuario.id,
        profile: state.users.object[userId],
        following,
        fetched:state.users.object[userId] !== undefined,
    }
}

function mapDispatchToProps(dispatch, ownProps){
    const userId = ownProps.match.params.userId;
    dispatch(getUser(userId));
    return {
        toggleFollow: bindActionCreators(toggleFollow, dispatch)
    }
}

ProfilePublic = connect(mapStateToProps,mapDispatchToProps)(ProfilePublic);
export default ProfilePublic;

