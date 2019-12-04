<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/style.css">
    <title>vsKOCHIKAME</title>
    <script src="https://kit.fontawesome.com/b30ef83a85.js"></script>
</head>
<body>
    <section class="conGame" id="app">
        <div class="container">
            <!-- 敵の表示 -->
            <enemy-component :name="borubo.name" :hit-point=borubo.hitPoint :img="borubo.image" :status="borubo"></enemy-component>

            <!-- 自分の表示 -->
            <myself-component name="<?php print($_SESSION['charaName']); ?> " 
                :hit-point=mySelf.hitPoint :status="mySelf" 
                command1-name="こうげきする" :command1-id="1" :attack-func1="attackToB"
                command2-name="ジョディ" :command2-id="2" :attack-func2="jodey"
                command3-name="肉弾戦" :command3-id="3" :attack-func3="meatBattle"
                command4-name="回復する" :command4-id="4" :attack-func4="recoveryToB">
            </myself-component>

            <!-- ジョディコマンド時の表示 -->
            <div class="jody" :style="jodyImg">
                    <div class="container">
                        <img class="jodyImg" src="../images/jody.jpg">
                    </div>
            </div> 
            

            <!----- コンソールの表示 ----->
            <div class="consoleBox">
                <div class="container">
                    <p class="consleTxt">{{ message }}</p>
                </div>
            </div>

            <div class="consoleBlock" v-bind:style="winObject">
                <p class="consoleBlockTxt">たたかいに勝利した</p>
            </div>

            <div class="consoleBlock" v-bind:style="loseObject">
                <p class="consoleBlockTxt">たたかいに敗北した</p>
            </div>

            <!----- 勝った時の表示 ----->
            <section class="finish winScreen" v-if="winObject.display == 'block'">
                <div class="finishCon">
                    <div class="container">
                        <h1 class="mainTxt">WIN</h1>
                        <p class="subTxt">勝利しました！！</p>
                        <a class="nextEnemy" href="../game_login.php">ログイン画面へ</a>
                    </div>
                </div>
            </section> 

            <!-- 負けた時の表示 -->
            <section class="finish loseScreen" v-if="loseObject.display == 'block'">
                <div class="finishCon">
                    <div class="container">
                        <h1 class="mainTxt mainTxtLose">LOSE</h1>
                        <p class="subTxt">負けました...</p>
                        <a class="nextEnemy" href="borubo.php">もう一回たたかう</a>
                    </div>
                </div>
            </section> 

            <!----- 作動中の二重選択のブロック ----->
            <div class="block" v-if="message !== '行動を選んでください'">
            </div>

        </div>
    </section>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="../js/main.js"></script>
</body>
</html>