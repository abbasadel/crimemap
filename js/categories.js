//state class
function Category(id, name, color, parentId) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.parentId = parentId;
  this.parent = null;
  this.childs = [];
  this.incidents = [];

  this.allIncidents = function(){
    all = [];
    jQuery.merge(all, this.incidents);


    jQuery.each(this.childs, function(index, item){
      jQuery.merge(all, item.incidents);
    });

    return all;
  }
}

var categories = new function() {
  this.url = 'json/categories.json';
  this.data = [];


  function assignParent(cat, parents) {
    parent = findByAttribute(parents, 'id', cat.parentId);

    if (parent != null) {
      parent.childs.push(cat);
      cat.parent = parent;
      return true;
    }
    return false;
  }


  // functions

  this.loadData = function() {
    console.log(this.url + ' loading ');
    json = $.ajax({
      url: this.url,
      dataType: "json",
      async: false
    }).responseJSON.payload.categories;
    console.log(this.url + ' loaded ' + json.length);
    return json;
  }

  this.processData = function(data) {
    var parents = [];
    var later = [];

    jQuery.each(data, function(index, item) {
      var cat = new Category(item.category.id, item.translations.en_US.category_title,
        item.category.color, item.category.parent_id);
      if (cat.parentId != 0) {
        //sub category
        if (!assignParent(cat, parents)) {
          later.push(cat);
        }
      } else {
        //this is a parent category
        parents.push(cat);
      }
    });

    //handle later one last time
    jQuery.each(later, function(index, item) {
      assignParent(item, parents);
    });

    console.log(parents);
    return parents;
  }

  this.all = function() {
    return this.data;
  }

  this.findById = function(id) {
    return findByAttribute(this.data, 'id', id, true);
  }

  this.init = function() {
    console.log('calling init');
    rawData = this.loadData();
    this.data = this.processData(rawData);
    console.log('finish init');
  }



  /// let's go

  this.init();

};
