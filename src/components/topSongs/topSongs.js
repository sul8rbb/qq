import React, { Component } from 'react'
import './topSongs.css'
import API from "../../common/API"
import { Button, Icon } from 'antd';
class topSongs extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.match.params.id,
            picAlbum: '',
            updateTime: '',
            totalSongNum: '0',
            listName: '',
            songList: []
        }
        this.v = 0;
    }
    componentDidMount() {
        this.$http({
            url: API.songlist + '/' + this.state.id
        }).then(d => {
            console.log(d)
            this.setState({
                picAlbum: d.data.data.topInfo.picAlbum,
                updateTime: d.data.data.updateTime,
                totalSongNum: d.data.data.totalSongNum,
                listName: d.data.data.topInfo.listName,
                songList: d.data.data.songList
            })
        })
    }
    play(e, songId, singerId, id) {
        console.log(singerId)
        if (this.v === 0) {
            this.props.history.push('/play/' + songId + '/' + singerId + '/' + id)
        }
        this.v = 0;
    }
    smove() {
        this.v++;
    }
    render() {
        var el = this.state.songList.map((item, idx) => {
            return (
                <div className="slt" key={item.songId} onTouchMove={() => { this.smove() }} onTouchEnd={(e) => this.play(e, item.songMid, item.singer[0].singerMid, item.songId)}>
                    <div className="sltl">
                        {idx < 3 ? <span className="red">{idx + 1}</span> : <span>{idx + 1}</span>}
                        <div><span className="red iconfont icon-dkw_tisheng"></span>160%</div></div >
                    <div className="sltm"><h2>{item.songName}</h2>{
                        item.singer.map((singer, idx) => {
                            return <div key={idx}>{singer.singerName}</div>
                        })
                    }</div>
                    <div className="sltr"><Icon type="vertical-align-bottom" /></div>
                </div >
            )
        })
        return (

            <div className="songList" >
                <div className="logo1">
                    <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                    <div className="more"><h5>更多QQ音乐排行榜</h5></div>
                    <div className="down1">戳我看看</div>
                </div>

                <div className='songPic'>
                    <div className="sp"><img src={this.state.picAlbum} alt="" /></div>
                    <div className="bdzs"><h2>{this.state.listName}</h2></div>
                    <div className="lxts"><h3>流行指数榜 第170天</h3></div>
                    <div className="gxsj"><p>更新时间：{this.state.updateTime}</p></div>
                    <div><Button type="primary" shape="round" icon="caret-right"></Button></div>
                </div>
                <div className="phb">
                    排行榜
                <span>共{this.state.totalSongNum}首</span>
                </div>
                <div id="box">
                    <ul>
                        <li>
                            {el}
                            {/* <div className="slt">
                            <div className="sltl">22<div>160%</div></div>
                            <div className="sltm"><h2>33</h2><div>4444</div></div>
                            <div className="sltr"><Icon type="vertical-align-bottom" /></div>
                        </div> */}
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
export default topSongs
