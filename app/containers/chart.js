
/**
 *  控件所在的宽高： 
 *             parentWith,
 *             parentHeight
 *  
 * 
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    ART,
} from 'react-native';
var {Surface, Group, Shape, Path} = ART;



export default class chart extends Component {

    componentDidMount(){
        // this.props.width;
    }

    render() {
       var chartTop=this.props.chartTop;
        const path = new Path()
            .moveTo(1, chartTop)
            .lineTo(1, 80)
            .lineTo(30, 80)
            .lineTo(30,chartTop)
            .close();

        // const pathX = ART.Path();
        // pathX.moveTo(1, 200);
        // pathX.lineTo(400, 200);

        // const pathY = ART.Path();
        // pathY.moveTo(1, 1);
        // pathY.lineTo(1, 200);

        // const path1 = ART.Path();
        // path.moveTo(1, 1); //将起始点移动到(1,1) 默认(0,0)
        // path.lineTo(300, 1); //连线到目标点(300,1)
        return (
            <View>
                <Surface width={80} height={80}>
                   <Shape d={path} stroke="#3CB371" fill="#3CB371" strokeWidth={0} />
                </Surface>
            </View>
        );
    }
}


//   <ART.Shape d={pathX} stroke="#000000" strokeWidth={1} />
//                      <ART.Shape d={pathY} stroke="#000000" strokeWidth={1} />
//                      <ART.Text strokeWidth={1} stroke="#000" font="13px" path={new Path().moveTo(0, 0).lineTo(10, 10)} >Swipe</ART.Text>
                