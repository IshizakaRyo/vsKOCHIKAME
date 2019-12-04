Vue.prototype.$whatAction = '行動を選んでください'
Vue.prototype.$myActions = ['攻撃した！', 'ぶったたいた！', '寺井を褒めた','HPが10回復した','肉弾戦を挑んだ！', 'ジョディを呼んだ', 'HPが30回復した', '体力を50削った！'] //自分のアクション
Vue.prototype.$enemyActions = ['攻撃してきた！', '蹴りを入れてきた！', '照れている！'] //寺井のアクション
Vue.prototype.$navi = ['行動を選んでください','しかし何も起こらない！！','ボコボコにされた！！', 'ボルボはのぼせて動けなかった', 'ボルボ：..ぐわっ！']
Vue.prototype.$span = 2000

// 相手のコンポーネント
const enemyComponent = {
    props: {
        name: String,
        hitPoint: Number,
        img: String,
        status: Object
    },
    template: `<div class="enemyBox">
                <div class="container">
                    <div class="enemyStatus">
                        <img :src="img"  style="width: 230px;">
                        <p>{{ name }}</p>
                        <p :style="status">HP: {{ hitPoint }}</p>
                    </div>
                </div>
               </div>`
}

// 自分のコンポーネント
const myselfComponent = {
    props: {
        name: String,
        hitPoint: Number,
        status: Object,
        command1Name: String,
        command1Id: Number,
        attackFunc1: Function,
        command2Name: String,
        command2Id: Number,
        attackFunc2: Function,
        command3Name: String,
        command3Id: Number,
        attackFunc3: Function,
        command4Name: String,
        command4Id: Number,
        attackFunc4: Function,
    },
    template: `<div class="mySelfBox">
                <div class="container">
                    <div class="myStatusWrapper">
                        <p class="mySelfName">{{ name }}</p>
                        <p class="mySelfHp" :style="status">HP: {{ hitPoint }}</p>
                    </div>
                    <div class="commandWrapper">
                        <button v-on:click="commandFunc1" :id="command1Id" class="command"></button>
                        <label :for="command1Id" class="commandLabel"><i class="fas fa-caret-right"></i>{{ command1Name }}</label>
                        <button v-on:click="commandFunc2" :id="command2Id" class="command"></button>
                        <label :for="command2Id" class="commandLabel"><i class="fas fa-caret-right"></i>{{ command2Name }}</label>
                        <button v-on:click="commandFunc3" :id="command3Id" class="command"></button>
                        <label :for="command3Id" class="commandLabel"><i class="fas fa-caret-right"></i>{{ command3Name }}</label>
                        <button v-on:click="commandFunc4" :id="command4Id" class="command"></button>
                        <label :for="command4Id" class="commandLabel"><i class="fas fa-caret-right"></i>{{ command4Name }}</label>
                    </div>
                </div>
               </div>`,
    methods: {
        // 主人公の選択肢
        commandFunc1: function () {
            this.attackFunc1()
        },
        commandFunc2: function () {
            this.attackFunc2()
        },
        commandFunc3: function () {
            this.attackFunc3()
        },
        commandFunc4: function () {
            this.attackFunc4()
        }
    }
}

var app = new Vue ({
    el: '#app', 
    data: {
        message: '行動を選んでください',
        mySelf: {
            name: '',
            hitPoint: 100,
            status: '',
            style: {
                color: '#fff'
            }
        },
        terai: {
            name: '寺井',
            image: '../images/terai.jpg',
            hitPoint: 100,
            style: {
                color: '#fff'
            }
        },
        borubo: {
            name: 'ボルボ西郷',
            image: '../images/borubo.jpg',
            hitPoint: 150,
            color: '#fff'
        },
        //勝った時と負けた後きのコンソールに表示するオブジェクト
        winObject: {
            display: 'none'
        },
        loseObject: {
            display: 'none'
        },
        jodyImg: {
            display: 'none'
        }
    },
    methods: {
        mySelif: function ($selif) {
            this.message = $selif
        },
        // ---------- コマンド ----------
        //こうげきする
        attack: function () {
            this.giveDamege(app.$myActions[0], '寺井', 10)
            setTimeout(function(){app.getDamage(app.$enemyActions[0], '寺井', 70)}, this.$span)
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.8) 
        },
        //ほめる
        praise: function () {
            this.message = this.$myActions[2]
            setTimeout(function(){app.enemySelif(app.$enemyActions[2])}, this.$span - 1000)
            setTimeout(function(){app.mySelif(app.$navi[1])}, this.$span * 2)  
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 3) 
        },
        //ぶったたく
        kick: function() {
            this.giveDamege(app.$myActions[1], '寺井', 70)
            setTimeout(function(){app.getDamage(app.$enemyActions[0], '寺井', 10)}, this.$span)
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.8) 
        },
        //回復する
        recovery: function() {
            if (this.mySelf.hitPoint >= 100) {
                this.message = "体力は満タンだ"
                setTimeout(function(){app.getDamage(app.$enemyActions[0], '寺井', 10)}, this.$span)
                setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
            }else {
                if (this.mySelf.hitPoint > 90) {
                    this.message = "体力が" + String(100 - this.mySelf.hitPoint) + "回復した"
                    setTimeout(function(){app.getDamage(app.$enemyActions[0], '寺井', 10)}, this.$span)
                    setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
                } else {
                    this.message = this.$myActions[3]
                    this.mySelf.hitPoint += 10
                    setTimeout(function(){app.getDamage(app.$enemyActions[0], '寺井', 10)}, this.$span)
                    setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
                }
            }
        },
        //-----対ボルボ用コマンド
        // こうげきする(toB)
        attackToB: function() {
            this.giveDamege2(app.$myActions[0], 'ボルボ', 30)
            setTimeout(function(){app.getDamage(app.$enemyActions[0], 'ボルボ', 30)}, this.$span)
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.8) 
        },
        //回復する(toB)
        recoveryToB: function() {
            if (this.mySelf.hitPoint >= 100) {
                this.message = "体力は満タンだ"
                setTimeout(function(){app.getDamage(app.$enemyActions[0], 'ボルボ', 10)}, this.$span)
                setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
            }else {
                if (this.mySelf.hitPoint > 70) {
                    this.message = "体力が" + String(100 - this.mySelf.hitPoint) + "回復した"
                    setTimeout(function(){app.getDamage(app.$enemyActions[0], 'ボルボ', 10)}, this.$span)
                    setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
                } else {
                    this.message = this.$myActions[6]
                    this.mySelf.hitPoint += 30
                    setTimeout(function(){app.getDamage(app.$enemyActions[0], 'ボルボ', 10)}, this.$span)
                    setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2.5) 
                }
            }
        },
        // 肉弾戦
        meatBattle: function() {
            this.message = this.$myActions[4]
            setTimeout(function(){app.mySelif(app.$navi[2])}, this.$span - 1000)
            setTimeout(function(){app.getDamageSelif(70)}, this.$span)
            setTimeout(function(){app.enemyAttack(70)}, this.$span)
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 2) 
        },
        // ジョディ
        jodey: function() {
            this.message = this.$myActions[5]
            setTimeout(function(){app.jodySwitch('block')}, this.$span)
            setTimeout(function(){app.jodySwitch('none')}, this.$span * 2)
            setTimeout(function(){app.mySelif(app.$navi[4])}, this.$span * 2)
            setTimeout(function(){app.mySelif(app.$myActions[7])}, this.$span * 3)
            setTimeout(function(){app.myAttack2(50)}, this.$span * 3)
            setTimeout(function(){app.mySelif(app.$navi[3])}, this.$span * 3.5)
            setTimeout(function(){app.mySelif(app.$navi[0])}, this.$span * 4) 
        },
        // ---------- 敵のアクション ----------
        enemyAttack: function($damage) {
            this.mySelf.hitPoint -= $damage
        },
        enemySelif: function($selif) {
            this.message = "寺井は" + $selif
        },
        // ---------- 自分のアクション ----------
        myAttack: function($damage) {
            this.terai.hitPoint -= $damage
        },
        myAttack2: function($damage) {
            this.borubo.hitPoint -= $damage
        },
        myself: function ($selif) {
            this.message = $selif
        },
        // ---------- コンソールのアクション ----------
        winConsoleBlock: function ($style) {
            this.winObject.display = $style
        },
        loseConsoleBlock: function ($style) {
            this.loseObject.display = $style
        },
        jodySwitch: function($style) {
            this.jodyImg.display = $style
        },
        giveDamageSelif: function ($enemyName, $damage) {
            this.message = $enemyName + 'に' + $damage + 'のダメージを与えた！'
        },
        getDamageSelif: function ($damage) {
            this.message = $damage + 'のダメージを受けた！'
        },
        //セリフと攻撃がワンセットになったアクション
        giveDamege: function ($selif, $enemyName, $damage) {
            this.message = $selif
            setTimeout(function(){app.myAttack($damage)}, this.$span * 0.5)
            setTimeout(function(){app.giveDamageSelif($enemyName, $damage)}, this.$span * 0.3)
        },
        getDamage: function($enemySelif, $enemyName, $damage) {
            this.message = $enemyName + "は" + $enemySelif
            setTimeout(function(){app.enemyAttack($damage)}, this.$span)
            setTimeout(function(){app.getDamageSelif($damage)}, this.$span)
        },
        //２番目のmyAttackが違い対象がボルボ
        giveDamege2: function ($selif, $enemyName, $damage) {
            this.message = $selif
            setTimeout(function(){app.myAttack2($damage)}, this.$span * 0.5)
            setTimeout(function(){app.giveDamageSelif($enemyName, $damage)}, this.$span * 0.3)
        },
    },
    watch: {
        //敵のHPが０になったら画面コンソールを「寺井は力尽きた」にし、consoleBlockを表示させる
        'terai.hitPoint': function() {
            // 30以下なら画像とHPの色を変更
            if (this.terai.hitPoint <= 30) {
                this.terai.color = '#ffff00'
                this.terai.image = '../images/terai_deadly.jpg'
            }
            if(this.terai.hitPoint <= 0){
                //0以下　になったら0に統一
                this.terai.hitPoint = 0
                this.message = '寺井は力尽きた'
                setTimeout(function(){app.winConsoleBlock('block')}, this.$span - 1000)           
            }
        },
        'borubo.hitPoint': function() {
            // 30以下なら画像とHPの色を変更
            if (this.borubo.hitPoint <= 30) {
                this.borubo.color = '#ffff00'
                this.borubo.image = '../images/borubo_deadly.gif'
            }
            if(this.borubo.hitPoint <= 0){
                //0以下　になったら0に統一
                this.borubo.hitPoint = 0
                this.message = 'ボルボは力尽きた'
                setTimeout(function(){app.winConsoleBlock('block')}, this.$span - 1000)          
            }
        },
        'mySelf.hitPoint': function() {
            if (this.mySelf.hitPoint <= 30) {
                this.mySelf.color = '#ffff00'
            }
            if (this.mySelf.hitPoint <= 0) {
                this.mySelf.hitPoint = 0
                this.message = '敗北した'
                setTimeout(function(){app.loseConsoleBlock('block')}, this.$span - 1000)
            }
        },
        message: function() {
            // 状態による敵の画像の変更
            if (this.message == "寺井は照れている！" || this.message == app.$navi[1]) {
                this.terai.image = '../images/terai_tere.jpg'
            } else if (this.terai.hitPoint <= 30 ) {
                this.terai.image = '../images/terai_deadly.jpg'
            } else {
                this.terai.image = '../images/terai.jpg'
            }

            if (this.message == app.$navi[4] || this.message == app.$myActions[7] || this.message == app.$navi[3]) {
                this.borubo.image = '../images/borubo_hanaji.jpg'
            } else if (this.borubo.hitPoint <= 30) {
                this.terai.image = '../images/borubo_deadly.gif'
            } else {
                this.borubo.image = '../images/borubo.jpg'
            }
        }
    },
    components: {
        'enemy-component': enemyComponent,
        'myself-component': myselfComponent
    }
    })