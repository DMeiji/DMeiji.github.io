(function ($) {
    'use strict';

    h5.u.obj.expose('ds3tool.data.equip', {
        helm: [
            { name: 'アイアンヘルム', kyoujin: '2.5', weight: '3.7' }, { name: '山賊の頭巾', kyoujin: '1.4', weight: '2.7' }, { name: 'ルカティエルのマスク', kyoujin: '1.6', weight: '3.3' }, { name: 'チェインヘルム', kyoujin: '1.9', weight: '3.9' }, { name: '北の兜', kyoujin: '4.0', weight: '4.8' }, { name: 'クレイトンの鉄仮面', kyoujin: '6.0', weight: '5.9' }, { name: '鉄の兜', kyoujin: '6.0', weight: '6.0' }, { name: '傭兵の兜', kyoujin: '3.5', weight: '3.1' }, { name: '幽鬼の兜', kyoujin: '3.0', weight: '3.7' }, { name: 'シラの頭冠', kyoujin: '0.2', weight: '1.0' }, { name: '不死隊の兜', kyoujin: '2.3', weight: '4.0' }, { name: '伝令の兜', kyoujin: '3.4', weight: '3.7' }, { name: '騎士の兜', kyoujin: '4.4', weight: '5.2' }, { name: '無名騎士の兜', kyoujin: '2.3', weight: '3.8' }, { name: '逃亡騎士の兜', kyoujin: '3.5', weight: '4.6' }, { name: '上級騎士の兜', kyoujin: '4.0', weight: '5.3' }, { name: 'アルバの兜', kyoujin: '3.7', weight: '4.2' }, { name: '竜血の兜', kyoujin: '5.0', weight: '6.3' }, { name: 'ファーナムの兜', kyoujin: '6.1', weight: '6.6' }, { name: '黄昏の兜', kyoujin: '3.4', weight: '5.0' }, { name: '薄暮のヴェール', kyoujin: '0.7', weight: '1.8' }, { name: '真鍮の兜', kyoujin: '3.1', weight: '4.7' }, { name: '奴隷騎士の頭巾', kyoujin: '3.0', weight: '3.8' }, { name: 'ヴィルヘルムの兜', kyoujin: '4.3', weight: '4.8' }, { name: '寵愛の兜', kyoujin: '5.4', weight: '5.9' }, { name: '東国の兜', kyoujin: '3.3', weight: '3.9' }, { name: 'トゲの兜', kyoujin: '2.2', weight: '3.8' }, { name: 'カタリナヘルム', kyoujin: '7.4', weight: '7.7' }, { name: 'モーンの兜', kyoujin: '6.9', weight: '8.1' }, { name: 'ラップの兜', kyoujin: '7.3', weight: '6.5' }, { name: 'ロスリック騎士の兜', kyoujin: '5.7', weight: '6.0' }, { name: '聖堂騎士の兜', kyoujin: '6.6', weight: '7.6' }, { name: '羽の騎士の兜', kyoujin: '6.0', weight: '7.4' }, { name: 'ミルウッド騎士の兜', kyoujin: '6.0', weight: '7.1' }, { name: '虚ろの兜', kyoujin: '6.1', weight: '5.4' }, { name: '外征騎士の兜', kyoujin: '2.8', weight: '3.8' }, { name: '法王の騎士の冠', kyoujin: '2.0', weight: '2.7' }, { name: '火の魔女の兜', kyoujin: '3.0', weight: '3.9' }, { name: '踊り子の頭冠', kyoujin: '1.5', weight: '2.8' }, { name: '闇の仮面', kyoujin: '2.7', weight: '4.0' }, { name: '黒騎士の兜', kyoujin: '3.9', weight: '5.6' }, { name: '銀騎士の兜', kyoujin: '6.2', weight: '6.1' }, { name: '輪の騎士のフード', kyoujin: '0.2', weight: '1.4' }, { name: '竜狩りの兜', kyoujin: '4.8', weight: '5.8' }, { name: '狼騎士の兜', kyoujin: '2.9', weight: '4.2' }, { name: 'スモウの兜', kyoujin: '9.9', weight: '11.8' }, { name: '熔鉄の竜狩り兜', kyoujin: '7.0', weight: '6.3' }, { name: 'ローリアンの兜', kyoujin: '3.9', weight: '5.6' }, { name: '黄金の王冠', kyoujin: '2.2', weight: '3.5' }, { name: '火継ぎの兜', kyoujin: '4.1', weight: '4.1' }, { name: '黒鉄の兜', kyoujin: '6.7', weight: '6.8' }, { name: '処刑人の兜', kyoujin: '6.6', weight: '7.2' }, { name: '流刑人の仮面', kyoujin: '7.6', weight: '7.5' }, { name: 'グンダの兜', kyoujin: '7.2', weight: '7.6' }, { name: 'ハベルの兜', kyoujin: '10.2', weight: '10.8' }, { name: '刺客の頭巾', kyoujin: '1.0', weight: '1.8' }, { name: '黒い手の帽子', kyoujin: '1.1', weight: '2.5' }, { name: '盗人のマスク', kyoujin: '0.6', weight: '2.1' }, { name: '影の覆面', kyoujin: '0.4', weight: '1.5' }, { name: '銀仮面', kyoujin: '1.9', weight: '3.3' }, { name: '微笑の仮面', kyoujin: '0.5', weight: '2.1' }, { name: '嘴の仮面', kyoujin: '2.2', weight: '3.7' }, { name: '絵画使者の頭巾', kyoujin: '0.6', weight: '1.4' }, { name: '魔術師の頭巾', kyoujin: '0.1', weight: '1.4' }, { name: '古い魔術師の帽子', kyoujin: '0.6', weight: '1.2' }, { name: '宮廷魔術師のフード', kyoujin: '0.1', weight: '1.5' }, { name: 'カルラのとんがり帽子', kyoujin: '0.4', weight: '1.7' }, { name: '黒魔女の帽子', kyoujin: '0.2', weight: '1.8' }, { name: '黒魔女のベール', kyoujin: '0.0', weight: '1.4' }, { name: '宵闇の頭冠', kyoujin: '0.0', weight: '1.0' }, { name: '黄衣の頭冠', kyoujin: '1.3', weight: '3.0' }, { name: '古老の大帽子', kyoujin: '0.4', weight: '1.9' }, { name: '呪術師の頭冠', kyoujin: '0.0', weight: '1.1' }, { name: '老師の目隠し', kyoujin: '0.0', weight: '1.0' }, { name: '呪い師のフード', kyoujin: '0.6', weight: '1.8' }, { name: '砂の呪術師のフード', kyoujin: '0.3', weight: '1.2' }, { name: '聖職者の帽子', kyoujin: '0.5', weight: '1.4' }, { name: '聖女のフード', kyoujin: '0.0', weight: '1.4' }, { name: '修道女のフード', kyoujin: '0.4', weight: '1.9' }, { name: '教導師の帽子', kyoujin: '2.1', weight: '3.5' }, { name: '大主教の白冠', kyoujin: '1.6', weight: '1.8' }, { name: '貴人の仮面', kyoujin: '6.1', weight: '5.9' }, { name: '祈祷のフード', kyoujin: '0.2', weight: '1.3' }, { name: 'ボロ布のマスク', kyoujin: '0.4', weight: '0.7' }, { name: '作業帽子', kyoujin: '1.1', weight: '2.3' }, { name: '墓守のフード', kyoujin: '0.5', weight: '1.5' }, { name: '兵士の鉄兜', kyoujin: '3.2', weight: '4.6' }, { name: '奴隷の頭巾', kyoujin: '0.8', weight: '1.5' }, { name: 'ファリスの帽子', kyoujin: '1.4', weight: '2.3' }, { name: 'ウォルニールの王冠', kyoujin: '1.8', weight: '3.4' }, { name: '目隠しの仮面', kyoujin: '0.0', weight: '1.1' }, { name: '貪欲者の烙印', kyoujin: '8.9', weight: '11.0' }, { name: '説教者の白面', kyoujin: '2.6', weight: '3.5' }
        ],
        body: [
            { name: 'ハードレザーアーマー', kyoujin: '6.8', weight: '8.3' }, { name: '山賊の鎧', kyoujin: '2.9', weight: '4.8' }, { name: 'ミラのベスト', kyoujin: '4.2', weight: '7.0' }, { name: 'チェインアーマー', kyoujin: '6.8', weight: '8.8' }, { name: '北の鎧', kyoujin: '10.7', weight: '10.8' }, { name: 'ミラのチェインメイル', kyoujin: '11.3', weight: '10.6' }, { name: '太陽印の鎧', kyoujin: '11.3', weight: '8.6' }, { name: '傭兵の鎧', kyoujin: '11.5', weight: '10.8' }, { name: 'ドランの鎧', kyoujin: '0.8', weight: '5.1' }, { name: '幽鬼の鎧', kyoujin: '2.7', weight: '5.6' }, { name: 'シラの鎧', kyoujin: '3.7', weight: '6.7' }, { name: '不死隊の鎧', kyoujin: '4.9', weight: '7.6' }, { name: '伝令の鎧', kyoujin: '9.5', weight: '8.6' }, { name: '騎士の鎧', kyoujin: '12.4', weight: '10.8' }, { name: '無名騎士の鎧', kyoujin: '8.7', weight: '9.3' }, { name: '逃亡騎士の鎧', kyoujin: '8.7', weight: '9.2' }, { name: '上級騎士の鎧', kyoujin: '8.8', weight: '8.9' }, { name: 'アルバの鎧', kyoujin: '11.0', weight: '9.0' }, { name: '竜血の鎧', kyoujin: '14.6', weight: '14.4' }, { name: 'ファーナムの鎧', kyoujin: '15.5', weight: '13.1' }, { name: '黄昏の鎧', kyoujin: '14.7', weight: '13.8' }, { name: '薄暮の鎧', kyoujin: '8.5', weight: '9.2' }, { name: '真鍮の鎧', kyoujin: '9.9', weight: '10.7' }, { name: '奴隷騎士の鎧', kyoujin: '9.1', weight: '8.7' }, { name: 'ヴィルヘルムの鎧', kyoujin: '12.8', weight: '11.0' }, { name: '寵愛の抱かれ鎧', kyoujin: '16.5', weight: '13.2' }, { name: '東国の鎧', kyoujin: '12.4', weight: '11.0' }, { name: 'トゲの鎧', kyoujin: '7.5', weight: '8.5' }, { name: 'カタリナアーマー', kyoujin: '20.6', weight: '17.9' }, { name: 'モーンの鎧', kyoujin: '18.2', weight: '16.3' }, { name: 'ラップの鎧', kyoujin: '20.7', weight: '15.6' }, { name: 'ロスリック騎士の鎧', kyoujin: '18.4', weight: '15.7' }, { name: '聖堂騎士の鎧', kyoujin: '20.4', weight: '17.8' }, { name: '羽の騎士の鎧', kyoujin: '21.8', weight: '19.0' }, { name: 'ミルウッド騎士の鎧', kyoujin: '17.7', weight: '16.4' }, { name: 'ハーラルドの鎧', kyoujin: '20.7', weight: '17.2' }, { name: '虚ろの鎧', kyoujin: '17.4', weight: '12.9' }, { name: '外征騎士の鎧', kyoujin: '12.3', weight: '12.3' }, { name: '法王の騎士の鎧', kyoujin: '6.0', weight: '7.3' }, { name: '火の魔女の鎧', kyoujin: '9.8', weight: '11.1' }, { name: '踊り子の鎧', kyoujin: '6.7', weight: '7.3' }, { name: '闇の鎧', kyoujin: '8.8', weight: '9.1' }, { name: '黒騎士の鎧', kyoujin: '14.0', weight: '13.9' }, { name: '銀騎士の鎧', kyoujin: '18.2', weight: '15.0' }, { name: '輪の騎士の鎧', kyoujin: '14.9', weight: '12.6' }, { name: '竜狩りの鎧', kyoujin: '17.3', weight: '14.4' }, { name: '狼騎士の鎧', kyoujin: '8.0', weight: '9.0' }, { name: 'スモウの鎧', kyoujin: '27.1', weight: '23.0' }, { name: '熔鉄の竜狩り鎧', kyoujin: '20.1', weight: '14.8' }, { name: 'ローリアンの鎧', kyoujin: '15.5', weight: '15.3' }, { name: '竜鱗の鎧', kyoujin: '16.1', weight: '12.7' }, { name: '火継ぎの鎧', kyoujin: '8.9', weight: '8.6' }, { name: '黒鉄の鎧', kyoujin: '18.7', weight: '16.6' }, { name: '処刑人の鎧', kyoujin: '19.2', weight: '16.8' }, { name: '流刑人の鎧', kyoujin: '19.9', weight: '18.1' }, { name: 'グンダの鎧', kyoujin: '21.5', weight: '18.0' }, { name: 'ハベルの鎧', kyoujin: '27.4', weight: '21.6' }, { name: '刺客の鎧', kyoujin: '4.8', weight: '6.9' }, { name: '黒い手の鎧', kyoujin: '4.9', weight: '7.8' }, { name: '黒革の鎧', kyoujin: '5.2', weight: '5.9' }, { name: '影の上衣', kyoujin: '2.2', weight: '3.7' }, { name: 'レオナールの上衣', kyoujin: '6.0', weight: '6.9' }, { name: '白い影のローブ', kyoujin: '2.0', weight: '3.6' }, { name: '黒のドレス', kyoujin: '2.2', weight: '6.5' }, { name: '絵画使者の長衣', kyoujin: '0.5', weight: '3.5' }, { name: '古めかしい平服', kyoujin: '0.9', weight: '3.1' }, { name: '魔術師のローブ', kyoujin: '1.7', weight: '4.1' }, { name: '隠密のコート', kyoujin: '0.9', weight: '3.0' }, { name: '古い魔術師のコート', kyoujin: '1.0', weight: '3.7' }, { name: '宮廷魔術師のローブ', kyoujin: '1.6', weight: '4.2' }, { name: 'カルラのコート', kyoujin: '1.3', weight: '3.6' }, { name: '黒魔女の上衣', kyoujin: '0.5', weight: '3.6' }, { name: '古めかしいドレス', kyoujin: '1.2', weight: '3.1' }, { name: '黄衣の外套', kyoujin: '7.7', weight: '8.6' }, { name: '賢者のローブ', kyoujin: '3.6', weight: '4.2' }, { name: '呪術師の上衣', kyoujin: '0.9', weight: '4.2' }, { name: 'コルニクスの上衣', kyoujin: '4.9', weight: '4.1' }, { name: '呪い師のローブ', kyoujin: '1.1', weight: '4.2' }, { name: '砂の呪術師の上衣', kyoujin: '0.9', weight: '2.3' }, { name: '聖職者の青衣', kyoujin: '1.4', weight: '6.0' }, { name: '聖女の上衣', kyoujin: '0.7', weight: '3.5' }, { name: '修道女のドレス', kyoujin: '2.7', weight: '4.4' }, { name: '教導師のローブ', kyoujin: '12.5', weight: '12.2' }, { name: '主教のローブ', kyoujin: '1.0', weight: '3.5' }, { name: '大主教の聖衣', kyoujin: '3.4', weight: '4.2' }, { name: '獄吏のローブ', kyoujin: '2.0', weight: '4.8' }, { name: '祈祷のローブ', kyoujin: '1.3', weight: '3.4' }, { name: '火防女のローブ', kyoujin: '1.9', weight: '5.1' }, { name: '達人の服', kyoujin: '0.0', weight: '2.0' }, { name: '作業着', kyoujin: '2.3', weight: '4.2' }, { name: '墓守のローブ', kyoujin: '1.0', weight: '3.6' }, { name: '逃亡兵の鎧', kyoujin: '8.6', weight: '8.6' }, { name: 'レザーアーマー', kyoujin: '3.3', weight: '5.4' }
        ],
        hand: [
            { name: 'ハードレザーガントレット', kyoujin: '0.8', weight: '2.0' }, { name: '山賊の篭手', kyoujin: '1.0', weight: '2.4' }, { name: 'ミラのグローブ', kyoujin: '0.2', weight: '2.1' }, { name: 'レザーガントレット', kyoujin: '1.1', weight: '2.5' }, { name: '北のグローブ', kyoujin: '0.7', weight: '2.3' }, { name: 'ミラのチェイングローブ', kyoujin: '2.5', weight: '3.3' }, { name: '鉄の腕輪', kyoujin: '2.2', weight: '2.9' }, { name: '傭兵の手甲', kyoujin: '0.3', weight: '1.4' }, { name: 'ドランの篭手', kyoujin: '0.3', weight: '1.7' }, { name: '幽鬼の手袋', kyoujin: '0.6', weight: '1.7' }, { name: 'シラのグローブ', kyoujin: '0.7', weight: '2.1' }, { name: '不死隊の手甲', kyoujin: '0.8', weight: '2.4' }, { name: '伝令のグローブ', kyoujin: '1.6', weight: '2.9' }, { name: '騎士の手甲', kyoujin: '2.5', weight: '3.6' }, { name: '無名騎士の手甲', kyoujin: '2.2', weight: '2.8' }, { name: '逃亡騎士の手甲', kyoujin: '2.1', weight: '3.1' }, { name: '上級騎士の手甲', kyoujin: '2.3', weight: '3.4' }, { name: 'アルバの手甲', kyoujin: '2.5', weight: '3.3' }, { name: '竜血の手甲', kyoujin: '3.4', weight: '4.8' }, { name: 'ファーナムの手甲', kyoujin: '4.0', weight: '4.8' }, { name: '黄昏の手甲', kyoujin: '3.5', weight: '4.5' }, { name: '薄暮の手甲', kyoujin: '1.7', weight: '3.6' }, { name: '真鍮の手甲', kyoujin: '2.4', weight: '3.5' }, { name: '奴隷騎士の手甲', kyoujin: '2.0', weight: '3.0' }, { name: 'ヴィルヘルムの手甲', kyoujin: '2.9', weight: '3.8' }, { name: '寵愛の手甲', kyoujin: '3.9', weight: '4.1' }, { name: '東国の手甲', kyoujin: '2.6', weight: '2.9' }, { name: 'トゲの手甲', kyoujin: '1.8', weight: '2.8' }, { name: 'カタリナガントレット', kyoujin: '4.5', weight: '6.0' }, { name: 'モーンの手甲', kyoujin: '3.6', weight: '5.0' }, { name: 'ラップの手甲', kyoujin: '4.9', weight: '5.1' }, { name: 'ロスリック騎士の手甲', kyoujin: '4.1', weight: '5.0' }, { name: '聖堂騎士の手甲', kyoujin: '4.7', weight: '5.5' }, { name: '羽の騎士の手甲', kyoujin: '4.9', weight: '6.3' }, { name: 'ミルウッド騎士の手甲', kyoujin: '4.1', weight: '5.5' }, { name: 'ハーラルドの手甲', kyoujin: '0.5', weight: '1.9' }, { name: '虚ろの手甲', kyoujin: '4.1', weight: '4.2' }, { name: '外征騎士の手甲', kyoujin: '2.7', weight: '2.9' }, { name: '法王の騎士の手甲', kyoujin: '0.7', weight: '2.2' }, { name: '火の魔女の手甲', kyoujin: '1.5', weight: '2.6' }, { name: '踊り子の手甲', kyoujin: '1.7', weight: '2.4' }, { name: '闇の手甲', kyoujin: '2.3', weight: '3.2' }, { name: '黒騎士の手甲', kyoujin: '3.3', weight: '4.0' }, { name: '銀騎士の手甲', kyoujin: '3.3', weight: '4.7' }, { name: '輪の騎士の手甲', kyoujin: '3.2', weight: '4.4' }, { name: '竜狩りの手甲', kyoujin: '3.7', weight: '4.2' }, { name: '狼騎士の手甲', kyoujin: '1.6', weight: '3.1' }, { name: 'スモウの手甲', kyoujin: '6.9', weight: '9.4' }, { name: '熔鉄の竜狩り手甲', kyoujin: '4.8', weight: '5.1' }, { name: 'ローリアンの手甲', kyoujin: '1.8', weight: '3.0' }, { name: '黄金の腕輪', kyoujin: '0.2', weight: '1.5' }, { name: '火継ぎの手甲', kyoujin: '1.4', weight: '2.7' }, { name: '黒鉄の手甲', kyoujin: '3.8', weight: '5.3' }, { name: '処刑人の手甲', kyoujin: '4.3', weight: '5.6' }, { name: '流刑人の手甲', kyoujin: '4.3', weight: '5.8' }, { name: 'グンダの手甲', kyoujin: '5.2', weight: '6.1' }, { name: 'ハベルの手甲', kyoujin: '7.2', weight: '9.1' }, { name: '刺客のグローブ', kyoujin: '0.4', weight: '2.0' }, { name: '黒革の手袋', kyoujin: '1.7', weight: '2.3' }, { name: '影の手甲', kyoujin: '1.1', weight: '1.3' }, { name: 'レオナールの手甲', kyoujin: '1.9', weight: '2.8' }, { name: '白い影のグローブ', kyoujin: '0.2', weight: '1.0' }, { name: '黒の手甲', kyoujin: '2.3', weight: '3.5' }, { name: '絵画使者の長手袋', kyoujin: '0.2', weight: '1.3' }, { name: '紫の布帯', kyoujin: '0.1', weight: '0.9' }, { name: '魔術師の手袋', kyoujin: '0.6', weight: '1.3' }, { name: '古い魔術師のガントレット', kyoujin: '0.0', weight: '1.3' }, { name: '宮廷魔術師の手袋', kyoujin: '0.5', weight: '1.0' }, { name: 'カルラのグローブ', kyoujin: '0.3', weight: '1.2' }, { name: '黒魔女の腕帯', kyoujin: '0.1', weight: '1.2' }, { name: '古めかしいロンググローブ', kyoujin: '0.6', weight: '1.1' }, { name: '黄衣のグローブ', kyoujin: '0.8', weight: '2.0' }, { name: '呪術師の腕帯', kyoujin: '0.8', weight: '1.5' }, { name: 'コルニクスの腕帯', kyoujin: '0.8', weight: '1.3' }, { name: '呪い師のマンシェット', kyoujin: '0.1', weight: '1.4' }, { name: '砂の呪術師の手袋', kyoujin: '0.3', weight: '1.1' }, { name: '聖職者のグローブ', kyoujin: '0.5', weight: '1.5' }, { name: '聖女の手袋', kyoujin: '0.3', weight: '1.3' }, { name: '教導師の手袋', kyoujin: '0.7', weight: '2.4' }, { name: '獄吏の手袋', kyoujin: '0.3', weight: '1.6' }, { name: '火防女の腕帯', kyoujin: '0.2', weight: '1.3' }, { name: '達人の腕帯', kyoujin: '0.0', weight: '0.3' }, { name: '作業手袋', kyoujin: '0.8', weight: '1.4' }, { name: '墓守の腕帯', kyoujin: '0.0', weight: '1.2' }, { name: 'レザーグローブ', kyoujin: '0.1', weight: '1.5' }
        ],
        leg: [
            { name: 'ハードレザーブーツ', kyoujin: '2.9', weight: '4.7' }, { name: '山賊のズボン', kyoujin: '3.1', weight: '5.0' }, { name: 'ミラのズボン', kyoujin: '1.2', weight: '3.5' }, { name: 'チェインレギンス', kyoujin: '4.9', weight: '5.1' }, { name: '北のズボン', kyoujin: '3.1', weight: '4.3' }, { name: 'ミラのチェインレギンス', kyoujin: '5.8', weight: '5.9' }, { name: '鉄の足甲', kyoujin: '6.4', weight: '5.0' }, { name: '傭兵のズボン', kyoujin: '3.4', weight: '3.6' }, { name: 'ドランの靴', kyoujin: '1.3', weight: '4.2' }, { name: '幽鬼のブーツ', kyoujin: '1.6', weight: '3.3' }, { name: 'シラのズボン', kyoujin: '1.5', weight: '3.8' }, { name: '不死隊の足甲', kyoujin: '2.6', weight: '4.6' }, { name: '伝令のズボン', kyoujin: '5.1', weight: '5.3' }, { name: '騎士の足甲', kyoujin: '7.4', weight: '6.7' }, { name: '無名騎士の足甲', kyoujin: '5.9', weight: '5.6' }, { name: '逃亡騎士のズボン', kyoujin: '4.9', weight: '5.3' }, { name: '上級騎士の足甲', kyoujin: '7.0', weight: '6.9' }, { name: 'アルバの足甲', kyoujin: '6.7', weight: '5.5' }, { name: '竜血の足甲', kyoujin: '8.6', weight: '8.6' }, { name: 'ファーナムのブーツ', kyoujin: '8.0', weight: '6.8' }, { name: '黄昏の足甲', kyoujin: '5.8', weight: '7.2' }, { name: '薄暮の足甲', kyoujin: '4.7', weight: '5.7' }, { name: '真鍮の足甲', kyoujin: '6.3', weight: '6.8' }, { name: '奴隷騎士の足甲', kyoujin: '5.5', weight: '5.4' }, { name: 'ヴィルヘルムの足甲', kyoujin: '7.8', weight: '6.9' }, { name: '寵愛の足甲', kyoujin: '9.9', weight: '7.7' }, { name: '東国の足甲', kyoujin: '4.3', weight: '5.0' }, { name: 'トゲの足甲', kyoujin: '4.2', weight: '5.4' }, { name: 'カタリナレギンス', kyoujin: '12.8', weight: '11.1' }, { name: 'モーンの足甲', kyoujin: '11.1', weight: '9.7' }, { name: 'ラップの足甲', kyoujin: '12.9', weight: '9.7' }, { name: 'ロスリック騎士の足甲', kyoujin: '10.9', weight: '9.3' }, { name: '聖堂騎士の足甲', kyoujin: '11.6', weight: '10.2' }, { name: '羽の騎士の足甲', kyoujin: '12.0', weight: '11.0' }, { name: 'ミルウッド騎士の足甲', kyoujin: '10.9', weight: '10.2' }, { name: 'ハーラルドの足甲', kyoujin: '12.9', weight: '10.8' }, { name: '虚ろの足甲', kyoujin: '10.7', weight: '8.0' }, { name: '外征騎士の足甲', kyoujin: '7.2', weight: '6.9' }, { name: '法王の騎士の足甲', kyoujin: '2.8', weight: '4.3' }, { name: '火の魔女の足甲', kyoujin: '5.3', weight: '5.5' }, { name: '踊り子の足甲', kyoujin: '3.6', weight: '4.4' }, { name: '闇の足甲', kyoujin: '6.4', weight: '6.1' }, { name: '黒騎士の足甲', kyoujin: '8.2', weight: '8.5' }, { name: '銀騎士の足甲', kyoujin: '9.8', weight: '9.1' }, { name: '輪の騎士の足甲', kyoujin: '9.2', weight: '8.1' }, { name: '竜狩りの足甲', kyoujin: '9.1', weight: '8.4' }, { name: '狼騎士の足甲', kyoujin: '4.6', weight: '5.1' }, { name: 'スモウの足甲', kyoujin: '17.3', weight: '15.8' }, { name: '熔鉄の竜狩り足甲', kyoujin: '12.5', weight: '9.5' }, { name: 'ローリアンの足甲', kyoujin: '6.3', weight: '7.0' }, { name: '竜鱗の腰巻き', kyoujin: '7.4', weight: '6.3' }, { name: '火継ぎの足甲', kyoujin: '3.5', weight: '4.8' }, { name: '黒鉄の足甲', kyoujin: '11.8', weight: '9.9' }, { name: '処刑人の足甲', kyoujin: '11.8', weight: '10.4' }, { name: '流刑人の足甲', kyoujin: '12.7', weight: '10.9' }, { name: 'グンダの足甲', kyoujin: '12.3', weight: '10.3' }, { name: 'ハベルの足甲', kyoujin: '17.6', weight: '15.4' }, { name: '刺客のズボン', kyoujin: '2.1', weight: '4.3' }, { name: '黒革のブーツ', kyoujin: '2.3', weight: '3.6' }, { name: '影の足甲', kyoujin: '2.1', weight: '2.3' }, { name: 'レオナールのズボン', kyoujin: '2.3', weight: '3.6' }, { name: '白い影のズボン', kyoujin: '1.0', weight: '2.2' }, { name: '黒の足甲', kyoujin: '2.8', weight: '4.5' }, { name: '絵画使者の腰巻き', kyoujin: '4.2', weight: '4.4' }, { name: '魔術師のズボン', kyoujin: '1.3', weight: '3.2' }, { name: '古い魔術師のブーツ', kyoujin: '1.1', weight: '2.3' }, { name: '宮廷魔術師のズボン', kyoujin: '1.1', weight: '2.2' }, { name: 'カルラのズボン', kyoujin: '1.1', weight: '2.6' }, { name: '黒魔女のズボン', kyoujin: '0.5', weight: '2.6' }, { name: '古めかしいスカート', kyoujin: '0.4', weight: '2.1' }, { name: '黄衣のズボン', kyoujin: '1.5', weight: '3.9' }, { name: '呪術師のズボン', kyoujin: '1.2', weight: '2.6' }, { name: 'コルニクスのスカート', kyoujin: '1.4', weight: '2.0' }, { name: '呪い師のブーツ', kyoujin: '1.0', weight: '2.6' }, { name: '砂の呪術師のスカート', kyoujin: '1.2', weight: '2.4' }, { name: '聖職者のズボン', kyoujin: '0.7', weight: '2.1' }, { name: '聖女のスカート', kyoujin: '0.1', weight: '2.3' }, { name: '修道女のズボン', kyoujin: '1.6', weight: '2.8' }, { name: '教導師のズボン', kyoujin: '3.6', weight: '4.6' }, { name: '主教のスカート', kyoujin: '1.1', weight: '2.3' }, { name: '大主教のスカート', kyoujin: '2.7', weight: '2.6' }, { name: '獄吏のズボン', kyoujin: '1.0', weight: '2.8' }, { name: '祈祷のスカート', kyoujin: '0.0', weight: '2.0' }, { name: '火防女のスカート', kyoujin: '0.5', weight: '2.1' }, { name: '恥部隠し', kyoujin: '0.4', weight: '1.1' }, { name: '作業ズボン', kyoujin: '1.6', weight: '2.9' }, { name: '墓守のスカート', kyoujin: '0.3', weight: '2.2' }, { name: '逃亡兵のズボン', kyoujin: '2.1', weight: '3.1' }, { name: 'ふんどし', kyoujin: '0.6', weight: '2.0' }, { name: 'レザーブーツ', kyoujin: '2.8', weight: '3.3' }
        ],
        // 武器ジャンル
        genre: [
            { kanaName: '短剣', name: 'daggers' },
            { kanaName: '直剣', name: 'straightSwords' },
            { kanaName: '大剣', name: 'greatSwords' },
            { kanaName: '特大剣', name: 'ultraGreatswords' },
            { kanaName: '曲剣', name: 'curvedSwords' },
            { kanaName: '大曲剣', name: 'curvedGreatswords' },
            { kanaName: '刺剣', name: 'thrustingSwords' },
            { kanaName: '刀', name: 'katanas' },
            { kanaName: '斧', name: 'axes' },
            { kanaName: '大斧', name: 'greataxes' },
            { kanaName: '槌', name: 'hammers' },
            { kanaName: '大槌', name: 'greatHammers' },
            { kanaName: '槍', name: 'spears' },
            { kanaName: '長槍', name: 'longSpears' },
            { kanaName: '斧槍', name: 'halberds' },
            { kanaName: '鎌', name: 'scythe' },
            { kanaName: 'ムチ', name: 'whips' },
            { kanaName: '拳', name: 'fists' },
            { kanaName: '爪', name: 'crow' },
            { kanaName: '弓', name: 'bows' },
            { kanaName: '大弓', name: 'greatbows' },
            { kanaName: 'クロスボウ', name: 'crossbows' },
            { kanaName: '杖', name: 'catalysts' },
            { kanaName: 'タリスマン', name: 'talismans' },
            { kanaName: '呪術の火', name: 'pyromancyFlames' },
            { kanaName: '聖鈴', name: 'holyBells' },
            { kanaName: '小盾', name: 'smallShields' },
            { kanaName: '中盾', name: 'middleShields' },
            { kanaName: '大盾', name: 'bigShields' }
        ],
        // 短剣
        daggers: [
            { name: '', weight: '0' }, { name: 'ダガー', weight: '1.5' }, { name: 'パリングダガー', weight: '1.0' }, { name: '鎧貫き', weight: '1.5' }, { name: 'ハルパー', weight: '1.5' }, { name: '盗人の短刀', weight: '1.5' }, { name: 'グルーの腐れ短刀', weight: '2.0' }, { name: '鴉人の大短刀', weight: '2.5' }, { name: '湿った手鎌', weight: '2.0' }, { name: '侍女の短剣', weight: '0.5' }, { name: '賢者の燭台', weight: '1.5' }, { name: '藍玉の短剣', weight: '1.5' }, { name: '尾骨の短剣', weight: '2.0' }, { name: '山賊の双短刀', weight: '2.5' }
        ],
        // 直剣
        straightSwords: [
            { name: '', weight: '0' }, { name: 'ショートソード', weight: '2.0' }, { name: 'ロングソード', weight: '3.0' }, { name: 'ブロードソード', weight: '3.0' }, { name: '折れた直剣', weight: '1.0' }, { name: 'アストラの直剣', weight: '3.0' }, { name: 'ロスリック騎士の剣', weight: '4.0' }, { name: 'トゲの直剣', weight: '3.0' }, { name: 'ダークソード', weight: '4.5' }, { name: '聖者の燭台', weight: '2.0' }, { name: 'イルシールの直剣', weight: '4.0' }, { name: 'アンリの直剣', weight: '3.0' }, { name: '太陽の直剣', weight: '3.0' }, { name: 'モーリオンブレード', weight: '4.0' }, { name: '輪の騎士の直剣', weight: '4.5' }, { name: 'ロスリックの聖剣', weight: '4.0' }, { name: 'ゴットヒルトの双剣', weight: '6.5' }, { name: 'ヴァローハート', weight: '5.5' }
        ],
        // 大剣
        greatSwords: [
            { name: '', weight: '0' }, { name: 'バスタードソード', weight: '8.0' }, { name: 'クレイモア', weight: '9.0' }, { name: 'フランベルジェ', weight: '8.5' }, { name: '竜血の大剣', weight: '6.0' }, { name: '処刑人の大剣', weight: '9.0' }, { name: '黒騎士の剣', weight: '10.0' }, { name: 'オーニクスブレード', weight: '9.0' }, { name: '亡者狩りの大剣', weight: '8.5' }, { name: 'ウォルニールの聖剣', weight: '7.5' }, { name: '裁きの大剣', weight: '9.0' }, { name: 'ストームルーラー', weight: '8.0' }, { name: '狼騎士の大剣', weight: '11.5' }, { name: '月光の大剣', weight: '10.5' }, { name: '火継ぎの大剣', weight: '9.0' }, { name: '双王子の大剣', weight: '9.5' }, { name: 'ゲールの大剣', weight: '9.0' }
        ],
        // 特大剣
        ultraGreatswords: [
            { name: '', weight: '0' }, { name: 'ツヴァイヘンダー', weight: '10.0' }, { name: 'グレートソード', weight: '20.0' }, { name: 'アストラの大剣', weight: '8.0' }, { name: 'ロスリック騎士の大剣', weight: '16.5' }, { name: '聖堂騎士の大剣', weight: '15.0' }, { name: '黒騎士の大剣', weight: '16.0' }, { name: '煙の特大剣', weight: '25.5' }, { name: '罪の大剣', weight: '13.5' }, { name: 'ローリアンの大剣', weight: '14.0' }, { name: '輪の騎士の双大剣', weight: '22.5' }, { name: 'ファランの大剣', weight: '12.5' }
        ],
        // 曲剣
        curvedSwords: [
            { name: '', weight: '0' }, { name: 'シミター', weight: '2.5' }, { name: 'ファルシオン', weight: '4.0' }, { name: 'ショーテル', weight: '2.5' }, { name: 'カーサスの曲刀', weight: '5.5' }, { name: 'カーサスの鉤刀', weight: '3.0' }, { name: 'グルーの腐れ曲刀', weight: '2.0' }, { name: '絵画使者の曲剣', weight: '1.5' }, { name: '幽鬼のサーベル', weight: '4.0' }, { name: '法王騎士の曲剣', weight: '3.5' }, { name: '欠け月の曲剣', weight: '2.5' }, { name: '嵐の曲剣', weight: '5.0' }, { name: 'デーモンの爪痕', weight: '0.5' }, { name: '傭兵の双刀', weight: '5.5' }, { name: '墓守の双刀', weight: '6.5' }, { name: '踊り子の双魔剣', weight: '8.5' }
        ],
        // 大曲剣
        curvedGreatswords: [
            { name: '', weight: '0' }, { name: 'ムラクモ', weight: '11.0' }, { name: 'カーサスの大曲刀', weight: '10.5' }, { name: '流刑人の大刀', weight: '17.0' }, { name: 'ハーラルドの大曲剣', weight: '14.0' }, { name: '老狼の曲剣', weight: '13.0' }
        ],
        // 刺剣
        thrustingSwords: [
            { name: '', weight: '0' }, { name: 'レイピア', weight: '2.0' }, { name: 'エストック', weight: '3.5' }, { name: 'リカールの刺剣', weight: '2.5' }, { name: 'イルシールの刺剣', weight: '3.0' }, { name: '結晶古老の刺剣', weight: '2.5' }, { name: '鴉羽', weight: '4.0' }
        ],
        // 刀
        katanas: [
            { name: '', weight: '0' }, { name: '打刀', weight: '5.5' }, { name: '物干し竿', weight: '8.5' }, { name: '黒刀', weight: '6.5' }, { name: '血狂い', weight: '5.0' }, { name: '混沌の刃', weight: '6.0' }, { name: '闇朧', weight: '3.5' }, { name: '綻び刀', weight: '8.0' }, { name: '鬼切と姥断', weight: '8.5' }
        ],
        // 斧
        axes: [
            { name: '', weight: '0' }, { name: 'ハンドアクス', weight: '2.5' }, { name: '奴隷の手斧', weight: '1.5' }, { name: 'バトルアクス', weight: '4.0' }, { name: '山賊の斧', weight: '3.0' }, { name: '竜断の斧', weight: '4.0' }, { name: 'ミルウッドの戦斧', weight: '6.5' }, { name: '蛇人の鉈', weight: '4.0' }, { name: '肉断ち包丁', weight: '7.0' }, { name: 'エレオノーラ', weight: '6.5' }, { name: '羽の騎士の断頭斧', weight: '8.5' }
        ],
        // 大斧
        greataxes: [
            { name: '', weight: '0' }, { name: 'グレートアクス', weight: '16.0' }, { name: '大鉈', weight: '14.0' }, { name: '黒騎士の大斧', weight: '19.5' }, { name: 'デーモンの大斧', weight: '14.5' }, { name: '竜狩りの大斧', weight: '20.0' }, { name: 'ヨームの大鉈', weight: '19.0' }, { name: 'アースシーカー', weight: '17.0' }
        ],
        // 槌
        hammers: [
            { name: '', weight: '0' }, { name: 'クラブ', weight: '2.5' }, { name: '強化クラブ', weight: '4.0' }, { name: 'メイス', weight: '5.0' }, { name: 'モーニングスター', weight: '5.0' }, { name: 'ウォーピック', weight: '4.5' }, { name: '鍛冶屋の金槌', weight: '5.0' }, { name: 'ヘイゼルのつるはし', weight: '4.5' }, { name: 'ドランの双槌', weight: '9.0' }
        ],
        // 大槌
        greatHammers: [
            { name: '', weight: '0' }, { name: 'ラージクラブ', weight: '10.0' }, { name: 'グレートクラブ', weight: '12.0' }, { name: 'グレートメイス', weight: '18.0' }, { name: 'スパイクメイス', weight: '16.0' }, { name: 'つるはし', weight: '8.0' }, { name: '大木槌', weight: '6.0' }, { name: 'ガーゴイルの灯火槌', weight: '11.0' }, { name: 'モーンの大槌', weight: '24.0' }, { name: 'スモウの大槌', weight: '24.0' }, { name: '地鳴りの岩石槌', weight: '15.0' }, { name: 'レドの大槌', weight: '28.0' }, { name: 'ボルドの大槌', weight: '17.0' }, { name: '老王の大槌', weight: '18.5' }, { name: '大竜牙', weight: '21.0' }
        ],
        // 槍
        spears: [
            { name: '', weight: '0' }, { name: 'スピア', weight: '4.5' }, { name: 'ウィングドスピア', weight: '6.0' }, { name: 'パルチザン', weight: '6.5' }, { name: 'グルーの腐れ槍', weight: '5.5' }, { name: '四又鋤', weight: '6.5' }, { name: '聖者の二股槍', weight: '8.5' }, { name: '幽鬼のジャベリン', weight: '4.0' }, { name: 'ガーゴイルの灯火槍', weight: '9.5' }, { name: '焼きごて', weight: '5.0' }, { name: 'ヨルシカの槍', weight: '6.5' }, { name: '竜狩りの槍', weight: '9.5' }, { name: '金枝の杖槍', weight: '3.0' }, { name: '尾骨の槍', weight: '4.5' }, { name: 'アルスターの槍', weight: '6.5' }, { name: '竜狩りの剣槍', weight: '14.5' }, { name: 'ドランの双槍', weight: '8.0' }
        ],
        // 長槍
        longSpears: [
            { name: '', weight: '0' }, { name: 'パイク', weight: '7.5' }, { name: 'グレートランス', weight: '10.5' }, { name: 'ロスリック騎士の長槍', weight: '8.0' }, { name: 'ロスリックの戦旗', weight: '5.0' }, { name: '輪の騎士の槍', weight: '9.0' }
        ],
        // 斧槍
        halberds: [
            { name: '', weight: '0' }, { name: 'ハルバード', weight: '8.0' }, { name: '赤柄のハルバード', weight: '8.0' }, { name: 'ルッツエルン', weight: '7.5' }, { name: 'グレイブ', weight: '11.0' }, { name: '三日月斧', weight: '6.0' }, { name: '羽の騎士の斧槍', weight: '14.0' }, { name: '半葉の大刀', weight: '13.5' }, { name: '黒騎士のグレイブ', weight: '9.0' }, { name: '狂王の磔', weight: '12.0' }, { name: '火刑の芒', weight: '10.0' }, { name: 'グンダの斧槍', weight: '13.0' }
        ],
        // 鎌
        scythe: [
            { name: '', weight: '0' }, { name: '大鎌', weight: '7.0' }, { name: '鴉人の大鎌', weight: '9.0' }, { name: '法王騎士の大鎌', weight: '7.5' }, { name: 'フリーデの大鎌', weight: '13.0' }
        ],
        // 鞭
        whips: [
            { name: '', weight: '0' }, { name: 'ウィップ', weight: '2.0' }, { name: 'イバラムチ', weight: '2.0' }, { name: 'まだらムチ', weight: '2.5' }, { name: '魔女の黒髪', weight: '3.0' }, { name: 'アリアンデルの薔薇', weight: '3.5' }
        ],
        // 拳
        fists: [
            { name: '', weight: '0' }, { name: 'セスタス', weight: '0.5' }, { name: 'デーモンナックル', weight: '5.5' }, { name: 'ダークハンド', weight: '0' }
        ],
        // 爪
        crow: [
            { name: '', weight: '0' }, { name: 'かぎ爪', weight: '1.5' }, { name: '傀儡の鉤爪', weight: '1.5' }, { name: '鴉爪', weight: '3.0' }
        ],
        // 弓
        bows: [
            { name: '', weight: '0' }, { name: 'ショートボウ', weight: '2.0' }, { name: 'コンポジットボウ', weight: '3.5' }, { name: 'ロングボウ', weight: '4.0' }, { name: 'ファリスの弓', weight: '3.0' }, { name: '白木の弓', weight: '2.5' }, { name: '竜騎兵の弓', weight: '6.5' }, { name: '暗月の長弓', weight: '4.5' }
        ],
        // 大弓
        greatbows: [
            { name: '', weight: '0' }, { name: '竜狩りの大弓', weight: '10.0' }, { name: '鬼討ちの大弓', weight: '7.5' }, { name: 'ミルウッドの大弓', weight: '9.0' }
        ],
        // クロスボウ
        crossbows: [
            { name: '', weight: '0' }, { name: 'ライトクロスボウ', weight: '3.0' }, { name: 'ヘビークロスボウ', weight: '4.5' }, { name: 'スナイパークロス', weight: '7.5' }, { name: 'アーバレスト', weight: '6.0' }, { name: '騎士のクロスボウ', weight: '4.0' }, { name: 'アヴェリン', weight: '7.5' }, { name: '連射クロスボウ', weight: '7.5' }
        ],
        // 杖
        catalysts: [
            { name: '', weight: '0' }, { name: '魔術師の杖', weight: '2.0' }, { name: '異端の杖', weight: '3.0' }, { name: '宮廷魔術師の杖', weight: '2.0' }, { name: '妖木の枝', weight: '2.0' }, { name: '語り部の杖', weight: '2.5' }, { name: '托鉢の杖', weight: '2.5' }, { name: '湿った長杖', weight: '3.0' }, { name: 'イザリスの杖', weight: '3.0' }, { name: '大主教の大杖', weight: '2.5' }, { name: '蛆人の杖', weight: '3.0' }, { name: '説教者の右腕', weight: '2.0' }, { name: '古老の結晶杖', weight: '2.5' }
        ],
        // タリスマン
        talismans: [
            { name: '', weight: '0' }, { name: 'タリスマン(触媒)', weight: '0.5' }, { name: '粗布のタリスマン', weight: '0.5' }, { name: '聖女のタリスマン', weight: '0.5' }, { name: '太陽のタリスマン', weight: '0.5' }, { name: '薄暮のタリスマン', weight: '0.5' }, { name: '白髪のタリスマン', weight: '0.5' }
        ],
        // 呪術の火
        pyromancyFlames: [
            { name: '', weight: '0' }, { name: '呪術の火(触媒)', weight: '0' }, { name: '呪術の送り火', weight: '0' }
        ],
        // 聖鈴
        holyBells: [
            { name: '', weight: '0' }, { name: '聖職の聖鈴', weight: '0.5' }, { name: '祭司の聖鈴', weight: '0.5' }, { name: '聖木の鈴草', weight: '0.5' }, { name: 'ヨルシカの聖鈴', weight: '0.5' }, { name: 'クァトの鈴', weight: '0.5' }, { name: '結晶の聖鈴', weight: '0.5' }, { name: 'フィリアノールの聖鈴', weight: '0.5' }
        ],
        // 小盾
        smallShields: [
            { name: '', weight: '0' }, { name: 'バックラー', weight: '1.5' }, { name: 'ターゲットシールド', weight: '2.0' }, { name: 'スモールレザーシールド', weight: '2.0' }, { name: 'レザーシールド', weight: '1.5' }, { name: '紅の円盾', weight: '1.5' }, { name: '紅白の円盾', weight: '1.5' }, { name: '双蛇の円盾', weight: '1.5' }, { name: '鹿角の円盾', weight: '1.5' }, { name: '戦士の円盾', weight: '1.5' }, { name: '木板の盾', weight: '1.0' }, { name: 'グルーの腐れ盾', weight: '1.5' }, { name: '鉄の円盾', weight: '2.0' }, { name: 'ホークウッドの盾', weight: '2.0' }, { name: 'リンドの盾', weight: '3.0' }, { name: '東の鉄盾', weight: '3.0' }, { name: '金鷹の小盾', weight: '2.5' }, { name: '聖花の盾', weight: '1.5' }, { name: '竜首の盾', weight: '4.5' }
        ],
        // 中盾
        middleShields: [
            { name: '', weight: '0' }, { name: 'ラージレザーシールド', weight: '3.5' }, { name: 'カーサスの盾', weight: '2.5' }, { name: '双鳥の木盾', weight: '2.0' }, { name: '青の木盾', weight: '2.5' }, { name: 'ラウンドシールド', weight: '3.5' }, { name: 'ウッドシールド', weight: '2.5' }, { name: '戦神の木盾', weight: '4.0' }, { name: '幽鬼の盾', weight: '3.5' }, { name: 'カイトシールド', weight: '4.5' }, { name: '銀鷲のカイトシールド', weight: '5.0' }, { name: '騎士の盾', weight: '4.5' }, { name: 'ロスリック騎士の盾', weight: '6.0' }, { name: '蜘蛛の盾', weight: '3.5' }, { name: '黄昏の盾', weight: '5.0' }, { name: '太陽の盾', weight: '5.5' }, { name: '石の円盾', weight: '7.0' }, { name: 'トゲの盾', weight: '3.5' }, { name: 'ピアスシールド', weight: '3.5' }, { name: '隷獣の盾', weight: '4.5' }, { name: '草紋の盾', weight: '4.5' }, { name: '紋章の盾', weight: '5.0' }, { name: '竜紋章の盾', weight: '5.0' }, { name: '聖樹紋章の盾', weight: '5.0' }, { name: '金翼紋章の盾', weight: '5.5' }, { name: '法王騎士の盾', weight: '3.5' }, { name: '黒騎士の盾', weight: '7.5' }, { name: '銀騎士の盾', weight: '6.5' }, { name: '霊樹の盾', weight: '5.0' }, { name: '渇望の盾', weight: '5.5' }
        ],
        // 大盾
        bigShields: [
            { name: '', weight: '0' }, { name: '双竜の大盾', weight: '7.0' }, { name: '黒鉄の大盾', weight: '14.5' }, { name: 'ロスリック騎士の大盾', weight: '15.0' }, { name: '聖堂騎士の大盾', weight: '15.5' }, { name: '石の大盾', weight: '18.0' }, { name: '骸骨車輪の盾', weight: '15.0' }, { name: '古竜画の大盾', weight: '6.5' }, { name: '栄誉の大盾', weight: '18.5' }, { name: '呻きの盾', weight: '21.5' }, { name: '狼騎士の大盾', weight: '11.0' }, { name: 'ハベルの大盾', weight: '28.0' }, { name: '抗呪の大盾', weight: '17.0' }, { name: '竜狩りの大盾', weight: '26.0' }, { name: 'ヨームの大盾', weight: '20.5' }, { name: '竜首の大盾', weight: '18.0' }, { name: '大扉の盾', weight: '21.5' }
        ]
    });

})(jQuery);