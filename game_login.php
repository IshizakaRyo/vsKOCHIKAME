<?php
session_start();

//フォームに値が入っているかチェック
if(!empty($_POST['charaName']))  {
    $_SESSION['charaName'] = $_POST['charaName'];
    header('Location: contents/terai.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>vsKOCHIKAME スタート</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <!-----ログイン入力 ----->
    <section class="main">
        <div class="container"> 
            <h1 class="loginTitle">vsKOCHIKAME</h1>
                <form method="post" action="">
                    <p class="loginSubTxt">名前を入力してください</p>
                    <input class="loginInput" type="text" name="charaName">
                    <input id="go" type="submit" value="始める">
                    <label class="startButton" for="go">始める</label>        
                </form> 
        </div>
    </section>

   
</body>
</html>