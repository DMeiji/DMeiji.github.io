(function ($) {
    'use strict';

    h5.u.obj.expose('division_build_support.const', {
        ARMOR: {
            STATUS: {
                MIN: 205,
                MAX: 1272
            },
            TOKUSEI_LEN_MAP: {
                body: {
                    mainLen: 2,
                    subLen: 1
                },
                mask: {
                    mainLen: 1,
                    subLen: 2
                },
                knee: {
                    mainLen: 1,
                    subLen: 4
                },
                backpack: {
                    mainLen: 1,
                    subLen: 1
                },
                glove: {
                    mainLen: 3,
                    subLen: 0
                },
                holster: {
                    mainLen: 1,
                    subLen: 0
                },
            },
            TOKUSEI_PROPERTY_MAP: {
                ch: 'クリティカル率',
                cd: 'クリティカルダメージ',
                smgdmg: 'SMGダメージ',
                ardmg: 'ARダメージ',
                sgdmg: 'SGダメージ',
                lmgdmg: 'LMGダメージ',
                pistoldmg: 'Pistolダメージ',
                mmrdmg: 'MMRダメージ',
                armordmg: '敵アーマーダメージ',
                resall: '全ての耐性',
                life: 'HP',
                killlife: 'キル時HP回復',
                exdmgheal: '特殊ダメージ回復',
                sh: 'スキルヘイスト',
                sp: 'スキルパワー',
                stability: '武器安定性',
                reload: 'リロードスピード',

                vselite: '対エリートダメージ',
                resshock: 'ショック耐性',
                resfire: '炎上耐性',
                resconfu: '混乱耐性',
                resaudiovis: '視聴覚ダメージ耐性',
                resjack: '電波妨害耐性',
                resbleed: '出血耐性',
                killxp: 'キルXP増加',
                ammo: '弾薬数'
            }
        },
        WEAPON: {

        },
        SET: {
            NAME_MAP: {
                d3fnc: 'D3-FNC',
                banshee: 'バンシー',
                firecrest: 'ファイアークレスト',
                reclaimer: 'リクレーマー',
                deadeye: 'デッドアイ',
                alphabridge: 'アルファブリッジ',
                hunters: 'ハンターズクリード',
                final: 'ファイナルメジャー',
                predator: 'プレデターマーク',
                lonestar: 'ローンスター',
                striker: 'ストライカー',
                sentry: 'セントリーコール',
                tactisian: 'タクティシャン',
                nomad: 'ノーマッド'
            }
        }
    })
})(jQuery);