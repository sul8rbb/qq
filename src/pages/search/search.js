import React, { Component } from 'react'
import './search.css'
import API from "../../common/API"
import { Icon, Input, message } from 'antd';
class search extends Component {
    constructor() {
        super();
        this.state = {
            songList: [],
            hotList: [
                '周笔畅 新歌',
                '话语原创十大金曲',
                '陪你到世界之巅',
                '假如你是个陌生人',
                '想你的每个夜晚',
                '父亲写的散文诗'
            ],
            isshow: true,
            ipt: ''

        }
        // this.search = React.createRef();
        // this.result = React.createRef();
        // this.myRef = React.createRef();
        this.v = 0;
    }

    componentDidMount() {
        // this.result.current.style.display = "none"
    }

    hid() {
        this.setState({
            isshow: false
        })
    }
    cancel() {
        if (this.state.ipt === '') {
            this.setState({ isshow: true })
        }

    }
    cancel1() {
        this.setState({
            isshow: true,
            ipt: ''
        })

    }
    //判断点击的键盘的keyCode是否为13，是就调用上面的搜索函数
    handleEnterKey = (e) => {
        if (e.nativeEvent.keyCode === 13) { //e.nativeEvent获取原生的事件对像
            this.onSearchText()
        }
    }
    changeIpt(ipt) {
        this.setState({
            ipt: ipt,
            isshow: false
        })

        if (ipt !== '') {
            this.$http({
                url: API.search + '/' + ipt
            }).then(d => {
                this.setState({
                    songList: d.data.data.songList
                })
            })
        }

    }
    onSearchText() {
        if (!this.state.ipt.trim()) {
            message.warning("请输入要搜索的关键字！")
        } else {
            this.$http({
                url: API.search + '/' + this.state.ipt
            }).then(d => {
                this.setState({
                    songList: d.data.data.songList
                })
            })
        }

    }
    play(e, songId, id, singerId) {
        if (this.v === 0) {
            this.props.history.push('/play/' + songId + '/' + id + '/' + singerId)
        }
        this.v = 0;
    }
    change(e) {
        this.setState({
            ipt: e.target.value
        })
    }
    smove() {
        this.v++;
    }
    render() {

        var el = this.state.songList.map(item => {
            return (
                <div className="searchResult" key={item.songId} onTouchMove={() => this.smove()} onTouchEnd={(e) => this.play(e, item.songMid, item.singer[0].singerMid, item.songId)}>
                    <div className="sleft"><div><Icon type="sketch" /></div></div>
                    <div className="sright"><div className="gm">{item.songName}</div><div className="gs">{
                        item.singer.map(singer => {
                            return <span key={singer.singerMid}>{singer.singerName}</span>
                        })
                    }</div></div>
                </div>
            )
        })

        var hosList = this.state.hotList.map((item, idx) => {
            return (
                <li key={idx} onClick={() => this.changeIpt(item)}>
                    <div className={idx === 0 ? 'hotWordr' : 'hotWords'}>{item}</div></li>
            )
        })
        return (
            <div className="search">
                <div className="searchIpt">
                    <div className="input">
                        <Input
                            value={this.state.ipt}
                            className="ipt"
                            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="搜索歌曲、歌单、专辑"
                            onFocus={() => { this.hid() }}
                            onBlur={() => this.cancel()}
                            onChange={(e) => this.change(e)}
                            onKeyPress={this.handleEnterKey}
                        />

                    </div>
                    <div className="cancel" onTouchEnd={() => { this.cancel1() }}>取消</div>
                </div>

                {
                    this.state.isshow ? (
                        <div className="hots">
                            <h3 className="ss">热门搜索</h3>
                            <div>
                                <ul>
                                    {hosList}
                                </ul>
                            </div>
                        </div>)
                        :
                        (<div>
                            {el}
                        </div>)
                }



            </div >
        )
    }
}
export default search
