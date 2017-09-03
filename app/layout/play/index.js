import React from 'react';
import css from './index.less';
import resources from '../../resources/musicResources';

import SwiperInfo from './swiper/index';
import Progress from './progress/index';

export default class Play extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlay: false,
            duration: '',
            durationShowTime: '',
            currentShowTime: '0:0',
            progress: '',
        }
        this.changeProgress = this.changeProgress.bind(this);
    }

    // 初始化获取音乐的时长
    init() {
        setTimeout(() => {
            let minute = Math.floor(this.refs.music.duration / 60);
            let seconds = Math.round(this.refs.music.duration % 60);
            this.setState({
                duration: Math.round(this.refs.music.duration),
                durationShowTime: `${minute}:${seconds}`
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
            },100);
       }else{
            this.refs.music.pause();
            clearInterval(timer);
        }
        // this.refs.music.paused ? this.refs.music.play() : this.refs.music.pause();
        this.setState({isPlay: !this.state.isPlay});
    }

    getCurrentState() {
        let minute = Math.floor(this.refs.music.currentTime / 60);
        let seconds = Math.round(this.refs.music.currentTime % 60);
        this.setState({
            currentShowTime:`${minute}:${seconds}`,
            progress: (Math.round(this.refs.music.currentTime) / Math.round(this.refs.music.duration.toFixed(3)) * 10000 ) / 100 + '%'
        });
    }

    changeProgress(progress){
        this.setState({
            progress:progress
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {

/*        const lrc = (
            [00:00.00]
        [00:04.00]九九八十一
            [00:08.00]作曲：乌龟
            [00:12.00]作词：邪叫教主
            [00:16.00]字体 文案：St
            [00:20.00]吉他：康师傅の海鲜麵
            [00:24.00]打击乐：司鼓君
            [00:28.00]笛子：O天气晴朗O
            [00:32.00]琵琶：东北馅饺子
            [00:36.00]调教：纳兰寻风
            [00:40.00]混音：小新 Xin-Kun
            [00:44.00]人设：酥妃
            [00:48.00]曲绘：骸鸦 酥妃 INxico
            [00:52.00]PV：墨兰花语
            [00:56.00]唱：乐正绫
            [00:59.50]


        [01:00.36]上路 巩州遇虎熊
            [01:02.54]五百年前一场疯 腾宵又是孙悟空
            [01:06.66]失马 鹰愁涧飞白龙
            [01:09.04]沙河阻断路难通 福陵山中收天蓬
            [01:12.81]
        [01:13.22]岭上 前行逆黄风
            [01:15.38]七星不照波月洞 千年白骨化阴风
            [01:19.65]鱼篮 网通天一尾红
            [01:21.89]紫金葫芦二道童 九尾老狐敢压龙
            [01:25.49]
        [01:26.29]白虹坠 雪浪击石碎
            [01:28.87]思归 难归 堕回 轮回
            [01:30.95]月满一江水 前世莫追
            [01:34.08]
        [01:34.95]福泽聚宝象 春风度不让洛阳
            [01:38.00]玉面狐折兰香 七绝崖上暗伏赤色大蟒
            [01:41.86]过西梁 女儿国鸳鸯罗帐
            [01:44.39]与三道斗法相 火云扬 明枪易挡暗箭难防
            [01:47.61]
        [01:48.36]十方魔 渴饮着我的脆弱
            [01:51.00]凭你计法相迫 逐个击破要你识我本色
            [01:54.75]万里恶 摧垮了我的沉默
            [01:57.44]一肩担路坎坷 我不说 又何须旁人来嚼口舌
            [02:02.81]
        [02:03.27]借扇 翠云访罗刹
            [02:05.64]碧波潭内结亲宴 招来九头的驸马
            [02:09.61]雾隐 金斑豹伸利爪
            [02:11.99]城北黄狮盗钉耙 白毛小鼠偷烛花
            [02:15.47]
        [02:16.13]思乡 未敢听琵琶
            [02:18.06]摄魂曲后三股叉 一朝命断美人画
            [02:22.34]六耳 幻形难辨真假
            [02:24.56]太岁摇铃唤风沙 玉兔抛绣高台搭
            [02:28.64]
        [02:28.99]红霓垂 九重紫云飞
            [02:31.65]久归 未归 欲回 恨回
            [02:34.14]凡胎恰登对 天命难违
            [02:37.29]
        [02:37.56]
        [02:37.87]比丘走白鹿 十三娘情丝缠缚
            [02:40.68]乌袍君生百目 庙前拦路自称黄眉老祖
            [02:44.69]将云拂 孤直公对谈诗赋
            [02:47.10]还未能抵天竺 金平府 钺斩红尘斧辟寒暑
            [02:50.92]
        [02:51.21]众笔者 嘲笑着我的贪得
            [02:53.57]藏美酒有甚者 谁却敢说自己放肆醉过
            [02:57.48]休怪我 这半生痴情煞多
            [03:00.11]活一遭风流客 慕娇娥 但愿抱拥世间真绝色
            [03:04.98]
        [03:10.68]
        [03:31.09]浮世千寻沫 冲荡了我的轮廓
            [03:33.95]纵身入尘埃里 雷雨大作我也放声而歌
            [03:37.98]方寸中 方寸却不能定夺
            [03:40.30]七十二般胆魄 这次我决意不闪躲
            [03:43.32]
        [03:43.90]世尊如来佛 诘问着我的执着
            [03:47.04]当年我瑶池刻 闹得痛快并未想过太多
            [03:50.64]状罪责 拿捏了我的业果
            [03:53.39]可顽心不服错 不思过 齐天大圣地上行者
            [03:56.70]
        [03:57.13]那传说 忘却了我的寂寞
            [03:59.94]英雄名不堪得 何必较我混沌徒费口沫
            [04:03.14]这人间 毕竟我真正走过
            [04:06.37]一途平九百波 九千错 凌云渡成正果但我
            [04:10.22]有九九八十一种不舍
            [04:11.71]
        )*/
        let play = this.state.isPlay ? 'play' : 'pause';

        return (
            <div className={css.outer}>
                <audio src={resources[0]} ref="music"      />
                {/*{music}*/}
                <div className={css.show}>
                    <SwiperInfo/>
                </div>
                <div className={css.controls}>
                    {/* 进度条 */}
                    <Progress {...this.state} changeProgress={this.changeProgress}/>
                    {/* 音乐信息 */}
                    <div className={css.musicInfo}></div>
                    {/* 控制键 */}
                    <div className={css.control}>
                        <div className={css.prevMusic}>&lt;</div>   {/* 上一首 */}
                        <div className={css.playPause} onTouchStart={this.playMusic.bind(this)}>{play}</div>  {/* 播放/暂停 */}
                        <div className={css.nextMusic}>&gt;</div>       {/* 下一首 */}
                    </div>
                </div>
            </div>
        );
    }
}