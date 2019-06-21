import React, { Component } from 'react'
import './topList.css'
import API from "../../common/API"
import '../../common/css/iconfont.css'
class topList extends Component {
    constructor(props) {
        super();
        this.state = {
            songList: [],
            listenCount: 0
        }
        this.v = 0
    }

    componentDidMount() {
        this.$http({
            url: API.toplist
        }).then(d => {
            this.setState({
                songList: d.data.data
            })
        })
    }


    /**
         * 数字转整数 如 100000 转为10万
         * @param {需要转化的数} num 
         * @param {需要保留的小数位数} point 
         */
    tranNumber(num, point) {
        let numStr = num.toString()
        // 十万以内直接返回 
        if (numStr.length < 6) {
            return numStr;
        }
        //大于8位数是亿
        else if (numStr.length > 8) {
            let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
            return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
        }
        //大于6位数是十万 (以10W分割 10W以下全部显示)
        else if (numStr.length > 5) {
            let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
            return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
        }
    }

    tosongs(e, id) {
        if (this.v === 0) {
            this.props.history.push('/topSongs/' + id)
        } else {
            console.log('滑动了')
        }
        this.v = 0;

    }

    smove() {
        this.v++
    }

    render() {
        var el = this.state.songList.map(item => {
            return (
                <div className="mod_topic" key={item.id} onTouchMove={() => this.smove()} onTouchEnd={(e) => this.tosongs(e, item.id)}>
                    <div className="left">
                        <img src={item.picUrl} alt="" />
                        <div className="count"><span className="iconfont icon-headset"></span>&nbsp;{this.tranNumber(item.listenCount, 2)}</div>
                    </div>
                    <div className="right">
                        <h3>{item.title}</h3>
                        {
                            item.songList.map((songs, index) => {
                                return (
                                    <p className="sl" key={index}>{index + 1}.&nbsp;<span>{songs.songName}</span>&nbsp;&nbsp;{songs.singerName}</p>
                                )
                            })
                        }
                    </div>
                </div >
            )
        })


        return (
            <div className="topList">
                {el}

                {/* <div className="mod_topic">
                    <div className="left">
                        <img src="https://y.gtimg.cn/music/photo_new/T003R300x300M000002oimNk21RP7V.jpg?max_age=2592000" alt="" />
                        <div className="count">100万</div>
                    </div>
                    <div className="right">
                        <h3>巅峰榜</h3>
                        <p>2222</p>
                        <p>2222</p>
                        <p>2222</p>
                    </div>
                </div > */}
            </div>
        )
    }

}
export default topList
