var id = new Date().getTime();
var io = io();

var needsCSV = "https://darkTribes.mybluemix.net/needs.csv?sessionId=" + id + "&r=" + Math.random();
var valuesCSV = "https://darkTribes.mybluemix.net/values.csv?sessionId=" + id + "&r=" + Math.random();
var sentimentCSV = "https://darkTribes.mybluemix.net/sentiment.csv?sessionId=" + id + "&r=" + Math.random();
var predictionCSV = "https://darkTribes.mybluemix.net/prediction.csv?sessionId=" + id + "&r=" + Math.random();

var predictionObj = null;
var dashboardObj = null;

var dashSpec = {"name":"New dashboard","layout":{"id":"page0","items":[{"id":"model000001631f30a27e_00000000","style":{"left":"12px","top":"37px","height":"144px","width":"351px"},"type":"widget"},{"id":"model000001631f32a176_00000000","style":{"width":"180px","height":"50px","top":"12px","left":"12px"},"type":"widget","clones":1},{"id":"model000001631f338476_00000000","style":{"top":"181px","left":"12px","height":"273px","width":"351px"},"type":"widget"},{"id":"model000001631f34e898_00000000","from":"model000001631f32a176_00000000","style":{"width":"186px","height":"50px","top":"156px","left":"12px"},"type":"widget","clones":1},{"id":"model000001631f362ccc_00000000","style":{"top":"470px","left":"12px","height":"329px","width":"351px"},"type":"widget"},{"id":"model000001631f37773e_00000000","from":"model000001631f34e898_00000000","style":{"width":"186px","height":"50px","top":"445px","left":"12px"},"type":"widget"}],"type":"absolute","templateName":"NoTemplate"},"theme":"defaultTheme","version":1008,"eventGroups":[{"id":"page0:1","widgetIds":["model000001631f30a27e_00000000","model000001631f338476_00000000","model000001631f362ccc_00000000"]}],"dataSources":{"version":"1.0","sources":[{"id":"model000001631f2f523e_00000002","assetId":"assetId000001631f2f523e_00000000","clientId":"1","module":{"xsd":"https://ibm.com/daas/module/1.0/module.xsd","source":{"id":"StringID","srcUrl":{"sourceUrl":needsCSV,"mimeType":"text/csv"}},"table":{"name":"Needs","column":[{"name":"Name","datatype":"NVARCHAR(40)","nullable":true,"description":"Name","label":"Name","usage":"attribute","regularAggregate":"none"},{"datatype":"BIGINT","nullable":true,"name":"Percentile","description":"Percentile","label":"Percentile","usage":"fact","regularAggregate":"none","taxonomyFamily":"cYear"},{"datatype":"NVARCHAR(40)","nullable":true,"name":"Category","description":"Category","label":"Category","usage":"attribute","regularAggregate":"none"}]},"label":"Needs","identifier":"1"},"name":"Needs","shaping":{"embeddedModuleUpToDate":true}},{"id":"model000001631f2f5240_00000002","assetId":"assetId000001631f2f5240_00000000","clientId":"2","module":{"xsd":"https://ibm.com/daas/module/1.0/module.xsd","source":{"id":"StringID","srcUrl":{"sourceUrl":valuesCSV,"mimeType":"text/csv"}},"table":{"name":"Values","column":[{"name":"Name","datatype":"NVARCHAR(40)","nullable":true,"description":"Name","label":"Name","usage":"attribute","regularAggregate":"none"},{"datatype":"BIGINT","nullable":true,"name":"Percentile","description":"Percentile","label":"Percentile","usage":"fact","regularAggregate":"none","taxonomyFamily":"cYear"},{"datatype":"NVARCHAR(40)","nullable":true,"name":"Category","description":"Category","label":"Category","usage":"attribute","regularAggregate":"none"}]},"label":"Values","identifier":"1"},"name":"Values","shaping":{"embeddedModuleUpToDate":true}},{"id":"model000001631f2f5240_00000005","assetId":"assetId000001631f2f5240_00000003","clientId":"3","module":{"xsd":"https://ibm.com/daas/module/1.0/module.xsd","source":{"id":"StringID","srcUrl":{"sourceUrl":sentimentCSV,"mimeType":"text/csv"}},"table":{"name":"Sentiment","column":[{"name":"Name","datatype":"NVARCHAR(40)","nullable":true,"description":"Name","label":"Name","usage":"attribute","regularAggregate":"none"},{"datatype":"BIGINT","nullable":true,"name":"Percentile","description":"Percentile","label":"Percentile","usage":"fact","regularAggregate":"none","taxonomyFamily":"cYear"},{"datatype":"NVARCHAR(40)","nullable":true,"name":"Category","description":"Category","label":"Category","usage":"attribute","regularAggregate":"none"}]},"label":"Sentiment","identifier":"1"},"name":"Sentiment","shaping":{"embeddedModuleUpToDate":true}}]},"pageContext":[{"origin":"visualization","table":"","alias":"0","sourceId":"model000001631f2f5240_00000005","hierarchies":[{"hierarchyUniqueName":"Sentiment.Category"},{"hierarchyUniqueName":"Sentiment.Name"}],"scope":"page0","hierarchyUniqueNames":["Sentiment.Category","Sentiment.Name"],"eventSourceId":"model000001631f30a27e_00000000","eventGroupId":"page0:1","tupleSet":"{\"Sentiment.Category->[Sentiment]Sentiment.Name->[Positive]\":[{\"u\":\"Sentiment.Category->[Sentiment]\",\"d\":\"Sentiment\"},{\"u\":\"Sentiment.Name->[Positive]\",\"d\":\"Positive\"}]}"},{"origin":"visualization","table":"","alias":"0","sourceId":"model000001631f2f5240_00000002","hierarchies":[{"hierarchyUniqueName":"Values_.Name"}],"scope":"page0","hierarchyUniqueNames":["Values_.Name"],"eventSourceId":"model000001631f362ccc_00000000","eventGroupId":"page0:1","tupleSet":"{\"Values_.Name->[Conservation]\":{\"u\":\"Values_.Name->[Conservation]\",\"d\":\"Conservation\"}}"}],"drillThrough":[],"widgets":{"model000001631f30a27e_00000000":{"id":"model000001631f30a27e_00000000","data":{"dataViews":[{"modelRef":"model000001631f2f5240_00000005","dataItems":[{"id":"model000001631f30f6f8_00000000","itemId":"Sentiment.Name","itemLabel":"Name","selection":[{"operation":"order","sort":{"type":"desc","priority":0,"by":"caption"}}]},{"id":"model000001631f30fdc2_00000000","itemId":"Sentiment.Percentile_","itemLabel":"Percentile"},{"id":"model000001631f311334_00000000","itemId":"Sentiment.Category","itemLabel":"Category"}],"id":"model000001631f30f6f6_00000000"}]},"visTypeLocked":true,"slotmapping":{"slots":[{"name":"categories","dataItems":["model000001631f311334_00000000"],"dataItemSettings":[],"caption":"Bars","id":"categories"},{"name":"values","dataItems":["model000001631f30fdc2_00000000"],"caption":"Length","id":"values"},{"name":"color","dataItems":["model000001631f30f6f8_00000000"],"caption":"Color","id":"color"}]},"type":"live","visId":"com.ibm.vis.rave2bundlestackedbar","name":""},"model000001631f32a176_00000000":{"id":"model000001631f32a176_00000000","type":"text","content":"<div class=\"staticContent textFillNoScroll\" dir=\"auto\"><div class=\"summernote\" style=\"display: none;\"></div><div class=\"note-editor\"><div class=\"note-dropzone\">  <div class=\"note-dropzone-message\"></div></div><div class=\"note-editing-area\"><div class=\"note-handle\"><div class=\"note-control-selection\" style=\"display: none;\"><div class=\"\"></div><div class=\"note-control-holder note-control-nw\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"-info\"></div></div></div><div tabindex=\"-1\" style=\"position: absolute; left: -100000px; opacity: 0;\" contenteditable=\"true\"></div><div class=\"note-editable\" contenteditable=\"false\"><div class=\"\" style=\"color: rgb(51, 51, 51);font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;\">Tribe Sentiment</div></div></div></div></div>","isResponsive":true,"visTypeLocked":true,"name":""},"model000001631f338476_00000000":{"id":"model000001631f338476_00000000","data":{"dataViews":[{"modelRef":"model000001631f2f523e_00000002","dataItems":[{"id":"model000001631f33d510_00000001","itemId":"Needs.Name","itemLabel":"Name"},{"id":"model000001631f33e60c_00000000","itemId":"Needs.Percentile_","itemLabel":"Percentile"}],"id":"model000001631f33d510_00000000"}]},"visTypeLocked":true,"slotmapping":{"slots":[{"name":"categories","dataItems":["model000001631f33d510_00000001"],"dataItemSettings":[],"caption":"Words","id":"categories"},{"name":"size","dataItems":["model000001631f33e60c_00000000"],"caption":"Size","id":"size"}]},"type":"live","visId":"com.ibm.vis.rave2bundlewordcloud","name":""},"model000001631f34e898_00000000":{"id":"model000001631f34e898_00000000","type":"text","content":"<div class=\"staticContent textFillNoScroll\" dir=\"auto\"><div class=\"summernote\" style=\"display: none;\"></div><div class=\"note-editor\"><div class=\"note-dropzone\">  <div class=\"note-dropzone-message\"></div></div><div class=\"note-editing-area\"><div class=\"note-handle\"><div class=\"\" style=\"display: none;\"><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"-info\"></div></div></div><div tabindex=\"-1\" style=\"position: absolute; left: -100000px; opacity: 0;\" contenteditable=\"true\"></div><div class=\"note-editable\" contenteditable=\"false\"><div class=\"\" style=\"color: rgb(51, 51, 51);font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 14px;\">Tribe Needs</div></div></div></div></div>","isResponsive":true,"visTypeLocked":true,"name":""},"model000001631f362ccc_00000000":{"id":"model000001631f362ccc_00000000","data":{"dataViews":[{"modelRef":"model000001631f2f5240_00000002","dataItems":[{"id":"model000001631f364d78_00000001","itemId":"Values_.Name","itemLabel":"Name"},{"id":"model000001631f3655d2_00000000","itemId":"Values_.Percentile_","itemLabel":"Percentile"}],"id":"model000001631f364d78_00000000"}]},"visTypeLocked":true,"slotmapping":{"slots":[{"name":"categories","dataItems":["model000001631f364d78_00000001"],"dataItemSettings":[],"caption":"Area hierarchy","id":"categories"},{"name":"size","dataItems":["model000001631f3655d2_00000000"],"caption":"Size","id":"size"}]},"type":"live","visId":"com.ibm.vis.rave2bundletreemap","name":""},"model000001631f37773e_00000000":{"id":"model000001631f37773e_00000000","type":"text","content":"<div class=\"staticContent textFillNoScroll\" dir=\"auto\"><div class=\"summernote\" style=\"display: none;\"></div><div class=\"note-editor\"><div class=\"note-dropzone\">  <div class=\"note-dropzone-message\"></div></div><div class=\"note-editing-area\"><div class=\"note-handle\"><div class=\"\" style=\"display: none;\"><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div><div class=\"\"></div></div></div><div tabindex=\"-1\" style=\"position: absolute; left: -100000px; opacity: 0;\" contenteditable=\"true\"></div><div class=\"note-editable\" contenteditable=\"false\"><div class=\"\" style=\"color: rgb(51, 51, 51);font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 14px;\"><span>Tribe Values</div></div></div></div></div>","isResponsive":true,"visTypeLocked":true,"name":""}}};

var predictionSpec = {"name":"New dashboard","layout":{"id":"page0","items":[{"id":"model000001631e97e13c_00000000","style":{"top":"12px","left":"12px","height":"313px","width":"420px"},"type":"widget"}],"type":"absolute","templateName":"NoTemplate"},"theme":"defaultTheme","version":1008,"eventGroups":[{"id":"page0:1","widgetIds":["model000001631e97e13c_00000000"]}],"dataSources":{"version":"1.0","sources":[{"id":"model000001631e96d8c4_00000002","assetId":"assetId000001631e96d8c4_00000000","clientId":"4","module":{"xsd":"https://ibm.com/daas/module/1.0/module.xsd","source":{"id":"StringID","srcUrl":{"sourceUrl":predictionCSV,"mimeType":"text/csv"}},"table":{"name":"Prediction","column":[{"name":"Name","datatype":"NVARCHAR(40)","nullable":true,"description":"Name","label":"Name","usage":"attribute","regularAggregate":"none"},{"datatype":"BIGINT","nullable":true,"name":"Percentile","description":"Percentile","label":"Percentile","usage":"fact","regularAggregate":"none","taxonomyFamily":"cYear"},{"datatype":"NVARCHAR(40)","nullable":true,"name":"Category","description":"Category","label":"Category","usage":"attribute","regularAggregate":"none"}]},"label":"Prediction","identifier":"1"},"name":"Prediction","shaping":{"embeddedModuleUpToDate":true}}]},"pageContext":[],"drillThrough":[],"widgets":{"model000001631e97e13c_00000000":{"id":"model000001631e97e13c_00000000","data":{"dataViews":[{"modelRef":"model000001631e96d8c4_00000002","dataItems":[{"id":"model000001631e9818f8_00000001","itemId":"Prediction.Name","itemLabel":"Name"},{"id":"model000001631e9822ca_00000000","itemId":"Prediction.Percentile_","itemLabel":"Percentile"}],"id":"model000001631e9818f8_00000000"}]},"visTypeLocked":false,"slotmapping":{"slots":[{"name":"categories","dataItems":["model000001631e9818f8_00000001"],"dataItemSettings":[],"caption":"Bubbles","id":"categories"},{"name":"size","dataItems":["model000001631e9822ca_00000000"],"caption":"Size","id":"size"}]},"type":"live","visId":"com.ibm.vis.rave2bundlepackedbubble","name":""}}};

var promotions = ["Upcoming Blockbuster Movie", "National News Program", "Cooking Blog", "Margaritaville Music Station", "International News Program", "Movie Merchandise", "Esports Game", "Theme Park", "Family TV program", "Sporting Event", "TV Drama"];

io.on('connect', function() {
    console.log("socket connected")
    io.emit('register', id);
});

io.on('disconnect', function() {
    console.log('socket disconnected');
});

io.on('update', function(data) {
    var feedback = $("#feedback");
    var innerHTML = feedback.html();
    innerHTML = data.toString() + "<br/>" + innerHTML;
    feedback.html(innerHTML);
});
io.on('getConversation', function(data) {
    var feedback = $("#conversation");
    var data = feedback.html();
    io.emit('sendConversation', data, id);
});
io.on('showProfile', function(data) {
    setTextSummary(data);

    $("#personalitySummaryPanel").removeClass("hidden");
    $("#personalitySummaryPanel").fadeIn("slow");
});
io.on('runChart', function(data) { 
    $.get('/session', function(result) {
        dashboardObj = new CognosApi({
            cognosRootURL: 'https://dde-us-south.analytics.ibm.com/daas/',
            sessionCode: result.sessionCode,
            node: document.getElementById('containerDivId')
        });
        dashboardObj.initialize().then(function() {
            dashboardObj.dashboard.openDashboard({dashboardSpec: dashSpec}).then(
                function(dashboardAPI) {
                    dashboardObj.dashboardAPI = dashboardAPI;
                    dashboardObj.dashboardAPI.MODES.EDIT;
                }
            ).catch(
                function(err) {
                    console.log(err);
                }
            );
        });
    }); 
});
io.on('showPrediction', function(data) {
    $.get('/session', function(result) {
        predictionObj = new CognosApi({
            cognosRootURL: 'https://dde-us-south.analytics.ibm.com/daas/',
            sessionCode: result.sessionCode,
            node: document.getElementById('predictions')
        });
        predictionObj.initialize().then(function() {
            predictionObj.dashboard.openDashboard({dashboardSpec: predictionSpec}).then(
                function(dashboardAPI) {
                    predictionObj.dashboardAPI = dashboardAPI;
                    predictionObj.dashboardAPI.MODES.EDIT;
                    $('#promotionTitle').html('Promotion Analysis for this Tribe');
                    //$("#promotions").addClass("wipe");
                    $("#predictions").fadeIn("slow");
                    $("#promotions").addClass("hidden");
                    $("#predictions").removeClass("hidden");
                    $('#bSubmit').prop('disabled', false);
                    $('#bSubmit').html('Submit <i class="fa fa-download fa-rotate-270" aria-hidden="true"></i>');
                    $("#conversation > div:nth-child(" + ($(".conversationText").length * 2 - 6) + ")").after("<div id='runPromotion'>&nbsp;&nbsp;&nbsp;<i class='fa fa-hand-o-right' aria-hidden='true'></i> Selected Ad:<span class='tcenter'> " + data + "</span></div>");
                
                    setTimeout(function() {   
                        
                        }, 10000);
                }
            ).catch(
                function(err) {
                    console.log(err);
                }
            );
        });
    });
});


$(document).ready(function() {
    $('#bSubmit').prop('disabled', true);
    $('#promotions').html('<div class="promotionIcon"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div><div class="promotion">' + promotions.join('</div><div class="promotionIcon"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div><div class="promotion">') + '</div>');
    $('#conversation').bind("DOMSubtreeModified",function(){
      if ($('#conversation').html().length > 400){
            $('#bSubmit').prop('disabled', false);
        }
        else{
            $('#bSubmit').prop('disabled', true);
        }
    });
    $("#sessionId").html(id);
    console.log("Session ID: " + id);
    $('#bConA').click(function(e) {
        reset();
        $.get('/text?v=a', function(result) {
            setConversation(result);
        });
    });
    $('#bConB').click(function(e) {
        reset();
        $.get('/text?v=b', function(result) {
            setConversation(result);
        });
    });
    $('#bConC').click(function(e) {
        reset();
        $.get('/text?v=c', function(result) {
            setConversation(result);
        });
    });
    $('#bSubmit').click(function(e) {
        reset();
        $('#bSubmit').html('Working <i class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></i>');
        $('#bSubmit').prop('disabled', true);
        io.emit('sendConversation', $("#conversation").html(), id);
    });
    $('#bClear').click(function(e) {
        reset();
        $('#conversation').html("<br><br>Add 100 words of text here or push one of the buttons above");
    });

});

function reset(){
    $('#personalitySummary').empty();
    $('#containerDivId').empty();
    $('#predictions').empty();
    $('#promotionTitle').html('Available Promotions to pitch the Tribe');
    $("#predictions").fadeOut("fast");
    $("#predictions").addClass("hidden");
    $("#promotions").removeClass("hidden");
    $("#promotions").removeClass("wipe");
    $("#promotions").fadeIn("fast");
    $("#personalitySummaryPanel").fadeOut("fast");
    $("#personalitySummaryPanel").addClass("hidden");
}

function setTextSummary(profile) {
    var textSummary = new TextSummary({
        version: 'v3'
    });
    var summary = textSummary.getSummary(profile);
    $('#personalitySummary').empty();
    $('#personalitySummary').append('<p class="pSummaryText">' + summary.split('\n').join('&nbsp;&nbsp;') + '</p>');
}

function setConversation(text) {
    var c = $('#conversation');
    c.empty();
    c.append('<div class="userIcon"><i class="fa fa-user" aria-hidden="true"></i></div><div class="conversationText">' + text.split('\n').join('</div><div class="userIcon"><i class="fa fa-user" aria-hidden="true"></i></div><div class="conversationText">') + '</div>');
    c.scrollTop(c.prop("scrollHeight"));
}
