import React from 'react';
import classnames from 'classnames';
import css from './index.less';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    changeTime(e) {
        let progress = (Math.floor(e.changedTouches[0].clientX - this.refs.progress.offsetLeft) / this.refs.progress.offsetWidth) * 100 + '%';
        this.props.changeProgress(progress);
    }

    render() {
        return(
            <div className={css.outer}>
                <div className={css.progressBar}>
                    <span className={css.currentTime}>{this.props.currentShowTime}</span>
                    <div onTouchEnd={this.changeTime.bind(this)} className={css.progressOuter}>
                        <div className={css.progress} ref="progress">  {/* 使用onTouchEnd无法获取e.clientx */}
                            <div className={css.now} style={{width: `${this.props.progress}`}}/>
                        </div>
                    </div>
                    <span className={css.duration}>{this.props.durationShowTime}</span>
                </div>

            </div>
        );
    }
}