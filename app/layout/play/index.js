import React from 'react';
import css from './index.less';
import resources from '../../resources/musicResources';

import SwiperInfo from './swiper/index';

export default class Play extends React.Component {
    constructor() {
        super();
        this.state = {
            play: false,
            duration: '',
            currentShowTime: '0:0',
        }
    }

    // 初始化获取音乐的时长
    init() {
        setTimeout(() => {
            let minute = Math.floor(this.refs.music.duration / 60);
            let seconds = Math.round(this.refs.music.duration % 60);
            this.setState({
                duration: `${minute}:${seconds}`
            });
        },100);
    }

    //切换音乐播放状态
    playMusic() {
        let timer;
        if(this.refs.music.paused){
            this.refs.music.play();
            timer = setInterval(() => {
                this.getCurrentState();
            },500);
       }else{
            this.refs.music.pause();
            clearInterval(timer);
        }

        // this.refs.music.paused ? this.refs.music.play() : this.refs.music.pause();
        this.setState({play: !this.state.play});
    }

    getCurrentState() {
        let minute = Math.floor(this.refs.music.currentTime / 60);
        let seconds = Math.round(this.refs.music.currentTime % 60);
        this.setState({
            currentShowTime:`${minute}:${seconds}`
        });
        this.refs.now.style.width = Math.round(this.refs.music.currentTime) / Math.round(this.refs.music.duration.toFixed(3)) * 100 + '%';
    }

    componentDidMount() {
        this.init();

    }



    render() {

        return (
            <div className={css.outer}>
                <audio src={resources[0]} ref="music"      />
                {/*{music}*/}
                <div className={css.show}>
                    <SwiperInfo/>
                </div>
                <div className={css.controls}>
                    {/* 进度条 */}
                    <div className={css.progressBar}>
                        <span className={css.currentTime}>{this.state.currentShowTime}</span>
                        <div className={css.progress} >
                            <div className={css.now} ref="now"/>
                        </div>
                        <span className={css.duration}>{this.state.duration}</span>
                    </div>
                    {/* 音乐信息 */}
                    <div className={css.musicInfo}></div>
                    {/* 控制键 */}
                    <div className={css.control}>
                        <div className={css.prevMusic}>上一首</div>   {/* 上一首 */}
                        <div className={css.playPause} onTouchStart={this.playMusic.bind(this)}>播放/暂停</div>  {/* 播放/暂停 */}
                        <div className={css.nextMusic}>下一首</div>       {/* 下一首 */}
                    </div>
                </div>
            </div>
        );
    }
}