
class Sortutil {

    static sort(array, fieldName, direction){

        try{
          var isNumeric;
          var sortFunc = function (field, rev, primer) {
              // Return the required a,b function
              return function (a, b) {
                  // Reset a, b to the field
                  a = primer(pathValue(a, field)), b = primer(pathValue(b, field));
                  // Do actual sorting, reverse as needed
                  return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
              }
          };

          // Have to handle deep paths
          var pathValue = function (obj, path) {
              for (var i = 0, pathsplit = path.split('.'), len = path.length; i < len; i++) {
                  obj = obj[pathsplit[i]];
              }
              isNumeric = !isString(obj);
              return obj;
          };

          var isString = function(a){
              return isNaN(a);
          }

          var primer = isNumeric ?
              function (a) {
                  var retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
                  return isNaN(retValue) ? 0.0 : retValue;
              } :
              function (a) { return String(a).toUpperCase(); };

        array.sort(sortFunc(fieldName, direction === 'desc', primer));
      }catch(err){
          //console.log("ERROR====SORT>>>>"+err.message)
      }
      return array;
    }
}

export default Sortutil
