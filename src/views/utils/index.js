let width = 1920
export const useFontSize = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / width);
    return res * fontSize;
}
export const fontSize = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}

export const TOOLTIP_STYLE = {
    backgroundColor: 'rgba(0, 24, 62, 0.6)',
    borderWidth: 0,
    extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
    textStyle: {
        color: '#fff',
        fontSize: fontSize(0.14),
    },
    axisPointer: {
        type: 'shadow'
    }
};

export const GRID = {
    left: '60',
    right: '60',
    bottom: '80',
    top: '62',
}
export const ceilNumber = (number) => {
    return Math.ceil(number / 100) * 100
}
export const intervalFnc = (_data, _val = 4) => {
    if (_data && _data.length > 0) {
        return parseInt(ceilNumber((Math.max(..._data))) / 4)
    }
}
export const maxFnc = (_data) => {
    return ceilNumber((Math.max(..._data)))
}
export const myFixed = (num, digit) => {
    if (Object.is(parseFloat(num), NaN)) {
        return console.log(`传入的值：${num}不是一个数字`);
    }
    num = parseFloat(num);
    return (Math.round((num + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
}
export const percent =  (_val, _num)=> {
    let  _return = '';
    if (!_val) {
        _return = 0;
    } else {
        if (+_val === 1) {
            _return = 100;
        } else {
            _return = myFixed(_val * 100, 1)
        }
    }
    if (!_num) {
        _return += '%'
    }
    return _return;
}


export const _cnDic = { 5: '万', 6: '万', 7: '万', 8: '万', 9: '万', 10: '亿', 11: '亿', 12: '亿', 13: '亿', 14: '亿', };
export const _divisor = { 5: 10000, 6: 10000, 7: 10000, 8: 10000, 9: 10000, 10: 100000000, 11: 100000000, 12: 100000000, 13: 100000000, 14: 100000000, };
export const fontChart=(res)=> {
    //获取到屏幕的宽度
    const clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return; // 报错拦截：
    let fontSize = 10 * (clientWidth / 1920);
    return res * fontSize;
}
