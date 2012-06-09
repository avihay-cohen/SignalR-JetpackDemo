<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRGame._Default" %>
<html>
    <head>
        <title>JetPack Demo</title>
        <script type="text/javascript" src="Scripts/lib/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/json2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/jquery.signalR-0.5.0.min.js"></script>
        <script src="/signalr/hubs" type="text/javascript"></script>
        <script type="text/javascript" src="Scripts/lib/easeljs-0.4.2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/preloadjs-0.1.0.min.js"></script>
        
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
        <canvas id="game_area" width="1000" height="500"></canvas>
        <br /><br />
        <div><label id="notifications"/></div>
        <br /><br />
        <div id= "login"><input type="text" id="playername"/><a id='join' href="#">Join The Arena!</a></div>
                
        <script type="text/javascript" src="Scripts/ship.js"></script>
        <script type="text/javascript" src="Scripts/main.js"></script>
    </body>
</html>


