<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRGame._Default" %>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <title>JetPack Demo</title>
        <link href="Content/bootstrap.css" rel="stylesheet" type="text/css"></link>
        <link href="Content/custom.css" rel="stylesheet" type="text/css"></link>
        <script type="text/javascript" src="Scripts/lib/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/json2.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/jquery.signalR-0.5.0.min.js"></script>
        <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>
        <script type="text/javascript" src="Scripts/lib/enchant.min.js"></script>
        <script type="text/javascript" src="Scripts/lib/knockout-2.2.0.js"></script>
        <script type="text/javascript" src="Scripts/lib/bootstrap.min.js"></script>       
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="brand" href="#">Sandbox</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class=""><a href="#">Test</a></li>
                            <li class=""><a href="#">Test2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div id="enchant-stage" class="well pull-left"></div>
            
            <div id="sidebar-right" class="pull-right">
                    
                <div id="player-container" class="well">
                    <h2>Players</h2>
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
                    
                <div id="game-console" class="well">
                    <h2>Console</h2>
                    <div data-bind="foreach: logEntries">
                        <div data-bind="text: $data"></div>
                    </div>
                    >&nbsp;<input type="text"/>
                </div>
                    
                <div id="editor" class="well">
                    <h2>Map</h2>
                    <input type="checkbox" data-bind="value: editMode" />Edit mode
                    <button class="btn btn-success">Save level</button>
                </div>
            </div>            
        </div>
        
        <footer class="footer">
            <p>Built by -BDM-</p>
            <p>License: TBD :)</p>
            <ul class="footer-links">
              <li><a href="https://twitter.com/b_d_m" target="_blank">Twitter</a></li>
              <li class="muted">·</li>
              <li><a href="https://github.com/bramdemoor" target="_blank">GitHub</a></li>
              <li class="muted">·</li>
              <li><a href="http://bramdemoor.wordpress.com/" target="_blank">My blog</a></li>
            </ul>
     </footer>

     
        <script type="text/javascript" src="Scripts/connection.js"></script>
        <script type="text/javascript" src="Scripts/map.js"></script>
        <script type="text/javascript" src="Scripts/character.js"></script>
        <script type="text/javascript" src="Scripts/bomb.js"></script>
        <script type="text/javascript" src="Scripts/game.js"></script>
    </body>
</html>


