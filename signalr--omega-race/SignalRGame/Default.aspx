<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRGame._Default" %>
<html>
    <head>
        <title>JetPack Demo</title>
        <script type="text/javascript" src="Scripts/jquery-1.6.4.min.js"></script>
        <script type="text/javascript" src="Scripts/json2.min.js"></script>
        <script type="text/javascript" src="Scripts/jquery.signalR.min.js"></script>
        <script type="text/javascript" src="Scripts/main.js"></script>
        <style type="text/css">
         body {
             background-color:#CCCCCC;
         }
         #game_area{
             background-color:#000000;
         }
        </style>
    </head>
    <body>
        <canvas id="game_area"></canvas>
        <br /><br />
        <div><label id="notifications"/></div>
        <br /><br />
        <div id= "login"><input type="text" id="playername"/><a id='join' href="#">Join The Arena!</a></div>
    </body>
</html>


