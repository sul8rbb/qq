import React, { Component } from 'react'
import './main.css'
import { Tabs } from 'antd';
import Router from "../../routes"
import MainRoute from "../../routes/MainRoute"
class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            a: '1'
        }
    }
    componentWillMount() {
        var url = window.location.href;
        var arr = url.split('/');
        switch (arr[arr.length - 1]) {
            case 'recommend':
                this.setState({ a: '1' }); break;
            case 'toplist':
                this.setState({ a: '2' }); break;
            case 'search':
                this.setState({ a: '3' }); break;
            default:
                this.setState({ a: '1' });
        }
    }
    callback(e) {
        switch (e) {
            case '1': this.props.history.push('/main/recommend'); break;
            case '2': this.props.history.push('/main/toplist'); break;
            case '3': this.props.history.push('/main/search'); break;
            default: this.props.history.push('/main/recommend')
        }
    }
    render() {

        const { TabPane } = Tabs;


        return (
            <div className="con">
                <div className="mains1">
                    <div className="logo">
                        <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
                        <div className="down">下载APP</div>
                    </div>
                </div>
                <div className='navs'>
                    <Tabs className="nav" defaultActiveKey={this.state.a} tabBarGutter={57} onChange={(e) => { this.callback(e) }}>
                        <TabPane tab="推荐" key="1"></TabPane>
                        <TabPane tab="排行榜" key="2"></TabPane>
                        <TabPane tab="搜索" key="3"></TabPane>
                    </Tabs>
                </div>
                <div>
                    <Router routes={MainRoute} />
                </div>
            </div>
        )
    }
}
export default Main
