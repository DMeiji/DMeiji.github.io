(function ($) {
    'use strict';

    h5.u.obj.expose('division_build_support.const', {
        ARMOR: {
            STATUS: {
                MIN: 205,
                MAX: 1272
            },
            MOD_STATUS: {
                MIN: 220,
                MAX: 263
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
                }
            },
            MOD_LEN_MAP: {
                body: {
                    proto: 0,
                    perf: 0
                },
                mask: {
                    proto: 0,
                    perf: 0
                },
                knee: {
                    proto: 0,
                    perf: 0
                },
                backpack: {
                    proto: 0,
                    perf: 0
                },
                glove: {
                    proto: 0,
                    perf: 0
                },
                holster: {
                    proto: 0,
                    perf: 0
                }
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
            TALENT_NAME_MAP: {
                property: 'タレント',
                accurate: 'アキュレート',
                adept: 'アデプト',
                anforgiving: 'アンフォーギビング',
                ambusher: 'アンブッシャー',
                intense: 'インテンス',
                expert: 'エキスパート',
                elevated: 'エレベーテッド',
                coolhead: 'クールヘッド',
                capable: 'ケーパブル',
                commanding: 'コマンディング',
                competent: 'コンピテント',
                sustained: 'サステインド',
                swift: 'スウィフト',
                skilled: 'スキルド',
                selfpreserved: 'セルフプリザーブド',
                talented: 'タレンテッド',
                discipline: 'ディシプリン',
                destructive: 'ディストラクティブ',
                dermination: 'ディターミネーション',
                deadly: 'デッドリー',
                toxic: 'トキシック',
                trained: 'トレインド',
                dominant: 'ドミナント',
                haled: 'ハリード',
                hamfull: 'ハームフル',
                balance: 'バランス',
                fierce: 'フィアース',
                fellowchase: 'フェローシャス',
                focus: 'フォーカス',
                brutal: 'ブルータル',
                prepared: 'プリペアード',
                predatory: 'プレダトリー',
                proficient: 'プロフィシェント',
                meticulus: 'メティキュラス',
                responsive: 'レスポンシブ',
                vicious: 'ヴィシャス',
            },
            TYPE_NAME_MAP: {
                type: '武器種',
                smg: 'サブマシンガン',
                sg: 'ショットガン',
                lmg: 'ライトマシンガン',
                ar: 'アサルトライフル',
                mmr: 'マークスマンライフル'
            }
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