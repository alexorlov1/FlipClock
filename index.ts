import './scss/flipclock.scss';

import EventEmitter from './src/EventEmitter';
// import { Face } from './src/Face';
import FaceValue from './src/FaceValue';
import FlipClock from './src/FlipClock';
import Timer from './src/Timer';
import VNode from './src/VNode';
import Card from './src/themes/flipclock/Card';
import CardItem from './src/themes/flipclock/CardItem';
import Divider from './src/themes/flipclock/Divider';
import Group from './src/themes/flipclock/Group';
import Label from './src/themes/flipclock/Label';

export * from './src/faces';
export * from './src/types';
export {
    Card,
    CardItem,
    Divider,
    EventEmitter,
    // Face,
    FaceValue,
    FlipClock,
    Group,
    Label,
    Timer,
    VNode
};

