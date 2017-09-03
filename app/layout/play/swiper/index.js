import React from 'react';
import classnames from 'classnames';
import Swiper from '../../../libs/swiper-3.4.2.min';
import '../../../libs/swiper-3.4.2.min.css';
import css from './index.less';

export default class SwiperInfo extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let mySwiper = new Swiper('.swiper-container',{
            // autoplay: 3000,
            // effect: 'flip',
            pagination : '.swiper-pagination',
        })
    }

    render() {
        return(
            <div className={css.outer}>
                <div className={css.container + ' swiper-container'}>
                    <div className={css.wrapper + ' swiper-wrapper'}>
                        <div className={css.slide + ' swiper-slide'}>slide 1</div>
                        <div className={css.slide + ' swiper-slide'}>slide 2</div>
                        <div className={css.slide + ' swiper-slide'}>slide 3</div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
}