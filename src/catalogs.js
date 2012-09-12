var dcjson="../data/datacatalogs.geocoded.json";

var dataset;
function init() {
  $.getJSON(dcjson,function(data) {
    dataset=new recline.Model.Dataset({records: data});
    dataset.query({size: dataset.recordCount}).done(function () {
      $("div.loading").hide();
      var map=new recline.View.Map({model: dataset})
       map.infobox=function(d) {
        var html=["<div class='infobox'>"];
        html.push(d.attributes.title);
        html.push["</div>"];
        return html.join("");
        } 
      $("#map").append(map.el);
      map.render();
      var summary=getSummary(dataset);
      showSummary(summary);
      });
    });
  
  }

function getSummary(data) {
  var summary={};
  summary.total=dataset.recordCount;
  summary.active=0;
  summary.local=0;
  summary.regional=0;
  summary.national=0;
  _.each(dataset.records.toJSON(), function(r) {
    if ($.inArray("level.local",r.tags)>=0) {
      summary.local++;
      }
    if ($.inArray("level.regional",r.tags)>=0) {
      summary.regional++;
      }
    if ($.inArray("level.national",r.tags)>=0) {
      summary.national++;
      }
    if (r.state=="active") {
      summary.active++;
    }
  });
  return summary;
};

function showSummary(summary) {
  $("#tds").html(summary.total);
  $("#localds").html(summary.local);
  $("#regionalds").html(summary.regional);
  $("#nationalds").html(summary.national);
  }

$(document).ready(init);  