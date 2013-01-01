<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRGame._Default" %>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <title>JetPack Demo</title>
        <script type="text/javascript" src="Scripts/lib/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/json2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/jquery.signalR-0.5.0.min.js"></script>
        <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>
        <script type="text/javascript" src="Scripts/lib/enchant.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/knockout-2.2.0.js"></script>
        
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
        <h2>Sandbox</h2>
        <div id="enchant-stage"></div>
        <br /><br />
        <div><label id="notifications"/></div>
        <br /><br />
        <div data-bind="visible: inMenu"><input type="text" data-bind="value: localPlayerName" /><a href="#" data-bind="click: join">Join The Arena!</a></div>
        <div data-bind="visible: offlineMode">Offline mode!</div>      
        <script type="text/javascript" src="Scripts/connection.js"></script>
        <script type="text/javascript" src="Scripts/map.js"></script>
        <script type="text/javascript" src="Scripts/character.js"></script>
        <script type="text/javascript" src="Scripts/bomb.js"></script>
        <script type="text/javascript" src="Scripts/game.js"></script>
    </body>
</html>


