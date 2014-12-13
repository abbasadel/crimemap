var states = new function(){
  this.url = 'json/states-info.json';
  this.data = [];
  this.totalArea = 0;
  this.totalPopulation = 0;


  //state class
  function State(name, population, area){
    this.name = name;
    this.population = population;
    this.area = area;
  }

  // functions

  this.loadData = function(){
    statesInfo = $.ajax({
      url:this.url,
      dataType:"json",
      async:false
    }).responseJSON;
    //console.log( this.url + ' loaded ' + statesInfo.length);
    return statesInfo;
  }

  this.processData = function (data){
    var states = [];

    jQuery.each(data, function(index, item){
      states.push(new State(item[0], item[3], item[1]));
    });

    return states;
  }

  this.all = function(){
    return this.data;
  }

  this.init = function(){
    //console.log('calling init');
    rawData = this.loadData();
    this.data = this.processData(rawData);
    this.calcTotalArea();
    this.calcTotalPopulation();
    //console.log('finish init');
  }

  this.findByName = function(name){
    var found = null;
    jQuery.each(this.data, function(index, item){
      if(name == item.name){
        //console.log('found ' + name + ' => ' + item);
        found = item;
        return null; //stop loop
      }

    });
    if(found == null){
      //console.log('cant find ' + name);
    }

    return found;
  }

  this.calcTotalArea = function(){
    if(this.totalArea != 0) return this.totalArea;
    var total = 0;
    jQuery.each(this.data, function(index, item){
      total += item.area;
    });

    this.totalArea = total;
    //console.log('totalArea = ' + this.totalArea);

    return this.totalArea;
  }

  this.calcTotalPopulation = function(){
    if(this.totalPopulation != 0) return this.totalPopulation;
    var total = 0;
    jQuery.each(this.data, function(index, item){
      total += item.population;
    });

    this.totalPopulation = total;
    //console.log('totalPopulation = ' + this.totalPopulation);

    return this.totalPopulation;
  }

  /// let's go

  this.init();

};
