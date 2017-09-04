```javascript
var dataItem = {
    partName: String
    talentList: Array<armorTalent>,
    talentDesc: String,
    firearms: Number,
    stamina: Number,
    electron: Number,
    // 特性は部位によってサブの有無が変わるので、第1～3という表現にする
    firstTokuseiList: Array<tokusei>,
    secondTokuseiList: Array<tokusei>,
    thirdTokuseiList: Array<tokusei>,
    
    selectedTokuseiList: selectedTokuseiList,
}

var armorTalent = {
    name: String,
    desc: String,
    setName: ?String,
    isNinja: Boolean
}

var tokusei = {
    name: String,// depend指定で値をセットさせる
    property: String,
    min: String // %表記の値もある
    max: String // 〃
}

// 選択した特性情報
var selectedTokuseiList = {
    firstTokusei: {
        property: String,// property名。chやcdなど
        val: Number,// propertyの最大値。property毎に最後に加算するのでnumber
    },
    secondTokusei: {
        property: String,// property名。chやcdなど
        val: Number,// propertyの最大値。property毎に最後に加算するのでnumber
    },
    thirdTokusei: {
        property: String,// property名。chやcdなど
        val: Number,// propertyの最大値。property毎に最後に加算するのでnumber
    }
}


```