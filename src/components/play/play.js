import React, { Component } from 'react'
import API from "../../common/API"
import './play.css'
class play extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.match.params.id,
            singerId: props.match.params.singerId,
            songId: props.match.params.songId,
            songUrl: '',
            singerPic: '',
            newArrs: [],
            time: '',
            num: 0
        }
        this.audios = React.createRef();
        this.lrcn = React.createRef();


    }
    componentDidMount() {
        //歌手图片
        this.$http({
            url: API.albumImg + '/' + this.state.id + '/' + this.state.singerId
        }).then(d => {
            console.log(d)
            this.setState({
                singerPic: d.data.data.singerAvatarUrl
            })
        })
        var num = 0;

        //歌曲连接
        this.$http({
            url: API.songUrlList + '/' + this.state.id
        }).then(d => {
            this.setState({
                songUrl: d.data.data[0]
            }, () => {
                var audios = this.audios.current;
                var lrcn = this.lrcn.current;
                audios.onplay = () => {
                    this.startAnim();
                }
                audios.onpause = () => {
                    this.stopAnim();
                }
                audios.ontimeupdate = () => {
                    var currentTime = audios.currentTime;
                    var minute = Math.floor(currentTime / 60) < 10 ? '0' + Math.floor(currentTime / 60) : Math.floor(currentTime / 60);
                    var second = Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60);
                    var time = minute + ':' + second;
                    this.setState({
                        time: time,
                    })
                    for (var i = 0; i < lrcn.children.length; i++) {
                        if (lrcn.children[i].getAttribute('time') === time) {
                            num = i;
                            break;
                        }
                    }
                    this.lrcn.current.style.top = (-(num - 2)) * 40 + 'px'
                }


            })
        })
        // this.startAnim();

        //歌词
        this.$http({
            url: API.lrc + '/' + this.state.songId
        }).then(d => {
            var arr = d.data.data.lyric.split('[换行]')
            var arr2 = [];
            var keys = "";
            var values = "";
            var ljson = {};
            var newArrs = [];
            for (var i = 0; i < arr.length; i++) {
                arr2 = arr[i].split(']');
                keys = arr2[0].substr(1);
                values = arr2[1];
                if (values === '' && keys.indexOf('0') !== -1) {

                    continue;
                }
                if (values === "") {
                    values = keys;
                    keys = '00:00'
                }
                keys = keys.substr(0, 5);
                ljson = {
                    key: keys,
                    value: values
                }
                newArrs.push(ljson)
            }
            this.setState({
                newArrs: newArrs
            })
        })

        if (this.audios.current.paused) {
            this.stopAnim()
        }

    }
    timeout = 0;
    rotate = 0;

    startAnim() {
        this.timeout = setInterval(() => {
            var img = document.getElementById("img");
            var rotateStyle = "rotate(" + this.rotate + "deg)";
            img.style.transform = rotateStyle;

            this.rotate += 6;
            if (this.rotate > 360) {
                this.rotate = 0;
            }
        }, 90);
    }
    stopAnim() {
        clearInterval(this.timeout);
        this.timeout = null;
    }


    render() {



        var el = this.state.newArrs.map((item, idx) => {

            return <p key={idx} time={item.key}>{item.value}</p>

        })
        return (
            <div className="App">
                <div className="play">
                    <div className="logo12">
                        <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                        <div className="more">更多QQ音乐排行榜</div>
                        <div className="down">立即使用</div>
                    </div>
                </div>
                <div className="playPic">
                    <img src={this.state.singerPic} alt=""
                        id="img" onClick={() => { this.timeout ? this.stopAnim() : this.startAnim() }} />
                </div>
                <div className="lrc">
                    <div className="lrcn" ref={this.lrcn}>
                        {el}
                    </div>
                </div>
                <div className="audios">
                    <audio ref={this.audios} src={this.state.songUrl} controls></audio>
                </div>
            </div>
        )
    }
}
export default play
