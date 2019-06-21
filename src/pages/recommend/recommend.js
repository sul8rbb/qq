import React, { Component } from 'react'
import './recommend.css'
import { Carousel } from 'antd';
import API from "../../common/API"
class recommend extends Component {
    constructor() {
        super();
        this.state = {
            slider: [],
            radioList: []
        }
    }
    componentWillMount() {
        this.$http({
            url: API.recommend
        }).then(d => {
            //轮播图  
            var swiper = d.data.data.slider.map(item => {
                return (
                    <div key={item} >
                        <img src={item} alt="" />
                    </div>)
            })
            //电台
            var radios = d.data.data.radioList.map(item => {
                return (
                    <div className="imgs" key={item.id}>
                        <img src={item.picUrl} alt="" id={item.id} />
                        <span>{item.title}</span>
                    </div>
                )
            })
            this.setState({
                slider: swiper,
                radioList: radios
            })
        })
    }
    render() {
        return (
            <div className="App">
                <div className="swiper">
                    <Carousel autoplay>
                        {this.state.slider}
                    </Carousel>
                </div>
                <div className="dtai">电台</div>
                <div className="hots">
                    {this.state.radioList}
                </div>
                <div className="fontStyle">
                    <p className="ck">查看电脑版网页</p>
                    <p><img className="flogo" src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" /></p>
                    <p className="cy">Copyright © 1998 - 2019 Tencent. </p>
                    <p className="cy">All Rights Reserved. </p>
                    <p className="cy">联系电话：0755-86013388 QQ群：55209235</p>
                    <p></p>
                </div>
            </div>
        )
    }
}
export default recommend
