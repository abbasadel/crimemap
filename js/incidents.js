//state class
function Incident(id, catId, lat, lng) {
  this.id = id;
  this.catId = catId;
  this.lat = lat;
  this.lng = lng;
  this.category = null;
}

var incidents = new function() {
  this.url = 'json/incidents.json';
  this.data = [];
  this.total = 0;
  this.length = this.total;

  // functions

  this.loadData = function() {
    // console.log(this.url + ' loading ');
    json = $.ajax({
      url: this.url,
      dataType: "json",
      async: false
    }).responseJSON.payload.incidents;
    // console.log(this.url + ' loaded ' + json.length);
    return json;
  }

  this.processData = function(data) {
    list = [];

    jQuery.each(data, function(index, item) {
      incident = new Incident(item.incident.incidentid, item.categories[0].category.id,
        item.incident.locationlatitude, item.incident.locationlongitude);

      //get category
      incident.category = categories.findById(incident.catId);
      if(incident.category != null){
        incident.category.incidents.push(incident);
      }

      list.push(incident);
    });


    // console.log(list);
    return list;
  }

  this.all = function() {
    return this.data;
  }

  this.findById = function(id) {
    return findByAttribute(this.data, 'id', id, true);
  }

  this.init = function() {
    this.data = this.processData(this.loadData());
    this.calcTotal();
  }

  this.calcTotal = function(){
    this.total = this.data.length;
  }

  /// let's go

  this.init();

};
