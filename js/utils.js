function findByAttribute(list, att, value, deep) {
  deep = typeof(deep) !== 'undefined' ? deep : false;
  var found = null;
  jQuery.each(list, function(index, item) {
    if (value == item[att]) {
      //console.log('found ' + value + ' => ' + item);
      found = item;
      return false; //stop loop
    }
    if (typeof(item.childs) !== 'undefined' && item.childs.length > 0) {
      found = findByAttribute(item.childs, att, value, deep);
      if (found != null)
        return false; //stop
    }

  });

  if (found == null) {
    //console.log('cant find ' + value);
  }

  return found;
}



/**
* Number.prototype.format(n, x)
*
* @param integer n: length of decimal
* @param integer x: length of sections
*/
Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
