<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRGame._Default" %>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <title>JetPack Demo</title>
        <link href="Content/bootstrap.min.css" rel="stylesheet" type="text/css"></link>
        <script type="text/javascript" src="Scripts/lib/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/json2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/jquery.signalR-0.5.0.min.js"></script>
        <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>
        <script type="text/javascript" src="Scripts/lib/enchant.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/knockout-2.2.0.js"></script>
        <script type="text/javascript" src="Scripts/lib/bootstrap.min.js"></script>       
    </head>
    <body>
        <h2>Sandbox</h2>

        <div class="row">
            <div id="enchant-stage" class="pull-left"></div>
        
                <div class="pull-right">
                    <div><label id="notifications"/></div>
                    <br /><br />
                    <div data-bind="visible: inMenu"><input type="text" data-bind="value: localPlayerName" /><a href="#" data-bind="click: join">Join The Arena!</a></div>
                    <div data-bind="visible: offlineMode">Offline mode!</div>      
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Health</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: characters">
                            <tr>
                                <td data-bind="text: name"></td>
                                <td data-bind="text: score"></td>
                                <td>
                                    <div class="progress progress-danger">
                                        <div class="bar" style="width: 80%"></div>
                                    </div>                        
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger" data-bind="visible: isAdmin">Kick</button>
                                </td>
                            </tr>                
                        </tbody>
                    </table>  
                    <button type="button" class="btn btn-danger" data-bind="visible: isAdmin, click: kickAll">Kick all</button>
                </div>            
        </div>

        
        <div id="game-console" class="well">
            <div data-bind="foreach: logEntries">
                <div data-bind="text: $data"></div>
            </div>
            >&nbsp;<input type="text"/>
        </div>
        <div id="editor" class="well">
            <input type="checkbox" data-bind="value: editMode" />Edit mode
            <button class="btn btn-success">Save level</button>
        </div>
     
        <script type="text/javascript" src="Scripts/connection.js"></script>
        <script type="text/javascript" src="Scripts/map.js"></script>
        <script type="text/javascript" src="Scripts/character.js"></script>
        <script type="text/javascript" src="Scripts/bomb.js"></script>
        <script type="text/javascript" src="Scripts/game.js"></script>
    </body>
</html>


